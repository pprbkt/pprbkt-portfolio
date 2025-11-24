import Link from 'next/link'
import { Github, Linkedin, Twitter, Instagram, Heart, Coffee } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div>
            <h3 className="font-heading font-bold text-2xl mb-4 text-white">
              Dhanush<span className="text-white">.</span>HS
            </h3>
            <p className="text-white mb-4">
              Computer Science Student
            </p>
            <p className="text-white text-sm leading-relaxed">
              Building software and learning through projects. 
              Focused on AI/ML and web development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/projects" className="text-white hover:text-black hover:bg-white transition-all duration-200 flex items-center group px-2 py-1 rounded">
                  <span className="w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="text-white hover:text-black hover:bg-white transition-all duration-200 flex items-center group px-2 py-1 rounded">
                  <span className="w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                  Certifications
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-black hover:bg-white transition-all duration-200 flex items-center group px-2 py-1 rounded">
                  <span className="w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Connect</h4>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <a
                href="https://github.com/paperbukit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-black rounded-xl border border-white/10 hover:bg-white hover:text-black transition-all duration-300 group"
              >
                <Github size={20} className="text-white group-hover:text-black" />
                <span className="text-white group-hover:text-black text-sm">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/paperbukit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-black rounded-xl border border-white/10 hover:bg-white hover:text-black transition-all duration-300 group"
              >
                <Linkedin size={20} className="text-white group-hover:text-black" />
                <span className="text-white group-hover:text-black text-sm">LinkedIn</span>
              </a>
              <a
                href="https://twitter.com/paperbukit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-black rounded-xl border border-white/10 hover:bg-white hover:text-black transition-all duration-300 group"
              >
                <Twitter size={20} className="text-white group-hover:text-black" />
                <span className="text-white group-hover:text-black text-sm">Twitter</span>
              </a>
              <a
                href="https://instagram.com/paperbukit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-black rounded-xl border border-white/10 hover:bg-white hover:text-black transition-all duration-300 group"
              >
                <Instagram size={20} className="text-white group-hover:text-black" />
                <span className="text-white group-hover:text-black text-sm">Instagram</span>
              </a>
            </div>
            <div className="p-4 bg-black rounded-xl border border-white/10">
              <a
                href="mailto:dhanushhs1@outlook.com"
                className="text-white hover:text-black hover:bg-white transition-colors text-sm block px-2 py-1 rounded"
              >
                dhanushhs1@outlook.com
              </a>
              <p className="text-white text-xs mt-1">Available for opportunities (and debugging sessions)</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm">
            © 2025 Dhanush HS. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <p className="text-white text-sm flex items-center">
              Built with <Heart size={16} className="mx-1 text-white" /> and way too much{' '}
              <Coffee size={16} className="mx-1 text-white" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
