// Starter code templates for each problem
export const problemTemplates = {
  "order-book-implementation": {
    python: `# Order Book Implementation
# Input: Lines with "price quantity" for bids/asks
# Output: Best bid and best ask prices

def solve():
    import sys
    lines = sys.stdin.read().strip().split('\\n')
    
    if not lines or lines[0] == '':
        print("None")
        print("None")
        return
    
    bids = []
    asks = []
    
    for line in lines:
        parts = line.split()
        price = float(parts[0])
        quantity = int(parts[1])
        
        # Your logic here to determine bid/ask
        # and maintain order book
        bids.append(price)
    
    # Output best bid and best ask
    if bids:
        print(f"{max(bids):.1f}")
    else:
        print("None")
    
    if asks:
        print(f"{min(asks):.1f}")
    else:
        print("None")

solve()
`,
    javascript: `// Order Book Implementation
const readline = require('readline');

async function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    
    const lines = [];
    for await (const line of rl) {
        lines.push(line);
    }
    
    if (lines.length === 0 || lines[0] === '') {
        console.log("None");
        console.log("None");
        return;
    }
    
    const bids = [];
    const asks = [];
    
    for (const line of lines) {
        const [price, quantity] = line.split(' ').map(Number);
        // Your logic here
        bids.push(price);
    }
    
    // Output best bid and best ask
    console.log(bids.length > 0 ? Math.max(...bids).toFixed(1) : "None");
    console.log(asks.length > 0 ? Math.min(...asks).toFixed(1) : "None");
}

solve();
`,
    cpp: `#include <iostream>
#include <sstream>
#include <vector>
#include <algorithm>
#include <iomanip>
using namespace std;

int main() {
    string line;
    vector<double> bids, asks;
    
    while (getline(cin, line)) {
        if (line.empty()) break;
        
        istringstream iss(line);
        double price;
        int quantity;
        iss >> price >> quantity;
        
        // Your logic here
        bids.push_back(price);
    }
    
    if (bids.empty()) {
        cout << "None" << endl;
    } else {
        cout << fixed << setprecision(1) << *max_element(bids.begin(), bids.end()) << endl;
    }
    
    if (asks.empty()) {
        cout << "None" << endl;
    } else {
        cout << fixed << setprecision(1) << *min_element(asks.begin(), asks.end()) << endl;
    }
    
    return 0;
}
`,
    java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Double> bids = new ArrayList<>();
        List<Double> asks = new ArrayList<>();
        
        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            if (line.isEmpty()) break;
            
            String[] parts = line.split(" ");
            double price = Double.parseDouble(parts[0]);
            int quantity = Integer.parseInt(parts[1]);
            
            // Your logic here
            bids.add(price);
        }
        
        if (bids.isEmpty()) {
            System.out.println("None");
        } else {
            System.out.printf("%.1f%n", Collections.max(bids));
        }
        
        if (asks.isEmpty()) {
            System.out.println("None");
        } else {
            System.out.printf("%.1f%n", Collections.min(asks));
        }
    }
}
`
  },
  
  "vwap-calculation": {
    python: `# VWAP Calculation
# Input: Lines with "price volume"
# Output: Volume-weighted average price

def solve():
    import sys
    lines = sys.stdin.read().strip().split('\\n')
    
    total_value = 0
    total_volume = 0
    
    for line in lines:
        parts = line.split()
        price = float(parts[0])
        volume = int(parts[1])
        
        total_value += price * volume
        total_volume += volume
    
    vwap = total_value / total_volume if total_volume > 0 else 0
    print(f"{vwap:.2f}")

solve()
`,
    javascript: `// VWAP Calculation
const readline = require('readline');

async function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    
    let totalValue = 0;
    let totalVolume = 0;
    
    for await (const line of rl) {
        const [price, volume] = line.split(' ').map(Number);
        totalValue += price * volume;
        totalVolume += volume;
    }
    
    const vwap = totalVolume > 0 ? totalValue / totalVolume : 0;
    console.log(vwap.toFixed(2));
}

