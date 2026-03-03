import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential
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
  login: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  logout: () => void;
  signup: (name: string, email: string, password: string, role: UserRole, branch?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => ({} as UserCredential),
  loginWithGoogle: async () => ({} as UserCredential),
  logout: () => { },
  signup: async () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
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

        let finalRole = (userData?.role || 'student') as string;
        finalRole = finalRole.toLowerCase();

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

  const login = async (email: string, password: string): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const signup = async (name: string, email: string, password: string, role: UserRole, branch?: string) => {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      uid: firebaseUser.uid,
      name,
      email,
      role: role || 'student',
      branch,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, loginWithGoogle, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
