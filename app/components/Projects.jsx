'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: 'F1UpToDates',
      year: '2024',
      description: 'Formula 1 info hub with circuits and race data.',
      tech: ['HTML', 'CSS', 'JS'],
      image: '/projects/F1.png',
      live: 'https://f1uptodates.netlify.app'
    },
    {
      title: 'Portfolio Website',
      year: '2025',
      description: 'This portfolio — modernized with Tailwind and animations.',
      tech: ['Next.js', 'Tailwind', 'Framer Motion'],
      image: '/projects/portfolio.png',
      live: '#'
    },
  ];

  return (
    <section id="projects" className="section bg-[transparent]">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Selected Work</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-brand-500 to-brand-600 mt-3 rounded-sm" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.article key={i} whileHover={{ y: -6 }} className="card project-figure">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = '/projects/placeholder.jpg'; }}
                />
                <div className="absolute inset-0 flex items-end justify-end p-4">
                  <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-outline">
                    Live <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="project-index">{String(i + 1).padStart(2, '0')}</div>
                    <div className="text-sm text-muted uppercase">{p.year}</div>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold">{p.title}</h3>
                <p className="text-muted mt-2">{p.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t, idx) => (
                    <span key={idx} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href="https://github.com/AyushKirtania-tech" target="_blank" rel="noreferrer" className="btn btn-ghost">
            View all projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
