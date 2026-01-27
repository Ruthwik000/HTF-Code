import { db } from './firebase';
import { getAuth } from 'firebase/auth';
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs, 
  doc, 
  getDoc,
  setDoc,
  updateDoc,
  increment,
  where,
  Timestamp
} from 'firebase/firestore';

// Import problems data
import { problems } from '@/data/problems';
import { generatedProblems } from '@/data/generated100Problems';

// Combine all problems
const allProblems = [...problems, ...generatedProblems];

// Create a map for quick lookup
const problemsMap = {};
allProblems.forEach(p => {
  problemsMap[p.id] = p;
});

// Scoring system
const POINTS = {
  Easy: 1,
  Medium: 5,
  Hard: 10
};

const PENALTY_PER_WRONG_SUBMISSION = 0.1; // 10% penalty per wrong submission

/**
 * Calculate user's total score based on solved problems
 */
export async function calculateUserScore(userId) {
  try {
    console.log('🔍 Calculating score for user:', userId);
    
    const userProblemsRef = collection(db, 'userProblems');
    const q = query(
      userProblemsRef,
      where('userId', '==', userId),
      where('status', '==', 'Solved')
    );
    
    const snapshot = await getDocs(q);
    console.log('📊 Found solved problems:', snapshot.size);
    
    let totalScore = 0;
    let problemsSolved = 0;
    let totalRuntime = 0;
    let totalProfit = 0;
    let wrongSubmissions = 0;
    
    const solvedProblems = [];
    
    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const problemId = data.problemId;
      
      console.log('  Processing problem:', problemId);
      
      // Get problem difficulty from local data
      const problem = problemsMap[problemId];
      
      if (problem) {
        const basePoints = POINTS[problem.difficulty] || 1;
        console.log('  Problem difficulty:', problem.difficulty, 'Points:', basePoints);
        
        // Get best submission for this problem
        const submissionsRef = collection(db, 'submissions');
        const submissionQuery = query(
          submissionsRef,
          where('userId', '==', userId),
          where('problemId', '==', problemId),
          where('status', '==', 'Accepted'),
          orderBy('runtime', 'asc'),
          limit(1)
        );
        
        const submissionSnap = await getDocs(submissionQuery);
        
        if (!submissionSnap.empty) {
          const submission = submissionSnap.docs[0].data();
          
          // Calculate score with penalties
          const attempts = data.attempts || 1;
          const wrongAttempts = Math.max(0, attempts - 1);
          const penalty = wrongAttempts * PENALTY_PER_WRONG_SUBMISSION;
          const finalScore = basePoints * (1 - penalty);
          
          console.log('  Attempts:', attempts, 'Wrong:', wrongAttempts, 'Final score:', finalScore);
          
          totalScore += Math.max(0, finalScore);
          problemsSolved++;
          totalRuntime += submission.runtime || 0;
          totalProfit += submission.tradingMetrics?.totalPnL || 0;
          wrongSubmissions += wrongAttempts;
          
          solvedProblems.push({
            problemId,
            difficulty: problem.difficulty,
            score: finalScore,
            runtime: submission.runtime,
            attempts: attempts,
            wrongAttempts: wrongAttempts
          });
        }
      } else {
        console.warn('  ⚠️ Problem not found in local data:', problemId);
      }
    }
    
    console.log('✅ Total score:', totalScore, 'Problems solved:', problemsSolved);
    
    return {
      totalScore: Math.round(totalScore * 100) / 100,
      problemsSolved,
      avgRuntime: problemsSolved > 0 ? Math.round(totalRuntime / problemsSolved) : 0,
      totalProfit: Math.round(totalProfit * 100) / 100,
      wrongSubmissions,
      solvedProblems
    };
  } catch (error) {
    console.error('Error calculating user score:', error);
    return {
      totalScore: 0,
      problemsSolved: 0,
      avgRuntime: 0,
      totalProfit: 0,
      wrongSubmissions: 0,
      solvedProblems: []
    };
  }
}

/**
 * Update leaderboard entry for a user
 */
export async function updateLeaderboardEntry(userId, userData) {
  try {
    const scoreData = await calculateUserScore(userId);
    
    const leaderboardRef = doc(db, 'leaderboard', userId);
    await setDoc(leaderboardRef, {
      userId,
      displayName: userData.displayName || 'Anonymous',
      photoURL: userData.photoURL || null,
      email: userData.email || null,
      totalScore: scoreData.totalScore,
      problemsSolved: scoreData.problemsSolved,
      avgRuntime: scoreData.avgRuntime,
      totalProfit: scoreData.totalProfit,
      wrongSubmissions: scoreData.wrongSubmissions,
      updatedAt: Timestamp.now()
    }, { merge: true });
    
    return scoreData;
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    throw error;
  }
}

