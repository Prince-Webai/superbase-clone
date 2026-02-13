
import React from 'react';
import { GlassCard } from '../GlassCard';
import { Zap, Play, Terminal, History, Activity } from 'lucide-react';

const functions = [
  { name: 'Auth-Pre-processor', lang: 'TypeScript', invocations: '1.2M', latency: '12ms', status: 'Ready' },
  { name: 'Image-Resizer-Edge', lang: 'Rust/Wasm', invocations: '450k', latency: '4ms', status: 'Ready' },
  { name: 'Telemetry-Aggregator', lang: 'Go', invocations: '8.4M', latency: '24ms', status: 'High Load' },
  { name: 'Email-Trigger-Lambda', lang: 'Node.js', invocations: '12k', latency: '140ms', status: 'Ready' },
];

export const FunctionsSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <GlassCard title="Active Functions">
            <div className="space-y-3">
              {functions.map((fn, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                      <Zap size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200">{fn.name}</h4>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{fn.lang} • {fn.status}</p>
                    </div>
                  </div>
                  <div className="flex gap-8 text-right items-center">
                    <div className="hidden sm:block">
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-tight">Requests</p>
                      <p className="text-sm font-mono text-slate-300">{fn.invocations}</p>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-tight">Avg Latency</p>
                      <p className="text-sm font-mono text-cyan-400">{fn.latency}</p>
                    </div>
                    <button className="p-2 rounded hover:bg-white/10 text-slate-400 hover:text-white">
                      <Play size={16} fill="currentColor" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard title="Function Console" className="bg-black/40 border-cyan-500/10">
            <div className="font-mono text-[10px] space-y-1">
              <p className="text-cyan-400">$ anti-gravity log-stream --tail</p>
              <p className="text-slate-500">[08:24:01] Function 'Auth-Pre' invoked (200 OK)</p>
              <p className="text-slate-500">[08:24:02] Image-Resizer-Edge spin-up: 2.1ms</p>
              <p className="text-amber-500">[08:24:03] Warning: Telemetry-Aggregator memory high</p>
              <p className="text-slate-500">[08:24:04] 14 nodes heartbeat received</p>
              <div className="animate-pulse w-1 h-3 bg-cyan-500 inline-block ml-1" />
            </div>
          </GlassCard>

          <GlassCard title="Performance Distribution">
             <div className="h-32 flex items-end gap-1 px-2">
                {[40, 60, 45, 90, 65, 30, 80, 55, 70, 40, 85, 50].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-cyan-500/20 border-t border-cyan-500/40 rounded-t hover:bg-cyan-500/40 transition-all cursor-pointer"
                    style={{ height: `${h}%` }}
                    title={`Bucket ${i}: ${h}% capacity`}
                  />
                ))}
             </div>
             <p className="text-[10px] text-slate-500 text-center mt-3 font-mono">Execution time across global nodes (ms)</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
