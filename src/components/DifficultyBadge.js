import { clsx } from "clsx";

export default function DifficultyBadge({ difficulty }) {
    const colors = {
        Easy: "text-green-400 bg-green-400/10 border-green-400/20",
        Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
        Hard: "text-red-400 bg-red-400/10 border-red-400/20",
    };

    return (
        <span
            className={clsx(
                "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                colors[difficulty] || "text-gray-400 bg-gray-400/10 border-gray-400/20"
            )}
        >
            {difficulty}
        </span>
    );
}
