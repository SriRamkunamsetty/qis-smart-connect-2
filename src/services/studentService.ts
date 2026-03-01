import { students, Student } from '../data/students';
import { collection, getDocs, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export type { Student };

const COLLECTION = 'students';

export const studentService = {
  getStudents: async (branch?: string, year?: string): Promise<Student[]> => {
    try {
      let q = query(collection(db, COLLECTION));
      if (branch) q = query(q, where('branch', '==', branch));
      if (year) q = query(q, where('academicYear', '==', year));
      const snapshot = await getDocs(q);
      if (snapshot.size > 0) {
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Student));
      }
    } catch {
      // Firebase not available
    }

    // Fallback to local data
    let result = [...students];
    if (branch) result = result.filter(s => s.branch === branch);
    if (year) result = result.filter(s => s.academicYear === year);
    return result;
  },

  getStudentByUserId: async (userId: string): Promise<Student | null> => {
    try {
      const q = query(collection(db, COLLECTION), where('userId', '==', userId));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const d = snapshot.docs[0];
        return { id: d.id, ...d.data() } as Student;
      }
    } catch {
      // fallback
    }
    return null;
  },
};
