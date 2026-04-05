'use client';

import { useState, useEffect } from 'react';

export default function AdminTeam() {
  const [team, setTeam] = useState([]);
  const [formData, setFormData] = useState({ name: '', role: '', imageUrl: '', display_order: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchTeam = async () => {
    const res = await fetch('/api/team');
    const data = await res.json();
    if (data.team) setTeam(data.team);
  };

  useEffect(() => { fetchTeam(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, display_order: Number(formData.display_order) || 0 })
    });
    if (res.ok) {
      setFormData({ name: '', role: '', imageUrl: '', display_order: '' });
      setMessage('✅ Team member added!');
      fetchTeam();
    } else {
      setMessage('❌ Failed to add member.');
    }
    setLoading(false);
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/team/${id}`, { method: 'DELETE' });
    if (res.ok) { fetchTeam(); }
    else { alert('Failed to delete member.'); }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Team</h1>

      <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl mb-12">
        <h2 className="text-xl font-bold mb-4">Add Team Member</h2>
        {message && <p className="mb-4 text-sm font-semibold">{message}</p>}
        <form onSubmit={handleAdd} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Role (e.g. Founder &amp; CEO)</label>
            <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Image URL (Unsplash recommended)</label>
            <input required type="text" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Display Order <span className="text-neutral-500">(1 = first, 2 = second… higher number = appears later)</span></label>
            <input required type="number" min={1} placeholder="e.g. 5" value={formData.display_order} onChange={e => setFormData({...formData, display_order: e.target.value})} className="w-full bg-black border border-white/20 rounded px-4 py-2" />
          </div>
          <button disabled={loading} type="submit" className="px-6 py-2 bg-gradient-to-r from-[#00D9FF] to-[#6C63FF] text-black font-semibold rounded hover:scale-105 transition-all shadow-[0_0_15px_#00D9FF]">
            {loading ? 'Adding...' : 'Add Member'}
          </button>
        </form>
      </div>

      <h2 className="text-xl font-bold mb-4">Team Roster <span className="text-neutral-500 text-sm font-normal">(sorted by display order)</span></h2>
      <div className="grid grid-cols-1 gap-6 max-w-4xl">
        {team.map((t: any) => (
          <div key={t.id || t._id} className="bg-neutral-900 border border-white/10 p-4 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <span className="text-xs text-neutral-500 font-mono border border-white/10 px-2 py-1 rounded">#{t.display_order || t.order}</span>
              <img src={t.imageUrl} alt={t.name} className="w-16 h-16 object-cover rounded-full bg-neutral-800" />
              <div>
                <h3 className="font-bold text-lg">{t.name}</h3>
                <p className="text-sm text-neutral-400">{t.role}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(t.id || t._id, t.name)} className="px-3 py-1.5 bg-red-500/20 text-red-500 border border-red-500/30 rounded hover:bg-red-500/40 transition-colors text-sm font-semibold">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
