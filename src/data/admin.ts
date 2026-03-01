export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Principal' | 'HOD' | 'Admin' | 'Coordinator';
  department?: string;
}

export const adminUsers: AdminUser[] = [
  { id: '1', name: 'Dr. K. Ramesh', email: 'principal@qiscet.edu.in', role: 'Principal' },
  { id: '2', name: 'Dr. Priya Sharma', email: 'hod.cse@qiscet.edu.in', role: 'HOD', department: 'CSE' },
  { id: '3', name: 'Dr. Suresh Kumar', email: 'hod.civil@qiscet.edu.in', role: 'HOD', department: 'CIVIL' },
  { id: '4', name: 'Prof. Rajan Mehta', email: 'hod.ece@qiscet.edu.in', role: 'HOD', department: 'ECE' },
  { id: '5', name: 'Mr. Anil Kumar', email: 'admin@qiscet.edu.in', role: 'Admin' },
  { id: '6', name: 'Ms. Lakshmi Devi', email: 'placement@qiscet.edu.in', role: 'Coordinator', department: 'Placement Cell' },
];

export const adminStats = {
  totalStudents: 5000,
  totalFaculty: 200,
  totalDepartments: 10,
  placementRate: 94,
  avgCGPA: 7.2,
  activeNotices: 12,
};
