import { placementRecords, placementStats, PlacementRecord } from '../data/placements';
import { collection, onSnapshot, query, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export type { PlacementRecord };

const COLLECTION = 'placements';
const STATS_DOC = 'placementStats';

export const placementService = {
    subscribeToPlacements: (callback: (records: PlacementRecord[]) => void) => {
        const q = query(collection(db, COLLECTION));

        return onSnapshot(q, async (snapshot) => {
            if (snapshot.empty) {
                console.log('Seeding placement records...');
                for (const record of placementRecords) {
                    const { id, ...data } = record;
                    await addDoc(collection(db, COLLECTION), {
                        ...data,
                        createdAt: serverTimestamp(),
                    });
                }
            } else {
                const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PlacementRecord));
                callback(result);
            }
        });
    },

    subscribeToStats: (callback: (stats: typeof placementStats) => void) => {
        return onSnapshot(doc(db, 'stats', STATS_DOC), async (snap) => {
            if (!snap.exists()) {
                console.log('Seeding placement stats...');
                await setDoc(doc(db, 'stats', STATS_DOC), placementStats);
                callback(placementStats);
            } else {
                callback(snap.data() as typeof placementStats);
            }
        });
    }
};
