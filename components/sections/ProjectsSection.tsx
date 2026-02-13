
import React, { useState, useMemo, useEffect } from 'react';
import { GlassCard } from '../GlassCard';
import { ProjectTable, Project } from '../ProjectTable';
import { Plus, Filter, X, Search, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';

const fallbackProjects: Project[] = [
  { id: 1, name: 'Nebula-API (Fallback)', status: 'Healthy', regions: 3, storage: '4.2 TB', version: 'v2.1.0', type: 'Backend' },
];

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('Backend');

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.warn('Could not fetch from Supabase, using fallback data.', err);
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, searchTerm]);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newProject = {
      name: newName,
      type: newType,
      status: 'Deploying',
      regions: 1,
      storage: '0 GB',
      version: 'v1.0.0'
    };

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([newProject])
        .select();

      if (error) throw error;
      if (data) setProjects([data[0] as Project, ...projects]);
    } catch (err) {
      console.error('Failed to add project to Supabase:', err);
      // Local fallback for UI demo
      setProjects([{ id: Date.now(), ...newProject }, ...projects]);
    } finally {
      setNewName('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Orbital Projects</h1>
          <p className="text-slate-500 mt-2">Manage your distributed edge clusters and nodes.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchProjects}
            className="p-2 rounded-lg hover:bg-white/5 text-slate-500 transition-all"
            title="Sync with Station"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin text-cyan-400' : ''} />
          </button>
          <button 
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm ${
              isFilterVisible ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Filter size={16} /> Filter
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold transition-all shadow-lg shadow-violet-900/20"
          >
            <Plus size={16} /> New Project
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isFilterVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="text"
                  placeholder="Filter by name or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/20 border border-white/5 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <GlassCard className={loading ? 'opacity-50 pointer-events-none transition-opacity' : ''}>
        <ProjectTable projects={filteredProjects} />
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard title="Project Activity" className="h-48 flex items-center justify-center text-slate-500 italic">
          Activity log visualizer coming soon...
        </GlassCard>
        <GlassCard title="Resource Allocation" className="h-48 flex items-center justify-center text-slate-500 italic">
          Resource distribution heat-map coming soon...
        </GlassCard>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Initialize New Project</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-lg text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddProject} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Project Identity</label>
                  <input 
                    type="text" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Orion-Core-Sync"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Logic Tier</label>
                  <select 
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 appearance-none cursor-pointer"
                  >
                    <option value="Backend" className="bg-slate-900">Backend Logic</option>
                    <option value="Frontend" className="bg-slate-900">Frontend Client</option>
                    <option value="Storage" className="bg-slate-900">Distributed Storage</option>
                    <option value="Security" className="bg-slate-900">Security / Auth</option>
                    <option value="Compute" className="bg-slate-900">Edge Compute</option>
                  </select>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 rounded-lg bg-white/5 text-sm font-semibold text-slate-300 hover:bg-white/10 transition-all"
                  >
                    Abort
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-2.5 rounded-lg bg-violet-600 text-sm font-bold text-white hover:bg-violet-500 transition-all shadow-lg shadow-violet-900/40"
                  >
                    Launch Project
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
