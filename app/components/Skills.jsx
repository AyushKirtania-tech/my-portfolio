'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code, Server, Wrench, Globe } from 'lucide-react';

const sections = [
  {
    title: 'Frontend',
    icon: Code,
    skills: [
      { name: 'React', pct: 90, color: 'from-blue-500 to-cyan-500' },
      { name: 'Next.js', pct: 85, color: 'from-yellow-700 to-yellow-900' },
      { name: 'Tailwind', pct: 90, color: 'from-teal-500 to-blue-500' },
      { name: 'Framer Motion', pct: 75, color: 'from-purple-500 to-pink-500' },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js', pct: 85, color: 'from-green-600 to-green-800' },
      { name: 'Express', pct: 80, color: 'from-red-600 to-blue-800' },
      { name: 'MongoDB', pct: 80, color: 'from-green-500 to-emerald-600' },
      { name: 'Postgres', pct: 60, color: 'from-blue-600 to-indigo-700' },
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: [
      { name: 'Git', pct: 90, color: 'from-orange-500 to-red-600' },
      { name: 'VS Code', pct: 95, color: 'from-blue-500 to-blue-700' },
      { name: 'Vercel', pct: 80, color: 'from-blue-800 to-yellow-600' },
      { name: 'Docker (learning)', pct: 45, color: 'from-blue-400 to-blue-600' },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Animated Grid Background */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <motion.h2
            className="text-4xl font-bold text-gray-900 dark:text-white inline-block"
            whileHover={{ scale: 1.05 }}
          >
            Skills & Tools
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-indigo-600 mt-3 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, i) => (
            <SkillSection key={i} section={section} index={i} />
          ))}
        </div>

        {/* Languages Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 px-6 py-4 rounded-2xl border border-blue-100 dark:border-slate-600"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          >
            <Globe className="w-6 h-6 text-indigo-600" />
            <div className="text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">Languages:</strong> English (Fluent),
              Bengali (Native), Hindi (Fluent)
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillSection({ section, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="space-y-6"
    >
      {/* Section Header */}
      <motion.div
        className="flex items-center gap-3 mb-6"
        whileHover={{ x: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <motion.div
          className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <section.icon className="w-6 h-6 text-white" />
        </motion.div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{section.title}</h3>
      </motion.div>

      {/* Skills List */}
      <div className="space-y-5">
        {section.skills.map((skill, idx) => (
          <SkillBar key={idx} skill={skill} index={idx} isInView={isInView} />
        ))}
      </div>
    </motion.div>
  );
}

function SkillBar({ skill, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      {/* Skill Name and Percentage */}
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
        <motion.span
          className="font-medium"
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {skill.name}
        </motion.span>
        <motion.span
          className="font-bold"
          animate={{ scale: isHovered ? 1.15 : 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {skill.pct}%
        </motion.span>
      </div>

      {/* Progress Bar Container */}
      <div className="relative w-full h-3 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
          }}
          animate={{
            x: isHovered ? [0, 20] : 0,
          }}
          transition={{
            duration: 1,
            repeat: isHovered ? Infinity : 0,
            ease: 'linear',
          }}
        />

        {/* Progress Fill */}
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.pct}%` } : {}}
          transition={{
            duration: 1,
            delay: index * 0.1,
            ease: [0.2, 0.9, 0.2, 1],
          }}
          whileHover={{ boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' }}
        >
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: 'easeInOut',
            }}
          />

          {/* Glow Effect on Hover */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.2 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Particle Effect on Hover */}
        {isHovered &&
          [...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${(skill.pct * Math.random()).toFixed(0)}%`,
                top: '50%',
              }}
              initial={{ scale: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                y: [-10, -30],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            />
          ))}
      </div>

      {/* Skill Level Indicator */}
      <motion.div
        className="flex gap-1 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i < Math.ceil(skill.pct / 20)
                ? 'bg-gradient-to-r ' + skill.color
                : 'bg-gray-300 dark:bg-slate-700'
            }`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}