"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Type, Hash, Link as LinkIcon } from "lucide-react";
import { problems } from "@/data/problems";

export default function CreateBlogPage() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        tags: "",
        linkedProblemId: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Mock API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
        }, 1500);
    };

    if (success) {
        return (
            <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Upload size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-4">Article Published!</h2>
                <p className="text-muted-foreground mb-8">
                    Your insight has been successfully posted to the community board.
                    <br />
                    (This is a frontend demo - data was not actually saved)
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/blogs" className="px-6 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors">
                        Back to Blogs
                    </Link>
                    <button onClick={() => setSuccess(false)} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                        Write Another
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link href="/blogs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
                <ArrowLeft size={16} /> Cancel & Back
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Write an Article</h1>
                <p className="text-muted-foreground">Share your optimal solutions, strategy breakdowns, or findings.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Type size={14} className="text-muted-foreground" /> Title
                    </label>
                    <input
                        required
                        type="text"
                        placeholder="e.g., Optimizing Order Book Latency with C++"
                        className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                {/* Link Problem */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <LinkIcon size={14} className="text-muted-foreground" /> Link Problem (Optional)
                    </label>
                    <select
                        className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-all appearance-none"
                        value={formData.linkedProblemId}
                        onChange={e => setFormData({ ...formData, linkedProblemId: e.target.value })}
                    >
                        <option value="">-- Content is general / not linked --</option>
                        {problems.map(p => (
                            <option key={p.id} value={p.id}>{p.title} ({p.difficulty})</option>
                        ))}
                    </select>
                    <p className="text-xs text-muted-foreground">Select a problem if this article provides a solution or editorial.</p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Short Description</label>
                    <input
                        required
                        type="text"
                        placeholder="A brief summary for the card preview..."
                        className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-all"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Hash size={14} className="text-muted-foreground" /> Tags
                    </label>
                    <input
                        type="text"
                        placeholder="Comma separated: c++, optimization, arbitrage"
                        className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-all"
                        value={formData.tags}
                        onChange={e => setFormData({ ...formData, tags: e.target.value })}
                    />
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Content (Markdown)</label>
                    <textarea
                        required
                        placeholder="# Introduction&#10;Write your article here..."
                        className="w-full h-96 bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-all font-mono text-sm leading-relaxed resize-y"
                        value={formData.content}
                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                    />
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>Publishing...</>
                        ) : (
                            <>Publish Article <Upload size={18} /></>
                        )}
                    </button>
                </div>

            </form>
        </div>
    );
}
