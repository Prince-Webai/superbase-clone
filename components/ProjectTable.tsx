
import React from 'react';
import { MoreHorizontal, Shield, Zap, Globe, HardDrive } from 'lucide-react';

export interface Project {
  id: number;
  name: string;
  status: string;
  regions: number;
  storage: string;
  version: string;
  type: string;
}

interface ProjectTableProps {
  projects: Project[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Healthy': return 'text-green-400 bg-green-500/10';
    case 'Deploying': return 'text-cyan-400 bg-cyan-500/10';
    case 'Maintenance': return 'text-amber-400 bg-amber-500/10';
    default: return 'text-slate-400 bg-slate-500/10';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Backend': return <Zap size={14} />;
    case 'Security': return <Shield size={14} />;
    case 'Storage': return <HardDrive size={14} />;
    default: return <Globe size={14} />;
  }
};

export const ProjectTable: React.FC<ProjectTableProps> = ({ projects = [] }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="py-20 text-center text-slate-500 italic">
        No projects found matching your criteria.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/5 text-xs text-slate-500 font-bold uppercase tracking-widest">
            <th className="pb-4 pl-2">Node Name</th>
            <th className="pb-4">Status</th>
            <th className="pb-4">Coverage</th>
            <th className="pb-4">Payload</th>
            <th className="pb-4">Revision</th>
            <th className="pb-4 pr-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {projects.map((p) => (
            <tr key={p.id} className="group hover:bg-white/[0.02] transition-colors">
              <td className="py-4 pl-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-white/5 text-cyan-400">
                    {getTypeIcon(p.type)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-200">{p.name}</span>
                    <span className="text-[10px] text-slate-500">{p.type}</span>
                  </div>
                </div>
              </td>
              <td className="py-4">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter ${getStatusColor(p.status)}`}>
                  {p.status}
                </span>
              </td>
              <td className="py-4 text-sm text-slate-400">{p.regions} Clusters</td>
              <td className="py-4 text-sm text-slate-400">{p.storage}</td>
              <td className="py-4 text-xs font-mono text-slate-600">{p.version}</td>
              <td className="py-4 pr-2 text-right">
                <button className="p-2 rounded-lg text-slate-600 hover:text-white hover:bg-white/5 transition-all">
                  <MoreHorizontal size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
