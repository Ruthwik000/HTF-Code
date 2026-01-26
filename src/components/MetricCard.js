export default function MetricCard({ label, value, subValue, trend }) {
    // Mock logic for status color
    const isPositive = typeof value === 'string' && !value.startsWith('-');
    // If value is number, assume positive is green

    return (
        <div className="bg-muted/50 p-4 rounded-lg border border-border">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">{label}</div>
            <div className="text-xl font-bold text-foreground">{value}</div>
            {subValue && <div className="text-xs text-muted-foreground mt-1">{subValue}</div>}
        </div>
    );
}
