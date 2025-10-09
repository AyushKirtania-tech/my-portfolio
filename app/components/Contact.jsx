'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', phone: '' }); // phone is honeypot
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleChange = (k) => (ev) => setForm((s) => ({ ...s, [k]: ev.target.value }));

  const submit = async (ev) => {
    ev.preventDefault();
    setErrorMsg('');

    // honeypot check
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
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() }),
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

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bold">Let's build something together</h2>
            <p className="text-muted mt-3">Open to internships & freelance. Tell me about your idea — I usually respond within a few days.</p>

            <div className="mt-6 glass card">
              <div className="text-sm text-muted">Email</div>
              <a className="font-medium block mt-1" href="mailto:ayushkirtania@gmail.com">ayushkirtania@gmail.com</a>

              <div className="text-sm text-muted mt-4">Location</div>
              <div className="block mt-1">Kolkata, India</div>
            </div>
          </motion.div>

          <motion.form initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-4" onSubmit={submit}>
            <div>
              <label className="sr-only" htmlFor="name">Name</label>
              <input id="name" className="input" placeholder="Your name" value={form.name} onChange={handleChange('name')} required />
            </div>

            <div>
              <label className="sr-only" htmlFor="email">Email</label>
              <input id="email" type="email" className="input" placeholder="you@email.com" value={form.email} onChange={handleChange('email')} required />
            </div>

            <div>
              <label className="sr-only" htmlFor="message">Message</label>
              <textarea id="message" className="input textarea" placeholder="Tell me about your project..." value={form.message} onChange={handleChange('message')} required />
            </div>

            {/* honeypot */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <label htmlFor="phone" className="sr-only">Phone</label>
              <input id="phone" name="phone" value={form.phone} onChange={handleChange('phone')} />
            </div>

            <div className="flex flex-col gap-3">
              <button type="submit" className="btn btn-primary" disabled={status === 'sending'} aria-live="polite">
                {status === 'sending' ? 'Sending...' : <>Send message <Send className="w-4 h-4" /></>}
              </button>

              <div className="min-h-[36px]">
                {status === 'success' && <div className="flex items-center gap-2 text-green-500"><Check /> Message sent — thank you!</div>}
                {status === 'error' && <div className="flex items-center gap-2 text-red-500"><AlertCircle /> {errorMsg}</div>}
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
