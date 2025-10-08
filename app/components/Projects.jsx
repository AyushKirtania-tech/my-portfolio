'use client';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, Wrench } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: 'F1UpToDates',
      description: 'A comprehensive Formula 1 information hub featuring circuit details, race schedules, and latest F1 news. Built as a learning project to master responsive design and modern frontend practices.',
      tech: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'Responsive Design'],
      github: 'https://github.com/ayushkirtania',
      live: 'https://f1uptodates.netlify.app',
      status: 'Ongoing',
      features: [
        'Dynamic race schedule cards',
        'Circuit information & layouts',
        'Responsive flex/grid layouts',
        'Image lazy-loading optimization',
        'Modular CSS architecture'
      ]
    },
    {
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio built with Next.js 15 and MongoDB. Features smooth animations, contact form with database integration, and optimized performance.',
      tech: ['Next.js', 'React', 'MongoDB', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com/ayushkirtania',
      live: '#',
      status: 'Completed',
      features: [
        'Server-side rendering (SSR)',
        'MongoDB integration',
        'Animated UI components',
        'Responsive design',
        'SEO optimized'
      ]
    },
    {
      title: 'MERN Task Manager',
      description: 'Full-stack task management application with user authentication, CRUD operations, and real-time updates. Built to learn backend development and REST APIs.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'REST API'],
      github: 'https://github.com/ayushkirtania',
      live: '#',
      status: 'In Development',
      features: [
        'User authentication with JWT',
        'CRUD operations',
        'RESTful API design',
        'MongoDB database',
        'Responsive React UI'
      ]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A showcase of my recent work in web development, from learning projects to full-stack applications
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden group"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        project.status === 'Completed' 
                          ? 'bg-green-100 text-green-700'
                          : project.status === 'Ongoing'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Features */}
                {project.features && (
                  <div className="mb-6 bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Wrench size={16} />
                      Key Features
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-blue-600 mt-1">→</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium group"
                    >
                      <Github size={20} className="group-hover:scale-110 transition-transform" />
                      View Code
                    </a>
                  )}

                  {project.live && project.live !== '#' && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-medium"
                    >
                      <ExternalLink size={20} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Gradient Border Effect */}
              <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Want to see more? Check out my other projects and contributions on GitHub
          </p>
          <a
            href="https://github.com/ayushkirtania"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group"
          >
            Visit My GitHub Profile
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}