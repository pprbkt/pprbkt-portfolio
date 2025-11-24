'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Download, ExternalLink, MapPin, Calendar, Code2, Database, Globe, Smartphone, Code, Brain, Coffee, Gamepad2, Monitor, Tv } from 'lucide-react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { scrollAnimations, useScrollDirection, getSequentialAnimation } from '@/utils/animations';
import { getAllProjects, type Project } from '@/utils/projectsUtils';
import { getAllWorkExperience, formatDateRange, calculateDuration, getTotalExperienceYears, type WorkExperience } from '@/utils/workExperienceUtils';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const scrollDirection = useScrollDirection();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalExperienceYears, setTotalExperienceYears] = useState(0);
  
  const [heroRef, heroInView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Load current project and featured projects
  useEffect(() => {
    try {
      const projects = getAllProjects();
      // Find the most recent in-progress project, or fallback to most recent project
      const inProgressProject = projects.find(p => p.status === 'in-progress');
      const currentProj = inProgressProject || projects[0]; // First project (most recent)
      setCurrentProject(currentProj);
      
      // Get only projects that are currently in progress
      const inProgressProjects = projects.filter(p => p.status === 'in-progress');
      setFeaturedProjects(inProgressProjects);
      
      // Set total projects count
      setTotalProjects(projects.length);
      
      // Load work experience from database
      const workExp = getAllWorkExperience();
      setWorkExperience(workExp);
      
      // Calculate total experience years
      const expYears = getTotalExperienceYears();
      setTotalExperienceYears(expYears);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }, []);

  const [aboutRef, aboutInView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const [workRef, workInView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const [skillsRef, skillsInView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const [connectRef, connectInView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <motion.div
              {...scrollAnimations.fadeInLeft}
              animate={heroInView ? scrollAnimations.fadeInLeft.animate : scrollAnimations.fadeInLeft.initial}
              className="text-left"
            >
              <motion.h1 
                className="font-heading text-6xl lg:text-8xl font-bold mb-6 leading-tight"
                {...scrollAnimations.blurIn}
                animate={heroInView ? scrollAnimations.blurIn.animate : scrollAnimations.blurIn.initial}
              >
                AI/ML
                <br />
                <motion.span 
                  className="text-white"
                  {...scrollAnimations.scaleInBounce}
                  animate={heroInView ? scrollAnimations.scaleInBounce.animate : scrollAnimations.scaleInBounce.initial}
                >
                  Engineer
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-white text-xl mb-8 max-w-lg leading-relaxed"
                {...scrollAnimations.fadeInUp}
                animate={heroInView ? scrollAnimations.fadeInUp.animate : scrollAnimations.fadeInUp.initial}
              >
                CS student based in Bangalore, India who builds things with code. Sometimes they work.
              </motion.p>

              {/* Social Links */}
              <motion.div 
                className="flex items-center space-x-6 mb-8"
                {...scrollAnimations.staggerContainer}
                animate={heroInView ? scrollAnimations.staggerContainer.animate : {}}
              >
                <motion.a
                  href="https://github.com/paperbukit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-black transition-colors"
                  {...scrollAnimations.scaleIn}
                  animate={heroInView ? scrollAnimations.scaleIn.animate : scrollAnimations.scaleIn.initial}
                >
                  <Github size={24} />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/paperbukit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-black transition-colors"
                  {...scrollAnimations.rotateIn}
                  animate={heroInView ? scrollAnimations.rotateIn.animate : scrollAnimations.rotateIn.initial}
                >
                  <Linkedin size={24} />
                </motion.a>
                <motion.a
                  href="mailto:dhanushhs1@outlook.com"
                  className="text-white hover:text-black transition-colors"
                  {...scrollAnimations.elasticIn}
                  animate={heroInView ? scrollAnimations.elasticIn.animate : scrollAnimations.elasticIn.initial}
                >
                  <Mail size={24} />
                </motion.a>
                <motion.span 
                  className="text-white"
                  {...scrollAnimations.fadeInUp}
                  animate={heroInView ? scrollAnimations.fadeInUp.animate : scrollAnimations.fadeInUp.initial}
                >|</motion.span>
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white transition-colors text-sm"
                  {...scrollAnimations.flipX}
                  animate={heroInView ? scrollAnimations.flipX.animate : scrollAnimations.flipX.initial}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Resume
                </motion.a>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                {...scrollAnimations.scaleInBounce}
                animate={heroInView ? scrollAnimations.scaleInBounce.animate : scrollAnimations.scaleInBounce.initial}
              >
                <Link href="/projects">
                  <motion.button 
                    className="bg-white text-black font-semibold py-4 px-8 rounded-full hover:bg-white/90 transition-all duration-300 flex items-center space-x-3 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Projects</span>
                    <motion.div
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <ArrowRight size={20} />
                    </motion.div>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side - Projects Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              {featuredProjects.length > 0 && (
                <>
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-sm text-white uppercase tracking-wider mb-2">Current Work</h3>
                    <p className="text-white/70 text-sm">Projects currently in development</p>
                  </div>
                  
                  {/* Projects Stack */}
                  <div className="space-y-4">
                    {featuredProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 + (index * 0.2) }}
                        className={`bg-white/10 rounded-2xl p-4 border border-white/30 backdrop-blur-sm relative ${
                          index === 0 ? 'ring-2 ring-white/20' : ''
                        }`}
                      >
                        {/* Project Status & Title */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {project.status === 'in-progress' && (
                              <>
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-xs text-green-400 font-medium">ACTIVE</span>
                              </>
                            )}
                            {project.status === 'completed' && (
                              <span className="text-xs text-blue-400 font-medium">COMPLETED</span>
                            )}
                          </div>
                          <span className="text-xs text-white/60">{project.category}</span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-white mb-2">
                          {project.title}
                        </h4>
                        <p className="text-white/80 text-sm mb-3 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 2).map((tech) => (
                              <span key={tech} className="px-2 py-1 bg-white/20 text-white text-xs rounded border border-white/30">
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 2 && (
                              <span className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded border border-white/20">
                                +{project.technologies.length - 2}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {project.githubUrl && (
                              <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-white/70 transition-colors"
                                whileHover={{ scale: 1.1 }}
                              >
                                <Github size={14} />
                              </motion.a>
                            )}
                            {project.liveUrl && (
                              <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-white/70 transition-colors"
                                whileHover={{ scale: 1.1 }}
                              >
                                <ExternalLink size={14} />
                              </motion.a>
                            )}
                          </div>
                        </div>
                        
                        {/* Highlight ring for active project */}
                        {index === 0 && (
                          <div className="absolute -inset-0.5 bg-white/20 rounded-2xl -z-10 blur-sm"></div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* View All Projects Link */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="mt-6 text-center"
                  >
                    <Link href="/projects">
                      <motion.button 
                        className="text-white hover:text-white/70 transition-colors text-sm flex items-center gap-2 mx-auto"
                        whileHover={{ x: 5 }}
                      >
                        <span>View All Projects</span>
                        <ArrowRight size={14} />
                      </motion.button>
                    </Link>
                  </motion.div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                </>
              )}

              {/* Fallback if no projects are loaded */}
              {featuredProjects.length === 0 && (
                <div className="bg-white/10 rounded-3xl p-6 border border-white/50 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="animate-pulse">
                      <div className="h-4 bg-white/20 rounded w-1/3 mx-auto mb-4"></div>
                      <div className="h-6 bg-white/30 rounded w-2/3 mx-auto mb-2"></div>
                      <div className="h-16 bg-white/20 rounded mb-4"></div>
                      <div className="flex gap-2 justify-center">
                        <div className="h-6 bg-white/20 rounded w-16"></div>
                        <div className="h-6 bg-white/20 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left - About Text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-sm text-white uppercase tracking-wider mb-4">About Me</h2>
                <h3 className="font-heading text-4xl font-bold text-white mb-6">
                  CS student who codes stuff
                </h3>
                <p className="text-white leading-relaxed mb-6">
                  I write code that sometimes works on the first try. Currently studying CS at VVCE 
                  while building random projects that solve problems I probably created myself.
                </p>
                <p className="text-white leading-relaxed mb-6">
                  Made a PDF chatbot because reading papers is hard, an Elden Ring checklist because 
                  my memory is worse, and some productivity apps that I don't actually use. 
                  Apparently people find this stuff useful, so here we are.
                </p>
              </div>

              {/* Background & Interests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">The Facts</h4>
                  <div className="space-y-2 text-sm text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      <span>CS student at VVCE</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      <span>Python since 2023</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      <span>Builds apps, uses none</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Things I Do</h4>
                  <div className="space-y-2 text-sm text-white">
                    <div className="flex items-center gap-2">
                      <Code size={14} className="text-white" />
                      <span>Write questionable code</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Brain size={14} className="text-white" />
                      <span>Pretend to understand AI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gamepad2 size={14} className="text-white" />
                      <span>Die repeatedly in Elden Ring</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold mb-4">Tech Stack</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-white">AI & ML</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white text-black text-xs rounded border border-white">Python</span>
                      <span className="px-3 py-1 bg-white text-black text-xs rounded border border-white">LangChain</span>
                      <span className="px-3 py-1 bg-white text-black text-xs rounded border border-white">Streamlit</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-white">Web Dev</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white text-black text-xs rounded border border-white">React</span>
                      <span className="px-3 py-1 bg-white text-black text-xs rounded border border-white">TypeScript</span>
                      <span className="px-3 py-1 bg-white text-black text-xs rounded border border-white">Next.js</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <h4 className="text-white font-semibold mb-3">Education</h4>
                <div>
                  <h5 className="text-white font-medium">Vidyavardhaka College of Engineering</h5>
                  <p className="text-white text-sm">Bachelor of Engineering - Computer Science (AIML)</p>
                  <p className="text-white text-xs">Mysuru, Karnataka • Currently Pursuing</p>
                </div>
              </div>
            </motion.div>

            {/* Right - Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-black rounded-3xl border border-white/10 overflow-hidden">
                {/* Professional photo */}
                <img 
                  src="/pp.jpg" 
                  alt="Professional headshot" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-black/80 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{totalProjects}+</div>
                  <div className="text-xs text-white">Projects</div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-black/80 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{totalExperienceYears > 1 ? `${totalExperienceYears}+` : '0.1'}</div>
                  <div className="text-xs text-white">Years Exp</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Experience Timeline */}
      <section ref={workRef} className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={workInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl font-bold text-white mb-6">Work</h2>
            <p className="text-white text-lg max-w-2xl mx-auto">
              My professional experience and internships
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="space-y-12">
            {workExperience.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 50 }}
                animate={workInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + (index * 0.2) }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
              >
                <div className="text-right">
                  <div className="text-lg font-semibold text-white">
                    {formatDateRange(work.startDate, work.endDate)}
                  </div>
                  {work.current && (
                    <div className="text-white">Current</div>
                  )}
                </div>
                <div className="flex justify-center">
                  <div className={`w-4 h-4 rounded-full border-4 border-black ${
                    work.current ? 'bg-green-500' : 'bg-white'
                  }`}></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{work.company}</h3>
                  <p className="text-white mb-2">
                    {work.title} | {work.type} | {work.location}
                  </p>
                  <p className="text-white text-sm mb-3">
                    {work.description}
                  </p>
                  {work.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {work.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-white/20 text-white text-xs rounded border border-white/30">
                          {tech}
                        </span>
                      ))}
                      {work.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded border border-white/20">
                          +{work.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="mt-4">
                    <span className="text-white text-xs">Duration</span>
                    <div className="text-white text-sm">{calculateDuration(work.startDate, work.endDate)}</div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Fallback if no work experience */}
            {workExperience.length === 0 && (
              <div className="text-center">
                <div className="text-white/70">No work experience data available</div>
              </div>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
