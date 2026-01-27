"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { generateRoomCode } from "@/lib/ably";
import { Users, Plus, LogIn, Trophy } from "lucide-react";
import Link from "next/link";

export default function ContestPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateRoom = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    const code = generateRoomCode();
    router.push(`/contest/room/${code}?host=true`);
  };

  const handleJoinRoom = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (roomCode.trim()) {
      router.push(`/contest/room/${roomCode.toUpperCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Trophy size={16} />
            <span>Multiplayer Contest</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Compete with Friends
          </h1>
          <p className="text-xl text-muted-foreground">
            Create a room, invite friends, and solve problems together in real-time
          </p>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Create Room */}
          <div className="bg-card rounded-xl border border-border p-8 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Plus className="text-primary" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Create Room</h2>
            <p className="text-muted-foreground mb-6">
              Start a new contest room and invite your friends to join
            </p>
            <button
              onClick={handleCreateRoom}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Create New Room
            </button>
          </div>

          {/* Join Room */}
          <div className="bg-card rounded-xl border border-border p-8 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
              <LogIn className="text-blue-400" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Join Room</h2>
            <p className="text-muted-foreground mb-6">
              Enter a room code to join an existing contest
            </p>
            <div className="space-y-3">
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="Enter room code"
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-foreground font-mono text-center text-lg"
                maxLength={6}
              />
              <button
                onClick={handleJoinRoom}
                disabled={!roomCode.trim()}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Join Room
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-card rounded-xl border border-border p-8">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Users size={20} className="text-primary" />
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureItem
              number="1"
              title="Create or Join"
              description="Host creates a room and shares the code with friends"
            />
            <FeatureItem
              number="2"
              title="Select Topics"
              description="Choose problem topics and difficulty for the contest"
            />
            <FeatureItem
              number="3"
              title="Compete"
              description="Solve problems in real-time and see live leaderboard"
            />
          </div>
        </div>

        {/* Back to Dashboard */}
        {user && (
          <div className="text-center mt-8">
            <Link
              href="/dashboard"
              className="text-primary hover:underline"
            >
              ← Back to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function FeatureItem({ number, title, description }) {
  return (
    <div className="text-center">
      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mx-auto mb-3">
        {number}
      </div>
      <h4 className="font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