solve();
`,
    cpp: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double price, totalValue = 0;
    int volume, totalVolume = 0;
    
    while (cin >> price >> volume) {
        totalValue += price * volume;
        totalVolume += volume;
    }
    
    double vwap = totalVolume > 0 ? totalValue / totalVolume : 0;
    cout << fixed << setprecision(2) << vwap << endl;
    
    return 0;
}
`,
    java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double totalValue = 0;
        int totalVolume = 0;
        
        while (sc.hasNext()) {
            double price = sc.nextDouble();
            int volume = sc.nextInt();
            totalValue += price * volume;
            totalVolume += volume;
        }
        
        double vwap = totalVolume > 0 ? totalValue / totalVolume : 0;
        System.out.printf("%.2f%n", vwap);
    }
}
`
  },
  
  "market-data-feed-handler": {
    python: `# Market Data Feed Handler - NBBO
# Input: Lines with "bid_price bid_size" from different exchanges
# Output: Best bid price across all exchanges

def solve():
    import sys
    lines = sys.stdin.read().strip().split('\\n')
    
    best_bid = 0
    
    for line in lines:
        parts = line.split()
        bid_price = float(parts[0])
        bid_size = int(parts[1])
        
        if bid_price > best_bid:
            best_bid = bid_price
    
    # Check for arbitrage (simplified)
    if len(lines) >= 2:
        prices = [float(line.split()[0]) for line in lines]
        if max(prices) - min(prices) > 0.05:  # Crossed market
            print("ARBITRAGE")
            return
    
    print(f"{best_bid:.2f}")

solve()
`,
    javascript: `// Market Data Feed Handler
const readline = require('readline');

async function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    
    let bestBid = 0;
    const prices = [];
    
    for await (const line of rl) {
        const [bidPrice, bidSize] = line.split(' ').map(Number);
        prices.push(bidPrice);
        if (bidPrice > bestBid) {
            bestBid = bidPrice;
        }
    }
    
    // Check for arbitrage
    if (prices.length >= 2 && Math.max(...prices) - Math.min(...prices) > 0.05) {
        console.log("ARBITRAGE");
        return;
    }
    
    console.log(bestBid.toFixed(2));
}

solve();
`,
    cpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <iomanip>
using namespace std;

int main() {
    double bidPrice, bestBid = 0;
    int bidSize;
    vector<double> prices;
    
    while (cin >> bidPrice >> bidSize) {
        prices.push_back(bidPrice);
        if (bidPrice > bestBid) {
            bestBid = bidPrice;
        }
    }
    
    // Check for arbitrage
    if (prices.size() >= 2) {
        double spread = *max_element(prices.begin(), prices.end()) - 
                       *min_element(prices.begin(), prices.end());
        if (spread > 0.05) {
            cout << "ARBITRAGE" << endl;
            return 0;
        }
    }
    
    cout << fixed << setprecision(2) << bestBid << endl;
    return 0;
}
`,
    java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double bestBid = 0;
        List<Double> prices = new ArrayList<>();
        
        while (sc.hasNext()) {
            double bidPrice = sc.nextDouble();
            int bidSize = sc.nextInt();
            prices.add(bidPrice);
            if (bidPrice > bestBid) {
                bestBid = bidPrice;
            }
        }
        
        // Check for arbitrage
        if (prices.size() >= 2) {
            double spread = Collections.max(prices) - Collections.min(prices);
            if (spread > 0.05) {
                System.out.println("ARBITRAGE");
                return;
            }
        }
        
        System.out.printf("%.2f%n", bestBid);
    }
}
`
  },
  
  "pairs-trading-strategy": {
    python: `# Pairs Trading Strategy
# Input: stock_a_price stock_b_price zscore threshold
# Output: Trading signal (LONG/SHORT/HOLD/CLOSE/STOP)

