const fs = require('fs');

const problems = [];
let id = 101;

// Helper to generate random companies
const getCompanies = () => {
  const all = ['Citadel', 'Jane Street', 'HRT', 'Two Sigma', 'Jump Trading', 'DE Shaw', 'Optiver', 'IMC Trading', 'Virtu', 'Tower Research'];
  return all.sort(() => 0.5 - Math.random()).slice(0, 3);
};

// EASY PROBLEMS (40 problems)
const easyProblems = [
  { title: 'Simple Moving Average', slug: 'simple-moving-average', desc: 'Calculate SMA for window N', topics: ['Time Series', 'Moving Averages'], 
    tests: [
      { id: 1, name: 'Window 3', input: '3\\n10 20 30', expectedOutput: '20.00' },
      { id: 2, name: 'Window 5', input: '5\\n10 20 30 40 50', expectedOutput: '30.00' },
      { id: 3, name: 'Single', input: '1\\n100', expectedOutput: '100.00' }
    ]
  },
  { title: 'Bid-Ask Spread Calculator', slug: 'bid-ask-spread', desc: 'Calculate spread between bid and ask', topics: ['Market Microstructure'],
    tests: [
      { id: 1, name: 'Basic', input: '100.00 100.50', expectedOutput: '0.50' },
      { id: 2, name: 'Tight', input: '50.00 50.01', expectedOutput: '0.01' },
      { id: 3, name: 'Wide', input: '100.00 105.00', expectedOutput: '5.00' }
    ]
  },
  { title: 'Price Change Percentage', slug: 'price-change-pct', desc: 'Calculate % change', topics: ['Basic Math'],
    tests: [
      { id: 1, name: 'Up', input: '100 110', expectedOutput: '10.00' },
      { id: 2, name: 'Down', input: '100 95', expectedOutput: '-5.00' },
      { id: 3, name: 'Flat', input: '100 100', expectedOutput: '0.00' }
    ]
  },
  { title: 'Volume Weighted Price', slug: 'vwp-calc', desc: 'Calculate VWP', topics: ['Execution'],
    tests: [
      { id: 1, name: 'Two trades', input: '2\\n100 10\\n110 20', expectedOutput: '106.67' },
      { id: 2, name: 'Equal vol', input: '3\\n100 10\\n110 10\\n120 10', expectedOutput: '110.00' },
      { id: 3, name: 'Single', input: '1\\n100 50', expectedOutput: '100.00' }
    ]
  },
  { title: 'Tick Size Rounding', slug: 'tick-rounding', desc: 'Round to tick', topics: ['Market Microstructure'],
    tests: [
      { id: 1, name: 'Down', input: '100.234 0.01', expectedOutput: '100.23' },
      { id: 2, name: 'Up', input: '100.237 0.01', expectedOutput: '100.24' },
      { id: 3, name: 'Exact', input: '100.25 0.05', expectedOutput: '100.25' }
    ]
  }
];

// Generate 40 easy problems
for (let i = 0; i < 40; i++) {
  const template = easyProblems[i % easyProblems.length];
  problems.push({
    id: String(id++),
    title: `${template.title} ${Math.floor(i / easyProblems.length) + 1}`,
    slug: `${template.slug}-${i + 1}`,
    difficulty: 'Easy',
    topics: template.topics,
    status: 'Unsolved',
    acceptance: `${70 + Math.floor(Math.random() * 20)}%`,
    description: template.desc,
    companies: getCompanies(),
    testCases: template.tests
  });
}

console.log(`Generated ${problems.length} easy problems...`);

// MEDIUM PROBLEMS (40 problems)
const mediumProblems = [
  { title: 'Bollinger Bands', slug: 'bollinger-bands', desc: 'Calculate upper and lower Bollinger Bands', topics: ['Technical Analysis', 'Statistics'],
    tests: [
      { id: 1, name: 'Basic', input: '5 2\\n100 102 104 103 105', expectedOutput: '107.00 99.00' },
      { id: 2, name: 'Tight', input: '3 1\\n100 100 100', expectedOutput: '100.00 100.00' },
      { id: 3, name: 'Volatile', input: '4 2\\n100 110 90 105', expectedOutput: '115.00 85.00' }
    ]
  },
  { title: 'RSI Calculator', slug: 'rsi-calc', desc: 'Calculate Relative Strength Index', topics: ['Technical Analysis'],
    tests: [
      { id: 1, name: 'Overbought', input: '14\\n100 105 110 115 120 125 130 135 140 145 150 155 160 165', expectedOutput: '100.00' },
      { id: 2, name: 'Neutral', input: '5\\n100 102 101 103 102', expectedOutput: '50.00' },
      { id: 3, name: 'Oversold', input: '5\\n100 95 90 85 80', expectedOutput: '0.00' }
    ]
  },
  { title: 'MACD Indicator', slug: 'macd-calc', desc: 'Calculate MACD line', topics: ['Technical Analysis'],
    tests: [
      { id: 1, name: 'Bullish', input: '12 26\\n100 102 104 106 108 110 112 114 116 118 120 122 124 126 128 130 132 134 136 138 140 142 144 146 148 150', expectedOutput: '5.50' },
      { id: 2, name: 'Bearish', input: '5 10\\n150 148 146 144 142 140 138 136 134 132', expectedOutput: '-3.20' },
      { id: 3, name: 'Flat', input: '3 5\\n100 100 100 100 100', expectedOutput: '0.00' }
    ]
  },
  { title: 'Order Book Depth', slug: 'order-depth', desc: 'Calculate total depth at N levels', topics: ['Order Book', 'Market Microstructure'],
    tests: [
      { id: 1, name: '3 Levels', input: '3\\n100.0 10\\n99.5 20\\n99.0 30', expectedOutput: '60' },
      { id: 2, name: '5 Levels', input: '5\\n100 100\\n99 200\\n98 300\\n97 400\\n96 500', expectedOutput: '1500' },
      { id: 3, name: 'Single', input: '1\\n100 1000', expectedOutput: '1000' }
    ]
  },
  { title: 'Liquidity Score', slug: 'liquidity-score', desc: 'Calculate liquidity score', topics: ['Market Microstructure'],
    tests: [
      { id: 1, name: 'High', input: '1000000 0.01', expectedOutput: '100.00' },
      { id: 2, name: 'Medium', input: '500000 0.05', expectedOutput: '50.00' },
      { id: 3, name: 'Low', input: '100000 0.10', expectedOutput: '10.00' }
    ]
  }
];

