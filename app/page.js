'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import SectionWrapper from './components/SectionWrapper';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <>
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-8 h-8 pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-30 blur-sm" />
      </motion.div>
      <motion.div
        className="fixed w-2 h-2 pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: 13,
          translateY: 13,
        }}
      >
        <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full border-2 border-blue-500" />
      </motion.div>

      <Navbar />

      <main className="relative">
        {/* Hero stays in a normal section, as it has its own animations */}
        <section id="home">
          <Hero />
        </section>
        
        {/* Replaced <section> with <SectionWrapper> */}
        <SectionWrapper 
          id="about" 
          className="py-24 bg-gray-50 dark:bg-slate-900 relative overflow-hidden"
        >
          <About />
        </SectionWrapper>
        
        <SectionWrapper 
          id="projects" 
          className="section bg-transparent relative overflow-hidden"
        >
          <Projects />
        </SectionWrapper>
        
        <SectionWrapper 
          id="skills" 
          className="py-24 bg-gray-50 dark:bg-slate-900 relative overflow-hidden"
        >
          <Skills />
        </SectionWrapper>
        
        <SectionWrapper 
          id="contact" 
          className="section relative overflow-hidden"
        >
          <Contact />
        </SectionWrapper>
      </main>

      {/* Enhanced Footer */}
      <motion.footer
        className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 py-12 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-pink-400 to-yellow-400 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <motion.div
              className="text-gray-600 dark:text-gray-400 text-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} Ayush Kirtania. Built with{' '}
              <motion.span
                className="inline-block text-red-500"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                ♥
              </motion.span>{' '}
              using Next.js
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {[
                {
                  name: 'GitHub',
                  href: 'https://github.com/AyushKirtania-tech',
                },
                {
                  name: 'LinkedIn',
                  href: 'https://www.linkedin.com/in/ayush-kirtania-45464021a',
                },
                {
                  name: 'Email',
                  href: 'mailto:ayushkirtania@gmail.com',
                },
              ].map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </>
  );
}