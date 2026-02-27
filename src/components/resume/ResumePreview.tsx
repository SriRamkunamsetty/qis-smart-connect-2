export interface SectionConfig {
  visible: boolean;
  order: number;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  summary: string;
  education: string;
  skills: string;
  projects: string;
  experience: string;
  photo?: string;
  skillLevels?: Record<string, number>;
  accentColor?: string;
  fontFamily?: string;
  sections: {
    summary: SectionConfig;
    education: SectionConfig;
    skills: SectionConfig;
    projects: SectionConfig;
    experience: SectionConfig;
  };
}

import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import AcademicTemplate from './templates/AcademicTemplate';
import CorporateTemplate from './templates/CorporateTemplate';
import InternshipTemplate from './templates/InternshipTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import GovernmentTemplate from './templates/GovernmentTemplate';

export type TemplateKey = 'modern' | 'classic' | 'minimal' | 'academic' | 'corporate' | 'internship' | 'creative' | 'government';

interface Props {
  data: ResumeData;
  template: TemplateKey;
}

export default function ResumePreview({ data, template }: Props) {
  switch (template) {
    case 'classic': return <ClassicTemplate data={data} />;
    case 'minimal': return <MinimalTemplate data={data} />;
    case 'academic': return <AcademicTemplate data={data} />;
    case 'corporate': return <CorporateTemplate data={data} />;
    case 'internship': return <InternshipTemplate data={data} />;
    case 'creative': return <CreativeTemplate data={data} />;
    case 'government': return <GovernmentTemplate data={data} />;
    case 'modern':
    default: return <ModernTemplate data={data} />;
  }
}
