"use client";

import { blogs } from "@/data/blogs";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import { PenTool } from "lucide-react";

export default function BlogsPage() {
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
}
