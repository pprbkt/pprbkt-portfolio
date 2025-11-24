'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MessageCircle, MapPin, Github, Linkedin, Twitter, Instagram, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { scrollAnimations, useScrollDirection, getSequentialAnimation } from '@/utils/animations';

export default function Contact() {
  const scrollDirection = useScrollDirection();
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const [heroRef, heroInView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const [contactRef, contactInView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "dhanushhs1@outlook.com",
      href: "mailto:dhanushhs1@outlook.com"
    },
    {
      icon: MessageCircle,
      label: "Text",
      value: "+91 8660833055",
      href: "https://wa.me/918660833055"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Mysuru, Karnataka, India"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/paperbukit",
      color: "hover:text-white"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/paperbukit",
      color: "hover:text-white"
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/paperbukit",
      color: "hover:text-white"
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/paperbukit",
      color: "hover:text-white"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="section-padding relative overflow-hidden pt-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...scrollAnimations.blurIn}
            animate={heroInView ? scrollAnimations.blurIn.animate : scrollAnimations.blurIn.initial}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-6xl md:text-8xl font-bold mb-6">
              <span className="text-white">
                Contact
              </span>
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed">
              Open to opportunities, collaborations, or just talking about code. 
              I check email more often than I'd like to admit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Introduction Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 mb-12">
              <h2 className="font-heading text-3xl font-bold text-white mb-6">
                What We Could Work On
              </h2>
              <p className="text-white text-lg leading-relaxed mb-6 max-w-4xl mx-auto">
                I'm open to projects, job opportunities, or just chatting about tech. Fair warning: I'll probably 
                suggest using Python for everything and ask way too many questions about your tech stack.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-black/50 p-6 rounded-xl border border-white/10">
                  <h3 className="font-heading text-lg font-semibold text-white mb-3">💡 Project Ideas</h3>
                  <p className="text-white text-sm">
                    Got an idea that needs code? I'm good at turning vague requirements into working software.
                  </p>
                </div>
                <div className="bg-black/50 p-6 rounded-xl border border-white/10">
                  <h3 className="font-heading text-lg font-semibold text-white mb-3">🤝 Job Opportunities</h3>
                  <p className="text-white text-sm">
                    Looking for someone who writes decent code and actually reads documentation? Let's talk.
                  </p>
                </div>
                <div className="bg-black/50 p-6 rounded-xl border border-white/10">
                  <h3 className="font-heading text-lg font-semibold text-white mb-3">💬 Tech Talks</h3>
                  <p className="text-white text-sm">
                    Always down to discuss why your framework choice is wrong and mine is obviously superior.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Quick Contact */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-heading text-3xl font-bold text-white mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center">
                    <div className="p-3 bg-white rounded-lg border border-white mr-4">
                      <info.icon size={24} className="text-black" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        {info.label}
                        {info.label === "Text" && ( 
                          <span className="text-white/60 text-sm font-normal ml-2">
                            via WhatsApp - don't call
                          </span>
                        )}
                      </div>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-white hover:text-white transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-white">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Response Time */}
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <h3 className="font-heading text-lg font-semibold text-white mb-3">
                  ⚡ Response Time
                </h3>
                <p className="text-white mb-3">
                  I actually check email regularly and respond within <strong>24 hours</strong> (usually faster):
                </p>
                <ul className="text-white text-sm space-y-1">
                  <li>• Monday - Friday: 9 AM - 6 PM IST</li>
                  <li>• Weekend: Available for interesting opportunities</li>
                  <li>• Email works better than social media pings</li>
                </ul>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Social Links */}
              <div className="mb-8">
                <h3 className="font-heading text-2xl font-semibold text-white mb-6">
                  Connect With Me
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 bg-white/5 rounded-lg text-white border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105"
                      title={social.label}
                    >
                      <social.icon size={24} className="mr-3" />
                      <span className="font-medium">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Resume Download */}
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 mb-8">
                <h3 className="font-heading text-lg font-semibold text-white mb-2">
                  Download Resume
                </h3>
                <p className="text-white mb-4">
                  The formal document that makes me look more impressive than I actually am. 
                  Updated regularly with new mistakes I've learned from.
                </p>
                <a 
                  href="/resume.pdf" 
                  download="Dhanush_Resume.pdf"
                  className="inline-flex items-center bg-white text-black font-semibold py-3 px-6 rounded-full hover:bg-black hover:text-white border-2 border-white transition-all duration-300"
                >
                  <Download size={20} className="mr-2" />
                  Download PDF
                </a>
              </div>

              {/* Availability */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <h3 className="font-heading text-lg font-semibold text-white mb-2">
                  Current Availability
                </h3>
                <p className="text-white mb-2">
                  🟢 <strong className="text-white">Available for:</strong>
                </p>
                <ul className="text-white space-y-1">
                  <li>• Full-time opportunities (after graduation)</li>
                  <li>• Part-time projects and internships</li>
                  <li>• Freelance development work</li>
                  <li>• Open source collaborations</li>
                  <li>• Technical discussions</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <h2 className="font-heading text-4xl font-bold text-white mb-4">
              Let's Build Something That Actually Works
            </h2>
            <p className="text-xl text-white mb-6 leading-relaxed">
              I promise to respond faster than most support tickets and with more enthusiasm than my last performance review suggested.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:dhanushhs1@outlook.com"
                className="inline-flex items-center space-x-2 bg-white text-black font-semibold py-4 px-8 rounded-full hover:bg-black hover:text-white border-2 border-white transition-all duration-300 transform hover:scale-105"
              >
                <span>Send Email Directly</span>
                <ArrowRight size={20} />
              </a>
              <a
                href="https://linkedin.com/in/paperbukit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 border-2 border-white text-white hover:bg-white hover:text-black font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <span>Connect on LinkedIn</span>
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
