'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
import Link from 'next/link';
import { ArrowRight, Code, Cpu, LineChart } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full relative bg-black min-h-screen overflow-hidden">
      {/* BACKGROUND SPOTLIGHT */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      {/* HERO SECTION */}
      <section className="relative w-full h-screen flex items-center pt-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center h-full">
          {/* Left Hero Content */}
          <div className="flex-1 relative z-10 flex flex-col justify-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6"
            >
              Build Smart Digital Systems with AI & Web Solutions
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-xl text-neutral-300 max-w-lg mb-8"
            >
              KAVASI transforms your vision into reality. We build highly scalable apps, automated workflows, and immersive web experiences.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex gap-4"
            >
              <Link href="/contact" className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors flex items-center gap-2">
                Start a Project <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/services" className="px-8 py-3 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
                Our Services
              </Link>
            </motion.div>
          </div>

          {/* Right Hero Space - 3D Scene */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex-1 relative h-[60vh] md:h-full w-full"
          >
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </section>

      {/* QUICK SERVICES PREVIEW */}
      <section className="py-24 bg-neutral-950 relative z-10 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Core Capabilities</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">We specialize in blending modern web technologies with AI automation to give your business an unfair advantage.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-900 border border-white/10 p-8 rounded-2xl hover:border-white/30 transition-all hover:-translate-y-2">
              <Code className="w-10 h-10 mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-3">Premium Web Development</h3>
              <p className="text-neutral-400 leading-relaxed">Full-stack web applications tailored to your specific business needs, built on React, Next.js, and Node.</p>
            </div>
            
            <div className="bg-neutral-900 border border-white/10 p-8 rounded-2xl hover:border-white/30 transition-all hover:-translate-y-2">
              <Cpu className="w-10 h-10 mb-4 text-purple-400" />
              <h3 className="text-xl font-bold mb-3">AI Automation</h3>
              <p className="text-neutral-400 leading-relaxed">Integrate intelligent workflows, custom chatbots, and automated processes to streamline operations.</p>
            </div>
            
            <div className="bg-neutral-900 border border-white/10 p-8 rounded-2xl hover:border-white/30 transition-all hover:-translate-y-2">
              <LineChart className="w-10 h-10 mb-4 text-green-400" />
              <h3 className="text-xl font-bold mb-3">Digital Growth</h3>
              <p className="text-neutral-400 leading-relaxed">Performance-driven solutions designed to skyrocket your conversion rates and digital footprint.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