/**
 * Get global leaderboard with ranking
 * Falls back to simpler query if composite index not available
 */
export async function getGlobalLeaderboard(limitCount = 100) {
  try {
    const leaderboardRef = collection(db, 'leaderboard');
    
    // Try full query with all sorting (requires composite index)
    try {
      const q = query(
        leaderboardRef,
        orderBy('totalScore', 'desc'),
        orderBy('wrongSubmissions', 'asc'),
        orderBy('avgRuntime', 'asc'),
        limit(limitCount)
      );
      
      const snapshot = await getDocs(q);
      return processLeaderboardSnapshot(snapshot);
    } catch (indexError) {
      console.warn('Composite index not available, using fallback query:', indexError.message);
      
      // Fallback: Sort by totalScore only, then sort in memory
      const q = query(
        leaderboardRef,
        orderBy('totalScore', 'desc'),
        limit(limitCount * 2) // Get more to sort in memory
      );
      
      const snapshot = await getDocs(q);
      const data = [];
      
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      
      // Sort in memory by all criteria
      data.sort((a, b) => {
        // Primary: totalScore (desc)
        if (b.totalScore !== a.totalScore) {
          return b.totalScore - a.totalScore;
        }
        // Tiebreaker 1: wrongSubmissions (asc)
        if (a.wrongSubmissions !== b.wrongSubmissions) {
          return a.wrongSubmissions - b.wrongSubmissions;
        }
        // Tiebreaker 2: avgRuntime (asc)
        if (a.avgRuntime !== b.avgRuntime) {
          return a.avgRuntime - b.avgRuntime;
        }
        // Tiebreaker 3: totalProfit (desc)
        return (b.totalProfit || 0) - (a.totalProfit || 0);
      });
      
      // Take only requested limit and add ranks
      const result = data.slice(0, limitCount).map((entry, index) => ({
        rank: index + 1,
        userId: entry.id,
        username: entry.displayName || 'Anonymous',
        photoURL: entry.photoURL,
        totalScore: entry.totalScore || 0,
        problemsSolved: entry.problemsSolved || 0,
        avgRuntime: entry.avgRuntime || 0,
        totalProfit: entry.totalProfit || 0,
        wrongSubmissions: entry.wrongSubmissions || 0,
        updatedAt: entry.updatedAt
      }));
      
      console.log('✅ Processed leaderboard entries:', result.length);
      if (result.length > 0) {
        console.log('✅ First entry with rank:', result[0]);
      }
      
      return result;
    }
  } catch (error) {
    console.error('Error fetching global leaderboard:', error);
    return [];
  }
}

// Helper function to process leaderboard snapshot
function processLeaderboardSnapshot(snapshot) {
  const leaderboard = [];
  
  snapshot.forEach((doc, index) => {
    const data = doc.data();
    const entry = {
      rank: index + 1,
      userId: doc.id,
      username: data.displayName || 'Anonymous',
      photoURL: data.photoURL,
      totalScore: data.totalScore || 0,
      problemsSolved: data.problemsSolved || 0,
      avgRuntime: data.avgRuntime || 0,
      totalProfit: data.totalProfit || 0,
      wrongSubmissions: data.wrongSubmissions || 0,
      updatedAt: data.updatedAt
    };
    leaderboard.push(entry);
  });
  
  console.log('✅ Processed snapshot entries:', leaderboard.length);
  if (leaderboard.length > 0) {
    console.log('✅ First snapshot entry with rank:', leaderboard[0]);
  }
  
  return leaderboard;
}

/**
 * Get problem-specific leaderboard
 */
