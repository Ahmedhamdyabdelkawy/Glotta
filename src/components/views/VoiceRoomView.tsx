import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEFAULT_VOICE_ROOM } from '../../data/mockData';

export const VoiceRoomView: React.FC = () => {
  const { isMicMuted, setIsMicMuted, targetLanguage, setTargetLanguage, roomMode, setRoomMode } = useApp();
  const [activeTab, setActiveTab] = useState<'audience' | 'notes' | 'ai-summary'>('audience');
  const [arabicExpanded, setArabicExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [activeTone, setActiveTone] = useState<'precise' | 'explanatory'>('precise');
  const [activeEditorTab, setActiveEditorTab] = useState('bpf_sockops_redirect.c');
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteCopied, setInviteCopied] = useState(false);
  const [newChatInput, setNewChatInput] = useState('');
  const [codeNotes, setCodeNotes] = useState<string[]>([
    'Decoupling StatefulSets via CRDs allows localized blue/green rolling steps without loss of raft quorum.'
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(DEFAULT_VOICE_ROOM.currentTranslation.targetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReaction = (emoji: string) => {
    setSelectedReaction(emoji);
    setTimeout(() => setSelectedReaction(null), 2500);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatInput.trim()) return;
    setCodeNotes(prev => [...prev, newChatInput.trim()]);
    setNewChatInput('');
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Room Topbar */}
      <div className="w-full bg-surface-container-lowest px-4 sm:px-8 py-4 sm:py-5 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-outline-variant/20">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-primary-container flex items-center justify-center text-on-primary shadow-sm shrink-0">
            <span className="material-symbols-outlined text-2xl">neurology</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <h1 className="font-headline-md text-headline-md text-on-surface truncate">
                {DEFAULT_VOICE_ROOM.title}
              </h1>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container">
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                <span className="font-label-mono text-label-mono text-on-secondary-container font-semibold">
                  LIVE
                </span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-highest">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="font-label-mono text-label-mono text-on-surface-variant font-medium">
                  REC 42:19
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 text-on-surface-variant mt-1 text-xs sm:text-sm flex-wrap">
              <span className="font-label-mono text-label-mono flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">group</span> 34 Global Listeners
              </span>
              <span className="font-label-mono text-label-mono text-outline-variant">•</span>
              <span className="font-label-mono text-label-mono flex items-center gap-1 text-primary font-bold">
                <span className="material-symbols-outlined text-sm">speed</span> 28ms Edge Translation
              </span>
              <span className="font-label-mono text-label-mono text-outline-variant">•</span>
              <span className="font-label-mono text-label-mono flex items-center gap-1 text-tertiary font-medium">
                <span className="material-symbols-outlined text-sm">lock</span> E2E Acoustic Neural Tunnel
              </span>
            </div>
          </div>
        </div>

        {/* Topbar Actions & Mode Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-between xl:justify-end">
          {/* Mode Switcher: Audio Stage vs Code Stage */}
          <div className="flex items-center bg-surface-container rounded-xl p-0.5">
            <button
              onClick={() => setRoomMode('audio-stage')}
              className={`px-3 py-1.5 rounded-lg font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-all ${
                roomMode === 'audio-stage'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-base">podium</span>
              <span>Audio Stage</span>
            </button>
            <button
              onClick={() => setRoomMode('code-stage')}
              className={`px-3 py-1.5 rounded-lg font-label-md text-label-md font-semibold flex items-center gap-1.5 transition-all ${
                roomMode === 'code-stage'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-base">code</span>
              <span>Code Stage</span>
            </button>
          </div>

          <button
            onClick={() => setInviteModalOpen(true)}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-lg text-primary">person_add</span>
            <span>Invite</span>
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-error hover:bg-opacity-90 text-on-error font-label-md text-label-md font-semibold shadow-sm transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-lg">call_end</span>
            <span>Leave Room</span>
          </button>
        </div>
      </div>

      {/* Floating Reaction Animation Overlay */}
      {selectedReaction && (
        <div className="fixed top-24 right-12 z-50 animate-bounce text-5xl pointer-events-none drop-shadow-lg">
          {selectedReaction}
        </div>
      )}

      {/* Invite Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-2xl shadow-xl max-w-md w-full p-6 flex flex-col gap-4 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Invite to Voice Room</h3>
              <button onClick={() => setInviteModalOpen(false)} className="p-1 rounded-lg hover:bg-surface-container">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Share this live neural voice room link. Listeners will automatically hear this broadcast in their native dialect.
            </p>
            <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between font-label-mono text-label-mono">
              <span className="truncate text-primary">https://glotta.voice/room/8092-k8s</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('https://glotta.voice/room/8092-k8s');
                  setInviteCopied(true);
                  setTimeout(() => setInviteCopied(false), 2000);
                }}
                className="px-3 py-1 rounded-lg bg-primary text-on-primary font-bold text-xs shrink-0 ml-2"
              >
                {inviteCopied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 1: AUDIO STAGE VIEW (Screen 1)                      */}
      {/* ======================================================== */}
      {roomMode === 'audio-stage' && (
        <div className="grid grid-cols-12 gap-6 p-4 sm:p-6 lg:p-8">
          {/* Left & Center: Main Audio Stage & Stream (8 cols) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
            {/* Active Stage Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col gap-6 border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
                  <span className="font-label-mono text-label-mono uppercase tracking-wider text-secondary font-bold">
                    Currently Speaking
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-label-mono text-label-mono bg-surface-container px-2.5 py-1 rounded-full text-on-surface-variant text-xs">
                    Acoustic Confidence: 99.4%
                  </span>
                  <span className="font-label-mono text-label-mono bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full font-bold text-xs">
                    AR 🇪🇬 ➔ EN 🇺🇸
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Active Speaker Avatar with Ambient Warm Amber Dual-Ring */}
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-full p-1 bg-surface-container-lowest shadow-[0_0_0_2px_#ffffff,0_0_0_5px_#febc72] transition-transform duration-300">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      alt="Ahmed Hassan"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDysnHVPz9oxfbMff_jyw7csq5NSSFSLnLIlc521m8_Hx5yz7_tbEzBAsGp6Gk946p2OLzhmJz9vdGPx_QTAjYmwERpPn5zRBA-Cib2BFue3KxH_zOY1Xmajp6MNa7HuH47vbURf12k9qPOIbEwdElfjEq1DgocF3Qcyhx6uZpUA7oXwhPcnbXdTJLk56yM9O7x4tguPfyFxytJeFlIYrqPNn_26anhiVdIkhNm2aSoNp_u07r_JgOb"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-md">
                    <span className="material-symbols-outlined text-base">mic</span>
                  </div>
                </div>

                {/* Active Speaker Bio & Real-time Live Waveform */}
                <div className="flex-1 min-w-0 flex flex-col gap-2.5 w-full">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">Ahmed Hassan</span>
                    <span className="font-label-mono text-label-mono bg-surface-container-high px-2 py-0.5 rounded text-on-surface-variant font-medium text-xs">
                      Core Maintainer
                    </span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">@ahmed_k8s</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Principal Cloud Architect • Speaking Cairo Dialect (Modern Standard Arabic bridge)
                  </p>

                  {/* Dynamic Waveform Visualization */}
                  <div className="flex items-center gap-1.5 h-10 w-full pt-1">
                    <span className="h-3 w-1.5 rounded-full bg-primary-container"></span>
                    <span className="h-6 w-1.5 rounded-full bg-secondary-container animate-pulse"></span>
                    <span className="h-8 w-1.5 rounded-full bg-primary"></span>
                    <span className="h-10 w-1.5 rounded-full bg-secondary animate-pulse"></span>
                    <span className="h-7 w-1.5 rounded-full bg-primary-container"></span>
                    <span className="h-9 w-1.5 rounded-full bg-secondary-container"></span>
                    <span className="h-4 w-1.5 rounded-full bg-primary"></span>
                    <span className="h-8 w-1.5 rounded-full bg-secondary"></span>
                    <span className="h-10 w-1.5 rounded-full bg-primary animate-pulse"></span>
                    <span className="h-6 w-1.5 rounded-full bg-secondary-container"></span>
                    <span className="h-3 w-1.5 rounded-full bg-primary-container"></span>
                    <span className="h-7 w-1.5 rounded-full bg-primary"></span>
                    <span className="h-9 w-1.5 rounded-full bg-secondary animate-pulse"></span>
                    <span className="h-5 w-1.5 rounded-full bg-secondary-container"></span>
                    <span className="h-8 w-1.5 rounded-full bg-primary-container"></span>
                    <span className="h-4 w-1.5 rounded-full bg-primary"></span>
                    <span className="h-7 w-1.5 rounded-full bg-secondary"></span>
                    <span className="h-10 w-1.5 rounded-full bg-primary"></span>
                    <span className="h-6 w-1.5 rounded-full bg-secondary-container"></span>
                    <span className="h-3 w-1.5 rounded-full bg-primary-container"></span>
                  </div>
                </div>
              </div>

              {/* Real-time Live Translation Transcript Box */}
              <div className="bg-surface-container-low rounded-xl p-5 shadow-inner flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-label-mono text-primary font-bold">
                      STREAMED TRANSLATION (31ms)
                    </span>
                    <span className="font-label-mono text-label-mono bg-surface-container-highest px-2 py-0.5 rounded text-on-surface-variant text-xs">
                      Zero-loss semantic parser
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleCopy}
                      className="p-1.5 text-on-surface-variant hover:text-on-surface rounded hover:bg-surface-container transition-colors"
                      title="Copy translated text"
                    >
                      <span className="material-symbols-outlined text-base">
                        {copied ? 'done' : 'content_copy'}
                      </span>
                    </button>
                    <button
                      onClick={() => handleReaction('🔊')}
                      className="p-1.5 text-on-surface-variant hover:text-on-surface rounded hover:bg-surface-container transition-colors"
                      title="Play synthesized audio"
                    >
                      <span className="material-symbols-outlined text-base">volume_up</span>
                    </button>
                  </div>
                </div>

                {/* English Transcribed Text */}
                <div className="pl-3 py-1 border-l-2 border-primary">
                  <p className="font-body-lg text-body-lg text-on-surface font-medium leading-relaxed">
                    "{DEFAULT_VOICE_ROOM.currentTranslation.targetText}"
                  </p>
                </div>

                {/* Arabic Source Collapsible Chip */}
                <div className="pt-2">
                  <button
                    onClick={() => setArabicExpanded(!arabicExpanded)}
                    className="flex items-center justify-between w-full p-3 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all text-left"
                    type="button"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="font-label-mono text-label-mono text-secondary font-bold shrink-0">
                        ORIGINAL AUDIO SOURCE (AR)
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface font-semibold truncate" dir="rtl">
                        "{DEFAULT_VOICE_ROOM.currentTranslation.sourceText}"
                      </span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-base text-on-surface-variant transition-transform ${
                        arabicExpanded ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {arabicExpanded && (
                    <div className="mt-2 p-3 bg-surface-container-highest rounded-lg text-on-surface-variant font-body-sm text-body-sm leading-relaxed" dir="rtl">
                      {DEFAULT_VOICE_ROOM.currentTranslation.sourceText}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Stage Grid: 4 Panelist Tiles */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="font-label-md text-label-md font-bold text-on-surface">Panelist Stage (4)</span>
                <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">
                  Spatial Audio Enabled • Multi-Channel
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {/* Maria (Host) */}
                <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col items-center text-center relative group hover:shadow-md transition-all border border-outline-variant/30">
                  <span className="absolute top-3 left-3 font-label-mono text-label-mono bg-primary-container text-on-primary-container px-2 py-0.5 rounded font-bold text-[10px]">
                    HOST
                  </span>
                  <div className="relative w-16 h-16 rounded-full mt-2 mb-3">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      alt="Maria Santos"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC78CllCxwYcNQ5Wx6lAZ4AGzOpq_eBccsQFZn2KVaBC5TlAbnaw7QmXDrQWxhzpAdOgaHnTecj-3tLQZ1nFxnlJqtu5qxWE337pz_OLn8QQ5aU3uQqNQev5u_EE683LUDPtSxy2Xm5PqfBUZfQEJB-vt3kcZXJGrqfxHr1XxcEmQVpVug_fR70wvM9fAjSZP8IGYk3nuFV8OIfjCIkP3b2ZCO3SPye6pyEdfQe7dGTQkC7JxbuRQab"
                    />
                    <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant shadow-sm">
                      <span className="material-symbols-outlined text-xs">mic_off</span>
                    </span>
                  </div>
                  <span className="font-label-md text-label-md font-bold text-on-surface">Maria Santos</span>
                  <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">English 🇺🇸</span>
                  <div className="mt-3 w-full pt-2 flex items-center justify-between text-on-surface-variant text-xs">
                    <span className="font-label-mono text-label-mono">Seattle, US</span>
                    <span className="font-label-mono text-label-mono text-primary font-bold">Sync: 12ms</span>
                  </div>
                </div>

                {/* Pierre (French - Speaking) */}
                <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col items-center text-center relative group hover:shadow-md transition-all shadow-[0_0_0_2px_#ffffff,0_0_0_4px_#febc72] border border-outline-variant/30">
                  <span className="absolute top-3 left-3 font-label-mono text-label-mono bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-bold text-[10px]">
                    CHATTING
                  </span>
                  <div className="relative w-16 h-16 rounded-full mt-2 mb-3">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      alt="Pierre Dubois"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyRZqi-3WLAg4TzJJNDjoCycEdPmg7RCZA0e301m0APysdeienEsCYgBDq4WxorlQK8yDOf6r7zdEFr693qE4-Xi4PqzxH1hQ3dPNFynZTtJPCQ-Z8Qm6sK2w1_YnJh769cGKrr_dKNpn0TR8FXMT_iyrMoYl8pG6L53To-Zt_iU8Ehe0YMdAh8QF8G8_nmcjsgqKvsY1-wpKysmNVnII-1jNV2awfnRl-Sv3Ozw1OrvxnXhJo364K"
                    />
                    <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-sm">
                      <span className="material-symbols-outlined text-xs">mic</span>
                    </span>
                  </div>
                  <span className="font-label-md text-label-md font-bold text-on-surface">Pierre Dubois</span>
                  <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">French 🇫🇷</span>
                  <div className="mt-3 w-full pt-2 flex items-center justify-between text-on-surface-variant text-xs">
                    <span className="font-label-mono text-label-mono">Lyon, FR</span>
                    <span className="font-label-mono text-label-mono text-secondary font-bold">Speaking...</span>
                  </div>
                </div>

                {/* Ivan (German - Muted) */}
                <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col items-center text-center relative group hover:shadow-md transition-all border border-outline-variant/30">
                  <span className="absolute top-3 left-3 font-label-mono text-label-mono bg-surface-container px-2 py-0.5 rounded text-on-surface-variant text-[10px]">
                    PANEL
                  </span>
                  <div className="relative w-16 h-16 rounded-full mt-2 mb-3">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      alt="Ivan Becker"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1t-_FN4HzJSpzfn27Hjv6sk0rV4wTcJwjFaQzaIK92bo4qsWgzH_qE_CtZHQXljf5XSDGJzECX26zBeDZb5LyO8aq9h8vL2Qbnqc5Iu-iiistjeFxzVAzk1tW8_x9FNs5Wh7kN97-64I1u5M7PDv9YtELc3ikjLftOnuE60-Q3UFzOgSPCmopOpbG-sRDxoy_7TcKxeRdAZZbrGU4ov4lmWsnloSf9BV6IBxEnVKp_BM412QCOG3q"
                    />
                    <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant shadow-sm">
                      <span className="material-symbols-outlined text-xs">mic_off</span>
                    </span>
                  </div>
                  <span className="font-label-md text-label-md font-bold text-on-surface">Ivan Becker</span>
                  <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">German 🇩🇪</span>
                  <div className="mt-3 w-full pt-2 flex items-center justify-between text-on-surface-variant text-xs">
                    <span className="font-label-mono text-label-mono">Berlin, DE</span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant">Muted</span>
                  </div>
                </div>

                {/* Fatima (Arabic - Hand Raised) */}
                <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col items-center text-center relative group hover:shadow-md transition-all border border-outline-variant/30">
                  <span className="absolute top-3 left-3 font-label-mono text-label-mono bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-bold flex items-center gap-1 text-[10px]">
                    <span className="material-symbols-outlined text-xs">front_hand</span> QUEUE
                  </span>
                  <div className="relative w-16 h-16 rounded-full mt-2 mb-3">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      alt="Fatima Zahra"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_2mxMUDlfqUCXHsK2yyRaILTkbpBCkjZFM6ZUaTWbOu2oyF3z_lccf_XAcVGMsFTbooRSIcH-0et4WVl9ZyS2I3zLxUaJ5d-9D6I_wxwNJSmQ39pWfapnBgHHe5IvEMm0ClQc7LgQqqaBqgrInq32yqr4UKyzc80B9tMkT9mcr8LZfZtxgQai0k3LQQxzgUUm-zcFiy9HSzvPd5nEcRYKeCaCIMlvc2izlYNA_zXUNQiIQ5XR44SA"
                    />
                    <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-sm animate-bounce">
                      <span className="material-symbols-outlined text-xs">pan_tool</span>
                    </span>
                  </div>
                  <span className="font-label-md text-label-md font-bold text-on-surface">Fatima Zahra</span>
                  <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">Arabic 🇲🇦</span>
                  <div className="mt-3 w-full pt-2 flex items-center justify-between text-on-surface-variant text-xs">
                    <span className="font-label-mono text-label-mono">Rabat, MA</span>
                    <span className="font-label-mono text-label-mono text-secondary font-bold">Hand #1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Previous Speech Turns */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm flex flex-col gap-4 border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md font-bold text-on-surface">Previous Speech Turns</span>
                <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">
                  Session Buffer: 1,482 Words
                </span>
              </div>
              <div className="space-y-3">
                {DEFAULT_VOICE_ROOM.historyTurns.map((turn) => (
                  <div key={turn.id} className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-label-md text-label-md font-semibold text-on-surface">
                          {turn.speaker}
                        </span>
                        <span className="font-label-mono text-label-mono bg-surface-container-high px-2 py-0.5 rounded text-on-surface-variant text-xs">
                          {turn.langPair}
                        </span>
                        <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">
                          {turn.timestamp}
                        </span>
                      </div>
                      <span className="font-label-mono text-label-mono text-primary text-xs">{turn.latency}</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface">"{turn.translatedText}"</p>
                    {turn.originalText && (
                      <div className="text-on-surface-variant font-body-sm text-body-sm pl-2 border-l border-surface-container-highest italic">
                        Original: "{turn.originalText}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Tabbed Room Panel (4 cols) */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm flex flex-col gap-5 border border-outline-variant/30">
              {/* Tabs */}
              <div className="flex items-center justify-between p-1 bg-surface-container rounded-xl">
                {(['audience', 'notes', 'ai-summary'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-1.5 rounded-lg font-label-md text-label-md font-bold transition-all capitalize ${
                      activeTab === tab
                        ? 'bg-surface-container-lowest text-primary shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {tab === 'ai-summary' ? 'AI Summary' : tab}
                  </button>
                ))}
              </div>

              {activeTab === 'audience' && (
                <>
                  {/* Language Breakdown Matrix */}
                  <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-label-mono text-label-mono font-bold text-on-surface uppercase text-xs">
                        Language Composition
                      </span>
                      <span className="font-label-mono text-label-mono text-primary font-bold text-xs">
                        5 Idioms Active
                      </span>
                    </div>
                    {/* Multi-segment progress visual */}
                    <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden flex">
                      <div className="h-full bg-primary" style={{ width: '41%' }} title="English: 41%"></div>
                      <div className="h-full bg-secondary" style={{ width: '24%' }} title="Arabic: 24%"></div>
                      <div className="h-full bg-tertiary" style={{ width: '18%' }} title="French: 18%"></div>
                      <div className="h-full bg-secondary-container" style={{ width: '11%' }} title="German: 11%"></div>
                      <div className="h-full bg-surface-container-highest" style={{ width: '6%' }} title="Spanish: 6%"></div>
                    </div>
                    {/* Language distribution chips */}
                    <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                      <div className="flex items-center justify-between px-2.5 py-1.5 bg-surface-container-lowest rounded-lg border border-outline-variant/20">
                        <span className="font-label-mono text-label-mono text-on-surface">English 🇺🇸</span>
                        <span className="font-label-mono text-label-mono font-bold text-primary">14</span>
                      </div>
                      <div className="flex items-center justify-between px-2.5 py-1.5 bg-surface-container-lowest rounded-lg border border-outline-variant/20">
                        <span className="font-label-mono text-label-mono text-on-surface">Arabic 🇸🇦/🇪🇬</span>
                        <span className="font-label-mono text-label-mono font-bold text-secondary">8</span>
                      </div>
                      <div className="flex items-center justify-between px-2.5 py-1.5 bg-surface-container-lowest rounded-lg border border-outline-variant/20">
                        <span className="font-label-mono text-label-mono text-on-surface">French 🇫🇷</span>
                        <span className="font-label-mono text-label-mono font-bold text-tertiary">6</span>
                      </div>
                      <div className="flex items-center justify-between px-2.5 py-1.5 bg-surface-container-lowest rounded-lg border border-outline-variant/20">
                        <span className="font-label-mono text-label-mono text-on-surface">German 🇩🇪</span>
                        <span className="font-label-mono text-label-mono font-bold text-secondary">4</span>
                      </div>
                    </div>
                  </div>

                  {/* Active In Room Listener List */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md font-bold text-on-surface">Active In Room (34)</span>
                      <div className="flex items-center gap-1 text-on-surface-variant text-xs">
                        <span className="material-symbols-outlined text-sm">tune</span>
                        <span className="font-label-mono text-label-mono">Filter by Lang</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
                      {DEFAULT_VOICE_ROOM.audience.map((listener, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-container-low transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-full ${
                                listener.avatarColor || 'bg-surface-container'
                              } font-bold flex items-center justify-center font-label-mono text-label-mono text-xs`}
                            >
                              {listener.initials}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-label-md text-label-md font-semibold text-on-surface leading-snug">
                                {listener.name}
                              </span>
                              <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">
                                Listening in {listener.listeningLang} {listener.flag}
                              </span>
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-sm text-on-surface-variant">headphones</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'notes' && (
                <div className="flex flex-col gap-3">
                  <span className="font-label-md text-label-md font-bold text-on-surface">Session Collaborative Notes</span>
                  <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
                    {codeNotes.map((note, index) => (
                      <div key={index} className="p-3 bg-surface-container rounded-xl text-xs font-body-code text-on-surface">
                        <span className="text-secondary font-bold mr-1">#{index + 1}:</span>
                        {note}
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendChat} className="flex gap-2 pt-2">
                    <input
                      type="text"
                      value={newChatInput}
                      onChange={(e) => setNewChatInput(e.target.value)}
                      placeholder="Add an architectural takeaway..."
                      className="flex-1 bg-surface-container-low px-3 py-2 rounded-xl text-xs text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button type="submit" className="px-3 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold">
                      Add
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'ai-summary' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md font-bold text-on-surface">Live Synthesized Brief</span>
                    <span className="font-label-mono text-label-mono text-primary font-bold text-xs">v2.4 Neural</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Real-time synthesis indicates the room consensus is converging on custom Kubernetes operators with CRD-level health probe overrides.
                  </p>
                  <div className="p-3 bg-surface-container rounded-xl font-body-code text-body-code text-on-surface text-xs leading-relaxed">
                    <span className="text-secondary font-bold">Action Item:</span> PR #882 will decouple StatefulSets from standard kube-scheduler constraints.
                  </div>
                </div>
              )}
            </div>

            {/* Live AI Synthesis Card Preview */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm flex flex-col gap-3 border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-primary">auto_awesome</span>
                  <span className="font-label-md text-label-md font-bold text-on-surface">Auto-Generated Notes</span>
                </div>
                <span className="font-label-mono text-label-mono text-primary font-semibold text-xs">Updating Live</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Extracting Kubernetes architectural decisions, command strings, and topology definitions from speech...
              </p>
              <div className="p-3 bg-surface-container rounded-xl font-body-code text-body-code text-on-surface text-xs">
                <span className="text-secondary font-bold">Key takeaway:</span> Decoupling StatefulSets via CRDs allows localized blue/green rolling steps without loss of raft quorum.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: CODE STAGE VIEW (Screen 6)                        */}
      {/* ======================================================== */}
      {roomMode === 'code-stage' && (
        <div className="px-4 sm:px-6 py-4 flex flex-col gap-4">
          {/* Top Video Grid (4 Participant Video Tiles in horizontal strip) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5">
            {/* Tile 1: Ahmed Al-Sayed (Active Speaker) */}
            <div
              className="relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-md flex flex-col justify-between h-48 bg-cover bg-center border border-outline-variant/30"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQYcAtrc-RQBy8SR7Xr9AZ9DHT8MDLtyKrDsKO03Ej5XCs1rgtFSsjE-9xLpcCypH06kzCdrxEvVvxB2zAr99rNJi-A1xHftQgKDZ8SXW90zxoAJT3RzvUCXrzdPQXPlYDAZRLP3_ZOe5rGyTYsaObBrgBdExkdJyDTyueOklwuh5w3kJFbpT33Jgku-48MLl8SOVpN3N5pA-eyjBg0QfLlpoR40wmsS00L1FOIGIRlxzakkh5P05a')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/20 to-transparent"></div>
              <div className="relative z-10 p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-container/95 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                  <span className="font-label-mono text-label-mono font-bold text-on-secondary-container text-xs">
                    SPEAKING · AR 🇪🇬
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-surface-container-lowest/80 backdrop-blur-md px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-xs text-secondary animate-pulse">volume_up</span>
                  <span className="font-label-mono text-label-mono text-secondary font-bold text-xs">120 wpm</span>
                </div>
              </div>
              <div className="relative z-10 p-2.5">
                <div className="bg-surface-container-lowest/95 backdrop-blur-md p-2 rounded-lg shadow-sm mb-1.5">
                  <div className="flex items-center gap-1 text-on-surface-variant mb-0.5">
                    <span className="font-label-mono text-label-mono text-primary font-semibold text-xs">AR ➔ EN Live Subtitle</span>
                    <span className="material-symbols-outlined text-xs text-primary">bolt</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface italic leading-snug line-clamp-2">
                    "We must bypass kube-proxy using eBPF sockops to reduce inter-pod latency..."
                  </p>
                </div>
                <div className="flex items-center justify-between text-on-primary">
                  <div className="flex items-center gap-1.5">
                    <span className="font-label-md text-label-md font-bold drop-shadow">Ahmed Al-Sayed</span>
                    <span className="font-label-mono text-label-mono text-primary-fixed drop-shadow text-xs">Cairo</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-3 bg-secondary rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-1.5 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ boxShadow: 'inset 0 0 0 2.5px #febc72' }}></div>
            </div>

            {/* Tile 2: Maria Santos */}
            <div
              className="relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col justify-between h-48 bg-cover bg-center border border-outline-variant/30"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsPG_uZDPSjDWdg3TJAzQzYQpTLzTKlxnW1_lB1vPWunf42qmCm6HPDQncpjxEFHHzPm8KHaHSxIceDKbY7sEGYEYR0nkFn0mBa5-e4H46KXf4I7lIESVxJK8LCIs2CSjQBr2jiF0u0t3k9TOUt158RRNlg-kyCGyJTTHv18sMbLldXqQ_ljLE5-IRtQ3vB47jOdCqnvG8ibsfOcqHqNnAJ6q253EUSSSr9yODkcUYPZObbVIEucpL')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/10 to-transparent"></div>
              <div className="relative z-10 p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md">
                  <span className="font-label-mono text-label-mono font-medium text-on-surface text-xs">EN 🇺🇸</span>
                </div>
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary-container text-on-primary-container">
                  <span className="material-symbols-outlined text-xs">mic</span>
                </div>
              </div>
              <div className="relative z-10 p-2.5 flex items-end justify-between">
                <div>
                  <div className="font-label-md text-label-md font-bold text-on-primary drop-shadow">Maria Santos</div>
                  <div className="font-label-mono text-label-mono text-primary-fixed drop-shadow text-xs">Seattle · Host</div>
                </div>
                <div className="flex items-center gap-0.5">
                  <span className="w-1 h-2 bg-primary-fixed-dim rounded-full"></span>
                  <span className="w-1 h-3.5 bg-primary-fixed-dim rounded-full"></span>
                  <span className="w-1 h-1.5 bg-primary-fixed-dim rounded-full"></span>
                </div>
              </div>
            </div>

            {/* Tile 3: Pierre Dubois */}
            <div
              className="relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col justify-between h-48 bg-cover bg-center border border-outline-variant/30"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWmGYmLPYIoxIE-MI8QSsyjqLbbd3b-YuJivfbIXh6_pZSqE2C8UsHjfYogN0Clnw5iushuo8UTN9nplS3PtGCTiCJ7bEyyCHtS_ugBOYUnlvU4z4rAQKULB8hBbkWIdtMH3DsyWKa2zs-dB7Z41HbaITI1HnBraibY0M-1mxJqcpd4WC5dt2TjNKoyCbbxp4irj7sn4u7mQA2t0B5jcieamvX3NU5mHW6t8eCnYO-sMA-7aUIb_vh')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/10 to-transparent"></div>
              <div className="relative z-10 p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md">
                  <span className="font-label-mono text-label-mono font-medium text-on-surface text-xs">FR 🇫🇷</span>
                </div>
                <span className="font-label-mono text-label-mono bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded-full text-[10px]">
                  TRANSCRIPT ACTIVE
                </span>
              </div>
              <div className="relative z-10 p-2.5">
                <div className="bg-surface-container-lowest/90 backdrop-blur-md p-1.5 rounded-lg mb-1.5">
                  <p className="font-body-sm text-body-sm text-on-surface line-clamp-1 italic text-xs">
                    "I confirmed the 15% throughput gain on ARM64 nodes."
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-label-md text-label-md font-bold text-on-primary drop-shadow">Pierre Dubois</div>
                    <div className="font-label-mono text-label-mono text-primary-fixed drop-shadow text-xs">Lyon · Core Reviewer</div>
                  </div>
                  <span className="material-symbols-outlined text-sm text-on-primary">mic</span>
                </div>
              </div>
            </div>

            {/* Tile 4: Lukas Meyer */}
            <div
              className="relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col justify-between h-48 bg-cover bg-center border border-outline-variant/30"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1_OYv9KiIp7aJTn_z21WBm3HlFNqtXwGfbQr_PCOycgT1QOBkGHWrgY2Uh03GpqMOYb8ZGX7Qedz9m0klOrGjeuHLl4IEym7VGKzT9YaMmBc7K2tRu99GrC8sQnpYE7_kFS_cHIAmUcYF7mOAlyZZJU4JRHO47lvYLNn3yM94Ej1-jv4g6XQ_wwcAXHknFodlXgBToHZ_iKzoPQTdYWKs8vJGPxEyLqV45wnxPOgVkOMFDL15Gm13')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/10 to-transparent"></div>
              <div className="relative z-10 p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md">
                  <span className="font-label-mono text-label-mono font-medium text-on-surface text-xs">DE 🇩🇪</span>
                </div>
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-xs">
                  <span className="material-symbols-outlined text-xs">mic_off</span>
                  <span className="font-label-mono text-label-mono">MUTED</span>
                </div>
              </div>
              <div className="relative z-10 p-2.5 flex items-end justify-between">
                <div>
                  <div className="font-label-md text-label-md font-bold text-on-primary drop-shadow">Lukas Meyer</div>
                  <div className="font-label-mono text-label-mono text-primary-fixed drop-shadow text-xs">Munich · Maintainer</div>
                </div>
                <span className="material-symbols-outlined text-base text-surface-container-high">volume_off</span>
              </div>
            </div>
          </div>

          {/* Central Massive Code-Sharing Stage + Live Audio Telemetry Stream */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Primary IDE / Collaborative Editor (8 cols) */}
            <div className="lg:col-span-8 flex flex-col rounded-xl overflow-hidden shadow-lg bg-[#141918] text-[#effcf7]">
              {/* IDE Top bar with Tabs */}
              <div className="bg-[#1c2321] px-4 py-2 flex items-center justify-between border-b border-surface-container/10">
                <div className="flex items-center gap-2 overflow-x-auto">
                  <button
                    onClick={() => setActiveEditorTab('bpf_sockops_redirect.c')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-body-code font-body-code font-semibold transition-all ${
                      activeEditorTab === 'bpf_sockops_redirect.c'
                        ? 'bg-[#141918] text-primary-fixed'
                        : 'text-on-surface-variant hover:text-surface-bright'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base text-primary-fixed-dim">data_object</span>
                    <span>bpf_sockops_redirect.c</span>
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  </button>
                  <button
                    onClick={() => setActiveEditorTab('controller.go')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-body-code font-body-code transition-all ${
                      activeEditorTab === 'controller.go'
                        ? 'bg-[#141918] text-primary-fixed font-semibold'
                        : 'text-on-surface-variant hover:text-surface-bright'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">terminal</span>
                    <span>controller.go</span>
                  </button>
                  <button
                    onClick={() => setActiveEditorTab('cilium_mesh.yaml')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-body-code font-body-code transition-all ${
                      activeEditorTab === 'cilium_mesh.yaml'
                        ? 'bg-[#141918] text-primary-fixed font-semibold'
                        : 'text-on-surface-variant hover:text-surface-bright'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">settings_ethernet</span>
                    <span>cilium_mesh.yaml</span>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#273330] text-label-mono font-label-mono text-primary-fixed-dim text-xs">
                    <span className="material-symbols-outlined text-xs">sync</span>
                    <span>Syncing with git@github.com:cloud-mesh/ebpf-core</span>
                  </div>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-4 font-body-code text-body-code overflow-x-auto relative leading-relaxed bg-[#141918] text-xs">
                <div className="flex">
                  <div className="flex flex-col pr-4 text-[#6f7977] select-none text-right font-label-mono text-label-mono w-10 shrink-0">
                    <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                    <span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
                    <span>11</span><span>12</span><span>13</span><span>14</span><span>15</span>
                    <span>16</span><span>17</span><span>18</span><span>19</span><span>20</span>
                    <span>21</span><span>22</span>
                  </div>
                  <div className="flex flex-col w-full text-[#effcf7] min-w-[580px]">
                    <div><span className="text-[#88d4cd]">#include</span> <span className="text-[#febc72]">&lt;linux/bpf.h&gt;</span></div>
                    <div><span className="text-[#88d4cd]">#include</span> <span className="text-[#febc72]">&lt;bpf/bpf_helpers.h&gt;</span></div>
                    <div><span className="text-[#88d4cd]">#include</span> <span className="text-[#febc72]">&lt;bpf/bpf_endian.h&gt;</span></div>
                    <div className="text-[#6f7977]">// Struct defining fast sockmap lookup for East-West service traffic</div>
                    <div>
                      <span className="text-[#88d4cd]">struct</span> <span className="text-[#febc72]">bpf_map_def</span> <span className="text-[#a5d1b1]">SEC</span>(<span className="text-[#febc72]">"maps"</span>) sock_ops_map = &#123;
                    </div>
                    <div className="pl-4">.<span className="text-[#88d4cd]">type</span> = <span className="text-[#febc72]">BPF_MAP_TYPE_SOCKHASH</span>,</div>
                    <div className="pl-4">.<span className="text-[#88d4cd]">key_size</span> = <span className="text-[#88d4cd]">sizeof</span>(<span className="text-[#febc72]">struct sock_key</span>),</div>
                    <div className="pl-4">.<span className="text-[#88d4cd]">value_size</span> = <span className="text-[#88d4cd]">sizeof</span>(<span className="text-[#febc72]">__u64</span>),</div>
                    <div className="pl-4">.<span className="text-[#88d4cd]">max_entries</span> = <span className="text-[#febc72]">65535</span>,</div>
                    <div>&#125;;</div>
                    <div className="h-3"></div>

                    {/* Interactive Line with Ahmed's Cursor & Arabic Inline Translated Rationale */}
                    <div className="relative group bg-[#273330]/50 -mx-2 px-2 py-0.5 rounded">
                      <span className="text-[#a5d1b1]">SEC</span>(<span className="text-[#febc72]">"sockops"</span>)
                      <div className="inline-block relative">
                        <span className="inline-block w-0.5 h-4 bg-secondary-container align-middle animate-pulse"></span>
                        <span className="absolute -top-6 left-0 bg-secondary-container text-on-secondary-container font-label-mono text-label-mono px-1.5 py-0.5 rounded whitespace-nowrap shadow font-bold text-[10px]">
                          Ahmed (AR) editing
                        </span>
                      </div>
                      <span className="text-[#88d4cd]"> int</span> <span className="text-[#febc72]">bpf_sockmap_filter</span>(<span className="text-[#88d4cd]">struct</span> <span className="text-[#febc72]">bpf_sock_ops</span> *skops) &#123;
                    </div>

                    {/* Translated Annotation Card floating inline */}
                    <div className="my-2 p-3 rounded-lg bg-[#1c2321] shadow-md border-l-4 border-secondary max-w-xl">
                      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#273330]">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm text-secondary">forum</span>
                          <span className="font-label-md text-label-md font-semibold text-secondary-fixed text-xs">
                            Ahmed's Verbal Rationale (Egyptian Arabic)
                          </span>
                        </div>
                        <span className="font-label-mono text-label-mono text-[#a5d1b1] text-[10px]">AUTO-TRANSLATED ➔ EN</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#d8e6e1] leading-relaxed">
                        <span className="text-secondary font-mono mr-1 font-bold">[ORIGINAL: يجب تحويل الحزم عبر طبقة المقبس مباشرة]</span>
                        "Direct socket shortcut bypasses netfilter traversal completely, eliminating 1.8 microseconds per TCP connection handshake."
                      </p>
                    </div>

                    <div className="pl-4"><span className="text-[#88d4cd]">__u32</span> family = skops-&gt;family;</div>
                    <div className="pl-4"><span className="text-[#88d4cd]">if</span> (family != <span className="text-[#febc72]">AF_INET</span>)</div>
                    <div className="pl-8"><span className="text-[#88d4cd]">return</span> <span className="text-[#febc72]">0</span>;</div>

                    {/* Pierre's Cursor in Teal */}
                    <div className="pl-4 relative">
                      <span className="text-[#6f7977]">// Intercept active established sockets and inject directly</span>
                      <br />
                      <span className="text-[#88d4cd]">switch</span> (skops-&gt;op) &#123;
                      <div className="inline-block relative">
                        <span className="inline-block w-0.5 h-4 bg-primary-fixed align-middle animate-pulse"></span>
                        <span className="absolute -top-6 left-0 bg-primary-container text-on-primary font-label-mono text-label-mono px-1.5 py-0.5 rounded whitespace-nowrap shadow font-semibold text-[10px]">
                          Pierre (FR) reviewing
                        </span>
                      </div>
                    </div>
                    <div className="pl-8"><span className="text-[#88d4cd]">case</span> <span className="text-[#febc72]">BPF_SOCK_OPS_ACTIVE_ESTABLISHED_CB</span>:</div>
                    <div className="pl-12"><span className="text-[#a5d1b1]">bpf_sock_hash_update</span>(skops, &amp;sock_ops_map, &amp;key, <span className="text-[#febc72]">BPF_NOEXIST</span>);</div>
                    <div className="pl-12"><span className="text-[#88d4cd]">break</span>;</div>
                    <div className="pl-4">&#125;</div>
                    <div><span className="text-[#88d4cd]">return</span> <span className="text-[#febc72]">0</span>;</div>
                    <div>&#125;</div>
                  </div>
                </div>
              </div>

              {/* Terminal Logs Drawer Output */}
              <div className="bg-[#1c2321] p-3 border-t border-surface-container/10 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-tertiary-fixed">terminal</span>
                    <span className="font-label-mono text-label-mono font-bold text-surface-bright">
                      LIVE COMPILATION BENCHMARK (arm64-cluster-prod-4)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-label-mono text-label-mono text-on-surface-variant">
                    <span>Avg Latency: <strong className="text-tertiary-fixed">1.42ms</strong></span>
                    <span>Memory RSS: <strong className="text-primary-fixed">14.2MB</strong></span>
                    <span>Drop rate: <strong className="text-tertiary-fixed">0.00%</strong></span>
                  </div>
                </div>
                <div className="p-2.5 rounded bg-[#141918] font-body-code text-body-code text-on-surface-variant flex flex-col gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-tertiary-fixed">[CLANG-17]</span>
                    <span className="text-surface-bright">clang -O2 -target bpf -c bpf_sockops_redirect.c -o bpf_sockops_redirect.o</span>
                    <span className="text-tertiary-fixed ml-auto">0 error(s), 0 warning(s)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-secondary-fixed-dim">[BPFTOOL]</span>
                    <span className="text-surface-bright">Pinned program to /sys/fs/bpf/k8s_sockops_redirect (id: 4891)</span>
                    <span className="text-primary-fixed-dim ml-auto">verified by eBPF JIT compiler in 11ms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Transcribed Audio Stream & Discussion (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-outline-variant/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">record_voice_over</span>
                    <h3 className="font-label-md text-label-md font-bold text-on-surface">Live Multilingual Transcript</h3>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-mono text-label-mono font-medium text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    <span>Realtime</span>
                  </div>
                </div>

                {/* Speech Transcript Items */}
                <div className="flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1">
                  <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-label-md text-label-md font-bold text-on-surface">Ahmed Al-Sayed</span>
                        <span className="px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-mono text-label-mono text-xs">
                          AR 🇪🇬
                        </span>
                      </div>
                      <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">38:04</span>
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant italic" dir="rtl">
                      "إذا تخطينا طبقة iptables نوفر دورات المعالجة."
                    </div>
                    <div className="p-2 rounded-lg bg-surface-container-lowest border-l-2 border-primary text-on-surface">
                      <p className="font-body-sm text-body-sm">
                        "If we bypass the iptables layer, we save critical CPU cycles during inter-service pod communication."
                      </p>
                      <div className="flex items-center justify-between mt-1 text-on-surface-variant font-label-mono text-label-mono text-[10px]">
                        <span>Confidence: 99.4%</span>
                        <span className="text-primary font-bold">Acoustic delay 32ms</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-label-md text-label-md font-bold text-on-surface">Pierre Dubois</span>
                        <span className="px-1.5 py-0.2 rounded-full bg-surface-container-high text-on-surface font-label-mono text-label-mono text-xs">
                          FR 🇫🇷
                        </span>
                      </div>
                      <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">38:10</span>
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant italic">
                      "Exactement. J'ai mesuré 820 000 requêtes par seconde sur AWS Graviton3."
                    </div>
                    <div className="p-2 rounded-lg bg-surface-container-lowest border-l-2 border-primary text-on-surface">
                      <p className="font-body-sm text-body-sm">
                        "Exactly. I measured 820,000 requests per second on AWS Graviton3 instances without thermal throttling."
                      </p>
                      <div className="flex items-center justify-between mt-1 text-on-surface-variant font-label-mono text-label-mono text-[10px]">
                        <span>Confidence: 98.9%</span>
                        <span className="text-primary font-bold">Acoustic delay 41ms</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Query Input */}
                <form onSubmit={handleSendChat} className="pt-2 flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={newChatInput}
                      onChange={(e) => setNewChatInput(e.target.value)}
                      placeholder="Type notes or auto-translated query..."
                      className="w-full pl-3 pr-8 py-2 rounded-xl bg-surface-container font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary-container"
                    />
                    <button type="submit" className="absolute right-2 top-2 text-primary hover:text-on-surface">
                      <span className="material-symbols-outlined text-lg">send</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Translation Engine State */}
              <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-2.5 border border-outline-variant/30">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md font-bold text-on-surface">Translation Engine State</span>
                  <span className="font-label-mono text-label-mono text-primary font-bold text-xs">ALL PIPELINES SYNCED</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-body-sm">
                  <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col">
                    <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">SOURCE LANGUAGES</span>
                    <span className="font-headline-md text-headline-md font-bold text-primary">3 Live</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">AR, FR, DE</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col">
                    <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">AUDIO JITTER</span>
                    <span className="font-headline-md text-headline-md font-bold text-tertiary">1.2ms</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">Opus HD codec</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* FLOATING CONTROL BAR (Dock)                              */}
      {/* ======================================================== */}
      <div className="fixed bottom-4 left-0 lg:left-72 right-0 z-40 px-4 flex justify-center pointer-events-none">
        <div className="pointer-events-auto bg-surface-container-lowest/95 backdrop-blur-xl px-4 sm:px-6 py-3 rounded-full shadow-2xl flex items-center justify-between gap-3 sm:gap-4 border border-outline-variant/30 max-w-3xl w-full">
          {/* Mic Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMicMuted(!isMicMuted)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-label-md text-label-md font-bold shadow-sm transition-all ${
                isMicMuted
                  ? 'bg-error text-on-error'
                  : 'bg-secondary hover:bg-opacity-90 text-on-secondary'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-lg">
                {isMicMuted ? 'mic_off' : 'mic'}
              </span>
              <span className="hidden sm:inline">{isMicMuted ? 'Unmute Mic' : 'Mute Mic'}</span>
            </button>
            <button
              onClick={() => setActiveTone(activeTone === 'precise' ? 'explanatory' : 'precise')}
              className="p-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface transition-all"
              title="Tone & Audio Settings"
            >
              <span className="material-symbols-outlined text-xl">tune</span>
            </button>
          </div>

          {/* Center Info: Tone & Raise Hand */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low text-on-surface">
              <span className="material-symbols-outlined text-base text-primary">psychology</span>
              <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">Tone:</span>
              <span className="font-label-mono text-label-mono font-bold text-primary text-xs">
                {activeTone === 'precise' ? 'Technical & Analytical' : 'Explanatory & Conversational'}
              </span>
            </div>

            <button
              onClick={() => setHandRaised(!handRaised)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all ${
                handRaised
                  ? 'bg-secondary text-on-secondary font-bold'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold'
              }`}
            >
              <span className="material-symbols-outlined text-base text-secondary">pan_tool</span>
              <span className="font-label-md text-label-md">
                {handRaised ? 'Hand Raised (#1)' : 'Raise Hand'}
              </span>
            </button>
          </div>

          {/* Reactions & Subtitle toggle */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-full">
              <button
                onClick={() => handleReaction('👏')}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-sm transition-all hover:scale-125"
                title="Applaud"
              >
                👏
              </button>
              <button
                onClick={() => handleReaction('💡')}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-sm transition-all hover:scale-125"
                title="Insightful"
              >
                💡
              </button>
              <button
                onClick={() => handleReaction('🔥')}
                className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-sm transition-all hover:scale-125"
                title="Excited"
              >
                🔥
              </button>
            </div>
            <button
              onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
              className={`p-2.5 rounded-full transition-all ${
                subtitlesEnabled
                  ? 'bg-primary-container text-on-primary-container hover:bg-primary'
                  : 'bg-surface-container text-on-surface-variant'
              }`}
              title="Toggle Live Floating Subtitles"
            >
              <span className="material-symbols-outlined text-xl">subtitles</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
