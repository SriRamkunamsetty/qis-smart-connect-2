import { galleryImages, GalleryImage } from '../data/gallery';
import { collection, onSnapshot, query, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export type { GalleryImage };

const COLLECTION = 'gallery';

export const galleryService = {
    subscribeToGallery: (callback: (images: GalleryImage[]) => void, limitCount?: number) => {
        const q = query(collection(db, COLLECTION));

        return onSnapshot(q, async (snapshot) => {
            if (snapshot.empty) {
                console.log('Seeding gallery images...');
                for (const img of galleryImages) {
                    const { id, ...data } = img;
                    await addDoc(collection(db, COLLECTION), {
                        ...data,
                        createdAt: serverTimestamp(),
                    });
                }
            } else {
                let result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any) as GalleryImage);
                if (limitCount) result = result.slice(0, limitCount);
                callback(result);
            }
        });
    }
};
