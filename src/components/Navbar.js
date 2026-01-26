"use client";

import { useState } from 'react';
import Link from 'next/link';
import { User, Menu } from 'lucide-react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 glass flex items-center justify-between px-6 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="flex items-center gap-4 md:gap-8">
                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu size={24} />
                </button>

                <Link href="/" className="text-xl font-bold tracking-tight text-white select-none">
                    HFTCode
                </Link>

                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="/problems" className="hover:text-primary transition-colors hover:bg-white/5 py-2 px-3 rounded-md">
                        Problem Set
                    </Link>
                    <Link href="/leaderboard" className="hover:text-primary transition-colors hover:bg-white/5 py-2 px-3 rounded-md">
                        Leaderboard
                    </Link>
                    <Link href="/blogs" className="hover:text-primary transition-colors hover:bg-white/5 py-2 px-3 rounded-md">
                        Blogs
                    </Link>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Placeholder Avatar */}
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center border border-border cursor-pointer hover:bg-white/10 transition">
                    <User size={16} className="text-muted-foreground" />
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-background border-b border-border p-4 md:hidden flex flex-col gap-2 shadow-xl animate-fade-up">
                    <Link href="/problems" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 hover:bg-muted rounded-md text-sm font-medium">Problem Set</Link>
                    <Link href="/leaderboard" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 hover:bg-muted rounded-md text-sm font-medium">Leaderboard</Link>
                    <Link href="/blogs" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 hover:bg-muted rounded-md text-sm font-medium">Blogs</Link>
                </div>
            )}
        </nav>
    );
}
