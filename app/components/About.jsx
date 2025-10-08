'use client';
import { motion } from 'framer-motion';
import { Code2, Trophy, GraduationCap, Heart } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Education",
      description: "B.Sc. (Hons) Computer Science, Scottish Church College"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Achievement",
      description: "Hackathon Winner - ICDMAI 2025 (Team Bombe)"
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Experience",
      description: "Academic Tutor & Full Stack Development Projects"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Passion",
      description: "Building user-focused web applications & Formula 1"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            About Me
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Passionate developer turning ideas into reality through code
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20"></div>
                <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 h-80 w-80 rounded-2xl shadow-2xl flex items-center justify-center border-4 border-white overflow-hidden">
                  <img 
                    src="/Profile_pic.jpeg" 
                    alt="Ayush Kirtania"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                    <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white text-5xl font-bold">
                      AK
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm a <span className="font-semibold text-blue-600">3rd-year Computer Science student</span> at Scottish Church College, Kolkata, with a strong passion for full-stack web development and creating impactful digital experiences.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Currently diving deep into the <span className="font-semibold text-indigo-600">MERN stack</span> (MongoDB, Express.js, React, Node.js) and modern frameworks like Next.js. I love building responsive, user-focused applications that solve real-world problems and deliver seamless experiences.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Recently won a <span className="font-semibold text-purple-600">hackathon at ICDMAI 2025</span> with Team Bombe, which fueled my enthusiasm for collaborative problem-solving and innovation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                When I'm not coding, you'll find me exploring new web technologies, contributing to projects, mentoring students in computer science, or following Formula 1 races! 🏎️
              </p>

              <div className="pt-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Let's Connect
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Highlights Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all"
              >
                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 mb-4 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}