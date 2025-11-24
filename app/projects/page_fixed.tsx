'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Search, ArrowRight, Calendar, Tag, Clock } from 'lucide-react';
import Link from 'next/link';
import { 
  getAllProjects, 
  getProjectsByCategory, 
  searchProjects, 
  getCategories, 
  getSettings, 
  formatDate, 
  getRelativeTime,
  type Project 
} from '../../utils/projectsUtils';

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const categories = getCategories();
  const settings = getSettings();

  // Load and filter projects
  useEffect(() => {
    const projects = getAllProjects();
    setAllProjects(projects);
    setDisplayedProjects(projects);
  }, []);

  // Filter projects based on category and search term
  useEffect(() => {
    let filtered = getProjectsByCategory(activeFilter);
    
    if (searchTerm.trim()) {
      filtered = searchProjects(searchTerm);
      if (activeFilter !== 'All') {
        filtered = filtered.filter(project => project.category === activeFilter);
      }
    }
    
    setDisplayedProjects(filtered);
  }, [activeFilter, searchTerm]);

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setSearchTerm(''); // Clear search when changing category
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-white text-black';
      case 'in-progress':
        return 'bg-white/20 text-white border border-white/30';
      case 'planned':
        return 'bg-white/10 text-white border border-white/20';
      default:
        return 'bg-white/10 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden pt-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeIn}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-6xl md:text-8xl font-bold mb-6">
              <span className="text-white">
                Projects
              </span>
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
              A collection of {allProjects.length} projects that showcase my passion for creating innovative solutions, 
              from AI-powered applications to full-stack web platforms. Auto-sorted by most recent updates.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.1 }}
            className="flex justify-center gap-8 mb-12"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{allProjects.length}</div>
              <div className="text-white text-sm">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{allProjects.filter(p => p.featured).length}</div>
              <div className="text-white text-sm">Featured</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{allProjects.filter(p => p.status === 'completed').length}</div>
              <div className="text-white text-sm">Completed</div>
            </div>
          </motion.div>

          {/* Filter Controls */}
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-6 mb-12 justify-center items-center"
          >
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white focus:outline-none focus:border-white/50 transition-colors"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === category
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding" ref={ref}>
        <div className="max-w-7xl mx-auto">
          {/* Results Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <p className="text-white">
              Showing {displayedProjects.length} project{displayedProjects.length !== 1 ? 's' : ''}
              {activeFilter !== 'All' && ` in ${activeFilter}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </motion.div>

          {displayedProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <h3 className="text-2xl font-bold text-white mb-4">No projects found</h3>
              <p className="text-white mb-6">
                {searchTerm 
                  ? `No projects match your search "${searchTerm}"`
                  : `No projects in ${activeFilter} category`
                }
              </p>
              <button
                onClick={() => {
                  setActiveFilter('All');
                  setSearchTerm('');
                }}
                className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-black hover:text-white border-2 border-white transition-all duration-300"
              >
                View All Projects
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 group"
                >
                  {/* Project Image Placeholder */}
                  <div className="w-full bg-black rounded-t-2xl overflow-hidden border-b border-white/10 aspect-[21/9]">
                    <div className="w-full h-full bg-white flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl text-black mb-2">💻</div>
                        <div className="text-black font-semibold">{project.title}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Header with Status and Featured Badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                            {project.status.replace('-', ' ').toUpperCase()}
                          </span>
                          {project.featured && (
                            <span className="px-2 py-1 bg-white text-black rounded-full text-xs font-medium">
                              FEATURED
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-black text-white text-sm rounded-full border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full border border-white/20">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-white text-sm">
                        <Tag size={14} />
                        <span>{project.category}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white text-sm">
                        <Calendar size={14} />
                        <span>Updated {formatDate(project.dateUpdated)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white text-sm">
                        <Clock size={14} />
                        <span>{getRelativeTime(project.dateUpdated)}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-white/10 hover:bg-white hover:text-black text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-white/20"
                        >
                          <Github size={18} />
                          Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-white text-black hover:bg-black hover:text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-white"
                        >
                          <ExternalLink size={18} />
                          Live
                        </a>
                      )}
                    </div>
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl font-bold text-white mb-4">
              Interested in Collaborating?
            </h2>
            <p className="text-xl text-white mb-6 leading-relaxed">
              I'm always open to discussing new projects and opportunities.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-white text-black font-semibold py-4 px-8 rounded-full hover:bg-black hover:text-white border-2 border-white transition-all duration-300 transform hover:scale-105"
            >
              <span>Get In Touch</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
