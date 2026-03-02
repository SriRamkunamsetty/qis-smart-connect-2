import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyCDCTeevYJpjx8r7XxGzMbC2MCFpvo2y34",
    authDomain: "qiscet-smart-connect.firebaseapp.com",
    projectId: "qiscet-smart-connect",
    storageBucket: "qiscet-smart-connect.firebasestorage.app",
    messagingSenderId: "324238592465",
    appId: "1:324238592465:web:41729a9a302335d54e78f0",
    databaseURL: "https://qiscet-smart-connect-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getDatabase } from 'firebase/database';

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Initialize Analytics safely
export const analytics = typeof window !== 'undefined'
    ? isSupported().then(yes => yes ? getAnalytics(app) : null).catch(() => null)
    : null;

export default app;
