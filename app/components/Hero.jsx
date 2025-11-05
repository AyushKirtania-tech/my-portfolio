'use client';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Sparkles, Code } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const yOrbs = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yOrbsSlow = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const springConfig = { stiffness: 150, damping: 15 };
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -50]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* 🔮 Dynamic Background Orbs */}
      <motion.div
        className="absolute -left-24 -top-16 w-96 h-96 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{
          background: 'linear-gradient(120deg,#6366f1,#ec4899)',
          x: mousePosition.x * 0.6,
          y: mousePosition.y * 0.6,
          translateY: yOrbs,
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute -right-20 bottom-0 w-72 h-72 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{
          background: 'linear-gradient(120deg,#f59e0b,#ec4899)',
          x: mousePosition.x * -0.3,
          y: mousePosition.y * -0.3,
          translateY: yOrbsSlow,
        }}
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, -360, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      {/* ✨ Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* 🌟 Main Container */}
      <motion.div
        ref={containerRef}
        className="container z-10 mx-auto px-6 py-36 grid lg:grid-cols-2 gap-10 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 👋 Left Section */}
        <div className="space-y-7">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 glass px-4 py-2 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-muted">Open to internships & freelance</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="block text-lg mb-2 font-medium text-gray-500 dark:text-gray-400">
              👋 Hey there, I'm
            </span>
            <motion.span
              className="gradient-text block relative"
              whileHover={{ scale: 1.02 }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              Ayush Kirtania
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-200 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut', delay: 1 }}
              />
            </motion.span>
            <motion.span className="block text-3xl md:text-4xl mt-3 text-muted" variants={itemVariants}>
              Full Stack Developer
            </motion.span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg text-muted max-w-2xl leading-relaxed">
            I love turning complex problems into clean, elegant solutions.  
            Passionate about crafting experiences with **React**, **Node**, and **Next.js** that are fast, scalable, and beautiful.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex gap-4 flex-wrap">
            <motion.a
              href="#projects"
              className="btn btn-primary flex items-center gap-2"
              aria-label="View Projects"
              whileHover={{ scale: 1.07, x: 6 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              href="#contact"
              className="btn btn-outline"
              aria-label="Contact me"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>

          {/* Socials */}
          <motion.div variants={itemVariants} className="flex gap-3 mt-8">
            {[
              { href: 'https://github.com/AyushKirtania-tech', icon: Github, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/ayush-kirtania-45464021a', icon: Linkedin, label: 'LinkedIn' },
              { href: 'mailto:ayushkirtania@gmail.com', icon: Mail, label: 'Email' },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="glass p-3 rounded-full hover:shadow-[0_0_20px_rgba(147,197,253,0.2)]"
                whileHover={{ scale: 1.2, rotate: 8 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* 💳 Right: Dynamic Profile Card */}
        <motion.div
          variants={itemVariants}
          className="mx-auto perspective-1000"
          style={{ y }}
        >
          <motion.div
            className="glass card max-w-md relative"
            whileHover={{ scale: 1.03, y: -10 }}
            animate={floatingVariants.animate}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-lg" />

            <div className="flex items-center gap-4 relative z-10">
              <motion.div
                className="w-24 h-24 rounded-xl overflow-hidden border-2 border-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 3 }}
              >
                <img
                  src="/Profile_pic.jpeg"
                  alt="Ayush Kirtania"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = '/placeholder-avatar.png')}
                />
              </motion.div>

              <div>
                <motion.div className="text-lg font-semibold" whileHover={{ x: 5 }}>
                  Ayush Kirtania
                </motion.div>
                <div className="text-sm text-muted">MERN · React · Node · Tailwind</div>
              </div>
            </div>

            <motion.div
              className="mt-4 text-sm text-muted relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              3rd-year Computer Science student at Scottish Church College. Hackathon winner (ICDMAI 2025).
            </motion.div>

            <motion.div
              className="mt-6 flex gap-3 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.a
                href="#skills"
                className="btn btn-primary flex-1 text-center shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Code className="w-4 h-4 mr-1" />
                Know My Skills
              </motion.a>
              <motion.a
                href="/Resume/Ayush_Kirtania_CV.pdf"
                className="btn btn-ghost"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Resume
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 🖱 Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-muted uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 border-2 border-muted/30 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1 h-3 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}
