
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Mail, Lock, User, ArrowRight, ChevronLeft, Github, Globe, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { EngineGlow } from './EngineGlow';
import { supabase } from '../lib/supabase';

interface AuthPageProps {
  onBack: () => void;
  onAuthenticated: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onBack, onAuthenticated }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });
        
        if (signUpError) throw signUpError;
        
        if (data.session) {
          // Direct login success (Email confirm disabled)
          onAuthenticated();
        } else {
          // Email confirmation might be required, but we allow manual bypass
          setSuccessMsg('Account initialized. You can now use Command Bypass or check your transmission logs.');
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        onAuthenticated();
      }
    } catch (err: any) {
      setError(err.message || 'An orbital error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 bg-[#020617] overflow-hidden">
      <EngineGlow color="rgba(6, 182, 212, 0.2)" position="top-[-20%] left-[-10%]" />
      <EngineGlow color="rgba(139, 92, 246, 0.15)" position="bottom-[-20%] right-[-10%]" />

      <button 
        onClick={onBack}
        className="fixed top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-white transition-all group z-[100]"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Return to Earth</span>
      </button>

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 mb-4 animate-pulse">
            <Rocket size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter">
            {mode === 'signin' ? 'Resume Command' : 'Initialize Fleet'}
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            {mode === 'signin' ? 'Secure terminal access required' : 'Set up your orbital credentials'}
          </p>
        </motion.div>

        <GlassCard className="!p-8 overflow-visible shadow-cyan-900/10 shadow-2xl border-white/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div
                  key="signup-field"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Commander Alex"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-white"
                      required={mode === 'signup'}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@orbital.inc"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center pl-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pass-Key</label>
                {mode === 'signin' && (
                  <button type="button" className="text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest">Forgot?</button>
                )}
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-white"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs"
              >
                <AlertCircle size={14} />
                <span>{error}</span>
              </motion.div>
            )}

            {successMsg && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs"
              >
                <CheckCircle2 size={14} />
                <span>{successMsg}</span>
              </motion.div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition-all shadow-lg shadow-violet-900/40 relative overflow-hidden disabled:opacity-50"
            >
              <span className={loading ? 'opacity-0' : 'opacity-100'}>
                {mode === 'signin' ? 'Verify Identity' : 'Launch Session'}
              </span>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 space-y-3">
            <button 
              onClick={onAuthenticated}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-all text-sm font-bold text-cyan-400"
            >
              <ShieldCheck size={18} /> Command Bypass (Guest Mode)
            </button>
            <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium text-slate-400 hover:text-white">
              <Github size={18} /> Sync with GitHub
            </button>
          </div>
        </GlassCard>

        <p className="text-center mt-6 text-slate-500 text-sm">
          {mode === 'signin' ? "Not in the fleet?" : "Already verified?"}{' '}
          <button 
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors"
          >
            {mode === 'signin' ? 'Join Fleet' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};
