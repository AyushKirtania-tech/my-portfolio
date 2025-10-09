'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Decorative orbs */}
      <div className="absolute -left-24 -top-16 w-96 h-96 rounded-full floaty opacity-30 pointer-events-none" style={{ background: 'linear-gradient(90deg,#7c3aed,#fb7185)' }} />
      <div className="absolute -right-24 -bottom-24 w-72 h-72 rounded-full floaty opacity-20 pointer-events-none" style={{ background: 'linear-gradient(90deg,#f59e0b,#ec4899)' }} />

      <div className="container z-10 mx-auto px-6 py-36 grid lg:grid-cols-2 gap-10 items-center">
        {/* Left: Text */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-3">
            <span className="pulse" aria-hidden="true"></span>
            <div className="text-sm text-muted">Open to internships & freelance</div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }} className="text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="gradient-text">Ayush</span>
            <span className="block text-3xl md:text-4xl mt-2 text-muted">Kirtania — Full Stack Developer</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }} className="text-lg text-muted max-w-2xl">
            I build fast, accessible and delightful web apps using the MERN stack. I care about performance, UX and clean, maintainable code.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.24 }} className="flex gap-4 flex-wrap">
            <a href="#projects" className="btn btn-primary" aria-label="View Projects">
              View Projects <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="btn btn-outline" aria-label="Contact me">
              Get in Touch
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.32 }} className="flex gap-3 mt-6">
            <a href="https://github.com/AyushKirtania-tech" target="_blank" rel="noreferrer" className="glass p-2 rounded-full">
              <Github />
            </a>
            <a href="https://www.linkedin.com/in/ayush-kirtania-45464021a" target="_blank" rel="noreferrer" className="glass p-2 rounded-full">
              <Linkedin />
            </a>
            <a href="mailto:ayushkirtania@gmail.com" className="glass p-2 rounded-full">
              <Mail />
            </a>
          </motion.div>
        </div>

        {/* Right: Profile card */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="mx-auto">
          <div className="glass card max-w-md">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden border border-card-border">
                <img
                  src="/Profile_pic.jpeg"
                  alt="Ayush Kirtania"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = '/placeholder-avatar.png'; }}
                />
              </div>

              <div>
                <div className="text-lg font-semibold">Ayush Kirtania</div>
                <div className="text-sm text-muted">MERN · React · Node · Tailwind</div>
              </div>
            </div>

            <div className="mt-4 text-sm text-muted">
              3rd-year Computer Science student at Scottish Church College. Hackathon winner (ICDMAI 2025).
            </div>

            <div className="mt-6 flex gap-3">
              <a href="#contact" className="btn btn-primary flex-1 text-center">Contact</a>
              <a href="/Ayush_Kirtania_CV.pdf" className="btn btn-ghost" download>Resume</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
