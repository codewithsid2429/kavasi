'use client';

import { useState, useEffect } from 'react';

export default function AdminCareers() {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({ title: '', type: 'Full-Time', description: '' });
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    const res = await fetch('/api/careers');
    const data = await res.json();
    if(data.jobs) setJobs(data.jobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In real app, posts to /api/careers
    alert('Mock Mode: Cannot save to DB directly right now.');
    setLoading(false);
  };

  const handleDelete = (id: string) => {
    alert(`Mock Mode: Delete triggered for task ID: ${id}`);
  };

  const mockApplicants = [
    { _id: 'a1', name: 'Alex Johnson', email: 'alex@example.com', jobTitle: 'Senior Next.js Developer', portfolio: 'https://github.com/alex' },
    { _id: 'a2', name: 'Maria Garcia', email: 'maria@example.com', jobTitle: 'AI Automation Intern', portfolio: 'https://maria.dev' }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Careers & Internships</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Manage Postings */}
        <div>
          <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl mb-8">
            <h2 className="text-xl font-bold mb-4">Post New Opportunity</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Job Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm mb-1">Type</label>
                <select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2">
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Description</label>
                <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2" />
              </div>
              <button disabled={loading} type="submit" className="px-6 py-2 bg-gradient-to-r from-[#00D9FF] to-[#6C63FF] text-black font-bold rounded hover:bg-neutral-200">
                {loading ? 'Posting...' : 'Post Job'}
              </button>
            </form>
          </div>

          <h2 className="text-xl font-bold mb-4">Active Postings</h2>
          <div className="grid grid-cols-1 gap-4">
            {jobs.map((j: any) => (
              <div key={j._id} className="bg-neutral-900 border border-white/10 p-4 rounded-xl border-l-4 border-l-[#00D9FF] flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{j.title} <span className="text-sm font-normal text-neutral-400 ml-2 border border-white/20 px-2 py-0.5 rounded-full">{j.type}</span></h3>
                  <p className="text-sm text-neutral-400 mt-1">{j.description}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(j._id)} className="px-3 py-1 bg-red-500/20 text-red-500 rounded hover:bg-red-500/40 text-sm font-bold">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Applicants */}
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Applicants</h2>
          <div className="bg-neutral-900/50 border border-white/10 p-6 rounded-2xl flex flex-col gap-4">
            {mockApplicants.map((a) => (
              <div key={a._id} className="bg-black border border-white/10 p-4 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-white">{a.name}</h3>
                    <p className="text-sm text-[#00D9FF]">{a.email}</p>
                  </div>
                  <span className="text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-300">
                    Applying for: {a.jobTitle}
                  </span>
                </div>
                <a href={a.portfolio} target="_blank" rel="noopener noreferrer" className="text-sm border border-white/20 px-3 py-1.5 rounded-full hover:bg-white hover:text-black transition-colors inline-block mt-2">
                  View Portfolio / Resume ↗
                </a>
              </div>
            ))}
            <p className="text-neutral-500 text-sm text-center mt-4">
              * Showing offline mock applicants. Once MongoDB is connected, new web forms will populate here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
