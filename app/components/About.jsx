'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Award, MapPin, GraduationCap, Clock } from 'lucide-react';
import { useRef } from 'react';

export default function About() {
  const stats = [
    { label: 'Education', value: 'B.Sc. Computer Science', icon: GraduationCap },
    { label: 'Location', value: 'Kolkata, India', icon: MapPin },
    { label: 'Experience', value: '2+ years', icon: Clock },
    { label: 'Status', value: 'Available', icon: Award },
  ];

  const imageRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
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
  };

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section with 3D Tilt */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              className="relative"
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Decorative Frame */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <motion.div
                className="rounded-2xl overflow-hidden border-4 border-gray-900 dark:border-slate-700 transform rotate-3 relative z-10"
                whileHover={{ rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-gray-900 h-96 flex items-center justify-center -rotate-3 relative overflow-hidden">
                  <motion.img
                    src="/Profile_pic.jpeg"
                    alt="Ayush"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder-avatar.png';
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Image Overlay Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 rounded-xl p-3 shadow-2xl border-2 border-blue-500"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Award className="w-8 h-8 text-blue-500" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                About Me
              </motion.h2>
              <motion.div
                className="w-16 h-1 bg-indigo-600 mt-3 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              />
            </div>

            <div className="text-gray-700 dark:text-gray-300 space-y-4 text-lg">
              {[
                "I'm a 3rd-year Computer Science student with a passion for building scalable, delightful web experiences. I enjoy translating product ideas into polished, production-ready apps.",
                'My primary focus is the MERN stack, where I emphasize clean architecture, accessibility, and performance.',
                'I recently won a hackathon at ICDMAI 2025, which strengthened my love for collaboration and rapid prototyping.',
              ].map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  {text.split('**').map((part, i) =>
                    i % 2 === 0 ? (
                      part
                    ) : (
                      <strong key={i} className="text-gray-900 dark:text-white">
                        {part}
                      </strong>
                    )
                  )}
                </motion.p>
              ))}
            </div>

            {/* Stats Grid with Animations */}
            <motion.div
              className="grid grid-cols-2 gap-4 mt-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-100 dark:border-slate-700 relative overflow-hidden group"
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="mb-2"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <s.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </motion.div>

                  <div className="text-sm text-gray-500 uppercase tracking-wider relative z-10">
                    {s.label}
                  </div>
                  <motion.div
                    className="text-lg font-semibold text-gray-900 dark:text-white relative z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  >
                    {s.value}
                  </motion.div>

                  {/* Hover Border Effect */}
                  <motion.div
                    className="absolute inset-0 border-2 border-indigo-500 rounded-lg opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Additional Interactive Element */}
            <motion.div
              className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-blue-100 dark:border-slate-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <Award className="w-6 h-6 text-yellow-500" />
                </motion.div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Recent Achievement</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Hackathon Winner at ICDMAI 2025
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}