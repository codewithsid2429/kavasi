'use client';

import * as React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer
      style={{
        background: 'rgba(11,15,26,0.8)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(0,217,255,0.2)'
      }}
      className="pt-16 pb-8 mt-16"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-12">

          {/* Brand & Logo */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1 border-r border-[#00D9FF]/10 pr-4">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <img
                src="/images/logo.png"
                alt="KAVASI Logo"
                className="w-15 h-15 object-contain"
              />

              <span className="text-2xl font-bold tracking-tighter bg-gradient-to-br from-white to-[#00D9FF] bg-clip-text text-transparent">KAVASI</span>
            </Link>
            <p className="text-neutral-400 text-base mb-6 leading-relaxed">
              Crafting the future with web development and AI automation.
            </p>
            <div className="flex gap-4 border-[#00D9FF]/30">
              <Link href="#" className="w-10 h-10 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30 flex items-center justify-center text-[#00D9FF] hover:bg-[#00D9FF] hover:text-[#0B0F1A] hover:shadow-[0_0_20px_#00D9FF] transition-all hover:-translate-y-1">in</Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30 flex items-center justify-center text-[#00D9FF] hover:bg-[#00D9FF] hover:text-[#0B0F1A] hover:shadow-[0_0_20px_#00D9FF] transition-all hover:-translate-y-1">gh</Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30 flex items-center justify-center text-[#00D9FF] hover:bg-[#00D9FF] hover:text-[#0B0F1A] hover:shadow-[0_0_20px_#00D9FF] transition-all hover:-translate-y-1">x</Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-4 bg-gradient-to-br from-white to-[#00D9FF] bg-clip-text text-transparent inline-block">Product</h3>
            <ul className="space-y-3 text-base text-neutral-400">
              <li><Link href="/" className="hover:text-[#00D9FF] hover:pl-1 transition-all">Home</Link></li>
              <li><Link href="/services" className="hover:text-[#00D9FF] hover:pl-1 transition-all">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-[#00D9FF] hover:pl-1 transition-all">Portfolio</Link></li>
              <li><Link href="/pricing" className="hover:text-[#00D9FF] hover:pl-1 transition-all">Pricing</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-xl mb-4 bg-gradient-to-br from-white to-[#00D9FF] bg-clip-text text-transparent inline-block">Company</h3>
            <ul className="space-y-3 text-base text-neutral-400">
              <li><Link href="/about" className="hover:text-[#00D9FF] hover:pl-1 transition-all">About</Link></li>
              <li><Link href="/careers" className="hover:text-[#00D9FF] hover:pl-1 transition-all flex items-center gap-2">Careers <span className="bg-[#00D9FF] text-[#0B0F1A] font-bold text-xs px-2 py-0.5 rounded-full">Hiring</span></Link></li>
              <li><Link href="/contact" className="hover:text-[#00D9FF] hover:pl-1 transition-all">Contact</Link></li>

            </ul>
          </div>

          {/* Office Locations */}
          <div>
            <h3 className="font-bold text-xl mb-4 bg-gradient-to-br from-white to-[#00D9FF] bg-clip-text text-transparent inline-block">Offices</h3>
            <address className="not-italic text-base text-neutral-400 space-y-4">
              <div>
                <strong className="text-white">Head Office:</strong><br />
                Pisnari Bagh,<br />
                Lalitpur, UP, 284403
              </div>
              <div>
                <strong className="text-white">Branch Office:</strong><br />
                Room No. 025,<br />
                RCA Boys Hostel,BBAU, Lucknow, UP, 226010
              </div>
            </address>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-base">© {new Date().getFullYear()} KAVASI, Inc. All rights reserved.</p>
          <div className="flex gap-6 text-base text-neutral-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
