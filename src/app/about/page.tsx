'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/team')
      .then(res => res.json())
      .then(data => {
        if(data.team) setTeam(data.team);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">About KAVASI</h1>
        <p className="text-xl text-neutral-400 leading-relaxed text-left">
          Founded by <strong>Siddhartha</strong>, KAVASI is a premium Web Development & AI Automation Agency based out of a passion for highly functional, aesthetically pleasing digital systems. 
          We believe in the power of code and artificial intelligence to bring about unprecedented growth for businesses worldwide.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Meet the Team</h2>
        
        {loading ? (
          <div className="flex justify-center"><div className="loader"></div></div>
        ) : team.length === 0 ? (
           <p className="text-center text-neutral-500">Team profiles are not configured yet. Add them from the admin panel.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.id || member._id} className="bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all text-center pb-6">
                <div className="h-64 w-full overflow-hidden mb-6 bg-neutral-800">
                  <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover object-top" />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-neutral-400">{member.role}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
