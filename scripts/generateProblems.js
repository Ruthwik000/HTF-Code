// Script to generate 100 HFT/Algo Trading Problems
const fs = require('fs');

const difficulties = ['Easy', 'Medium', 'Hard'];
const companies = [
  'Citadel', 'Jane Street', 'HRT', 'Two Sigma', 'Jump Trading',
  'DE Shaw', 'Optiver', 'IMC Trading', 'Virtu', 'Tower Research',
  'Renaissance', 'AQR', 'Flow Traders', 'Susquehanna', 'DRW'
];

const problemTemplates = [
  // Easy Problems (1-40)
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `${101 + i}`,
    difficulty: 'Easy',
    acceptance: `${70 + Math.floor(Math.random() * 20)}%`,
    topics: ['Basic Math', 'Time Series', 'Market Microstructure'],
    problems: [
      { title: 'Simple Moving Average', slug: 'sma', desc: 'Calculate SMA for window N' },
      { title: 'Exponential Moving Average', slug: 'ema', desc: 'Calculate EMA with smoothing factor' },
      { title: 'Bid-Ask Spread', slug: 'spread', desc: 'Calculate bid-ask spread' },
      { title: 'Price Change %', slug: 'price-change', desc: 'Calculate percentage price change' },
      { title: 'Volume Weighted Price', slug: 'vwp', desc: 'Calculate volume-weighted price' },
      { title: 'Tick Rounding', slug: 'tick-round', desc: 'Round to nearest tick size' },
      { title: 'Fill Rate', slug: 'fill-rate', desc: 'Calculate order fill rate' },
      { title: 'Position P&L', slug: 'pnl', desc: 'Calculate position profit/loss' },
      { title: 'Slippage', slug: 'slippage', desc: 'Calculate execution slippage' },
      { title: 'Daily Return', slug: 'daily-return', desc: 'Calculate daily return %' },
      { title: 'Lot Size', slug: 'lot-size', desc: 'Calculate tradeable lot size' },
      { title: 'Commission Cost', slug: 'commission', desc: 'Calculate trading commission' },
      { title: 'Break-Even Price', slug: 'breakeven', desc: 'Calculate break-even price' },
      { title: 'Risk-Reward Ratio', slug: 'risk-reward', desc: 'Calculate risk/reward ratio' },
      { title: 'Position Size', slug: 'position-size', desc: 'Calculate position size from risk' },
      { title: 'Stop Loss Price', slug: 'stop-loss', desc: 'Calculate stop loss price' },
      { title: 'Take Profit Price', slug: 'take-profit', desc: 'Calculate take profit price' },
      { title: 'Average Entry Price', slug: 'avg-entry', desc: 'Calculate average entry price' },
      { title: 'Realized P&L', slug: 'realized-pnl', desc: 'Calculate realized profit/loss' },
      { title: 'Unrealized P&L', slug: 'unrealized-pnl', desc: 'Calculate unrealized P&L' },
