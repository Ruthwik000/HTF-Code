"use client";

import { useState } from 'react';
import { Play, CheckCircle2, XCircle, Clock, TrendingUp, Loader2 } from 'lucide-react';

export default function TestRunner({ testCases, onRunTests, isRunning }) {
  const [results, setResults] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);

  const handleRunAll = async () => {
    const testResults = await onRunTests(testCases);
    setResults(testResults);
  };

  const handleRunSingle = async (testCase) => {
    setSelectedTest(testCase.id);
    const testResults = await onRunTests([testCase]);
    setResults(testResults);
    setSelectedTest(null);
  };

  const passedTests = results?.filter(r => r.passed).length || 0;
  const totalTests = results?.length || testCases.length;
  const allPassed = results && passedTests === totalTests;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">
          Test Cases {results && `(${passedTests}/${totalTests} passed)`}
        </h3>
        <button
          onClick={handleRunAll}
          disabled={isRunning}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isRunning ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play size={14} />
              Run All Tests
            </>
          )}
        </button>
      </div>

      {/* Overall Status */}
      {results && (
        <div className={`p-4 rounded-lg border ${
          allPassed 
            ? 'bg-green-500/10 border-green-500/20' 
            : 'bg-red-500/10 border-red-500/20'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {allPassed ? (
              <CheckCircle2 className="text-green-500" size={20} />
            ) : (
              <XCircle className="text-red-500" size={20} />
            )}
            <span className={`font-semibold ${
              allPassed ? 'text-green-500' : 'text-red-500'
            }`}>
              {allPassed ? 'All Tests Passed!' : 'Some Tests Failed'}
            </span>
          </div>
          {results[0]?.metrics && (
            <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
              <div>
                <p className="text-muted-foreground">Execution Time</p>
                <p className="font-mono text-foreground">{results[0].metrics.executionTime}ms</p>
              </div>
              <div>
                <p className="text-muted-foreground">Memory</p>
                <p className="font-mono text-foreground">{results[0].metrics.memory || 'N/A'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Test Score</p>
                <p className="font-mono text-foreground">{((passedTests / totalTests) * 100).toFixed(0)}%</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Test Cases List */}
      <div className="space-y-2">
        {testCases.map((testCase, index) => {
          const result = results?.find(r => r.testId === testCase.id);
          const isSelected = selectedTest === testCase.id;
          
          return (
            <div
              key={testCase.id}
              className={`p-3 rounded-lg border transition-colors ${
                result 
                  ? result.passed 
                    ? 'bg-green-500/5 border-green-500/20' 
                    : 'bg-red-500/5 border-red-500/20'
                  : 'bg-muted/20 border-border'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {result && (
                    result.passed ? (
                      <CheckCircle2 className="text-green-500" size={16} />
                    ) : (
                      <XCircle className="text-red-500" size={16} />
                    )
                  )}
                  <span className="text-sm font-medium text-foreground">
                    Test {index + 1}: {testCase.name}
                  </span>
                </div>
                <button
                  onClick={() => handleRunSingle(testCase)}
                  disabled={isRunning}
                  className="text-xs px-2 py-1 rounded bg-muted hover:bg-muted/80 text-foreground disabled:opacity-50"
                >
                  {isSelected ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Play size={12} />
                  )}
                </button>
              </div>

              {/* Test Details */}
              <div className="space-y-2 text-xs">
                <div>
                  <p className="text-muted-foreground mb-1">Input:</p>
                  <pre className="bg-background/50 p-2 rounded border border-border overflow-x-auto text-foreground font-mono">
                    {testCase.input}
                  </pre>
                </div>

                <div>
                  <p className="text-muted-foreground mb-1">Expected Output:</p>
                  <pre className="bg-background/50 p-2 rounded border border-border overflow-x-auto text-foreground font-mono">
                    {testCase.expectedOutput}
                  </pre>
                </div>

                {/* Actual Output (if test ran) */}
                {result && (
                  <>
                    <div>
                      <p className="text-muted-foreground mb-1">Your Output:</p>
                      <pre className={`p-2 rounded border overflow-x-auto font-mono ${
                        result.passed
                          ? 'bg-green-500/10 border-green-500/20 text-green-400'
                          : 'bg-red-500/10 border-red-500/20 text-red-400'
                      }`}>
                        {result.actualOutput}
                      </pre>
                    </div>

                    {!result.passed && result.error && (
                      <div>
                        <p className="text-red-400 mb-1">Error:</p>
                        <pre className="bg-red-500/10 border border-red-500/20 p-2 rounded overflow-x-auto text-red-400 font-mono">
                          {result.error}
                        </pre>
                      </div>
                    )}

                    {/* Performance Metrics */}
                    {result.metrics && (
                      <div className="flex gap-4 pt-2 border-t border-border/50">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock size={12} />
                          <span>{result.metrics.executionTime}ms</span>
                        </div>
                        {result.metrics.tradingMetrics && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <TrendingUp size={12} />
                            <span>P&L: ${result.metrics.tradingMetrics.totalPnL?.toFixed(2)}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
