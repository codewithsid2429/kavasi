'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center bg-black"><div className="loader"></div></div>;
  }

  // Login page doesn't need sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black flex text-white">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-neutral-900 border-r border-white/10 p-6 flex flex-col hidden md:flex">
        <div className="font-bold text-2xl mb-10 tracking-tighter">KAVASI Admin</div>
        <nav className="flex-1 space-y-4">
          <a href="/admin" className="block text-neutral-400 hover:text-white">Dashboard</a>
          <a href="/admin/portfolio" className="block text-neutral-400 hover:text-white">Portfolio</a>
          <a href="/admin/team" className="block text-neutral-400 hover:text-white">Team</a>
          <a href="/admin/careers" className="block text-neutral-400 hover:text-white">Careers</a>
          <a href="/admin/content" className="block text-neutral-400 hover:text-white">Content</a>
        </nav>
        <button 
          onClick={() => { localStorage.removeItem('adminToken'); router.push('/admin/login'); }}
          className="mt-auto px-4 py-2 bg-red-500/20 text-red-500 rounded hover:bg-red-500/30 transition-colors"
        >
          Logout
        </button>
      </aside>

      {/* Admin Main Content */}
      <main className="flex-1 overflow-auto bg-black p-8">
        {children}
      </main>
    </div>
  );
}
