'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

export default function CareersPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Application form state
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', email: '', resumeLink: '', coverLetter: '' });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/careers')
      .then(res => res.json())
      .then(data => {
        if(data.jobs) setJobs(data.jobs);
        setLoading(false);
      });
  }, []);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, jobId: selectedJob._id, jobTitle: selectedJob.title })
      });
      setMessage('Application submitted successfully!');
      setFormData({ name: '', email: '', resumeLink: '', coverLetter: '' });
      setTimeout(() => {
        setSelectedJob(null);
        setMessage('');
      }, 3000);
    } catch (err) {
      setMessage('Failed to submit application.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Join KAVASI</h1>
        <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto">
          We are looking for passionate individuals to build the next generation of intelligent web systems and AI automations.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {loading ? (
          <div className="flex justify-center"><div className="loader"></div></div>
        ) : jobs.length === 0 ? (
           <p className="text-center text-neutral-500">No open positions currently. Check back later!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-neutral-900 border border-white/10 p-8 rounded-3xl hover:border-[#00D9FF] transition-all flex flex-col">
                <div className="mb-4">
                  <span className="bg-[#00D9FF]/20 text-[#00D9FF] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{job.type}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                <p className="text-neutral-400 mb-6 flex-1">{job.description}</p>
                
                <button onClick={() => setSelectedJob(job)} className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-[#00D9FF] transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-white/20 p-8 rounded-3xl max-w-lg w-full relative">
            <button onClick={() => setSelectedJob(null)} className="absolute top-4 right-4 text-neutral-400 hover:text-white">X</button>
            <h2 className="text-2xl font-bold mb-2">Apply for {selectedJob.title}</h2>
            <p className="text-neutral-400 mb-6">Submit your details below to apply.</p>
            
            {message && <div className="mb-4 text-green-400 font-medium">{message}</div>}

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-neutral-300">Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/20 rounded-xl px-4 py-3" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-neutral-300">Email</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black border border-white/20 rounded-xl px-4 py-3" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-neutral-300">Portfolio / Resume Link</label>
                <input required type="url" value={formData.resumeLink} onChange={e => setFormData({...formData, resumeLink: e.target.value})} className="w-full bg-black border border-white/20 rounded-xl px-4 py-3" placeholder="Google Drive, LinkedIn, Portfolio" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-neutral-300">Why KAVASI?</label>
                <textarea rows={3} value={formData.coverLetter} onChange={e => setFormData({...formData, coverLetter: e.target.value})} className="w-full bg-black border border-white/20 rounded-xl px-4 py-3"></textarea>
              </div>
              <button disabled={submitting} type="submit" className="w-full py-4 bg-gradient-to-r from-[#00D9FF] to-[#6C63FF] text-black font-bold rounded-xl mt-4 disabled:opacity-50">
                {submitting ? 'Submitting...' : 'Send Application'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
