
import React, { useEffect, useState } from 'react';
import { GlassCard } from './GlassCard';
import { ProjectTable, Project } from './ProjectTable';
import { 
  Activity, 
  Cpu, 
  Globe, 
  Clock, 
  TrendingUp, 
  Zap,
  ArrowUpRight,
  Server,
  Layers,
  Terminal,
  Settings2,
  Lock,
  Eye,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { supabase } from '../lib/supabase';

const chartData = [
  { name: '00:00', val: 400, cpu: 20 },
  { name: '04:00', val: 600, cpu: 35 },
  { name: '08:00', val: 500, cpu: 30 },
  { name: '12:00', val: 900, cpu: 75 },
  { name: '16:00', val: 750, cpu: 60 },
  { name: '20:00', val: 1200, cpu: 90 },
  { name: '23:59', val: 1100, cpu: 85 },
];

const mockProjects: Project[] = [
  { id: 1, name: 'Nebula-API', status: 'Healthy', regions: 3, storage: '4.2 TB', version: 'v2.1.0', type: 'Backend' },
  { id: 2, name: 'Star-Client-UI', status: 'Deploying', regions: 1, storage: '120 GB', version: 'v4.5.2', type: 'Frontend' },
  { id: 3, name: 'Void-Storage-Master', status: 'Healthy', regions: 12, storage: '840 PB', version: 'v1.0.9', type: 'Storage' },
];

interface DashboardProps {
  activeTab: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ activeTab }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectCount, setProjectCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const { data, count, error } = await supabase
          .from('projects')
          .select('*', { count: 'exact' })
          .limit(5)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || mockProjects);
        setProjectCount(count || data?.length || 0);
      } catch (err) {
        console.warn('Supabase fetch failed, using mock data for dashboard.');
        setProjects(mockProjects);
        setProjectCount(mockProjects.length);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard floating delay={0}>
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Cpu size={20} />
            </div>
            <span className="flex items-center gap-1 text-xs text-green-400 font-medium">
              +12% <TrendingUp size={12} />
            </span>
          </div>
          <div className="mt-4">
            <p className="text-slate-500 text-sm font-medium">Active Clusters</p>
            <p className="text-2xl font-bold mt-1">{loading ? '...' : projectCount}</p>
          </div>
        </GlassCard>

        <GlassCard floating delay={0.1}>
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
              <Globe size={20} />
            </div>
            <span className="text-xs text-slate-400">Stable</span>
          </div>
          <div className="mt-4">
            <p className="text-slate-500 text-sm font-medium">Node Distribution</p>
            <p className="text-2xl font-bold mt-1">14 Countries</p>
          </div>
        </GlassCard>

        <GlassCard floating delay={0.2}>
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Activity size={20} />
            </div>
            <span className="flex items-center gap-1 text-xs text-green-400 font-medium">
              99.9%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-slate-500 text-sm font-medium">Uptime Streak</p>
            <p className="text-2xl font-bold mt-1">452 Days</p>
          </div>
        </GlassCard>

        <GlassCard floating delay={0.3}>
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Zap size={20} />
            </div>
            <span className="text-xs text-slate-400">Active</span>
          </div>
          <div className="mt-4">
            <p className="text-slate-500 text-sm font-medium">Event Stream</p>
            <p className="text-2xl font-bold mt-1">8.2k msg/s</p>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard className="h-[400px]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-bold">Network Throughput</h3>
                <p className="text-sm text-slate-500">Global traffic across all orbital clusters</p>
              </div>
              <button className="flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                View Reports <ArrowUpRight size={14} />
              </button>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(2, 6, 23, 0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f8fafc' }} />
                  <Area type="monotone" dataKey="val" stroke="#06b6d4" fillOpacity={1} fill="url(#colorVal)" strokeWidth={2}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
        <div className="space-y-6">
          <GlassCard title="Cluster Status">
            <div className="space-y-4">
              {[
                { name: 'Lunar North', status: 'Online', load: 45, color: 'bg-green-500' },
                { name: 'Mars Orbit', status: 'Warning', load: 88, color: 'bg-amber-500' },
                { name: 'Saturn Rings', status: 'Online', load: 12, color: 'bg-green-500' },
              ].map((cluster) => (
                <div key={cluster.name} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-200">{cluster.name}</span>
                    <span className="text-slate-500 text-xs">{cluster.status}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div className={`${cluster.color} h-full transition-all duration-1000`} style={{ width: `${cluster.load}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
          <GlassCard className="bg-gradient-to-br from-violet-900/40 to-cyan-900/20 border-violet-500/20">
            <h3 className="font-bold text-violet-100">Upgrade to Stellar Pro</h3>
            <button className="mt-4 w-full py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-all">Go Interstellar</button>
          </GlassCard>
        </div>
      </div>
      <GlassCard title="Recent Orbital Nodes">
        <ProjectTable projects={projects} />
      </GlassCard>
    </div>
  );

  const renderInfrastructure = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard title="Node Distribution Map" className="h-[400px] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
             <div className="w-64 h-64 border border-cyan-500 rounded-full animate-[spin_20s_linear_infinite]" />
             <div className="absolute w-80 h-80 border border-violet-500 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
          </div>
          <div className="text-center z-10">
            <Globe size={48} className="text-cyan-400 mx-auto mb-4 animate-pulse" />
            <h4 className="text-lg font-bold">14 Active Clusters</h4>
            <p className="text-slate-500 text-sm mt-1">Cross-regional orbital synchronization active</p>
          </div>
        </GlassCard>
        <div className="space-y-4">
          {[
            { id: 'OS-01', name: 'Alpha-Prime', region: 'us-east-1', specs: '128 vCPU / 512GB', health: 'Healthy' },
            { id: 'OS-02', name: 'Beta-Link', region: 'eu-west-2', specs: '64 vCPU / 256GB', health: 'Healthy' },
            { id: 'OS-03', name: 'Gamma-Zero', region: 'ap-south-1', specs: '256 vCPU / 1TB', health: 'Maintenance' },
            { id: 'OS-04', name: 'Delta-Flux', region: 'sa-east-1', specs: '32 vCPU / 64GB', health: 'Healthy' },
          ].map(node => (
            <GlassCard key={node.id} className="hover:bg-white/[0.07] transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-violet-500/10 text-violet-400 rounded-xl">
                    <Server size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">{node.name}</h4>
                    <p className="text-xs text-slate-500">{node.id} • {node.region}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${node.health === 'Healthy' ? 'text-green-400 bg-green-500/10' : 'text-amber-400 bg-amber-500/10'}`}>
                    {node.health}
                  </span>
                  <p className="text-[10px] text-slate-600 mt-1">{node.specs}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
      <GlassCard title="Global Infrastructure Logs">
        <div className="font-mono text-xs text-slate-500 space-y-1">
          <p><span className="text-cyan-400">[SYSTEM]</span> Cluster Alpha-Prime successfully migrated 400 containers to Mars-Orbit-02</p>
          <p><span className="text-violet-400">[SYNC]</span> Data consistency check passed for ap-south-1 (Latency: 0.2ms)</p>
          <p><span className="text-amber-400">[WARN]</span> Thermal threshold reached in us-west-4 sector 9. Cooling systems engaged.</p>
        </div>
      </GlassCard>
    </div>
  );

  const renderTelemetry = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard title="CPU Utilization (Global Avg)">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="cpu" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard title="Memory Allocation">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="val" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );

  const renderLogs = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-black/40 p-2 rounded-t-xl border-x border-t border-white/10">
        <div className="flex items-center gap-4 px-2">
           <div className="flex gap-1">
             <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
             <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
             <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
           </div>
           <span className="text-xs font-mono text-slate-500">anti-gravity@orbital-station-01:~/logs</span>
        </div>
        <div className="flex gap-2">
          <button className="p-1.5 hover:bg-white/5 rounded transition-all text-slate-500 hover:text-white"><RefreshCw size={14} /></button>
          <button className="p-1.5 hover:bg-white/5 rounded transition-all text-slate-500 hover:text-white"><Trash2 size={14} /></button>
        </div>
      </div>
      <div className="bg-black/60 rounded-b-xl border-x border-b border-white/10 p-6 min-h-[500px] font-mono text-xs overflow-y-auto max-h-[70vh] custom-scrollbar">
        {[
          { time: '08:24:01', level: 'INFO', msg: 'System heartbeat normal at sector 4-B' },
          { time: '08:24:12', level: 'WARN', msg: 'Atmospheric pressure fluctuation in Server Hall C' },
          { time: '08:24:25', level: 'INFO', msg: 'Database replication complete (Delta 4ms)' },
          { time: '08:25:02', level: 'ERROR', msg: 'External intrusion attempt blocked at Gateway-09' },
          { time: '08:25:10', level: 'INFO', msg: 'Garbage collector reclaimed 4.2GB in L1 Cache' },
          { time: '08:25:15', level: 'INFO', msg: 'Node Beta-Link scaling up: +4 vCPUs allocated' },
          { time: '08:25:44', level: 'INFO', msg: 'Stellar Pro license validated. Advanced features active.' },
          { time: '08:26:01', level: 'INFO', msg: 'User auth request: admin@orbital.inc (Success)' },
          { time: '08:26:05', level: 'WARN', msg: 'Sync delay detected in Saturn-Rings cluster' },
          { time: '08:26:12', level: 'INFO', msg: 'Load balancer re-routed 12k requests to Mars-Orbit' },
        ].map((log, i) => (
          <div key={i} className="flex gap-4 py-0.5 hover:bg-white/5 group px-2 -mx-2">
            <span className="text-slate-600 shrink-0">{log.time}</span>
            <span className={`shrink-0 w-12 font-bold ${log.level === 'ERROR' ? 'text-red-400' : log.level === 'WARN' ? 'text-amber-400' : 'text-cyan-400'}`}>
              {log.level}
            </span>
            <span className="text-slate-300 group-hover:text-white transition-colors">{log.msg}</span>
          </div>
        ))}
        <div className="mt-4 flex items-center gap-2">
           <span className="text-cyan-400">$</span>
           <div className="w-2 h-4 bg-cyan-500 animate-pulse" />
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview': return renderOverview();
      case 'Infrastructure': return renderInfrastructure();
      case 'Telemetry': return renderTelemetry();
      case 'Logs': return renderLogs();
      default: return renderOverview();
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {renderContent()}
    </div>
  );
};
