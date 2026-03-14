"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { problems } from "@/data/problems";
import { generatedProblems } from "@/data/generated100Problems";
import { CheckCircle2, XCircle, Loader2, FileCode2 } from "lucide-react";

const allProblems = [...problems, ...generatedProblems];

const problemMap = allProblems.reduce((acc, problem) => {
  acc[String(problem.id)] = {
    title: problem.title,
    slug: problem.slug,
    difficulty: problem.difficulty,
  };
  return acc;
}, {});

function toDate(value) {
  if (!value) return null;
  if (typeof value?.toDate === "function") return value.toDate();

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(value) {
  const date = toDate(value);
  if (!date) return "Unknown";
  return date.toLocaleString();
}

function isAccepted(status) {
  return String(status || "").toLowerCase() === "accepted";
}

export default function SubmissionsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const loadSubmissions = async () => {
      setLoading(true);
      setError("");

      try {
        let snapshot;
        try {
          const indexedQuery = query(
            collection(db, "submissions"),
            where("userId", "==", user.uid),
            orderBy("submittedAt", "desc"),
            limit(200)
          );
          snapshot = await getDocs(indexedQuery);
        } catch (queryError) {
          if (queryError?.code === "failed-precondition" || String(queryError?.message || "").includes("index")) {
            // Fallback query while index is building.
            const fallbackQuery = query(
              collection(db, "submissions"),
              where("userId", "==", user.uid),
              limit(200)
            );
            snapshot = await getDocs(fallbackQuery);
          } else {
            throw queryError;
          }
        }

        const data = snapshot.docs
          .map((docSnap) => {
            const docData = docSnap.data();
            const mapped = problemMap[String(docData.problemId)];

            return {
              id: docSnap.id,
              problemId: String(docData.problemId || ""),
              title: mapped?.title || `Problem ${docData.problemId || "-"}`,
              slug: mapped?.slug || null,
              difficulty: mapped?.difficulty || "Unknown",
              status: docData.status || "Unknown",
              language: docData.language || "-",
              runtime: docData.runtime,
              score: docData.score,
              testCasesPassed: docData.testCasesPassed,
              totalTestCases: docData.totalTestCases,
              submittedAt: docData.submittedAt,
            };
          })
          .sort((a, b) => {
            const aTime = toDate(a.submittedAt)?.getTime() || 0;
            const bTime = toDate(b.submittedAt)?.getTime() || 0;
            return bTime - aTime;
          });

        setSubmissions(data);
      } catch (loadError) {
        console.error("Error loading submissions:", loadError);
        setError("Failed to load submissions.");
      } finally {
        setLoading(false);
      }
    };

    loadSubmissions();
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Your Submissions</h1>
        <p className="text-muted-foreground mt-1">Track your latest runs and outcomes</p>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : error ? (
          <div className="p-6 text-red-400">{error}</div>
        ) : submissions.length === 0 ? (
          <div className="py-16 text-center px-6">
            <FileCode2 className="mx-auto mb-4 text-muted-foreground" size={44} />
            <p className="text-muted-foreground mb-4">No submissions yet.</p>
            <Link
              href="/problems"
              className="inline-flex px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              Solve a Problem
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-muted/30 text-xs uppercase text-muted-foreground font-semibold">
                <tr>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Problem</th>
                  <th className="py-4 px-6 text-right">Score</th>
                  <th className="py-4 px-6 text-right">Runtime</th>
                  <th className="py-4 px-6 text-right">Tests</th>
                  <th className="py-4 px-6">Language</th>
                  <th className="py-4 px-6">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {submissions.map((submission) => {
                  const accepted = isAccepted(submission.status);
                  return (
                    <tr key={submission.id} className="hover:bg-muted/10 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {accepted ? (
                            <CheckCircle2 className="text-green-500" size={16} />
                          ) : (
                            <XCircle className="text-red-500" size={16} />
                          )}
                          <span className={accepted ? "text-green-400 text-sm" : "text-red-400 text-sm"}>
                            {accepted ? "Accepted" : "Wrong Answer"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {submission.slug ? (
                          <Link href={`/problems/${submission.slug}`} className="font-medium text-foreground hover:text-primary transition-colors">
                            {submission.title}
                          </Link>
                        ) : (
                          <span className="font-medium text-foreground">{submission.title}</span>
                        )}
                        <div className="text-xs text-muted-foreground mt-1">{submission.difficulty}</div>
                      </td>
                      <td className="py-4 px-6 text-right font-mono text-foreground">
                        {typeof submission.score === "number" ? submission.score.toFixed(1) : "-"}
                      </td>
                      <td className="py-4 px-6 text-right font-mono text-muted-foreground">
                        {typeof submission.runtime === "number" ? `${submission.runtime}ms` : "-"}
                      </td>
                      <td className="py-4 px-6 text-right text-muted-foreground font-mono">
                        {submission.testCasesPassed ?? "-"} / {submission.totalTestCases ?? "-"}
                      </td>
                      <td className="py-4 px-6 text-muted-foreground uppercase">
                        {submission.language}
                      </td>
                      <td className="py-4 px-6 text-muted-foreground whitespace-nowrap">
                        {formatDate(submission.submittedAt)}
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
