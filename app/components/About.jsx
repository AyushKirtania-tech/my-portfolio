'use client';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="flex justify-center">
              <div className="bg-gray-100 h-80 w-80 rounded-2xl shadow-inner flex items-center justify-center border border-gray-200">
                <p className="text-gray-500">Your Photo Here</p>
              </div>
            </div>

            {/* Text Section */}
            <div className="text-center md:text-left">
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                I'm a passionate <span className="font-semibold text-blue-600">Full Stack Developer</span> specializing in the MERN stack.
                I love building modern, responsive web applications that solve real-world problems.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                With experience in both frontend and backend development, I focus on creating seamless user experiences backed by
                clean and efficient server-side logic.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                When I'm not coding, you’ll find me exploring new technologies, contributing to open source, or keeping up with the latest trends in web development.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
