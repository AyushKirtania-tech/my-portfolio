'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    // honeypot field (should remain empty)
    phone: '',
  });
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'

  const clearStatusLater = (ms = 4000) => {
    setTimeout(() => setStatus(''), ms);
  };

  const validEmail = (email) =>
    // simple RFC-ish check (good enough for UI-level validation)
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot spam check
    if (formData.phone) {
      // silently ignore spam submissions
      return;
    }

    // Basic front-end validation
    if (!formData.name.trim() || !validEmail(formData.email) || !formData.message.trim()) {
      setStatus('error');
      clearStatusLater();
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', phone: '' });
      } else {
        // try to surface server message when available
        try {
          const data = await response.json();
          console.error('Contact API error:', data);
        } catch {
          /* ignore parse error */
        }
        setStatus('error');
      }
    } catch (err) {
      console.error('Network error sending contact form:', err);
      setStatus('error');
    } finally {
      clearStatusLater();
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Get In Touch</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
            <p className="text-gray-700 mb-6">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="space-y-4">
              <a
                href="mailto:your@email.com"
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600"
              >
                <Mail size={24} />
                your@email.com
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
                <Linkedin size={24} />
                LinkedIn Profile
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
                <Github size={24} />
                GitHub Profile
              </a>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
            aria-label="Contact form"
          >
            {/* visible fields with accessible labels */}
            <div>
              <label htmlFor="name" className="sr-only">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Your Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Honeypot: invisible field to trap bots */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                autoComplete="off"
                tabIndex={-1}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {/* ARIA-live region for assistive technologies */}
            <div role="status" aria-live="polite" className="mt-2 min-h-[1.25rem]">
              {status === 'success' && (
                <p className="text-green-600 text-center">Message sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-center">Failed to send message. Please try again.</p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
