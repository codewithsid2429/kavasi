'use client';

import { useState, useEffect } from 'react';

export default function AdminPortfolio() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', imageUrl: '', projectLink: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    if (data.projects) setProjects(data.projects);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      setFormData({ name: '', description: '', imageUrl: '', projectLink: '' });
      setMessage('✅ Project added!');
      fetchProjects();
    } else {
      setMessage('❌ Failed to add project.');
    }
    setLoading(false);
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete project "${name}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    if (res.ok) { fetchProjects(); }
    else { alert('Failed to delete project.'); }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Portfolio</h1>

      <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl mb-12">
        <h2 className="text-xl font-bold mb-4">Add New Project</h2>
        {message && <p className="mb-4 text-sm font-semibold">{message}</p>}
        <form onSubmit={handleAdd} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm mb-1">Project Name</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Image URL (Unsplash recommended)</label>
            <input required type="text" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Project Link (Optional)</label>
            <input type="text" value={formData.projectLink} onChange={e => setFormData({...formData, projectLink: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2" />
          </div>
          <button disabled={loading} type="submit" className="px-6 py-2 bg-gradient-to-r from-[#00D9FF] to-[#6C63FF] text-black font-semibold rounded hover:scale-105 transition-all shadow-[0_0_15px_#00D9FF]">
            {loading ? 'Adding...' : 'Add Project'}
          </button>
        </form>
      </div>

      <h2 className="text-xl font-bold mb-4">Existing Projects</h2>
      <div className="grid grid-cols-1 gap-6">
        {projects.map((p: any) => (
          <div key={p.id || p._id} className="bg-neutral-900 border border-white/10 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex gap-4 items-center">
              <img src={p.imageUrl} alt={p.name} className="w-24 h-24 object-cover rounded bg-neutral-800" />
              <div>
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-sm text-neutral-400 line-clamp-2 max-w-xl">{p.description}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(p.id || p._id, p.name)} className="px-4 py-2 bg-red-500/20 text-red-500 border border-red-500/30 rounded hover:bg-red-500/40 transition-colors text-sm font-semibold">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
