"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Calendar, Clock, Loader2 } from "lucide-react";
import { getBlogBySlug } from "@/lib/blogService";
import TopicTag from "@/components/TopicTag";

export default function BlogDetailPage() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadBlog = async () => {
            setLoading(true);
            setError("");
            try {
                const blogData = await getBlogBySlug(slug);
                setBlog(blogData);
            } catch (loadError) {
                console.error("Error loading blog:", loadError);
                setError("Failed to load blog.");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            loadBlog();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20 max-w-3xl">
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="animate-spin text-primary" size={32} />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-20 max-w-3xl">
                <p className="text-center text-red-400">{error}</p>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="container mx-auto px-4 py-20 max-w-3xl text-center">
                <p className="text-muted-foreground mb-4">Blog not found.</p>
                <Link href="/blogs" className="text-primary hover:underline">Back to Blogs</Link>
            </div>
        );
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
