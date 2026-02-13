
import React from 'react';
import { Search, Bell, Plus, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CommandDockProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sectionTitle: string;
}

const tabs = ['Overview', 'Infrastructure', 'Telemetry', 'Logs', 'Environment'];

export const CommandDock: React.FC<CommandDockProps> = ({ activeTab, setActiveTab, sectionTitle }) => {
  return (
    <div className="p-4 w-full max-w-7xl mx-auto space-y-4">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm font-medium">
          <span className="text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">Anti-Gravity</span>
          <ChevronRight size={14} className="text-slate-700" />
          <span className="text-slate-200">Orbital-Station-01</span>
          <ChevronRight size={14} className="text-slate-700" />
          <span className="text-cyan-400 font-bold tracking-wide">{sectionTitle}</span>
          <div className="ml-4 px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/5 text-[10px] uppercase tracking-wider text-cyan-400 font-bold">
            Live
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search command..."
              className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
            />
          </div>
          <button className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-all">
            <Bell size={18} />
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold transition-all shadow-lg shadow-cyan-900/20">
            <Plus size={16} />
            <span>New Command</span>
          </button>
        </div>
      </div>

      {/* Floating Tab Bar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center p-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl w-fit"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all relative ${
              activeTab === tab ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-0 bg-cyan-500/10 rounded-lg -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </motion.nav>
    </div>
  );
};
