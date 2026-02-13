
import React, { useState, useEffect } from 'react';
import { GlassCard } from '../GlassCard';
import { Users, Mail, Shield, UserPlus, MoreVertical, Globe, X, Trash2, Edit3, Lock, RefreshCw, Check, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';

export interface CrewMember {
  id: number;
  name: string;
  role: string;
  status: string;
  email: string;
  initials: string;
  color: string;
}

const fallbackCrew: CrewMember[] = [
  { id: 1, name: 'Commander Alex', role: 'Owner', status: 'On Station', email: 'alex@orbital.inc', initials: 'CA', color: 'bg-violet-500' },
];

const ROLES = ['Owner', 'Maintainer', 'Developer', 'Security'];
const STATUSES = ['On Station', 'Remote (Luna)', 'Remote (Mars)', 'Offline'];
const COLORS = ['bg-violet-500', 'bg-cyan-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-blue-500'];

export const TeamSection: React.FC = () => {
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<CrewMember | null>(null);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Developer',
    status: 'On Station'
  });

  const fetchCrew = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('crew')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCrew(data || []);
    } catch (err) {
      console.warn('Using fallback crew data.', err);
      setCrew(fallbackCrew);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrew();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const initials = formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const color = editingMember ? editingMember.color : COLORS[Math.floor(Math.random() * COLORS.length)];

    const payload = { 
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      initials, 
      color 
    };

    try {
      if (editingMember) {
        const { error } = await supabase
          .from('crew')
          .update(payload)
          .eq('id', editingMember.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('crew')
          .insert([payload]);
        if (error) throw error;
      }
      
      await fetchCrew();
      closeModal();
    } catch (err: any) {
      console.error('Operation failed:', err);
      setError(err.message || 'Transmission failed. Check orbital connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async (id: number) => {
    if (!confirm('Are you sure you want to de-orbit this crew member?')) return;
    try {
      const { error } = await supabase.from('crew').delete().eq('id', id);
      if (error) throw error;
      setCrew(crew.filter(c => c.id !== id));
      setActiveMenu(null);
    } catch (err) {
      console.error('Removal failed:', err);
    }
  };

  const openEdit = (member: CrewMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      role: member.role,
      status: member.status
    });
    setIsModalOpen(true);
    setActiveMenu(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
    setError(null);
    setFormData({ name: '', email: '', role: 'Developer', status: 'On Station' });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Crew Manifest</h2>
          <p className="text-sm text-slate-500 mt-1">Personnel currently assigned to Orbital-Station-01</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchCrew}
            className="p-2 rounded-lg hover:bg-white/5 text-slate-500 transition-all"
            disabled={loading}
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold transition-all shadow-lg shadow-cyan-900/20"
          >
            <UserPlus size={16} /> Invite Crew Member
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        <AnimatePresence mode="popLayout">
          {crew.map((member) => (
            <motion.div
              key={member.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <GlassCard className="group hover:border-white/20 transition-all relative overflow-visible h-full">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-full ${member.color} flex items-center justify-center font-bold text-white shadow-lg relative z-10`}>
                    {member.initials}
                  </div>
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenu(activeMenu === member.id ? null : member.id);
                      }}
                      className="text-slate-600 hover:text-white transition-colors p-1"
                    >
                      <MoreVertical size={18} />
                    </button>
                    
                    {/* Action Menu Dropdown */}
                    <AnimatePresence>
                      {activeMenu === member.id && (
                        <>
                          <div className="fixed inset-0 z-30" onClick={() => setActiveMenu(null)} />
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -10 }}
                            className="absolute right-0 mt-2 w-48 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-40 overflow-hidden"
                          >
                            <div className="py-1">
                              <button 
                                onClick={() => openEdit(member)}
                                className="w-full px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-white/10 hover:text-white flex items-center gap-3 transition-colors"
                              >
                                <Edit3 size={14} className="text-cyan-400" /> Edit Access
                              </button>
                              <button 
                                className="w-full px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-white/10 hover:text-white flex items-center gap-3 transition-colors"
                                onClick={() => setActiveMenu(null)}
                              >
                                <Lock size={14} className="text-violet-400" /> Revoke Tokens
                              </button>
                              <div className="h-px bg-white/5 my-1" />
                              <button 
                                onClick={() => handleRemove(member.id)}
                                className="w-full px-4 py-2.5 text-left text-sm text-rose-400 hover:bg-rose-500/10 flex items-center gap-3 transition-colors font-medium"
                              >
                                <Trash2 size={14} /> Remove Crew
                              </button>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-bold text-lg text-slate-200">{member.name}</h3>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">{member.role}</p>
                </div>
                <div className="mt-6 space-y-2 border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Mail size={12} className="text-slate-600" /> {member.email}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Globe size={12} className="text-slate-600" /> {member.status}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <motion.div 
          layout
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center p-8 text-slate-600 hover:text-slate-400 hover:border-white/10 transition-all cursor-pointer group min-h-[220px]"
        >
          <div className="p-4 rounded-full bg-white/5 mb-4 group-hover:scale-110 transition-transform">
            <Users size={32} />
          </div>
          <p className="font-bold">Vacant Slot</p>
          <p className="text-xs mt-1 italic">Expand your orbital station</p>
        </motion.div>
      </div>

      {/* Invite/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={isSubmitting ? undefined : closeModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Shield size={20} className="text-cyan-400" />
                  {editingMember ? 'Modify Crew Access' : 'Invite New Crew'}
                </h2>
                <button 
                  onClick={closeModal} 
                  disabled={isSubmitting}
                  className="text-slate-500 hover:text-white transition-colors disabled:opacity-30"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleInvite} className="p-6 space-y-5">
                {error && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs animate-in fade-in slide-in-from-top-2">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Orion Pax"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Orbital Email</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="pax@orbital.inc"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Station Role</label>
                    <select 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      disabled={isSubmitting}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 appearance-none cursor-pointer"
                    >
                      {ROLES.map(r => <option key={r} value={r} className="bg-slate-900">{r}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Current Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      disabled={isSubmitting}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 appearance-none cursor-pointer"
                    >
                      {STATUSES.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-xl p-4 flex gap-3 items-start">
                  <Shield size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    By inviting this user, you grant them access to terminal nodes. Roles can be revoked at any time from the master manifest.
                  </p>
                </div>

                <div className="pt-2 flex gap-3">
                  <button 
                    type="button" 
                    onClick={closeModal}
                    disabled={isSubmitting}
                    className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-bold text-slate-400 transition-all disabled:opacity-30"
                  >
                    Abort
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-black transition-all shadow-lg shadow-violet-900/40 border border-white/10 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      editingMember ? 'Apply Modifications' : 'Launch Invitation'
                    )}
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
