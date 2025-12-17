'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Code2 } from 'lucide-react';
import { useRef, useState } from 'react';

export default function Projects() {
  const projects = [
    {
      title: 'FUXI AI',
      year: '2025',
      description: 'Privacy-first Chrome Extension utilizing on-device Gemini Nano AI.',
      tech: ['React', 'Vite', 'Gemini Nano', 'Tailwind'],
      image: '/projects/logo.png',
      live: 'https://github.com/AyushKirtania-tech/FUXI-AI.git',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'OTP Auth System',
      year: '2025',
      description: 'Scalable full-stack auth with SMS verification and Redis queuing.',
      tech: ['Next.js', 'Node.js', 'Redis', 'Prisma'],
      image: '/projects/otp.png', 
      live: 'https://github.com/AyushKirtania-tech/otp-auth',
      color: 'from-violet-600 to-indigo-600',
    },
    {
      title: 'Portfolio Website',
      year: '2025',
      description: 'This portfolio — modernized with Tailwind and animations.',
      tech: ['Next.js', 'Tailwind', 'Framer Motion'],
      image: '/projects/portfolio.png',
      live: '#',
      color: 'from-blue-500 to-purple-500',
    },
    {
      title: 'F1UpToDates',
      year: '2024',
      description: 'Formula 1 info hub with circuits and race data.',
      tech: ['HTML', 'CSS', 'JS'],
      image: '/projects/F1.png',
      live: 'https://f1-up-to-dates.vercel.app/',
      color: 'from-red-500 to-orange-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.9, 0.2, 1],
      },
    },
  };

  return (
    <>
      {/* Background Decorative Elements */}
      <motion.div
        className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="container relative z-10">
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <motion.h2
              className="text-3xl md:text-4xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Selected Work
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-brand-500 to-brand-600 mt-3 rounded-sm"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <Code2 className="w-12 h-12 text-muted opacity-20" />
          </motion.div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="https://github.com/AyushKirtania-tech"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View all projects on GitHub
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </>
  );
}

function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.9, 0.2, 1],
      },
    },
  };

  return (
    <motion.article
      ref={cardRef}
      variants={itemVariants}
      className="card project-figure group perspective-1000"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8 }}
    >
      {/* Image Container with Overlay */}
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/projects/placeholder.jpg';
          }}
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Gradient Overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 mix-blend-multiply`}
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Hover Actions */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ delay: 0.1 }}
          >
            Live <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* Replaced corner accent with animated icon */}
        <motion.div
          className="absolute top-4 right-4 text-white/70"
          animate={{
            x: isHovered ? -4 : 0,
            y: isHovered ? 4 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight className="w-6 h-6" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <motion.div
              className="project-index"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.div>
            <div className="text-sm text-muted uppercase tracking-wider">{project.year}</div>
          </div>
        </div>

        <motion.h3
          className="text-2xl font-semibold mb-2"
          whileHover={{ x: 5, color: 'var(--accent)' }}
        >
          {project.title}
        </motion.h3>

        <p className="text-muted">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t, idx) => (
            <motion.span
              key={idx}
              className="tag"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Animated Border Glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${project.color})`,
          opacity: 0,
        }}
        animate={{
          opacity: isHovered ? 0.1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  );
}