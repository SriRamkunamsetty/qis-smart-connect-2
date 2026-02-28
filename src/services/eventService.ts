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
    Timestamp
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage';
import { db, storage } from '../firebaseConfig';

export interface CampusEvent {
    id?: string;
    title: string;
    description: string;
    category: string;
    date: string;
    location: string;
    organizer: string;
    coverImage: string;
    images: string[];
    createdAt?: any;
    createdBy?: string;
}

const EVENTS_COLLECTION = 'events';

export const eventService = {
    // Get all events ordered by date desc
    getEvents: (category?: string) => {
        let q = query(collection(db, EVENTS_COLLECTION), orderBy('date', 'desc'));

        if (category && category !== 'all') {
            q = query(q, where('category', '==', category));
        }

        return q;
    },

    // Get event by ID
    getEventById: async (id: string) => {
        const docRef = doc(db, EVENTS_COLLECTION, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as CampusEvent;
        }
        return null;
    },

    // Create event with images
    createEvent: async (event: Omit<CampusEvent, 'id' | 'images'>, imageFiles: File[]) => {
        // 1. Create document first to get ID
        const docRef = await addDoc(collection(db, EVENTS_COLLECTION), {
            ...event,
            images: [],
            createdAt: serverTimestamp()
        });

        const eventId = docRef.id;
        const imageUrls: string[] = [];

        // 2. Upload images to Storage
        for (let i = 0; i < imageFiles.length; i++) {
            const storageRef = ref(storage, `events/${eventId}/image${i + 1}`);
            await uploadBytes(storageRef, imageFiles[i]);
            const url = await getDownloadURL(storageRef);
            imageUrls.push(url);
        }

        // 3. Update document with image URLs
        await updateDoc(doc(db, EVENTS_COLLECTION, eventId), {
            images: imageUrls,
            coverImage: imageUrls[0] || ''
        });

        return eventId;
    },

    // Delete event
    deleteEvent: async (id: string) => {
        await deleteDoc(doc(db, EVENTS_COLLECTION, id));
    }
};
