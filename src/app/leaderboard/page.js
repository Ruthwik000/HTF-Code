"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { problems } from "@/data/problems";
import { generatedProblems } from "@/data/generated100Problems";
import { getGlobalLeaderboard, getProblemLeaderboard } from "@/lib/leaderboardService";
import { Trophy, Clock, TrendingUp, Award, Zap, Target, Loader2 } from "lucide-react";

// Combine all problems
const allProblems = [...problems, ...generatedProblems];

export default function LeaderboardPage() {
    const { user } = useAuth();
    const [view, setView] = useState("global"); // global | problem
    const [selectedProblemId, setSelectedProblemId] = useState(allProblems[0]?.id || "1");
    const [globalLeaderboard, setGlobalLeaderboard] = useState([]);
    const [problemLeaderboard, setProblemLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRank, setUserRank] = useState(null);
    const [indexWarning, setIndexWarning] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // Load global leaderboard
    useEffect(() => {
        loadGlobalLeaderboard();
    }, []);

    // Load problem leaderboard when problem changes
    useEffect(() => {
        if (view === "problem") {
            loadProblemLeaderboard(selectedProblemId);
        }
    }, [view, selectedProblemId]);

    const loadGlobalLeaderboard = async () => {
        setLoading(true);
        setIndexWarning(false);
        setRefreshing(true);
        try {
            console.log('🔄 Loading global leaderboard...');
            const data = await getGlobalLeaderboard(100);
            console.log('📊 Loaded', data.length, 'entries');
            setGlobalLeaderboard(data);
            
            // Find current user's rank
            if (user) {
                const userEntry = data.find(entry => entry.userId === user.uid);
                if (userEntry) {
                    setUserRank(userEntry.rank);
                    console.log('🏆 Your rank:', userEntry.rank);
                } else {
                    console.log('⚠️ User not found in leaderboard');
                }
            }
        } catch (error) {
            console.error('❌ Error loading global leaderboard:', error);
            if (error.message && error.message.includes('index')) {
                setIndexWarning(true);
            }
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleManualRefresh = () => {
        if (view === 'global') {
            loadGlobalLeaderboard();
        } else {
            loadProblemLeaderboard(selectedProblemId);
        }
    };

    const loadProblemLeaderboard = async (problemId) => {
        setLoading(true);
        try {
            const data = await getProblemLeaderboard(problemId, 50);
            setProblemLeaderboard(data);
        } catch (error) {
            console.error('Error loading problem leaderboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const getRankBadge = (rank) => {
        if (rank === 1) {
            return <Trophy size={20} className="text-yellow-500" />;
        } else if (rank === 2) {
            return <Trophy size={20} className="text-gray-400" />;
        } else if (rank === 3) {
            return <Trophy size={20} className="text-amber-700" />;
        }
        return <span className="text-muted-foreground font-mono text-sm">#{rank}</span>;
    };

    const currentLeaderboard = view === "global" ? globalLeaderboard : problemLeaderboard;

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Index Warning Banner */}
            {indexWarning && (
                <div className="mb-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <div className="text-yellow-500 mt-0.5">⚠️</div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-yellow-400 mb-1">Firebase Index Required</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                                The leaderboard requires a composite index to function properly. 
                                Click the link in the browser console or follow the setup guide.
                            </p>
                            <a 
                                href="https://console.firebase.google.com/v1/r/project/hftcode/firestore/indexes?create_composite=Cktwcm9qZWN0cy9oZnRjb2RlL2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy9sZWFkZXJib2FyZC9pbmRleGVzL18QARoOCgp0b3RhbFNjb3JlEAIaFAoQd3JvbmdTdWJtaXNzaW9ucxABGg4KCmF2Z1J1bnRpbWUQARoMCghfX25hbWVfXxAB"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-yellow-400 hover:text-yellow-300 underline"
                            >
                                Create Index in Firebase Console →
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Header with User Rank */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Leaderboard</h1>
                    <p className="text-muted-foreground">Top performing algorithms and strategists</p>
                    {user && userRank && (
                        <div className="mt-3 flex items-center gap-2 text-sm">
                            <Award className="text-primary" size={16} />
                            <span className="text-foreground">Your Rank: <span className="font-bold text-primary">#{userRank}</span></span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 bg-muted p-1 rounded-lg border border-border">
                    <button
                        onClick={() => setView("global")}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${view === "global"
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Global Ranking
                    </button>
                    <button
                        onClick={() => setView("problem")}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${view === "problem"
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Per Problem
                    </button>
                </div>

                <button
                    onClick={handleManualRefresh}
                    disabled={refreshing}
                    className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {refreshing ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Refreshing...
                        </>
                    ) : (
                        <>
                            <Award size={16} />
                            Refresh
                        </>
                    )}
                </button>
            </div>

            {/* Scoring Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="text-green-500" size={18} />
                        <span className="text-sm font-semibold text-green-400">Easy Problems</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">1 Point</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="text-yellow-500" size={18} />
                        <span className="text-sm font-semibold text-yellow-400">Medium Problems</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">5 Points</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Trophy className="text-red-500" size={18} />
                        <span className="text-sm font-semibold text-red-400">Hard Problems</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">10 Points</p>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                {view === "problem" && (
                    <div className="p-4 border-b border-border bg-muted/20 flex items-center gap-4">
                        <label className="text-sm font-medium text-foreground">Select Problem:</label>
                        <select
                            className="bg-background border border-border rounded-md px-3 py-1.5 text-sm text-foreground focus:outline-none focus:border-primary"
                            value={selectedProblemId}
                            onChange={(e) => setSelectedProblemId(e.target.value)}
                        >
                            {allProblems.map(p => (
                                <option key={p.id} value={p.id}>{p.title}</option>
                            ))}
                        </select>
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="animate-spin text-primary" size={32} />
                    </div>
                ) : currentLeaderboard.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground">
                        <Trophy size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No submissions yet. Be the first!</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-muted/30 text-xs uppercase text-muted-foreground font-semibold">
                                <tr>
                                    <th className="py-4 px-6 w-20 text-center">Rank</th>
                                    <th className="py-4 px-6">User</th>
                                    {view === "global" ? (
                                        <>
                                            <th className="py-4 px-6 text-right">Score</th>
                                            <th className="py-4 px-6 text-right">Solved</th>
                                            <th className="py-4 px-6 text-right">Wrong</th>
                                            <th className="py-4 px-6 text-right">Avg Time</th>
                                        </>
                                    ) : (
                                        <>
                                            <th className="py-4 px-6 text-right">Score</th>
                                            <th className="py-4 px-6 text-right">Runtime</th>
                                            <th className="py-4 px-6 text-right">Language</th>
                                            <th className="py-4 px-6 text-right">Profit</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {currentLeaderboard.map((entry) => {
                                    const isCurrentUser = user && entry.userId === user.uid;
                                    return (
                                        <tr 
                                            key={entry.userId} 
                                            className={`hover:bg-muted/10 transition-colors ${
                                                isCurrentUser ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                                            }`}
                                        >
                                            <td className="py-4 px-6 text-center">
                                                {getRankBadge(entry.rank)}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    {entry.photoURL ? (
                                                        <img 
                                                            src={entry.photoURL} 
                                                            alt={entry.username}
                                                            className="w-8 h-8 rounded-full"
                                                        />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                                                            {entry.username.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                    <span className="font-medium text-foreground">
                                                        {entry.username}
                                                        {isCurrentUser && (
                                                            <span className="ml-2 text-xs text-primary">(You)</span>
                                                        )}
                                                    </span>
                                                </div>
                                            </td>
                                            {view === "global" ? (
                                                <>
                                                    <td className="py-4 px-6 text-right text-foreground font-mono font-bold">
                                                        {entry.totalScore.toFixed(1)}
                                                    </td>
                                                    <td className="py-4 px-6 text-right text-green-500 font-mono">
                                                        {entry.problemsSolved}
                                                    </td>
                                                    <td className="py-4 px-6 text-right text-red-400 font-mono">
                                                        {entry.wrongSubmissions}
                                                    </td>
                                                    <td className="py-4 px-6 text-right text-muted-foreground font-mono flex items-center justify-end gap-2">
                                                        <Clock size={14} />
                                                        {entry.avgRuntime}ms
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="py-4 px-6 text-right text-foreground font-mono font-bold">
                                                        {entry.score}%
                                                    </td>
                                                    <td className="py-4 px-6 text-right text-muted-foreground font-mono">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Clock size={14} />
                                                            {entry.runtime}ms
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 text-right text-muted-foreground">
                                                        <span className="px-2 py-1 bg-muted rounded text-xs font-mono">
                                                            {entry.language}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 text-right font-mono">
                                                        {entry.tradingMetrics?.totalPnL ? (
                                                            <span className={entry.tradingMetrics.totalPnL > 0 ? 'text-green-500' : 'text-red-400'}>
                                                                <TrendingUp size={14} className="inline mr-1" />
                                                                ${entry.tradingMetrics.totalPnL.toFixed(2)}
                                                            </span>
                                                        ) : (
                                                            <span className="text-muted-foreground">N/A</span>
                                                        )}
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Penalty Info */}
            <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-400 mb-2">📊 Ranking System</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>Primary:</strong> Total score (higher is better)</li>
                    <li>• <strong>Tiebreaker 1:</strong> Wrong submissions (fewer is better)</li>
                    <li>• <strong>Tiebreaker 2:</strong> Average runtime (faster is better)</li>
                    <li>• <strong>Tiebreaker 3:</strong> Trading profit (higher is better)</li>
                    <li>• <strong>Penalty:</strong> 10% score reduction per wrong submission</li>
                </ul>
            </div>
        </div>
    );
}
