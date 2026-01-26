import Link from "next/link";
import { CheckCircle2, Circle, Clock, XCircle } from "lucide-react";
import DifficultyBadge from "./DifficultyBadge";
import TopicTag from "./TopicTag";

const StatusIcon = ({ status }) => {
    switch (status) {
        case "Solved":
            return <CheckCircle2 size={18} className="text-green-500" />;
        case "Attempted":
            return <XCircle size={18} className="text-red-500" />;
        case "Partially Accepted":
            return <Clock size={18} className="text-yellow-500" />;
        default:
            return <Circle size={18} className="text-zinc-600" />;
    }
};

export default function ProblemTable({ problems }) {
    if (problems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
                <p>No problems found matching your filters.</p>
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="border-b border-border text-muted-foreground text-xs uppercase tracking-wider">
                    <tr>
                        <th className="py-4 px-4 font-medium w-12">Status</th>
                        <th className="py-4 px-4 font-medium">Title</th>
                        <th className="py-4 px-4 font-medium w-32">Difficulty</th>
                        <th className="py-4 px-4 font-medium w-24">Acceptance</th>
                        <th className="py-4 px-4 font-medium w-24">Score</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {problems.map((problem) => (
                        <tr key={problem.id} className="group hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4">
                                <StatusIcon status={problem.status} />
                            </td>
                            <td className="py-4 px-4">
                                <Link href={`/problems/${problem.slug}`} className="font-medium text-foreground hover:text-primary transition-colors block">
                                    {problem.title}
                                </Link>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {problem.topics.map(t => (
                                        <TopicTag key={t} topic={t} />
                                    ))}
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                <DifficultyBadge difficulty={problem.difficulty} />
                            </td>
                            <td className="py-4 px-4 text-sm text-muted-foreground">
                                {problem.acceptance}
                            </td>
                            <td className="py-4 px-4 text-sm font-mono text-muted-foreground">
                                {problem.score ? problem.score : "—"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
