
import React from 'react';
import { GlassCard } from '../GlassCard';
import { HardDrive, Cloud, ShieldCheck, Database, ArrowRight } from 'lucide-react';

const silos = [
  { id: 1, name: 'Core-Archives', used: '4.2 PB', total: '10 PB', status: 'Optimal', load: 42 },
  { id: 2, name: 'Edge-Cache-Alpha', used: '1.1 TB', total: '2 TB', status: 'Optimal', load: 55 },
  { id: 3, name: 'Deep-Freeze-Beta', used: '840 PB', total: '1 EB', status: 'Optimal', load: 84 },
  { id: 4, name: 'User-Blobs-West', used: '280 TB', total: '500 TB', status: 'Warning', load: 92 },
];

export const StorageSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Orbital Silos</h2>
            <button className="text-cyan-400 text-sm hover:underline">View All Buckets</button>
          </div>
          <div className="space-y-6">
            {silos.map((silo) => (
              <div key={silo.id} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <Database size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200">{silo.name}</h4>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">{silo.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-slate-300">{silo.used} / {silo.total}</p>
                    <p className="text-[10px] text-slate-500 italic">S3 Compatible</p>
                  </div>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${silo.load > 90 ? 'bg-red-500' : 'bg-cyan-500'}`}
                    style={{ width: `${silo.load}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard title="Storage Health">
            <div className="flex flex-col items-center py-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="58" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <circle cx="64" cy="64" r="58" fill="transparent" stroke="#06b6d4" strokeWidth="8" strokeDasharray="364.4" strokeDashoffset="72.8" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-bold">80%</span>
                  <span className="text-[10px] text-slate-500 uppercase">Available</span>
                </div>
              </div>
              <p className="mt-6 text-sm text-center text-slate-400 leading-relaxed px-4">
                Global storage remains healthy. Redundancy factor is currently <span className="text-cyan-400 font-bold">3x</span>.
              </p>
            </div>
          </GlassCard>

          <GlassCard className="bg-gradient-to-br from-cyan-900/40 to-black border-cyan-500/20">
            <h3 className="font-bold flex items-center gap-2">
              <Cloud size={16} className="text-cyan-400" />
              Cloud Sync
            </h3>
            <p className="text-xs text-slate-400 mt-2">External synchronization to AWS/GCP nodes is active.</p>
            <button className="mt-4 flex items-center gap-2 text-sm text-cyan-400 font-semibold group">
              Settings <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