export async function getProblemLeaderboard(problemId, limitCount = 50) {
  try {
    const submissionsRef = collection(db, 'submissions');
    const q = query(
      submissionsRef,
      where('problemId', '==', problemId),
      where('status', '==', 'Accepted'),
      orderBy('score', 'desc'),
      orderBy('runtime', 'asc'),
      limit(limitCount * 2) // Get more to filter unique users
    );
    
    const snapshot = await getDocs(q);
    const userBestSubmissions = new Map();
    
    // Get best submission per user
    for (const docSnap of snapshot.docs) {
      const submission = docSnap.data();
      const userId = submission.userId;
      
      if (!userBestSubmissions.has(userId)) {
        // Get user data
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.exists() ? userSnap.data() : {};
        
        // Get attempt count
        const userProblemRef = doc(db, 'userProblems', `${userId}_${problemId}`);
        const userProblemSnap = await getDoc(userProblemRef);
        const attempts = userProblemSnap.exists() ? userProblemSnap.data().attempts : 1;
        
        userBestSubmissions.set(userId, {
          userId,
          username: userData.displayName || 'Anonymous',
          photoURL: userData.photoURL,
          score: submission.score || 100,
          runtime: submission.runtime || 0,
          memory: submission.memory || 0,
          language: submission.language,
          attempts: attempts,
          tradingMetrics: submission.tradingMetrics || {},
          submittedAt: submission.submittedAt
        });
      }
    }
    
    // Convert to array and sort
    const leaderboard = Array.from(userBestSubmissions.values())
      .sort((a, b) => {
        // Sort by score (desc), then runtime (asc), then profit (desc)
        if (b.score !== a.score) return b.score - a.score;
        if (a.runtime !== b.runtime) return a.runtime - b.runtime;
        const profitA = a.tradingMetrics?.totalPnL || 0;
        const profitB = b.tradingMetrics?.totalPnL || 0;
        return profitB - profitA;
      })
      .slice(0, limitCount)
      .map((entry, index) => ({
        ...entry,
        rank: index + 1
      }));
    
    return leaderboard;
  } catch (error) {
    console.error('Error fetching problem leaderboard:', error);
    return [];
  }
}

/**
 * Get user's rank on global leaderboard
 */
export async function getUserRank(userId) {
  try {
    const leaderboardRef = collection(db, 'leaderboard');
    const userDoc = await getDoc(doc(db, 'leaderboard', userId));
    
    if (!userDoc.exists()) {
      return null;
    }
    
    const userData = userDoc.data();
    
    // Count users with better scores
    const q = query(
      leaderboardRef,
      where('totalScore', '>', userData.totalScore)
    );
    
    const snapshot = await getDocs(q);
    const rank = snapshot.size + 1;
    
    return {
      rank,
      totalScore: userData.totalScore,
      problemsSolved: userData.problemsSolved,
      avgRuntime: userData.avgRuntime,
      wrongSubmissions: userData.wrongSubmissions
    };
  } catch (error) {
    console.error('Error getting user rank:', error);
    return null;
  }
}

/**
 * Record a submission and update leaderboard
 */
export async function recordSubmission(userId, problemId, submissionData) {
  try {
    // Create submission document
    const submissionsRef = collection(db, 'submissions');
    const submissionRef = doc(submissionsRef);
    
    await setDoc(submissionRef, {
      ...submissionData,
      userId,
      problemId,
      submittedAt: Timestamp.now()
    });
    
    // Update user problem status
    const userProblemRef = doc(db, 'userProblems', `${userId}_${problemId}`);
    const userProblemSnap = await getDoc(userProblemRef);
    
    const isAccepted = submissionData.status === 'Accepted';
    const currentData = userProblemSnap.exists() ? userProblemSnap.data() : {};
    
    const updateData = {
      userId,
      problemId,
      attempts: increment(1),
      lastAttemptAt: Timestamp.now()
    };
    
    if (isAccepted) {
      // Update if this is first solve or better than previous
      if (!currentData.solvedAt || 
          (submissionData.runtime < (currentData.bestRuntime || Infinity))) {
        updateData.status = 'Solved';
        updateData.solvedAt = Timestamp.now();
        updateData.bestSubmissionId = submissionRef.id;
        updateData.bestScore = submissionData.score;
        updateData.bestRuntime = submissionData.runtime;
      }
    } else if (!currentData.status) {
      updateData.status = 'Attempted';
    }
    
    await setDoc(userProblemRef, updateData, { merge: true });
    
    // Update user stats
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    let userData = {};
    if (userSnap.exists()) {
      userData = userSnap.data();
    } else {
      // Create user document if it doesn't exist
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        userData = {
          uid: userId,
          email: currentUser.email,
          displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Anonymous',
          photoURL: currentUser.photoURL || null,
          createdAt: Timestamp.now()
        };
        await setDoc(userRef, userData, { merge: true });
      }
    }
    
    // Update leaderboard
    try {
      await updateLeaderboardEntry(userId, userData);
    } catch (leaderboardError) {
      console.warn('Could not update leaderboard:', leaderboardError);
      // Don't fail the submission if leaderboard update fails
    }
    
    return submissionRef.id;
  } catch (error) {
    console.error('Error recording submission:', error);
    throw error;
  }
}
