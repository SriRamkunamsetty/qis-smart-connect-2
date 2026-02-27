// Extended mock data for new modules

export const departmentPlacementData = {
  cse: {
    name: 'CSE',
    avgPackage: 10.2,
    highestPackage: 42,
    placementPct: 96,
    companies: { IT: 45, Product: 25, Consulting: 15, Startup: 15 },
  },
  ece: {
    name: 'ECE',
    avgPackage: 8.5,
    highestPackage: 28,
    placementPct: 91,
    companies: { IT: 30, Core: 35, Product: 20, Startup: 15 },
  },
  mech: {
    name: 'MECH',
    avgPackage: 6.8,
    highestPackage: 18,
    placementPct: 85,
    companies: { Manufacturing: 40, IT: 25, Core: 25, Startup: 10 },
  },
  civil: {
    name: 'CIVIL',
    avgPackage: 5.5,
    highestPackage: 14,
    placementPct: 78,
    companies: { Construction: 45, Government: 25, Consulting: 20, Startup: 10 },
  },
};

export const hostelData = {
  hostels: [
    { name: 'Block A - Boys', type: 'Single', capacity: 120, occupied: 98, fee: 60000 },
    { name: 'Block B - Boys', type: 'Double Sharing', capacity: 200, occupied: 180, fee: 45000 },
    { name: 'Block C - Girls', type: 'Single', capacity: 100, occupied: 85, fee: 60000 },
    { name: 'Block D - Girls', type: 'Triple Sharing', capacity: 150, occupied: 130, fee: 35000 },
  ],
  transport: [
    { route: 'Route 1 - Majestic → Campus', distance: '18 km', fee: 25000, stops: 8 },
    { route: 'Route 2 - Whitefield → Campus', distance: '22 km', fee: 30000, stops: 10 },
    { route: 'Route 3 - Electronic City → Campus', distance: '15 km', fee: 22000, stops: 6 },
    { route: 'Route 4 - Jayanagar → Campus', distance: '12 km', fee: 20000, stops: 5 },
  ],
};

