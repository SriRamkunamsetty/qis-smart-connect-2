export const stats = [
  { label: 'Students Enrolled', value: 12500, suffix: '+', icon: '🎓' },
  { label: 'Placement Rate', value: 94, suffix: '%', icon: '💼' },
  { label: 'Departments', value: 12, suffix: '', icon: '🏛️' },
  { label: 'Expert Faculty', value: 380, suffix: '+', icon: '👨‍🏫' },
];

export const departments = [
  {
    id: 'cse',
    name: 'Computer Science & Engineering',
    shortName: 'CSE',
    icon: '💻',
    color: 'from-blue-500 to-cyan-500',
    description: 'Cutting-edge programs in AI, ML, Web Development, and Cloud Computing.',
    courses: ['B.Tech CSE', 'M.Tech CSE', 'B.Tech AI & ML', 'MCA'],
    faculty: 45,
    students: 2800,
  },
  {
    id: 'ece',
    name: 'Electronics & Communication Engg.',
    shortName: 'ECE',
    icon: '📡',
    color: 'from-purple-500 to-pink-500',
    description: 'Advanced electronics, embedded systems, and communication technologies.',
    courses: ['B.Tech ECE', 'M.Tech VLSI', 'B.Tech IoT'],
    faculty: 38,
    students: 2200,
  },
  {
    id: 'mech',
    name: 'Mechanical Engineering',
    shortName: 'MECH',
    icon: '⚙️',
    color: 'from-orange-500 to-amber-500',
    description: 'Robotics, CAD/CAM, thermal engineering, and manufacturing technologies.',
    courses: ['B.Tech Mechanical', 'M.Tech Design', 'B.Tech Robotics'],
    faculty: 32,
    students: 1900,
  },
  {
    id: 'civil',
    name: 'Civil Engineering',
    shortName: 'CIVIL',
    icon: '🏗️',
    color: 'from-green-500 to-emerald-500',
    description: 'Structural engineering, urban planning, and sustainable infrastructure.',
    courses: ['B.Tech Civil', 'M.Tech Structural', 'B.Tech Environmental'],
    faculty: 28,
    students: 1600,
  },
];

export const faculty = [
  { id: 1, name: 'Dr. Priya Sharma', role: 'Head of CSE', dept: 'cse', experience: '18 yrs', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop' },
  { id: 2, name: 'Prof. Rajan Mehta', role: 'Professor ECE', dept: 'ece', experience: '15 yrs', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
  { id: 3, name: 'Dr. Anita Patel', role: 'Associate Prof. MECH', dept: 'mech', experience: '12 yrs', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop' },
  { id: 4, name: 'Dr. Suresh Kumar', role: 'Head of CIVIL', dept: 'civil', experience: '20 yrs', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
];

export const companies = [
  'Google', 'Microsoft', 'Amazon', 'Infosys', 'TCS', 'Wipro',
  'Accenture', 'IBM', 'Oracle', 'Deloitte', 'KPMG', 'Cognizant',
];

export const placements = {
  avgPackage: '8.5 LPA',
  highestPackage: '42 LPA',
  placedStudents: 1180,
  totalEligible: 1250,
  topRecruiters: companies,
};

export const testimonials = [
  {
    id: 1,
    name: 'Arjun Verma',
    company: 'Google',
    role: 'Software Engineer',
    batch: '2022',
    quote: 'The college prepared me exceptionally well. The industry exposure and projects gave me the confidence to crack Google.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'Sneha Reddy',
    company: 'Microsoft',
    role: 'Product Manager',
    batch: '2021',
    quote: 'The mentorship program was outstanding. My professors guided me through every step of the placement process.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    name: 'Karthik Nair',
    company: 'Amazon',
    role: 'Cloud Architect',
    batch: '2023',
    quote: 'The hands-on labs and real-world projects at this college are second to none. Extremely grateful.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
];

export const galleryImages = [
  { id: 1, category: 'events', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop', title: 'Annual Tech Fest 2024', span: 'col-span-2' },
  { id: 2, category: 'campus', src: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=400&fit=crop', title: 'Campus Life', span: '' },
  { id: 3, category: 'labs', src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop', title: 'Advanced Computing Lab', span: '' },
  { id: 4, category: 'events', src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=400&fit=crop', title: 'Convocation 2024', span: '' },
  { id: 5, category: 'campus', src: 'https://images.unsplash.com/photo-1607013407627-6352b8ec4ad4?w=400&h=400&fit=crop', title: 'Library Block', span: '' },
  { id: 6, category: 'labs', src: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop', title: 'Research Lab', span: 'col-span-2' },
  { id: 7, category: 'events', src: 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=400&h=400&fit=crop', title: 'Sports Day 2024', span: '' },
  { id: 8, category: 'campus', src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=400&fit=crop', title: 'Main Auditorium', span: '' },
];

export const notices = [
  { id: 1, title: 'Semester Exam Schedule Released', date: 'Feb 20, 2025', category: 'Academic', urgent: true },
  { id: 2, title: 'Campus Placement Drive - TCS & Infosys', date: 'Feb 22, 2025', category: 'Placement', urgent: true },
  { id: 3, title: 'Annual Sports Meet Registration Open', date: 'Feb 18, 2025', category: 'Sports', urgent: false },
  { id: 4, title: 'Hackathon 2025 - Register Now', date: 'Feb 15, 2025', category: 'Events', urgent: false },
  { id: 5, title: 'Fee Payment Deadline Extended to March 5', date: 'Feb 14, 2025', category: 'Finance', urgent: true },
];

export const chatMessages: { id: number; sender: 'bot' | 'user'; message: string }[] = [
  { id: 1, sender: 'bot', message: 'Hello! 👋 I\'m QISCET Assistant. How can I help you today?' },
  { id: 2, sender: 'bot', message: 'I can help with admissions, academics, placements, campus info, and more.' },
];

export const quickReplies = [
  'Admission Process', 'Fee Structure', 'Placement Stats', 'Contact Info',
];
