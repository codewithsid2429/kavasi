'use client';

import * as React from 'react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', projectType: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if(res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', projectType: '', message: '' });
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('An error occurred while submitting.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Let's build together</h1>
        <p className="text-neutral-400 text-center mb-10">Use the form below or our WhatsApp floating button to reach us instantly for any inquiries.</p>

        {success ? (
          <div className="bg-green-500/20 text-green-400 border border-green-500/50 p-6 rounded-2xl text-center">
            <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
            <p>Thank you for reaching out. We have sent an acknowledgment email. We'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-neutral-900 border border-white/10 p-8 rounded-3xl space-y-6">
            {error && <div className="text-red-400 bg-red-400/10 p-4 rounded-xl">{error}</div>}
            
            <div>
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 text-white" placeholder="John Doe" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 text-white" placeholder="john@example.com" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Project Type</label>
              <select required value={formData.projectType} onChange={e => setFormData({...formData, projectType: e.target.value})} className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 text-white appearance-none">
                <option value="" disabled>Select an option</option>
                <option value="Web Development">Web Development</option>
                <option value="AI Automation">AI Automation</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-white/50 text-white" placeholder="Tell us about your next project..."></textarea>
            </div>

            <button disabled={loading} type="submit" className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50">
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
