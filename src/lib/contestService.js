import { db } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
  query,
  where,
  getDocs
} from 'firebase/firestore';

/**
 * Create a new contest room
 */
export async function createContestRoom(roomCode, hostId, hostData, settings) {
  try {
    const contestRef = doc(db, 'contests', roomCode);
    
    await setDoc(contestRef, {
      roomCode,
      hostId,
      hostName: hostData.displayName || hostData.email,
      settings: settings || {
        topics: [],
        difficulty: 'Medium',
        problemCount: 3,
        timeLimit: 60
      },
      participants: [{
        userId: hostId,
        displayName: hostData.displayName || hostData.email,
        photoURL: hostData.photoURL || null,
        isHost: true,
        joinedAt: Timestamp.now()
      }],
      status: 'waiting', // waiting, active, completed
      problems: [],
      submissions: [],
      createdAt: Timestamp.now(),
      startedAt: null,
      completedAt: null
    });
    
    return roomCode;
  } catch (error) {
    console.error('Error creating contest room:', error);
    throw error;
  }
}

/**
 * Join a contest room
 */
export async function joinContestRoom(roomCode, userId, userData) {
  try {
    const contestRef = doc(db, 'contests', roomCode);
    const contestSnap = await getDoc(contestRef);
    
    if (!contestSnap.exists()) {
      throw new Error('Contest room not found');
    }
    
    const contestData = contestSnap.data();
    
    // Check if already joined
    const alreadyJoined = contestData.participants.some(p => p.userId === userId);
    if (alreadyJoined) {
      return contestData;
    }
    
    // Add participant
    await updateDoc(contestRef, {
      participants: arrayUnion({
        userId,
        displayName: userData.displayName || userData.email,
        photoURL: userData.photoURL || null,
        isHost: false,
        joinedAt: Timestamp.now()
      })
    });
    
    return { ...contestData, participants: [...contestData.participants, {
      userId,
      displayName: userData.displayName || userData.email,
      photoURL: userData.photoURL || null,
      isHost: false,
      joinedAt: Timestamp.now()
    }]};
  } catch (error) {
    console.error('Error joining contest room:', error);
    throw error;
  }
}

/**
 * Start a contest
 */
export async function startContest(roomCode, problems) {
  try {
    const contestRef = doc(db, 'contests', roomCode);
    
    // Check if contest exists, if not create it first
    const contestSnap = await getDoc(contestRef);
    
    if (!contestSnap.exists()) {
      // Create the contest document first
      await setDoc(contestRef, {
        roomCode,
        status: 'active',
        problems: problems.map(p => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          difficulty: p.difficulty,
          topics: p.topics
        })),
        startedAt: Timestamp.now(),
        participants: [],
        submissions: [],
        createdAt: Timestamp.now()
      });
    } else {
      // Update existing contest
      await updateDoc(contestRef, {
        status: 'active',
        problems: problems.map(p => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          difficulty: p.difficulty,
          topics: p.topics
        })),
        startedAt: Timestamp.now()
      });
    }
  } catch (error) {
    console.error('Error starting contest:', error);
    throw error;
  }
}

/**
 * Record a contest submission
 */
export async function recordContestSubmission(roomCode, userId, problemId, submissionData) {
  try {
    const contestRef = doc(db, 'contests', roomCode);
    const contestSnap = await getDoc(contestRef);
    
    if (!contestSnap.exists()) {
      throw new Error('Contest not found');
    }
    
    const contestData = contestSnap.data();
    const startTime = contestData.startedAt?.toMillis() || Date.now();
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000); // seconds
    
    const submission = {
      userId,
      problemId,
      status: submissionData.status,
      runtime: submissionData.runtime || 0,
      memory: submissionData.memory || 0,
      language: submissionData.language,
      profit: submissionData.tradingMetrics?.totalPnL || 0,
      sharpeRatio: submissionData.tradingMetrics?.sharpeRatio || 0,
      timeElapsed,
      submittedAt: Timestamp.now()
    };
    
    await updateDoc(contestRef, {
      submissions: arrayUnion(submission)
    });
    
    return submission;
  } catch (error) {
    console.error('Error recording contest submission:', error);
    throw error;
  }
}