export const extendedFaculty = [
  { id: 1, name: 'Dr. Priya Sharma', role: 'Head of Department', dept: 'cse', deptFull: 'Computer Science & Engineering', experience: '18 yrs', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop', qualifications: ['Ph.D. in Computer Science', 'M.Tech IIT Delhi'], publications: 42, subjects: ['Data Structures', 'Machine Learning', 'Cloud Computing'], officeHours: 'Mon-Fri, 10:00 AM - 12:00 PM', email: 'priya.sharma@qiscet.edu.in' },
  { id: 2, name: 'Prof. Rajan Mehta', role: 'Professor', dept: 'ece', deptFull: 'Electronics & Communication', experience: '15 yrs', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', qualifications: ['Ph.D. in VLSI Design', 'M.Tech NIT Trichy'], publications: 35, subjects: ['Digital Electronics', 'VLSI Design', 'Embedded Systems'], officeHours: 'Mon-Wed-Fri, 2:00 PM - 4:00 PM', email: 'rajan.mehta@qiscet.edu.in' },
  { id: 3, name: 'Dr. Anita Patel', role: 'Associate Professor', dept: 'mech', deptFull: 'Mechanical Engineering', experience: '12 yrs', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop', qualifications: ['Ph.D. in Thermal Engineering', 'M.Tech IISc'], publications: 28, subjects: ['Thermodynamics', 'Fluid Mechanics', 'CAD/CAM'], officeHours: 'Tue-Thu, 10:00 AM - 1:00 PM', email: 'anita.patel@qiscet.edu.in' },
  { id: 4, name: 'Dr. Suresh Kumar', role: 'Head of Department', dept: 'civil', deptFull: 'Civil Engineering', experience: '20 yrs', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', qualifications: ['Ph.D. in Structural Engineering', 'M.Tech IIT Bombay'], publications: 55, subjects: ['Structural Analysis', 'Geotechnical Engineering', 'Urban Planning'], officeHours: 'Mon-Fri, 9:00 AM - 11:00 AM', email: 'suresh.kumar@qiscet.edu.in' },
  { id: 5, name: 'Dr. Meena Iyer', role: 'Professor', dept: 'cse', deptFull: 'Computer Science & Engineering', experience: '14 yrs', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop', qualifications: ['Ph.D. in AI & ML', 'M.Tech IIIT Hyderabad'], publications: 38, subjects: ['Artificial Intelligence', 'Deep Learning', 'NLP'], officeHours: 'Tue-Thu, 3:00 PM - 5:00 PM', email: 'meena.iyer@qiscet.edu.in' },
  { id: 6, name: 'Prof. Anil Deshmukh', role: 'Associate Professor', dept: 'ece', deptFull: 'Electronics & Communication', experience: '10 yrs', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop', qualifications: ['Ph.D. in Signal Processing', 'M.Tech NIT Surathkal'], publications: 22, subjects: ['Signal Processing', 'Communication Systems', 'IoT'], officeHours: 'Mon-Wed, 11:00 AM - 1:00 PM', email: 'anil.deshmukh@qiscet.edu.in' },
];

export const internships = [
  { id: 1, title: 'Frontend Developer Intern', company: 'Google', domain: 'Web Development', duration: '3 months', stipend: '₹40,000/month', deadline: 'Mar 15, 2025', status: 'open' as const },
  { id: 2, title: 'ML Research Intern', company: 'Microsoft', domain: 'AI/ML', duration: '6 months', stipend: '₹50,000/month', deadline: 'Mar 20, 2025', status: 'open' as const },
  { id: 3, title: 'Backend Developer Intern', company: 'Amazon', domain: 'Backend', duration: '3 months', stipend: '₹35,000/month', deadline: 'Feb 28, 2025', status: 'closed' as const },
  { id: 4, title: 'Data Analyst Intern', company: 'Deloitte', domain: 'Data Science', duration: '4 months', stipend: '₹30,000/month', deadline: 'Apr 5, 2025', status: 'open' as const },
  { id: 5, title: 'UI/UX Design Intern', company: 'Accenture', domain: 'Design', duration: '3 months', stipend: '₹25,000/month', deadline: 'Mar 30, 2025', status: 'open' as const },
];

export const insightsData = {
  admissionGrowth: [
    { year: '2019', students: 1800 },
    { year: '2020', students: 2100 },
    { year: '2021', students: 2500 },
    { year: '2022', students: 2900 },
    { year: '2023', students: 3200 },
    { year: '2024', students: 3600 },
  ],
  placementTrend: [
    { year: '2019', avgPackage: 5.2, placedPct: 78 },
    { year: '2020', avgPackage: 5.8, placedPct: 82 },
    { year: '2021', avgPackage: 6.5, placedPct: 85 },
    { year: '2022', avgPackage: 7.2, placedPct: 89 },
    { year: '2023', avgPackage: 8.0, placedPct: 92 },
    { year: '2024', avgPackage: 8.5, placedPct: 94 },
  ],
  genderRatio: [
    { name: 'Male', value: 58 },
    { name: 'Female', value: 42 },
  ],
  departmentStrength: [
    { dept: 'CSE', students: 2800 },
    { dept: 'ECE', students: 2200 },
    { dept: 'MECH', students: 1900 },
    { dept: 'CIVIL', students: 1600 },
  ],
};

export const feeStructure: Record<string, { tuition: number; lab: number; library: number }> = {
  'B.Tech CSE': { tuition: 150000, lab: 15000, library: 5000 },
  'B.Tech ECE': { tuition: 140000, lab: 12000, library: 5000 },
  'B.Tech MECH': { tuition: 130000, lab: 18000, library: 5000 },
  'B.Tech CIVIL': { tuition: 120000, lab: 10000, library: 5000 },
  'M.Tech CSE': { tuition: 180000, lab: 20000, library: 5000 },
  'MCA': { tuition: 100000, lab: 10000, library: 5000 },
};

export const searchableContent = [
  { type: 'Course', title: 'B.Tech Computer Science & Engineering', path: '/academics' },
  { type: 'Course', title: 'B.Tech Electronics & Communication', path: '/academics' },
  { type: 'Course', title: 'B.Tech Mechanical Engineering', path: '/academics' },
  { type: 'Course', title: 'B.Tech Civil Engineering', path: '/academics' },
  { type: 'Course', title: 'M.Tech CSE', path: '/academics' },
  { type: 'Course', title: 'MCA', path: '/academics' },
  { type: 'Faculty', title: 'Dr. Priya Sharma - Head of CSE', path: '/faculty/1' },
  { type: 'Faculty', title: 'Prof. Rajan Mehta - Professor ECE', path: '/faculty/2' },
  { type: 'Faculty', title: 'Dr. Anita Patel - Associate Prof. MECH', path: '/faculty/3' },
  { type: 'Faculty', title: 'Dr. Suresh Kumar - Head of CIVIL', path: '/faculty/4' },
  { type: 'Notice', title: 'Semester Exam Schedule Released', path: '/' },
  { type: 'Notice', title: 'Campus Placement Drive - TCS & Infosys', path: '/placements' },
  { type: 'Notice', title: 'Hackathon 2025 - Register Now', path: '/' },
  { type: 'Event', title: 'TechFest 2025', path: '/gallery' },
  { type: 'Event', title: 'Annual Sports Meet', path: '/gallery' },
  { type: 'Alumni', title: 'Arjun Verma - Google', path: '/placements' },
  { type: 'Alumni', title: 'Sneha Reddy - Microsoft', path: '/placements' },
  { type: 'Page', title: 'Admission Portal', path: '/admission' },
  { type: 'Page', title: 'Placement Records', path: '/placements' },
  { type: 'Page', title: 'Internship Portal', path: '/internships' },
  { type: 'Page', title: 'Resume Builder', path: '/resume-builder' },
  { type: 'Page', title: 'Data Insights', path: '/insights' },
  { type: 'Page', title: 'Placement Prediction', path: '/placement-prediction' },
  { type: 'Page', title: 'Skill Gap Analyzer', path: '/skill-gap' },
  { type: 'Page', title: 'Career Roadmap', path: '/career-roadmap' },
  { type: 'Page', title: 'Placement Readiness Score', path: '/placement-readiness' },
  { type: 'Page', title: 'Transport Route Tracker', path: '/transport-tracker' },
];
