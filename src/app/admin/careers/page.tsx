'use client';

import { useState, useEffect } from 'react';

export default function AdminCareers() {
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [selectedJobFilter, setSelectedJobFilter] = useState('all');
  const [formData, setFormData] = useState({ title: '', type: 'Full-Time', description: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchJobs = async () => {
    const res = await fetch('/api/careers');
    const data = await res.json();
    if(data.jobs) setJobs(data.jobs);
  };

  const fetchApplicants = async (jobId: string) => {
    const res = await fetch(`/api/careers/applicants?jobId=${jobId}`);
    const data = await res.json();
    if (data.applicants) setApplicants(data.applicants);
  };

  useEffect(() => {
    fetchJobs();
    fetchApplicants('all');
  }, []);

  useEffect(() => {
    fetchApplicants(selectedJobFilter);
  }, [selectedJobFilter]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/careers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      setFormData({ title: '', type: 'Full-Time', description: '' });
      setMessage('✅ Job posted successfully!');
      fetchJobs();
    } else {
      setMessage('❌ Failed to post job. Check your DB connection.');
    }
    setLoading(false);
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/careers/${id}`, { method: 'DELETE' });
    if (res.ok) { fetchJobs(); }
    else { alert('Failed to delete. Check your DB connection.'); }
  };

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
            {message && <p className="mt-4 text-sm font-semibold">{message}</p>}
          </div>

          <h2 className="text-xl font-bold mb-4">Active Postings</h2>
          <div className="grid grid-cols-1 gap-4">
            {jobs.map((j: any) => (
              <div key={j.id || j._id} className="bg-neutral-900 border border-white/10 p-4 rounded-xl border-l-4 border-l-[#00D9FF] flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{j.title} <span className="text-sm font-normal text-neutral-400 ml-2 border border-white/20 px-2 py-0.5 rounded-full">{j.type}</span></h3>
                  <p className="text-sm text-neutral-400 mt-1">{j.description}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(j.id || j._id, j.title)} className="px-3 py-1 bg-red-500/20 text-red-500 rounded hover:bg-red-500/40 text-sm font-bold">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Applicants */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Applicants</h2>
            <select 
              value={selectedJobFilter} 
              onChange={e => setSelectedJobFilter(e.target.value)} 
              className="bg-black border border-white/20 rounded px-3 py-1.5 text-sm"
            >
              <option value="all">All Postings</option>
              {jobs.map((j: any) => (
                <option key={j.id} value={j.id}>{j.title}</option>
              ))}
            </select>
          </div>
          <div className="bg-neutral-900/50 border border-white/10 p-6 rounded-2xl flex flex-col gap-4">
            {applicants.length === 0 ? (
              <p className="text-neutral-500 text-sm text-center py-8">No applicants found for this filter.</p>
            ) : (
              applicants.map((a: any) => (
                <div key={a.id} className="bg-black border border-white/10 p-4 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-white">{a.name}</h3>
                      <div className="text-sm text-[#00D9FF]">
                        <p>{a.email}</p>
                        {a.mobile && <p className="text-xs text-neutral-400 mt-1">Mobile: {a.mobile}</p>}
                      </div>
                    </div>
                    <span className="text-xs bg-neutral-800 px-2 py-1 rounded text-neutral-300 border border-white/10">
                      Applied for: {a.jobTitle}
                    </span>
                  </div>
                  {a.portfolio && (
                    <a href={a.portfolio} target="_blank" rel="noopener noreferrer" className="text-sm border border-white/20 px-3 py-1.5 rounded-full hover:bg-white hover:text-black transition-colors inline-block mt-2">
                      View Portfolio / Resume ↗
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
