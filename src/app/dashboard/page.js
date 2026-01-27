"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Code2, TrendingUp, Award, Clock, CheckCircle, XCircle } from "lucide-react";
import { problems } from "@/data/problems";
import DifficultyBadge from "@/components/DifficultyBadge";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Mock user stats - in production, fetch from Firestore
  const stats = {
    solved: 12,
    attempted: 25,
    streak: 5,
    rank: 1234
  };

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
            value={stats.solved}
            color="green"
          />
          <StatCard
            icon={<Code2 className="text-blue-400" size={24} />}
            label="Problems Attempted"
            value={stats.attempted}
            color="blue"
          />
          <StatCard
            icon={<TrendingUp className="text-orange-400" size={24} />}
            label="Day Streak"
            value={stats.streak}
            color="orange"
          />
          <StatCard
            icon={<Award className="text-purple-400" size={24} />}
            label="Global Rank"
            value={`#${stats.rank}`}
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
              <SubmissionItem
                problem="Order Book Implementation"
                status="accepted"
                time="2 hours ago"
              />
              <SubmissionItem
                problem="VWAP Calculation"
                status="wrong"
                time="5 hours ago"
              />
              <SubmissionItem
                problem="Market Making Strategy"
                status="accepted"
                time="1 day ago"
              />
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
  const isAccepted = status === "accepted";

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
