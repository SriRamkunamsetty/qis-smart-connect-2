import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export const authService = {
  signUp: async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  },

  login: async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  logout: async () => {
    return await signOut(auth);
  },

  loginWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  },

  getCurrentUser: () => auth.currentUser,

  onAuthStateChanged: (callback: (user: FirebaseUser | null) => void) => {
    return onAuthStateChanged(auth, callback);
  },

  getUserRole: async (uid: string): Promise<string> => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.data()?.role?.toLowerCase() || 'student';
  },

  createUserRecord: async (uid: string, data: { name: string; email: string; role?: string }) => {
    await setDoc(doc(db, 'users', uid), {
      uid,
      name: data.name,
      email: data.email,
      role: data.role || 'student',
      createdAt: new Date().toISOString(),
    });
  },
};
