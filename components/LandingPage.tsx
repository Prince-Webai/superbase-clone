
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, Shield, Database, ArrowRight, ChevronRight, Globe, Github, Box, Sparkles, FileText } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { EngineGlow } from './EngineGlow';

interface LandingPageProps {
  onLaunch: () => void;
  onSignIn: () => void;
  onDocs: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunch, onSignIn, onDocs }) => {
  return (
    <div className="relative min-h-screen bg-[#020617] text-[#f8fafc] overflow-hidden">
      {/* Ambient Background Visuals */}
      <EngineGlow color="rgba(139, 92, 246, 0.2)" position="top-[-30%] left-[-10%]" />
      <EngineGlow color="rgba(6, 182, 212, 0.15)" position="bottom-[-20%] right-[-10%]" />
      
      {/* Stars Parallax */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_8px_1px_rgba(255,255,255,0.8)]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 z-[100]">
        <GlassCard className="!p-3 flex items-center justify-between !rounded-2xl border-white/5 bg-black/20 backdrop-blur-2xl">
          <div className="flex items-center gap-3 pl-2">
            <div className="text-cyan-400">
              <Rocket size={24} />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Anti-Gravity</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <button onClick={onDocs} className="hover:text-cyan-400 transition-colors">Orbit Docs</button>
            <a href="#" className="hover:text-cyan-400 transition-colors">Manifest</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Ecosystem</a>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onSignIn}
              className="hidden sm:block px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-all"
            >
              Sign In
            </button>
            <button 
              onClick={onLaunch}
              className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold transition-all shadow-lg shadow-violet-900/40 border border-white/10"
            >
              Launch Station
            </button>
          </div>
        </GlassCard>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-8"
        >
          <Sparkles size={14} /> Available in Sector 7G
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8 bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent"
        >
          Build beyond the<br />orbital horizon.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed mb-12"
        >
          A weightless developer platform for high-performance distributed applications. 
          Zero latency, zero limits, zero gravity infrastructure.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button 
            onClick={onLaunch}
            className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-lg transition-all shadow-xl shadow-cyan-900/30 border border-white/10"
          >
            Launch Project <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={onDocs}
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-lg transition-all border border-white/10"
          >
            <FileText size={20} /> Manifest Docs
          </button>
        </motion.div>
      </section>

      {/* Footer (Simplified for brevity) */}
      <footer className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
           <div className="flex items-center gap-3">
             <Rocket size={20} className="text-cyan-400" />
             <span className="font-bold text-white">Anti-Gravity</span>
           </div>
           <p>© 2091 Orbital Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
