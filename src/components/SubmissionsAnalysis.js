"use client";

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

export default function SubmissionsAnalysis({ testResults, testCases }) {
  if (!testResults || !testResults.testResults || testResults.testResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Database size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No Submissions Yet</h3>
        <p className="text-muted-foreground max-w-xs">
          Submit your solution to see detailed analysis and performance metrics
        </p>
      </div>
    );
  }

  const results = testResults.testResults;
  const passedTests = results.filter(r => r.passed).length;
  const totalTests = results.length;
  const allPassed = passedTests === totalTests;
  const firstResult = results[0];
  const avgExecutionTime = (results.reduce((sum, r) => sum + (r.metrics?.executionTime || 0), 0) / results.length).toFixed(2);
  
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
    <div className="space-y-6">
      {/* Status Header */}
      <div className={`p-4 rounded-lg border ${
        allPassed 
          ? 'bg-green-500/10 border-green-500/20' 
          : 'bg-red-500/10 border-red-500/20'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          {allPassed ? (
            <>
              <CheckCircle2 className="text-green-500" size={24} />
              <div>
                <h3 className="text-lg font-semibold text-green-500">Accepted</h3>
                <p className="text-sm text-muted-foreground">All test cases passed</p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="text-red-500" size={24} />
              <div>
                <h3 className="text-lg font-semibold text-red-500">Wrong Answer</h3>
                <p className="text-sm text-muted-foreground">{passedTests} / {totalTests} test cases passed</p>
              </div>
            </>
          )}
        </div>
      </div>

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
            label="Runtime"
            value={`${avgExecutionTime}ms`}
            percentile="85.2%"
            isGood={true}
          />
          <MetricCard
            icon={<Database size={16} />}
            label="Memory"
            value="42.1 MB"
            percentile="78.5%"
            isGood={true}
          />
          <MetricCard
            icon={<CheckCircle2 size={16} />}
            label="Test Cases"
            value={`${passedTests}/${totalTests}`}
            percentile={allPassed ? "100%" : `${((passedTests / totalTests) * 100).toFixed(0)}%`}
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
            <div className="grid grid-cols-2 gap-3">
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
                        <th className="p-3 font-medium">Qty</th>
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

      {/* Test Cases Summary */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Test Cases Summary</h3>
        <div className="space-y-2">
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${
                result.passed 
                  ? 'bg-green-500/5 border-green-500/20' 
                  : 'bg-red-500/5 border-red-500/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {result.passed ? (
                    <CheckCircle2 className="text-green-500" size={16} />
                  ) : (
                    <XCircle className="text-red-500" size={16} />
                  )}
                  <span className="text-sm font-medium text-foreground">
                    Test Case {index + 1}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {result.metrics?.executionTime}ms
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
