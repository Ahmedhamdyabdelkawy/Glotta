import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_CHAT_MESSAGES, MOCK_PARTICIPANTS } from '../../data/mockData';
import { ChatMessage } from '../../types';

export const ChatMessagesView: React.FC = () => {
  const { isMicMuted } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [activeChannel, setActiveChannel] = useState('distributed-systems');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [streamTranslationEnabled, setStreamTranslationEnabled] = useState(true);
  const [selectedTone, setSelectedTone] = useState('Technical & Direct');
  const [toneDropdownOpen, setToneDropdownOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: {
        id: 'user-elena',
        name: 'Elena Rostova',
        role: 'Platform Engineer',
        handle: '@elena_dev',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD82WBFfcfDrT64Vw6B1Y0_CRTLRLR3AtG2Kbdnx2JbTFStPM4q-lvxoAu1BQJTQ7HO59cArKCFLCry60bIZyz5LeyUHJF1SVzwL0Q59qJ8dsLqmX3NlKFjLXAIesaOSqIsbyNMPx0ixC6eq7NWu2C1G6R00SLjjRP2YjkYG2n3WLcLJlVa2s1teUPN-tqnr-9rorWoaU-OKIZq5RjGkJdgbCYOKNj3LjAjTIf9MYxk8xg-d4DrtiEH',
        location: 'Berlin, DE',
        language: 'English',
        langCode: 'EN',
        flag: '🇩🇪',
        status: 'speaking',
        latencyMs: 28
      },
      timestamp: 'Just now',
      sourceLang: 'EN (US)',
      targetLang: 'Auto-Broadcast',
      translatedText: inputText,
      reactions: [
        { emoji: '👍', count: 1, active: true }
      ]
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
  };

  const handleToggleVoiceRecord = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
    } else {
      setIsRecordingVoice(false);
      const voiceMsg: ChatMessage = {
        id: `voice-${Date.now()}`,
        sender: {
          id: 'user-elena',
          name: 'Elena Rostova',
          role: 'Platform Engineer',
          handle: '@elena_dev',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD82WBFfcfDrT64Vw6B1Y0_CRTLRLR3AtG2Kbdnx2JbTFStPM4q-lvxoAu1BQJTQ7HO59cArKCFLCry60bIZyz5LeyUHJF1SVzwL0Q59qJ8dsLqmX3NlKFjLXAIesaOSqIsbyNMPx0ixC6eq7NWu2C1G6R00SLjjRP2YjkYG2n3WLcLJlVa2s1teUPN-tqnr-9rorWoaU-OKIZq5RjGkJdgbCYOKNj3LjAjTIf9MYxk8xg-d4DrtiEH',
          location: 'Berlin, DE',
          language: 'English',
          langCode: 'EN',
          flag: '🇩🇪',
          status: 'speaking',
          latencyMs: 28
        },
        timestamp: 'Just now',
        sourceLang: 'EN (US)',
        targetLang: 'Auto-Broadcast',
        originalText: 'Voice note captured with live German & Arabic speech synthesis.',
        translatedText: '"We verified the Raft state machine fuzzing benchmark on the Frankfurt relay node with zero loss."',
        hasAudio: true,
        audioDuration: '0:18',
        reactions: [
          { emoji: '⚡', count: 2, active: true },
          { emoji: '🔥', count: 1, active: false }
        ]
      };
      setMessages(prev => [...prev, voiceMsg]);
    }
  };

  const handleToggleReaction = (msgId: string, emoji: string) => {
    setMessages(prev =>
      prev.map(msg => {
        if (msg.id !== msgId) return msg;
        const existing = msg.reactions.find(r => r.emoji === emoji);
        if (existing) {
          return {
            ...msg,
            reactions: msg.reactions.map(r =>
              r.emoji === emoji ? { ...r, count: r.active ? r.count - 1 : r.count + 1, active: !r.active } : r
            )
          };
        } else {
          return {
            ...msg,
            reactions: [...msg.reactions, { emoji, count: 1, active: true }]
          };
        }
      })
    );
  };

  return (
    <div className="grid grid-cols-12 gap-5 p-4 sm:p-6 h-[calc(100vh-4rem)] max-w-[1720px] mx-auto w-full overflow-hidden">
      {/* LEFT PANE: Channels & Direct Messages (3 cols) */}
      <div className="col-span-12 md:col-span-4 xl:col-span-3 flex flex-col h-full bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-outline-variant/30">
        <div className="p-4 bg-surface-container-lowest flex flex-col gap-3 border-b border-surface-container">
          <div className="flex items-center justify-between">
            <span className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
              Discussions
            </span>
            <button
              onClick={() => alert('Start a new technical discussion topic')}
              className="p-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary transition-all flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-lg">add_comment</span>
            </button>
          </div>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-lg pointer-events-none">
              search
            </span>
            <input
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-surface-container-low rounded-xl font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary-container text-xs"
              placeholder="Filter channels, engineers, tokens..."
              type="text"
            />
            <span className="absolute right-2.5 font-label-mono text-label-mono text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded text-[10px]">
              ⌘K
            </span>
          </div>
        </div>

        {/* Navigation Lists */}
        <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-5">
          {/* Active Channels */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-2 pt-1">
              <span className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface-variant font-semibold text-[11px]">
                Active Channels
              </span>
              <span className="font-label-mono text-label-mono bg-surface-container px-2 py-0.5 rounded-full text-on-surface-variant text-xs">
                4 active
              </span>
            </div>

            {/* Channel Item 1 */}
            <div
              onClick={() => setActiveChannel('distributed-systems')}
              className={`flex flex-col p-2.5 rounded-xl cursor-pointer transition-all shadow-sm ${
                activeChannel === 'distributed-systems'
                  ? 'bg-surface-container border border-outline-variant/30'
                  : 'hover:bg-surface-container-low'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-headline-md text-headline-md text-primary font-bold">#</span>
                  <span className="font-label-md text-label-md font-bold text-on-surface truncate text-xs sm:text-sm">
                    distributed-systems
                  </span>
                </div>
                <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
              </div>
              <div className="flex items-center justify-between mt-1 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-mono text-label-mono px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-medium text-[10px]">
                    AR
                  </span>
                  <span className="font-label-mono text-label-mono px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-medium text-[10px]">
                    EN
                  </span>
                  <span className="font-label-mono text-label-mono px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-medium text-[10px]">
                    DE
                  </span>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <span className="material-symbols-outlined text-sm">hearing</span>
                  <span className="font-label-mono text-label-mono font-semibold">24</span>
                </div>
              </div>
            </div>

            {/* Channel Item 2 */}
            <div
              onClick={() => setActiveChannel('kubernetes-ops')}
              className={`flex flex-col p-2.5 rounded-xl cursor-pointer transition-all ${
                activeChannel === 'kubernetes-ops' ? 'bg-surface-container' : 'hover:bg-surface-container-low'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-headline-md text-headline-md text-on-surface-variant">#</span>
                  <span className="font-label-md text-label-md font-semibold text-on-surface truncate text-xs sm:text-sm">
                    kubernetes-ops
                  </span>
                </div>
                <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">12m</span>
              </div>
              <div className="flex items-center justify-between mt-1 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-mono text-label-mono px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-medium text-[10px]">
                    EN
                  </span>
                  <span className="font-label-mono text-label-mono px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-medium text-[10px]">
                    JP
                  </span>
                </div>
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">graphic_eq</span>
                  <span className="font-label-mono text-label-mono">11</span>
                </div>
              </div>
            </div>

            {/* Channel Item 3 */}
            <div
              onClick={() => setActiveChannel('rust-internals')}
              className={`flex flex-col p-2.5 rounded-xl cursor-pointer transition-all ${
                activeChannel === 'rust-internals' ? 'bg-surface-container' : 'hover:bg-surface-container-low'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-headline-md text-headline-md text-on-surface-variant">#</span>
                  <span className="font-label-md text-label-md font-semibold text-on-surface truncate text-xs sm:text-sm">
                    rust-internals
                  </span>
                </div>
                <span className="font-label-mono text-label-mono text-primary font-bold text-xs">LIVE</span>
              </div>
              <div className="flex items-center justify-between mt-1 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-mono text-label-mono px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-medium text-[10px]">
                    EN
                  </span>
                  <span className="font-label-mono text-label-mono px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-medium text-[10px]">
                    FR
                  </span>
                  <span className="font-label-mono text-label-mono px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-medium text-[10px]">
                    DE
                  </span>
                </div>
                <div className="flex items-center gap-1 text-secondary font-bold">
                  <span className="material-symbols-outlined text-sm">record_voice_over</span>
                  <span className="font-label-mono text-label-mono">8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Messages */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-2 pt-2">
              <span className="font-label-mono text-label-mono uppercase tracking-wider text-on-surface-variant font-semibold text-[11px]">
                Direct Bridges
              </span>
              <span className="material-symbols-outlined text-base text-on-surface-variant">tune</span>
            </div>

            {/* DM 1 */}
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-container-low cursor-pointer transition-all">
              <div className="relative shrink-0">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  alt="Ahmed Al-Sayed"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5MOiIw4z-wQke6WAfXRicaADjUZZ9utfKZOxhP7YTxWhBnDmlmHMeKW2Yage4FFc7DtegWR8KS4g-p1ldKnW90f5ycP_eAlC_3l8H7HEcPwC90hxiJ3KsTdM1pNuJKEiwjmb_UhT7JYENlAdi1K2FW3URendenTNdZMeMPTqPjqiDmonZYemqdHzo0dwhoBJXSd85PXOz_SP61SyB-BmsTxLxdr6QqxoRi5llKayLrPJF5X6gZ94L"
                />
                <span className="absolute -bottom-1 -right-1 font-label-mono text-[9px] px-1 py-0.2 rounded-full bg-surface-container-highest text-on-surface font-bold">
                  EG
                </span>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-surface-container-lowest"></span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md font-semibold text-on-surface truncate text-xs sm:text-sm">
                    Ahmed Al-Sayed
                  </span>
                  <span className="font-label-mono text-label-mono text-on-surface-variant text-[10px]">2m</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate text-xs">
                  Voice message: "Heartbeat latency..."
                </p>
              </div>
            </div>

            {/* DM 2 */}
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-container-low cursor-pointer transition-all">
              <div className="relative shrink-0">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  alt="Lukas Meyer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBenQDXYfOYNtFqk6nXDgX-DpzUV0Yt1dBVBdOMC85wOhHnmkEDzkWS_QcJr-1boxHiK60o11sa5F6WngaY_q6k1ysDp6MFP46vs3vBbuRbOU71QUm7moEdWZWtRV1-F7Y0ycBjlexrMKtKomu71wuIODpkXchF-c93vWEb9cTNuQPfRshxHYxzWTeCnaJBDO0Hv5xYrWOchDCDUBQmGof1YqY33hHClwddPABDV9c8_5WCCws5QzcD"
                />
                <span className="absolute -bottom-1 -right-1 font-label-mono text-[9px] px-1 py-0.2 rounded-full bg-surface-container-highest text-on-surface font-bold">
                  DE
                </span>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface-container-lowest"></span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md font-semibold text-on-surface truncate text-xs sm:text-sm">
                    Lukas Meyer
                  </span>
                  <span className="font-label-mono text-label-mono text-on-surface-variant text-[10px]">14m</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate text-xs">
                  [Translated] Compaction benchmark attached
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User Active Bridge Status Dock */}
        <div className="p-3 bg-surface-container-low flex items-center justify-between border-t border-surface-container">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-mono text-label-mono font-bold text-xs">
              EN
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md font-semibold text-on-surface text-xs">Elena (Me)</span>
              <span className="font-label-mono text-label-mono text-primary font-medium text-[10px]">
                Bridge: Low Latency
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant" title="Microphone Settings">
              <span className="material-symbols-outlined text-sm">mic</span>
            </button>
            <button className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant" title="Audio Stream">
              <span className="material-symbols-outlined text-sm">graphic_eq</span>
            </button>
          </div>
        </div>
      </div>

      {/* CENTER PANE: Active Chat & Live Translation Stream (6 cols) */}
      <div className="col-span-12 md:col-span-8 xl:col-span-6 flex flex-col h-full bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-outline-variant/30">
        {/* Channel Context Header */}
        <div className="px-5 py-3.5 bg-surface-container-lowest flex items-center justify-between shrink-0 shadow-sm border-b border-surface-container">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-surface-container text-primary font-bold font-headline-md">
              #
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-headline-md text-headline-md font-bold text-on-surface">
                  {activeChannel}
                </span>
                <span className="flex items-center gap-1 font-label-mono text-label-mono text-primary bg-surface-container px-2 py-0.5 rounded-full font-semibold text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  LIVE STAGE
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                Consensus protocols &amp; Raft replication • 24 engineers online
              </span>
            </div>
          </div>

          {/* Live Translation Mode Switcher */}
          <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-xl border border-outline-variant/20">
            <div className="flex flex-col items-end">
              <span className="font-label-mono text-label-mono text-primary font-bold flex items-center gap-1 text-xs">
                <span className="material-symbols-outlined text-xs">translate</span> 31ms Latency
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Auto → English (US)</span>
            </div>
            <button
              onClick={() => setStreamTranslationEnabled(!streamTranslationEnabled)}
              className={`w-8 h-4 rounded-full relative p-0.5 transition-all ${
                streamTranslationEnabled ? 'bg-primary' : 'bg-outline-variant'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full bg-on-primary transition-transform ${
                  streamTranslationEnabled ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              ></div>
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-5 bg-background/50">
          <div className="flex items-center justify-center my-1">
            <span className="font-label-mono text-label-mono bg-surface-container-high text-on-surface-variant px-3 py-0.5 rounded-full text-[11px]">
              Today • Audio Synchronized Stream • Frankfurt Relay Node
            </span>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
              {/* Message Header */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    alt={msg.sender.name}
                    src={msg.sender.avatar}
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-label-md text-label-md font-bold text-on-surface text-xs sm:text-sm">
                      {msg.sender.name}
                    </span>
                    <span className="font-label-mono text-label-mono px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold text-[10px]">
                      {msg.sourceLang}
                    </span>
                    <span className="material-symbols-outlined text-xs text-on-surface-variant">arrow_forward</span>
                    <span className="font-label-mono text-label-mono px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-semibold text-[10px]">
                      {msg.targetLang}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-label-mono text-label-mono text-on-surface-variant">{msg.timestamp}</span>
                  <span className="font-label-mono text-label-mono text-primary font-semibold">28ms • 99.8%</span>
                </div>
              </div>

              {/* Original Transcript if exists */}
              {msg.originalText && (
                <div className="p-3 bg-surface-container-low rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label-mono text-label-mono uppercase text-on-surface-variant font-medium text-[10px]">
                      Original Voice Transcript ({msg.sourceLang})
                    </span>
                    <span className="material-symbols-outlined text-sm text-on-surface-variant">record_voice_over</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed text-xs sm:text-sm" dir={msg.sourceLang.includes('AR') ? 'rtl' : 'ltr'}>
                    {msg.originalText}
                  </p>
                </div>
              )}

              {/* Audio Voice Player Widget */}
              {msg.hasAudio && (
                <div className="flex items-center gap-3 p-3 bg-surface-container rounded-xl">
                  <button
                    onClick={() => setPlayingAudioId(playingAudioId === msg.id ? null : msg.id)}
                    className="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm hover:scale-105 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {playingAudioId === msg.id ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                  <div className="flex flex-col flex-1 gap-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-label-mono text-label-mono font-bold text-secondary">
                        Acoustic Audio Note (48kHz Neural Enhanced)
                      </span>
                      <span className="font-label-mono text-label-mono text-on-surface font-semibold">
                        {playingAudioId === msg.id ? '0:21 / 0:24' : `0:14 / ${msg.audioDuration || '0:24'}`}
                      </span>
                    </div>
                    {/* Animated waveform bars */}
                    <div className="w-full h-8 flex items-center gap-1 cursor-pointer">
                      {[12, 20, 28, 16, 24, 32, 20, 12, 28, 24, 32, 16, 20, 28, 24, 16, 8, 20, 28, 24, 12, 20].map((h, idx) => (
                        <div
                          key={idx}
                          className={`w-1 rounded-full transition-all ${
                            idx < 10
                              ? 'bg-secondary'
                              : idx === 10
                              ? 'bg-secondary-container animate-pulse'
                              : 'bg-surface-dim'
                          }`}
                          style={{ height: `${h}px` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0 pl-2">
                    <span className="font-label-mono text-label-mono text-on-surface-variant text-[10px]">Cairo Node</span>
                    <span className="font-label-mono text-label-mono text-primary font-bold text-xs">Synced</span>
                  </div>
                </div>
              )}

              {/* Instant Semantic Translation */}
              <div className="pl-3.5 py-1 bg-surface-container-low rounded-r-xl relative overflow-hidden border border-outline-variant/20">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-xs text-primary">auto_awesome</span>
                  <span className="font-label-mono text-label-mono font-bold text-primary text-[10px]">
                    Glotta Semantic Neural Translation • English (US)
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface font-medium leading-relaxed text-xs sm:text-sm">
                  {msg.translatedText}
                </p>
              </div>

              {/* Code Snippet if present */}
              {msg.codeSnippet && (
                <div className="rounded-xl overflow-hidden bg-inverse-surface text-inverse-on-surface shadow-sm">
                  <div className="flex items-center justify-between px-3 py-2 bg-inverse-surface/80 border-b border-surface-variant/20">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-primary-fixed">code</span>
                      <span className="font-body-code text-body-code text-xs text-surface-container">
                        {msg.codeSnippet.filename}
                      </span>
                    </div>
                    <span className="font-label-mono text-label-mono text-surface-variant text-[10px]">
                      {msg.codeSnippet.language}
                    </span>
                  </div>
                  <pre className="p-3 font-body-code text-body-code text-xs overflow-x-auto leading-relaxed">
                    <code>{msg.codeSnippet.code}</code>
                  </pre>
                  {msg.codeSnippet.lexiconNote && (
                    <div className="p-2.5 bg-[#17211E] border-t border-[#273330] flex flex-col gap-1 text-[11px]">
                      <span className="text-secondary-fixed font-bold font-mono">Tech Lexicon Translated Context:</span>
                      <span className="text-surface-container-high">{msg.codeSnippet.lexiconNote}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Diagram if msg-3 */}
              {msg.id === 'msg-3' && (
                <div className="relative w-full h-44 rounded-xl overflow-hidden bg-surface-container-low p-4 flex flex-col justify-between border border-outline-variant/30">
                  <div className="flex items-center justify-between z-10 text-xs">
                    <span className="font-label-mono text-label-mono font-bold text-primary flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schema</span> RAFT CLUSTER TOPOLOGY OVERLAY
                    </span>
                    <span className="font-label-mono text-label-mono bg-surface-container-highest px-2 py-0.5 rounded text-on-surface-variant text-[10px]">
                      Live Heartbeat Mesh
                    </span>
                  </div>
                  <div className="w-full flex items-center justify-around py-2 z-10">
                    <div className="flex flex-col items-center">
                      <div className="w-11 h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center font-label-mono text-label-mono font-bold shadow-md text-xs">
                        R1
                      </div>
                      <span className="font-label-mono text-label-mono text-on-surface font-semibold mt-1 text-xs">
                        FRA (DE)
                      </span>
                      <span className="font-label-mono text-label-mono text-primary font-bold text-[10px]">Leader</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center px-2">
                      <div className="w-full flex items-center justify-center relative">
                        <div className="h-0.5 w-full bg-primary-container"></div>
                        <span className="absolute bg-surface-container-lowest px-1.5 py-0.2 rounded font-label-mono text-label-mono text-primary font-bold text-[10px]">
                          29ms
                        </span>
                      </div>
                      <span className="font-label-mono text-label-mono text-on-surface-variant text-[9px] mt-1">
                        Acoustic Synced
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-11 h-11 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center font-label-mono text-label-mono font-bold text-xs">
                        R2
                      </div>
                      <span className="font-label-mono text-label-mono text-on-surface font-semibold mt-1 text-xs">
                        CAI (EG)
                      </span>
                      <span className="font-label-mono text-label-mono text-secondary font-bold text-[10px]">Follower</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center px-2">
                      <div className="w-full flex items-center justify-center relative">
                        <div className="h-0.5 w-full bg-surface-dim"></div>
                        <span className="absolute bg-surface-container-lowest px-1.5 py-0.2 rounded font-label-mono text-label-mono text-on-surface-variant font-bold text-[10px]">
                          84ms
                        </span>
                      </div>
                      <span className="font-label-mono text-label-mono text-on-surface-variant text-[9px] mt-1">
                        WAN Latency
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-11 h-11 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center font-label-mono text-label-mono font-bold text-xs">
                        R3
                      </div>
                      <span className="font-label-mono text-label-mono text-on-surface font-semibold mt-1 text-xs">
                        SEA (US)
                      </span>
                      <span className="font-label-mono text-label-mono text-secondary font-bold text-[10px]">Follower</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between z-10 pt-1 text-[11px]">
                    <span className="font-label-mono text-label-mono text-on-surface-variant">
                      Cluster state: Consensus reached (3/3 nodes)
                    </span>
                    <span className="font-label-mono text-label-mono text-primary font-medium">Jitter &lt; 2.4ms</span>
                  </div>
                </div>
              )}

              {/* Reactions Bar */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  {msg.reactions.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => handleToggleReaction(msg.id, r.emoji)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-label-mono text-label-mono transition-all text-xs ${
                        r.active
                          ? 'bg-secondary-container text-on-secondary-container font-bold'
                          : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                      }`}
                    >
                      <span>{r.emoji}</span> <span>{r.count}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => handleToggleReaction(msg.id, '🚀')}
                    className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant"
                  >
                    <span className="material-symbols-outlined text-base">add_reaction</span>
                  </button>
                </div>
                {msg.repliesCount && (
                  <button className="flex items-center gap-1 text-primary hover:underline font-label-md text-label-md font-semibold text-xs">
                    <span className="material-symbols-outlined text-sm">chat_bubble</span> {msg.repliesCount} replies
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM MESSAGE INPUT AREA */}
        <div className="p-3 bg-surface-container-lowest shrink-0 flex flex-col gap-2 shadow-md border-t border-surface-container">
          {/* Target language info & tone */}
          <div className="flex items-center justify-between px-2 flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 font-label-mono text-label-mono px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-medium text-[11px]">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Speaking: English (US)
              </span>
              <span className="material-symbols-outlined text-xs text-on-surface-variant">arrow_forward</span>
              <span className="flex items-center gap-1 font-label-mono text-label-mono px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-[11px]">
                Broadcasting: Auto-Detect All (4 Target Channels)
              </span>
            </div>

            {/* Tone Selector */}
            <div className="relative">
              <button
                onClick={() => setToneDropdownOpen(!toneDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md text-xs"
              >
                <span className="font-semibold">{selectedTone}</span>
                <span className="material-symbols-outlined text-xs">expand_more</span>
              </button>
              {toneDropdownOpen && (
                <div className="absolute right-0 bottom-full mb-1 w-44 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/30 py-1 z-50 text-xs">
                  {['Technical & Direct', 'Academic & Precise', 'Casual & Explanatory'].map(t => (
                    <button
                      key={t}
                      onClick={() => { setSelectedTone(t); setToneDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 hover:bg-surface-container"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Text input form */}
          <form onSubmit={handleSendMessage} className="flex flex-col gap-2">
            <div className="relative flex items-center bg-surface-container-low rounded-xl p-2.5 focus-within:ring-2 focus-within:ring-primary-container transition-all border border-outline-variant/30">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none resize-none text-xs sm:text-sm"
                placeholder="Send a message or press voice record. Technical jargon will auto-translate accurately..."
                rows={2}
              ></textarea>
            </div>

            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setInputText(prev => prev + '\n```go\n// Insert code\n```')}
                  className="p-2 rounded-xl hover:bg-surface-container text-on-surface-variant"
                  title="Insert Code Snippet"
                >
                  <span className="material-symbols-outlined text-lg">code</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert('Artifact attachment dialog')}
                  className="p-2 rounded-xl hover:bg-surface-container text-on-surface-variant"
                  title="Attach Document / Trace"
                >
                  <span className="material-symbols-outlined text-lg">attach_file</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert('Glossary token injection active for Raft / Kubernetes terms')}
                  className="p-2 rounded-xl hover:bg-surface-container text-on-surface-variant"
                  title="Insert Technical Glossary Token"
                >
                  <span className="material-symbols-outlined text-lg">menu_book</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleVoiceRecord}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-label-md text-label-md font-bold transition-all shadow-sm text-xs ${
                    isRecordingVoice
                      ? 'bg-secondary text-on-secondary animate-pulse'
                      : 'bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">mic</span>
                  <span>{isRecordingVoice ? 'Recording... (Tap to Send)' : 'Voice Note'}</span>
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-headline-md text-sm font-semibold transition-all shadow-sm active:scale-95 text-xs"
                >
                  <span>Send</span>
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* RIGHT PANE: Intelligence Inspector (3 cols) */}
      <div className="hidden xl:flex xl:col-span-3 flex-col h-full bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden p-4 gap-4 border border-outline-variant/30">
        <div className="flex items-center justify-between pb-1 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">neurology</span>
            <span className="font-headline-md text-headline-md font-bold text-on-surface text-sm sm:text-base">
              Intelligence
            </span>
          </div>
          <span className="font-label-mono text-label-mono px-2 py-0.5 rounded-full bg-surface-container text-primary font-bold text-xs">
            LIVE TELEMETRY
          </span>
        </div>

        {/* Acoustic Bridge Telemetry Card */}
        <div className="p-3.5 bg-surface-container-low rounded-xl flex flex-col gap-2.5 border border-outline-variant/20">
          <div className="flex items-center justify-between">
            <span className="font-label-mono text-label-mono font-bold text-on-surface text-xs">
              ACOUSTIC BRIDGE STATUS
            </span>
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="p-2 bg-surface-container-lowest rounded-lg flex flex-col">
              <span className="font-label-mono text-[10px] text-on-surface-variant">RELAY NODE</span>
              <span className="font-label-mono text-label-mono font-bold text-on-surface text-xs">eu-central-fra</span>
            </div>
            <div className="p-2 bg-surface-container-lowest rounded-lg flex flex-col">
              <span className="font-label-mono text-[10px] text-on-surface-variant">AVG LATENCY</span>
              <span className="font-label-mono text-label-mono font-bold text-primary text-xs">31.8 ms</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 text-xs">
            <span className="font-body-sm text-body-sm text-on-surface-variant">Acoustic Loss Rate</span>
            <span className="font-label-mono text-label-mono text-primary font-semibold">0.00% (Lossless)</span>
          </div>
        </div>

        {/* Dialect & Tone Adaptation */}
        <div className="p-3.5 bg-surface-container-low rounded-xl flex flex-col gap-3 border border-outline-variant/20 text-xs">
          <span className="font-label-mono text-label-mono font-bold text-on-surface">DIALECT &amp; TONE ADAPTATION</span>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-label-md font-semibold text-on-surface">
                Arabic (Egyptian / Levantine)
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                Tech Lexicon Injection active
              </span>
            </div>
            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-label-md font-semibold text-on-surface">
                German Technical Terms
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                Compounded Token Resolver
              </span>
            </div>
            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="font-label-md text-label-md font-semibold text-on-surface">
                Emotion &amp; Pitch Retention
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px]">
                Synthesizes speaker's natural tone
              </span>
            </div>
            <button className="w-8 h-4 rounded-full bg-primary relative p-0.5 transition-all">
              <div className="w-3 h-3 rounded-full bg-on-primary translate-x-4 transition-transform"></div>
            </button>
          </div>
        </div>

        {/* Room Language Ratio */}
        <div className="p-3.5 bg-surface-container-low rounded-xl flex flex-col gap-2.5 border border-outline-variant/20">
          <div className="flex items-center justify-between text-xs">
            <span className="font-label-mono text-label-mono font-bold text-on-surface">ROOM LANGUAGE RATIO</span>
            <span className="font-label-mono text-label-mono text-on-surface-variant">24 Members</span>
          </div>
          <div className="w-full h-2.5 rounded-full overflow-hidden flex bg-surface-dim">
            <div className="h-full bg-primary" style={{ width: '42%' }}></div>
            <div className="h-full bg-secondary-container" style={{ width: '28%' }}></div>
            <div className="h-full bg-tertiary-container" style={{ width: '18%' }}></div>
            <div className="h-full bg-primary-fixed-dim" style={{ width: '12%' }}></div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-label-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="text-on-surface font-medium">English (42%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
              <span className="text-on-surface font-medium">Arabic (28%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
              <span className="text-on-surface font-medium">German (18%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary-fixed-dim"></span>
              <span className="text-on-surface font-medium">French (12%)</span>
            </div>
          </div>
        </div>

        {/* Pinned Artifacts */}
        <div className="flex-1 flex flex-col bg-surface-container-low rounded-xl p-3.5 overflow-hidden border border-outline-variant/20">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-mono text-label-mono font-bold text-on-surface text-xs">PINNED ARTIFACTS</span>
            <span className="font-label-mono text-label-mono text-primary font-medium hover:underline cursor-pointer text-xs">
              View All
            </span>
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto pr-1">
            <div
              onClick={() => alert('Downloading raft_heartbeat.go')}
              className="p-2 rounded-lg bg-surface-container-lowest flex items-center justify-between hover:bg-surface-container transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-primary text-base">code_blocks</span>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-code text-body-code text-xs text-on-surface truncate">
                    raft_heartbeat.go
                  </span>
                  <span className="font-label-mono text-[10px] text-on-surface-variant">Shared by Lukas M.</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-sm text-on-surface-variant">download</span>
            </div>

            <div
              onClick={() => alert('Downloading raft_cluster_topology.json')}
              className="p-2 rounded-lg bg-surface-container-lowest flex items-center justify-between hover:bg-surface-container transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-secondary text-base">schema</span>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-code text-body-code text-xs text-on-surface truncate">
                    raft_cluster_topology.json
                  </span>
                  <span className="font-label-mono text-[10px] text-on-surface-variant">Shared by Maria S.</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-sm text-on-surface-variant">download</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
