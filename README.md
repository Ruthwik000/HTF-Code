### HFTCode - High-Frequency Trading Coding Platform

A competitive coding platform dedicated to quantitative finance, market microstructure, and algorithmic execution - similar to LeetCode but for trading algorithms.

## 🚀 Features

- **Authentication System** - Firebase Auth with Email/Password and Google Sign-in
- **Problem Solving** - Code editor with multiple language support (Python, C++, Java, JavaScript)
- **LeetCode-Style Results** - Detailed analysis with complexity, performance metrics, and trading analytics
- **Resizable Panels** - Drag to resize editor and test results
- **Dashboard** - Personalized user dashboard with stats and progress tracking
- **Trading Analytics** - P&L charts, Sharpe ratio, win rate, and trade logs
- **Free Code Execution** - Using Piston API (no API key required)

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** JavaScript/React
- **Styling:** Tailwind CSS v4
- **Authentication:** Firebase Auth
- **Database:** Firestore
- **Code Editor:** Monaco Editor
- **Charts:** Chart.js
- **Animations:** Framer Motion
- **Code Execution:** Piston API

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd fstcode
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file in the root directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 🔐 Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password and Google)
3. Create a Firestore database
4. Add Firestore security rules (see below)
5. Copy your Firebase config to `.env.local`

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /submissions/{submissionId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow write: if request.auth != null && request.resource.data.userId == request.auth.uid;
    }
    match /problems/{problemId} {
      allow read: if true;
      allow write: if false;
    }
    match /leaderboard/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 📁 Project Structure

```
fstcode/
├── src/
│   ├── app/
│   │   ├── api/execute/          # Code execution API
│   │   ├── problems/[slug]/      # Problem pages
│   │   ├── dashboard/            # User dashboard
│   │   ├── login/                # Login page
│   │   ├── signup/               # Signup page
│   │   └── page.js               # Landing page
│   ├── components/
│   │   ├── CodeEditor.js         # Monaco editor wrapper
│   │   ├── LeetCodeStyleResults.js
│   │   ├── SubmissionsAnalysis.js
│   │   ├── ResizablePanel.js
│   │   └── Navbar.js
│   ├── contexts/
│   │   └── AuthContext.js        # Firebase auth context
│   ├── data/
│   │   ├── problems.js           # Problem data
│   │   └── leaderboard.js
│   └── lib/
│       └── firebase.js           # Firebase config
├── .env.local                    # Environment variables (not committed)
├── .env.example                  # Example env file
└── package.json
```

## 🎯 Usage

1. **Sign Up/Login** - Create an account or sign in with Google
2. **Browse Problems** - Navigate to Problem Set
3. **Solve Problems** - Write code in the editor
4. **Run Tests** - Click "Run" to test your code
5. **Submit** - Click "Submit" to see full analysis
6. **View Dashboard** - Track your progress and stats

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [Piston API](https://github.com/engineer-man/piston) - Free code execution engine
- [Firebase](https://firebase.google.com/) - Authentication and database
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [Next.js](https://nextjs.org/) - React framework

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ for the quantitative finance community
