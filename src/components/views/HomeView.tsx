import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const HomeView: React.FC = () => {
  const { setCurrentView, setAudioTestModalOpen } = useApp();
  const [micTesting, setMicTesting] = useState(false);
  const [rsvpd, setRsvpd] = useState(false);
  const [remindMe, setRemindMe] = useState(false);
  const [selectedSpokenLang, setSelectedSpokenLang] = useState('en-US');

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-8 max-w-[1540px] mx-auto w-full">
      {/* Welcome & Quick Stats Section */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-2">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="font-label-mono text-label-mono px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-semibold tracking-wider uppercase">
              Neural Bridge Active
            </span>
            <span className="font-label-mono text-label-mono text-on-surface-variant flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              Sync Node: eu-central-fra
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
            Welcome back, Maria!{' '}
            <span className="font-normal text-on-surface-variant">
              Your global tech sessions are live.
            </span>
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Collaborate seamlessly across dialects. Continuous multi-channel semantic translation with near-zero latency.
          </p>
        </div>

        {/* Quick Metrics Strip */}
        <div className="grid grid-cols-3 gap-3 bg-surface-container-lowest p-2 rounded-xl shadow-sm">
          <div className="flex flex-col px-4 py-2.5 rounded-lg bg-surface-container-low min-w-32">
            <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider text-[11px]">
              Languages
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline-md text-headline-md font-bold text-on-surface">4</span>
              <span className="font-label-mono text-label-mono text-primary font-semibold">Active</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-on-surface-variant font-label-mono text-label-mono text-xs">
              <span className="px-1 py-0.5 rounded bg-surface-container text-primary font-bold">EN</span>
              <span className="px-1 py-0.5 rounded bg-surface-container text-primary font-bold">AR</span>
              <span className="px-1 py-0.5 rounded bg-surface-container text-primary font-bold">FR</span>
              <span className="px-1 py-0.5 rounded bg-surface-container text-primary font-bold">DE</span>
            </div>
          </div>

          <div className="flex flex-col px-4 py-2.5 rounded-lg bg-surface-container-low min-w-32">
            <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider text-[11px]">
              Live Rooms
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-headline-md text-headline-md font-bold text-on-surface">12</span>
              <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
            </div>
            <span className="font-label-mono text-label-mono text-on-surface-variant mt-1 text-xs">
              280+ engineers
            </span>
          </div>

          <div className="flex flex-col px-4 py-2.5 rounded-lg bg-surface-container-low min-w-32">
            <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider text-[11px]">
              Audio Clarity
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline-md text-headline-md font-bold text-primary">98.4%</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '98.4%' }}></div>
              </div>
              <span className="font-label-mono text-label-mono text-primary font-bold text-xs">MOS 4.8</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Launch Studio / Instant Room Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-surface-container-lowest via-surface-container-low to-surface-container p-6 lg:p-7 shadow-sm border border-outline-variant/20">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-1.5 max-w-xl">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-lg">podium</span>
              <span className="font-label-mono text-label-mono uppercase tracking-widest font-bold">
                Instant Voice Studio
              </span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
              Spin up a zero-friction polyglot audio session
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Your spoken voice is synthesized simultaneously in listeners' target languages with semantic code preserving.
            </p>
          </div>

          {/* Controls: Language Selector, Mic Check, Action Button */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Spoken Tongue Selector */}
            <div className="flex items-center gap-2 bg-surface-container-lowest px-3.5 py-2.5 rounded-xl shadow-sm border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary text-lg">record_voice_over</span>
              <div className="flex flex-col">
                <span className="font-label-mono text-label-mono text-on-surface-variant text-[10px] leading-none uppercase">
                  You Speak
                </span>
                <select
                  value={selectedSpokenLang}
                  onChange={(e) => setSelectedSpokenLang(e.target.value)}
                  className="bg-transparent font-label-md text-label-md font-bold text-on-surface focus:outline-none cursor-pointer pr-2"
                >
                  <option value="en-US">English (US)</option>
                  <option value="ar-EG">Arabic (Egypt)</option>
                  <option value="fr-FR">French (France)</option>
                  <option value="de-DE">German (Standard)</option>
                  <option value="ja-JP">Japanese (Standard)</option>
                </select>
              </div>
            </div>

            {/* Target Translation Selector */}
            <div className="flex items-center gap-2 bg-surface-container-lowest px-3.5 py-2.5 rounded-xl shadow-sm border border-outline-variant/30">
              <span className="material-symbols-outlined text-secondary text-lg">hearing</span>
              <div className="flex flex-col">
                <span className="font-label-mono text-label-mono text-on-surface-variant text-[10px] leading-none uppercase">
                  Audience Hears
                </span>
                <span className="font-label-md text-label-md font-bold text-on-surface">Auto-Bridge (All)</span>
              </div>
              <span className="font-label-mono text-label-mono bg-surface-container-high text-primary px-1.5 py-0.5 rounded text-[10px] font-bold">
                POLY
              </span>
            </div>

            {/* Interactive Mic Check Button */}
            <button
              onClick={() => setMicTesting(!micTesting)}
              className={`group flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all shadow-sm ${
                micTesting ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              }`}
              type="button"
            >
              <div className="w-3 h-3 rounded-full bg-secondary-container flex items-center justify-center">
                <span className={`w-1.5 h-1.5 rounded-full ${micTesting ? 'bg-primary animate-ping' : 'bg-secondary'}`}></span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-label-mono text-label-mono text-on-surface-variant text-[10px] leading-none uppercase">
                  Microphone
                </span>
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  {micTesting ? 'Active (48kHz · 0.2% jitter)' : 'Built-in (48kHz)'}
                </span>
              </div>
              <span className="material-symbols-outlined text-base text-on-surface-variant group-hover:text-primary transition-colors">
                mic
              </span>
            </button>

            {/* Start Room Action Button */}
            <button
              onClick={() => setCurrentView('voice-rooms')}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary text-on-primary font-headline-md text-body-md font-bold hover:bg-primary-container active:scale-[0.98] transition-all shadow-md"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">sensors</span>
              <span>Start Room</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Workspace: Bento Grid 8 / 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Live Rooms & Tech Communities */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Section: Live Voice Rooms Now */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Live Voice Rooms Now
                </h2>
                <span className="font-label-mono text-label-mono bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full font-bold">
                  12 Rooms Active
                </span>
              </div>
              <button
                onClick={() => setCurrentView('voice-rooms')}
                className="font-label-md text-label-md font-bold text-primary hover:text-primary-container flex items-center gap-1 transition-colors"
              >
                Explore All <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>

            {/* Room 1 (Featured Live Room - Rich Interactive Card) */}
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-5 transition-all hover:shadow-md border border-outline-variant/30">
              {/* Room Header & Meta */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex flex-col gap-1.5 flex-1 min-w-[260px]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-label-mono text-label-mono bg-surface-container px-2 py-0.5 rounded-full text-on-surface-variant font-medium">
                      DevOps &amp; Infra
                    </span>
                    <span className="flex items-center gap-1 font-label-mono text-label-mono text-on-secondary-container bg-secondary-container/60 px-2 py-0.5 rounded-full font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span> Live Broadcast
                    </span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant">Cluster #k8s-prod</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
                    Kubernetes &amp; Cloud Native Architecture: Multi-Cluster Failover
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-full">
                    <span className="material-symbols-outlined text-sm text-primary">group</span>
                    <span className="font-label-mono text-label-mono font-bold text-on-surface">18</span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant">listening</span>
                  </div>
                  <button
                    onClick={() => setCurrentView('voice-rooms')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container transition-all shadow-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-base">headset</span>
                    <span>Join Room</span>
                  </button>
                </div>
              </div>

              {/* Active Speaker Pod & Real-time Acoustic Waveform Stage */}
              <div className="bg-surface-container-low rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Speaker Info */}
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container-highest shadow-sm">
                      <img
                        className="w-full h-full object-cover"
                        alt="Ahmed El-Sayed"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkBW-uzPLlgUTs3B8tVKPppnghJ9sp6SvEjp43UeO1L7g0KeORq--5UQLRZ4-pu89DAywrfHvt5zMguan2o2WaxuXfYmvFZKO1mkRz-PIyvEs-N_DgHo9xBfpNXaZDAMeRUy6dJST9yDSMNeIdXzUvNspvcpjjWJQPRla3E6sKFs_EuR6azkD0rHkD40KJH6_6d42kQVc1wD_OvHSCTuAvf6XiSxnbuv2RQQVbDV37RgRU2q3tzUc6"
                      />
                    </div>
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[9px] font-bold text-on-secondary shadow">
                      🇪🇬
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-label-md text-label-md font-bold text-on-surface">Ahmed El-Sayed</span>
                      <span className="font-label-mono text-label-mono px-1.5 py-0.2 rounded bg-tertiary-container text-on-tertiary-container text-[10px] font-bold">
                        HOST
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="font-label-mono text-label-mono bg-secondary-container/80 text-on-secondary-container px-1.5 py-0.5 rounded text-[11px] font-bold">
                        AR Speaking
                      </span>
                      <span className="material-symbols-outlined text-xs text-on-surface-variant">arrow_forward</span>
                      <span className="font-label-mono text-label-mono bg-surface-container-highest text-primary px-1.5 py-0.5 rounded text-[11px] font-bold">
                        EN Translating
                      </span>
                    </div>
                  </div>
                </div>

                {/* Live Acoustic Waveform Visualizer */}
                <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-2.5 rounded-xl shadow-inner flex-1 max-w-sm">
                  <span className="material-symbols-outlined text-secondary text-sm">graphic_eq</span>
                  <div className="flex items-center gap-1 w-full h-6">
                    <span className="w-1 h-3 rounded-full bg-secondary-container animate-pulse"></span>
                    <span className="w-1 h-5 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '80ms' }}></span>
                    <span className="w-1 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '140ms' }}></span>
                    <span className="w-1 h-6 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '60ms' }}></span>
                    <span className="w-1 h-4 rounded-full bg-primary animate-pulse" style={{ animationDelay: '200ms' }}></span>
                    <span className="w-1 h-5 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '110ms' }}></span>
                    <span className="w-1 h-3 rounded-full bg-secondary-container animate-pulse" style={{ animationDelay: '90ms' }}></span>
                    <span className="w-1 h-2 rounded-full bg-primary-container animate-pulse" style={{ animationDelay: '170ms' }}></span>
                    <span className="w-1 h-6 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '230ms' }}></span>
                    <span className="w-1 h-4 rounded-full bg-primary animate-pulse" style={{ animationDelay: '50ms' }}></span>
                    <span className="w-1 h-3 rounded-full bg-secondary-container animate-pulse" style={{ animationDelay: '130ms' }}></span>
                    <span className="w-1 h-1 rounded-full bg-surface-container-highest"></span>
                  </div>
                  <span className="font-label-mono text-label-mono text-primary font-bold text-xs whitespace-nowrap">32ms</span>
                </div>
              </div>

              {/* Real-time Live Translation Snippet */}
              <div className="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono text-label-mono text-primary font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-xs">translate</span> Live Streamed Transcript:
                  </span>
                  <span className="font-label-mono text-label-mono text-on-surface-variant text-[11px]">99.4% confidence</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface italic pl-3 border-l-2 border-primary">
                  "...we configure ingress health check probes with a 3-second grace period so etcd leader elections don't drop TLS handshakes during cross-region failovers."
                </p>
              </div>
            </div>

            {/* Room 2 & 3 Compact Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Room 2: Rust & Python LLM Agents */}
              <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 border border-outline-variant/30">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-label-mono text-label-mono bg-surface-container px-2 py-0.5 rounded-full text-on-surface-variant">
                      AI &amp; ML
                    </span>
                    <div className="flex items-center gap-1 bg-surface-container-low px-2 py-0.5 rounded-full font-label-mono text-label-mono font-semibold text-on-surface">
                      <span className="material-symbols-outlined text-xs text-primary">groups</span> 24
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-headline-md text-headline-md text-on-surface font-bold line-clamp-2">
                      Building LLM Agents in Rust &amp; Python
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      Memory safe token streaming and token-efficient function calling patterns.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-surface-container-high">
                        <img
                          className="w-full h-full object-cover"
                          alt="Pierre Dupont"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuP5VYzgMIv6mYvbPoklL1oqSWQZHriqAbS6HfvgQnCONy0l8p3kobbOKj-GIaDmVz6qZdZW9ppNWIUvTvvS3aKds3t-dPUlvBnKKR6xocor26rjflIBqMqMBEUYv5GjGjkE95mOxHoY56FJfDfkVJAHcSE9ST3eG_av5APq9m4nu8Pks7TDOjnN986Jb4G2pq35WMHGJw0KR2iLHVpaVn6HDtf6CwGb35nwi-qe8WEbOL4lJP1e8P"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-semibold text-on-surface">Pierre Dupont 🇫🇷</span>
                        <span className="font-label-mono text-label-mono text-on-surface-variant">FR → EN Bridge</span>
                      </div>
                    </div>
                    <span className="font-label-mono text-label-mono px-2 py-0.5 rounded bg-surface-container-high text-primary font-bold">
                      41ms
                    </span>
                  </div>
                  <button
                    onClick={() => setCurrentView('voice-rooms')}
                    className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-bold transition-all flex items-center justify-center gap-2"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">headset</span>
                    <span>Join Session</span>
                  </button>
                </div>
              </div>

              {/* Room 3: Full-Stack React & Go Study Group */}
              <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 border border-outline-variant/30">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-label-mono text-label-mono bg-surface-container px-2 py-0.5 rounded-full text-on-surface-variant">
                      Web &amp; Systems
                    </span>
                    <div className="flex items-center gap-1 bg-surface-container-low px-2 py-0.5 rounded-full font-label-mono text-label-mono font-semibold text-on-surface">
                      <span className="material-symbols-outlined text-xs text-primary">groups</span> 14
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-headline-md text-headline-md text-on-surface font-bold line-clamp-2">
                      Full-Stack React &amp; Go Study Group
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      Zero-allocation JSON marshalling and concurrent SSE channel subscribers.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-surface-container-high">
                        <img
                          className="w-full h-full object-cover"
                          alt="Lukas Meyer"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbGs2X7F31SCJWvY9_1w46DhinUJwU6NEPDolkGxWvQ2VtsCK8t0mCbJ81LcSOMye_rjPox_m_C5px0teji8KzvPpKm6dn-VuGhgGJJaxQOzyhSIIbPxsY50Yys1hcQfENwiFJ7DwSmraY9cJs17NMQFS3hAe8JdwlTRsvF9aEyFDoRq498yhG9mOgx1JoGXAsJHYpdBQhd7gkdk6Ou338nx_phzhhW3WfWU06NVXLhtxn_YCL8hU4"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md font-semibold text-on-surface">Lukas Meyer 🇩🇪</span>
                        <span className="font-label-mono text-label-mono text-on-surface-variant">DE → EN Bridge</span>
                      </div>
                    </div>
                    <span className="font-label-mono text-label-mono px-2 py-0.5 rounded bg-surface-container-high text-primary font-bold">
                      29ms
                    </span>
                  </div>
                  <button
                    onClick={() => setCurrentView('voice-rooms')}
                    className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-bold transition-all flex items-center justify-center gap-2"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">headset</span>
                    <span>Join Session</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Recommended Tech Communities */}
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Recommended Tech Communities
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Join persistent cohorts with shared codebases and scheduled multilingual talks.
                </p>
              </div>
              <button
                onClick={() => setCurrentView('communities')}
                className="font-label-md text-label-md font-bold text-primary hover:text-primary-container flex items-center gap-1 transition-colors"
              >
                Browse Hub <span className="material-symbols-outlined text-base">open_in_new</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Community 1 */}
              <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 border border-outline-variant/30">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">cloud_sync</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                      Global DevOps &amp; Cloud
                    </h3>
                    <div className="flex items-center gap-2 font-label-mono text-label-mono text-on-surface-variant text-xs">
                      <span>1,420 members</span>
                      <span>•</span>
                      <span className="text-primary font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> 48 online
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="font-label-mono text-label-mono bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface-variant font-semibold text-xs">
                      EN
                    </span>
                    <span className="font-label-mono text-label-mono bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface-variant font-semibold text-xs">
                      AR
                    </span>
                    <span className="font-label-mono text-label-mono bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface-variant font-semibold text-xs">
                      ES
                    </span>
                    <span className="font-label-mono text-label-mono bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface-variant font-semibold text-xs">
                      DE
                    </span>
                  </div>
                  <button
                    onClick={() => setCurrentView('communities')}
                    className="w-full py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-all"
                    type="button"
                  >
                    Enter Community
                  </button>
                </div>
              </div>

              {/* Community 2 */}
              <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 border border-outline-variant/30">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-container/60 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-2xl">neurology</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                      AI &amp; ML Researchers
                    </h3>
                    <div className="flex items-center gap-2 font-label-mono text-label-mono text-on-surface-variant text-xs">
                      <span>2,850 members</span>
                      <span>•</span>
                      <span className="text-secondary font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 112 online
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="font-label-mono text-label-mono bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface-variant font-semibold text-xs">
                      EN
                    </span>
                    <span className="font-label-mono text-label-mono bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface-variant font-semibold text-xs">
                      FR
                    </span>
                    <span className="font-label-mono text-label-mono bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface-variant font-semibold text-xs">
                      JA
                    </span>
                    <span className="font-label-mono text-label-mono bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface-variant font-semibold text-xs">
                      ZH
                    </span>
                  </div>
                  <button
                    onClick={() => setCurrentView('communities')}
                    className="w-full py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-all"
                    type="button"
                  >
                    Enter Community
                  </button>
                </div>
              </div>

              {/* Community 3 */}
              <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 border border-outline-variant/30">
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-tertiary-container/30 flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined text-2xl">terminal</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                      Web Platform Masters
                    </h3>
                    <div className="flex items-center gap-2 font-label-mono text-label-mono text-on-surface-variant text-xs">
                      <span>3,100 members</span>
                      <span>•</span>
                      <span className="text-tertiary font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> 89 online
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="font-label-mono text-label-mono bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface-variant font-semibold text-xs">
                      EN
                    </span>
                    <span className="font-label-mono text-label-mono bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface-variant font-semibold text-xs">
                      DE
                    </span>
                    <span className="font-label-mono text-label-mono bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface-variant font-semibold text-xs">
                      PT
                    </span>
                    <span className="font-label-mono text-label-mono bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface-variant font-semibold text-xs">
                      HI
                    </span>
                  </div>
                  <button
                    onClick={() => setCurrentView('communities')}
                    className="w-full py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-all"
                    type="button"
                  >
                    Enter Community
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): AI Summaries & Upcoming Calendar */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* Widget: Recent AI Session Summaries */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-5 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  AI Session Summaries
                </h3>
              </div>
              <span className="font-label-mono text-label-mono px-2 py-0.5 rounded-full bg-surface-container text-primary font-bold text-xs">
                LATEST
              </span>
            </div>

            {/* Featured Summary Card */}
            <div className="bg-surface-container-low rounded-xl p-4 flex flex-col gap-3.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col">
                  <span className="font-label-mono text-label-mono text-on-surface-variant uppercase text-xs">
                    Architecture Cohort
                  </span>
                  <h4 className="font-headline-md text-headline-md font-bold text-on-surface leading-snug">
                    System Design: Distributed Cache Strategies
                  </h4>
                </div>
                <span className="font-label-mono text-label-mono bg-surface-container px-2 py-0.5 rounded text-on-surface font-semibold shrink-0 text-xs">
                  45 min
                </span>
              </div>

              {/* Key Takeaways */}
              <div className="flex flex-col gap-2 pt-1">
                <span className="font-label-mono text-label-mono text-primary font-bold uppercase tracking-wider text-[11px]">
                  Key Synthesis
                </span>
                <ul className="flex flex-col gap-1.5 font-body-sm text-body-sm text-on-surface">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm text-primary shrink-0 mt-0.5">check_circle</span>
                    <span>Evaluated write-through vs write-behind for high concurrency flash-sale transactions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm text-primary shrink-0 mt-0.5">check_circle</span>
                    <span>Consensus reached on Redis Cluster hash slot sharding across 3 availability zones.</span>
                  </li>
                </ul>
              </div>

              {/* Translated Snippet Component */}
              <div className="bg-surface-container-lowest p-3 rounded-lg flex flex-col gap-1 border border-outline-variant/30">
                <div className="flex items-center justify-between font-label-mono text-label-mono text-[10px] text-on-surface-variant">
                  <span>Original (DE) → Translated (EN)</span>
                  <span>Speaker: Lukas M.</span>
                </div>
                <p className="font-body-code text-body-code text-on-surface text-xs italic bg-surface-container-low p-2 rounded">
                  "Der Cache-Stampede-Schutz erfordert probabilistische Früheinschreibung..."
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-xs pl-2">
                  "Cache stampede protection requires probabilistic early recomputation to prevent backend saturation."
                </p>
              </div>

              <button
                onClick={() => setCurrentView('ai-session-summaries')}
                className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container transition-all flex items-center justify-center gap-1.5 shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-base">description</span>
                <span>View Full Summary &amp; Audio Replay</span>
              </button>
            </div>

            {/* Secondary summary snippet */}
            <div
              onClick={() => setCurrentView('ai-session-summaries')}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container transition-colors cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  Zero-Knowledge Proofs in Rust
                </span>
                <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">
                  Yesterday • 62 min • FR/EN/DE
                </span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-lg">chevron_right</span>
            </div>
          </div>

          {/* Side Column: Upcoming Events & Calendar */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-5 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-xl">event_upcoming</span>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Upcoming Workshops
                </h3>
              </div>
              <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">This Week</span>
            </div>

            {/* Event 1: WebRTC Deep Dive */}
            <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-label-mono text-label-mono px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-bold text-xs">
                  TOMORROW • 17:00 UTC
                </span>
                <div className="flex items-center -space-x-1">
                  <span className="text-xs">🇬🇧</span>
                  <span className="text-xs">🇯🇵</span>
                  <span className="text-xs">🇪🇸</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Real-Time WebRTC Media Pipelines
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Hands-on lab: Building zero-latency multiplexers for live voice translation topologies.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1.5 font-label-mono text-label-mono text-on-surface-variant text-xs">
                  <span className="material-symbols-outlined text-sm">schedule</span> 90 min session
                </div>
                <button
                  onClick={() => setRsvpd(!rsvpd)}
                  className={`px-3.5 py-1.5 rounded-lg font-label-md text-label-md font-bold transition-all ${
                    rsvpd ? 'bg-primary text-on-primary' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                  }`}
                  type="button"
                >
                  {rsvpd ? '✓ Attending' : 'RSVP • 142 Going'}
                </button>
              </div>
            </div>

            {/* Event 2: Postgres Internals */}
            <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-label-mono text-label-mono text-on-surface-variant font-bold text-xs">
                  THU • 14:00 UTC
                </span>
                <div className="flex items-center -space-x-1">
                  <span className="text-xs">🇫🇷</span>
                  <span className="text-xs">🇩🇪</span>
                  <span className="text-xs">🇺🇸</span>
                </div>
              </div>
              <h4 className="font-label-md text-label-md font-bold text-on-surface">
                Postgres Internals: MVCC &amp; Vacuum
              </h4>
              <div className="flex items-center justify-between pt-1">
                <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">
                  60 min tech talk
                </span>
                <button
                  onClick={() => setRemindMe(!remindMe)}
                  className={`px-3 py-1 rounded-lg font-label-md text-label-md font-semibold transition-all ${
                    remindMe ? 'bg-tertiary text-on-tertiary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {remindMe ? '✓ Reminded' : 'Remind Me'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
