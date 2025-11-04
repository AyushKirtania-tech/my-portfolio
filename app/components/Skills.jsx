'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  // Frontend
  { name: 'React', icon: 'react', color: '#61DAFB' },
  { name: 'Next.js', icon: 'nextdotjs', color: '#000000' },
  { name: 'JavaScript', icon: 'javascript', color: '#F7DF1E' },
  { name: 'TypeScript', icon: 'typescript', color: '#3178C6' },
  { name: 'Tailwind CSS', icon: 'tailwindcss', color: '#06B6D4' },
  { name: 'HTML5', icon: 'html5', color: '#E34F26' },
  { name: 'Framer Motion', icon: 'framer', color: '#FF0055' },

  // Backend
  { name: 'Node.js', icon: 'nodedotjs', color: '#339933' },
  { name: 'Express', icon: 'express', color: '#000000' },
  { name: 'MongoDB', icon: 'mongodb', color: '#47A248' },
  { name: 'PostgreSQL', icon: 'postgresql', color: '#4169E1' },

  // Tools
  { name: 'Git', icon: 'git', color: '#F05032' },
  { name: 'Docker', icon: 'docker', color: '#2496ED' },
  { name: 'Vercel', icon: 'vercel', color: '#000000' },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <>
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

      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Tools
          </h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-6 md:gap-8"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            visible: {
              transition: { staggerChildren: 0.05 },
            },
          }}
        >
          {skills.map((skill, index) => {
            const iconUrl =
              skill.color === '#000000'
                ? `https://cdn.simpleicons.org/${skill.icon}`
                : `https://cdn.simpleicons.org/${skill.icon}/${skill.color.replace('#', '')}`;

            const isDarkIcon = skill.color === '#000000';

            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.5 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.2,
                  y: -8,
                  transition: { duration: 0.2 },
                }}
                className="group relative"
              >
                <div className="flex flex-col items-center gap-2">
                  {/* Icon Container */}
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 shadow-lg transition-all duration-300 group-hover:shadow-2xl relative overflow-hidden"
                    style={{
                      borderColor: skill.color,
                      borderWidth: '2px',
                    }}
                  >
                    {/* Hover Glow */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle, ${skill.color} 0%, transparent 70%)`,
                      }}
                    />

                    {/* Simplified hover animation */}
                    <motion.img
                      src={iconUrl}
                      alt={`${skill.name} icon`}
                      className={`w-8 h-8 md:w-9 md:h-9 relative z-10 ${
                        isDarkIcon ? 'dark:invert' : ''
                      }`}
                      onError={(e) => {
                        e.currentTarget.src = 'https://cdn.simpleicons.org/react/808080';
                      }}
                      whileHover={{
                        rotate: 10,
                        scale: 1.1,
                      }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    />

                    {/* Shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{
                        x: '100%',
                        transition: { duration: 0.6, ease: 'easeInOut' },
                      }}
                    />
                  </div>

                  {/* Skill Name */}
                  <motion.span
                    className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-8 whitespace-nowrap"
                    initial={{ y: -10 }}
                    whileHover={{ y: 0 }}
                  >
                    {skill.name}
                  </motion.span>
                </div>

                {/* Floating Particle Removed */}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Languages Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 bg-white dark:bg-slate-800 px-6 py-4 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700">
            <span className="text-2xl">🌍</span>
            <div className="text-left">
              <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Languages
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                English (Fluent) • Bengali (Native) • Hindi (Fluent)
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}