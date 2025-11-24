'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Search, Award, Calendar, Building, ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { scrollAnimations, useScrollDirection, getSequentialAnimation } from '@/utils/animations';
import { 
  getAllCertifications, 
  getCertificationsByCategory, 
  getCertificationsByIssuer, 
  searchCertifications, 
  getCategories, 
  getIssuers,
  getSettings, 
  type Certification 
} from '@/utils/certificationsUtils';

export default function Certifications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIssuer, setSelectedIssuer] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [displayedCertifications, setDisplayedCertifications] = useState<Certification[]>([]);
  const [allCertifications, setAllCertifications] = useState<Certification[]>([]);
  const scrollDirection = useScrollDirection();
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [headerRef, headerInView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const [filtersRef, filtersInView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const categories = getCategories();
  const issuers = getIssuers();

  // Load certifications from database
  useEffect(() => {
    try {
      const certifications = getAllCertifications();
      setAllCertifications(certifications);
      setDisplayedCertifications(certifications);
    } catch (error) {
      console.error('Error loading certifications:', error);
      setAllCertifications([]);
      setDisplayedCertifications([]);
    }
  }, []);

  // Filter certifications based on issuer and search term
  useEffect(() => {
    try {
      let filtered = allCertifications;
      
      // Apply issuer filter
      if (selectedIssuer !== 'All') {
        filtered = filtered.filter(cert => cert.issuer === selectedIssuer);
      }
      
      // Apply search filter
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(cert => 
          cert.title.toLowerCase().includes(searchLower) ||
          cert.category.toLowerCase().includes(searchLower) ||
          cert.issuer.toLowerCase().includes(searchLower) ||
          cert.skills.some(skill => skill.toLowerCase().includes(searchLower))
        );
      }
      
      setDisplayedCertifications(filtered);
    } catch (error) {
      console.error('Error filtering certifications:', error);
    }
  }, [selectedIssuer, searchTerm, allCertifications]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update dropdown position when opened
  useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [isDropdownOpen]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Artificial Intelligence': return 'bg-black text-white border-white';
      case 'Cloud Computing': return 'bg-black text-white border-white';
      case 'Programming': return 'bg-black text-white border-white';
      case 'Data Analytics': return 'bg-black text-white border-white';
      case 'Cloud Security': return 'bg-black text-white border-white';
      case 'Computer Science': return 'bg-black text-white border-white';
      case 'Cloud Architecture': return 'bg-black text-white border-white';
      case 'Cloud Operations': return 'bg-black text-white border-white';
      case 'Learning Achievement': return 'bg-black text-white border-white';
      case 'Life Sciences': return 'bg-black text-white border-white';
      default: return 'bg-black text-white border-white';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section ref={headerRef} className="section-padding relative overflow-hidden pt-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...scrollAnimations.blurIn}
            animate={headerInView ? scrollAnimations.blurIn.animate : scrollAnimations.blurIn.initial}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-6xl md:text-8xl font-bold mb-6">
              <span className="text-white">
                Certifications
              </span>
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed mb-8">
              {allCertifications.length} certificates I collected because they looked important. 
              Most are from Google, which hopefully counts for something.
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" size={20} />
                <input
                  type="text"
                  placeholder="Search certifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80 pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-full text-white placeholder-white focus:outline-none focus:border-white/50 transition-colors"
                />
              </div>
              
              <div className="relative">
                <button
                  ref={buttonRef}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="px-6 py-3 bg-white/5 border border-white/20 rounded-full text-white focus:outline-none focus:border-white/50 transition-colors flex items-center justify-between min-w-[200px]"
                >
                  <span>{selectedIssuer}</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {isDropdownOpen && typeof window !== 'undefined' && createPortal(
                  <div 
                    ref={dropdownRef}
                    className="fixed bg-black border border-white/20 rounded-xl z-[9999] overflow-hidden shadow-2xl"
                    style={{
                      top: dropdownPosition.top,
                      left: dropdownPosition.left,
                      width: dropdownPosition.width
                    }}
                  >
                    {issuers.map(issuer => (
                      <button
                        key={issuer}
                        onClick={() => {
                          setSelectedIssuer(issuer);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-6 py-3 text-left text-white hover:bg-white/10 transition-colors ${
                          selectedIssuer === issuer ? 'bg-white/20' : ''
                        }`}
                      >
                        {issuer}
                      </button>
                    ))}
                  </div>,
                  document.body
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-16 px-6" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayedCertifications.map((cert: Certification, index: number) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all flex flex-col h-full hover:border-white/30"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-black rounded-lg border border-white">
                      <Award size={20} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-semibold text-white mb-2 line-clamp-2">
                    {cert.title}
                  </h3>
                  
                  <div className="flex items-center text-white mb-2">
                    <Building size={16} className="mr-2" />
                    <span className="text-sm">{cert.issuer}</span>
                  </div>
                  
                  <div className="flex items-center text-white mb-3">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-sm">{cert.date}</span>
                  </div>

                  {cert.credentialId && (
                    <div className="text-xs text-white mb-3">
                      ID: {cert.credentialId}
                    </div>
                  )}

                  <p className="text-white text-sm mb-4 line-clamp-3">
                    {cert.description}
                  </p>

                  {/* Category */}
                  <div className="mb-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(cert.category)}`}>
                      {cert.category}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {cert.skills.slice(0, 3).map((skill: string) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-black text-white text-xs rounded border border-white"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="px-2 py-1 bg-black text-white text-xs rounded border border-white">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* View Certificate Button */}
                <div className="pt-4 border-t border-white/10">
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 bg-white text-black border border-white rounded-lg hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium"
                  >
                    <ExternalLink size={16} />
                    <span>View Certificate</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {displayedCertifications.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <p className="text-white text-lg">
                No certifications found matching your criteria.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-black backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <h2 className="font-heading text-4xl font-bold text-white mb-6">
              Ready to Build Something Together?
            </h2>
            <p className="text-xl text-white mb-8 leading-relaxed">
              These certificates prove I can learn new things, but the real test is building actual projects. 
              Let's work on something that matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 bg-white text-black font-semibold py-4 px-8 rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105"
              >
                <span>Let's Connect</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center space-x-2 border-2 border-white text-white hover:bg-white hover:text-black font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <span>View My Projects</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