def solve():
    import sys
    line = sys.stdin.read().strip()
    parts = line.split()
    
    stock_a = float(parts[0])
    stock_b = float(parts[1])
    zscore = float(parts[2])
    threshold = float(parts[3])
    
    # Trading logic
    if abs(zscore) > 3.0:
        print("STOP")
    elif zscore > threshold:
        print("SHORT")
    elif zscore < -threshold:
        print("LONG")
    elif abs(zscore) < 0.5:
        print("CLOSE")
    else:
        print("HOLD")

solve()
`,
    javascript: `// Pairs Trading Strategy
const readline = require('readline');

async function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    
    for await (const line of rl) {
        const [stockA, stockB, zscore, threshold] = line.split(' ').map(Number);
        
        if (Math.abs(zscore) > 3.0) {
            console.log("STOP");
        } else if (zscore > threshold) {
            console.log("SHORT");
        } else if (zscore < -threshold) {
            console.log("LONG");
        } else if (Math.abs(zscore) < 0.5) {
            console.log("CLOSE");
        } else {
            console.log("HOLD");
        }
    }
}

solve();
`,
    cpp: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double stockA, stockB, zscore, threshold;
    cin >> stockA >> stockB >> zscore >> threshold;
    
    if (abs(zscore) > 3.0) {
        cout << "STOP" << endl;
    } else if (zscore > threshold) {
        cout << "SHORT" << endl;
    } else if (zscore < -threshold) {
        cout << "LONG" << endl;
    } else if (abs(zscore) < 0.5) {
        cout << "CLOSE" << endl;
    } else {
        cout << "HOLD" << endl;
    }
    
    return 0;
}
`,
    java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double stockA = sc.nextDouble();
        double stockB = sc.nextDouble();
        double zscore = sc.nextDouble();
        double threshold = sc.nextDouble();
        
        if (Math.abs(zscore) > 3.0) {
            System.out.println("STOP");
        } else if (zscore > threshold) {
            System.out.println("SHORT");
        } else if (zscore < -threshold) {
            System.out.println("LONG");
        } else if (Math.abs(zscore) < 0.5) {
            System.out.println("CLOSE");
        } else {
            System.out.println("HOLD");
        }
    }
}
`
  },
  
  "market-making-inventory": {
    python: `# Market Making with Inventory Management
# Input: price inventory volatility
# Output: bid_price ask_price

def solve():
    import sys
    line = sys.stdin.read().strip()
    parts = line.split()
    
    price = float(parts[0])
    inventory = int(parts[1])
    volatility = float(parts[2])
    
    # Calculate spread based on volatility
    base_spread = volatility * 0.1
    
    # Adjust for inventory (skew quotes)
    inventory_skew = inventory * 0.00001
    
    bid = price - base_spread - inventory_skew
    ask = price + base_spread - inventory_skew
    
    print(f"{bid:.2f} {ask:.2f}")

solve()
`,
    javascript: `// Market Making with Inventory
const readline = require('readline');

async function solve() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    
    for await (const line of rl) {
        const [price, inventory, volatility] = line.split(' ').map(Number);
        
        const baseSpread = volatility * 0.1;
        const inventorySkew = inventory * 0.00001;
        
        const bid = price - baseSpread - inventorySkew;
        const ask = price + baseSpread - inventorySkew;
        
        console.log(\`\${bid.toFixed(2)} \${ask.toFixed(2)}\`);
    }
}

solve();
`,
    cpp: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double price, volatility;
    int inventory;
    cin >> price >> inventory >> volatility;
    
    double baseSpread = volatility * 0.1;
    double inventorySkew = inventory * 0.00001;
    
    double bid = price - baseSpread - inventorySkew;
    double ask = price + baseSpread - inventorySkew;
    
    cout << fixed << setprecision(2) << bid << " " << ask << endl;
    
    return 0;
}
`,
    java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double price = sc.nextDouble();
        int inventory = sc.nextInt();
        double volatility = sc.nextDouble();
        
        double baseSpread = volatility * 0.1;
        double inventorySkew = inventory * 0.00001;
        
        double bid = price - baseSpread - inventorySkew;
        double ask = price + baseSpread - inventorySkew;
        
        System.out.printf("%.2f %.2f%n", bid, ask);
    }
}
`
  }
};
