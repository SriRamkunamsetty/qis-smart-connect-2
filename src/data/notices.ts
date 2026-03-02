export interface Notice {
  id: string;
  title: string;
  description: string;
  category: 'Academic' | 'Placement' | 'Sports' | 'General' | 'Exam' | 'Event';
  date: string;
  priority?: 'Low' | 'Medium' | 'High';
  pinned?: boolean;
  attachmentUrl?: string;
}

export const notices: Notice[] = [
  { id: '1', title: 'Semester Exam Schedule Released', description: 'The final semester exam schedule for 2025-26 has been released. Students are advised to check the notice board.', category: 'Exam', date: 'Feb 28, 2026', priority: 'High', pinned: true },
  { id: '2', title: 'Campus Placement Drive - TCS & Infosys', description: 'TCS and Infosys will be conducting campus placement drives on March 10-12, 2026.', category: 'Placement', date: 'Feb 25, 2026', priority: 'High' },
  { id: '3', title: 'Annual Sports Meet Registration', description: 'Registration for the Annual Sports Meet 2026 is now open. Last date: March 5, 2026.', category: 'Sports', date: 'Feb 22, 2026', priority: 'Medium' },
  { id: '4', title: 'Hackathon 2026 - Register Now', description: 'QISCET Hackathon 2026 is scheduled for March 15-16. Register your teams now!', category: 'Event', date: 'Feb 20, 2026', priority: 'Medium' },
  { id: '5', title: 'Library New Books Arrival', description: 'New reference books for CSE, ECE, and MECH departments are now available in the library.', category: 'Academic', date: 'Feb 18, 2026', priority: 'Low' },
  { id: '6', title: 'Fee Payment Deadline Extended', description: 'The fee payment deadline has been extended to March 15, 2026.', category: 'General', date: 'Feb 15, 2026', priority: 'Medium' },
  { id: '7', title: 'Guest Lecture on AI & ML', description: 'Dr. Ramesh from IIT Hyderabad will deliver a guest lecture on AI & ML applications.', category: 'Academic', date: 'Feb 12, 2026', priority: 'Low' },
  { id: '8', title: 'Workshop on Cloud Computing', description: 'AWS Cloud workshop for all CSE students on March 8, 2026.', category: 'Event', date: 'Feb 10, 2026', priority: 'Medium' },
];
