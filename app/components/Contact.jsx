'use client';
import { useState } from 'react';
import { Send, Check, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', phone: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const handleChange = (k) => (ev) => setForm((s) => ({ ...s, [k]: ev.target.value }));

  const submit = async (ev) => {
    ev.preventDefault();
    setErrorMsg('');

    if (form.phone) return; // honeypot

    if (!form.name.trim() || !validEmail(form.email) || form.message.trim().length < 10) {
      setErrorMsg('Fill in your name, a valid email, and a message of at least 10 characters.');
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
        setErrorMsg(data.error || 'The message did not send. Try again in a moment.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('Network error. Check your connection and try again.');
    }
  };

  return (
    <section id="contact">
      <div className="wrap">
        <h2>Have something to build?</h2>
        <a className="mail" href="mailto:ayushkirtania@gmail.com">ayushkirtania@gmail.com</a>
        <p className="contact-lead">
          Open to internships and freelance work. Or send a message here and I&apos;ll reply within a few days.
        </p>

        <form className="form" onSubmit={submit} noValidate>
          <label htmlFor="name">Name</label>
          <input id="name" value={form.name} onChange={handleChange('name')} autoComplete="name" required />

          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={form.email} onChange={handleChange('email')} autoComplete="email" required />

          <label htmlFor="message">Message</label>
          <textarea id="message" rows={5} value={form.message} onChange={handleChange('message')} required />

          <div style={{ display: 'none' }} aria-hidden="true">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" value={form.phone} onChange={handleChange('phone')} tabIndex={-1} autoComplete="off" />
          </div>

          <button type="submit" className="send" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : (<>Send message <Send size={18} /></>)}
          </button>

          <div aria-live="polite" className="status">
            {status === 'success' && (
              <span className="ok"><Check size={18} /> Message sent. Thank you!</span>
            )}
            {status === 'error' && (
              <span className="err"><AlertCircle size={18} /> {errorMsg}</span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}