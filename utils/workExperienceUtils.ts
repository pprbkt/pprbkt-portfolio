import workData from '../data/workExperience.json';

export interface WorkExperience {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  category: string;
  featured: boolean;
  companySize: string;
  industry: string;
  remote: boolean;
  dateCreated: string;
  dateUpdated: string;
}

export interface WorkData {
  workExperience: WorkExperience[];
  categories: string[];
  jobTypes: string[];
  industries: string[];
  companySizes: string[];
  settings: {
    autoSort: boolean;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    showCurrentFirst: boolean;
    experiencePerPage: number;
    enableCategories: boolean;
    enableSearch: boolean;
    enableTypeFilter: boolean;
    enableIndustryFilter: boolean;
    showAchievements: boolean;
    showTechnologies: boolean;
  };
}

export const getWorkData = (): WorkData => {
  return workData as WorkData;
};

export const getAllWorkExperience = (): WorkExperience[] => {
  const data = getWorkData();
  let experience = [...data.workExperience];

  // Auto-sort based on settings
  if (data.settings.autoSort) {
    experience.sort((a, b) => {
      const aValue = a[data.settings.sortBy as keyof WorkExperience];
      const bValue = b[data.settings.sortBy as keyof WorkExperience];
      
      if (data.settings.sortBy === 'startDate' || data.settings.sortBy === 'endDate' || data.settings.sortBy === 'dateCreated' || data.settings.sortBy === 'dateUpdated') {
        const aDate = new Date(aValue as string);
        const bDate = new Date(bValue as string);
        return data.settings.sortOrder === 'desc' 
          ? bDate.getTime() - aDate.getTime()
          : aDate.getTime() - bDate.getTime();
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return data.settings.sortOrder === 'desc'
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      }
      
      return 0;
    });

    // Show current jobs first if enabled
    if (data.settings.showCurrentFirst) {
      experience.sort((a, b) => {
        if (a.current && !b.current) return -1;
        if (!a.current && b.current) return 1;
        return 0;
      });
    }
  }

  return experience;
};

export const getWorkExperienceByCategory = (category: string): WorkExperience[] => {
  const allExperience = getAllWorkExperience();
  if (category === 'All') return allExperience;
  return allExperience.filter(exp => exp.category === category);
};

export const getWorkExperienceByType = (type: string): WorkExperience[] => {
  const allExperience = getAllWorkExperience();
  if (type === 'All') return allExperience;
  return allExperience.filter(exp => exp.type === type);
};

export const getWorkExperienceByIndustry = (industry: string): WorkExperience[] => {
  const allExperience = getAllWorkExperience();
  if (industry === 'All') return allExperience;
  return allExperience.filter(exp => exp.industry === industry);
};

export const searchWorkExperience = (searchTerm: string): WorkExperience[] => {
  const allExperience = getAllWorkExperience();
  const searchLower = searchTerm.toLowerCase();
  
  return allExperience.filter(exp => 
    exp.title.toLowerCase().includes(searchLower) ||
    exp.company.toLowerCase().includes(searchLower) ||
    exp.description.toLowerCase().includes(searchLower) ||
    exp.location.toLowerCase().includes(searchLower) ||
    exp.category.toLowerCase().includes(searchLower) ||
    exp.industry.toLowerCase().includes(searchLower) ||
    exp.responsibilities.some(resp => resp.toLowerCase().includes(searchLower)) ||
    exp.technologies.some(tech => tech.toLowerCase().includes(searchLower)) ||
    exp.achievements.some(achievement => achievement.toLowerCase().includes(searchLower))
  );
};

export const getCategories = (): string[] => {
  const data = getWorkData();
  return data.categories;
};

export const getJobTypes = (): string[] => {
  const data = getWorkData();
  return data.jobTypes;
};

export const getIndustries = (): string[] => {
  const data = getWorkData();
  return data.industries;
};

export const getCompanySizes = (): string[] => {
  const data = getWorkData();
  return data.companySizes;
};

export const getSettings = () => {
  const data = getWorkData();
  return data.settings;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
};

export const formatDateRange = (startDate: string, endDate: string | null): string => {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Present';
  return `${start} - ${end}`;
};

export const calculateDuration = (startDate: string, endDate: string | null): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  
  if (diffInMonths < 1) {
    return 'Less than 1 month';
  }
  
  const years = Math.floor(diffInMonths / 12);
  const months = diffInMonths % 12;
  
  if (years === 0) {
    return `${months} month${months > 1 ? 's' : ''}`;
  }
  
  if (months === 0) {
    return `${years} year${years > 1 ? 's' : ''}`;
  }
  
  return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
};

export const getCurrentJobs = (): WorkExperience[] => {
  return getAllWorkExperience().filter(exp => exp.current);
};

export const getFeaturedExperience = (): WorkExperience[] => {
  return getAllWorkExperience().filter(exp => exp.featured);
};

export const getExperienceByDateRange = (startDate: string, endDate: string): WorkExperience[] => {
  const allExperience = getAllWorkExperience();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return allExperience.filter(exp => {
    const expStart = new Date(exp.startDate);
    const expEnd = exp.endDate ? new Date(exp.endDate) : new Date();
    
    return (expStart >= start && expStart <= end) || 
           (expEnd >= start && expEnd <= end) ||
           (expStart <= start && expEnd >= end);
  });
};

export const getTotalExperienceYears = (): number => {
  const allExperience = getAllWorkExperience();
  let totalMonths = 0;
  
  allExperience.forEach(exp => {
    const start = new Date(exp.startDate);
    const end = exp.endDate ? new Date(exp.endDate) : new Date();
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    totalMonths += months;
  });
  
  return Math.round((totalMonths / 12) * 10) / 10; // Round to 1 decimal place
};

export const getAllTechnologies = (): string[] => {
  const allExperience = getAllWorkExperience();
  const technologies = new Set<string>();
  
  allExperience.forEach(exp => {
    exp.technologies.forEach(tech => technologies.add(tech));
  });
  
  return Array.from(technologies).sort();
};
