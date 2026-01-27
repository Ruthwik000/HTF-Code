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
        input: "100.0 10\n99.0 5\n101.0 8",
        expectedOutput: "100.0\n101.0",
      },
      {
        id: 2,
        name: "Order Matching",
        input: "100.0 10\n100.0 5",
        expectedOutput: "5",
      },
      {
        id: 3,
        name: "Price-Time Priority",
        input: "100.0 10\n100.0 15\n99.5 20",
        expectedOutput: "100.0",
      },
      {
        id: 4,
        name: "Multiple Price Levels",
        input: "100.0 10\n99.5 20\n101.0 15\n100.5 25",
        expectedOutput: "100.0\n100.5",
      },
      {
        id: 5,
        name: "Empty Order Book",
        input: "",
        expectedOutput: "None\nNone",
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
        input: "100.0 10\n101.0 20\n99.0 15",
        expectedOutput: "100.11",
      },
      {
        id: 2,
        name: "Single Trade",
        input: "100.0 50",
        expectedOutput: "100.00",
      },
      {
        id: 3,
        name: "Equal Volumes",
        input: "100.0 10\n102.0 10\n98.0 10",
        expectedOutput: "100.00",
      },
      {
        id: 4,
        name: "Large Volume Weighted",
        input: "100.0 100\n102.0 50\n98.0 75",
        expectedOutput: "99.78",
      },
      {
        id: 5,
        name: "High Precision",
        input: "100.25 33\n100.50 67\n100.75 100",
        expectedOutput: "100.56",
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
        input: "150.00 1000\n150.01 800\n149.99 500",
        expectedOutput: "150.01",
      },
      {
        id: 2,
        name: "Arbitrage Detection",
        input: "150.10 100\n150.08 250",
        expectedOutput: "ARBITRAGE",
      },
      {
        id: 3,
        name: "Normal Market",
        input: "150.00 1000\n150.05 800\n150.10 500",
        expectedOutput: "150.10",
      },
      {
        id: 4,
        name: "Single Exchange",
        input: "150.00 1000",
        expectedOutput: "150.00",
      },
      {
        id: 5,
        name: "Large Spread",
        input: "150.00 1000\n151.00 800\n152.00 500",
        expectedOutput: "152.00",
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
        input: "105 52 2.5 2.0",
        expectedOutput: "SHORT",
      },
      {
        id: 2,
        name: "Mean Reversion",
        input: "100 50 0.3 2.0",
        expectedOutput: "CLOSE",
      },
      {
        id: 3,
        name: "No Signal",
        input: "100 50 1.5 2.0",
        expectedOutput: "HOLD",
      },
      {
        id: 4,
        name: "Long Entry",
        input: "95 52 -2.5 2.0",
        expectedOutput: "LONG",
      },
      {
        id: 5,
        name: "Stop Loss",
        input: "110 52 3.5 2.0",
        expectedOutput: "STOP",
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
        input: "100.00 0 0.20",
        expectedOutput: "99.98 100.02",
      },
      {
        id: 2,
        name: "Positive Inventory",
        input: "100.00 500 0.20",
        expectedOutput: "99.96 100.01",
      },
      {
        id: 3,
        name: "Negative Inventory",
        input: "100.00 -500 0.20",
        expectedOutput: "99.99 100.04",
      },
      {
        id: 4,
        name: "High Volatility",
        input: "100.00 0 0.50",
        expectedOutput: "99.95 100.05",
      },
      {
        id: 5,
        name: "Low Volatility",
        input: "100.00 0 0.10",
        expectedOutput: "99.99 100.01",
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