for (let i = 0; i < 40; i++) {
  const template = mediumProblems[i % mediumProblems.length];
  problems.push({
    id: String(id++),
    title: `${template.title} ${Math.floor(i / mediumProblems.length) + 1}`,
    slug: `${template.slug}-${i + 1}`,
    difficulty: 'Medium',
    topics: template.topics,
    status: 'Unsolved',
    acceptance: `${40 + Math.floor(Math.random() * 30)}%`,
    description: template.desc,
    companies: getCompanies(),
    testCases: template.tests
  });
}

console.log(`Generated ${problems.length} problems (easy + medium)...`);

// HARD PROBLEMS (20 problems)
const hardProblems = [
  { title: 'Optimal Execution TWAP', slug: 'twap-execution', desc: 'Implement Time-Weighted Average Price execution', topics: ['Execution Algorithms', 'Optimization'],
    tests: [
      { id: 1, name: 'Basic', input: '1000 5\\n100 101 102 103 104', expectedOutput: '200 200 200 200 200' },
      { id: 2, name: 'Uneven', input: '1000 3\\n100 105 110', expectedOutput: '333 333 334' },
      { id: 3, name: 'Single', input: '500 1\\n100', expectedOutput: '500' }
    ]
  },
  { title: 'Statistical Arbitrage', slug: 'stat-arb', desc: 'Detect stat arb opportunities', topics: ['Statistical Arbitrage', 'Pairs Trading'],
    tests: [
      { id: 1, name: 'Opportunity', input: '100 50 2.5 2.0', expectedOutput: 'SHORT_A_LONG_B' },
      { id: 2, name: 'No Signal', input: '100 50 1.5 2.0', expectedOutput: 'HOLD' },
      { id: 3, name: 'Reverse', input: '95 52 -2.5 2.0', expectedOutput: 'LONG_A_SHORT_B' }
    ]
  },
  { title: 'Greeks Calculator', slug: 'options-greeks', desc: 'Calculate option Greeks (Delta, Gamma, Theta)', topics: ['Options', 'Derivatives'],
    tests: [
      { id: 1, name: 'ATM Call', input: 'CALL 100 100 0.20 30 0.05', expectedOutput: '0.50 0.02 -0.05' },
      { id: 2, name: 'ITM Put', input: 'PUT 100 110 0.25 60 0.03', expectedOutput: '-0.75 0.01 -0.03' },
      { id: 3, name: 'OTM Call', input: 'CALL 100 120 0.30 90 0.04', expectedOutput: '0.20 0.01 -0.02' }
    ]
  },
  { title: 'Market Making Strategy', slug: 'mm-strategy', desc: 'Implement market making with inventory management', topics: ['Market Making', 'Inventory Management'],
    tests: [
      { id: 1, name: 'Neutral', input: '100.00 0 0.20 1000', expectedOutput: '99.98 100.02' },
      { id: 2, name: 'Long Inventory', input: '100.00 500 0.20 1000', expectedOutput: '99.96 100.01' },
      { id: 3, name: 'Short Inventory', input: '100.00 -500 0.20 1000', expectedOutput: '99.99 100.04' }
    ]
  },
  { title: 'Portfolio Optimization', slug: 'portfolio-opt', desc: 'Optimize portfolio weights using Sharpe ratio', topics: ['Portfolio Management', 'Optimization'],
    tests: [
      { id: 1, name: 'Two Assets', input: '2\\n0.10 0.15\\n0.20 0.25', expectedOutput: '0.60 0.40' },
      { id: 2, name: 'Three Assets', input: '3\\n0.08 0.12 0.15\\n0.15 0.20 0.30', expectedOutput: '0.50 0.30 0.20' },
      { id: 3, name: 'Equal Weight', input: '4\\n0.10 0.10 0.10 0.10\\n0.20 0.20 0.20 0.20', expectedOutput: '0.25 0.25 0.25 0.25' }
    ]
  }
];

for (let i = 0; i < 20; i++) {
  const template = hardProblems[i % hardProblems.length];
  problems.push({
    id: String(id++),
    title: `${template.title} ${Math.floor(i / hardProblems.length) + 1}`,
    slug: `${template.slug}-${i + 1}`,
    difficulty: 'Hard',
    topics: template.topics,
    status: 'Unsolved',
    acceptance: `${10 + Math.floor(Math.random() * 20)}%`,
    description: template.desc,
    companies: getCompanies(),
    testCases: template.tests,
    metrics: {
      latency: '< 100μs',
      complexity: 'O(n log n)',
      memory: '< 100MB'
    }
  });
}

console.log(`Generated ${problems.length} total problems!`);

// Output
const output = `// Auto-generated 100 HFT/Algo Trading Problems
export const generatedProblems = ${JSON.stringify(problems, null, 2)};
`;

fs.writeFileSync('src/data/generated100Problems.js', output);
console.log('✅ Saved to src/data/generated100Problems.js');
