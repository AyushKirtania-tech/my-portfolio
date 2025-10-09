'use client';
import { motion } from 'framer-motion';

const sections = [
  { title: 'Frontend', skills: [{ name: 'React', pct: 90 }, { name: 'Next.js', pct: 85 }, { name: 'Tailwind', pct: 90 }, { name: 'Framer Motion', pct: 75 }] },
  { title: 'Backend', skills: [{ name: 'Node.js', pct: 85 }, { name: 'Express', pct: 80 }, { name: 'MongoDB', pct: 80 }, { name: 'Postgres', pct: 60 }] },
  { title: 'Tools', skills: [{ name: 'Git', pct: 90 }, { name: 'VS Code', pct: 95 }, { name: 'Vercel', pct: 80 }, { name: 'Docker (learning)', pct: 45 }] },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-10">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Skills & Tools</h2>
          <div className="w-24 h-1 bg-indigo-600 mt-3"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }} className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{section.title}</h3>
              <div className="space-y-3">
                {section.skills.map((s, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                      <span>{s.name}</span>
                      <span>{s.pct}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: 'linear-gradient(90deg,#7c3aed,#ec4899)' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-gray-700 dark:text-gray-300">
          <strong>Languages:</strong> English (Fluent), Bengali (Native), Hindi (Fluent)
        </div>
      </div>
    </section>
  );
}
