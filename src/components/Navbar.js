"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { User, Menu, LogOut } from 'lucide-react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        setIsUserMenuOpen(false);
    };

    // Determine home link based on auth status
    const homeLink = user ? "/dashboard" : "/";

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

                <Link href={homeLink} className="text-xl font-bold tracking-tight text-white select-none">
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
                {user ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="h-8 w-8 rounded-full bg-primary flex items-center justify-center border border-primary cursor-pointer hover:bg-primary/80 transition overflow-hidden"
                        >
                            {user.photoURL ? (
                                <img 
                                    src={user.photoURL} 
                                    alt={user.displayName || user.email}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                <span className="text-primary-foreground font-semibold text-sm">
                                    {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </button>

                        {isUserMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 animate-fade-up">
                                <div className="px-4 py-2 border-b border-border">
                                    <p className="text-sm font-medium text-foreground truncate">
                                        {user.displayName || user.email}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {user.email}
                                    </p>
                                </div>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsUserMenuOpen(false)}
                                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-muted transition-colors flex items-center gap-2"
                                >
                                    <LogOut size={14} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link
                            href="/login"
                            className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/signup"
                            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
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
