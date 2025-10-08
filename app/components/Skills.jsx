'use client';
import { motion } from 'framer-motion';
import { Code, Database, Wrench, Sparkles } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Code className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'HTML5 & CSS3', level: 90 },
        { name: 'JavaScript (ES6+)', level: 85 },
        { name: 'React.js', level: 75 },
        { name: 'Next.js', level: 70 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'Bootstrap', level: 80 },
        { name: 'Framer Motion', level: 70 },
        { name: 'Responsive Design', level: 90 }
      ]
    },
    {
      title: 'Backend & Database',
      icon: <Database className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'Express.js', level: 80 },
        { name: 'MongoDB', level: 75 },
        { name: 'PostgreSQL', level: 60 },
        { name: 'REST APIs', level: 85 },
        { name: 'JWT Authentication', level: 75 },
        { name: 'Firebase', level: 65 }
      ]
    },
    {
      title: 'Tools & Platforms',
      icon: <Wrench className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'Git & GitHub', level: 85 },
        { name: 'VS Code', level: 90 },
        { name: 'Postman', level: 80 },
        { name: 'Vercel', level: 75 },
        { name: 'Netlify', level: 75 },
        { name: 'npm / yarn', level: 85 },
        { name: 'Heroku', level: 70 }
      ]
    },
    {
      title: 'Currently Learning',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'TypeScript', level: 55 },
        { name: 'Next.js SSR/SSG', level: 65 },
        { name: 'GraphQL', level: 45 },
        { name: 'Docker', level: 40 },
        { name: 'Testing (Jest)', level: 50 },
        { name: 'Redis', level: 35 }
      ]
    }
  ];

  const languages = [
    { name: 'English', flag: '🇬🇧', level: 'Fluent' },
    { name: 'Bengali', flag: '🇮🇳', level: 'Native' },
    { name: 'Hindi', flag: '🇮🇳', level: 'Fluent' }
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Skills & Expertise
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and tools I work with
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-gray-100 transition-all"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`bg-gradient-to-r ${category.color} p-3 rounded-xl text-white shadow-md`}>
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-500 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                        viewport={{ once: true }}
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Languages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Languages
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {languages.map((lang, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl px-6 py-4 shadow-md hover:shadow-lg transition-all"
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">{lang.flag}</div>
                  <div className="font-semibold text-gray-900">{lang.name}</div>
                  <div className="text-sm text-gray-600">{lang.level}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}