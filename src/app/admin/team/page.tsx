'use client';

import { useState, useEffect } from 'react';

export default function AdminTeam() {
  const [team, setTeam] = useState([]);
  const [formData, setFormData] = useState({ name: '', role: '', imageUrl: '', order: 0 });
  const [loading, setLoading] = useState(false);

  const fetchTeam = async () => {
    const res = await fetch('/api/team');
    const data = await res.json();
    if(data.team) setTeam(data.team);
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setFormData({ name: '', role: '', imageUrl: '', order: 0 });
    setLoading(false);
    fetchTeam();
  };

  const handleEdit = (id: string, name: string) => {
    alert(`Mock Mode: Edit triggered for Member: ${name}. In production this will auto-fill the form above.`);
  };

  const handleDelete = (id: string, name: string) => {
    alert(`Mock Mode: Delete triggered for Member: ${name}.`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Team</h1>

      <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl mb-12">
        <h2 className="text-xl font-bold mb-4">Add Team Member</h2>
        <form onSubmit={handleAdd} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm mb-1">Name (e.g. Siddhartha)</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Role (e.g. Founder)</label>
            <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Image URL (Unsplash recommended)</label>
            <input required type="text" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2" />
          </div>
          <button disabled={loading} type="submit" className="px-6 py-2 bg-gradient-to-r from-[#00D9FF] to-[#6C63FF] text-black font-semibold rounded hover:scale-105 transition-all shadow-[0_0_15px_#00D9FF]">
            {loading ? 'Adding...' : 'Add Member'}
          </button>
        </form>
      </div>

      <h2 className="text-xl font-bold mb-4">Team Roster</h2>
      <div className="grid grid-cols-1 gap-6 max-w-4xl">
        {team.map((t: any) => (
          <div key={t._id} className="bg-neutral-900 border border-white/10 p-4 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <img src={t.imageUrl} alt={t.name} className="w-16 h-16 object-cover rounded-full bg-neutral-800" />
              <div>
                <h3 className="font-bold text-lg">{t.name}</h3>
                <p className="text-sm text-neutral-400">{t.role}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button onClick={() => handleEdit(t._id, t.name)} className="px-3 py-1.5 bg-neutral-800 border border-white/20 text-white rounded hover:bg-neutral-700 transition-colors text-sm font-semibold">
                Edit
              </button>
              <button onClick={() => handleDelete(t._id, t.name)} className="px-3 py-1.5 bg-red-500/20 text-red-500 border border-red-500/30 rounded hover:bg-red-500/40 transition-colors text-sm font-semibold">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
