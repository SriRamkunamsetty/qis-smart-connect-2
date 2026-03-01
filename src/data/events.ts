export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
  organizer: string;
  coverImage: string;
  images: string[];
}

export const events: CampusEvent[] = [
  { id: '1', title: 'TechFest 2026', description: 'Annual technical festival featuring coding contests, project exhibitions, and keynote speakers.', category: 'Technical', date: '2026-03-15', location: 'Main Auditorium', organizer: 'CSE Department', coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80', images: [] },
  { id: '2', title: 'Annual Sports Meet', description: 'Inter-department sports competition including cricket, football, athletics, and more.', category: 'Sports', date: '2026-03-20', location: 'Sports Ground', organizer: 'Physical Education Dept', coverImage: 'https://images.unsplash.com/photo-1461896836934-bd45ba9fcbc3?auto=format&fit=crop&q=80', images: [] },
  { id: '3', title: 'Cultural Night', description: 'A celebration of art, music, dance, and drama by students across all departments.', category: 'Cultural', date: '2026-04-05', location: 'Open Air Theatre', organizer: 'Student Council', coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80', images: [] },
  { id: '4', title: 'Hackathon 2026', description: '36-hour coding marathon with prizes worth ₹2 Lakhs. Open to all branches.', category: 'Technical', date: '2026-03-25', location: 'CS Lab Complex', organizer: 'SDC Club', coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80', images: [] },
  { id: '5', title: 'Placement Training Workshop', description: 'Aptitude, group discussion, and interview preparation for final year students.', category: 'Placement', date: '2026-02-28', location: 'Seminar Hall', organizer: 'Placement Cell', coverImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80', images: [] },
];
