export interface EligibilityResult {
  eligible: boolean;
  department: string;
  required: number;
  score: number;
  suggestions: string[];
}

const cutoffs: Record<string, Record<string, number>> = {
  cse: { General: 85, OBC: 78, SC: 70, ST: 65 },
  ece: { General: 80, OBC: 73, SC: 65, ST: 60 },
  mech: { General: 70, OBC: 63, SC: 55, ST: 50 },
  civil: { General: 65, OBC: 58, SC: 50, ST: 45 },
};

const deptNames: Record<string, string> = {
  cse: 'Computer Science & Engineering',
  ece: 'Electronics & Communication',
  mech: 'Mechanical Engineering',
  civil: 'Civil Engineering',
};

export function checkEligibility(
  marks: number,
  category: string,
  branch: string
): EligibilityResult {
  const required = cutoffs[branch]?.[category] ?? 80;
  const eligible = marks >= required;

  const suggestions: string[] = [];
  if (!eligible) {
    Object.entries(cutoffs).forEach(([dept, cats]) => {
      if (marks >= (cats[category] ?? 80)) {
        suggestions.push(deptNames[dept]);
      }
    });
  }

  return {
    eligible,
    department: deptNames[branch],
    required,
    score: marks,
    suggestions,
  };
}
