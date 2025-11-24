import certificationsData from '../data/certifications.json';

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  category: string;
  description: string;
  skills: string[];
  verifyUrl: string;
  featured: boolean;
  dateCreated: string;
  dateUpdated: string;
}

export interface CertificationsData {
  certifications: Certification[];
  categories: string[];
  issuers: string[];
  settings: {
    autoSort: boolean;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    showFeaturedFirst: boolean;
    certificationsPerPage: number;
    enableCategories: boolean;
    enableSearch: boolean;
    enableIssuerFilter: boolean;
  };
}

export const getCertificationsData = (): CertificationsData => {
  return certificationsData as CertificationsData;
};

export const getAllCertifications = (): Certification[] => {
  const data = getCertificationsData();
  let certifications = [...data.certifications];

  // Auto-sort based on settings
  if (data.settings.autoSort) {
    certifications.sort((a, b) => {
      const aValue = a[data.settings.sortBy as keyof Certification];
      const bValue = b[data.settings.sortBy as keyof Certification];
      
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

    // Show featured first if enabled
    if (data.settings.showFeaturedFirst) {
      certifications.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
    }
  }

  return certifications;
};

export const getCertificationsByCategory = (category: string): Certification[] => {
  const allCertifications = getAllCertifications();
  if (category === 'All') return allCertifications;
  return allCertifications.filter(cert => cert.category === category);
};

export const getCertificationsByIssuer = (issuer: string): Certification[] => {
  const allCertifications = getAllCertifications();
  if (issuer === 'All') return allCertifications;
  return allCertifications.filter(cert => cert.issuer === issuer);
};

export const searchCertifications = (searchTerm: string): Certification[] => {
  const allCertifications = getAllCertifications();
  const searchLower = searchTerm.toLowerCase();
  
  return allCertifications.filter(cert => 
    cert.title.toLowerCase().includes(searchLower) ||
    cert.description.toLowerCase().includes(searchLower) ||
    cert.category.toLowerCase().includes(searchLower) ||
    cert.issuer.toLowerCase().includes(searchLower) ||
    cert.skills.some(skill => skill.toLowerCase().includes(searchLower))
  );
};

export const getCategories = (): string[] => {
  const data = getCertificationsData();
  return data.categories;
};

export const getIssuers = (): string[] => {
  const data = getCertificationsData();
  return data.issuers;
};

export const getSettings = () => {
  const data = getCertificationsData();
  return data.settings;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };
  
  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }
  
  return 'Just now';
};

export const getFeaturedCertifications = (): Certification[] => {
  return getAllCertifications().filter(cert => cert.featured);
};

export const getCertificationsByDateRange = (startDate: string, endDate: string): Certification[] => {
  const allCertifications = getAllCertifications();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return allCertifications.filter(cert => {
    const certDate = new Date(cert.dateUpdated);
    return certDate >= start && certDate <= end;
  });
};
