// Auto-generated 100 HFT/Algo Trading Problems
export const generatedProblems = [
  {
    "id": "101",
    "title": "Simple Moving Average 1",
    "slug": "simple-moving-average-1",
    "difficulty": "Easy",
    "topics": [
      "Time Series",
      "Moving Averages"
    ],
    "status": "Unsolved",
    "acceptance": "79%",
    "description": "Calculate SMA for window N",
    "companies": [
      "Citadel",
      "Tower Research",
      "Two Sigma"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Window 3",
        "input": "3\\n10 20 30",
        "expectedOutput": "20.00"
      },
      {
        "id": 2,
        "name": "Window 5",
        "input": "5\\n10 20 30 40 50",
        "expectedOutput": "30.00"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100",
        "expectedOutput": "100.00"
      }
    ]
  },
  {
    "id": "102",
    "title": "Bid-Ask Spread Calculator 1",
    "slug": "bid-ask-spread-2",
    "difficulty": "Easy",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "74%",
    "description": "Calculate spread between bid and ask",
    "companies": [
      "Jane Street",
      "Two Sigma",
      "IMC Trading"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "100.00 100.50",
        "expectedOutput": "0.50"
      },
      {
        "id": 2,
        "name": "Tight",
        "input": "50.00 50.01",
        "expectedOutput": "0.01"
      },
      {
        "id": 3,
        "name": "Wide",
        "input": "100.00 105.00",
        "expectedOutput": "5.00"
      }
    ]
  },
  {
    "id": "103",
    "title": "Price Change Percentage 1",
    "slug": "price-change-pct-3",
    "difficulty": "Easy",
    "topics": [
      "Basic Math"
    ],
    "status": "Unsolved",
    "acceptance": "89%",
    "description": "Calculate % change",
    "companies": [
      "Jump Trading",
      "IMC Trading",
      "Two Sigma"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Up",
        "input": "100 110",
        "expectedOutput": "10.00"
      },
      {
        "id": 2,
        "name": "Down",
        "input": "100 95",
        "expectedOutput": "-5.00"
      },
      {
        "id": 3,
        "name": "Flat",
        "input": "100 100",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "104",
    "title": "Volume Weighted Price 1",
    "slug": "vwp-calc-4",
    "difficulty": "Easy",
    "topics": [
      "Execution"
    ],
    "status": "Unsolved",
    "acceptance": "89%",
    "description": "Calculate VWP",
    "companies": [
      "Two Sigma",
      "Optiver",
      "Tower Research"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Two trades",
        "input": "2\\n100 10\\n110 20",
        "expectedOutput": "106.67"
      },
      {
        "id": 2,
        "name": "Equal vol",
        "input": "3\\n100 10\\n110 10\\n120 10",
        "expectedOutput": "110.00"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100 50",
        "expectedOutput": "100.00"
      }
    ]
  },
  {
    "id": "105",
    "title": "Tick Size Rounding 1",
    "slug": "tick-rounding-5",
    "difficulty": "Easy",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "89%",
    "description": "Round to tick",
    "companies": [
      "HRT",
      "Jane Street",
      "Optiver"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Down",
        "input": "100.234 0.01",
        "expectedOutput": "100.23"
      },
      {
        "id": 2,
        "name": "Up",
        "input": "100.237 0.01",
        "expectedOutput": "100.24"
      },
      {
        "id": 3,
        "name": "Exact",
        "input": "100.25 0.05",
        "expectedOutput": "100.25"
      }
    ]
  },
  {
    "id": "106",
    "title": "Simple Moving Average 2",
    "slug": "simple-moving-average-6",
    "difficulty": "Easy",
    "topics": [
      "Time Series",
      "Moving Averages"
    ],
    "status": "Unsolved",
    "acceptance": "80%",
    "description": "Calculate SMA for window N",
    "companies": [
      "DE Shaw",
      "Jump Trading",
      "Two Sigma"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Window 3",
        "input": "3\\n10 20 30",
        "expectedOutput": "20.00"
      },
      {
        "id": 2,
        "name": "Window 5",
        "input": "5\\n10 20 30 40 50",
        "expectedOutput": "30.00"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100",
        "expectedOutput": "100.00"
      }
    ]
  },
  {
    "id": "107",
    "title": "Bid-Ask Spread Calculator 2",
    "slug": "bid-ask-spread-7",
    "difficulty": "Easy",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "78%",
    "description": "Calculate spread between bid and ask",
    "companies": [
      "DE Shaw",
      "Citadel",
      "Tower Research"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "100.00 100.50",
        "expectedOutput": "0.50"
      },
      {
        "id": 2,
        "name": "Tight",
        "input": "50.00 50.01",
        "expectedOutput": "0.01"
      },
      {
        "id": 3,
        "name": "Wide",
        "input": "100.00 105.00",
        "expectedOutput": "5.00"
      }
    ]
  },
  {
    "id": "108",
    "title": "Price Change Percentage 2",
    "slug": "price-change-pct-8",
    "difficulty": "Easy",
    "topics": [
      "Basic Math"
    ],
    "status": "Unsolved",
    "acceptance": "81%",
    "description": "Calculate % change",
    "companies": [
      "DE Shaw",
      "Two Sigma",
      "HRT"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Up",
        "input": "100 110",
        "expectedOutput": "10.00"
      },
      {
        "id": 2,
        "name": "Down",
        "input": "100 95",
        "expectedOutput": "-5.00"
      },
      {
        "id": 3,
        "name": "Flat",
        "input": "100 100",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "109",
    "title": "Volume Weighted Price 2",
    "slug": "vwp-calc-9",
    "difficulty": "Easy",
    "topics": [
      "Execution"
    ],
    "status": "Unsolved",
    "acceptance": "72%",
    "description": "Calculate VWP",
    "companies": [
      "Two Sigma",
      "HRT",
      "Citadel"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Two trades",
        "input": "2\\n100 10\\n110 20",
        "expectedOutput": "106.67"
      },
      {
        "id": 2,
        "name": "Equal vol",
        "input": "3\\n100 10\\n110 10\\n120 10",
        "expectedOutput": "110.00"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100 50",
        "expectedOutput": "100.00"
      }
    ]
  },
  {
    "id": "110",
    "title": "Tick Size Rounding 2",
    "slug": "tick-rounding-10",
    "difficulty": "Easy",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "80%",
    "description": "Round to tick",
    "companies": [
      "Citadel",
      "Jane Street",
      "IMC Trading"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Down",
        "input": "100.234 0.01",
        "expectedOutput": "100.23"
      },
      {
        "id": 2,
        "name": "Up",
        "input": "100.237 0.01",
        "expectedOutput": "100.24"
      },
      {
        "id": 3,
        "name": "Exact",
        "input": "100.25 0.05",
        "expectedOutput": "100.25"
      }
    ]
  },
  {
    "id": "111",
    "title": "Simple Moving Average 3",
    "slug": "simple-moving-average-11",
    "difficulty": "Easy",
    "topics": [
      "Time Series",
      "Moving Averages"
    ],
    "status": "Unsolved",
    "acceptance": "76%",
    "description": "Calculate SMA for window N",
    "companies": [
      "Citadel",
      "Two Sigma",
      "Jane Street"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Window 3",
        "input": "3\\n10 20 30",
        "expectedOutput": "20.00"
      },
      {
        "id": 2,
        "name": "Window 5",
        "input": "5\\n10 20 30 40 50",
        "expectedOutput": "30.00"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100",
        "expectedOutput": "100.00"
      }
    ]
  },
  {
    "id": "112",
    "title": "Bid-Ask Spread Calculator 3",
    "slug": "bid-ask-spread-12",
    "difficulty": "Easy",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "73%",
    "description": "Calculate spread between bid and ask",
    "companies": [
      "Citadel",
      "Two Sigma",
      "Jump Trading"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "100.00 100.50",
        "expectedOutput": "0.50"
      },
      {
        "id": 2,
        "name": "Tight",
        "input": "50.00 50.01",
        "expectedOutput": "0.01"
      },
      {
        "id": 3,
        "name": "Wide",
        "input": "100.00 105.00",
        "expectedOutput": "5.00"
      }
    ]
  },
  {
    "id": "113",
    "title": "Price Change Percentage 3",
    "slug": "price-change-pct-13",
    "difficulty": "Easy",
    "topics": [
      "Basic Math"
    ],
    "status": "Unsolved",
    "acceptance": "72%",
    "description": "Calculate % change",
    "companies": [
      "Two Sigma",
      "Citadel",
      "Jane Street"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Up",
        "input": "100 110",
        "expectedOutput": "10.00"
      },
      {
        "id": 2,
        "name": "Down",
        "input": "100 95",
        "expectedOutput": "-5.00"
      },
      {
        "id": 3,
        "name": "Flat",
        "input": "100 100",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "114",
    "title": "Volume Weighted Price 3",
    "slug": "vwp-calc-14",
    "difficulty": "Easy",
    "topics": [
      "Execution"
    ],
    "status": "Unsolved",
    "acceptance": "73%",
    "description": "Calculate VWP",
    "companies": [
      "Two Sigma",
      "IMC Trading",
      "HRT"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Two trades",
        "input": "2\\n100 10\\n110 20",
        "expectedOutput": "106.67"
      },
      {
        "id": 2,
        "name": "Equal vol",
        "input": "3\\n100 10\\n110 10\\n120 10",
        "expectedOutput": "110.00"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100 50",
        "expectedOutput": "100.00"
      }
    ]
  },
  {
    "id": "115",
    "title": "Tick Size Rounding 3",
    "slug": "tick-rounding-15",
    "difficulty": "Easy",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "82%",
    "description": "Round to tick",
    "companies": [
      "Citadel",
      "Optiver",
      "IMC Trading"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Down",
        "input": "100.234 0.01",
        "expectedOutput": "100.23"
      },
      {
        "id": 2,
        "name": "Up",
        "input": "100.237 0.01",
        "expectedOutput": "100.24"
      },
      {
        "id": 3,
        "name": "Exact",
        "input": "100.25 0.05",
        "expectedOutput": "100.25"
      }
    ]
  },
  {
    "id": "116",
    "title": "Simple Moving Average 4",
    "slug": "simple-moving-average-16",
    "difficulty": "Easy",
    "topics": [
      "Time Series",
      "Moving Averages"
    ],
    "status": "Unsolved",
    "acceptance": "70%",
    "description": "Calculate SMA for window N",
    "companies": [
      "Citadel",
      "Optiver",
      "IMC Trading"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Window 3",
        "input": "3\\n10 20 30",
        "expectedOutput": "20.00"
      },
      {
        "id": 2,
        "name": "Window 5",
        "input": "5\\n10 20 30 40 50",
        "expectedOutput": "30.00"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100",
        "expectedOutput": "100.00"
      }
    ]
  },
  {
    "id": "117",
    "title": "Bid-Ask Spread Calculator 4",
    "slug": "bid-ask-spread-17",
    "difficulty": "Easy",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "89%",
    "description": "Calculate spread between bid and ask",
    "companies": [
      "HRT",
      "Jane Street",
      "Citadel"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "100.00 100.50",
        "expectedOutput": "0.50"
      },
      {
        "id": 2,
        "name": "Tight",
        "input": "50.00 50.01",
        "expectedOutput": "0.01"
      },
      {
        "id": 3,
        "name": "Wide",
        "input": "100.00 105.00",
        "expectedOutput": "5.00"
      }
    ]
  },
  {
    "id": "118",
    "title": "Price Change Percentage 4",
    "slug": "price-change-pct-18",
    "difficulty": "Easy",
    "topics": [
      "Basic Math"
    ],
    "status": "Unsolved",
    "acceptance": "80%",
    "description": "Calculate % change",
    "companies": [
      "Two Sigma",
      "HRT",
      "Jane Street"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Up",
        "input": "100 110",
        "expectedOutput": "10.00"
      },
      {
        "id": 2,
        "name": "Down",
        "input": "100 95",
        "expectedOutput": "-5.00"
      },
      {
        "id": 3,
        "name": "Flat",
        "input": "100 100",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "119",
    "title": "Volume Weighted Price 4",
    "slug": "vwp-calc-19",
    "difficulty": "Easy",
    "topics": [
      "Execution"
    ],
    "status": "Unsolved",
    "acceptance": "86%",
    "description": "Calculate VWP",
    "companies": [
      "Jump Trading",
      "Two Sigma",
      "Tower Research"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Two trades",
        "input": "2\\n100 10\\n110 20",
        "expectedOutput": "106.67"
      },
      {
        "id": 2,
        "name": "Equal vol",
        "input": "3\\n100 10\\n110 10\\n120 10",
        "expectedOutput": "110.00"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100 50",
        "expectedOutput": "100.00"
      }
    ]
  },
  {
    "id": "120",
    "title": "Tick Size Rounding 4",
    "slug": "tick-rounding-20",
    "difficulty": "Easy",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "76%",
    "description": "Round to tick",
    "companies": [
      "Citadel",
      "Jane Street",
      "DE Shaw"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Down",
        "input": "100.234 0.01",
        "expectedOutput": "100.23"
      },
      {
        "id": 2,
        "name": "Up",
        "input": "100.237 0.01",
        "expectedOutput": "100.24"
      },
      {
        "id": 3,
        "name": "Exact",
        "input": "100.25 0.05",
        "expectedOutput": "100.25"
      }
    ]
  },
  {
    "id": "121",
    "title": "Simple Moving Average 5",
    "slug": "simple-moving-average-21",
    "difficulty": "Easy",
    "topics": [
      "Time Series",
      "Moving Averages"
    ],
    "status": "Unsolved",
    "acceptance": "82%",
    "description": "Calculate SMA for window N",
    "companies": [
      "Citadel",
      "Jane Street",
      "HRT"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Window 3",
        "input": "3\\n10 20 30",
        "expectedOutput": "20.00"
      },
      {
        "id": 2,
        "name": "Window 5",
        "input": "5\\n10 20 30 40 50",
        "expectedOutput": "30.00"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100",
        "expectedOutput": "100.00"
      }
    ]
  },
  {
    "id": "122",
    "title": "Bid-Ask Spread Calculator 5",
    "slug": "bid-ask-spread-22",
    "difficulty": "Easy",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "78%",
    "description": "Calculate spread between bid and ask",
    "companies": [
      "Optiver",
      "Citadel",
      "Virtu"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "100.00 100.50",
        "expectedOutput": "0.50"
      },
      {
        "id": 2,
        "name": "Tight",
        "input": "50.00 50.01",
        "expectedOutput": "0.01"
      },
      {
        "id": 3,
        "name": "Wide",
        "input": "100.00 105.00",
        "expectedOutput": "5.00"
      }
    ]
  },
  {
    "id": "123",
    "title": "Price Change Percentage 5",
    "slug": "price-change-pct-23",
    "difficulty": "Easy",
    "topics": [
      "Basic Math"
    ],
    "status": "Unsolved",
    "acceptance": "74%",
    "description": "Calculate % change",
    "companies": [
      "DE Shaw",
      "Optiver",
      "Citadel"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Up",
        "input": "100 110",
        "expectedOutput": "10.00"
      },
      {
        "id": 2,
        "name": "Down",
        "input": "100 95",
        "expectedOutput": "-5.00"
      },
      {
        "id": 3,
        "name": "Flat",
        "input": "100 100",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "124",
    "title": "Volume Weighted Price 5",
    "slug": "vwp-calc-24",
    "difficulty": "Easy",
    "topics": [
      "Execution"
    ],
    "status": "Unsolved",
    "acceptance": "87%",
    "description": "Calculate VWP",
    "companies": [
      "Optiver",
      "HRT",
      "Virtu"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Two trades",
        "input": "2\\n100 10\\n110 20",
        "expectedOutput": "106.67"
      },
      {
        "id": 2,
        "name": "Equal vol",
        "input": "3\\n100 10\\n110 10\\n120 10",
        "expectedOutput": "110.00"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100 50",
        "expectedOutput": "100.00"
      }
    ]
  },
  {
    "id": "125",
    "title": "Tick Size Rounding 5",
    "slug": "tick-rounding-25",
    "difficulty": "Easy",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "70%",
    "description": "Round to tick",
    "companies": [
      "Jump Trading",
      "Citadel",
      "Tower Research"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Down",
        "input": "100.234 0.01",
        "expectedOutput": "100.23"
      },
      {
        "id": 2,
        "name": "Up",
        "input": "100.237 0.01",
        "expectedOutput": "100.24"
      },
      {
        "id": 3,
        "name": "Exact",
        "input": "100.25 0.05",
        "expectedOutput": "100.25"
      }
    ]
  },
  {
    "id": "126",
    "title": "Simple Moving Average 6",
    "slug": "simple-moving-average-26",
    "difficulty": "Easy",
    "topics": [
      "Time Series",
      "Moving Averages"
    ],
    "status": "Unsolved",
    "acceptance": "78%",
    "description": "Calculate SMA for window N",
    "companies": [
      "Two Sigma",
      "DE Shaw",
      "IMC Trading"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Window 3",
        "input": "3\\n10 20 30",
        "expectedOutput": "20.00"
      },
      {
        "id": 2,
        "name": "Window 5",
        "input": "5\\n10 20 30 40 50",
        "expectedOutput": "30.00"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100",
        "expectedOutput": "100.00"
      }
    ]
  },
  {
    "id": "127",
    "title": "Bid-Ask Spread Calculator 6",
    "slug": "bid-ask-spread-27",
    "difficulty": "Easy",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "83%",
    "description": "Calculate spread between bid and ask",
    "companies": [
      "Jump Trading",
      "IMC Trading",
      "Two Sigma"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "100.00 100.50",
        "expectedOutput": "0.50"
      },
      {
        "id": 2,
        "name": "Tight",
        "input": "50.00 50.01",
        "expectedOutput": "0.01"
      },
      {
        "id": 3,
        "name": "Wide",
        "input": "100.00 105.00",
        "expectedOutput": "5.00"
      }
    ]
  },
  {
    "id": "128",
    "title": "Price Change Percentage 6",
    "slug": "price-change-pct-28",
    "difficulty": "Easy",
    "topics": [
      "Basic Math"
    ],
    "status": "Unsolved",
    "acceptance": "70%",
    "description": "Calculate % change",
    "companies": [
      "Optiver",
      "DE Shaw",
      "Jump Trading"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Up",
        "input": "100 110",
        "expectedOutput": "10.00"
      },
      {
        "id": 2,
        "name": "Down",
        "input": "100 95",
        "expectedOutput": "-5.00"
      },
      {
        "id": 3,
        "name": "Flat",
        "input": "100 100",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "129",
    "title": "Volume Weighted Price 6",
    "slug": "vwp-calc-29",
    "difficulty": "Easy",
    "topics": [
      "Execution"
    ],
    "status": "Unsolved",
    "acceptance": "81%",
    "description": "Calculate VWP",
    "companies": [
      "Tower Research",
      "HRT",
      "Jane Street"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Two trades",
        "input": "2\\n100 10\\n110 20",
        "expectedOutput": "106.67"
      },
      {
        "id": 2,
        "name": "Equal vol",
        "input": "3\\n100 10\\n110 10\\n120 10",
        "expectedOutput": "110.00"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100 50",
        "expectedOutput": "100.00"
      }
    ]
  },
  {
    "id": "130",
    "title": "Tick Size Rounding 6",
    "slug": "tick-rounding-30",
    "difficulty": "Easy",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "83%",
    "description": "Round to tick",
    "companies": [
      "Two Sigma",
      "Optiver",
      "IMC Trading"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Down",
        "input": "100.234 0.01",
        "expectedOutput": "100.23"
      },
      {
        "id": 2,
        "name": "Up",
        "input": "100.237 0.01",
        "expectedOutput": "100.24"
      },
      {
        "id": 3,
        "name": "Exact",
        "input": "100.25 0.05",
        "expectedOutput": "100.25"
      }
    ]
  },
  {
    "id": "131",
    "title": "Simple Moving Average 7",
    "slug": "simple-moving-average-31",
    "difficulty": "Easy",
    "topics": [
      "Time Series",
      "Moving Averages"
    ],
    "status": "Unsolved",
    "acceptance": "72%",
    "description": "Calculate SMA for window N",
    "companies": [
      "Citadel",
      "Virtu",
      "Tower Research"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Window 3",
        "input": "3\\n10 20 30",
        "expectedOutput": "20.00"
      },
      {
        "id": 2,
        "name": "Window 5",
        "input": "5\\n10 20 30 40 50",
        "expectedOutput": "30.00"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100",
        "expectedOutput": "100.00"
      }
    ]
  },
  {
    "id": "132",
    "title": "Bid-Ask Spread Calculator 7",
    "slug": "bid-ask-spread-32",
    "difficulty": "Easy",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "72%",
    "description": "Calculate spread between bid and ask",
    "companies": [
      "Jane Street",
      "HRT",
      "DE Shaw"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "100.00 100.50",
        "expectedOutput": "0.50"
      },
      {
        "id": 2,
        "name": "Tight",
        "input": "50.00 50.01",
        "expectedOutput": "0.01"
      },
      {
        "id": 3,
        "name": "Wide",
        "input": "100.00 105.00",
        "expectedOutput": "5.00"
      }
    ]
  },
  {
    "id": "133",
    "title": "Price Change Percentage 7",
    "slug": "price-change-pct-33",
    "difficulty": "Easy",
    "topics": [
      "Basic Math"
    ],
    "status": "Unsolved",
    "acceptance": "85%",
    "description": "Calculate % change",
    "companies": [
      "Optiver",
      "Virtu",
      "Citadel"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Up",
        "input": "100 110",
        "expectedOutput": "10.00"
      },
      {
        "id": 2,
        "name": "Down",
        "input": "100 95",
        "expectedOutput": "-5.00"
      },
      {
        "id": 3,
        "name": "Flat",
        "input": "100 100",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "134",
    "title": "Volume Weighted Price 7",
    "slug": "vwp-calc-34",
    "difficulty": "Easy",
    "topics": [
      "Execution"
    ],
    "status": "Unsolved",
    "acceptance": "76%",
    "description": "Calculate VWP",
    "companies": [
      "Citadel",
      "Jane Street",
      "IMC Trading"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Two trades",
        "input": "2\\n100 10\\n110 20",
        "expectedOutput": "106.67"
      },
      {
        "id": 2,
        "name": "Equal vol",
        "input": "3\\n100 10\\n110 10\\n120 10",
        "expectedOutput": "110.00"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100 50",
        "expectedOutput": "100.00"
      }
    ]
  },
  {
    "id": "135",
    "title": "Tick Size Rounding 7",
    "slug": "tick-rounding-35",
    "difficulty": "Easy",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "74%",
    "description": "Round to tick",
    "companies": [
      "Citadel",
      "Jane Street",
      "Optiver"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Down",
        "input": "100.234 0.01",
        "expectedOutput": "100.23"
      },
      {
        "id": 2,
        "name": "Up",
        "input": "100.237 0.01",
        "expectedOutput": "100.24"
      },
      {
        "id": 3,
        "name": "Exact",
        "input": "100.25 0.05",
        "expectedOutput": "100.25"
      }
    ]
  },
  {
    "id": "136",
    "title": "Simple Moving Average 8",
    "slug": "simple-moving-average-36",
    "difficulty": "Easy",
    "topics": [
      "Time Series",
      "Moving Averages"
    ],
    "status": "Unsolved",
    "acceptance": "73%",
    "description": "Calculate SMA for window N",
    "companies": [
      "Optiver",
      "DE Shaw",
      "Citadel"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Window 3",
        "input": "3\\n10 20 30",
        "expectedOutput": "20.00"
      },
      {
        "id": 2,
        "name": "Window 5",
        "input": "5\\n10 20 30 40 50",
        "expectedOutput": "30.00"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100",
        "expectedOutput": "100.00"
      }
    ]
  },
  {
    "id": "137",
    "title": "Bid-Ask Spread Calculator 8",
    "slug": "bid-ask-spread-37",
    "difficulty": "Easy",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "81%",
    "description": "Calculate spread between bid and ask",
    "companies": [
      "IMC Trading",
      "DE Shaw",
      "Two Sigma"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "100.00 100.50",
        "expectedOutput": "0.50"
      },
      {
        "id": 2,
        "name": "Tight",
        "input": "50.00 50.01",
        "expectedOutput": "0.01"
      },
      {
        "id": 3,
        "name": "Wide",
        "input": "100.00 105.00",
        "expectedOutput": "5.00"
      }
    ]
  },
  {
    "id": "138",
    "title": "Price Change Percentage 8",
    "slug": "price-change-pct-38",
    "difficulty": "Easy",
    "topics": [
      "Basic Math"
    ],
    "status": "Unsolved",
    "acceptance": "74%",
    "description": "Calculate % change",
    "companies": [
      "HRT",
      "Optiver",
      "IMC Trading"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Up",
        "input": "100 110",
        "expectedOutput": "10.00"
      },
      {
        "id": 2,
        "name": "Down",
        "input": "100 95",
        "expectedOutput": "-5.00"
      },
      {
        "id": 3,
        "name": "Flat",
        "input": "100 100",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "139",
    "title": "Volume Weighted Price 8",
    "slug": "vwp-calc-39",
    "difficulty": "Easy",
    "topics": [
      "Execution"
    ],
    "status": "Unsolved",
    "acceptance": "82%",
    "description": "Calculate VWP",
    "companies": [
      "Optiver",
      "Jane Street",
      "Two Sigma"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Two trades",
        "input": "2\\n100 10\\n110 20",
        "expectedOutput": "106.67"
      },
      {
        "id": 2,
        "name": "Equal vol",
        "input": "3\\n100 10\\n110 10\\n120 10",
        "expectedOutput": "110.00"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100 50",
        "expectedOutput": "100.00"
      }
    ]
  },
  {
    "id": "140",
    "title": "Tick Size Rounding 8",
    "slug": "tick-rounding-40",
    "difficulty": "Easy",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "78%",
    "description": "Round to tick",
    "companies": [
      "HRT",
      "Two Sigma",
      "DE Shaw"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Down",
        "input": "100.234 0.01",
        "expectedOutput": "100.23"
      },
      {
        "id": 2,
        "name": "Up",
        "input": "100.237 0.01",
        "expectedOutput": "100.24"
      },
      {
        "id": 3,
        "name": "Exact",
        "input": "100.25 0.05",
        "expectedOutput": "100.25"
      }
    ]
  },
  {
    "id": "141",
    "title": "Bollinger Bands 1",
    "slug": "bollinger-bands-1",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis",
      "Statistics"
    ],
    "status": "Unsolved",
    "acceptance": "59%",
    "description": "Calculate upper and lower Bollinger Bands",
    "companies": [
      "HRT",
      "Optiver",
      "Virtu"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "5 2\\n100 102 104 103 105",
        "expectedOutput": "107.00 99.00"
      },
      {
        "id": 2,
        "name": "Tight",
        "input": "3 1\\n100 100 100",
        "expectedOutput": "100.00 100.00"
      },
      {
        "id": 3,
        "name": "Volatile",
        "input": "4 2\\n100 110 90 105",
        "expectedOutput": "115.00 85.00"
      }
    ]
  },
  {
    "id": "142",
    "title": "RSI Calculator 1",
    "slug": "rsi-calc-2",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis"
    ],
    "status": "Unsolved",
    "acceptance": "51%",
    "description": "Calculate Relative Strength Index",
    "companies": [
      "Jane Street",
      "Optiver",
      "HRT"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Overbought",
        "input": "14\\n100 105 110 115 120 125 130 135 140 145 150 155 160 165",
        "expectedOutput": "100.00"
      },
      {
        "id": 2,
        "name": "Neutral",
        "input": "5\\n100 102 101 103 102",
        "expectedOutput": "50.00"
      },
      {
        "id": 3,
        "name": "Oversold",
        "input": "5\\n100 95 90 85 80",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "143",
    "title": "MACD Indicator 1",
    "slug": "macd-calc-3",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis"
    ],
    "status": "Unsolved",
    "acceptance": "55%",
    "description": "Calculate MACD line",
    "companies": [
      "Two Sigma",
      "Tower Research",
      "Optiver"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Bullish",
        "input": "12 26\\n100 102 104 106 108 110 112 114 116 118 120 122 124 126 128 130 132 134 136 138 140 142 144 146 148 150",
        "expectedOutput": "5.50"
      },
      {
        "id": 2,
        "name": "Bearish",
        "input": "5 10\\n150 148 146 144 142 140 138 136 134 132",
        "expectedOutput": "-3.20"
      },
      {
        "id": 3,
        "name": "Flat",
        "input": "3 5\\n100 100 100 100 100",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "144",
    "title": "Order Book Depth 1",
    "slug": "order-depth-4",
    "difficulty": "Medium",
    "topics": [
      "Order Book",
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "53%",
    "description": "Calculate total depth at N levels",
    "companies": [
      "HRT",
      "Jane Street",
      "DE Shaw"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "3 Levels",
        "input": "3\\n100.0 10\\n99.5 20\\n99.0 30",
        "expectedOutput": "60"
      },
      {
        "id": 2,
        "name": "5 Levels",
        "input": "5\\n100 100\\n99 200\\n98 300\\n97 400\\n96 500",
        "expectedOutput": "1500"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100 1000",
        "expectedOutput": "1000"
      }
    ]
  },
  {
    "id": "145",
    "title": "Liquidity Score 1",
    "slug": "liquidity-score-5",
    "difficulty": "Medium",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "52%",
    "description": "Calculate liquidity score",
    "companies": [
      "Jump Trading",
      "Optiver",
      "IMC Trading"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "High",
        "input": "1000000 0.01",
        "expectedOutput": "100.00"
      },
      {
        "id": 2,
        "name": "Medium",
        "input": "500000 0.05",
        "expectedOutput": "50.00"
      },
      {
        "id": 3,
        "name": "Low",
        "input": "100000 0.10",
        "expectedOutput": "10.00"
      }
    ]
  },
  {
    "id": "146",
    "title": "Bollinger Bands 2",
    "slug": "bollinger-bands-6",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis",
      "Statistics"
    ],
    "status": "Unsolved",
    "acceptance": "51%",
    "description": "Calculate upper and lower Bollinger Bands",
    "companies": [
      "Citadel",
      "Jane Street",
      "DE Shaw"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "5 2\\n100 102 104 103 105",
        "expectedOutput": "107.00 99.00"
      },
      {
        "id": 2,
        "name": "Tight",
        "input": "3 1\\n100 100 100",
        "expectedOutput": "100.00 100.00"
      },
      {
        "id": 3,
        "name": "Volatile",
        "input": "4 2\\n100 110 90 105",
        "expectedOutput": "115.00 85.00"
      }
    ]
  },
  {
    "id": "147",
    "title": "RSI Calculator 2",
    "slug": "rsi-calc-7",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis"
    ],
    "status": "Unsolved",
    "acceptance": "45%",
    "description": "Calculate Relative Strength Index",
    "companies": [
      "Citadel",
      "Two Sigma",
      "Jump Trading"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Overbought",
        "input": "14\\n100 105 110 115 120 125 130 135 140 145 150 155 160 165",
        "expectedOutput": "100.00"
      },
      {
        "id": 2,
        "name": "Neutral",
        "input": "5\\n100 102 101 103 102",
        "expectedOutput": "50.00"
      },
      {
        "id": 3,
        "name": "Oversold",
        "input": "5\\n100 95 90 85 80",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "148",
    "title": "MACD Indicator 2",
    "slug": "macd-calc-8",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis"
    ],
    "status": "Unsolved",
    "acceptance": "41%",
    "description": "Calculate MACD line",
    "companies": [
      "Two Sigma",
      "Citadel",
      "IMC Trading"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Bullish",
        "input": "12 26\\n100 102 104 106 108 110 112 114 116 118 120 122 124 126 128 130 132 134 136 138 140 142 144 146 148 150",
        "expectedOutput": "5.50"
      },
      {
        "id": 2,
        "name": "Bearish",
        "input": "5 10\\n150 148 146 144 142 140 138 136 134 132",
        "expectedOutput": "-3.20"
      },
      {
        "id": 3,
        "name": "Flat",
        "input": "3 5\\n100 100 100 100 100",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "149",
    "title": "Order Book Depth 2",
    "slug": "order-depth-9",
    "difficulty": "Medium",
    "topics": [
      "Order Book",
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "63%",
    "description": "Calculate total depth at N levels",
    "companies": [
      "Jane Street",
      "DE Shaw",
      "Citadel"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "3 Levels",
        "input": "3\\n100.0 10\\n99.5 20\\n99.0 30",
        "expectedOutput": "60"
      },
      {
        "id": 2,
        "name": "5 Levels",
        "input": "5\\n100 100\\n99 200\\n98 300\\n97 400\\n96 500",
        "expectedOutput": "1500"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100 1000",
        "expectedOutput": "1000"
      }
    ]
  },
  {
    "id": "150",
    "title": "Liquidity Score 2",
    "slug": "liquidity-score-10",
    "difficulty": "Medium",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "45%",
    "description": "Calculate liquidity score",
    "companies": [
      "HRT",
      "Two Sigma",
      "Tower Research"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "High",
        "input": "1000000 0.01",
        "expectedOutput": "100.00"
      },
      {
        "id": 2,
        "name": "Medium",
        "input": "500000 0.05",
        "expectedOutput": "50.00"
      },
      {
        "id": 3,
        "name": "Low",
        "input": "100000 0.10",
        "expectedOutput": "10.00"
      }
    ]
  },
  {
    "id": "151",
    "title": "Bollinger Bands 3",
    "slug": "bollinger-bands-11",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis",
      "Statistics"
    ],
    "status": "Unsolved",
    "acceptance": "44%",
    "description": "Calculate upper and lower Bollinger Bands",
    "companies": [
      "Citadel",
      "Jane Street",
      "DE Shaw"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "5 2\\n100 102 104 103 105",
        "expectedOutput": "107.00 99.00"
      },
      {
        "id": 2,
        "name": "Tight",
        "input": "3 1\\n100 100 100",
        "expectedOutput": "100.00 100.00"
      },
      {
        "id": 3,
        "name": "Volatile",
        "input": "4 2\\n100 110 90 105",
        "expectedOutput": "115.00 85.00"
      }
    ]
  },
  {
    "id": "152",
    "title": "RSI Calculator 3",
    "slug": "rsi-calc-12",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis"
    ],
    "status": "Unsolved",
    "acceptance": "67%",
    "description": "Calculate Relative Strength Index",
    "companies": [
      "Jump Trading",
      "HRT",
      "Jane Street"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Overbought",
        "input": "14\\n100 105 110 115 120 125 130 135 140 145 150 155 160 165",
        "expectedOutput": "100.00"
      },
      {
        "id": 2,
        "name": "Neutral",
        "input": "5\\n100 102 101 103 102",
        "expectedOutput": "50.00"
      },
      {
        "id": 3,
        "name": "Oversold",
        "input": "5\\n100 95 90 85 80",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "153",
    "title": "MACD Indicator 3",
    "slug": "macd-calc-13",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis"
    ],
    "status": "Unsolved",
    "acceptance": "66%",
    "description": "Calculate MACD line",
    "companies": [
      "DE Shaw",
      "Jump Trading",
      "Two Sigma"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Bullish",
        "input": "12 26\\n100 102 104 106 108 110 112 114 116 118 120 122 124 126 128 130 132 134 136 138 140 142 144 146 148 150",
        "expectedOutput": "5.50"
      },
      {
        "id": 2,
        "name": "Bearish",
        "input": "5 10\\n150 148 146 144 142 140 138 136 134 132",
        "expectedOutput": "-3.20"
      },
      {
        "id": 3,
        "name": "Flat",
        "input": "3 5\\n100 100 100 100 100",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "154",
    "title": "Order Book Depth 3",
    "slug": "order-depth-14",
    "difficulty": "Medium",
    "topics": [
      "Order Book",
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "40%",
    "description": "Calculate total depth at N levels",
    "companies": [
      "Tower Research",
      "Citadel",
      "DE Shaw"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "3 Levels",
        "input": "3\\n100.0 10\\n99.5 20\\n99.0 30",
        "expectedOutput": "60"
      },
      {
        "id": 2,
        "name": "5 Levels",
        "input": "5\\n100 100\\n99 200\\n98 300\\n97 400\\n96 500",
        "expectedOutput": "1500"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100 1000",
        "expectedOutput": "1000"
      }
    ]
  },
  {
    "id": "155",
    "title": "Liquidity Score 3",
    "slug": "liquidity-score-15",
    "difficulty": "Medium",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "50%",
    "description": "Calculate liquidity score",
    "companies": [
      "Two Sigma",
      "IMC Trading",
      "HRT"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "High",
        "input": "1000000 0.01",
        "expectedOutput": "100.00"
      },
      {
        "id": 2,
        "name": "Medium",
        "input": "500000 0.05",
        "expectedOutput": "50.00"
      },
      {
        "id": 3,
        "name": "Low",
        "input": "100000 0.10",
        "expectedOutput": "10.00"
      }
    ]
  },
  {
    "id": "156",
    "title": "Bollinger Bands 4",
    "slug": "bollinger-bands-16",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis",
      "Statistics"
    ],
    "status": "Unsolved",
    "acceptance": "54%",
    "description": "Calculate upper and lower Bollinger Bands",
    "companies": [
      "Jump Trading",
      "Two Sigma",
      "Virtu"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "5 2\\n100 102 104 103 105",
        "expectedOutput": "107.00 99.00"
      },
      {
        "id": 2,
        "name": "Tight",
        "input": "3 1\\n100 100 100",
        "expectedOutput": "100.00 100.00"
      },
      {
        "id": 3,
        "name": "Volatile",
        "input": "4 2\\n100 110 90 105",
        "expectedOutput": "115.00 85.00"
      }
    ]
  },
  {
    "id": "157",
    "title": "RSI Calculator 4",
    "slug": "rsi-calc-17",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis"
    ],
    "status": "Unsolved",
    "acceptance": "59%",
    "description": "Calculate Relative Strength Index",
    "companies": [
      "Virtu",
      "IMC Trading",
      "HRT"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Overbought",
        "input": "14\\n100 105 110 115 120 125 130 135 140 145 150 155 160 165",
        "expectedOutput": "100.00"
      },
      {
        "id": 2,
        "name": "Neutral",
        "input": "5\\n100 102 101 103 102",
        "expectedOutput": "50.00"
      },
      {
        "id": 3,
        "name": "Oversold",
        "input": "5\\n100 95 90 85 80",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "158",
    "title": "MACD Indicator 4",
    "slug": "macd-calc-18",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis"
    ],
    "status": "Unsolved",
    "acceptance": "59%",
    "description": "Calculate MACD line",
    "companies": [
      "Two Sigma",
      "HRT",
      "Citadel"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Bullish",
        "input": "12 26\\n100 102 104 106 108 110 112 114 116 118 120 122 124 126 128 130 132 134 136 138 140 142 144 146 148 150",
        "expectedOutput": "5.50"
      },
      {
        "id": 2,
        "name": "Bearish",
        "input": "5 10\\n150 148 146 144 142 140 138 136 134 132",
        "expectedOutput": "-3.20"
      },
      {
        "id": 3,
        "name": "Flat",
        "input": "3 5\\n100 100 100 100 100",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "159",
    "title": "Order Book Depth 4",
    "slug": "order-depth-19",
    "difficulty": "Medium",
    "topics": [
      "Order Book",
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "58%",
    "description": "Calculate total depth at N levels",
    "companies": [
      "Optiver",
      "Citadel",
      "Tower Research"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "3 Levels",
        "input": "3\\n100.0 10\\n99.5 20\\n99.0 30",
        "expectedOutput": "60"
      },
      {
        "id": 2,
        "name": "5 Levels",
        "input": "5\\n100 100\\n99 200\\n98 300\\n97 400\\n96 500",
        "expectedOutput": "1500"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100 1000",
        "expectedOutput": "1000"
      }
    ]
  },
  {
    "id": "160",
    "title": "Liquidity Score 4",
    "slug": "liquidity-score-20",
    "difficulty": "Medium",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "62%",
    "description": "Calculate liquidity score",
    "companies": [
      "DE Shaw",
      "HRT",
      "Virtu"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "High",
        "input": "1000000 0.01",
        "expectedOutput": "100.00"
      },
      {
        "id": 2,
        "name": "Medium",
        "input": "500000 0.05",
        "expectedOutput": "50.00"
      },
      {
        "id": 3,
        "name": "Low",
        "input": "100000 0.10",
        "expectedOutput": "10.00"
      }
    ]
  },
  {
    "id": "161",
    "title": "Bollinger Bands 5",
    "slug": "bollinger-bands-21",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis",
      "Statistics"
    ],
    "status": "Unsolved",
    "acceptance": "65%",
    "description": "Calculate upper and lower Bollinger Bands",
    "companies": [
      "IMC Trading",
      "Citadel",
      "Jane Street"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "5 2\\n100 102 104 103 105",
        "expectedOutput": "107.00 99.00"
      },
      {
        "id": 2,
        "name": "Tight",
        "input": "3 1\\n100 100 100",
        "expectedOutput": "100.00 100.00"
      },
      {
        "id": 3,
        "name": "Volatile",
        "input": "4 2\\n100 110 90 105",
        "expectedOutput": "115.00 85.00"
      }
    ]
  },
  {
    "id": "162",
    "title": "RSI Calculator 5",
    "slug": "rsi-calc-22",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis"
    ],
    "status": "Unsolved",
    "acceptance": "52%",
    "description": "Calculate Relative Strength Index",
    "companies": [
      "Optiver",
      "DE Shaw",
      "Jump Trading"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Overbought",
        "input": "14\\n100 105 110 115 120 125 130 135 140 145 150 155 160 165",
        "expectedOutput": "100.00"
      },
      {
        "id": 2,
        "name": "Neutral",
        "input": "5\\n100 102 101 103 102",
        "expectedOutput": "50.00"
      },
      {
        "id": 3,
        "name": "Oversold",
        "input": "5\\n100 95 90 85 80",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "163",
    "title": "MACD Indicator 5",
    "slug": "macd-calc-23",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis"
    ],
    "status": "Unsolved",
    "acceptance": "46%",
    "description": "Calculate MACD line",
    "companies": [
      "Jane Street",
      "Jump Trading",
      "Tower Research"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Bullish",
        "input": "12 26\\n100 102 104 106 108 110 112 114 116 118 120 122 124 126 128 130 132 134 136 138 140 142 144 146 148 150",
        "expectedOutput": "5.50"
      },
      {
        "id": 2,
        "name": "Bearish",
        "input": "5 10\\n150 148 146 144 142 140 138 136 134 132",
        "expectedOutput": "-3.20"
      },
      {
        "id": 3,
        "name": "Flat",
        "input": "3 5\\n100 100 100 100 100",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "164",
    "title": "Order Book Depth 5",
    "slug": "order-depth-24",
    "difficulty": "Medium",
    "topics": [
      "Order Book",
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "59%",
    "description": "Calculate total depth at N levels",
    "companies": [
      "Citadel",
      "HRT",
      "DE Shaw"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "3 Levels",
        "input": "3\\n100.0 10\\n99.5 20\\n99.0 30",
        "expectedOutput": "60"
      },
      {
        "id": 2,
        "name": "5 Levels",
        "input": "5\\n100 100\\n99 200\\n98 300\\n97 400\\n96 500",
        "expectedOutput": "1500"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100 1000",
        "expectedOutput": "1000"
      }
    ]
  },
  {
    "id": "165",
    "title": "Liquidity Score 5",
    "slug": "liquidity-score-25",
    "difficulty": "Medium",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "67%",
    "description": "Calculate liquidity score",
    "companies": [
      "Citadel",
      "Virtu",
      "Two Sigma"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "High",
        "input": "1000000 0.01",
        "expectedOutput": "100.00"
      },
      {
        "id": 2,
        "name": "Medium",
        "input": "500000 0.05",
        "expectedOutput": "50.00"
      },
      {
        "id": 3,
        "name": "Low",
        "input": "100000 0.10",
        "expectedOutput": "10.00"
      }
    ]
  },
  {
    "id": "166",
    "title": "Bollinger Bands 6",
    "slug": "bollinger-bands-26",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis",
      "Statistics"
    ],
    "status": "Unsolved",
    "acceptance": "58%",
    "description": "Calculate upper and lower Bollinger Bands",
    "companies": [
      "Citadel",
      "Optiver",
      "Jane Street"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "5 2\\n100 102 104 103 105",
        "expectedOutput": "107.00 99.00"
      },
      {
        "id": 2,
        "name": "Tight",
        "input": "3 1\\n100 100 100",
        "expectedOutput": "100.00 100.00"
      },
      {
        "id": 3,
        "name": "Volatile",
        "input": "4 2\\n100 110 90 105",
        "expectedOutput": "115.00 85.00"
      }
    ]
  },
  {
    "id": "167",
    "title": "RSI Calculator 6",
    "slug": "rsi-calc-27",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis"
    ],
    "status": "Unsolved",
    "acceptance": "50%",
    "description": "Calculate Relative Strength Index",
    "companies": [
      "Virtu",
      "Jane Street",
      "Two Sigma"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Overbought",
        "input": "14\\n100 105 110 115 120 125 130 135 140 145 150 155 160 165",
        "expectedOutput": "100.00"
      },
      {
        "id": 2,
        "name": "Neutral",
        "input": "5\\n100 102 101 103 102",
        "expectedOutput": "50.00"
      },
      {
        "id": 3,
        "name": "Oversold",
        "input": "5\\n100 95 90 85 80",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "168",
    "title": "MACD Indicator 6",
    "slug": "macd-calc-28",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis"
    ],
    "status": "Unsolved",
    "acceptance": "63%",
    "description": "Calculate MACD line",
    "companies": [
      "HRT",
      "Jane Street",
      "DE Shaw"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Bullish",
        "input": "12 26\\n100 102 104 106 108 110 112 114 116 118 120 122 124 126 128 130 132 134 136 138 140 142 144 146 148 150",
        "expectedOutput": "5.50"
      },
      {
        "id": 2,
        "name": "Bearish",
        "input": "5 10\\n150 148 146 144 142 140 138 136 134 132",
        "expectedOutput": "-3.20"
      },
      {
        "id": 3,
        "name": "Flat",
        "input": "3 5\\n100 100 100 100 100",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "169",
    "title": "Order Book Depth 6",
    "slug": "order-depth-29",
    "difficulty": "Medium",
    "topics": [
      "Order Book",
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "49%",
    "description": "Calculate total depth at N levels",
    "companies": [
      "Citadel",
      "Jane Street",
      "Optiver"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "3 Levels",
        "input": "3\\n100.0 10\\n99.5 20\\n99.0 30",
        "expectedOutput": "60"
      },
      {
        "id": 2,
        "name": "5 Levels",
        "input": "5\\n100 100\\n99 200\\n98 300\\n97 400\\n96 500",
        "expectedOutput": "1500"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100 1000",
        "expectedOutput": "1000"
      }
    ]
  },
  {
    "id": "170",
    "title": "Liquidity Score 6",
    "slug": "liquidity-score-30",
    "difficulty": "Medium",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "63%",
    "description": "Calculate liquidity score",
    "companies": [
      "Optiver",
      "HRT",
      "Jane Street"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "High",
        "input": "1000000 0.01",
        "expectedOutput": "100.00"
      },
      {
        "id": 2,
        "name": "Medium",
        "input": "500000 0.05",
        "expectedOutput": "50.00"
      },
      {
        "id": 3,
        "name": "Low",
        "input": "100000 0.10",
        "expectedOutput": "10.00"
      }
    ]
  },
  {
    "id": "171",
    "title": "Bollinger Bands 7",
    "slug": "bollinger-bands-31",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis",
      "Statistics"
    ],
    "status": "Unsolved",
    "acceptance": "49%",
    "description": "Calculate upper and lower Bollinger Bands",
    "companies": [
      "IMC Trading",
      "Citadel",
      "Jane Street"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "5 2\\n100 102 104 103 105",
        "expectedOutput": "107.00 99.00"
      },
      {
        "id": 2,
        "name": "Tight",
        "input": "3 1\\n100 100 100",
        "expectedOutput": "100.00 100.00"
      },
      {
        "id": 3,
        "name": "Volatile",
        "input": "4 2\\n100 110 90 105",
        "expectedOutput": "115.00 85.00"
      }
    ]
  },
  {
    "id": "172",
    "title": "RSI Calculator 7",
    "slug": "rsi-calc-32",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis"
    ],
    "status": "Unsolved",
    "acceptance": "56%",
    "description": "Calculate Relative Strength Index",
    "companies": [
      "Tower Research",
      "Citadel",
      "Jump Trading"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Overbought",
        "input": "14\\n100 105 110 115 120 125 130 135 140 145 150 155 160 165",
        "expectedOutput": "100.00"
      },
      {
        "id": 2,
        "name": "Neutral",
        "input": "5\\n100 102 101 103 102",
        "expectedOutput": "50.00"
      },
      {
        "id": 3,
        "name": "Oversold",
        "input": "5\\n100 95 90 85 80",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "173",
    "title": "MACD Indicator 7",
    "slug": "macd-calc-33",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis"
    ],
    "status": "Unsolved",
    "acceptance": "43%",
    "description": "Calculate MACD line",
    "companies": [
      "Citadel",
      "IMC Trading",
      "Tower Research"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Bullish",
        "input": "12 26\\n100 102 104 106 108 110 112 114 116 118 120 122 124 126 128 130 132 134 136 138 140 142 144 146 148 150",
        "expectedOutput": "5.50"
      },
      {
        "id": 2,
        "name": "Bearish",
        "input": "5 10\\n150 148 146 144 142 140 138 136 134 132",
        "expectedOutput": "-3.20"
      },
      {
        "id": 3,
        "name": "Flat",
        "input": "3 5\\n100 100 100 100 100",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "174",
    "title": "Order Book Depth 7",
    "slug": "order-depth-34",
    "difficulty": "Medium",
    "topics": [
      "Order Book",
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "54%",
    "description": "Calculate total depth at N levels",
    "companies": [
      "DE Shaw",
      "Tower Research",
      "Virtu"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "3 Levels",
        "input": "3\\n100.0 10\\n99.5 20\\n99.0 30",
        "expectedOutput": "60"
      },
      {
        "id": 2,
        "name": "5 Levels",
        "input": "5\\n100 100\\n99 200\\n98 300\\n97 400\\n96 500",
        "expectedOutput": "1500"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100 1000",
        "expectedOutput": "1000"
      }
    ]
  },
  {
    "id": "175",
    "title": "Liquidity Score 7",
    "slug": "liquidity-score-35",
    "difficulty": "Medium",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "66%",
    "description": "Calculate liquidity score",
    "companies": [
      "Jane Street",
      "Virtu",
      "Jump Trading"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "High",
        "input": "1000000 0.01",
        "expectedOutput": "100.00"
      },
      {
        "id": 2,
        "name": "Medium",
        "input": "500000 0.05",
        "expectedOutput": "50.00"
      },
      {
        "id": 3,
        "name": "Low",
        "input": "100000 0.10",
        "expectedOutput": "10.00"
      }
    ]
  },
  {
    "id": "176",
    "title": "Bollinger Bands 8",
    "slug": "bollinger-bands-36",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis",
      "Statistics"
    ],
    "status": "Unsolved",
    "acceptance": "50%",
    "description": "Calculate upper and lower Bollinger Bands",
    "companies": [
      "Optiver",
      "HRT",
      "Two Sigma"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "5 2\\n100 102 104 103 105",
        "expectedOutput": "107.00 99.00"
      },
      {
        "id": 2,
        "name": "Tight",
        "input": "3 1\\n100 100 100",
        "expectedOutput": "100.00 100.00"
      },
      {
        "id": 3,
        "name": "Volatile",
        "input": "4 2\\n100 110 90 105",
        "expectedOutput": "115.00 85.00"
      }
    ]
  },
  {
    "id": "177",
    "title": "RSI Calculator 8",
    "slug": "rsi-calc-37",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis"
    ],
    "status": "Unsolved",
    "acceptance": "62%",
    "description": "Calculate Relative Strength Index",
    "companies": [
      "Citadel",
      "IMC Trading",
      "Tower Research"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Overbought",
        "input": "14\\n100 105 110 115 120 125 130 135 140 145 150 155 160 165",
        "expectedOutput": "100.00"
      },
      {
        "id": 2,
        "name": "Neutral",
        "input": "5\\n100 102 101 103 102",
        "expectedOutput": "50.00"
      },
      {
        "id": 3,
        "name": "Oversold",
        "input": "5\\n100 95 90 85 80",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "178",
    "title": "MACD Indicator 8",
    "slug": "macd-calc-38",
    "difficulty": "Medium",
    "topics": [
      "Technical Analysis"
    ],
    "status": "Unsolved",
    "acceptance": "49%",
    "description": "Calculate MACD line",
    "companies": [
      "Optiver",
      "HRT",
      "Two Sigma"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Bullish",
        "input": "12 26\\n100 102 104 106 108 110 112 114 116 118 120 122 124 126 128 130 132 134 136 138 140 142 144 146 148 150",
        "expectedOutput": "5.50"
      },
      {
        "id": 2,
        "name": "Bearish",
        "input": "5 10\\n150 148 146 144 142 140 138 136 134 132",
        "expectedOutput": "-3.20"
      },
      {
        "id": 3,
        "name": "Flat",
        "input": "3 5\\n100 100 100 100 100",
        "expectedOutput": "0.00"
      }
    ]
  },
  {
    "id": "179",
    "title": "Order Book Depth 8",
    "slug": "order-depth-39",
    "difficulty": "Medium",
    "topics": [
      "Order Book",
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "61%",
    "description": "Calculate total depth at N levels",
    "companies": [
      "Two Sigma",
      "Virtu",
      "Citadel"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "3 Levels",
        "input": "3\\n100.0 10\\n99.5 20\\n99.0 30",
        "expectedOutput": "60"
      },
      {
        "id": 2,
        "name": "5 Levels",
        "input": "5\\n100 100\\n99 200\\n98 300\\n97 400\\n96 500",
        "expectedOutput": "1500"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "1\\n100 1000",
        "expectedOutput": "1000"
      }
    ]
  },
  {
    "id": "180",
    "title": "Liquidity Score 8",
    "slug": "liquidity-score-40",
    "difficulty": "Medium",
    "topics": [
      "Market Microstructure"
    ],
    "status": "Unsolved",
    "acceptance": "44%",
    "description": "Calculate liquidity score",
    "companies": [
      "Jane Street",
      "Citadel",
      "Jump Trading"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "High",
        "input": "1000000 0.01",
        "expectedOutput": "100.00"
      },
      {
        "id": 2,
        "name": "Medium",
        "input": "500000 0.05",
        "expectedOutput": "50.00"
      },
      {
        "id": 3,
        "name": "Low",
        "input": "100000 0.10",
        "expectedOutput": "10.00"
      }
    ]
  },
  {
    "id": "181",
    "title": "Optimal Execution TWAP 1",
    "slug": "twap-execution-1",
    "difficulty": "Hard",
    "topics": [
      "Execution Algorithms",
      "Optimization"
    ],
    "status": "Unsolved",
    "acceptance": "15%",
    "description": "Implement Time-Weighted Average Price execution",
    "companies": [
      "Jump Trading",
      "IMC Trading",
      "Two Sigma"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "1000 5\\n100 101 102 103 104",
        "expectedOutput": "200 200 200 200 200"
      },
      {
        "id": 2,
        "name": "Uneven",
        "input": "1000 3\\n100 105 110",
        "expectedOutput": "333 333 334"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "500 1\\n100",
        "expectedOutput": "500"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  },
  {
    "id": "182",
    "title": "Statistical Arbitrage 1",
    "slug": "stat-arb-2",
    "difficulty": "Hard",
    "topics": [
      "Statistical Arbitrage",
      "Pairs Trading"
    ],
    "status": "Unsolved",
    "acceptance": "28%",
    "description": "Detect stat arb opportunities",
    "companies": [
      "Jane Street",
      "Tower Research",
      "Two Sigma"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Opportunity",
        "input": "100 50 2.5 2.0",
        "expectedOutput": "SHORT_A_LONG_B"
      },
      {
        "id": 2,
        "name": "No Signal",
        "input": "100 50 1.5 2.0",
        "expectedOutput": "HOLD"
      },
      {
        "id": 3,
        "name": "Reverse",
        "input": "95 52 -2.5 2.0",
        "expectedOutput": "LONG_A_SHORT_B"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  },
  {
    "id": "183",
    "title": "Greeks Calculator 1",
    "slug": "options-greeks-3",
    "difficulty": "Hard",
    "topics": [
      "Options",
      "Derivatives"
    ],
    "status": "Unsolved",
    "acceptance": "27%",
    "description": "Calculate option Greeks (Delta, Gamma, Theta)",
    "companies": [
      "IMC Trading",
      "Jane Street",
      "Two Sigma"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "ATM Call",
        "input": "CALL 100 100 0.20 30 0.05",
        "expectedOutput": "0.50 0.02 -0.05"
      },
      {
        "id": 2,
        "name": "ITM Put",
        "input": "PUT 100 110 0.25 60 0.03",
        "expectedOutput": "-0.75 0.01 -0.03"
      },
      {
        "id": 3,
        "name": "OTM Call",
        "input": "CALL 100 120 0.30 90 0.04",
        "expectedOutput": "0.20 0.01 -0.02"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  },
  {
    "id": "184",
    "title": "Market Making Strategy 1",
    "slug": "mm-strategy-4",
    "difficulty": "Hard",
    "topics": [
      "Market Making",
      "Inventory Management"
    ],
    "status": "Unsolved",
    "acceptance": "16%",
    "description": "Implement market making with inventory management",
    "companies": [
      "Optiver",
      "IMC Trading",
      "DE Shaw"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Neutral",
        "input": "100.00 0 0.20 1000",
        "expectedOutput": "99.98 100.02"
      },
      {
        "id": 2,
        "name": "Long Inventory",
        "input": "100.00 500 0.20 1000",
        "expectedOutput": "99.96 100.01"
      },
      {
        "id": 3,
        "name": "Short Inventory",
        "input": "100.00 -500 0.20 1000",
        "expectedOutput": "99.99 100.04"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  },
  {
    "id": "185",
    "title": "Portfolio Optimization 1",
    "slug": "portfolio-opt-5",
    "difficulty": "Hard",
    "topics": [
      "Portfolio Management",
      "Optimization"
    ],
    "status": "Unsolved",
    "acceptance": "29%",
    "description": "Optimize portfolio weights using Sharpe ratio",
    "companies": [
      "Jane Street",
      "Citadel",
      "DE Shaw"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Two Assets",
        "input": "2\\n0.10 0.15\\n0.20 0.25",
        "expectedOutput": "0.60 0.40"
      },
      {
        "id": 2,
        "name": "Three Assets",
        "input": "3\\n0.08 0.12 0.15\\n0.15 0.20 0.30",
        "expectedOutput": "0.50 0.30 0.20"
      },
      {
        "id": 3,
        "name": "Equal Weight",
        "input": "4\\n0.10 0.10 0.10 0.10\\n0.20 0.20 0.20 0.20",
        "expectedOutput": "0.25 0.25 0.25 0.25"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  },
  {
    "id": "186",
    "title": "Optimal Execution TWAP 2",
    "slug": "twap-execution-6",
    "difficulty": "Hard",
    "topics": [
      "Execution Algorithms",
      "Optimization"
    ],
    "status": "Unsolved",
    "acceptance": "12%",
    "description": "Implement Time-Weighted Average Price execution",
    "companies": [
      "Optiver",
      "Citadel",
      "Jane Street"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "1000 5\\n100 101 102 103 104",
        "expectedOutput": "200 200 200 200 200"
      },
      {
        "id": 2,
        "name": "Uneven",
        "input": "1000 3\\n100 105 110",
        "expectedOutput": "333 333 334"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "500 1\\n100",
        "expectedOutput": "500"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  },
  {
    "id": "187",
    "title": "Statistical Arbitrage 2",
    "slug": "stat-arb-7",
    "difficulty": "Hard",
    "topics": [
      "Statistical Arbitrage",
      "Pairs Trading"
    ],
    "status": "Unsolved",
    "acceptance": "17%",
    "description": "Detect stat arb opportunities",
    "companies": [
      "Virtu",
      "IMC Trading",
      "DE Shaw"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Opportunity",
        "input": "100 50 2.5 2.0",
        "expectedOutput": "SHORT_A_LONG_B"
      },
      {
        "id": 2,
        "name": "No Signal",
        "input": "100 50 1.5 2.0",
        "expectedOutput": "HOLD"
      },
      {
        "id": 3,
        "name": "Reverse",
        "input": "95 52 -2.5 2.0",
        "expectedOutput": "LONG_A_SHORT_B"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  },
  {
    "id": "188",
    "title": "Greeks Calculator 2",
    "slug": "options-greeks-8",
    "difficulty": "Hard",
    "topics": [
      "Options",
      "Derivatives"
    ],
    "status": "Unsolved",
    "acceptance": "27%",
    "description": "Calculate option Greeks (Delta, Gamma, Theta)",
    "companies": [
      "DE Shaw",
      "Tower Research",
      "Optiver"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "ATM Call",
        "input": "CALL 100 100 0.20 30 0.05",
        "expectedOutput": "0.50 0.02 -0.05"
      },
      {
        "id": 2,
        "name": "ITM Put",
        "input": "PUT 100 110 0.25 60 0.03",
        "expectedOutput": "-0.75 0.01 -0.03"
      },
      {
        "id": 3,
        "name": "OTM Call",
        "input": "CALL 100 120 0.30 90 0.04",
        "expectedOutput": "0.20 0.01 -0.02"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  },
  {
    "id": "189",
    "title": "Market Making Strategy 2",
    "slug": "mm-strategy-9",
    "difficulty": "Hard",
    "topics": [
      "Market Making",
      "Inventory Management"
    ],
    "status": "Unsolved",
    "acceptance": "10%",
    "description": "Implement market making with inventory management",
    "companies": [
      "Tower Research",
      "Two Sigma",
      "Optiver"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Neutral",
        "input": "100.00 0 0.20 1000",
        "expectedOutput": "99.98 100.02"
      },
      {
        "id": 2,
        "name": "Long Inventory",
        "input": "100.00 500 0.20 1000",
        "expectedOutput": "99.96 100.01"
      },
      {
        "id": 3,
        "name": "Short Inventory",
        "input": "100.00 -500 0.20 1000",
        "expectedOutput": "99.99 100.04"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  },
  {
    "id": "190",
    "title": "Portfolio Optimization 2",
    "slug": "portfolio-opt-10",
    "difficulty": "Hard",
    "topics": [
      "Portfolio Management",
      "Optimization"
    ],
    "status": "Unsolved",
    "acceptance": "20%",
    "description": "Optimize portfolio weights using Sharpe ratio",
    "companies": [
      "Citadel",
      "Jane Street",
      "HRT"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Two Assets",
        "input": "2\\n0.10 0.15\\n0.20 0.25",
        "expectedOutput": "0.60 0.40"
      },
      {
        "id": 2,
        "name": "Three Assets",
        "input": "3\\n0.08 0.12 0.15\\n0.15 0.20 0.30",
        "expectedOutput": "0.50 0.30 0.20"
      },
      {
        "id": 3,
        "name": "Equal Weight",
        "input": "4\\n0.10 0.10 0.10 0.10\\n0.20 0.20 0.20 0.20",
        "expectedOutput": "0.25 0.25 0.25 0.25"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  },
  {
    "id": "191",
    "title": "Optimal Execution TWAP 3",
    "slug": "twap-execution-11",
    "difficulty": "Hard",
    "topics": [
      "Execution Algorithms",
      "Optimization"
    ],
    "status": "Unsolved",
    "acceptance": "20%",
    "description": "Implement Time-Weighted Average Price execution",
    "companies": [
      "Jane Street",
      "DE Shaw",
      "IMC Trading"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "1000 5\\n100 101 102 103 104",
        "expectedOutput": "200 200 200 200 200"
      },
      {
        "id": 2,
        "name": "Uneven",
        "input": "1000 3\\n100 105 110",
        "expectedOutput": "333 333 334"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "500 1\\n100",
        "expectedOutput": "500"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  },
  {
    "id": "192",
    "title": "Statistical Arbitrage 3",
    "slug": "stat-arb-12",
    "difficulty": "Hard",
    "topics": [
      "Statistical Arbitrage",
      "Pairs Trading"
    ],
    "status": "Unsolved",
    "acceptance": "24%",
    "description": "Detect stat arb opportunities",
    "companies": [
      "DE Shaw",
      "IMC Trading",
      "Jane Street"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Opportunity",
        "input": "100 50 2.5 2.0",
        "expectedOutput": "SHORT_A_LONG_B"
      },
      {
        "id": 2,
        "name": "No Signal",
        "input": "100 50 1.5 2.0",
        "expectedOutput": "HOLD"
      },
      {
        "id": 3,
        "name": "Reverse",
        "input": "95 52 -2.5 2.0",
        "expectedOutput": "LONG_A_SHORT_B"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  },
  {
    "id": "193",
    "title": "Greeks Calculator 3",
    "slug": "options-greeks-13",
    "difficulty": "Hard",
    "topics": [
      "Options",
      "Derivatives"
    ],
    "status": "Unsolved",
    "acceptance": "11%",
    "description": "Calculate option Greeks (Delta, Gamma, Theta)",
    "companies": [
      "Citadel",
      "Jane Street",
      "Tower Research"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "ATM Call",
        "input": "CALL 100 100 0.20 30 0.05",
        "expectedOutput": "0.50 0.02 -0.05"
      },
      {
        "id": 2,
        "name": "ITM Put",
        "input": "PUT 100 110 0.25 60 0.03",
        "expectedOutput": "-0.75 0.01 -0.03"
      },
      {
        "id": 3,
        "name": "OTM Call",
        "input": "CALL 100 120 0.30 90 0.04",
        "expectedOutput": "0.20 0.01 -0.02"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  },
  {
    "id": "194",
    "title": "Market Making Strategy 3",
    "slug": "mm-strategy-14",
    "difficulty": "Hard",
    "topics": [
      "Market Making",
      "Inventory Management"
    ],
    "status": "Unsolved",
    "acceptance": "29%",
    "description": "Implement market making with inventory management",
    "companies": [
      "HRT",
      "DE Shaw",
      "Jane Street"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Neutral",
        "input": "100.00 0 0.20 1000",
        "expectedOutput": "99.98 100.02"
      },
      {
        "id": 2,
        "name": "Long Inventory",
        "input": "100.00 500 0.20 1000",
        "expectedOutput": "99.96 100.01"
      },
      {
        "id": 3,
        "name": "Short Inventory",
        "input": "100.00 -500 0.20 1000",
        "expectedOutput": "99.99 100.04"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  },
  {
    "id": "195",
    "title": "Portfolio Optimization 3",
    "slug": "portfolio-opt-15",
    "difficulty": "Hard",
    "topics": [
      "Portfolio Management",
      "Optimization"
    ],
    "status": "Unsolved",
    "acceptance": "11%",
    "description": "Optimize portfolio weights using Sharpe ratio",
    "companies": [
      "Tower Research",
      "DE Shaw",
      "HRT"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Two Assets",
        "input": "2\\n0.10 0.15\\n0.20 0.25",
        "expectedOutput": "0.60 0.40"
      },
      {
        "id": 2,
        "name": "Three Assets",
        "input": "3\\n0.08 0.12 0.15\\n0.15 0.20 0.30",
        "expectedOutput": "0.50 0.30 0.20"
      },
      {
        "id": 3,
        "name": "Equal Weight",
        "input": "4\\n0.10 0.10 0.10 0.10\\n0.20 0.20 0.20 0.20",
        "expectedOutput": "0.25 0.25 0.25 0.25"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  },
  {
    "id": "196",
    "title": "Optimal Execution TWAP 4",
    "slug": "twap-execution-16",
    "difficulty": "Hard",
    "topics": [
      "Execution Algorithms",
      "Optimization"
    ],
    "status": "Unsolved",
    "acceptance": "20%",
    "description": "Implement Time-Weighted Average Price execution",
    "companies": [
      "Virtu",
      "Optiver",
      "Citadel"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Basic",
        "input": "1000 5\\n100 101 102 103 104",
        "expectedOutput": "200 200 200 200 200"
      },
      {
        "id": 2,
        "name": "Uneven",
        "input": "1000 3\\n100 105 110",
        "expectedOutput": "333 333 334"
      },
      {
        "id": 3,
        "name": "Single",
        "input": "500 1\\n100",
        "expectedOutput": "500"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  },
  {
    "id": "197",
    "title": "Statistical Arbitrage 4",
    "slug": "stat-arb-17",
    "difficulty": "Hard",
    "topics": [
      "Statistical Arbitrage",
      "Pairs Trading"
    ],
    "status": "Unsolved",
    "acceptance": "14%",
    "description": "Detect stat arb opportunities",
    "companies": [
      "Citadel",
      "Optiver",
      "Tower Research"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Opportunity",
        "input": "100 50 2.5 2.0",
        "expectedOutput": "SHORT_A_LONG_B"
      },
      {
        "id": 2,
        "name": "No Signal",
        "input": "100 50 1.5 2.0",
        "expectedOutput": "HOLD"
      },
      {
        "id": 3,
        "name": "Reverse",
        "input": "95 52 -2.5 2.0",
        "expectedOutput": "LONG_A_SHORT_B"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  },
  {
    "id": "198",
    "title": "Greeks Calculator 4",
    "slug": "options-greeks-18",
    "difficulty": "Hard",
    "topics": [
      "Options",
      "Derivatives"
    ],
    "status": "Unsolved",
    "acceptance": "17%",
    "description": "Calculate option Greeks (Delta, Gamma, Theta)",
    "companies": [
      "HRT",
      "Two Sigma",
      "Virtu"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "ATM Call",
        "input": "CALL 100 100 0.20 30 0.05",
        "expectedOutput": "0.50 0.02 -0.05"
      },
      {
        "id": 2,
        "name": "ITM Put",
        "input": "PUT 100 110 0.25 60 0.03",
        "expectedOutput": "-0.75 0.01 -0.03"
      },
      {
        "id": 3,
        "name": "OTM Call",
        "input": "CALL 100 120 0.30 90 0.04",
        "expectedOutput": "0.20 0.01 -0.02"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  },
  {
    "id": "199",
    "title": "Market Making Strategy 4",
    "slug": "mm-strategy-19",
    "difficulty": "Hard",
    "topics": [
      "Market Making",
      "Inventory Management"
    ],
    "status": "Unsolved",
    "acceptance": "13%",
    "description": "Implement market making with inventory management",
    "companies": [
      "DE Shaw",
      "Citadel",
      "Virtu"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Neutral",
        "input": "100.00 0 0.20 1000",
        "expectedOutput": "99.98 100.02"
      },
      {
        "id": 2,
        "name": "Long Inventory",
        "input": "100.00 500 0.20 1000",
        "expectedOutput": "99.96 100.01"
      },
      {
        "id": 3,
        "name": "Short Inventory",
        "input": "100.00 -500 0.20 1000",
        "expectedOutput": "99.99 100.04"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  },
  {
    "id": "200",
    "title": "Portfolio Optimization 4",
    "slug": "portfolio-opt-20",
    "difficulty": "Hard",
    "topics": [
      "Portfolio Management",
      "Optimization"
    ],
    "status": "Unsolved",
    "acceptance": "18%",
    "description": "Optimize portfolio weights using Sharpe ratio",
    "companies": [
      "Virtu",
      "IMC Trading",
      "Two Sigma"
    ],
    "testCases": [
      {
        "id": 1,
        "name": "Two Assets",
        "input": "2\\n0.10 0.15\\n0.20 0.25",
        "expectedOutput": "0.60 0.40"
      },
      {
        "id": 2,
        "name": "Three Assets",
        "input": "3\\n0.08 0.12 0.15\\n0.15 0.20 0.30",
        "expectedOutput": "0.50 0.30 0.20"
      },
      {
        "id": 3,
        "name": "Equal Weight",
        "input": "4\\n0.10 0.10 0.10 0.10\\n0.20 0.20 0.20 0.20",
        "expectedOutput": "0.25 0.25 0.25 0.25"
      }
    ],
    "metrics": {
      "latency": "< 100μs",
      "complexity": "O(n log n)",
      "memory": "< 100MB"
    }
  }
];
