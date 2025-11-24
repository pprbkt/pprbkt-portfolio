import projectsData from '../data/projects.json';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  dateCreated: string;
  dateUpdated: string;
}

export interface ProjectsData {
  projects: Project[];
  categories: string[];
  settings: {
    autoSort: boolean;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    showFeaturedFirst: boolean;
    projectsPerPage: number;
    enableCategories: boolean;
    enableSearch: boolean;
  };
}

export const getProjectsData = (): ProjectsData => {
  return projectsData as ProjectsData;
};

export const getAllProjects = (): Project[] => {
  const data = getProjectsData();
  let projects = [...data.projects];

  // Auto-sort based on settings
  if (data.settings.autoSort) {
    projects.sort((a, b) => {
      const aValue = a[data.settings.sortBy as keyof Project];
      const bValue = b[data.settings.sortBy as keyof Project];
      
      if (data.settings.sortBy === 'dateCreated' || data.settings.sortBy === 'dateUpdated') {
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

    // Show featured projects first if enabled
    if (data.settings.showFeaturedFirst) {
      projects.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    }
  }

  return projects;
};

export const getProjectsByCategory = (category: string): Project[] => {
  const projects = getAllProjects();
  if (category === 'All') return projects;
  return projects.filter(project => project.category === category);
};

export const getFeaturedProjects = (): Project[] => {
  return getAllProjects().filter(project => project.featured);
};

export const getProjectById = (id: number): Project | undefined => {
  const data = getProjectsData();
  return data.projects.find(project => project.id === id);
};

export const searchProjects = (query: string): Project[] => {
  const projects = getAllProjects();
  const searchTerm = query.toLowerCase();
  
  return projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm) ||
    project.description.toLowerCase().includes(searchTerm) ||
    project.technologies.some(tech => tech.toLowerCase().includes(searchTerm)) ||
    project.category.toLowerCase().includes(searchTerm)
  );
};

export const getCategories = (): string[] => {
  const data = getProjectsData();
  return data.categories;
};

export const getSettings = () => {
  const data = getProjectsData();
  return data.settings;
};

// Helper function to format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Helper function to get relative time
export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  
  const minutes = Math.floor(diffInSeconds / 60);
  if (diffInSeconds < 3600) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  
  const hours = Math.floor(diffInSeconds / 3600);
  if (diffInSeconds < 86400) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  
  const days = Math.floor(diffInSeconds / 86400);
  if (diffInSeconds < 2592000) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  
  const months = Math.floor(diffInSeconds / 2592000);
  if (diffInSeconds < 31536000) return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  
  const years = Math.floor(diffInSeconds / 31536000);
  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
};
