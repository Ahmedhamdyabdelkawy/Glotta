import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CURRENT_USER } from '../data/mockData';

interface HeaderProps {
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileMenu }) => {
  const {
    targetLanguage,
    setTargetLanguage,
    setAudioTestModalOpen,
    notificationsOpen,
    setNotificationsOpen,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const availableLanguages = [
    { code: 'en-US', label: 'English (US)', flag: '🇺🇸' },
    { code: 'ar-EG', label: 'Arabic (Egypt)', flag: '🇪🇬' },
    { code: 'fr-FR', label: 'French (France)', flag: '🇫🇷' },
    { code: 'de-DE', label: 'German (Germany)', flag: '🇩🇪' },
    { code: 'ja-JP', label: 'Japanese', flag: '🇯🇵' },
    { code: 'es-ES', label: 'Spanish', flag: '🇪🇸' },
  ];

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-4 lg:px-6 flex items-center justify-between">
      {/* Mobile menu toggle button */}
      <button
        onClick={onToggleMobileMenu}
        className="lg:hidden mr-3 p-2 rounded-xl text-on-surface-variant hover:bg-surface-container"
        title="Open navigation"
      >
        <span className="material-symbols-outlined text-2xl">menu</span>
      </button>

      {/* Search Input */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-xl pointer-events-none">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low rounded-xl font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
            placeholder="Search communities, rooms, topics..."
            type="text"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 lg:gap-3">
        {/* Language selector dropdown */}
        <div className="relative">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center gap-1.5 lg:gap-2 px-3 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface transition-all text-xs lg:text-sm"
            type="button"
          >
            <span className="material-symbols-outlined text-base text-primary">
              translate
            </span>
            <span className="hidden sm:inline font-body-sm text-body-sm font-medium">
              Translating to:
            </span>
            <span className="font-label-md text-label-md font-semibold text-primary">
              {targetLanguage}
            </span>
            <span className="material-symbols-outlined text-sm text-on-surface-variant">
              arrow_drop_down
            </span>
          </button>

          {langDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/30 py-1.5 z-50">
              <div className="px-3 py-1 font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                Select Listening Target
              </div>
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setTargetLanguage(lang.label);
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-surface-container transition-colors ${
                    targetLanguage === lang.label ? 'bg-surface-container-low font-bold text-primary' : 'text-on-surface'
                  }`}
                >
                  <span className="flex items-center gap-2 font-body-sm text-body-sm">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </span>
                  {targetLanguage === lang.label && (
                    <span className="material-symbols-outlined text-sm text-primary">check</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live on air pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low">
          <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
          <span className="font-label-mono text-label-mono text-on-surface font-semibold">
            LIVE ON-AIR
          </span>
        </div>

        {/* Audio Test Button */}
        <button
          onClick={() => setAudioTestModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-all text-xs lg:text-sm"
          type="button"
        >
          <span className="material-symbols-outlined text-base text-secondary">
            hearing
          </span>
          <span className="hidden md:inline font-body-sm text-body-sm font-medium">
            Audio Test
          </span>
        </button>

        {/* Notifications toggle */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            aria-label="Notifications"
            className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all relative"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 p-4 z-50 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                <span className="font-label-md text-label-md font-bold text-on-surface">Notifications</span>
                <span className="font-label-mono text-label-mono text-primary font-semibold">3 Unread</span>
              </div>
              <div className="flex flex-col gap-2.5 max-h-64 overflow-y-auto pr-1">
                <div className="p-2 rounded-lg bg-surface-container-low flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-on-surface">MIT 6.824 Study Pod</span>
                    <span className="text-on-surface-variant font-mono">2m ago</span>
                  </div>
                  <p className="text-xs text-on-surface-variant">Kareem started speaking Arabic (Real-time bridge synced).</p>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-on-surface">AI Summary Ready</span>
                    <span className="text-on-surface-variant font-mono">15m ago</span>
                  </div>
                  <p className="text-xs text-on-surface-variant">Distributed Consensus &amp; Raft Algorithm in Go synthesis finalized.</p>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-on-surface">Workshop Reminder</span>
                    <span className="text-on-surface-variant font-mono">1h ago</span>
                  </div>
                  <p className="text-xs text-on-surface-variant">Real-Time WebRTC Media Pipelines begins tomorrow at 17:00 UTC.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User profile avatar */}
        <div className="flex items-center gap-3 pl-1 lg:pl-2">
          <div className="relative">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-container"
              src={CURRENT_USER.avatar}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary border-2 border-surface-container-lowest"></span>
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="font-label-md text-label-md font-semibold text-on-surface leading-tight">
              {CURRENT_USER.name}
            </span>
            <span className="font-label-mono text-label-mono text-on-surface-variant">
              Online · EN/DE/RU
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
