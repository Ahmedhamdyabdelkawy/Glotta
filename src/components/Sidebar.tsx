import React from 'react';
import { useApp } from '../context/AppContext';
import { ViewType } from '../types';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { currentView, setCurrentView } = useApp();

  const handleNavClick = (view: ViewType) => {
    setCurrentView(view);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const navItems: {
    id: ViewType;
    label: string;
    icon: string;
    badge?: React.ReactNode;
  }[] = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: 'dashboard',
    },
    {
      id: 'communities',
      label: 'Communities',
      icon: 'hub',
      badge: (
        <span className="font-label-mono text-label-mono bg-surface-container px-2 py-0.5 rounded-full text-on-surface-variant">
          142
        </span>
      ),
    },
    {
      id: 'voice-rooms',
      label: 'Voice Rooms',
      icon: 'record_voice_over',
      badge: (
        <div className="flex items-center gap-1.5 bg-secondary-container px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
          <span className="font-label-mono text-label-mono font-bold text-on-secondary-container">
            LIVE 18
          </span>
        </div>
      ),
    },
    {
      id: 'chat-and-messages',
      label: 'Chat & Messages',
      icon: 'chat',
      badge: <span className="w-2 h-2 rounded-full bg-secondary"></span>,
    },
    {
      id: 'learn-and-study-groups',
      label: 'Learn & Study Groups',
      icon: 'school',
    },
    {
      id: 'ai-session-summaries',
      label: 'AI Session Summaries',
      icon: 'auto_awesome',
      badge: (
        <span className="font-label-mono text-label-mono text-primary font-semibold">
          NEW
        </span>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between py-6 px-4 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6">
          {/* Brand Logo & Title */}
          <div className="flex items-center justify-between px-3">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('dashboard')}>
              <img
                alt="Glotta Brand Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1Vr2yJH-M6x8bCslO18mHlLuMKvguv06ed_EptuTqXzbcvy3u7waoLRVWF8idi1-Maty190URz2NttEPVMRC0ztCuz3hPvrVIgJWttV_fkaETN4u5SM4r4zAO32NwaP8KnhuE2oJcOrPWVYf3B6meR8w56Frslmm9-5pjtiu4f5RYDEHhuGtyETn36_uYPh7jkPE5TMYJoGPbPW-q2Zy6Uq7_CE24AygDqLwH2Vfpf65qNoTL7pRl0AM_E"
              />
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
                  Glotta
                </span>
                <span className="font-label-mono text-label-mono text-on-surface-variant">
                  VOICE TRANSLATE v2.4
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Speech Engine Status */}
          <div className="px-3 py-2 bg-surface-container rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
              <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                Speech Engine
              </span>
            </div>
            <span className="font-label-mono text-label-mono text-primary font-medium bg-surface-container-highest px-2 py-0.5 rounded-full">
              Ready (34ms)
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left w-full ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    <span className="font-label-md text-label-md">{item.label}</span>
                  </div>
                  {item.badge}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Latency Bridge Widget */}
        <div className="flex flex-col gap-3 pt-4 bg-surface-container-lowest p-3 rounded-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between">
            <span className="font-label-mono text-label-mono text-on-surface-variant">
              LATENCY BRIDGE
            </span>
            <span className="font-label-mono text-label-mono text-primary font-bold">
              38ms
            </span>
          </div>
          <div className="flex items-center gap-1 w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full w-4/5"></div>
            <div className="h-full bg-secondary-container rounded-full w-1/5"></div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Acoustic Neural Model
            </span>
            <span className="material-symbols-outlined text-sm text-primary">
              graphic_eq
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
