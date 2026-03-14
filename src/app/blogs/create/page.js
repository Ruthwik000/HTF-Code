"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Upload, Type, Hash, Link as LinkIcon } from "lucide-react";
import { problems } from "@/data/problems";
import { generatedProblems } from "@/data/generated100Problems";
import { createBlogPost } from "@/lib/blogService";

const allProblems = [...problems, ...generatedProblems];

export default function CreateBlogPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        tags: "",
        linkedProblemId: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            const slug = await createBlogPost(formData, user);
            router.push(`/blogs/${slug}`);
        } catch (submitError) {
            console.error("Error publishing blog:", submitError);
            setError(submitError.message || "Failed to publish article.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
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
                        {allProblems.map(p => (
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

                {error && (
                    <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                        {error}
                    </div>
                )}

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
