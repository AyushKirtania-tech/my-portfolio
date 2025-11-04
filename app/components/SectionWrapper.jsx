'use client';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.2, 0.9, 0.2, 1], // A nice easing curve
      staggerChildren: 0.2, // This will animate children one by one
    },
  },
};

/**
 * A wrapper component that animates a section into view on scroll.
 * It uses framer-motion's `whileInView` to trigger the animation.
 * It also applies a `staggerChildren` effect to its direct children.
 */
export default function SectionWrapper({ children, ...props }) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }} // Triggers when 100px from viewport
      {...props} // Passes down props like `id` and `className`
    >
      {children}
    </motion.section>
  );
}