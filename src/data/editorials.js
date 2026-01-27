// Auto-generated Editorials with C++ Solutions
export const editorials = {
  "simple-moving-average": {
    "approach": "Calculate the average of the last N prices in the array.",
    "complexity": "Time: O(n), Space: O(1)",
    "keyInsights": [
      "Sum the last N elements",
      "Divide by N to get average",
      "Handle edge case when array size < N"
    ],
    "cppSolution": "#include <iostream>\n#include <vector>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    vector<double> prices;\n    double price;\n    while (cin >> price) {\n        prices.push_back(price);\n    }\n    \n    // Calculate SMA of last n prices\n    double sum = 0;\n    int count = min(n, (int)prices.size());\n    \n    for (int i = prices.size() - count; i < prices.size(); i++) {\n        sum += prices[i];\n    }\n    \n    double sma = sum / count;\n    cout << fixed << setprecision(2) << sma << endl;\n    \n    return 0;\n}"
  },
  "bid-ask-spread": {
    "approach": "Calculate the difference between ask and bid prices.",
    "complexity": "Time: O(1), Space: O(1)",
    "keyInsights": [
      "Spread = Ask Price - Bid Price",
      "Always positive in normal markets",
      "Tighter spreads indicate more liquid markets"
    ],
    "cppSolution": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    double bid, ask;\n    cin >> bid >> ask;\n    \n    double spread = ask - bid;\n    \n    cout << fixed << setprecision(2) << spread << endl;\n    \n    return 0;\n}"
  },
  "price-change-pct": {
    "approach": "Calculate percentage change using formula: ((new - old) / old) * 100",
    "complexity": "Time: O(1), Space: O(1)",
    "keyInsights": [
      "Percentage change formula",
      "Handle division by zero",
      "Positive = price increase, Negative = price decrease"
    ],
    "cppSolution": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    double oldPrice, newPrice;\n    cin >> oldPrice >> newPrice;\n    \n    double change = ((newPrice - oldPrice) / oldPrice) * 100.0;\n    \n    cout << fixed << setprecision(2) << change << endl;\n    \n    return 0;\n}"
  },
  "vwp-calc": {
    "approach": "Calculate volume-weighted price: sum(price * volume) / sum(volume)",
    "complexity": "Time: O(n), Space: O(1)",
    "keyInsights": [
      "Weight each price by its volume",
      "Larger trades have more influence",
      "Used in execution algorithms"
    ],
    "cppSolution": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    double totalValue = 0;\n    int totalVolume = 0;\n    \n    for (int i = 0; i < n; i++) {\n        double price;\n        int volume;\n        cin >> price >> volume;\n        \n        totalValue += price * volume;\n        totalVolume += volume;\n    }\n    \n    double vwp = totalValue / totalVolume;\n    \n    cout << fixed << setprecision(2) << vwp << endl;\n    \n    return 0;\n}"
  },
  "tick-rounding": {
    "approach": "Round price to nearest multiple of tick size.",
    "complexity": "Time: O(1), Space: O(1)",
    "keyInsights": [
      "Divide price by tick size",
      "Round to nearest integer",
      "Multiply back by tick size"
    ],
    "cppSolution": "#include <iostream>\n#include <iomanip>\n#include <cmath>\nusing namespace std;\n\nint main() {\n    double price, tickSize;\n    cin >> price >> tickSize;\n    \n    double rounded = round(price / tickSize) * tickSize;\n    \n    cout << fixed << setprecision(2) << rounded << endl;\n    \n    return 0;\n}"
  },
  "bollinger-bands": {
    "approach": "Calculate mean and standard deviation, then compute bands: mean ± (std_dev * multiplier)",
    "complexity": "Time: O(n), Space: O(n)",
    "keyInsights": [
      "Upper band = SMA + (k * standard deviation)",
      "Lower band = SMA - (k * standard deviation)",
      "Used to identify overbought/oversold conditions"
    ],
    "cppSolution": "#include <iostream>\n#include <vector>\n#include <cmath>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    int period;\n    double k;\n    cin >> period >> k;\n    \n    vector<double> prices;\n    double price;\n    while (cin >> price) {\n        prices.push_back(price);\n    }\n    \n    // Calculate SMA\n    double sum = 0;\n    for (double p : prices) sum += p;\n    double sma = sum / prices.size();\n    \n    // Calculate standard deviation\n    double variance = 0;\n    for (double p : prices) {\n        variance += (p - sma) * (p - sma);\n    }\n    double stdDev = sqrt(variance / prices.size());\n    \n    double upperBand = sma + (k * stdDev);\n    double lowerBand = sma - (k * stdDev);\n    \n    cout << fixed << setprecision(2) << upperBand << \" \" << lowerBand << endl;\n    \n    return 0;\n}"
  },
  "rsi-calc": {
    "approach": "Calculate RSI using average gains and losses over period.",
    "complexity": "Time: O(n), Space: O(n)",
    "keyInsights": [
      "RSI = 100 - (100 / (1 + RS))",
      "RS = Average Gain / Average Loss",
      "RSI > 70 = overbought, RSI < 30 = oversold"
    ],
    "cppSolution": "#include <iostream>\n#include <vector>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    int period;\n    cin >> period;\n    \n    vector<double> prices;\n    double price;\n    while (cin >> price) {\n        prices.push_back(price);\n    }\n    \n    double totalGain = 0, totalLoss = 0;\n    \n    for (int i = 1; i < prices.size(); i++) {\n        double change = prices[i] - prices[i-1];\n        if (change > 0) totalGain += change;\n        else totalLoss += abs(change);\n    }\n    \n    double avgGain = totalGain / period;\n    double avgLoss = totalLoss / period;\n    \n    double rsi;\n    if (avgLoss == 0) {\n        rsi = 100.0;\n    } else {\n        double rs = avgGain / avgLoss;\n        rsi = 100.0 - (100.0 / (1.0 + rs));\n    }\n    \n    cout << fixed << setprecision(2) << rsi << endl;\n    \n    return 0;\n}"
  },
  "twap-execution": {
    "approach": "Distribute total quantity evenly across time intervals.",
    "complexity": "Time: O(n), Space: O(n)",
    "keyInsights": [
      "TWAP = Time-Weighted Average Price",
      "Divide total quantity by number of intervals",
      "Handle remainder by distributing to first intervals"
    ],
    "cppSolution": "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int totalQty, numIntervals;\n    cin >> totalQty >> numIntervals;\n    \n    // Read prices (not used in basic TWAP)\n    vector<double> prices;\n    double price;\n    while (cin >> price) {\n        prices.push_back(price);\n    }\n    \n    int baseQty = totalQty / numIntervals;\n    int remainder = totalQty % numIntervals;\n    \n    for (int i = 0; i < numIntervals; i++) {\n        int qty = baseQty + (i < remainder ? 1 : 0);\n        cout << qty;\n        if (i < numIntervals - 1) cout << \" \";\n    }\n    cout << endl;\n    \n    return 0;\n}"
  },
  "stat-arb": {
    "approach": "Compare z-score against threshold to generate trading signals.",
    "complexity": "Time: O(1), Space: O(1)",
    "keyInsights": [
      "Z-score measures standard deviations from mean",
      "High positive z-score → short signal",
      "High negative z-score → long signal",
      "Used in pairs trading strategies"
    ],
    "cppSolution": "#include <iostream>\n#include <cmath>\nusing namespace std;\n\nint main() {\n    double priceA, priceB, zscore, threshold;\n    cin >> priceA >> priceB >> zscore >> threshold;\n    \n    if (abs(zscore) > 3.0) {\n        cout << \"STOP\" << endl;\n    } else if (zscore > threshold) {\n        cout << \"SHORT_A_LONG_B\" << endl;\n    } else if (zscore < -threshold) {\n        cout << \"LONG_A_SHORT_B\" << endl;\n    } else {\n        cout << \"HOLD\" << endl;\n    }\n    \n    return 0;\n}"
  },
  "market-making": {
    "approach": "Quote bid/ask prices adjusted for inventory risk.",
    "complexity": "Time: O(1), Space: O(1)",
    "keyInsights": [
      "Spread based on volatility",
      "Skew quotes based on inventory position",
      "Positive inventory → widen ask, tighten bid",
      "Avellaneda-Stoikov framework"
    ],
    "cppSolution": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    double price, volatility;\n    int inventory, maxInventory;\n    cin >> price >> inventory >> volatility >> maxInventory;\n    \n    // Base spread from volatility\n    double baseSpread = volatility * 0.1;\n    \n    // Inventory skew\n    double inventorySkew = (double)inventory / maxInventory * 0.02;\n    \n    double bid = price - baseSpread - inventorySkew;\n    double ask = price + baseSpread - inventorySkew;\n    \n    cout << fixed << setprecision(2) << bid << \" \" << ask << endl;\n    \n    return 0;\n}"
  }
};
