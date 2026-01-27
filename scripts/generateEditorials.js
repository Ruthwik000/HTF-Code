const fs = require('fs');

// Editorial templates for different problem types
const editorialTemplates = {
  'simple-moving-average': {
    approach: 'Calculate the average of the last N prices in the array.',
    complexity: 'Time: O(n), Space: O(1)',
    keyInsights: [
      'Sum the last N elements',
      'Divide by N to get average',
      'Handle edge case when array size < N'
    ],
    cppSolution: `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    vector<double> prices;
    double price;
    while (cin >> price) {
        prices.push_back(price);
    }
    
    // Calculate SMA of last n prices
    double sum = 0;
    int count = min(n, (int)prices.size());
    
    for (int i = prices.size() - count; i < prices.size(); i++) {
        sum += prices[i];
    }
    
    double sma = sum / count;
    cout << fixed << setprecision(2) << sma << endl;
    
    return 0;
}`
  },
  
  'bid-ask-spread': {
    approach: 'Calculate the difference between ask and bid prices.',
    complexity: 'Time: O(1), Space: O(1)',
    keyInsights: [
      'Spread = Ask Price - Bid Price',
      'Always positive in normal markets',
      'Tighter spreads indicate more liquid markets'
    ],
    cppSolution: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double bid, ask;
    cin >> bid >> ask;
    
    double spread = ask - bid;
    
    cout << fixed << setprecision(2) << spread << endl;
    
    return 0;
}`
  },
  
  'price-change-pct': {
    approach: 'Calculate percentage change using formula: ((new - old) / old) * 100',
    complexity: 'Time: O(1), Space: O(1)',
    keyInsights: [
      'Percentage change formula',
      'Handle division by zero',
      'Positive = price increase, Negative = price decrease'
    ],
    cppSolution: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double oldPrice, newPrice;
    cin >> oldPrice >> newPrice;
    
    double change = ((newPrice - oldPrice) / oldPrice) * 100.0;
    
    cout << fixed << setprecision(2) << change << endl;
    
    return 0;
}`
  },
  
  'vwp-calc': {
    approach: 'Calculate volume-weighted price: sum(price * volume) / sum(volume)',
    complexity: 'Time: O(n), Space: O(1)',
    keyInsights: [
      'Weight each price by its volume',
      'Larger trades have more influence',
      'Used in execution algorithms'
    ],
    cppSolution: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    double totalValue = 0;
    int totalVolume = 0;
    
    for (int i = 0; i < n; i++) {
        double price;
        int volume;
        cin >> price >> volume;
        
        totalValue += price * volume;
        totalVolume += volume;
    }
    
    double vwp = totalValue / totalVolume;
    
    cout << fixed << setprecision(2) << vwp << endl;
    
    return 0;
}`
  },
  
  'tick-rounding': {
    approach: 'Round price to nearest multiple of tick size.',
    complexity: 'Time: O(1), Space: O(1)',
    keyInsights: [
      'Divide price by tick size',
      'Round to nearest integer',
      'Multiply back by tick size'
    ],
    cppSolution: `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;

int main() {
    double price, tickSize;
    cin >> price >> tickSize;
    
    double rounded = round(price / tickSize) * tickSize;
    
    cout << fixed << setprecision(2) << rounded << endl;
    
    return 0;
}`
  },
  
  'bollinger-bands': {
    approach: 'Calculate mean and standard deviation, then compute bands: mean ± (std_dev * multiplier)',
    complexity: 'Time: O(n), Space: O(n)',
    keyInsights: [
      'Upper band = SMA + (k * standard deviation)',
      'Lower band = SMA - (k * standard deviation)',
      'Used to identify overbought/oversold conditions'
    ],
    cppSolution: `#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>
using namespace std;

int main() {
    int period;
    double k;
    cin >> period >> k;
    
    vector<double> prices;
    double price;
    while (cin >> price) {
        prices.push_back(price);
    }
    
    // Calculate SMA
    double sum = 0;
    for (double p : prices) sum += p;
    double sma = sum / prices.size();
    
    // Calculate standard deviation
    double variance = 0;
    for (double p : prices) {
        variance += (p - sma) * (p - sma);
    }
    double stdDev = sqrt(variance / prices.size());
    
    double upperBand = sma + (k * stdDev);
    double lowerBand = sma - (k * stdDev);
    
    cout << fixed << setprecision(2) << upperBand << " " << lowerBand << endl;
    
    return 0;
}`
  },
  
  'rsi-calc': {
    approach: 'Calculate RSI using average gains and losses over period.',
    complexity: 'Time: O(n), Space: O(n)',
    keyInsights: [
      'RSI = 100 - (100 / (1 + RS))',
      'RS = Average Gain / Average Loss',
      'RSI > 70 = overbought, RSI < 30 = oversold'
    ],
    cppSolution: `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

