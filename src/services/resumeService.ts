import {
  collection, doc, addDoc, updateDoc, deleteDoc, getDocs, getDoc,
  query, where, orderBy, serverTimestamp, onSnapshot
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebaseConfig';
import type { ResumeData } from '../components/resume/ResumePreview';

const COLLECTION = 'resumes';

export interface SavedResume {
  id: string;
  userId: string;
  title: string;
  data: ResumeData;
  template: string;
  createdAt: string;
  updatedAt: string;
}

export const resumeService = {
  saveResume: async (userId: string, title: string, data: ResumeData, template: string, existingId?: string): Promise<string> => {
    const payload = {
      userId,
      title,
      data: JSON.parse(JSON.stringify(data)),
      template,
      updatedAt: serverTimestamp(),
    };

    if (existingId) {
      await updateDoc(doc(db, COLLECTION, existingId), payload);
      return existingId;
    } else {
      const docRef = await addDoc(collection(db, COLLECTION), {
        ...payload,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    }
  },

  getUserResumes: (userId: string, callback: (resumes: SavedResume[]) => void) => {
    const q = query(collection(db, COLLECTION), where('userId', '==', userId), orderBy('updatedAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const resumes = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as SavedResume));
      callback(resumes);
    });
  },

  getResume: async (id: string): Promise<SavedResume | null> => {
    const snap = await getDoc(doc(db, COLLECTION, id));
    if (snap.exists()) return { id: snap.id, ...snap.data() } as SavedResume;
    return null;
  },

  deleteResume: async (id: string) => {
    await deleteDoc(doc(db, COLLECTION, id));
  },

  uploadProfileImage: async (userId: string, file: File): Promise<string> => {
    const storageRef = ref(storage, `resumes/profileImages/${userId}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  },
};

// Local resume scoring algorithm
export function calculateResumeScore(data: ResumeData): {
  score: number;
  breakdown: Record<string, number>;
  suggestions: string[];
  atsScore: number;
  atsSuggestions: string[];
} {
  const breakdown: Record<string, number> = {};
  const suggestions: string[] = [];
  const atsSuggestions: string[] = [];

  // Contact info (20 pts)
  let contact = 0;
  if (data.name.trim()) contact += 7;
  else suggestions.push('Add your full name');
  if (data.email.trim()) contact += 7;
  else suggestions.push('Add your email address');
  if (data.phone.trim()) contact += 6;
  else suggestions.push('Add your phone number');
  breakdown['Contact'] = contact;

  // Summary (15 pts)
  let summary = 0;
  if (data.sections.summary.visible && data.summary.trim()) {
    const words = data.summary.trim().split(/\s+/).length;
    if (words >= 30) summary = 15;
    else if (words >= 15) { summary = 10; suggestions.push('Expand your summary to 30+ words'); }
    else { summary = 5; suggestions.push('Write a more detailed professional summary'); }
  } else {
    suggestions.push('Add a professional summary section');
  }
  breakdown['Summary'] = summary;

  // Education (15 pts)
  let education = 0;
  if (data.sections.education.visible && data.education.trim()) {
    const lines = data.education.trim().split('\n').filter(Boolean).length;
    if (lines >= 2) education = 15;
    else { education = 8; suggestions.push('Add more education details (degree, institution, year)'); }
  } else {
    suggestions.push('Add your education details');
  }
  breakdown['Education'] = education;

  // Skills (20 pts)
  let skillScore = 0;
  const skills = data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
  if (skills.length >= 8) skillScore = 20;
  else if (skills.length >= 5) { skillScore = 15; suggestions.push('Add more skills (aim for 8+)'); }
  else if (skills.length >= 3) { skillScore = 10; suggestions.push('Add at least 5-8 relevant skills'); }
  else if (skills.length >= 1) { skillScore = 5; suggestions.push('Add more technical and soft skills'); }
  else { suggestions.push('Add your key skills'); }
  breakdown['Skills'] = skillScore;

  // Projects (15 pts)
  let projects = 0;
  if (data.sections.projects.visible && data.projects.trim()) {
    const lines = data.projects.trim().split('\n').filter(Boolean).length;
    if (lines >= 4) projects = 15;
    else if (lines >= 2) { projects = 10; suggestions.push('Add more project details with tech stacks'); }
    else { projects = 5; suggestions.push('Describe your projects with more detail'); }
  } else {
    suggestions.push('Add projects to showcase your work');
  }
  breakdown['Projects'] = projects;

  // Experience (15 pts)
  let experience = 0;
  if (data.sections.experience.visible && data.experience.trim()) {
    const lines = data.experience.trim().split('\n').filter(Boolean).length;
    if (lines >= 3) experience = 15;
    else if (lines >= 1) { experience = 8; suggestions.push('Add quantified achievements to experience'); }
  } else {
    suggestions.push('Add work experience or internships');
  }
  breakdown['Experience'] = experience;

  const score = Object.values(breakdown).reduce((a, b) => a + b, 0);

  // ATS scoring
  let atsScore = 0;
  const atsChecks: { check: boolean; points: number; suggestion: string }[] = [
    { check: !!data.name.trim(), points: 15, suggestion: 'Include your full name' },
    { check: !!data.email.trim(), points: 10, suggestion: 'Include email for contact' },
    { check: !!data.phone.trim(), points: 10, suggestion: 'Include phone number' },
    { check: skills.length >= 5, points: 20, suggestion: 'Add at least 5 keyword-rich skills' },
    { check: !!data.education.trim(), points: 15, suggestion: 'Include education section' },
    { check: !!data.experience.trim(), points: 15, suggestion: 'Include work experience' },
    { check: !data.photo, points: 5, suggestion: 'Consider removing photo for ATS (some systems reject photos)' },
    { check: data.sections.summary.visible && data.summary.trim().length > 50, points: 10, suggestion: 'Add a keyword-rich summary (50+ chars)' },
  ];

  for (const c of atsChecks) {
    if (c.check) atsScore += c.points;
    else atsSuggestions.push(c.suggestion);
  }

  return { score, breakdown, suggestions, atsScore, atsSuggestions };
}
