'use client';

import { useState, useEffect } from 'react';

export default function AdminContacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [sending, setSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const fetchContacts = async () => {
    const res = await fetch('/api/contact');
    const data = await res.json();
    if (data.contacts) setContacts(data.contacts);
  };

  useEffect(() => { fetchContacts(); }, []);

  const sendThankYou = async (contact: any) => {
    setSending(true);
    setStatusMsg('');
    const res = await fetch('/api/contact/thankyou', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contactId: contact.id, name: contact.name, email: contact.email, projectType: contact.projectType })
    });
    if (res.ok) {
      setStatusMsg(`✅ Thank you email sent to ${contact.email}`);
      fetchContacts();
    } else {
      setStatusMsg('❌ Failed to send email. Check SMTP settings.');
    }
    setSending(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>

      {statusMsg && (
        <div className="mb-6 p-4 bg-neutral-800 border border-white/20 rounded-xl text-sm">
          {statusMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Message List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-neutral-400 mb-2">All Submissions ({contacts.length})</h2>
          {contacts.length === 0 ? (
            <p className="text-neutral-500 text-sm">No contact submissions yet.</p>
          ) : (
            contacts.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelected(c)}
                className={`cursor-pointer p-4 rounded-xl border transition-all ${
                  selected?.id === c.id
                    ? 'bg-neutral-800 border-[#00D9FF]/50'
                    : 'bg-neutral-900 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold">{c.name}</p>
                    <p className="text-sm text-[#00D9FF]">{c.email}</p>
                    <p className="text-xs text-neutral-500 mt-1">{c.projectType}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full border ${
                      c.status === 'unread' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' :
                      c.status === 'replied' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                      'bg-blue-500/10 text-blue-400 border-blue-500/30'
                    }`}>{c.status}</span>
                    <p className="text-xs text-neutral-500 mt-2">
                      {new Date(c.created_at).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right: Message Detail */}
        <div className="sticky top-8">
          {selected ? (
            <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold">{selected.name}</h2>
                  <p className="text-[#00D9FF] text-sm">{selected.email}</p>
                  <p className="text-neutral-400 text-sm mt-1">Project: <strong>{selected.projectType}</strong></p>
                </div>
                <p className="text-xs text-neutral-500">{new Date(selected.created_at).toLocaleString('en-IN')}</p>
              </div>

              <h3 className="text-sm text-neutral-400 mb-2 uppercase tracking-wider">Message</h3>
              <p className="text-white leading-relaxed mb-6 bg-black/30 p-4 rounded-xl border border-white/5">
                {selected.message}
              </p>

              <button
                disabled={sending || selected.status === 'replied'}
                onClick={() => sendThankYou(selected)}
                className="w-full py-3 bg-gradient-to-r from-[#00D9FF] to-[#6C63FF] text-black font-bold rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {sending ? 'Sending...' : selected.status === 'replied' ? '✅ Thank You Email Sent' : '📧 Send Thank You Email'}
              </button>
            </div>
          ) : (
            <div className="bg-neutral-900 border border-white/10 rounded-2xl p-12 text-center text-neutral-500">
              <p className="text-4xl mb-4">📬</p>
              <p>Click a message to view it here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
