
import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  floating?: boolean;
  delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  title, 
  className = '', 
  floating = false,
  delay = 0
}) => {
  const CardContent = (
    <div className={`p-5 rounded-2xl backdrop-blur-[16px] bg-white/5 border border-white/10 shadow-2xl relative overflow-hidden group ${className}`}>
      {/* Internal Glow Effect */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-cyan-500/5 blur-3xl rounded-full group-hover:bg-cyan-500/20 transition-all duration-700 pointer-events-none" />
      
      {title && <h3 className="text-sm font-semibold text-slate-400 mb-4 tracking-tight">{title}</h3>}
      {children}
    </div>
  );

  if (floating) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: 1, 
          y: [0, -6, 0],
        }}
        whileHover={{ scale: 1.01 }}
        transition={{ 
          opacity: { duration: 0.5, delay },
          y: { 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay 
          },
          scale: { type: "spring", stiffness: 400, damping: 10 }
        }}
      >
        {CardContent}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.005 }}
      transition={{ 
        duration: 0.4, 
        delay,
        scale: { type: "spring", stiffness: 400, damping: 20 }
      }}
    >
      {CardContent}
    </motion.div>
  );
};
