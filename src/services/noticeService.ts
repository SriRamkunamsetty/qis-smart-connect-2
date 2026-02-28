import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
    updateDoc,
    deleteDoc,
    limit
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

export interface Notice {
    id?: string;
    title: string;
    description: string;
    category: 'Academic' | 'Placement' | 'Sports' | 'General' | 'Exam' | 'Event';
    date: string;
    createdAt?: any;
    createdBy?: string;
    attachmentUrl?: string;
    pinned?: boolean;
    priority?: 'Low' | 'Medium' | 'High';
}

const NOTICES_COLLECTION = 'notices';

export const noticeService = {
    // Get all notices ordered by priority and date
    getNotices: (category?: string, limitCount?: number) => {
        let q = query(collection(db, NOTICES_COLLECTION), orderBy('createdAt', 'desc'));

        if (category && category !== 'All') {
            q = query(q, where('category', '==', category));
        }

        if (limitCount) {
            q = query(q, limit(limitCount));
        }

        return q;
    },

    // Get notice by ID
    getNoticeById: async (id: string) => {
        const docRef = doc(db, NOTICES_COLLECTION, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Notice;
        }
        return null;
    },

    // Create notice
    createNotice: async (notice: Omit<Notice, 'id'>) => {
        const docRef = await addDoc(collection(db, NOTICES_COLLECTION), {
            ...notice,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    },

    // Update notice
    updateNotice: async (id: string, updates: Partial<Notice>) => {
        const docRef = doc(db, NOTICES_COLLECTION, id);
        await updateDoc(docRef, updates);
    },

    // Delete notice
    deleteNotice: async (id: string) => {
        await deleteDoc(doc(db, NOTICES_COLLECTION, id));
    }
};
