'use client';
import { motion } from 'framer-motion';

export default function About() {
  const stats = [
    { label: 'Education', value: 'B.Sc. Computer Science' },
    { label: 'Location', value: 'Kolkata, India' },
    { label: 'Experience', value: '2+ years' },
    { label: 'Status', value: 'Available' },
  ];

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="relative">
            <div className="rounded-2xl overflow-hidden border-2 border-gray-900 dark:border-slate-700 transform rotate-3">
              <div className="bg-gray-900 h-96 flex items-center justify-center -rotate-3">
                <img src="/Profile_pic.jpeg" alt="Ayush" className="w-full h-full object-cover" onError={(e) => { e.target.src = '/placeholder-avatar.png' }} />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">About Me</h2>
              <div className="w-16 h-1 bg-indigo-600 mt-3"></div>
            </div>

            <div className="text-gray-700 dark:text-gray-300 space-y-4 text-lg">
              <p>
                I'm a <strong className="text-gray-900 dark:text-white">3rd-year Computer Science student</strong> with a passion for building scalable, delightful web experiences. I enjoy translating product ideas into polished, production-ready apps.
              </p>

              <p>
                My primary focus is the <strong className="text-gray-900 dark:text-white">MERN stack</strong>, where I emphasize clean architecture, accessibility, and performance.
              </p>

              <p>
                I recently won a hackathon at <strong>ICDMAI 2025</strong>, which strengthened my love for collaboration and rapid prototyping.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              {stats.map((s, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-100 dark:border-slate-700">
                  <div className="text-sm text-gray-500 uppercase tracking-wider">{s.label}</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{s.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
