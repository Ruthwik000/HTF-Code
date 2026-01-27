"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getAblyClient } from "@/lib/ably";
import { problems } from "@/data/problems";
import { Users, Copy, Check, Play, Trophy, Clock, Settings } from "lucide-react";

export default function ContestRoomPage() {
  const { code } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const isHost = searchParams.get("host") === "true";

  const [channel, setChannel] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [roomSettings, setRoomSettings] = useState({
    topics: [],
    difficulty: "Medium",
    problemCount: 3,
    timeLimit: 60
  });
  const [contestStarted, setContestStarted] = useState(false);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(isHost);

  // HFT-specific topics
  const availableTopics = [
    "Order Book",
    "Arbitrage",
    "Probability Statistics",
    "Z Score",
    "Fast Queue",
    "Low Latency Datastructures",
    "Market Microstructure",
    "Game Theory"
  ];

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const ably = getAblyClient();
    const roomChannel = ably.channels.get(`contest-${code}`);

    // Join room
    roomChannel.presence.enter({
      userId: user.uid,
      displayName: user.displayName || user.email,
      photoURL: user.photoURL,
      isHost
    });

    // Listen for presence updates
    roomChannel.presence.subscribe((presenceMsg) => {
      roomChannel.presence.get((err, members) => {
        if (!err) {
          setParticipants(members.map(m => m.data));
        }
      });
    });

    // Listen for room settings updates
    roomChannel.subscribe("settings-update", (message) => {
      setRoomSettings(message.data);
    });

    // Listen for contest start
    roomChannel.subscribe("contest-start", (message) => {
      setContestStarted(true);
      setSelectedProblems(message.data.problems);
    });

    setChannel(roomChannel);

    return () => {
      roomChannel.presence.leave();
      roomChannel.unsubscribe();
    };
  }, [code, user, router, isHost]);

  const copyRoomCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTopicToggle = (topic) => {
    setRoomSettings(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
  };

  const updateSettings = () => {
    if (channel && isHost) {
      channel.publish("settings-update", roomSettings);
    }
  };

  const startContest = () => {
    if (!isHost || roomSettings.topics.length === 0) return;

    // Filter problems by selected topics and difficulty
    // Match if problem has ANY of the selected topics
    const filteredProblems = problems.filter(p => {
      const matchesDifficulty = p.difficulty === roomSettings.difficulty;
      const matchesTopic = p.topics.some(pTopic => 
        roomSettings.topics.some(selectedTopic => 
          pTopic.toLowerCase().includes(selectedTopic.toLowerCase()) ||
          selectedTopic.toLowerCase().includes(pTopic.toLowerCase())
        )
      );
      return matchesDifficulty && matchesTopic;
    });

    // If no exact matches, get all problems of the selected difficulty
    const problemsToUse = filteredProblems.length > 0 
      ? filteredProblems 
      : problems.filter(p => p.difficulty === roomSettings.difficulty);

    // Randomly select problems
    const shuffled = problemsToUse.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(roomSettings.problemCount, shuffled.length));

    if (channel && selected.length > 0) {
      channel.publish("contest-start", { problems: selected });
      setContestStarted(true);
      setSelectedProblems(selected);
    }
  };

  if (contestStarted) {
    return (
      <ContestArena
        code={code}
        problems={selectedProblems}
        participants={participants}
        timeLimit={roomSettings.timeLimit}
        channel={channel}
        user={user}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Contest Room</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="text-sm text-muted-foreground">Room Code:</span>
                  <span className="text-lg font-mono font-bold text-primary">{code}</span>
                </div>
                <button
                  onClick={copyRoomCode}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  title="Copy room code"
                >
                  {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                </button>
              </div>
            </div>
            {isHost && (
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
              >
                <Settings size={18} />
                Settings
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Settings Panel */}
          {showSettings && (
            <div className="lg:col-span-2 bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Contest Settings</h2>

              {/* Topics */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Select Topics ({roomSettings.topics.length} selected)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTopics.map(topic => (
                    <button
                      key={topic}
                      onClick={() => isHost && handleTopicToggle(topic)}
                      disabled={!isHost}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        roomSettings.topics.includes(topic)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      } ${!isHost && "cursor-not-allowed opacity-50"}`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">Difficulty</label>
                <div className="flex gap-3">
                  {["Easy", "Medium", "Hard"].map(diff => (
                    <button
                      key={diff}
                      onClick={() => isHost && setRoomSettings(prev => ({ ...prev, difficulty: diff }))}
                      disabled={!isHost}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                        roomSettings.difficulty === diff
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      } ${!isHost && "cursor-not-allowed opacity-50"}`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Problem Count */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Number of Problems: {roomSettings.problemCount}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={roomSettings.problemCount}
                  onChange={(e) => isHost && setRoomSettings(prev => ({ ...prev, problemCount: parseInt(e.target.value) }))}
                  disabled={!isHost}
                  className="w-full"
                />
              </div>

              {/* Time Limit */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Time Limit: {roomSettings.timeLimit} minutes
                </label>
                <input
                  type="range"
                  min="15"
                  max="120"
                  step="15"
                  value={roomSettings.timeLimit}
                  onChange={(e) => isHost && setRoomSettings(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
                  disabled={!isHost}
                  className="w-full"
                />
              </div>

              {isHost && (
                <div className="flex gap-3">
                  <button
                    onClick={updateSettings}
                    className="flex-1 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-colors"
                  >
                    Update Settings
                  </button>
                  <button
                    onClick={startContest}
                    disabled={roomSettings.topics.length === 0}
                    className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Play size={18} />
                    Start Contest
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Participants Panel */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Users size={20} />
              Participants ({participants.length})
            </h2>
            <div className="space-y-3">
              {participants.map((participant, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                >
                  {participant.photoURL ? (
                    <img
                      src={participant.photoURL}
                      alt={participant.displayName}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                      {participant.displayName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{participant.displayName}</p>
                    {participant.isHost && (
                      <span className="text-xs text-primary">Host</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {!isHost && (
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-blue-400 text-center">
                  Waiting for host to start the contest...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Contest Arena Component (simplified for now)
function ContestArena({ code, problems, participants, timeLimit, channel, user }) {
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Contest Header */}
        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Contest in Progress</h1>
              <p className="text-muted-foreground">Room: {code}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                <Clock size={20} className="text-primary" />
                <span className="text-xl font-mono font-bold text-primary">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                <Trophy size={20} className="text-yellow-400" />
                <span className="font-semibold">{currentProblemIndex + 1}/{problems.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Problem List */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Problems</h2>
          <div className="space-y-3">
            {problems.map((problem, index) => (
              <button
                key={problem.id}
                onClick={() => router.push(`/problems/${problem.slug}?contest=${code}`)}
                className="w-full text-left p-4 bg-muted/30 hover:bg-muted/50 rounded-lg border border-border transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{index + 1}. {problem.title}</h3>
                    <div className="flex gap-2 mt-2">
                      {problem.topics.slice(0, 3).map(topic => (
                        <span key={topic} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    problem.difficulty === "Easy" ? "bg-green-500/10 text-green-400" :
                    problem.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-400" :
                    "bg-red-500/10 text-red-400"
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
