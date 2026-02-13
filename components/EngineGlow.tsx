
import React from 'react';

interface EngineGlowProps {
  color: string;
  position: string;
}

export const EngineGlow: React.FC<EngineGlowProps> = ({ color, position }) => {
  return (
    <div 
      className={`fixed w-[800px] h-[800px] rounded-full pointer-events-none blur-[120px] mix-blend-screen transition-all duration-1000 ${position}`}
      style={{
        background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`
      }}
    />
  );
};
