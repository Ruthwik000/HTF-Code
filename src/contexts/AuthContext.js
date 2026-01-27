"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Try to fetch additional user data from Firestore, but don't fail if it doesn't exist
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            ...userDoc.data()
          });
        } catch (error) {
          // If Firestore fails, just use auth data
          console.log('Firestore not configured, using auth data only');
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      
      // Try to create user document in Firestore, but don't fail if it doesn't work
      try {
        await setDoc(doc(db, 'users', result.user.uid), {
          email,
          displayName,
          createdAt: new Date().toISOString(),
          solvedProblems: [],
          submissions: []
        });
      } catch (error) {
        console.log('Firestore not configured, skipping user document creation');
      }

      return result;
    } catch (error) {
      // Provide user-friendly error messages
      let message = 'Failed to create account';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'An account with this email already exists';
          break;
        case 'auth/invalid-email':
          message = 'Invalid email address';
          break;
        case 'auth/operation-not-allowed':
          message = 'Email/password accounts are not enabled';
          break;
        case 'auth/weak-password':
          message = 'Password should be at least 6 characters';
          break;
        default:
          message = error.message;
      }
      
      throw new Error(message);
    }
  };

  const login = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // Provide user-friendly error messages
      let message = 'Failed to sign in';
      
      switch (error.code) {
        case 'auth/invalid-email':
          message = 'Invalid email address';
          break;
        case 'auth/user-disabled':
          message = 'This account has been disabled';
          break;
        case 'auth/user-not-found':
          message = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          message = 'Incorrect password';
          break;
        case 'auth/invalid-credential':
          message = 'Invalid email or password';
          break;
        case 'auth/too-many-requests':
          message = 'Too many failed attempts. Please try again later';
          break;
        default:
          message = error.message;
      }
      
      throw new Error(message);
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Try to check/create user document, but don't fail if it doesn't work
      try {
        const userDoc = await getDoc(doc(db, 'users', result.user.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', result.user.uid), {
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            createdAt: new Date().toISOString(),
            solvedProblems: [],
            submissions: []
          });
        }
      } catch (error) {
        console.log('Firestore not configured, skipping user document creation');
      }

      return result;
    } catch (error) {
      // Provide user-friendly error messages
      let message = 'Failed to sign in with Google';
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          message = 'Sign in cancelled';
          break;
        case 'auth/popup-blocked':
          message = 'Popup was blocked. Please allow popups for this site';
          break;
        case 'auth/cancelled-popup-request':
          message = 'Sign in cancelled';
          break;
        case 'auth/account-exists-with-different-credential':
          message = 'An account already exists with this email';
          break;
        default:
          message = error.message;
      }
      
      throw new Error(message);
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    loginWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
