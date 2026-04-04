'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'rgba(11, 15, 26, 0.5)',
        backdropFilter: 'blur(16px) saturate(180%)',
        border: '1px solid rgba(0, 217, 255, 0.15)',
        boxShadow: '0 15px 35px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,217,255,0.1) inset'
      }}
      className="fixed top-6 left-4 right-4 md:left-8 md:right-8 z-50 rounded-full"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO PLACEHOLDER */}
        <Link href="/" className="flex items-center gap-2 group">
          <img 
            src="/images/logo.png" 
            alt="KAVASI Logo" 
            className="w-15 h-15 object-contain" 
          />
          <span className="text-xl font-bold tracking-tighter bg-gradient-to-br from-white to-[#00D9FF] bg-clip-text text-transparent">KAVASI</span>
        </Link>
        
        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-6 items-center text-base font-medium text-neutral-300">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-[#00D9FF] transition-colors hover:drop-shadow-[0_0_8px_#00D9FF]">
              {link.name}
            </Link>
          ))}
          <Link href="/contact" className="px-6 py-2 bg-gradient-to-br from-[#00D9FF] to-[#6C63FF] text-[#0B0F1A] font-bold rounded-full shadow-[0_0_15px_#00D9FF] hover:scale-105 hover:shadow-[0_0_30px_#8A2BE2] transition-all">
            Get in touch
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden p-2 text-white" onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-neutral-950/90 border-t border-white/10 overflow-hidden rounded-b-[40px]"
          >
            <div className="flex flex-col p-4 space-y-4 text-center pb-8 mt-2">
              {links.map((link) => (
                <Link key={link.name} href={link.href} onClick={toggleMenu} className="text-xl font-medium text-neutral-300 hover:text-[#00D9FF] transition-colors">
                  {link.name}
                </Link>
              ))}
              <Link href="/contact" onClick={toggleMenu} className="mx-auto mt-4 px-8 py-3 bg-gradient-to-br from-[#00D9FF] to-[#6C63FF] text-[#0B0F1A] font-bold rounded-full shadow-[0_0_15px_#00D9FF]">
                Get in touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
