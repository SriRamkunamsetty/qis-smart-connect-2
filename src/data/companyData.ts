export const companyData = [
    { name: 'TCS', domain: 'tcs.com', avgPackage: '4.5 LPA', studentsPlaced: 120, hiringYear: '2025' },
    { name: 'Infosys', domain: 'infosys.com', avgPackage: '4.0 LPA', studentsPlaced: 95, hiringYear: '2025' },
    { name: 'Wipro', domain: 'wipro.com', avgPackage: '3.8 LPA', studentsPlaced: 85, hiringYear: '2025' },
    { name: 'Cognizant', domain: 'cognizant.com', avgPackage: '4.2 LPA', studentsPlaced: 70, hiringYear: '2025' },
    { name: 'Accenture', domain: 'accenture.com', avgPackage: '4.5 LPA', studentsPlaced: 65, hiringYear: '2025' },
    { name: 'Tech Mahindra', domain: 'techmahindra.com', avgPackage: '3.5 LPA', studentsPlaced: 50, hiringYear: '2025' },
    { name: 'Capgemini', domain: 'capgemini.com', avgPackage: '4.0 LPA', studentsPlaced: 40, hiringYear: '2025' },
    { name: 'IBM', domain: 'ibm.com', avgPackage: '4.5 LPA', studentsPlaced: 30, hiringYear: '2025' },
    { name: 'HCL Tech', domain: 'hcltech.com', avgPackage: '4.0 LPA', studentsPlaced: 45, hiringYear: '2025' },
    { name: 'Amazon', domain: 'amazon.com', avgPackage: '12 LPA', studentsPlaced: 5, hiringYear: '2025' },
];

export const getLogoUrl = (domain: string) => {
    return `https://logo.clearbit.com/${domain}`;
};
