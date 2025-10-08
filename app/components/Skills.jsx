'use client';
import { motion } from 'framer-motion';

export default function Skills() {
  const skills = {
    Frontend: ['React', 'Next.js', 'JavaScript', 'Tailwind CSS', 'HTML/CSS'],
    Backend: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Authentication'],
    Tools: ['Git', 'VS Code', 'Postman', 'Vercel', 'npm / yarn'],
  };

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 text-gray-900"
        >
          Skills
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-xl border border-gray-100 transition-all"
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-6 text-center md:text-left">
                {category}
              </h3>
              <ul className="space-y-3">
                {items.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-3 text-gray-700 text-lg"
                  >
                    <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
