
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { OrbitalSidebar } from './components/OrbitalSidebar';
import { CommandDock } from './components/CommandDock';
import { Dashboard } from './components/Dashboard';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { StorageSection } from './components/sections/StorageSection';
import { SecuritySection } from './components/sections/SecuritySection';
import { FunctionsSection } from './components/sections/FunctionsSection';
import { TeamSection } from './components/sections/TeamSection';
import { DocsSection } from './components/sections/DocsSection';
import { EngineGlow } from './components/EngineGlow';
import { LandingPage } from './components/LandingPage';
import { AuthPage } from './components/AuthPage';

type ViewState = 'landing' | 'auth' | 'dashboard' | 'docs';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [activeSidebarItem, setActiveSidebarItem] = useState('dash');
  const [activeTab, setActiveTab] = useState('Overview');

  const renderDashboardContent = () => {
    switch (activeSidebarItem) {
      case 'dash':
        return <Dashboard activeTab={activeTab} />;
      case 'projects':
        return <ProjectsSection />;
      case 'storage':
        return <StorageSection />;
      case 'security':
        return <SecuritySection />;
      case 'functions':
        return <FunctionsSection />;
      case 'team':
        return <TeamSection />;
      default:
        return <Dashboard activeTab={activeTab} />;
    }
  };

  const getSectionTitle = () => {
    const titles: Record<string, string> = {
      dash: 'Dashboard',
      projects: 'Projects',
      storage: 'Storage Silos',
      security: 'Defense Grid',
      functions: 'Edge Logic',
      team: 'Crew Manifest'
    };
    return titles[activeSidebarItem] || 'Dashboard';
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-[#f8fafc] selection:bg-cyan-500/30 font-sans">
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <LandingPage 
              onLaunch={() => setView('auth')} 
              onSignIn={() => setView('auth')} 
              onDocs={() => setView('docs')}
            />
          </motion.div>
        )}

        {view === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <AuthPage 
              onBack={() => setView('landing')} 
              onAuthenticated={() => setView('dashboard')} 
            />
          </motion.div>
        )}

        {view === 'docs' && (
          <motion.div
            key="docs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <DocsSection onBack={() => setView('landing')} onLaunch={() => setView('auth')} />
          </motion.div>
        )}

        {view === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative min-h-screen flex overflow-hidden"
          >
            <EngineGlow color="rgba(139, 92, 246, 0.15)" position="top-[-20%] left-[-10%]" />
            <EngineGlow color="rgba(6, 182, 212, 0.1)" position="bottom-[-10%] right-[-10%]" />

            <OrbitalSidebar 
              activeItem={activeSidebarItem} 
              setActiveItem={setActiveSidebarItem} 
              onGoHome={() => setView('landing')} 
              onGoDocs={() => setView('docs')}
            />

            <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
              <CommandDock 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                sectionTitle={getSectionTitle()}
              />
              
              <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSidebarItem + activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderDashboardContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
