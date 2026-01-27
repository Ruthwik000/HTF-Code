// Editorials for original 5 problems
export const originalEditorials = {
  'order-book-implementation': {
    approach: 'Implement a limit order book using balanced data structures (map/multimap) to maintain price-time priority. Use separate structures for bids and asks, with bids sorted in descending order and asks in ascending order.',
    complexity: 'Time: O(log n) for add/cancel, O(1) for best price. Space: O(n) where n is number of orders',
    keyInsights: [
      'Use std::map for O(log n) insertions and deletions',
      'Bids: higher price = better (use reverse order)',
      'Asks: lower price = better (use normal order)',
      'Maintain price-time priority within each price level',
      'Handle order matching when bid >= ask'
    ],
    cppSolution: `#include <iostream>
#include <map>
#include <queue>
#include <iomanip>
using namespace std;

struct Order {
    int id;
    double price;
    int quantity;
    long long timestamp;
};

int main() {
    map<double, queue<Order>, greater<double>> bids; // Higher price first
    map<double, queue<Order>> asks;                   // Lower price first
    
    string line;
    int orderId = 0;
    
    while (getline(cin, line)) {
        if (line.empty()) break;
        
        // Parse order: price quantity
        double price;
        int quantity;
        sscanf(line.c_str(), "%lf %d", &price, &quantity);
        
        Order order = {orderId++, price, quantity, orderId};
        
        // Determine if bid or ask based on context
        // For this problem, we'll use a simple heuristic
        if (bids.empty() || price <= bids.begin()->first) {
            bids[price].push(order);
        } else {
            asks[price].push(order);
        }
    }
    
    // Output best bid and ask
    if (!bids.empty()) {
        cout << fixed << setprecision(1) << bids.begin()->first << endl;
    } else {
        cout << "None" << endl;
    }
    
    if (!asks.empty()) {
        cout << fixed << setprecision(1) << asks.begin()->first << endl;
    } else {
        cout << "None" << endl;
    }
    
    return 0;
}`,
    additionalNotes: 'In production systems, use lock-free data structures and memory pools for ultra-low latency.'
  },

  'vwap-calculation': {
    approach: 'Calculate VWAP by maintaining running sums of (price × volume) and total volume. VWAP = Σ(price × volume) / Σ(volume)',
    complexity: 'Time: O(n) for n trades, Space: O(1) for fixed window',
    keyInsights: [
      'VWAP weights prices by their trading volume',
      'Used as execution benchmark',
      'Can be calculated incrementally',
      'Rolling window requires circular buffer',
      'Precision matters - use double for calculations'
    ],
    cppSolution: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double totalValue = 0.0;
    int totalVolume = 0;
    
    double price;
    int volume;
    
    while (cin >> price >> volume) {
        totalValue += price * volume;
        totalVolume += volume;
    }
    
    if (totalVolume == 0) {
        cout << "0.00" << endl;
        return 0;
    }
    
    double vwap = totalValue / totalVolume;
    cout << fixed << setprecision(2) << vwap << endl;
    
    return 0;
}`,
    additionalNotes: 'For real-time VWAP, use sliding window with deque for O(1) updates.'
  },

  'market-data-feed-handler': {
    approach: 'Maintain best bid/ask from multiple exchanges. Detect arbitrage when bid > ask across exchanges. Use priority queue or sorted map for efficient NBBO calculation.',
    complexity: 'Time: O(log n) per update, Space: O(n) for n exchanges',
    keyInsights: [
      'NBBO = National Best Bid and Offer',
      'Track best prices across all exchanges',
      'Arbitrage exists when bid > ask',
      'Sub-microsecond latency critical',
      'Handle stale quotes and exchange outages'
    ],
    cppSolution: `#include <iostream>
#include <vector>
#include <algorithm>
#include <iomanip>
using namespace std;

int main() {
    vector<double> bids;
    double bid, size;
    
    while (cin >> bid >> size) {
        bids.push_back(bid);
    }
    
    if (bids.empty()) {
        cout << "None" << endl;
        return 0;
    }
    
    // Check for arbitrage (crossed market)
    if (bids.size() >= 2) {
        double maxBid = *max_element(bids.begin(), bids.end());
        double minBid = *min_element(bids.begin(), bids.end());
        
        if (maxBid - minBid > 0.05) {
            cout << "ARBITRAGE" << endl;
            return 0;
        }
    }
    
    // Output best bid
    double bestBid = *max_element(bids.begin(), bids.end());
    cout << fixed << setprecision(2) << bestBid << endl;
    
    return 0;
}`,
    additionalNotes: 'Production systems use lock-free queues and FPGA for ultra-low latency.'
  },

  'pairs-trading-strategy': {
    approach: 'Implement mean-reversion strategy using z-score. Enter positions when z-score exceeds threshold, exit when it reverts to mean. Use stop-loss for risk management.',
    complexity: 'Time: O(1) per signal, Space: O(n) for price history',
    keyInsights: [
      'Z-score = (spread - mean) / std_dev',
      'High z-score → short spread (short A, long B)',
      'Low z-score → long spread (long A, short B)',
      'Stop loss at |z-score| > 3',
      'Exit when |z-score| < 0.5'
    ],
    cppSolution: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double stockA, stockB, zscore, threshold;
    cin >> stockA >> stockB >> zscore >> threshold;
    
    // Risk management: stop loss
    if (abs(zscore) > 3.0) {
        cout << "STOP" << endl;
        return 0;
    }
    
    // Entry signals
    if (zscore > threshold) {
        cout << "SHORT" << endl;  // Short A, Long B
    } else if (zscore < -threshold) {
        cout << "LONG" << endl;   // Long A, Short B
    } else if (abs(zscore) < 0.5) {
        cout << "CLOSE" << endl;  // Close position
    } else {
        cout << "HOLD" << endl;   // No action
    }
    
    return 0;
}`,
    additionalNotes: 'Calculate z-score using rolling window. Monitor cointegration continuously.'
  },

  'market-making-inventory': {
    approach: 'Implement Avellaneda-Stoikov market making model. Adjust quotes based on inventory position and volatility. Skew prices to reduce inventory risk.',
    complexity: 'Time: O(1) per quote update, Space: O(1)',
    keyInsights: [
      'Base spread from volatility: σ × multiplier',
      'Inventory skew: adjust quotes to reduce position',
      'Positive inventory → widen ask, tighten bid',
      'Negative inventory → widen bid, tighten ask',
      'Risk aversion parameter controls aggressiveness'
    ],
    cppSolution: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double price, volatility;
    int inventory;
    cin >> price >> inventory >> volatility;
    
    // Base spread from volatility
    double baseSpread = volatility * 0.1;
    
    // Inventory skew (risk adjustment)
    double inventorySkew = inventory * 0.00001;
    
    // Calculate bid and ask
    double bid = price - baseSpread - inventorySkew;
    double ask = price + baseSpread - inventorySkew;
    
    cout << fixed << setprecision(2) << bid << " " << ask << endl;
    
    return 0;
}`,
    additionalNotes: 'Advanced: incorporate adverse selection, order flow toxicity, and queue position.'
  }
};
