export const problems = [
  {
    id: "1",
    title: "Market Making Basic",
    slug: "market-making-basic",
    difficulty: "Easy",
    topics: ["Market Making", "Order Book"],
    status: "Solved",
    score: 98.5,
    acceptance: "45%",
    description: "Implement a simple market making strategy that provides liquidity on both sides of the order book.",
  },
  {
    id: "2",
    title: "Triangular Arbitrage",
    slug: "triangular-arbitrage",
    difficulty: "Medium",
    topics: ["Arbitrage", "Execution Algorithms"],
    status: "Attempted",
    score: null,
    acceptance: "32%",
    description: "Identify and execute triangular arbitrage opportunities across three currency pairs.",
  },
  {
    id: "3",
    title: "VWAP Execution",
    slug: "vwap-execution",
    difficulty: "Medium",
    topics: ["Execution Algorithms"],
    status: "Unsolved",
    score: null,
    acceptance: "28%",
    description: "Minimize market impact by executing a large order over time close to the Volume Weighted Average Price.",
  },
  {
    id: "4",
    title: "Latency Arbitrage",
    slug: "latency-arbitrage",
    difficulty: "Hard",
    topics: ["Latency & Microstructure", "Arbitrage"],
    status: "Unsolved",
    score: null,
    acceptance: "12%",
    description: "Exploit price discrepancies between two exchanges caused by network latency.",
  },
  {
    id: "5",
    title: "Order Book Imbalance",
    slug: "order-book-imbalance",
    difficulty: "Easy",
    topics: ["Order Book", "Microstructure"],
    status: "Solved",
    score: 92.0,
    acceptance: "55%",
    description: "Predict short-term price movements based on the imbalance between bid and ask volumes.",
  }
];

export const difficulties = ["Easy", "Medium", "Hard"];

export const topics = [
  "Market Making",
  "Order Book",
  "Execution Algorithms",
  "Arbitrage",
  "Latency & Microstructure"
];