/**
 * Complete a contest
 */
export async function completeContest(roomCode) {
  try {
    const contestRef = doc(db, 'contests', roomCode);
    
    await updateDoc(contestRef, {
      status: 'completed',
      completedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error completing contest:', error);
    throw error;
  }
}

/**
 * Get contest data
 */
export async function getContestData(roomCode) {
  try {
    const contestRef = doc(db, 'contests', roomCode);
    const contestSnap = await getDoc(contestRef);
    
    if (!contestSnap.exists()) {
      return null;
    }
    
    return contestSnap.data();
  } catch (error) {
    console.error('Error getting contest data:', error);
    return null;
  }
}

/**
 * Calculate contest leaderboard with profit tracking
 */
export function calculateContestLeaderboard(participants, submissions, problems) {
  const leaderboard = participants.map(p => ({
    userId: p.userId,
    displayName: p.displayName,
    photoURL: p.photoURL,
    solved: 0,
    totalTime: 0,
    totalProfit: 0,
    avgRuntime: 0,
    problems: {}
  }));
  
  // Process submissions
  submissions.forEach(sub => {
    const entry = leaderboard.find(e => e.userId === sub.userId);
    if (!entry) return;
    
    const problemKey = sub.problemId;
    
    // Only count first accepted submission for each problem
    if (sub.status === 'Accepted' && !entry.problems[problemKey]?.solved) {
      entry.problems[problemKey] = {
        solved: true,
        time: sub.timeElapsed,
        runtime: sub.runtime,
        profit: sub.profit || 0
      };
      entry.solved += 1;
      entry.totalTime += sub.timeElapsed;
      entry.totalProfit += sub.profit || 0;
      entry.avgRuntime += sub.runtime || 0;
    } else if (!entry.problems[problemKey]) {
      entry.problems[problemKey] = {
        solved: false,
        attempts: (entry.problems[problemKey]?.attempts || 0) + 1
      };
    }
  });
  
  // Calculate average runtime
  leaderboard.forEach(entry => {
    if (entry.solved > 0) {
      entry.avgRuntime = Math.round(entry.avgRuntime / entry.solved);
    }
  });
  
  // Sort by: problems solved (desc) → total profit (desc) → total time (asc) → avg runtime (asc)
  leaderboard.sort((a, b) => {
    if (b.solved !== a.solved) return b.solved - a.solved;
    if (Math.abs(b.totalProfit - a.totalProfit) > 0.01) return b.totalProfit - a.totalProfit;
    if (a.totalTime !== b.totalTime) return a.totalTime - b.totalTime;
    return a.avgRuntime - b.avgRuntime;
  });
  
  return leaderboard;
}

/**
 * Send chat message
 */
export async function sendChatMessage(roomCode, userId, userName, message) {
  try {
    const chatRef = doc(collection(db, 'contestChats'), `${roomCode}_${Date.now()}`);
    
    await setDoc(chatRef, {
      roomCode,
      userId,
      userName,
      message,
      timestamp: Timestamp.now()
    });
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
}

/**
 * Get chat messages for a room
 */
export async function getChatMessages(roomCode, limit = 50) {
  try {
    const chatRef = collection(db, 'contestChats');
    const q = query(
      chatRef,
      where('roomCode', '==', roomCode)
    );
    
    const snapshot = await getDocs(q);
    const messages = [];
    
    snapshot.forEach(doc => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    
    // Sort by timestamp
    messages.sort((a, b) => {
      const aTime = a.timestamp?.toMillis() || 0;
      const bTime = b.timestamp?.toMillis() || 0;
      return aTime - bTime;
    });
    
    return messages.slice(-limit);
  } catch (error) {
    console.error('Error getting chat messages:', error);
    return [];
  }
}
