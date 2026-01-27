"use client";

import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function TradingAnalytics({ results }) {
  if (!results || !results.tradingMetrics) {
    return null;
  }

  const { tradingMetrics } = results;

  // P&L Chart
  const pnlData = {
    labels: tradingMetrics.pnlHistory?.map((_, i) => `T${i}`) || [],
    datasets: [
      {
        label: 'Cumulative P&L ($)',
        data: tradingMetrics.pnlHistory || [],
        borderColor: tradingMetrics.pnlHistory?.[tradingMetrics.pnlHistory.length - 1] >= 0 
          ? 'rgb(34, 197, 94)' 
          : 'rgb(239, 68, 68)',
        backgroundColor: tradingMetrics.pnlHistory?.[tradingMetrics.pnlHistory.length - 1] >= 0
          ? 'rgba(34, 197, 94, 0.1)'
          : 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Price Chart (if available)
  const priceData = tradingMetrics.priceHistory ? {
    labels: tradingMetrics.priceHistory.map((_, i) => `T${i}`),
    datasets: [
      {
        label: 'Price',
        data: tradingMetrics.priceHistory,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: false,
        tension: 0.4,
      },
    ],
  } : null;

  // Order Book Depth Chart
  const depthData = tradingMetrics.orderBookDepth ? {
    labels: tradingMetrics.orderBookDepth.prices,
    datasets: [
      {
        label: 'Bid Volume',
        data: tradingMetrics.orderBookDepth.bids,
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      },
      {
        label: 'Ask Volume',
        data: tradingMetrics.orderBookDepth.asks,
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgb(156, 163, 175)',
          font: { size: 11 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: 'rgb(243, 244, 246)',
        bodyColor: 'rgb(209, 213, 219)',
        borderColor: 'rgb(75, 85, 99)',
        borderWidth: 1,
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
      {/* Trading Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Total P&L"
          value={`$${tradingMetrics.totalPnL?.toFixed(2) || '0.00'}`}
          positive={tradingMetrics.totalPnL >= 0}
        />
        <MetricCard
          label="Sharpe Ratio"
          value={tradingMetrics.sharpeRatio?.toFixed(2) || 'N/A'}
          positive={tradingMetrics.sharpeRatio > 1}
        />
        <MetricCard
          label="Win Rate"
          value={`${tradingMetrics.winRate?.toFixed(1) || '0.0'}%`}
          positive={tradingMetrics.winRate > 50}
        />
        <MetricCard
          label="Max Drawdown"
          value={`${tradingMetrics.maxDrawdown?.toFixed(2) || '0.00'}%`}
          positive={Math.abs(tradingMetrics.maxDrawdown) < 10}
        />
      </div>

      {/* P&L Chart */}
      {tradingMetrics.pnlHistory && tradingMetrics.pnlHistory.length > 0 && (
        <div className="bg-muted/20 p-4 rounded-lg border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">P&L Over Time</h4>
          <div className="h-48">
            <Line data={pnlData} options={chartOptions} />
          </div>
        </div>
      )}

      {/* Price Chart */}
      {priceData && (
        <div className="bg-muted/20 p-4 rounded-lg border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">Price Movement</h4>
          <div className="h-48">
            <Line data={priceData} options={chartOptions} />
          </div>
        </div>
      )}

      {/* Order Book Depth */}
      {depthData && (
        <div className="bg-muted/20 p-4 rounded-lg border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">Order Book Depth</h4>
          <div className="h-48">
            <Bar data={depthData} options={chartOptions} />
          </div>
        </div>
      )}

      {/* Trade Log */}
      {tradingMetrics.trades && tradingMetrics.trades.length > 0 && (
        <div className="bg-muted/20 p-4 rounded-lg border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">Trade Log</h4>
          <div className="max-h-48 overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-muted/30">
                <tr className="text-left text-muted-foreground">
                  <th className="p-2">Time</th>
                  <th className="p-2">Side</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">P&L</th>
                </tr>
              </thead>
              <tbody>
                {tradingMetrics.trades.map((trade, i) => (
                  <tr key={i} className="border-t border-border/50 hover:bg-muted/10">
                    <td className="p-2 text-muted-foreground">{trade.time}</td>
                    <td className={`p-2 font-medium ${trade.side === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.side}
                    </td>
                    <td className="p-2 font-mono">${trade.price}</td>
                    <td className="p-2">{trade.quantity}</td>
                    <td className={`p-2 font-mono ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ${trade.pnl?.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, value, positive }) {
  return (
    <div className="bg-muted/20 p-3 rounded-lg border border-border">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`text-lg font-bold font-mono ${
        positive ? 'text-green-400' : 'text-red-400'
      }`}>
        {value}
      </p>
    </div>
  );
}
