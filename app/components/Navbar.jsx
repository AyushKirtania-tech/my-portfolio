'use client';
import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Download, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [theme, setTheme] = useState('light');
  const [profileOpen, setProfileOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  // 🌗 Theme setup
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = stored || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
  };

  return (
    <nav className="fixed w-full z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-gray-200/20 dark:border-slate-800/20 transition-all duration-300">
      {/* Scroll Progress Bar */}
      <motion.div
        className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex justify-between items-center h-16">
        {/* Left — Logo */}
        <a
          href="#home"
          className="text-xl font-semibold text-gray-900 dark:text-white hover:opacity-80 transition-opacity select-none"
        >
          AK
        </a>

        {/* Right — Actions */}
        <div className="flex items-center gap-5 relative">
          {/* Resume */}
          <a
            href="/Resume/Ayush_Kirtania_CV.pdf"
            download
            className="group relative inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-purple-400 transition-all"
          >
            <Download className="w-4 h-4" />
            Resume
            <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <motion.img
              src="./Profile_pic.jpeg"
              alt="Profile"
              className="w-9 h-9 rounded-full border cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setProfileOpen(!profileOpen)}
            />

            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-44 bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-gray-200/30 dark:border-slate-700/50 p-3"
              >
                <a
                  href="https://github.com/AyushKirtania-tech"
                  target="_blank"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/ayush-kirtania-45464021a"
                  target="_blank"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href="mailto:ayushkirtania@gmail.com"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
