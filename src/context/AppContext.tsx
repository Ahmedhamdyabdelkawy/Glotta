import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ViewType, VoiceRoom } from '../types';
import { DEFAULT_VOICE_ROOM } from '../data/mockData';

interface AppContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  activeRoom: VoiceRoom;
  setActiveRoom: React.Dispatch<React.SetStateAction<VoiceRoom>>;
  isMicMuted: boolean;
  setIsMicMuted: React.Dispatch<React.SetStateAction<boolean>>;
  targetLanguage: string;
  setTargetLanguage: (lang: string) => void;
  audioTestModalOpen: boolean;
  setAudioTestModalOpen: (open: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  roomMode: 'audio-stage' | 'code-stage';
  setRoomMode: (mode: 'audio-stage' | 'code-stage') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('voice-rooms');
  const [activeRoom, setActiveRoom] = useState<VoiceRoom>(DEFAULT_VOICE_ROOM);
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [targetLanguage, setTargetLanguage] = useState<string>('English (US)');
  const [audioTestModalOpen, setAudioTestModalOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [roomMode, setRoomMode] = useState<'audio-stage' | 'code-stage'>('audio-stage');

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        activeRoom,
        setActiveRoom,
        isMicMuted,
        setIsMicMuted,
        targetLanguage,
        setTargetLanguage,
        audioTestModalOpen,
        setAudioTestModalOpen,
        notificationsOpen,
        setNotificationsOpen,
        searchQuery,
        setSearchQuery,
        isDarkMode,
        setIsDarkMode,
        roomMode,
        setRoomMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
