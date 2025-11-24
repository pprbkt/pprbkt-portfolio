'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, ExternalLink, Code, Users, Target } from 'lucide-react'

export default function Experience() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const experience = {
    title: "Python Intern",
    company: "CodSoft",
    duration: "Jul 2025 – Present",
    location: "Remote",
    type: "Internship",
    description: "Working on Python development projects with a focus on building mini-applications using Tkinter and strengthening version control skills with GitHub. The internship follows a self-paced learning approach with weekly deliverables.",
    responsibilities: [
      "Built mini-projects using Python + Tkinter for desktop application development",
      "Implemented logic-heavy applications focusing on problem-solving and algorithm design",
      "Used GitHub for version control, learning best practices for code management and collaboration",
      "Participated in remote, self-paced learning with structured weekly deliverables",
      "Developed proficiency in Python GUI programming and software architecture",
      "Collaborated with team members through digital platforms and code reviews"
    ],
    skills: ["Python", "Tkinter", "Git", "GitHub", "GUI Development", "Software Design", "Remote Collaboration"],
    achievements: [
      "Successfully completed multiple Python projects within tight deadlines",
      "Improved code quality and documentation standards",
      "Gained hands-on experience in software development lifecycle"
    ]
  }

  const timelineItems = [
    {
      date: "Jul 2025",
      title: "Started Python Internship at CodSoft",
      description: "Began focused Python development internship",
      type: "work"
    },
    {
      date: "2024",
      title: "Started B.E. in Computer Science (AIML)",
      description: "Enrolled at Vidyavardhaka College of Engineering",
      type: "education"
    },
    {
      date: "2023",
      title: "First Programming Project",
      description: "Built first web application using HTML, CSS, and JavaScript",
      type: "project"
    }
  ]

  const skills = [
    { category: "Programming Languages", items: ["Python", "C++", "JavaScript"] },
    { category: "Frameworks & Libraries", items: ["Flask", "React", "Tkinter", "LangChain"] },
    { category: "Tools & Technologies", items: ["Git", "GitHub", "VS Code", "Jupyter"] },
    { category: "AI/ML", items: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow"] },
    { category: "Databases", items: ["SQLite", "Firebase"] },
    { category: "Web Technologies", items: ["HTML5", "CSS3", "Responsive Design"] }
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Experience
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              My professional journey and the experiences that have shaped my skills 
              and passion for technology and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Current Experience */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            {...fadeIn}
            className="card p-8 mb-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                  {experience.title}
                </h2>
                <h3 className="text-xl text-primary-600 font-semibold mb-2">
                  {experience.company}
                </h3>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2" />
                    <span>{experience.location}</span>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                    {experience.type}
                  </span>
                </div>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="p-4 bg-primary-100 rounded-lg text-center">
                  <div className="text-2xl font-bold text-primary-600">6+</div>
                  <div className="text-sm text-primary-800">Months</div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {experience.description}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Responsibilities */}
              <div>
                <h4 className="font-heading text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Target size={20} className="mr-2 text-primary-600" />
                  Key Responsibilities
                </h4>
                <ul className="space-y-3">
                  {experience.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="font-heading text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Users size={20} className="mr-2 text-primary-600" />
                  Key Achievements
                </h4>
                <ul className="space-y-3">
                  {experience.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Skills Used */}
            <div className="mt-8">
              <h4 className="font-heading text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Code size={20} className="mr-2 text-primary-600" />
                Technologies & Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            {...fadeIn}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">
              Professional Timeline
            </h2>
            <p className="text-gray-600">
              Key milestones in my educational and professional journey
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-0.5 w-0.5 h-full bg-primary-200"></div>

            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                {...fadeIn}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-center mb-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center ${
                  item.type === 'work' ? 'bg-primary-600' :
                  item.type === 'education' ? 'bg-green-600' :
                  'bg-blue-600'
                }`}>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="text-sm text-primary-600 font-semibold mb-1">
                      {item.date}
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            {...fadeIn}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">
              Technical Skills
            </h2>
            <p className="text-gray-600">
              Technologies and tools I've mastered through hands-on experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                {...fadeIn}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl"
              >
                <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4">
                  {skillGroup.category}
                </h3>
                <div className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <div
                      key={skill}
                      className="px-3 py-2 bg-white text-gray-700 rounded-lg text-sm font-medium"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <h2 className="font-heading text-3xl font-bold mb-4">
              Ready to Bring Value to Your Team
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              I'm passionate about applying my skills to real-world challenges 
              and contributing to innovative projects. Let's discuss how I can 
              help achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-all duration-300"
              >
                Get In Touch
              </a>
              <a
                href="/projects"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-all duration-300"
              >
                View My Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
