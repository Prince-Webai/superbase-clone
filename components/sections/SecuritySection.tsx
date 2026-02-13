
import React from 'react';
import { GlassCard } from '../GlassCard';
import { Shield, Key, Lock, Eye, AlertTriangle, ShieldAlert } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard title="Firewall Policies">
          <div className="space-y-4">
            {[
              { rule: 'Allow HTTPS', port: 443, source: 'Anywhere', status: 'Active' },
              { rule: 'Block SQL Inject', port: '*', source: 'External', status: 'Active' },
              { rule: 'SSH Access', port: 22, source: 'Internal VPN', status: 'Strict' },
            ].map((policy, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-emerald-500/10 text-emerald-400">
                    <Shield size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{policy.rule}</p>
                    <p className="text-[10px] text-slate-500">Port {policy.port} • {policy.source}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{policy.status}</span>
              </div>
            ))}
            <button className="w-full py-2 border border-dashed border-white/20 rounded-lg text-xs text-slate-500 hover:text-white hover:border-white/40 transition-all mt-2">
              + Create New Policy
            </button>
          </div>
        </GlassCard>

        <GlassCard title="Access Keys">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-violet-600/10 border border-violet-500/20 relative group overflow-hidden">
               <div className="absolute -top-10 -right-10 w-24 h-24 bg-violet-500/10 blur-2xl group-hover:bg-violet-500/20 transition-all duration-700" />
               <h4 className="font-bold flex items-center gap-2 mb-2 text-violet-300">
                 <Key size={16} /> Production Key
               </h4>
               <div className="flex items-center justify-between bg-black/40 p-2 rounded border border-white/5">
                 <code className="text-xs text-slate-300 font-mono">AG_PRD_4919...F4A</code>
                 <button className="p-1 hover:text-cyan-400 transition-colors"><Eye size={14} /></button>
               </div>
               <p className="text-[10px] text-slate-500 mt-2 italic">Generated 14 days ago by AG_ROOT</p>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 relative group">
               <h4 className="font-bold flex items-center gap-2 mb-2 text-slate-300">
                 <Lock size={16} /> Development Key
               </h4>
               <div className="flex items-center justify-between bg-black/40 p-2 rounded border border-white/5 opacity-50">
                 <code className="text-xs text-slate-500 font-mono">AG_DEV_8273...92B</code>
                 <button className="p-1"><Eye size={14} /></button>
               </div>
               <p className="text-[10px] text-slate-500 mt-2">Expires in 2 days</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="border-amber-500/20 bg-amber-500/5">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-amber-500/20 text-amber-500 animate-pulse">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h3 className="font-bold text-amber-200">Security Recommendation</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              We detected 4 failed authentication attempts from an unknown cluster in the <span className="text-amber-400 font-mono">X-82 Sector</span>. 
              We recommend enabling <span className="text-cyan-400 font-bold underline cursor-pointer">Quantum MFA</span> for all crew members.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
