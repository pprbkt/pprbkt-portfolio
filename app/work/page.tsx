'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building, MapPin, Calendar, Clock, Search, ArrowRight, Briefcase, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { scrollAnimations, useScrollDirection, getSequentialAnimation } from '@/utils/animations';
import { 
  getAllWorkExperience, 
  getWorkExperienceByCategory, 
  getWorkExperienceByType,
  getWorkExperienceByIndustry,
  searchWorkExperience, 
  getCategories, 
  getJobTypes,
  getIndustries,
  formatDateRange, 
  calculateDuration,
  getTotalExperienceYears,
  type WorkExperience 
} from '@/utils/workExperienceUtils';

export default function WorkExperiencePage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedExperience, setDisplayedExperience] = useState<WorkExperience[]>([]);
  const [allExperience, setAllExperience] = useState<WorkExperience[]>([]);
  const scrollDirection = useScrollDirection();
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const [headerRef, headerInView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const [statsRef, statsInView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const categories = getCategories();
  const jobTypes = getJobTypes();
  const industries = getIndustries();
  const totalYears = getTotalExperienceYears();

  // Load and filter experience
  useEffect(() => {
    try {
      const experience = getAllWorkExperience();
      setAllExperience(experience);
      setDisplayedExperience(experience);
    } catch (error) {
      console.error('Error loading work experience:', error);
      setAllExperience([]);
      setDisplayedExperience([]);
    }
  }, []);

  // Filter experience based on filters and search term
  useEffect(() => {
    try {
      let filtered = allExperience;
      
      // Apply category filter
      if (activeFilter !== 'All') {
        filtered = filtered.filter(exp => exp.category === activeFilter);
      }
      
      // Apply type filter
      if (typeFilter !== 'All') {
        filtered = filtered.filter(exp => exp.type === typeFilter);
      }
      
      // Apply industry filter
      if (industryFilter !== 'All') {
        filtered = filtered.filter(exp => exp.industry === industryFilter);
      }
      
      // Apply search filter
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(exp => 
          exp.title.toLowerCase().includes(searchLower) ||
          exp.company.toLowerCase().includes(searchLower) ||
          exp.description.toLowerCase().includes(searchLower) ||
          exp.technologies.some(tech => tech.toLowerCase().includes(searchLower))
        );
      }
      
      setDisplayedExperience(filtered);
    } catch (error) {
      console.error('Error filtering experience:', error);
    }
  }, [activeFilter, typeFilter, industryFilter, searchTerm, allExperience]);

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'bg-white text-black';
      case 'Contract':
        return 'bg-white/20 text-white border border-white/30';
      case 'Internship':
        return 'bg-white/10 text-white border border-white/20';
      default:
        return 'bg-white/10 text-white';
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
            <h1 className="font-heading text-6xl md:text-8xl font-bold mb-6 text-white">
              Work Experience
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
              {totalYears > 1 ? `${totalYears} years` : 'About a month'} of trying to figure out how the real world works. 
              Currently an intern learning to write code that doesn't break production.
            </p>
          </motion.div>

          {/* Filter Controls */}
          <motion.div
            {...scrollAnimations.fadeInUp}
            animate={headerInView ? scrollAnimations.fadeInUp.animate : scrollAnimations.fadeInUp.initial}
            className="flex flex-col gap-6 mb-12"
          >
            {/* Filter Buttons */}
            <div className="flex justify-center">
              {/* Type Filters */}
              <div className="flex flex-wrap gap-2 justify-center">
                {jobTypes.slice(0, 4).map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      typeFilter === type
                        ? 'bg-white text-black'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="section-padding" ref={ref}>
        <div className="max-w-5xl mx-auto">
          {/* Results Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <p className="text-white">
              Showing {displayedExperience.length} position{displayedExperience.length !== 1 ? 's' : ''}
              {activeFilter !== 'All' && ` in ${activeFilter}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </motion.div>

          {displayedExperience.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <h3 className="text-2xl font-bold text-white mb-4">No experience found</h3>
              <p className="text-white mb-6">
                {searchTerm 
                  ? `No experience matches your search "${searchTerm}"`
                  : `No experience in selected filters`
                }
              </p>
              <button
                onClick={() => {
                  setActiveFilter('All');
                  setTypeFilter('All');
                  setIndustryFilter('All');
                  setSearchTerm('');
                }}
                className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-black hover:text-white border-2 border-white transition-all duration-300"
              >
                View All Experience
              </button>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {displayedExperience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Line */}
                  {index < displayedExperience.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-32 bg-white/20"></div>
                  )}
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-4 top-8 w-4 h-4 bg-white rounded-full border-4 border-black"></div>
                  
                  {/* Experience Card */}
                  <div className="ml-16 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Building size={18} className="text-white" />
                          <span className="text-white font-semibold">{exp.company}</span>
                          {exp.current && (
                            <span className="px-2 py-1 bg-white text-black rounded-full text-xs font-medium">
                              CURRENT
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-white text-sm mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{formatDateRange(exp.startDate, exp.endDate)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{calculateDuration(exp.startDate, exp.endDate)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(exp.type)}`}>
                          {exp.type.toUpperCase()}
                        </span>
                        {exp.featured && (
                          <span className="px-3 py-1 bg-white text-black rounded-full text-xs font-medium">
                            FEATURED
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Key Responsibilities */}
                    <div className="mb-4">
                      <h4 className="text-white font-semibold mb-2">Key Responsibilities:</h4>
                      <ul className="list-disc list-inside text-white space-y-1">
                        {exp.responsibilities.slice(0, 3).map((resp, idx) => (
                          <li key={idx} className="text-sm">{resp}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-4">
                      <h4 className="text-white font-semibold mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-black text-white text-sm rounded-full border border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    {exp.achievements.length > 0 && (
                      <div>
                        <h4 className="text-white font-semibold mb-2">Key Achievements:</h4>
                        <ul className="list-disc list-inside text-white space-y-1">
                          {exp.achievements.slice(0, 2).map((achievement, idx) => (
                            <li key={idx} className="text-sm">{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <h2 className="font-heading text-4xl font-bold text-white mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-white mb-6 leading-relaxed">
              With {totalYears > 1 ? `${totalYears} years` : 'about a month'} of experience, I'm still figuring out how 
              professional emails work but I can definitely build things that don't crash. Let's discuss your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 bg-white text-black font-semibold py-4 px-8 rounded-full hover:bg-black hover:text-white border-2 border-white transition-all duration-300 transform hover:scale-105"
              >
                <span>Get In Touch</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center space-x-2 border-2 border-white text-white hover:bg-white hover:text-black font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <span>View My Projects</span>
                <TrendingUp size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
