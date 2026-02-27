export interface CompanyInfo {
  name: string;
  domain: string;
  avgPackage: string;
  hiringYear: string;
  studentsPlaced?: number;
}

export const companyData: CompanyInfo[] = [
  { name: 'Google', domain: 'google.com', avgPackage: '42 LPA', hiringYear: '2024', studentsPlaced: 5 },
  { name: 'Microsoft', domain: 'microsoft.com', avgPackage: '38 LPA', hiringYear: '2024', studentsPlaced: 8 },
  { name: 'Amazon', domain: 'amazon.com', avgPackage: '32 LPA', hiringYear: '2024', studentsPlaced: 12 },
  { name: 'Infosys', domain: 'infosys.com', avgPackage: '6.5 LPA', hiringYear: '2024', studentsPlaced: 120 },
  { name: 'TCS', domain: 'tcs.com', avgPackage: '7 LPA', hiringYear: '2024', studentsPlaced: 150 },
  { name: 'Wipro', domain: 'wipro.com', avgPackage: '5.5 LPA', hiringYear: '2024', studentsPlaced: 95 },
  { name: 'Accenture', domain: 'accenture.com', avgPackage: '8 LPA', hiringYear: '2024', studentsPlaced: 80 },
  { name: 'IBM', domain: 'ibm.com', avgPackage: '10 LPA', hiringYear: '2024', studentsPlaced: 25 },
  { name: 'Oracle', domain: 'oracle.com', avgPackage: '14 LPA', hiringYear: '2024', studentsPlaced: 18 },
  { name: 'Deloitte', domain: 'deloitte.com', avgPackage: '12 LPA', hiringYear: '2023', studentsPlaced: 30 },
  { name: 'KPMG', domain: 'kpmg.com', avgPackage: '9 LPA', hiringYear: '2023', studentsPlaced: 15 },
  { name: 'Cognizant', domain: 'cognizant.com', avgPackage: '6 LPA', hiringYear: '2024', studentsPlaced: 110 },
];

export const getLogoUrl = (domain: string) =>
  `https://logo.clearbit.com/${domain}`;
