"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getAblyClient } from "@/lib/ably";
import { problems } from "@/data/problems";
import { generatedProblems } from "@/data/generated100Problems";
import { 
  createContestRoom, 
  joinContestRoom, 
  startContest as saveContestStart,
  recordContestSubmission,
  completeContest,
  calculateContestLeaderboard
} from "@/lib/contestService";
import ContestChat from "@/components/ContestChat";
import { Users, Copy, Check, Play, Trophy, Clock, Settings, RefreshCw, DollarSign, Zap } from "lucide-react";

// Combine all problems
const allProblems = [...problems, ...generatedProblems];

export default function ContestRoomPage() {
  const { code } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const isHost = searchParams.get("host") === "true";

  const channelRef = useRef(null);
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
  const [isRefreshing, setIsRefreshing] = useState(false);

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

    // Check if contest was already started (from session storage)
    const savedContestState = sessionStorage.getItem(`contest-${code}-state`);
    if (savedContestState) {
      const { started, problems } = JSON.parse(savedContestState);
      if (started && problems) {
        setContestStarted(true);
        setSelectedProblems(problems);
      }
    }

    const ably = getAblyClient();
    const roomChannel = ably.channels.get(`contest-${code}`);
    channelRef.current = roomChannel;

    // Join room
    roomChannel.presence.enter({
      userId: user.uid,
      displayName: user.displayName || user.email,
      photoURL: user.photoURL,
      isHost
    });

    // Get initial presence members
    roomChannel.presence.get((err, members) => {
      if (!err) {
        console.log('Initial participants:', members.length);
        setParticipants(members.map(m => m.data));
      }
    });

    // Listen for presence updates (enter, leave, update)
    roomChannel.presence.subscribe(['enter', 'leave', 'update'], () => {
      roomChannel.presence.get((err, members) => {
        if (!err) {
          console.log('Updated participants:', members.length);
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
      // Save to session storage
      sessionStorage.setItem(`contest-${code}-state`, JSON.stringify({
        started: true,
        problems: message.data.problems
      }));
    });

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

  const refreshParticipants = () => {
    if (channelRef.current) {
      setIsRefreshing(true);
      channelRef.current.presence.get((err, members) => {
        if (!err) {
          setParticipants(members.map(m => m.data));
        }
        setTimeout(() => setIsRefreshing(false), 500);
      });
    }
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
    if (channelRef.current && isHost) {
      channelRef.current.publish("settings-update", roomSettings);
    }
  };

  const startContest = async () => {
    if (!isHost || roomSettings.topics.length === 0) return;

    // Filter problems by selected topics and difficulty
    const filteredProblems = allProblems.filter(p => {
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
      : allProblems.filter(p => p.difficulty === roomSettings.difficulty);

    // Use a seeded random based on room code for consistent selection across clients
    const seed = code.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const seededRandom = (index) => {
      const x = Math.sin(seed + index) * 10000;
      return x - Math.floor(x);
    };
    
    // Shuffle with seeded random
    const shuffled = problemsToUse
      .map((problem, index) => ({ problem, sort: seededRandom(index) }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ problem }) => problem);
    
    const selected = shuffled.slice(0, Math.min(roomSettings.problemCount, shuffled.length));

    if (channelRef.current && selected.length > 0) {
      // Save to Firebase (optional - won't block if it fails)
      try {
        await saveContestStart(code, selected);
        console.log('✅ Contest saved to Firebase');
      } catch (error) {
        console.warn('⚠️ Could not save to Firebase, continuing with Ably only:', error.message);
      }
      
      // Save to session storage
      sessionStorage.setItem(`contest-${code}-state`, JSON.stringify({
        started: true,
        problems: selected
      }));
      
      // Broadcast via Ably (primary method) - send the actual selected problems
      channelRef.current.publish("contest-start", { problems: selected });
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Users size={20} />
                Participants ({participants.length})
              </h2>
              <button
                onClick={refreshParticipants}
                disabled={isRefreshing}
                className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
                title="Refresh participants"
              >
                <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />
              </button>
            </div>
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

// Contest Arena Component with real-time leaderboard and chat
function ContestArena({ code, problems, participants, timeLimit, user }) {
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60);
  const [showResults, setShowResults] = useState(false);
  const [submissionUpdates, setSubmissionUpdates] = useState({});
  const [submissions, setSubmissions] = useState({});
  const router = useRouter();
  const channelRef = useRef(null);

  // Calculate leaderboard with profit tracking
  const leaderboard = useMemo(() => {
    const board = participants.map(p => ({
      userId: p.userId,
      displayName: p.displayName,
      photoURL: p.photoURL,
      solved: 0,
      totalTime: 0,
      totalProfit: 0,
      avgRuntime: 0,
      problems: {}
    }));

    // Apply submission updates
    Object.entries(submissionUpdates).forEach(([key, data]) => {
      const [userId, problemId] = key.split('-');
      const { status, time, runtime, profit } = data;
      
      const entry = board.find(e => e.userId === userId);
      if (entry) {
        if (!entry.problems[problemId]?.solved && status === 'accepted') {
          entry.problems[problemId] = { solved: true, time, runtime, profit: profit || 0 };
          entry.solved += 1;
          entry.totalTime += time;
          entry.totalProfit += profit || 0;
          entry.avgRuntime += runtime || 0;
        } else if (!entry.problems[problemId]) {
          entry.problems[problemId] = { solved: false, attempts: 1 };
        }
      }
    });

    // Calculate average runtime
    board.forEach(entry => {
      if (entry.solved > 0) {
        entry.avgRuntime = Math.round(entry.avgRuntime / entry.solved);
      }
    });

    // Sort by: problems solved (desc) → total profit (desc) → total time (asc) → avg runtime (asc)
    return board.sort((a, b) => {
      if (b.solved !== a.solved) return b.solved - a.solved;
      if (Math.abs(b.totalProfit - a.totalProfit) > 0.01) return b.totalProfit - a.totalProfit;
      if (a.totalTime !== b.totalTime) return a.totalTime - b.totalTime;
      return a.avgRuntime - b.avgRuntime;
    });
  }, [participants, submissionUpdates]);

  useEffect(() => {
    // Connect to Ably for real-time updates
    const ably = getAblyClient();
    const contestChannel = ably.channels.get(`contest-${code}-live`);
    channelRef.current = contestChannel;

    // Listen for submissions
    contestChannel.subscribe("submission", (message) => {
      const { userId, problemId, status, time, runtime, profit } = message.data;
      
      setSubmissions(prev => ({
        ...prev,
        [`${userId}-${problemId}`]: { status, time, runtime, profit }
      }));

      // Update submission data for leaderboard
      setSubmissionUpdates(prev => ({
        ...prev,
        [`${userId}-${problemId}`]: { status, time, runtime, profit }
      }));
    });

    return () => {
      contestChannel.unsubscribe();
    };
  }, [code]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowResults(true);
          // Mark contest as completed
          completeContest(code).catch(console.error);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [code]);

  const handleSubmission = async (problemId, status, executionTime, language, tradingMetrics) => {
    const timeElapsed = (timeLimit * 60) - timeRemaining;
    const profit = tradingMetrics?.totalPnL || 0;
    
    // Save to Firebase (optional - won't block if it fails)
    try {
      await recordContestSubmission(code, user.uid, problemId, {
        status,
        runtime: executionTime,
        language,
        tradingMetrics
      });
      console.log('✅ Submission saved to Firebase');
    } catch (error) {
      console.warn('⚠️ Could not save to Firebase, continuing with Ably only:', error.message);
    }
    
    // Broadcast via Ably (primary method)
    if (channelRef.current) {
      channelRef.current.publish("submission", {
        userId: user.uid,
        problemId,
        status,
        time: timeElapsed,
        runtime: executionTime,
        profit,
        language
      });
    }
  };

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const isTimeRunningOut = timeRemaining < 300; // Last 5 minutes

  if (showResults) {
    return <ContestResults code={code} leaderboard={leaderboard} problems={problems} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Chat Component */}
      <ContestChat roomCode={code} user={user} ablyChannel={channelRef.current} />
      
      <div className="container mx-auto px-4 py-6">
        {/* Contest Header with Timer */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground mb-1">Contest in Progress</h1>
              <p className="text-sm text-muted-foreground">Room: {code}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isTimeRunningOut ? 'bg-red-500/10 border border-red-500/20' : 'bg-primary/10'
              }`}>
                <Clock size={20} className={isTimeRunningOut ? 'text-red-400' : 'text-primary'} />
                <span className={`text-2xl font-mono font-bold ${
                  isTimeRunningOut ? 'text-red-400' : 'text-primary'
                }`}>
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Problems List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Trophy size={20} className="text-yellow-400" />
                Problems ({problems.length})
              </h2>
              <div className="space-y-3">
                {problems.map((problem, index) => {
                  const userSubmission = submissions[`${user.uid}-${problem.id}`];
                  
                  return (
                    <button
                      key={problem.id}
                      onClick={() => router.push(`/problems/${problem.slug}?contest=${code}`)}
                      className="w-full text-left p-4 bg-muted/30 hover:bg-muted/50 rounded-lg border border-border transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-lg font-bold text-foreground">{index + 1}.</span>
                            <h3 className="font-semibold text-foreground">{problem.title}</h3>
                            {userSubmission?.status === 'accepted' && (
                              <div className="flex items-center gap-2">
                                <Check className="text-green-400" size={20} />
                                {userSubmission.profit > 0 && (
                                  <span className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded flex items-center gap-1">
                                    <DollarSign size={12} />
                                    {userSubmission.profit.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 ml-7">
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
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live Leaderboard */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Trophy size={20} className="text-yellow-400" />
                Live Leaderboard
              </h2>
              <div className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <div
                    key={entry.userId}
                    className={`p-3 rounded-lg border ${
                      index === 0 ? 'bg-yellow-500/10 border-yellow-500/20' :
                      index === 1 ? 'bg-gray-400/10 border-gray-400/20' :
                      index === 2 ? 'bg-orange-500/10 border-orange-500/20' :
                      'bg-muted/30 border-border'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-yellow-500 text-black' :
                        index === 1 ? 'bg-gray-400 text-black' :
                        index === 2 ? 'bg-orange-500 text-black' :
                        'bg-muted text-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      {entry.photoURL ? (
                        <img
                          src={entry.photoURL}
                          alt={entry.displayName}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                          {entry.displayName?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate text-sm">
                          {entry.displayName}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{entry.solved}/{problems.length} solved</span>
                          {entry.totalProfit > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-green-400 flex items-center gap-0.5">
                                <DollarSign size={10} />
                                {entry.totalProfit.toFixed(0)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Contest Results Component
function ContestResults({ code, leaderboard, problems }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-4">
            <Trophy size={16} />
            <span>Contest Completed</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Final Results
          </h1>
          <p className="text-xl text-muted-foreground">
            Room: {code}
          </p>
        </div>

        {/* Podium */}
        {leaderboard.length >= 3 && (
          <div className="flex items-end justify-center gap-4 mb-12">
            {/* 2nd Place */}
            <PodiumCard rank={2} entry={leaderboard[1]} problems={problems} />
            {/* 1st Place */}
            <PodiumCard rank={1} entry={leaderboard[0]} problems={problems} />
            {/* 3rd Place */}
            <PodiumCard rank={3} entry={leaderboard[2]} problems={problems} />
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Final Standings</h2>
          <div className="space-y-3">
            {leaderboard.map((entry, index) => (
              <div
                key={entry.userId}
                className="p-4 bg-muted/30 rounded-lg border border-border"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      #{index + 1}
                    </div>
                    {entry.photoURL ? (
                      <img
                        src={entry.photoURL}
                        alt={entry.displayName}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                        {entry.displayName?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-foreground">{entry.displayName}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{entry.solved} problems solved</span>
                        {entry.totalProfit > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-green-400 flex items-center gap-1">
                              <DollarSign size={14} />
                              {entry.totalProfit.toFixed(2)} profit
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">
                      {entry.solved} / {problems.length}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {Math.floor(entry.totalTime / 60)}m {entry.totalTime % 60}s
                    </p>
                    {entry.avgRuntime > 0 && (
                      <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                        <Zap size={12} />
                        {entry.avgRuntime}ms avg
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push("/contest")}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            New Contest
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

function PodiumCard({ rank, entry, problems }) {
  const heights = { 1: 'h-48', 2: 'h-40', 3: 'h-32' };
  const colors = {
    1: 'bg-yellow-500/20 border-yellow-500/50',
    2: 'bg-gray-400/20 border-gray-400/50',
    3: 'bg-orange-500/20 border-orange-500/50'
  };
  const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };

  return (
    <div className={`${heights[rank]} w-32 ${colors[rank]} border-2 rounded-t-lg flex flex-col items-center justify-end p-4`}>
      <div className="text-4xl mb-2">{medals[rank]}</div>
      {entry.photoURL ? (
        <img
          src={entry.photoURL}
          alt={entry.displayName}
          className="w-12 h-12 rounded-full mb-2"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold mb-2">
          {entry.displayName?.charAt(0).toUpperCase()}
        </div>
      )}
      <p className="font-semibold text-foreground text-sm text-center truncate w-full">
        {entry.displayName}
      </p>
      <p className="text-xs text-muted-foreground">
        {entry.solved}/{problems.length}
      </p>
      {entry.totalProfit > 0 && (
        <p className="text-xs text-green-400 flex items-center gap-0.5">
          <DollarSign size={10} />
          {entry.totalProfit.toFixed(0)}
        </p>
      )}
    </div>
  );
}
