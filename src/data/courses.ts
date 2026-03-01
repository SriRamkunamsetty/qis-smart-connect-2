export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  credits: number;
  semester: number;
  type: 'Core' | 'Elective' | 'Lab';
}

export const courses: Course[] = [
  { id: '1', name: 'Data Structures & Algorithms', code: 'CS201', department: 'CSE', credits: 4, semester: 3, type: 'Core' },
  { id: '2', name: 'Database Management Systems', code: 'CS301', department: 'CSE', credits: 4, semester: 5, type: 'Core' },
  { id: '3', name: 'Operating Systems', code: 'CS302', department: 'CSE', credits: 4, semester: 5, type: 'Core' },
  { id: '4', name: 'Computer Networks', code: 'CS401', department: 'CSE', credits: 3, semester: 6, type: 'Core' },
  { id: '5', name: 'Machine Learning', code: 'CS501', department: 'CSE', credits: 3, semester: 7, type: 'Elective' },
  { id: '6', name: 'Web Technologies Lab', code: 'CS302L', department: 'CSE', credits: 2, semester: 5, type: 'Lab' },
  { id: '7', name: 'Digital Electronics', code: 'EC201', department: 'ECE', credits: 4, semester: 3, type: 'Core' },
  { id: '8', name: 'VLSI Design', code: 'EC401', department: 'ECE', credits: 3, semester: 7, type: 'Elective' },
  { id: '9', name: 'Thermodynamics', code: 'ME201', department: 'MECH', credits: 4, semester: 3, type: 'Core' },
  { id: '10', name: 'Structural Analysis', code: 'CE301', department: 'CIVIL', credits: 4, semester: 5, type: 'Core' },
];