int main() {
    int period;
    cin >> period;
    
    vector<double> prices;
    double price;
    while (cin >> price) {
        prices.push_back(price);
    }
    
    double totalGain = 0, totalLoss = 0;
    
    for (int i = 1; i < prices.size(); i++) {
        double change = prices[i] - prices[i-1];
        if (change > 0) totalGain += change;
        else totalLoss += abs(change);
    }
    
    double avgGain = totalGain / period;
    double avgLoss = totalLoss / period;
    
    double rsi;
    if (avgLoss == 0) {
        rsi = 100.0;
    } else {
        double rs = avgGain / avgLoss;
        rsi = 100.0 - (100.0 / (1.0 + rs));
    }
    
    cout << fixed << setprecision(2) << rsi << endl;
    
    return 0;
}`
  },
  
  'twap-execution': {
    approach: 'Distribute total quantity evenly across time intervals.',
    complexity: 'Time: O(n), Space: O(n)',
    keyInsights: [
      'TWAP = Time-Weighted Average Price',
      'Divide total quantity by number of intervals',
      'Handle remainder by distributing to first intervals'
    ],
    cppSolution: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int totalQty, numIntervals;
    cin >> totalQty >> numIntervals;
    
    // Read prices (not used in basic TWAP)
    vector<double> prices;
    double price;
    while (cin >> price) {
        prices.push_back(price);
    }
    
    int baseQty = totalQty / numIntervals;
    int remainder = totalQty % numIntervals;
    
    for (int i = 0; i < numIntervals; i++) {
        int qty = baseQty + (i < remainder ? 1 : 0);
        cout << qty;
        if (i < numIntervals - 1) cout << " ";
    }
    cout << endl;
    
    return 0;
}`
  },
  
  'stat-arb': {
    approach: 'Compare z-score against threshold to generate trading signals.',
    complexity: 'Time: O(1), Space: O(1)',
    keyInsights: [
      'Z-score measures standard deviations from mean',
      'High positive z-score → short signal',
      'High negative z-score → long signal',
      'Used in pairs trading strategies'
    ],
    cppSolution: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double priceA, priceB, zscore, threshold;
    cin >> priceA >> priceB >> zscore >> threshold;
    
    if (abs(zscore) > 3.0) {
        cout << "STOP" << endl;
    } else if (zscore > threshold) {
        cout << "SHORT_A_LONG_B" << endl;
    } else if (zscore < -threshold) {
        cout << "LONG_A_SHORT_B" << endl;
    } else {
        cout << "HOLD" << endl;
    }
    
    return 0;
}`
  },
  
  'market-making': {
    approach: 'Quote bid/ask prices adjusted for inventory risk.',
    complexity: 'Time: O(1), Space: O(1)',
    keyInsights: [
      'Spread based on volatility',
      'Skew quotes based on inventory position',
      'Positive inventory → widen ask, tighten bid',
      'Avellaneda-Stoikov framework'
    ],
    cppSolution: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double price, volatility;
    int inventory, maxInventory;
    cin >> price >> inventory >> volatility >> maxInventory;
    
    // Base spread from volatility
    double baseSpread = volatility * 0.1;
    
    // Inventory skew
    double inventorySkew = (double)inventory / maxInventory * 0.02;
    
    double bid = price - baseSpread - inventorySkew;
    double ask = price + baseSpread - inventorySkew;
    
    cout << fixed << setprecision(2) << bid << " " << ask << endl;
    
    return 0;
}`
  }
};

// Generate editorials for all problems
function generateEditorials() {
  const editorials = {};
  
  // Map problem slugs to templates
  const problemMappings = [
    { pattern: 'simple-moving-average', template: 'simple-moving-average' },
    { pattern: 'bid-ask-spread', template: 'bid-ask-spread' },
    { pattern: 'price-change-pct', template: 'price-change-pct' },
    { pattern: 'vwp-calc', template: 'vwp-calc' },
    { pattern: 'tick-rounding', template: 'tick-rounding' },
    { pattern: 'bollinger-bands', template: 'bollinger-bands' },
    { pattern: 'rsi-calc', template: 'rsi-calc' },
    { pattern: 'twap-execution', template: 'twap-execution' },
    { pattern: 'stat-arb', template: 'stat-arb' },
    { pattern: 'market-making', template: 'market-making' }
  ];
  
  // Generate for each problem type
  problemMappings.forEach(mapping => {
    const template = editorialTemplates[mapping.template];
    if (template) {
      editorials[mapping.pattern] = template;
    }
  });
  
  return editorials;
}

const editorials = generateEditorials();

const output = `// Auto-generated Editorials with C++ Solutions
export const editorials = ${JSON.stringify(editorials, null, 2)};
`;

fs.writeFileSync('src/data/editorials.js', output);
console.log('✅ Generated editorials with C++ solutions!');
