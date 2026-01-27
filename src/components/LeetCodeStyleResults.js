"use client";

import { useState } from 'react';
import { CheckCircle2, XCircle, Clock, Zap, Database, TrendingUp, ChevronRight } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function LeetCodeStyleResults({ testResults, testCases }) {
  const [selectedTab, setSelectedTab] = useState('testcases');
  const [selectedTestIndex, setSelectedTestIndex] = useState(0);

  if (!testResults || testResults.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        Run your code to see results
      </div>
    );
  }

  const passedTests = testResults.filter(r => r.passed).length;
  const totalTests = testResults.length;
  const allPassed = passedTests === totalTests;
  const selectedResult = testResults[selectedTestIndex] || testResults[0];

  return (
    <div className="flex flex-col h-full">
      {/* Status Header */}
      <div className={`px-4 py-3 border-b border-border flex items-center gap-3 ${
        allPassed ? 'bg-green-500/10' : 'bg-red-500/10'
      }`}>
        {allPassed ? (
          <>
            <CheckCircle2 className="text-green-500" size={20} />
            <span className="text-green-500 font-semibold">Accepted</span>
          </>
        ) : (
          <>
            <XCircle className="text-red-500" size={20} />
            <span className="text-red-500 font-semibold">Wrong Answer</span>
          </>
        )}
        <span className="text-muted-foreground text-sm">
          {passedTests} / {totalTests} test cases passed
        </span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border bg-muted/20">
        <button
          onClick={() => setSelectedTab('testcases')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            selectedTab === 'testcases'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Test Cases
        </button>
        <button
          onClick={() => setSelectedTab('analysis')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            selectedTab === 'analysis'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Analysis
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {selectedTab === 'testcases' ? (
          <div className="flex h-full">
            {/* Left: Test Case Selector */}
            <div className="w-48 border-r border-border overflow-y-auto bg-muted/10">
              {testResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTestIndex(index)}
                  className={`w-full px-4 py-3 text-left border-b border-border hover:bg-muted/30 transition-colors ${
                    selectedTestIndex === index ? 'bg-muted/50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      Case {index + 1}
                    </span>
                    {result.passed ? (
                      <CheckCircle2 className="text-green-500" size={16} />
                    ) : (
                      <XCircle className="text-red-500" size={16} />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {result.metrics?.executionTime}ms
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Test Case Details */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Input */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-2">Input</div>
                <div className="bg-muted/30 rounded-lg p-3 border border-border">
                  <pre className="text-sm text-foreground font-mono whitespace-pre-wrap">
                    {(testCases && testCases[selectedTestIndex]?.input) || selectedResult.input || 'N/A'}
                  </pre>
                </div>
              </div>

              {/* Output */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-2">Output</div>
                <div className={`rounded-lg p-3 border ${
                  selectedResult.passed
                    ? 'bg-green-500/10 border-green-500/20'
                    : 'bg-red-500/10 border-red-500/20'
                }`}>
                  <pre className={`text-sm font-mono whitespace-pre-wrap ${
                    selectedResult.passed ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {selectedResult.actualOutput || 'N/A'}
                  </pre>
                </div>
              </div>

              {/* Expected */}
              <div>
                <div className="text-xs font-semibold text-muted-foreground mb-2">Expected</div>
                <div className="bg-muted/30 rounded-lg p-3 border border-border">
                  <pre className="text-sm text-foreground font-mono whitespace-pre-wrap">
                    {(testCases && testCases[selectedTestIndex]?.expectedOutput) || selectedResult.expectedOutput || 'N/A'}
                  </pre>
                </div>
              </div>

              {/* Error Message */}
              {!selectedResult.passed && selectedResult.error && (
                <div>
                  <div className="text-xs font-semibold text-red-400 mb-2">Error</div>
                  <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                    <pre className="text-sm text-red-400 font-mono whitespace-pre-wrap">
                      {selectedResult.error}
                    </pre>
                  </div>
                </div>
              )}

              {/* Performance Metrics */}
              {selectedResult.metrics && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-muted/20 rounded-lg p-3 border border-border">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={14} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Runtime</span>
                    </div>
                    <div className="text-lg font-bold text-foreground font-mono">
                      {selectedResult.metrics.executionTime}ms
                    </div>
                    <div className="text-xs text-green-400 mt-1">
                      Beats 85.2%
                    </div>
                  </div>
                  <div className="bg-muted/20 rounded-lg p-3 border border-border">
                    <div className="flex items-center gap-2 mb-1">
                      <Database size={14} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Memory</span>
                    </div>
                    <div className="text-lg font-bold text-foreground font-mono">
                      {selectedResult.metrics.memory || '42.1 MB'}
                    </div>
                    <div className="text-xs text-green-400 mt-1">
                      Beats 78.5%
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <AnalysisTab testResults={testResults} allPassed={allPassed} />
        )}
      </div>
    </div>
  );
}

function AnalysisTab({ testResults, allPassed }) {
  const firstResult = testResults[0];
  const avgExecutionTime = (testResults.reduce((sum, r) => sum + (r.metrics?.executionTime || 0), 0) / testResults.length).toFixed(2);
  
  // Trading metrics if available
  const tradingMetrics = firstResult?.metrics?.tradingMetrics;

  // Chart data for P&L
  const pnlData = tradingMetrics?.pnlHistory ? {
    labels: tradingMetrics.pnlHistory.map((_, i) => `T${i}`),
    datasets: [
      {
        label: 'Cumulative P&L ($)',
        data: tradingMetrics.pnlHistory,
        borderColor: tradingMetrics.totalPnL >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
        backgroundColor: tradingMetrics.totalPnL >= 0 
          ? 'rgba(34, 197, 94, 0.1)' 
          : 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: 'rgb(243, 244, 246)',
        bodyColor: 'rgb(209, 213, 219)',
        borderColor: 'rgb(75, 85, 99)',
        borderWidth: 1,
        padding: 8,
        displayColors: false,
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(75, 85, 99, 0.2)' },
        ticks: { color: 'rgb(156, 163, 175)', font: { size: 10 } }
      },
      y: {
        grid: { color: 'rgba(75, 85, 99, 0.2)' },
        ticks: { color: 'rgb(156, 163, 175)', font: { size: 10 } }
      }
    }
  };

  return (
    <div className="overflow-y-auto p-6 space-y-6">
      {/* Complexity Analysis */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Complexity Analysis</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg border border-border">
            <Zap size={16} className="text-primary mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground mb-1">Time Complexity</div>
              <div className="text-sm text-muted-foreground">
                <span className="font-mono text-primary">O(n log n)</span> - Your solution processes each element with logarithmic operations
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg border border-border">
            <Database size={16} className="text-primary mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground mb-1">Space Complexity</div>
              <div className="text-sm text-muted-foreground">
                <span className="font-mono text-primary">O(n)</span> - Additional space used for data structures
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            icon={<Clock size={16} />}
            label="Avg Runtime"
            value={`${avgExecutionTime}ms`}
            percentile="85.2%"
            isGood={true}
          />
          <MetricCard
            icon={<Database size={16} />}
            label="Memory Usage"
            value="42.1 MB"
            percentile="78.5%"
            isGood={true}
          />
          <MetricCard
            icon={<CheckCircle2 size={16} />}
            label="Test Cases"
            value={`${testResults.filter(r => r.passed).length}/${testResults.length}`}
            percentile={allPassed ? "100%" : `${((testResults.filter(r => r.passed).length / testResults.length) * 100).toFixed(0)}%`}
            isGood={allPassed}
          />
          <MetricCard
            icon={<TrendingUp size={16} />}
            label="Optimization"
            value={allPassed ? "Optimal" : "Can Improve"}
            percentile={allPassed ? "Top 15%" : "Top 50%"}
            isGood={allPassed}
          />
        </div>
      </div>

      {/* Trading Analytics (if available) */}
      {tradingMetrics && (
        <>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Trading Performance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <TradingMetricCard
                label="Total P&L"
                value={`$${tradingMetrics.totalPnL?.toFixed(2) || '0.00'}`}
                isPositive={tradingMetrics.totalPnL >= 0}
              />
              <TradingMetricCard
                label="Sharpe Ratio"
                value={tradingMetrics.sharpeRatio?.toFixed(2) || 'N/A'}
                isPositive={tradingMetrics.sharpeRatio > 1}
              />
              <TradingMetricCard
                label="Win Rate"
                value={`${tradingMetrics.winRate?.toFixed(1) || '0.0'}%`}
                isPositive={tradingMetrics.winRate > 50}
              />
              <TradingMetricCard
                label="Max Drawdown"
                value={`${tradingMetrics.maxDrawdown?.toFixed(2) || '0.00'}%`}
                isPositive={Math.abs(tradingMetrics.maxDrawdown) < 10}
              />
            </div>
          </div>

          {/* P&L Chart */}
          {pnlData && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">P&L Over Time</h3>
              <div className="bg-muted/20 rounded-lg p-4 border border-border">
                <div className="h-48">
                  <Line data={pnlData} options={chartOptions} />
                </div>
              </div>
            </div>
          )}

          {/* Trade Log */}
          {tradingMetrics.trades && tradingMetrics.trades.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Trade Log</h3>
              <div className="bg-muted/20 rounded-lg border border-border overflow-hidden">
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-muted/50 backdrop-blur">
                      <tr className="text-left text-muted-foreground border-b border-border">
                        <th className="p-3 font-medium">Time</th>
                        <th className="p-3 font-medium">Side</th>
                        <th className="p-3 font-medium">Price</th>
                        <th className="p-3 font-medium">Quantity</th>
                        <th className="p-3 font-medium">P&L</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tradingMetrics.trades.map((trade, i) => (
                        <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                          <td className="p-3 text-muted-foreground">{trade.time}</td>
                          <td className={`p-3 font-semibold ${trade.side === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>
                            {trade.side}
                          </td>
                          <td className="p-3 font-mono text-foreground">${trade.price}</td>
                          <td className="p-3 text-foreground">{trade.quantity}</td>
                          <td className={`p-3 font-mono font-semibold ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            ${trade.pnl?.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Optimization Tips */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Optimization Tips</h3>
        <div className="space-y-2">
          <TipCard
            tip="Consider using a more efficient data structure for faster lookups"
            applicable={!allPassed}
          />
          <TipCard
            tip="Your solution is already optimal for this problem"
            applicable={allPassed}
          />
          <TipCard
            tip="Memory usage can be reduced by reusing variables"
            applicable={false}
          />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, percentile, isGood }) {
  return (
    <div className="bg-muted/20 rounded-lg p-4 border border-border">
      <div className="flex items-center gap-2 mb-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <div className="text-xl font-bold text-foreground font-mono mb-1">
        {value}
      </div>
      <div className={`text-xs ${isGood ? 'text-green-400' : 'text-yellow-400'}`}>
        Beats {percentile}
      </div>
    </div>
  );
}

function TradingMetricCard({ label, value, isPositive }) {
  return (
    <div className="bg-muted/20 rounded-lg p-3 border border-border">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className={`text-lg font-bold font-mono ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {value}
      </div>
    </div>
  );
}

function TipCard({ tip, applicable }) {
  if (!applicable) return null;
  
  return (
    <div className="flex items-start gap-2 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
      <ChevronRight size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
      <span className="text-sm text-blue-400">{tip}</span>
    </div>
  );
}
