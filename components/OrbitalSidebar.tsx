
import React from 'react';
import { 
  Rocket, 
  Database, 
  Shield, 
  Zap, 
  Settings, 
  Users, 
  LayoutDashboard,
  Box,
  Home,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dash' },
  { icon: Box, label: 'Projects', id: 'projects' },
  { icon: Database, label: 'Storage', id: 'storage' },
  { icon: Shield, label: 'Security', id: 'security' },
  { icon: Zap, label: 'Functions', id: 'functions' },
  { icon: Users, label: 'Team', id: 'team' },
];

interface OrbitalSidebarProps {
  activeItem: string;
  setActiveItem: (id: string) => void;
  onGoHome?: () => void;
  onGoDocs?: () => void;
}

export const OrbitalSidebar: React.FC<OrbitalSidebarProps> = ({ activeItem, setActiveItem, onGoHome, onGoDocs }) => {
  return (
    <aside className="w-16 md:w-20 bg-black/20 backdrop-blur-xl border-r border-white/5 flex flex-col items-center py-8 gap-10 z-50">
      <motion.button 
        onClick={onGoHome}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="text-cyan-400 cursor-pointer"
      >
        <Rocket size={28} />
      </motion.button>

      <nav className="flex-1 flex flex-col gap-6">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`group relative p-3 rounded-xl transition-all hover:bg-white/5 ${
              activeItem === item.id ? 'text-cyan-400 bg-white/10' : 'text-slate-400 hover:text-cyan-400'
            }`}
            title={item.label}
          >
            <item.icon size={22} />
            <span className="absolute left-full ml-4 px-2 py-1 bg-violet-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-6 pb-4">
        <button onClick={onGoDocs} className="p-3 text-slate-500 hover:text-cyan-400 transition-colors" title="Manifest Docs">
          <FileText size={22} />
        </button>
        <button onClick={onGoHome} className="p-3 text-slate-500 hover:text-cyan-400 transition-colors" title="Back to Landing">
          <Home size={22} />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-[10px] font-bold ring-2 ring-white/10 ring-offset-2 ring-offset-slate-950">
          AG
        </div>
      </div>
    </aside>
  );
};
