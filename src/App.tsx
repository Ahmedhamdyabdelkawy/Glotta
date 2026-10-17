/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AudioTestModal } from './components/AudioTestModal';
import { HomeView } from './components/views/HomeView';
import { VoiceRoomView } from './components/views/VoiceRoomView';
import { CommunitiesView } from './components/views/CommunitiesView';
import { AiSummariesView } from './components/views/AiSummariesView';
import { LearnStudyView } from './components/views/LearnStudyView';
import { ChatMessagesView } from './components/views/ChatMessagesView';
import { SettingsView } from './components/views/SettingsView';
import { ViewType } from './types';

const MainLayout: React.FC = () => {
  const { currentView, setCurrentView, isDarkMode } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickNavOpen, setQuickNavOpen] = useState(false);

  // Keyboard shortcut: Cmd+K or Ctrl+K opens quick navigation modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setQuickNavOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setQuickNavOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <HomeView />;
      case 'voice-rooms':
        return <VoiceRoomView />;
      case 'communities':
        return <CommunitiesView />;
      case 'ai-session-summaries':
        return <AiSummariesView />;
      case 'learn-and-study-groups':
        return <LearnStudyView />;
      case 'chat-and-messages':
        return <ChatMessagesView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <HomeView />;
    }
  };

  const navItems: { id: ViewType; label: string; icon: string; desc: string; badge?: string }[] = [
    { id: 'dashboard', label: 'Home Dashboard', icon: 'grid_view', desc: 'Active rooms, speech metrics, instant voice studio' },
    { id: 'voice-rooms', label: 'Voice Rooms & Code Stage', icon: 'mic', desc: 'Polyglot audio stage, live subtitles, IDE code review', badge: 'LIVE' },
    { id: 'communities', label: 'Communities & Hubs', icon: 'groups', desc: 'Kubernetes, Rust, AI clusters with auto-translated feed' },
    { id: 'ai-session-summaries', label: 'AI Summaries & Architecture', icon: 'auto_awesome', desc: 'Multi-lingual consensus briefs, action items, diagram specs' },
    { id: 'learn-and-study-groups', label: 'Learn & Study Groups', icon: 'school', desc: 'Interactive audio pods, peer workshops, flashcards' },
    { id: 'chat-and-messages', label: 'Chat & Discussions', icon: 'forum', desc: 'Multi-stream chat, translated audio notes, syntax inspector' },
    { id: 'settings', label: 'Settings & Calibration', icon: 'tune', desc: 'Neural speech engine, edge routing (FRA-01), mic latency' },
  ];

  return (
    <div className={`min-h-screen bg-surface text-on-surface font-sans selection:bg-primary-fixed selection:text-on-primary-fixed ${isDarkMode ? 'dark' : ''}`}>
      {/* Top Header */}
      <Header onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />

      {/* Desktop & Mobile Sidebar */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <main className="pt-16 md:pl-64 min-h-screen transition-all duration-200">
        <div className="max-w-[1720px] mx-auto min-h-[calc(100vh-4rem)]">
          {renderCurrentView()}
        </div>
      </main>

      {/* Audio Test Modal */}
      <AudioTestModal />

      {/* Quick Screen Switcher Pill Dock (Bottom Right Floating) */}
      <div className="fixed bottom-4 right-4 z-40 hidden sm:flex items-center gap-1.5 p-1.5 bg-surface-container-highest/95 backdrop-blur-md rounded-2xl shadow-xl border border-outline-variant/60">
        <span className="px-2.5 py-1 text-[11px] font-mono font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5 border-r border-outline-variant/40">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Screens ({navItems.findIndex(n => n.id === currentView) + 1}/{navItems.length})
        </span>
        <div className="flex items-center gap-1">
          {navItems.map((item, idx) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                title={`${item.label} — ${item.desc}`}
                className={`relative px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">{item.icon}</span>
                <span className="hidden xl:inline">{item.label.split(' ')[0]}</span>
                <span className="text-[10px] opacity-75 font-mono">{idx + 1}</span>
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setQuickNavOpen(true)}
          className="p-1.5 hover:bg-surface-container-high text-on-surface-variant rounded-lg transition-colors ml-1"
          title="Command Palette (⌘K)"
        >
          <span className="material-symbols-outlined text-[16px]">keyboard_command_key</span>
        </button>
      </div>

      {/* ⌘K Command Palette Modal */}
      {quickNavOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 p-4 animate-in fade-in duration-150">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-outline-variant flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-xl">search</span>
              <input
                type="text"
                autoFocus
                placeholder="Jump to any screen or section..."
                className="bg-transparent border-none text-on-surface placeholder:text-outline text-base w-full focus:outline-none"
              />
              <span className="text-xs font-mono bg-surface-container px-2 py-0.5 rounded text-outline border border-outline-variant">
                ESC
              </span>
            </div>

            <div className="p-2 max-h-[60vh] overflow-y-auto space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-outline font-semibold">
                Available Application Views
              </div>
              {navItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setQuickNavOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all ${
                    currentView === item.id
                      ? 'bg-primary-fixed/30 border border-primary/40 text-primary font-semibold'
                      : 'hover:bg-surface-container text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      currentView === item.id ? 'bg-primary text-on-primary' : 'bg-surface-container text-primary'
                    }`}>
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold flex items-center gap-2">
                        {item.label}
                        {item.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 bg-red-500/10 text-red-500 border border-red-500/30 rounded font-bold">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-on-surface-variant font-normal">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-outline">Screen {idx + 1}</span>
                </button>
              ))}
            </div>

            <div className="p-3 bg-surface-container/50 border-t border-outline-variant flex items-center justify-between text-xs text-outline">
              <span>Glotta Real-Time Engine v2.4 (38ms latency)</span>
              <span>Press <kbd className="px-1.5 py-0.5 bg-surface-container-high rounded text-[10px] font-mono">↑</kbd> <kbd className="px-1.5 py-0.5 bg-surface-container-high rounded text-[10px] font-mono">↓</kbd> to navigate</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
