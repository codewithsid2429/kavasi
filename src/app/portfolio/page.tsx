'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if(data.projects) setProjects(data.projects);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">Our Portfolio</h1>
      <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-16 text-lg">
        Explore some of our recent work across web development, SaaS platforms, and AI integrations.
      </p>

      {loading ? (
        <div className="flex justify-center"><div className="loader"></div></div>
      ) : projects.length === 0 ? (
        <div className="text-center text-neutral-500">
          <p>Portfolio is currently being updated. Check back soon!</p>
          <p className="text-sm mt-4">Admin: You can add projects from the dashboard.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p: any) => (
            <div key={p.id || p._id} className="group relative bg-neutral-900 rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2">
              <div className="h-64 overflow-hidden">
                <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">{p.name}</h3>
                <p className="text-neutral-400 mb-6 line-clamp-3">{p.description}</p>
                {p.projectLink && (
                  <a href={p.projectLink} target="_blank" rel="noreferrer" className="inline-block px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors">
                    Visit Project
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
