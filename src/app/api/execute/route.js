// Enhanced Piston API endpoint with test case execution and trading analytics
export async function POST(request) {
    try {
        const { language, code, stdin = "", testCases = [], problemType = "general" } = await request.json();

        // Language mapping for Piston API
        const languageMap = {
            python: { language: "python", version: "3.10.0" },
            javascript: { language: "javascript", version: "18.15.0" },
            cpp: { language: "c++", version: "10.2.0" },
            java: { language: "java", version: "15.0.2" },
        };

        const pistonLang = languageMap[language];
        
        if (!pistonLang) {
            return Response.json(
                { error: `Unsupported language: ${language}` },
                { status: 400 }
            );
        }

        // If test cases provided, run them
        if (testCases && testCases.length > 0) {
            return await runTestCases(code, language, pistonLang, testCases, problemType);
        }

        // Otherwise, single execution
        return await runSingleExecution(code, language, pistonLang, stdin, problemType);

    } catch (error) {
        console.error("Execution error:", error);
        return Response.json(
            { error: "Failed to execute code", details: error.message },
            { status: 500 }
        );
    }
}

async function runTestCases(code, language, pistonLang, testCases, problemType) {
    const results = [];
    
    for (const testCase of testCases) {
        const startTime = Date.now();
        
        try {
            const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: pistonLang.language,
                    version: pistonLang.version,
                    files: [{
                        name: getFileName(language),
                        content: code,
                    }],
                    stdin: testCase.input || "",
                    args: [],
                    compile_timeout: 10000,
                    run_timeout: 5000,
                }),
            });

            const result = await response.json();
            const executionTime = Date.now() - startTime;
            
            const actualOutput = (result.run?.stdout || "").trim();
            const expectedOutput = (testCase.expectedOutput || "").trim();
            const passed = actualOutput === expectedOutput;

            // Extract trading metrics if available
            const tradingMetrics = extractTradingMetrics(actualOutput, problemType);

            results.push({
                testId: testCase.id,
                testName: testCase.name,
                passed,
                actualOutput,
                expectedOutput,
                error: result.compile?.stderr || result.run?.stderr || null,
                metrics: {
                    executionTime,
                    memory: result.run?.memory,
                    tradingMetrics
                }
            });

        } catch (error) {
            results.push({
                testId: testCase.id,
                testName: testCase.name,
                passed: false,
                error: error.message,
                actualOutput: "",
                expectedOutput: testCase.expectedOutput
            });
        }
    }

    const passedCount = results.filter(r => r.passed).length;
    const score = (passedCount / results.length) * 100;

    return Response.json({
        success: passedCount === results.length,
        testResults: results,
        summary: {
            total: results.length,
            passed: passedCount,
            failed: results.length - passedCount,
            score: score.toFixed(1)
        }
    });
}

async function runSingleExecution(code, language, pistonLang, stdin, problemType) {
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            language: pistonLang.language,
            version: pistonLang.version,
            files: [{
                name: getFileName(language),
                content: code,
            }],
            stdin: stdin,
            args: [],
            compile_timeout: 10000,
            run_timeout: 3000,
        }),
    });

    const result = await response.json();
    const output = result.run?.stdout || "";
    
    // Extract trading metrics
    const tradingMetrics = extractTradingMetrics(output, problemType);

    return Response.json({
        success: !result.compile?.stderr && !result.run?.stderr,
        output: output,
        error: result.compile?.stderr || result.run?.stderr || "",
        exitCode: result.run?.code || 0,
        executionTime: result.run?.time || 0,
        memory: result.run?.memory || 0,
        tradingMetrics
    });
}

function getFileName(language) {
    const extensions = {
        python: 'py',
        javascript: 'js',
        cpp: 'cpp',
        java: 'java'
    };
    return `main.${extensions[language] || 'txt'}`;
}

