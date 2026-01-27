"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { problems } from "@/data/problems";
import DifficultyBadge from "@/components/DifficultyBadge";
import TopicTag from "@/components/TopicTag";
import CodeEditor from "@/components/CodeEditor";
import LeetCodeStyleResults from "@/components/LeetCodeStyleResults";
import SubmissionsAnalysis from "@/components/SubmissionsAnalysis";
import ResizablePanel from "@/components/ResizablePanel";
import ResizableVerticalPanel from "@/components/ResizableVerticalPanel";
import { Lock, ThumbsUp, MessageSquare, Tag, Play, CheckCircle } from "lucide-react";

const FLAIRS = ["Problem Statement", "Strategy", "Optimization", "Bug", "Question"];

const LANGUAGES = {
    python: {
        name: "Python 3.10",
        value: "python",
        template: `# Write your solution here
def solve(n):
    # Your code here
    return n * 2

# Test
print(solve(5))
`
    },
    cpp: {
        name: "C++ 20",
        value: "cpp",
        template: `#include <iostream>
using namespace std;

int solve(int n) {
    // Your code here
    return n * 2;
}

int main() {
    cout << solve(5) << endl;
    return 0;
}
`
    },
    java: {
        name: "Java 15",
        value: "java",
        template: `public class Main {
    public static int solve(int n) {
        // Your code here
        return n * 2;
    }
    
    public static void main(String[] args) {
        System.out.println(solve(5));
    }
}
`
    },
    javascript: {
        name: "JavaScript",
        value: "javascript",
        template: `// Write your solution here
function solve(n) {
    // Your code here
    return n * 2;
}

// Test
console.log(solve(5));
`
    }
};

const MOCK_DISCUSSIONS = [
    {
        id: 1,
        username: "QuantTrader88",
        time: "2 days ago",
        content: "Has anyone managed to handle the slippage in the high volatility periods? My Sharpe drops significantly.",
        upvotes: 12,
        replies: 4,
        flair: "Strategy"
    },
    {
        id: 2,
        username: "AlgoNewbie",
        time: "5 hours ago",
        content: "Can someone explain the market making constraints again? I keep getting partial fills.",
        upvotes: 3,
        replies: 2,
        flair: "Question"
    }
];

