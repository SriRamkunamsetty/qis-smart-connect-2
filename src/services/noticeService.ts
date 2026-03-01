import { notices, Notice } from '../data/notices';
import { collection, getDocs, query, where, orderBy, limit as firestoreLimit } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export type { Notice };

const COLLECTION = 'circulars';

export const noticeService = {
  getNotices: async (category?: string, limitCount?: number): Promise<Notice[]> => {
    try {
      // Try Firebase first
      const q = query(collection(db, COLLECTION), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      if (snapshot.size > 0) {
        let result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notice));
        if (category && category !== 'All') {
          result = result.filter(n => n.category === category);
        }
        if (limitCount) result = result.slice(0, limitCount);
        return result;
      }
    } catch {
      // Firebase not available, fall through to local data
    }

    // Fallback to local data
    let result = [...notices];
    if (category && category !== 'All') {
      result = result.filter(n => n.category === category);
    }
    if (limitCount) result = result.slice(0, limitCount);
    return result;
  },

  getNoticeById: async (id: string): Promise<Notice | null> => {
    try {
      const { doc: docRef, getDoc } = await import('firebase/firestore');
      const snap = await getDoc(docRef(db, COLLECTION, id));
      if (snap.exists()) return { id: snap.id, ...snap.data() } as Notice;
    } catch {
      // fallback
    }
    return notices.find(n => n.id === id) || null;
  },

  createNotice: async (notice: Omit<Notice, 'id'>): Promise<string> => {
    const { addDoc } = await import('firebase/firestore');
    const docRef = await addDoc(collection(db, COLLECTION), notice);
    return docRef.id;
  },

  updateNotice: async (id: string, updates: Partial<Notice>) => {
    const { doc: docRef, updateDoc } = await import('firebase/firestore');
    await updateDoc(docRef(db, COLLECTION, id), updates);
  },

  deleteNotice: async (id: string) => {
    const { doc: docRef, deleteDoc } = await import('firebase/firestore');
    await deleteDoc(docRef(db, COLLECTION, id));
  },
};
