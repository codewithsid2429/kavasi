'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [cRes, pRes, tRes] = await Promise.all([
          fetch('/api/contact'),
          fetch('/api/projects'),
          fetch('/api/team'),
        ]);
        const [cData, pData, tData] = await Promise.all([
          cRes.json(), pRes.json(), tRes.json()
        ]);
        if (cData.contacts) setContacts(cData.contacts);
        if (pData.projects) setProjects(pData.projects);
        if (tData.team) setTeam(tData.team);
      } catch (e) {
        console.error('Dashboard fetch error:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Review</h1>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-neutral-400 mb-2">Total Contacts</h3>
          <p className="text-4xl font-bold">{loading ? '—' : contacts.length}</p>
        </div>
        <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-neutral-400 mb-2">Projects in Portfolio</h3>
          <p className="text-4xl font-bold">{loading ? '—' : projects.length}</p>
        </div>
        <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl">
          <h3 className="text-neutral-400 mb-2">Team Members</h3>
          <p className="text-4xl font-bold">{loading ? '—' : team.length}</p>
        </div>
      </div>

      {/* Contact Submissions */}
      <h2 className="text-2xl font-bold mb-6">Recent Contact Submissions</h2>
      <div className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-neutral-800">
            <tr>
              <th className="p-4 font-medium text-neutral-400">Name</th>
              <th className="p-4 font-medium text-neutral-400">Email</th>
              <th className="p-4 font-medium text-neutral-400">Project Type</th>
              <th className="p-4 font-medium text-neutral-400">Status</th>
              <th className="p-4 font-medium text-neutral-400">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-4 text-center text-neutral-500">Loading...</td></tr>
            ) : contacts.length === 0 ? (
              <tr><td colSpan={5} className="p-4 text-center text-neutral-500">No contact submissions yet.</td></tr>
            ) : (
              contacts.map((c: any) => (
                <tr key={c.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold">{c.name}</td>
                  <td className="p-4 text-[#00D9FF]">{c.email}</td>
                  <td className="p-4">{c.projectType}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full border ${
                      c.status === 'unread' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                      c.status === 'read' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                      'bg-green-500/10 text-green-400 border-green-500/30'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-neutral-400 text-sm">
                    {new Date(c.created_at).toLocaleDateString('en-IN')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Message Preview */}
      {contacts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Latest Message</h2>
          <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-bold text-lg">{contacts[0].name}</p>
                <p className="text-[#00D9FF] text-sm">{contacts[0].email}</p>
              </div>
              <span className="text-sm text-neutral-400">{contacts[0].projectType}</span>
            </div>
            <p className="text-neutral-300 leading-relaxed border-t border-white/10 pt-4">{contacts[0].message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