export default function ProblemPage() {
    const { slug } = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("description");
    const [selectedLanguage, setSelectedLanguage] = useState("python");
    const [code, setCode] = useState(LANGUAGES.python.template);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedFlair, setSelectedFlair] = useState(FLAIRS[0]);
    const [testResults, setTestResults] = useState(null);
    const [showSubmissionAnalysis, setShowSubmissionAnalysis] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    // Find problem data
    const problem = problems.find((p) => p.slug === slug);

    if (!problem) {
        return <div className="p-12 text-center">Problem not found</div>;
    }

    // Test runner handler
    const handleRunTests = async (testCases) => {
        if (!user) {
            setShowLoginPrompt(true);
            return;
        }

        setIsRunning(true);
        try {
            const response = await fetch("/api/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: selectedLanguage,
                    code: code,
                    testCases: testCases || problem.testCases,
                    problemType: 'trading'
                })
            });
            const data = await response.json();
            setTestResults(data);
            setIsRunning(false);
            return data.testResults || [];
        } catch (error) {
            console.error("Test execution error:", error);
            setIsRunning(false);
            return [];
        }
    };

    const handleSubmit = async () => {
        if (!user) {
            setShowLoginPrompt(true);
            return;
        }

        const results = await handleRunTests(problem.testCases);
        if (results && results.length > 0) {
            setShowSubmissionAnalysis(true);
            setActiveTab("submissions");
        }
    };

    const handleLanguageChange = (e) => {
        const lang = e.target.value;
        setSelectedLanguage(lang);
        setCode(LANGUAGES[lang].template);
    };

    const getFlairColor = (flair) => {
        switch (flair) {
            case 'Problem Statement': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'Strategy': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'Bug': return 'bg-red-500/10 text-red-400 border-red-500/20';
            default: return 'bg-muted text-muted-foreground border-border';
        }
    }

    // Left Panel Content
    const leftPanelContent = (
        <div className="flex flex-col h-full bg-card border-r border-border">
            {/* Header */}
            <div className="p-6 border-b border-border flex-shrink-0">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl lg:text-2xl font-bold text-foreground">{problem.title}</h1>
                    <DifficultyBadge difficulty={problem.difficulty} />
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                    {problem.topics.map(t => <TopicTag key={t} topic={t} />)}
                </div>
                {problem.companies && problem.companies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {problem.companies.map(company => (
                            <span key={company} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                                {company}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border bg-muted/30 overflow-x-auto flex-shrink-0">
                {["description", "submissions", "discuss", "editorial"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 text-sm font-medium capitalize border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
                            ? "border-primary text-primary"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
                {activeTab === "description" && (
                    <div className="prose prose-invert max-w-none">
                        <h3 className="text-lg font-semibold mb-4">Problem Description</h3>
                        <p className="text-muted-foreground mb-6">{problem.description}</p>

                        {problem.metrics && (
                            <>
                                <h4 className="font-semibold text-foreground mb-2">Performance Targets</h4>
                                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                                    {Object.entries(problem.metrics).map(([key, value]) => (
                                        <li key={key}>
                                            <span className="font-medium">{key}:</span> {value}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {problem.testCases && problem.testCases.length > 0 && (
                            <>
                                <h4 className="font-semibold text-foreground mb-2">Example Test Case</h4>
                                <div className="bg-muted/30 rounded-lg p-4 mb-4">
                                    <p className="text-sm text-muted-foreground mb-2">Input:</p>
                                    <pre className="text-sm text-primary font-mono mb-3 whitespace-pre-wrap">
                                        {problem.testCases[0].input}
                                    </pre>
                                    <p className="text-sm text-muted-foreground mb-2">Expected Output:</p>
                                    <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                                        {problem.testCases[0].expectedOutput}
                                    </pre>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {activeTab === "submissions" && (
                    <SubmissionsAnalysis testResults={testResults} testCases={problem.testCases} />
                )}

                {activeTab === "discuss" && (
                    <div className="space-y-6">
                        {/* New Post Input with Flair Selector */}
                        <div className="bg-muted/20 p-4 rounded-lg border border-border">
                            <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
                                {FLAIRS.map(flair => (
                                    <button
                                        key={flair}
                                        onClick={() => setSelectedFlair(flair)}
                                        className={`text-xs px-2 py-1 rounded-full border transition-all whitespace-nowrap ${selectedFlair === flair
                                            ? 'bg-primary/20 border-primary text-primary'
                                            : 'bg-transparent border-transparent text-muted-foreground hover:bg-muted'
                                            }`}
                                    >
                                        {flair}
                                    </button>
                                ))}
                            </div>
                            <textarea
                                placeholder={`Post about ${selectedFlair}...`}
                                className="w-full bg-background border border-border rounded-md p-3 text-sm focus:outline-none focus:border-primary min-h-[80px]"
                            />
                            <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mt-2 gap-2">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Tag size={12} /> Posting as <span className="font-semibold text-primary">{selectedFlair}</span>
                                </span>
                                <button className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:bg-primary/90">
                                    Post Comment
                                </button>
                            </div>
                        </div>

                        {/* Discussion List */}
                        {MOCK_DISCUSSIONS.map(post => (
                            <div key={post.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 border border-border">
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                                        <div className="flex items-center gap-2 mb-1 sm:mb-0">
                                            <span className="font-semibold text-sm text-foreground">{post.username}</span>
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getFlairColor(post.flair)}`}>
                                                {post.flair}
                                            </span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">{post.time}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        {post.content}
                                    </p>
                                    <div className="flex gap-4 text-xs text-muted-foreground">
                                        <button className="flex items-center gap-1 hover:text-foreground"><ThumbsUp size={14} /> {post.upvotes}</button>
                                        <button className="flex items-center gap-1 hover:text-foreground"><MessageSquare size={14} /> {post.replies}</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "editorial" && (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                            <Lock size={24} />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">Editorial Locked</h3>
                        <p className="max-w-xs">Solve the problem or use an &quot;Unlock Token&quot; to view the official solution.</p>
                    </div>
                )}
            </div>
        </div>
    );

    // Editor Panel
    const editorPanel = (
        <div className="flex flex-col h-full overflow-hidden">
            <CodeEditor code={code} language={selectedLanguage} onChange={setCode} />
        </div>
    );

    // Test Results Panel
    const testResultsPanel = (
        <div className="flex flex-col h-full bg-card">
            <LeetCodeStyleResults 
                testResults={testResults?.testResults}
                testCases={problem.testCases}
            />
        </div>
    );

    // Right Panel with vertical split
    const rightPanelContent = (
        <div className="flex flex-col h-full bg-[#1e1e1e]">
            {/* Toolbar */}
            <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-muted/20 flex-shrink-0">
                <select
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    className="bg-transparent text-xs text-muted-foreground font-mono focus:outline-none border border-transparent hover:border-border rounded px-2 py-1 cursor-pointer"
                >
                    {Object.values(LANGUAGES).map(lang => (
                        <option key={lang.value} value={lang.value} className="bg-[#1e1e1e]">
                            {lang.name}
                        </option>
                    ))}
                </select>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleRunTests(problem.testCases)}
                        disabled={isRunning}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors disabled:opacity-50 border border-border"
                    >
                        <Play size={14} /> 
                        {isRunning ? "Running..." : "Run"}
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isRunning}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                        <CheckCircle size={14} /> 
                        {isRunning ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>

            {/* Resizable Editor and Test Results */}
            <div className="flex-1 overflow-hidden">
                <ResizableVerticalPanel
                    topPanel={editorPanel}
                    bottomPanel={testResultsPanel}
                    defaultTopHeight={65}
                    minTopHeight={30}
                    maxTopHeight={85}
                />
            </div>
        </div>
    );

    return (
        <div className="h-[calc(100vh-64px)] overflow-hidden">
            {/* Login Prompt Modal */}
            {showLoginPrompt && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-card rounded-lg border border-border p-8 max-w-md w-full shadow-2xl">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Sign in required</h2>
                        <p className="text-muted-foreground mb-6">
                            You need to be signed in to run code and submit solutions.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => router.push("/login")}
                                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setShowLoginPrompt(false)}
                                className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ResizablePanel
                leftPanel={leftPanelContent}
                rightPanel={rightPanelContent}
                defaultLeftWidth={50}
                minLeftWidth={30}
                maxLeftWidth={70}
            />
        </div>
    );
}
