"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Code2, TrendingUp, Award, CheckCircle, XCircle } from "lucide-react";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { problems } from "@/data/problems";
import { db } from "@/lib/firebase";
import { getUserRank } from "@/lib/leaderboardService";
import DifficultyBadge from "@/components/DifficultyBadge";

const problemMap = problems.reduce((acc, problem) => {
  acc[String(problem.id)] = {
    title: problem.title,
  };
  return acc;
}, {});

function toDate(value) {
  if (!value) return null;

  if (typeof value?.toDate === "function") {
    return value.toDate();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatRelativeTime(value) {
  const date = toDate(value);
  if (!date) return "Unknown time";

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

function getDayKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function calculateDayStreak(submissions) {
  const activeDays = new Set();

  submissions.forEach((submission) => {
    const date = toDate(submission.submittedAt);
    if (date) {
      activeDays.add(getDayKey(date));
    }
  });

  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  while (activeDays.has(getDayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [statsLoading, setStatsLoading] = useState(true);
  const [stats, setStats] = useState({
    solved: 0,
    attempted: 0,
    streak: 0,
    rank: null
  });
  const [recentSubmissions, setRecentSubmissions] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const loadDashboardData = async () => {
      setStatsLoading(true);

      try {
        const userProblemsQuery = query(
          collection(db, "userProblems"),
          where("userId", "==", user.uid)
        );

        const getSubmissionsSnapshot = async () => {
          try {
            const submissionsQuery = query(
              collection(db, "submissions"),
              where("userId", "==", user.uid),
              orderBy("submittedAt", "desc"),
              limit(200)
            );
            return await getDocs(submissionsQuery);
          } catch (error) {
            // Fallback while composite index is still building
            if (error?.code === "failed-precondition" || String(error?.message || "").includes("index")) {
              console.warn("Dashboard submissions index not ready, using fallback query.");
              const fallbackQuery = query(
                collection(db, "submissions"),
                where("userId", "==", user.uid),
                limit(200)
              );
              return await getDocs(fallbackQuery);
            }
            throw error;
          }
        };

        const [userProblemsSnapshot, submissionsSnapshot, rankData] = await Promise.all([
          getDocs(userProblemsQuery),
          getSubmissionsSnapshot(),
          getUserRank(user.uid).catch(() => null)
        ]);

        const userProblems = userProblemsSnapshot.docs.map((doc) => doc.data());
        const submissions = submissionsSnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => {
            const dateA = toDate(a.submittedAt)?.getTime() || 0;
            const dateB = toDate(b.submittedAt)?.getTime() || 0;
            return dateB - dateA;
          });

        const solved = userProblems.filter((problem) => problem.status === "Solved").length;
        const attemptedFromProblems = userProblems.length;
        const attemptedFromSubmissions = new Set(submissions.map((submission) => String(submission.problemId))).size;
        const attempted = Math.max(attemptedFromProblems, attemptedFromSubmissions);
        const streak = calculateDayStreak(submissions);

        setStats({
          solved,
          attempted,
          streak,
          rank: rankData?.rank ?? null
        });

        const recent = submissions.slice(0, 3).map((submission) => {
          const mappedProblem = problemMap[String(submission.problemId)];
          return {
            id: submission.id,
            problem: mappedProblem?.title || `Problem ${submission.problemId}`,
            status: submission.status,
            time: formatRelativeTime(submission.submittedAt)
          };
        });

        setRecentSubmissions(recent);
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      } finally {
        setStatsLoading(false);
      }
    };

    loadDashboardData();
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const recentProblems = problems.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex items-center gap-4">
          {user.photoURL && (
            <img 
              src={user.photoURL} 
              alt={user.displayName || user.email}
              className="w-16 h-16 rounded-full border-2 border-primary"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {user.displayName || user.email}!
            </h1>
            <p className="text-muted-foreground">
              Continue your coding journey and improve your skills
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<CheckCircle className="text-green-400" size={24} />}
            label="Problems Solved"
            value={statsLoading ? "..." : stats.solved}
            color="green"
          />
          <StatCard
            icon={<Code2 className="text-blue-400" size={24} />}
            label="Problems Attempted"
            value={statsLoading ? "..." : stats.attempted}
            color="blue"
          />
          <StatCard
            icon={<TrendingUp className="text-orange-400" size={24} />}
            label="Day Streak"
            value={statsLoading ? "..." : stats.streak}
            color="orange"
          />
          <StatCard
            icon={<Award className="text-purple-400" size={24} />}
            label="Global Rank"
            value={statsLoading ? "..." : stats.rank ? `#${stats.rank}` : "Unranked"}
            color="purple"
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Continue Coding */}
          <div className="lg:col-span-2 bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Continue Coding</h2>
              <Link
                href="/problems"
                className="text-sm text-primary hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="space-y-3">
              {recentProblems.map((problem) => (
                <Link
                  key={problem.id}
                  href={`/problems/${problem.slug}`}
                  className="block p-4 bg-muted/30 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-foreground">{problem.title}</h3>
                    <DifficultyBadge difficulty={problem.difficulty} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {problem.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Submissions */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Recent Submissions
            </h2>

            <div className="space-y-4">
              {recentSubmissions.length > 0 ? (
                recentSubmissions.map((submission) => (
                  <SubmissionItem
                    key={submission.id}
                    problem={submission.problem}
                    status={submission.status}
                    time={submission.time}
                  />
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No submissions yet.</p>
              )}
            </div>

            <Link
              href="/submissions"
              className="block mt-6 text-center text-sm text-primary hover:underline"
            >
              View all submissions
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <QuickActionCard
            title="Practice Problems"
            description="Solve coding challenges"
            href="/problems"
            color="blue"
          />
          <QuickActionCard
            title="Multiplayer Contest"
            description="Compete with friends"
            href="/contest"
            color="purple"
          />
          <QuickActionCard
            title="Leaderboard"
            description="See your ranking"
            href="/leaderboard"
            color="green"
          />
          <QuickActionCard
            title="Discussions"
            description="Join the community"
            href="/blogs"
            color="orange"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  const colorClasses = {
    green: "bg-green-500/10 border-green-500/20",
    blue: "bg-blue-500/10 border-blue-500/20",
    orange: "bg-orange-500/10 border-orange-500/20",
    purple: "bg-purple-500/10 border-purple-500/20"
  };

  return (
    <div className={`p-6 rounded-lg border ${colorClasses[color]}`}>
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="text-3xl font-bold text-foreground">{value}</div>
    </div>
  );
}

function SubmissionItem({ problem, status, time }) {
  const normalizedStatus = String(status || "").toLowerCase();
  const isAccepted = normalizedStatus === "accepted";

  return (
    <div className="flex items-start gap-3">
      {isAccepted ? (
        <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={16} />
      ) : (
        <XCircle className="text-red-400 flex-shrink-0 mt-1" size={16} />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{problem}</p>
        <div className="flex items-center gap-2 mt-1">
          <span
            className={`text-xs ${
              isAccepted ? "text-green-400" : "text-red-400"
            }`}
          >
            {isAccepted ? "Accepted" : "Wrong Answer"}
          </span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ title, description, href, color }) {
  const colorClasses = {
    blue: "hover:border-blue-500/50",
    green: "hover:border-green-500/50",
    purple: "hover:border-purple-500/50",
    orange: "hover:border-orange-500/50"
  };

  return (
    <Link
      href={href}
      className={`block p-6 bg-card rounded-lg border border-border ${colorClasses[color]} transition-colors`}
    >
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
