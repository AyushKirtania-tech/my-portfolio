'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Sparkles } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Two soft, static background blobs — no motion, kept subtle */}
      <div
        className="absolute -left-24 -top-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'linear-gradient(120deg,#6366f1,#ec4899)' }}
      />
      <div
        className="absolute -right-20 bottom-0 w-56 h-56 sm:w-72 sm:h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'linear-gradient(120deg,#f59e0b,#ec4899)' }}
      />

      <motion.div
        className="container z-10 mx-auto px-4 sm:px-6 py-24 sm:py-28 lg:py-32 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left — the only place CTAs live, so nothing is duplicated below */}
        <div className="space-y-5 sm:space-y-6">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-xs sm:text-sm text-muted">Open to internships & freelance</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="block text-base sm:text-lg mb-2 font-medium text-gray-500 dark:text-gray-400">
              👋 Hey there, I'm
            </span>
            <span className="gradient-text block">Ayush Kirtania</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl mt-2 text-muted">
              Full Stack Developer
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-base sm:text-lg text-muted max-w-xl leading-relaxed">
            I love turning complex problems into clean, elegant solutions — crafting
            experiences with React, Node, and Next.js that are fast, scalable, and beautiful.
          </motion.p>

          <motion.p variants={itemVariants} className="text-sm text-muted">
            4th-year CS student, Scottish Church College · Hackathon winner (ICDMAI 2025)
          </motion.p>

          {/* The only CTA row in the whole Hero */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 pt-1">
            <a
              href="#projects"
              className="btn btn-primary justify-center gap-2 w-full sm:w-auto"
              aria-label="View Projects"
            >
              View Projects <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="btn btn-outline justify-center w-full sm:w-auto"
              aria-label="Contact me"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Socials + resume, one compact row — nothing repeated further down */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 pt-2">
            {[
              { href: 'https://github.com/AyushKirtania-tech', icon: Github, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/ayush-kirtania-45464021a', icon: Linkedin, label: 'LinkedIn' },
              { href: 'mailto:ayushkirtania@gmail.com', icon: Mail, label: 'Email' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="glass p-3 rounded-full"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
            <a
              href="/Resume/Ayush_Kirtania_CV.pdf"
              download
              className="text-sm font-medium text-muted hover:text-[var(--accent)] underline underline-offset-4 ml-1"
            >
              Download résumé
            </a>
          </motion.div>
        </div>

        {/* Right — profile card, desktop/tablet only. On mobile this was
            duplicating the left column's info and CTAs, which is exactly
            what made the page feel crowded, so it's hidden below lg. */}
        <motion.div variants={itemVariants} className="hidden lg:block mx-auto w-full max-w-md">
          <div className="glass card">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 border-blue-500/40 shadow-lg">
                <img
                  src="/Profile_pic.jpeg"
                  alt="Ayush Kirtania"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = '/placeholder-avatar.png')}
                />
              </div>
              <div className="min-w-0">
                <div className="text-lg font-semibold truncate">Ayush Kirtania</div>
                <div className="text-sm text-muted">MERN · React · Node · Tailwind</div>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted leading-relaxed">
              Building scalable, delightful web experiences — with a growing side project
              in independent brand design (DRIPDUO).
            </p>

            <a
              href="#skills"
              className="btn btn-ghost w-full justify-center mt-5"
            >
              See my skills
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <a href="#about" className="flex flex-col items-center gap-2 cursor-pointer">
          <span className="text-xs text-muted uppercase tracking-wider">Scroll</span>
          <motion.div
            className="w-6 h-10 border-2 border-muted/30 rounded-full flex justify-center pt-2"
          >
            <motion.div
              className="w-1 h-3 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}