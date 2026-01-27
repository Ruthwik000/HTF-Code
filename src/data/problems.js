export const problems = [
  {
    id: "1",
    title: "Order Book Implementation",
    slug: "order-book-implementation",
    difficulty: "Hard",
    topics: ["Order Book", "Data Structures", "Market Making"],
    status: "Unsolved",
    score: null,
    acceptance: "15%",
    description: "Implement a limit order book that supports add, cancel, execute operations with price-time priority. Must handle 1M+ orders with O(log n) operations.",
    companies: ["Citadel", "Jane Street", "HRT", "Two Sigma", "Jump Trading"],
    testCases: [
      {
        id: 1,
        name: "Basic Operations",
        input: "ADD BUY 100.0 10\nADD BUY 99.0 5\nADD SELL 101.0 8\nGET_BEST_BID\nGET_BEST_ASK",
        expectedOutput: "Best Bid: 100.0 (10 shares)\nBest Ask: 101.0 (8 shares)",
      },
      {
        id: 2,
        name: "Order Matching",
        input: "ADD BUY 100.0 10\nADD SELL 100.0 5\nMARKET_ORDER BUY 5",
        expectedOutput: "Market order executed: 5 shares at 100.0",
      },
      {
        id: 3,
        name: "Order Cancellation",
        input: "ADD BUY 100.0 10\nCANCEL order1\nGET_BEST_BID",
        expectedOutput: "Best Bid: None",
      }
    ],
    metrics: {
      latency: "< 1μs per operation",
      throughput: "1M+ orders/sec",
      complexity: "O(log n) add/cancel, O(1) best price"
    }
  },
  {
    id: "2",
    title: "VWAP Calculation",
    slug: "vwap-calculation",
    difficulty: "Medium",
    topics: ["Execution Algorithms", "Time Series", "Optimization"],
    status: "Unsolved",
    score: null,
    acceptance: "28%",
    description: "Implement a VWAP calculator that maintains rolling windows and efficiently computes volume-weighted average price over different time periods.",
    companies: ["Citadel", "Two Sigma", "DE Shaw", "Optiver", "IMC Trading"],
    testCases: [
      {
        id: 1,
        name: "Basic VWAP",
        input: "TRADE 100.0 10\nTRADE 101.0 20\nTRADE 99.0 15\nVWAP_LAST_N 3",
        expectedOutput: "VWAP: 100.11",
      },
      {
        id: 2,
        name: "Time-based VWAP",
        input: "TRADE 100.0 10 t=1000\nTRADE 101.0 20 t=1500\nVWAP_LAST_SECONDS 2",
        expectedOutput: "VWAP: 100.67",
      },
      {
        id: 3,
        name: "Rolling Window",
        input: "TRADE 100.0 100\nTRADE 102.0 50\nTRADE 98.0 75\nVWAP_LAST_N 2",
        expectedOutput: "VWAP: 99.78",
      }
    ],
    metrics: {
      latency: "< 500ns per update",
      complexity: "O(1) for fixed window, O(n) for variable"
    }
  },
  {
    id: "3",
    title: "Market Data Feed Handler",
    slug: "market-data-feed-handler",
    difficulty: "Hard",
    topics: ["Low Latency", "Concurrency", "Market Microstructure"],
    status: "Unsolved",
    score: null,
    acceptance: "12%",
    description: "Design a low-latency market data feed handler processing tick data from multiple exchanges. Detect arbitrage and maintain NBBO with sub-100μs latency.",
    companies: ["Jane Street", "HRT", "Jump Trading", "Virtu", "Tower Research"],
    testCases: [
      {
        id: 1,
        name: "Multi-Exchange NBBO",
        input: "TICK NYSE AAPL BID 150.00 1000\nTICK NASDAQ AAPL BID 150.01 800\nGET_NBBO AAPL",
        expectedOutput: "Best Bid: 150.01 @ NASDAQ",
      },
      {
        id: 2,
        name: "Arbitrage Detection",
        input: "TICK EXCHANGE_A AAPL BID 150.10 100\nTICK EXCHANGE_B AAPL ASK 150.08 250\nDETECT_ARBITRAGE AAPL",
        expectedOutput: "ARBITRAGE: Crossed market detected",
      }
    ],
    metrics: {
      latency: "< 100μs tick-to-trade",
      throughput: "10M+ ticks/sec"
    }
  },
  {
    id: "4",
    title: "Pairs Trading Strategy",
    slug: "pairs-trading-strategy",
    difficulty: "Hard",
    topics: ["Statistical Arbitrage", "Mean Reversion", "Risk Management"],
    status: "Unsolved",
    score: null,
    acceptance: "18%",
    description: "Implement a pairs trading strategy using z-score mean reversion. Calculate hedge ratios, detect entry/exit signals, and manage positions with stop-loss.",
    companies: ["Two Sigma", "Renaissance", "DE Shaw", "Citadel", "AQR"],
    testCases: [
      {
        id: 1,
        name: "Z-Score Entry Signal",
        input: "STOCK_A: 105, STOCK_B: 52\nZSCORE: 2.5\nTHRESHOLD: 2.0",
        expectedOutput: "Signal: SHORT STOCK_A, LONG STOCK_B",
      },
      {
        id: 2,
        name: "Mean Reversion Exit",
        input: "ZSCORE: [2.5, 2.3, 1.8, 0.6, 0.3]\nEXIT_THRESHOLD: 0.5",
        expectedOutput: "Position closed at z=0.3\nP&L: +$245.50",
      },
      {
        id: 3,
        name: "Stop Loss",
        input: "ENTRY_ZSCORE: 2.0\nCURRENT_ZSCORE: 3.5\nSTOP_LOSS: 3.0",
        expectedOutput: "STOP LOSS TRIGGERED\nLoss: -$120.00",
      }
    ],
    metrics: {
      sharpe: "> 2.0",
      maxDrawdown: "< 10%",
      winRate: "> 55%"
    }
  },
  {
    id: "5",
    title: "Market Making with Inventory",
    slug: "market-making-inventory",
    difficulty: "Hard",
    topics: ["Market Making", "Inventory Management", "Avellaneda-Stoikov"],
    status: "Unsolved",
    score: null,
    acceptance: "10%",
    description: "Design a market making strategy using Avellaneda-Stoikov model. Quote bid/ask prices while managing inventory risk and avoiding adverse selection.",
    companies: ["Jane Street", "Optiver", "IMC Trading", "Flow Traders", "Susquehanna"],
    testCases: [
      {
        id: 1,
        name: "Basic Quoting",
        input: "PRICE: 100.00\nINVENTORY: 0\nVOLATILITY: 0.20",
        expectedOutput: "Bid: 99.98 x 100\nAsk: 100.02 x 100",
      },
      {
        id: 2,
        name: "Inventory Skewing",
        input: "PRICE: 100.00\nINVENTORY: +500\nMAX: 1000",
        expectedOutput: "Bid: 99.96 x 50\nAsk: 100.01 x 150 [skewed to sell]",
      },
      {
        id: 3,
        name: "Adverse Selection",
        input: "LAST_FILLS: [BUY, BUY, BUY, BUY]",
        expectedOutput: "Spread widened: 0.08 (2x)\nSize reduced: 50%",
      }
    ],
    metrics: {
      spreadCapture: "> 3 bps",
      inventoryTurnover: "< 1 hour",
      fillRate: "> 40%"
    }
  }
];

export const difficulties = ["Easy", "Medium", "Hard"];

export const topics = [
  "Order Book",
  "Data Structures",
  "Market Making",
  "Execution Algorithms",
  "Time Series",
  "Optimization",
  "Low Latency",
  "Concurrency",
  "Market Microstructure",
  "Statistical Arbitrage",
  "Mean Reversion",
  "Risk Management",
  "Inventory Management",
  "Avellaneda-Stoikov"
];

export const companies = [
  "Citadel",
  "Jane Street",
  "HRT",
  "Two Sigma",
  "Jump Trading",
  "DE Shaw",
  "Optiver",
  "IMC Trading",
  "Virtu",
  "Tower Research",
  "Renaissance",
  "AQR",
  "Flow Traders",
  "Susquehanna"
];
