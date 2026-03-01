import { events, CampusEvent } from '../data/events';
import {
  collection, getDocs, getDoc, doc, query, where, orderBy,
  addDoc, updateDoc, deleteDoc, serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebaseConfig';

export type { CampusEvent };

const COLLECTION = 'events';

export const eventService = {
  getEvents: async (category?: string): Promise<CampusEvent[]> => {
    try {
      let q = query(collection(db, COLLECTION), orderBy('date', 'desc'));
      if (category && category !== 'all') {
        q = query(q, where('category', '==', category));
      }
      const snapshot = await getDocs(q);
      if (snapshot.size > 0) {
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CampusEvent));
      }
    } catch {
      // Firebase not available
    }

    // Fallback to local data
    let result = [...events];
    if (category && category !== 'all') {
      result = result.filter(e => e.category === category);
    }
    return result;
  },

  getEventById: async (id: string): Promise<CampusEvent | null> => {
    try {
      const docSnap = await getDoc(doc(db, COLLECTION, id));
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as CampusEvent;
      }
    } catch {
      // fallback
    }
    return events.find(e => e.id === id) || null;
  },

  createEvent: async (event: Omit<CampusEvent, 'id' | 'images'>, imageFiles: File[]) => {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...event,
      images: [],
      createdAt: serverTimestamp(),
    });

    const eventId = docRef.id;
    const imageUrls: string[] = [];

    for (let i = 0; i < imageFiles.length; i++) {
      const storageRef = ref(storage, `events/${eventId}/image${i + 1}`);
      await uploadBytes(storageRef, imageFiles[i]);
      const url = await getDownloadURL(storageRef);
      imageUrls.push(url);
    }

    await updateDoc(doc(db, COLLECTION, eventId), {
      images: imageUrls,
      coverImage: imageUrls[0] || '',
    });

    return eventId;
  },

  deleteEvent: async (id: string) => {
    await deleteDoc(doc(db, COLLECTION, id));
  },
};
