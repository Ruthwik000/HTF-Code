import Link from "next/link";
import { Clock } from "lucide-react";
import TopicTag from "./TopicTag";

export default function BlogCard({ blog }) {
    return (
        <Link href={`/blogs/${blog.slug}`} className="group block h-full">
            <div className="h-full bg-card border border-border rounded-xl -p-6 flex flex-col hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 overflow-hidden">
                <div className="p-6 flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {blog.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                        {blog.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {blog.tags.map(t => <TopicTag key={t} topic={t} />)}
                    </div>
                </div>
                <div className="bg-muted/30 px-6 py-3 border-t border-border flex justify-between items-center">
                    <span className="text-xs font-medium text-muted-foreground">By {blog.author}</span>
                    <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">Read Article &rarr;</span>
                </div>
            </div>
        </Link>
    );
}
