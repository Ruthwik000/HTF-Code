"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { problems } from "@/data/problems";
import DifficultyBadge from "@/components/DifficultyBadge";
import TopicTag from "@/components/TopicTag";
import CodeEditor from "@/components/CodeEditor";
import MetricCard from "@/components/MetricCard";
import { Play, Send, Lock, ThumbsUp, MessageSquare, Tag } from "lucide-react";

const FLAIRS = ["Problem Statement", "Strategy", "Optimization", "Bug", "Question"];

const LANGUAGES = {
    python: {
        name: "Python 3.10",
        value: "python",
        template: `class Strategy:
    def on_tick(self, market):
        # Your strategy logic here
        pass
`
    },
    cpp: {
        name: "C++ 20",
        value: "cpp",
        template: `class Strategy {
public:
    void on_tick(Market& market) {
        // Your logic here
    }
};
`
    },
    java: {
        name: "Java 21",
        value: "java",
        template: `class Strategy {
    public void onTick(Market market) {
        // Your logic here
    }
}
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
    const [activeTab, setActiveTab] = useState("description");
    const [selectedLanguage, setSelectedLanguage] = useState("python");
    const [code, setCode] = useState(LANGUAGES.python.template);
    const [result, setResult] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedFlair, setSelectedFlair] = useState(FLAIRS[0]);

    // Find problem data
    const problem = problems.find((p) => p.slug === slug);

    if (!problem) {
        return <div className="p-12 text-center">Problem not found</div>;
    }

    const handleRun = () => {
        setIsRunning(true);
        setTimeout(() => {
            setIsRunning(false);
            setResult({
                pnl: "+$12,450",
                sharpe: "3.2",
                drawdown: "-4.5%",
                rank: "#42",
                status: "Success"
            });
        }, 1500);
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

    return (
        <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-64px)] overflow-hidden lg:overflow-hidden">
            {/* LEFT COLUMN: Problem Details */}
            <div className="w-full lg:w-1/2 flex flex-col border-r border-border bg-card h-[600px] lg:h-full">
                {/* Header */}
                <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl lg:text-2xl font-bold text-foreground">{problem.title}</h1>
                        <DifficultyBadge difficulty={problem.difficulty} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {problem.topics.map(t => <TopicTag key={t} topic={t} />)}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-border bg-muted/30 overflow-x-auto">
                    {["description", "discuss", "editorial"].map((tab) => (
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

                            <h4 className="font-semibold text-foreground mb-2">Trading Objective</h4>
                            <p className="text-muted-foreground mb-4">
                                Design a strategy that maximizes PnL while maintaining a Sharpe Ratio above 2.0.
                                You are given a stream of tick data (price, volume).
                            </p>

                            <h4 className="font-semibold text-foreground mb-2">Constraints</h4>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                                <li>Max position size: 100 lots</li>
                                <li>Transaction cost: 0.5 bps</li>
                                <li>Latency simulation: 10ms</li>
                            </ul>
                        </div>
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
                            <p className="max-w-xs">Solve the problem or use a "Unlock Token" to view the official solution.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT COLUMN: Code Editor & Results */}
            <div className="w-full lg:w-1/2 flex flex-col bg-[#1e1e1e] h-[600px] lg:h-full">
                {/* Toolbar */}
                <div className="h-12 border-b border-border flex items-center justify-between px-4 bg-muted/20">
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
                            onClick={handleRun}
                            disabled={isRunning}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors disabled:opacity-50"
                        >
                            <Play size={14} /> Run
                        </button>
                        <button
                            onClick={handleRun}
                            disabled={isRunning}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            <Send size={14} /> Submit
                        </button>
                    </div>
                </div>

                {/* Editor */}
                <div className="flex-1 relative">
                    <CodeEditor code={code} language={selectedLanguage} onChange={setCode} />
                </div>

                {/* Results Panel */}
                <div className="h-auto min-h-[192px] border-t border-border bg-card p-4 overflow-y-auto">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Test Results</h3>

                    {result ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up">
                            <MetricCard label="PnL" value={result.pnl} subValue="vs. Benchmark" />
                            <MetricCard label="Sharpe Ratio" value={result.sharpe} />
                            <MetricCard label="Max Drawdown" value={result.drawdown} />
                            <MetricCard label="Global Rank" value={result.rank} />
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground text-sm py-8 lg:py-0">
                            {isRunning ? "Simulating Strategy..." : "Run your code to see results."}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
