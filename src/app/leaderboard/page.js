"use client";

import { useState } from "react";
import { globalLeaderboard, problemLeaderboard } from "@/data/leaderboard";
import { problems } from "@/data/problems";
import { Trophy, Clock, TrendingUp } from "lucide-react";

export default function LeaderboardPage() {
    const [view, setView] = useState("global"); // global | problem
    const [selectedProblemId, setSelectedProblemId] = useState(problems[0]?.id || "1");

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Leaderboard</h1>
                    <p className="text-muted-foreground">Top performing algorithms and strategists.</p>
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
                            {problems.map(p => (
                                <option key={p.id} value={p.id}>{p.title}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-muted/30 text-xs uppercase text-muted-foreground font-semibold">
                            <tr>
                                <th className="py-4 px-6 w-16 text-center">Rank</th>
                                <th className="py-4 px-6">User</th>
                                <th className="py-4 px-6 text-right">
                                    {view === "global" ? "Total Score" : "Score"}
                                </th>
                                <th className="py-4 px-6 text-right">
                                    {view === "global" ? "Avg Sharpe" : "Execution Time"}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {(view === "global" ? globalLeaderboard : problemLeaderboard).map((entry, idx) => (
                                <tr key={idx} className="hover:bg-muted/10 transition-colors">
                                    <td className="py-4 px-6 text-center">
                                        {entry.rank === 1 ? (
                                            <Trophy size={18} className="text-yellow-500 mx-auto" />
                                        ) : entry.rank <= 3 ? (
                                            <Trophy size={18} className="text-gray-400 mx-auto" />
                                        ) : (
                                            <span className="text-muted-foreground font-mono">#{entry.rank}</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 font-medium text-foreground">
                                        {entry.username}
                                    </td>
                                    <td className="py-4 px-6 text-right text-foreground font-mono">
                                        {view === "global" ? entry.totalScore.toLocaleString() : entry.score}
                                    </td>
                                    <td className="py-4 px-6 text-right text-muted-foreground font-mono flex items-center justify-end gap-2">
                                        {view === "global" ? (
                                            <>
                                                <TrendingUp size={14} className="text-green-500" />
                                                {entry.avgSharpe}
                                            </>
                                        ) : (
                                            <>
                                                <Clock size={14} />
                                                {entry.time}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
