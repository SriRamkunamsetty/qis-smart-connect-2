import { notices, Notice } from '../data/notices';
import { collection, getDocs, onSnapshot, query, orderBy, limit as firestoreLimit } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export type { Notice };

const COLLECTION = 'circulars';

export const noticeService = {
  subscribeToNotices: (callback: (notices: Notice[]) => void, category?: string, limitCount?: number) => {
    const q = query(collection(db, COLLECTION), orderBy('date', 'desc'));

    return onSnapshot(q, async (snapshot) => {
      if (snapshot.empty) {
        console.log('Seeding sample notices...');
        for (const notice of notices) {
          const { id, ...data } = notice; // omit dummy ID
          await noticeService.createNotice(data);
        }
      } else {
        let result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notice));
        if (category && category !== 'All') {
          result = result.filter(n => n.category === category);
        }
        if (limitCount) result = result.slice(0, limitCount);
        callback(result);
      }
    });
  },

  getNotices: async (category?: string, limitCount?: number): Promise<Notice[]> => {
    // Keep getNotices as placeholder wrapper for any existing static calls, but returning empty to force subscription usage where possible
    console.warn("getNotices called. Please use subscribeToNotices in components.");
    return [];
  },

  subscribeToNoticeById: (id: string, callback: (notice: Notice | null) => void) => {
    const { doc, onSnapshot } = require('firebase/firestore');
    return onSnapshot(doc(db, COLLECTION, id), (snap: any) => {
      if (snap.exists()) {
        callback({ id: snap.id, ...snap.data() } as Notice);
      } else {
        callback(notices.find(n => n.id === id) || null);
      }
    });
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
