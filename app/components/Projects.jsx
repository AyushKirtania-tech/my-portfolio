'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: 'DRIPDUO',
      year: '2026',
      description:
        'Independent luxury streetwear brand site for the FW26 collection — editorial layouts, a custom canvas loading animation, and scroll-triggered parallax.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      image: '/projects/dripduo.png',
      live: 'https://dripduo.vercel.app/',
      featured: true,
    },
    {
      title: 'FUXI AI',
      year: '2025',
      description: 'Privacy-first Chrome Extension utilizing on-device Gemini Nano AI.',
      tech: ['React', 'Vite', 'Gemini Nano', 'Tailwind'],
      image: '/projects/logo.png',
      repo: 'https://github.com/AyushKirtania-tech/FUXI-AI.git',
    },
    {
      title: 'OTP Auth System',
      year: '2025',
      description: 'Scalable full-stack auth with SMS verification and Redis queuing.',
      tech: ['Next.js', 'Node.js', 'Redis', 'Prisma'],
      image: '/projects/otp.png',
      repo: 'https://github.com/AyushKirtania-tech/otp-auth',
    },
    {
      title: 'F1UpToDates',
      year: '2024',
      description: 'Formula 1 info hub with circuits and race data.',
      tech: ['HTML', 'CSS', 'JS'],
      image: '/projects/F1.png',
      live: 'https://f1-up-to-dates.vercel.app/',
    },
  ];

  return (
    <div className="container relative z-10">
      <motion.div
        className="mb-8 sm:mb-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-xs sm:text-sm uppercase tracking-widest text-muted mb-2">
          {String(projects.length).padStart(2, '0')} Selected Works
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Things I've Built
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-brand-500 to-brand-600 mt-4 rounded-sm" />
      </motion.div>

      {/* Every project — including DRIPDUO — uses the same card, so the
          section reads as one consistent set rather than mismatched pieces. */}
      <motion.div
        className="grid sm:grid-cols-2 gap-5 sm:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>

      <motion.div
        className="mt-10 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <a
          href="https://github.com/AyushKirtania-tech"
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost inline-flex items-center gap-2 text-sm"
        >
          All projects on GitHub
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  );
}

function ProjectCard({ project }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.2, 0.9, 0.2, 1] },
    },
  };

  return (
    <motion.article
      variants={itemVariants}
      className="card project-figure flex flex-col overflow-hidden p-0"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/projects/placeholder.jpg';
          }}
        />
        {project.featured && (
          <span className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wide text-white bg-black/60 backdrop-blur px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg sm:text-xl font-semibold">{project.title}</h3>
          <span className="text-xs text-muted uppercase tracking-wider shrink-0 ml-2">{project.year}</span>
        </div>

        <p className="text-sm sm:text-[15px] text-muted flex-1">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        {/* Same button row, same position, on every card — always visible
            (no hover-reveal), so it works identically on touch and desktop. */}
        <div className="flex gap-3 mt-5">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title} live`}
              className="btn btn-primary flex-1 justify-center text-sm"
            >
              Live <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title} source code`}
              className={`btn btn-ghost justify-center text-sm ${project.live ? '' : 'flex-1'}`}
            >
              Code <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}