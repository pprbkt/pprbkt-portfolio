'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, ExternalLink, Tag } from 'lucide-react';
import Link from 'next/link';

export default function Articles() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const articles = [
    {
      id: 1,
      title: "Building Scalable AI Applications with LangChain",
      excerpt: "A deep dive into creating production-ready AI applications using LangChain, covering best practices and real-world implementations.",
      date: "2024-12-15",
      readTime: "8 min read",
      category: "AI/ML",
      tags: ["LangChain", "Python", "AI", "OpenAI"],
      featured: true
    },
    {
      id: 2,
      title: "Modern React Patterns for Full-Stack Development",
      excerpt: "Exploring advanced React patterns and hooks that make your applications more maintainable and performant.",
      date: "2024-11-28",
      readTime: "6 min read",
      category: "Frontend",
      tags: ["React", "TypeScript", "Hooks", "Patterns"]
    },
    {
      id: 3,
      title: "Database Design for Modern Web Applications",
      excerpt: "Best practices for designing efficient and scalable databases using SQLite and PostgreSQL.",
      date: "2024-11-10",
      readTime: "10 min read",
      category: "Backend",
      tags: ["Database", "SQLite", "PostgreSQL", "Design"]
    },
    {
      id: 4,
      title: "Python Automation Scripts for Developers",
      excerpt: "Collection of useful Python scripts that can automate your daily development workflow.",
      date: "2024-10-22",
      readTime: "5 min read",
      category: "Python",
      tags: ["Python", "Automation", "Scripts", "Productivity"]
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-24">
      {/* Header */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn}>
            <h1 className="font-heading text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-white">Articles</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Thoughts, tutorials, and insights about web development, AI, and technology. 
              Sharing knowledge from my journey as a full-stack developer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-3xl p-8 lg:p-12 border border-white/10 backdrop-blur-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="px-4 py-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm rounded-full">
                      Featured
                    </span>
                    <span className="text-gray-400 text-sm">{articles[0].category}</span>
                  </div>
                  
                  <h2 className="font-heading text-4xl font-bold text-white mb-4">
                    {articles[0].title}
                  </h2>
                  
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {articles[0].excerpt}
                  </p>
                  
                  <div className="flex items-center space-x-6 mb-6 text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span className="text-sm">{new Date(articles[0].date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} />
                      <span className="text-sm">{articles[0].readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {articles[0].tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <motion.button 
                    className="bg-white text-black font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span>Read Article</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
                
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl border border-white/10 flex items-center justify-center">
                    <div className="text-6xl">📝</div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
            <h2 className="font-heading text-4xl font-bold text-white mb-12 text-center">
              Recent Articles
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((article, index) => (
              <motion.article
                key={article.id}
                {...fadeIn}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-gray-800/50 transition-all duration-500 transform hover:-translate-y-2 h-full">
                  {/* Article Image */}
                  <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                    <div className="text-4xl">
                      {article.category === 'Frontend' && '⚛️'}
                      {article.category === 'Backend' && '🗄️'}
                      {article.category === 'Python' && '🐍'}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Category */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      article.category === 'Frontend' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                      article.category === 'Backend' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                      'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                    }`}>
                      {article.category}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} />
                      <span>{new Date(article.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={14} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/5 border border-white/10 text-gray-400 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 2 && (
                      <span className="px-2 py-1 bg-white/5 border border-white/10 text-gray-400 text-xs rounded-full">
                        +{article.tags.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Read More */}
                  <div className="flex items-center text-gray-400 hover:text-white transition-colors group/link">
                    <span className="mr-2">Read More</span>
                    <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn} transition={{ delay: 0.8 }}>
            <h2 className="font-heading text-4xl font-bold text-white mb-6">
              More Articles Coming Soon
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              I'm constantly learning and sharing my knowledge. Subscribe to stay updated 
              with new articles about web development, AI, and technology trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button 
                  className="bg-white text-black font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Get Notified
                </motion.button>
              </Link>
              <Link href="/projects">
                <button className="border border-white/20 text-white font-semibold py-3 px-6 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                  View Projects
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
