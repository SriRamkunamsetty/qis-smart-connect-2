export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  branch: string;
  academicYear: string;
  section: string;
  attendance: number;
  cgpa: number;
  email?: string;
  phone?: string;
}

export const students: Student[] = [
  { id: '1', name: 'Arjun Verma', rollNumber: '21B01A0501', branch: 'CSE', academicYear: '2021-2025', section: 'A', attendance: 92, cgpa: 8.7, email: 'arjun@qiscet.edu.in' },
  { id: '2', name: 'Sneha Reddy', rollNumber: '21B01A0502', branch: 'CSE', academicYear: '2021-2025', section: 'A', attendance: 88, cgpa: 9.1, email: 'sneha@qiscet.edu.in' },
  { id: '3', name: 'Ravi Kumar', rollNumber: '21B01A0503', branch: 'CSE', academicYear: '2021-2025', section: 'B', attendance: 65, cgpa: 5.2, email: 'ravi@qiscet.edu.in' },
  { id: '4', name: 'Priya Sharma', rollNumber: '21B01A0504', branch: 'ECE', academicYear: '2021-2025', section: 'A', attendance: 78, cgpa: 7.8, email: 'priya@qiscet.edu.in' },
  { id: '5', name: 'Karthik Nair', rollNumber: '21B01A0505', branch: 'ECE', academicYear: '2021-2025', section: 'B', attendance: 45, cgpa: 3.8, email: 'karthik@qiscet.edu.in' },
  { id: '6', name: 'Meena Iyer', rollNumber: '21B01A0506', branch: 'MECH', academicYear: '2021-2025', section: 'A', attendance: 72, cgpa: 6.4, email: 'meena@qiscet.edu.in' },
  { id: '7', name: 'Rahul Deshmukh', rollNumber: '21B01A0507', branch: 'MECH', academicYear: '2021-2025', section: 'A', attendance: 55, cgpa: 4.5, email: 'rahul@qiscet.edu.in' },
  { id: '8', name: 'Ananya Patel', rollNumber: '21B01A0508', branch: 'CIVIL', academicYear: '2021-2025', section: 'A', attendance: 95, cgpa: 9.4, email: 'ananya@qiscet.edu.in' },
  { id: '9', name: 'Vikram Singh', rollNumber: '21B01A0509', branch: 'CSE', academicYear: '2022-2026', section: 'A', attendance: 60, cgpa: 5.0, email: 'vikram@qiscet.edu.in' },
  { id: '10', name: 'Divya Lakshmi', rollNumber: '21B01A0510', branch: 'CSE', academicYear: '2022-2026', section: 'B', attendance: 85, cgpa: 8.2, email: 'divya@qiscet.edu.in' },
];
