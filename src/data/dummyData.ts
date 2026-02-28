export const chatMessages = [
    { id: 1, sender: 'bot' as const, message: 'Hello! How can I help you today?' },
];

export const quickReplies = [
    'Admission Process',
    'Fee Structure',
    'Placement Stats',
    'Contact Info',
];

export const stats = [
    { label: 'Students Enrolled', icon: '👨‍🎓', value: 5000, suffix: '+' },
    { label: 'Placement Rate', icon: '💼', value: 95, suffix: '%' },
    { label: 'Expert Faculty', icon: '👨‍🏫', value: 200, suffix: '+' },
    { label: 'Campus Area', icon: '🏫', value: 50, suffix: ' Acres' },
];

export const galleryImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80', title: 'Campus Main Building', category: 'Campus' },
    { id: 2, src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80', title: 'Library', category: 'Facilities' },
    { id: 3, src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80', title: 'Graduation Ceremony', category: 'Events' },
    { id: 4, src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80', title: 'Labs', category: 'Facilities' },
];

export const departments = [
    { id: 'cse', shortName: 'CSE', name: 'Computer Science and Engineering', description: 'Computing, programming, and software design.', icon: '💻', color: 'from-blue-500 to-cyan-500', students: 1200, faculty: 60, courses: ['B.Tech CSE', 'M.Tech CSE'] },
    { id: 'it', shortName: 'IT', name: 'Information Technology', description: 'Information systems and technology.', icon: '🌐', color: 'from-purple-500 to-pink-500', students: 800, faculty: 40, courses: ['B.Tech IT'] },
];

export const faculty = [
    { id: 1, name: 'Dr. John Doe', dept: 'cse', role: 'Professor', experience: '15 Years', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80', isSDC: false, subjects: ['Data Structures'] },
    { id: 2, name: 'Prof. Jane Smith', dept: 'it', role: 'Associate Professor', experience: '10 Years', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80', isSDC: false, subjects: ['Web Development'] },
];

export const sdcFaculty = [
    { id: 3, name: 'Mr. Alex Turner', dept: 'cse', role: 'SDC Mentor', experience: '8 Years', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80', isSDC: true, subjects: ['Full Stack Dev', 'React'] },
];

export const cseBranches = [
    { id: 'csds', name: 'CSDS', fullName: 'CSE (Data Science)', sdcEligible: true, placementPct: 98, courses: ['Data Mining', 'Machine Learning'] },
    { id: 'csm', name: 'CSM', fullName: 'CSE (AI & ML)', sdcEligible: true, placementPct: 95, courses: ['Artificial Intelligence'] },
];

export const placements = {
    placedStudents: 850,
    totalEligible: 900,
    highestPackage: '42 LPA',
    avgPackage: '6.5 LPA',
};

export const testimonials = [
    { id: 1, quote: 'Amazing experience and great placements.', name: 'Sarah Connor', role: 'Software Engineer', company: 'Google', batch: '2023', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80' },
    { id: 2, quote: 'The SDC mentors really helped me build my skills.', name: 'Kyle Reese', role: 'Frontend Dev', company: 'Amazon', batch: '2022', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80' },
];
