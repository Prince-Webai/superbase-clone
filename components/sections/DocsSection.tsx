
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Search, Rocket, Zap, Database, Shield, Box, ChevronRight, Copy, Terminal, ExternalLink } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { EngineGlow } from '../EngineGlow';

interface DocsSectionProps {
  onBack: () => void;
  onLaunch: () => void;
}

const docsNavigation = [
  {
    title: 'Getting Started',
    items: ['Introduction', 'Core Concepts', 'Orbital CLI', 'First Mission'],
  },
  {
    title: 'Architecture',
    items: ['The Void Vault', 'Engine Clusters', 'Zero-G Routing', 'Telemetry'],
  },
  {
    title: 'Edge Logic',
    items: ['Serverless Functions', 'Wasm Modules', 'Database Hooks', 'Cron Jobs'],
  },
  {
    title: 'Security',
    items: ['Auth Systems', 'Policy Engine', 'Secret Management', 'Network Shields'],
  },
];

export const DocsSection: React.FC<DocsSectionProps> = ({ onBack, onLaunch }) => {
  const [activeTopic, setActiveTopic] = useState('Introduction');

  const renderContent = () => {
    switch (activeTopic) {
      case 'Introduction':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">The Manifest</h1>
              <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
                Welcome to Anti-Gravity, the first weightless cloud infrastructure platform. 
                Built for builders who demand performance without the friction of traditional atmospheric hosting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GlassCard className="!bg-cyan-500/5 hover:!bg-cyan-500/10 transition-colors cursor-pointer group">
                <div className="flex gap-4">
                  <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl group-hover:scale-110 transition-transform"><Rocket size={24} /></div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Quickstart Guide</h3>
                    <p className="text-xs text-slate-500">Launch your first cluster in under 60 seconds.</p>
                  </div>
                </div>
              </GlassCard>
              <GlassCard className="!bg-violet-500/5 hover:!bg-violet-500/10 transition-colors cursor-pointer group">
                <div className="flex gap-4">
                  <div className="p-3 bg-violet-500/10 text-violet-400 rounded-xl group-hover:scale-110 transition-transform"><Terminal size={24} /></div>
                  <div>
                    <h3 className="font-bold text-white mb-1">CLI Reference</h3>
                    <p className="text-xs text-slate-500">Master the `ag` command line interface.</p>
                  </div>
                </div>
              </GlassCard>
            </div>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
              <p className="text-slate-400">Install the Anti-Gravity CLI to manage your orbital assets locally.</p>
              <div className="relative group">
                <div className="absolute inset-0 bg-cyan-500/10 blur-xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />
                <div className="relative bg-black/60 border border-white/10 rounded-xl p-4 font-mono text-sm flex items-center justify-between">
                  <span className="text-cyan-400">npm install <span className="text-white">-g @anti-gravity/cli</span></span>
                  <button className="p-2 text-slate-500 hover:text-white transition-colors"><Copy size={16} /></button>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Core Pillars</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Zap, label: 'Zero-G', desc: 'No friction, instant deployments.' },
                  { icon: Box, label: 'Modular', desc: 'Scales from single node to galaxy.' },
                  { icon: Shield, label: 'Vaulted', desc: 'Secured by default, always.' },
                ].map((pillar, i) => (
                  <div key={i} className="space-y-2">
                    <div className="text-cyan-400"><pillar.icon size={20} /></div>
                    <h4 className="font-bold">{pillar.label}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="p-4 rounded-full bg-white/5 text-slate-600"><FileText size={48} /></div>
            <h2 className="text-xl font-bold">Documentation In Progress</h2>
            <p className="text-slate-500 max-w-md">Our documentation crew is currently cataloging this sector. Check back soon for the full manifest.</p>
            <button onClick={() => setActiveTopic('Introduction')} className="text-cyan-400 text-sm hover:underline">Back to Introduction</button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc] flex flex-col">
      <EngineGlow color="rgba(6, 182, 212, 0.1)" position="top-[-10%] right-[-10%]" />
      
      {/* Docs Header */}
      <header className="sticky top-0 z-[100] border-b border-white/5 bg-black/40 backdrop-blur-2xl px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-white transition-all">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <Rocket className="text-cyan-400" size={20} />
              <span className="font-bold tracking-tight">Anti-Gravity Docs</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <input 
                type="text" 
                placeholder="Search the manifest..."
                className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-xs w-64 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
              />
            </div>
            <button onClick={onLaunch} className="px-4 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-bold hover:bg-violet-500 transition-all">
              App Login
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-white/5 hidden lg:block py-8 px-6 space-y-8 overflow-y-auto max-h-[calc(100vh-65px)] custom-scrollbar">
          {docsNavigation.map((section, i) => (
            <div key={i} className="space-y-3">
              <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{section.title}</h4>
              <ul className="space-y-1">
                {section.items.map((item, j) => (
                  <li key={j}>
                    <button 
                      onClick={() => setActiveTopic(item)}
                      className={`w-full text-left py-1.5 px-3 rounded-lg text-sm transition-all ${
                        activeTopic === item ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="pt-8 border-t border-white/5">
             <a href="#" className="flex items-center justify-between group p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5">
                <span className="text-xs font-bold text-slate-300">GitHub Repo</span>
                <ExternalLink size={14} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
             </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 py-12 px-6 md:px-12 overflow-y-auto custom-scrollbar">
          <div className="max-w-3xl">
            {renderContent()}
          </div>
        </main>

        {/* Right TOC (Optional) */}
        <aside className="w-56 hidden xl:block py-12 px-6">
           <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4">On This Page</h4>
           <ul className="space-y-3 text-xs text-slate-500 border-l border-white/5 pl-4">
              <li className="hover:text-cyan-400 cursor-pointer">Quickstart Guide</li>
              <li className="hover:text-cyan-400 cursor-pointer">Installation</li>
              <li className="hover:text-cyan-400 cursor-pointer">Core Pillars</li>
              <li className="hover:text-cyan-400 cursor-pointer">Community</li>
           </ul>
        </aside>
      </div>
    </div>
  );
};

const FileText: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);