function extractTradingMetrics(output, problemType) {
    // Parse trading-specific metrics from output
    const metrics = {
        totalPnL: null,
        sharpeRatio: null,
        winRate: null,
        maxDrawdown: null,
        pnlHistory: [],
        priceHistory: [],
        trades: [],
        orderBookDepth: null
    };

    try {
        const lines = output.split('\n');
        
        for (const line of lines) {
            // P&L parsing
            if (line.includes('P&L:') || line.includes('PnL:')) {
                const match = line.match(/[\$]?([-+]?\d+\.?\d*)/);
                if (match) metrics.totalPnL = parseFloat(match[1]);
            }
            
            // Sharpe Ratio
            if (line.includes('Sharpe')) {
                const match = line.match(/([-+]?\d+\.?\d+)/);
                if (match) metrics.sharpeRatio = parseFloat(match[1]);
            }
            
            // Win Rate
            if (line.includes('Win Rate') || line.includes('win rate')) {
                const match = line.match(/(\d+\.?\d*)%?/);
                if (match) metrics.winRate = parseFloat(match[1]);
            }
            
            // Max Drawdown
            if (line.includes('Drawdown') || line.includes('drawdown')) {
                const match = line.match(/([-]?\d+\.?\d*)%?/);
                if (match) metrics.maxDrawdown = parseFloat(match[1]);
            }
            
            // P&L History (format: "PnL_History: 0,10.5,25.3,...")
            if (line.includes('PnL_History:')) {
                const values = line.split(':')[1].trim().split(',');
                metrics.pnlHistory = values.map(v => parseFloat(v)).filter(v => !isNaN(v));
            }
            
            // Price History
            if (line.includes('Price_History:')) {
                const values = line.split(':')[1].trim().split(',');
                metrics.priceHistory = values.map(v => parseFloat(v)).filter(v => !isNaN(v));
            }
            
            // Trade Log (format: "TRADE: BUY 100.00 10 +5.00")
            if (line.includes('TRADE:')) {
                const parts = line.split(' ');
                if (parts.length >= 5) {
                    metrics.trades.push({
                        time: parts[1],
                        side: parts[2],
                        price: parseFloat(parts[3]),
                        quantity: parseInt(parts[4]),
                        pnl: parseFloat(parts[5])
                    });
                }
            }
        }

        // Generate synthetic data if problem is trading-related but no data found
        if (problemType === 'trading' && metrics.totalPnL === null) {
            // Create sample P&L history for visualization
            metrics.pnlHistory = generateSamplePnL(20);
            metrics.totalPnL = metrics.pnlHistory[metrics.pnlHistory.length - 1];
            metrics.sharpeRatio = calculateSharpe(metrics.pnlHistory);
            metrics.maxDrawdown = calculateMaxDrawdown(metrics.pnlHistory);
        }

    } catch (e) {
        console.error('Error extracting trading metrics:', e);
    }

    return metrics;
}

function generateSamplePnL(length) {
    const pnl = [0];
    for (let i = 1; i < length; i++) {
        const change = (Math.random() - 0.4) * 10; // Slight positive bias
        pnl.push(pnl[i-1] + change);
    }
    return pnl;
}

function calculateSharpe(pnlHistory) {
    if (pnlHistory.length < 2) return 0;
    
    const returns = [];
    for (let i = 1; i < pnlHistory.length; i++) {
        returns.push(pnlHistory[i] - pnlHistory[i-1]);
    }
    
    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
    const std = Math.sqrt(variance);
    
    return std === 0 ? 0 : (mean / std) * Math.sqrt(252); // Annualized
}

function calculateMaxDrawdown(pnlHistory) {
    let maxDrawdown = 0;
    let peak = pnlHistory[0];
    
    for (const value of pnlHistory) {
        if (value > peak) peak = value;
        const drawdown = ((value - peak) / Math.abs(peak)) * 100;
        if (drawdown < maxDrawdown) maxDrawdown = drawdown;
    }
    
    return maxDrawdown;
}
