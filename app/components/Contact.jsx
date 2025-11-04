'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, AlertCircle, Mail, MapPin, Sparkles, Github, Linkedin, Instagram } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', phone: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleChange = (k) => (ev) => setForm((s) => ({ ...s, [k]: ev.target.value }));

  const submit = async (ev) => {
    ev.preventDefault();
    setErrorMsg('');

    if (form.phone) return;

    if (!form.name.trim() || !validEmail(form.email) || form.message.trim().length < 10) {
      setErrorMsg('Please complete all fields (message min 10 chars).');
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '', phone: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Failed to send. Try later.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('Network error. Please try again later.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-pink-400/10 to-yellow-400/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </motion.div>
          <h2 className="text-4xl font-bold">Let's Connect</h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Left Side - Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-3">Let's build something together</h3>
              <p className="text-muted">
                Open to internships & freelance. Tell me about your idea — I usually respond within a few days.
              </p>
            </motion.div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'ayushkirtania@gmail.com',
                  href: 'mailto:ayushkirtania@gmail.com',
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: MapPin,
                  label: 'Location',
                  value: 'Kolkata, India',
                  color: 'from-green-500 to-emerald-500',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="glass card group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`p-3 bg-gradient-to-br ${item.color} rounded-xl`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="text-sm text-muted uppercase tracking-wider">{item.label}</div>
                      {item.href ? (
                        <a
                          className="font-medium block mt-1 group-hover:text-blue-500 transition-colors"
                          href={item.href}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="font-medium block mt-1">{item.value}</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              className="pt-6"
              variants={itemVariants}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-muted mb-3">Also find me on:</p>
              <div className="flex gap-3 flex-wrap">
                {[
                  {
                    name: 'GitHub',
                    url: 'https://github.com/AyushKirtania-tech',
                    icon: Github,
                    color: 'hover:bg-gray-700 dark:hover:bg-gray-600',
                  },
                  {
                    name: 'LinkedIn',
                    url: 'https://www.linkedin.com/in/ayush-kirtania-45464021a',
                    icon: Linkedin,
                    color: 'hover:bg-blue-600 dark:hover:bg-blue-700',
                  },
                  {
                    name: 'Instagram',
                    url: 'https://www.instagram.com/punkifiedayush/',
                    icon: Instagram,
                    color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600',
                  },
                ].map((platform, i) => (
                  <motion.a
                    key={i}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 rounded-full text-sm transition-all cursor-pointer ${platform.color}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <platform.icon className="w-4 h-4" />
                    {platform.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.form variants={itemVariants} className="space-y-5" onSubmit={submit}>
            {/* Name */}
            <motion.div animate={{ scale: focusedField === 'name' ? 1.02 : 1 }} transition={{ type: 'spring', stiffness: 300 }}>
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Name
              </label>
              <motion.input
                id="name"
                className="input w-full"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange('name')}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
                whileFocus={{ scale: 1.01 }}
              />
            </motion.div>

            {/* Email */}
            <motion.div animate={{ scale: focusedField === 'email' ? 1.02 : 1 }} transition={{ type: 'spring', stiffness: 300 }}>
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <motion.input
                id="email"
                type="email"
                className="input w-full"
                placeholder="you@email.com"
                value={form.email}
                onChange={handleChange('email')}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                whileFocus={{ scale: 1.01 }}
              />
            </motion.div>

            {/* Message */}
            <motion.div animate={{ scale: focusedField === 'message' ? 1.02 : 1 }} transition={{ type: 'spring', stiffness: 300 }}>
              <label className="block text-sm font-medium mb-2" htmlFor="message">
                Message
              </label>
              <motion.textarea
                id="message"
                className="input textarea w-full"
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange('message')}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
                rows={5}
                whileFocus={{ scale: 1.01 }}
              />
            </motion.div>

            {/* Honeypot */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" value={form.phone} onChange={handleChange('phone')} tabIndex={-1} />
            </div>

            {/* Submit */}
            <div className="space-y-4">
              <motion.button
                type="submit"
                className="btn btn-primary w-full relative overflow-hidden"
                disabled={status === 'sending'}
                whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                aria-live="polite"
              >
                <AnimatePresence mode="wait">
                  {status === 'sending' ? (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      Send message <Send className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Status Messages */}
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg"
                  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500 }}>
                      <Check className="w-5 h-5" />
                    </motion.div>
                    Message sent — thank you!
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg"
                  >
                    <AlertCircle className="w-5 h-5" />
                    {errorMsg}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </>
  );
}