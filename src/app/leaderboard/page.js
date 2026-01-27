"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getGlobalLeaderboard } from "@/lib/leaderboardService";
import { Trophy, Clock, Award, Loader2 } from "lucide-react";

export default function LeaderboardPage() {
    const { user } = useAuth();
    const [globalLeaderboard, setGlobalLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRank, setUserRank] = useState(null);
    const [indexWarning, setIndexWarning] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // Load global leaderboard
    useEffect(() => {
        loadGlobalLeaderboard();
    }, []);

    const loadGlobalLeaderboard = async () => {
        setLoading(true);
        setIndexWarning(false);
        setRefreshing(true);
        try {
            console.log('🔄 Loading global leaderboard...');
            const data = await getGlobalLeaderboard(100);
            console.log('📊 Loaded', data.length, 'entries');
            console.log('📊 First entry:', data[0]); // Debug: check data structure
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
        loadGlobalLeaderboard();
    };

    const getRankBadge = (rank) => {
        // Handle undefined or invalid rank
        if (!rank || isNaN(rank)) {
            console.warn('Invalid rank:', rank);
            return <span className="text-muted-foreground font-mono text-sm">-</span>;
        }
        
        if (rank === 1) {
            return <Trophy size={20} className="text-yellow-500" />;
        } else if (rank === 2) {
            return <Trophy size={20} className="text-gray-400" />;
        } else if (rank === 3) {
            return <Trophy size={20} className="text-amber-700" />;
        }
        return <span className="text-muted-foreground font-mono text-sm">#{rank}</span>;
    };

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
                    <h1 className="text-3xl font-bold text-foreground mb-2">Global Leaderboard</h1>
                    <p className="text-muted-foreground">Top performing algorithms and strategists</p>
                    {user && userRank && (
                        <div className="mt-3 flex items-center gap-2 text-sm">
                            <Award className="text-primary" size={16} />
                            <span className="text-foreground">Your Rank: <span className="font-bold text-primary">#{userRank}</span></span>
                        </div>
                    )}
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

            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="animate-spin text-primary" size={32} />
                    </div>
                ) : globalLeaderboard.length === 0 ? (
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
                                    <th className="py-4 px-6 text-right">Score</th>
                                    <th className="py-4 px-6 text-right">Solved</th>
                                    <th className="py-4 px-6 text-right">Wrong</th>
                                    <th className="py-4 px-6 text-right">Avg Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {globalLeaderboard.map((entry) => {
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
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
