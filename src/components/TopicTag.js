export default function TopicTag({ topic }) {
    return (
        <span className="px-2 py-0.5 rounded text-xs text-muted-foreground bg-muted hover:bg-white/10 transition-colors whitespace-nowrap">
            {topic}
        </span>
    );
}
