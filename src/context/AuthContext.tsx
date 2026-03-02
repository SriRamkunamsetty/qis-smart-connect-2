import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export type UserRole = 'student' | 'admin' | 'faculty' | null;

interface User {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  branch?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string, role: UserRole, branch?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => { },
  loginWithGoogle: async () => { },
  logout: () => { },
  signup: async () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch additional user data from Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        let userData = userDoc.data();

        if (!userDoc.exists()) {
          userData = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || 'User',
            email: firebaseUser.email || '',
            role: 'student',
            createdAt: new Date().toISOString()
          };
          await setDoc(userDocRef, userData);
        } else if (!userData?.role) {
          userData.role = 'student';
          await setDoc(userDocRef, { role: 'student' }, { merge: true });
        }

        // Use ID token to check for custom claims (roles)
        const idTokenResult = await firebaseUser.getIdTokenResult();
        const roleFromClaim = idTokenResult.claims.role as UserRole;

        let finalRole = roleFromClaim || userData?.role || 'student';
        if (typeof finalRole === 'string') {
          finalRole = finalRole.toLowerCase() as UserRole;
        }

        setUser({
          uid: firebaseUser.uid,
          name: userData?.name || firebaseUser.displayName || 'User',
          email: firebaseUser.email || '',
          role: finalRole as UserRole,
          branch: userData?.branch
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const signup = async (name: string, email: string, password: string, role: UserRole, branch?: string) => {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);

    // Initial Firestore record (Security Rules will allow this)
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      uid: firebaseUser.uid,
      name,
      email,
      role,
      branch,
      createdAt: new Promise((resolve) => resolve(new Date())) // Simplified for this context
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, loginWithGoogle, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
