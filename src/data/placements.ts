export interface PlacementRecord {
  id: string;
  studentName: string;
  branch: string;
  company: string;
  package: string;
  year: string;
  role: string;
}

export const placementRecords: PlacementRecord[] = [
  { id: '1', studentName: 'Arjun Verma', branch: 'CSE', company: 'Google', package: '42 LPA', year: '2025', role: 'Software Engineer' },
  { id: '2', studentName: 'Sneha Reddy', branch: 'CSE', company: 'Microsoft', package: '38 LPA', year: '2025', role: 'SDE II' },
  { id: '3', studentName: 'Kiran Patel', branch: 'ECE', company: 'Amazon', package: '28 LPA', year: '2025', role: 'Cloud Engineer' },
  { id: '4', studentName: 'Lakshmi Devi', branch: 'CSE', company: 'TCS', package: '4.5 LPA', year: '2025', role: 'Systems Engineer' },
  { id: '5', studentName: 'Rahul Singh', branch: 'MECH', company: 'Tata Motors', package: '6 LPA', year: '2025', role: 'Design Engineer' },
  { id: '6', studentName: 'Ananya Sharma', branch: 'CSE', company: 'Infosys', package: '4 LPA', year: '2025', role: 'Software Developer' },
  { id: '7', studentName: 'Vikram Kumar', branch: 'ECE', company: 'Wipro', package: '3.8 LPA', year: '2025', role: 'Engineer Trainee' },
  { id: '8', studentName: 'Divya Lakshmi', branch: 'CSE', company: 'Accenture', package: '4.5 LPA', year: '2025', role: 'Associate Software Engineer' },
];

export const placementStats = {
  placedStudents: 850,
  totalEligible: 900,
  highestPackage: '42 LPA',
  avgPackage: '6.5 LPA',
  placementRate: 94,
};
