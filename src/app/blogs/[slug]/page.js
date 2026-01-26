"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Calendar, Clock } from "lucide-react";
import { blogs } from "@/data/blogs";
import TopicTag from "@/components/TopicTag";

export default function BlogDetailPage() {
    const { slug } = useParams();
    const blog = blogs.find(b => b.slug === slug);

    if (!blog) {
        return <div className="p-20 text-center">Blog not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <Link href="/blogs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
                <ArrowLeft size={16} /> Back to Blogs
            </Link>

            <article>
                <header className="mb-8 border-b border-border pb-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map(t => <TopicTag key={t} topic={t} />)}
                    </div>

                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                        {blog.title}
                    </h1>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <User size={16} />
                            <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{blog.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>{blog.readTime}</span>
                        </div>
                    </div>
                </header>

                <div className="prose prose-invert max-w-none text-muted-foreground">
                    {/* Simple rendering for MVP - in real app use MDXRemote or react-markdown */}
                    <div className="whitespace-pre-wrap font-sans leading-relaxed">
                        {blog.content}
                    </div>
                </div>
            </article>
        </div>
    );
}
