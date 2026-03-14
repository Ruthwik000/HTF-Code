"use client";

import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import { Loader2, PenTool } from "lucide-react";
import { getPublishedBlogs } from "@/lib/blogService";

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadBlogs = async () => {
            setLoading(true);
            setError("");
            try {
                const blogData = await getPublishedBlogs(100);
                setBlogs(blogData);
            } catch (loadError) {
                console.error("Error loading blogs:", loadError);
                setError("Failed to load blogs.");
            } finally {
                setLoading(false);
            }
        };

        loadBlogs();
    }, []);

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="flex flex-col items-center justify-center text-center mb-12">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Quant & HFT Insights</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                    Deep dives into market microstructure, algorithmic execution, and strategy design.
                </p>
                <Link href="/blogs/create" className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-full hover:bg-primary/20 transition-all font-medium">
                    <PenTool size={16} /> Write an Article
                </Link>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="animate-spin text-primary" size={32} />
                </div>
            ) : error ? (
                <div className="text-center py-16">
                    <p className="text-red-400">{error}</p>
                </div>
            ) : blogs.length === 0 ? (
                <div className="text-center py-16 bg-card border border-border rounded-xl">
                    <p className="text-muted-foreground mb-4">No blogs published yet.</p>
                    <Link
                        href="/blogs/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <PenTool size={14} /> Write the First Article
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map(blog => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
            )}
        </div>
    );
}
