import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { STUDY_PODS } from '../../data/mockData';

export const LearnStudyView: React.FC = () => {
  const { setCurrentView } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [workshopRsvp, setWorkshopRsvp] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [joinedPod, setJoinedPod] = useState<string | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);

  const filterDomains = [
    'All Clusters (14)',
    'Distributed Systems (5)',
    'Cloud & Kubernetes (3)',
    'AI & LLM Orchestration (4)',
    'Rust & Low-Level (2)',
  ];

  const handleCopyCode = () => {
    const code = `SEC("sockops")
int bpf_sockmap_intercept(struct bpf_sock_ops *skops) {
    __u32 family = skops->family;
    if (family == AF_INET) {
        bpf_sock_hash_update(skops, &sock_map, &key, BPF_NOEXIST);
        return BPF_OK;
    }
    return BPF_DROP;
}`;
    navigator.clipboard.writeText(code);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div className="px-4 sm:px-6 py-8 max-w-[1560px] mx-auto w-full flex flex-col gap-8">
      {/* Hero / Header Stats Bar */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-6 lg:p-8 shadow-sm border border-outline-variant/30">
        <div className="absolute -right-12 -top-12 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-48 bottom-0 w-64 h-64 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col max-w-2xl gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-label-mono font-label-mono text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                ACOUSTIC SYNC v2.4
              </span>
              <span className="text-label-mono font-label-mono text-on-surface-variant text-xs">
                / EDUCATION_HUB
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
              Collaborative Tech Learning
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Join real-time translated study cohorts, interactive lessons, and peer code reviews with developers worldwide. Speak in your native language; peers listen in theirs.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <button
              onClick={() => setCurrentView('voice-rooms')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-on-primary font-headline-md text-label-md font-semibold hover:bg-primary-container transition-all active:scale-[0.98] shadow-sm text-xs sm:text-sm"
            >
              <span className="material-symbols-outlined text-xl">group_add</span>
              <span>Start a Study Pod</span>
            </button>
            <button
              onClick={() => alert('Opening interactive learning syllabus...')}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all text-xs sm:text-sm"
            >
              <span className="material-symbols-outlined text-lg text-secondary">explore</span>
              <span>Browse Syllabus</span>
            </button>
          </div>
        </div>

        {/* Quick Metrics Ribbon */}
        <div className="mt-8 pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-surface-container-lowest/70 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-outline-variant/20">
          <div className="flex flex-col gap-0.5 px-3">
            <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider text-[11px]">
              Active Sprints
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-md text-headline-md font-bold text-primary">14</span>
              <span className="font-body-sm text-body-sm text-primary-container font-medium text-xs">Cohorts Live</span>
            </div>
          </div>
          <div className="flex flex-col gap-0.5 px-3">
            <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider text-[11px]">
              Multilingual Devs
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-md text-headline-md font-bold text-on-surface">3,420</span>
              <span className="font-label-mono text-label-mono text-tertiary text-xs">38 Spoken Langs</span>
            </div>
          </div>
          <div className="flex flex-col gap-0.5 px-3">
            <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider text-[11px]">
              Bridge Latency
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-md text-headline-md font-bold text-secondary">34ms</span>
              <span className="font-label-mono text-label-mono text-secondary text-xs">Zero drift</span>
            </div>
          </div>
          <div className="flex flex-col gap-0.5 px-3">
            <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider text-[11px]">
              Study Streak
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-md text-headline-md font-bold text-on-surface">18 Days</span>
              <span className="font-body-sm text-body-sm text-secondary-container">🔥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Filter Chips */}
      <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-2">
          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase mr-1 text-xs">Filter Domain:</span>
          {filterDomains.map((domain) => {
            const isSelected = selectedFilter === domain || (domain.startsWith('All') && selectedFilter === 'All');
            return (
              <button
                key={domain}
                onClick={() => setSelectedFilter(domain.startsWith('All') ? 'All' : domain)}
                className={`px-3 py-1.5 rounded-full font-label-md text-label-md transition-all text-xs font-semibold whitespace-nowrap ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface'
                }`}
              >
                {domain}
              </button>
            );
          })}
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-on-surface-variant text-xs">
          <span className="material-symbols-outlined text-lg">tune</span>
          <span className="font-body-sm text-body-sm">Display: Audio + Code</span>
        </div>
      </div>

      {/* Main Grid: 8 Cols (Pods & Player) + 4 Cols (Sidebar Dashboard) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Primary Stream (8 Columns) */}
        <div className="xl:col-span-8 flex flex-col gap-8 min-w-0">
          {/* Active Cohorts & Live Peer Study Pods */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Live Peer Study Pods
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-mono text-label-mono font-bold text-xs">
                  3 ACTIVE NOW
                </span>
              </div>
              <button
                onClick={() => setCurrentView('voice-rooms')}
                className="font-label-md text-label-md text-primary font-semibold hover:underline flex items-center gap-1 text-xs"
              >
                View Schedule <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {/* Pod Cards */}
            <div className="grid grid-cols-1 gap-4">
              {/* Pod 1: MIT 6.824 */}
              <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-5 justify-between relative overflow-hidden border border-outline-variant/30">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
                <div className="flex flex-col gap-3 flex-1 min-w-0 pl-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-mono text-label-mono font-bold flex items-center gap-1.5 text-xs">
                      <span className="material-symbols-outlined text-xs">graphic_eq</span>
                      STUDY POD #04 · LIVE ON AIR
                    </span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">
                      MIT 6.824 Spring Lab 2B
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-headline-md text-headline-md font-bold text-on-surface truncate">
                      MIT 6.824 Distributed Systems (Raft in Go)
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                      Debugging leader election heartbeats and uncommitted log compaction edge cases across split brains.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-1 flex-wrap">
                    <div className="flex -space-x-2 overflow-hidden">
                      {STUDY_PODS[0].avatars.map((av, idx) => (
                        <img
                          key={idx}
                          className="inline-block h-8 w-8 rounded-full ring-2 ring-surface-container-lowest object-cover"
                          alt="Student avatar"
                          src={av}
                        />
                      ))}
                      <div className="inline-flex h-8 w-8 rounded-full bg-surface-container-high text-on-surface items-center justify-center font-label-mono text-label-mono font-semibold ring-2 ring-surface-container-lowest text-xs">
                        +5
                      </div>
                    </div>
                    {/* Animated synthetic audio waveform bars */}
                    <div className="flex items-center gap-1 h-6 px-3 bg-surface-container-low rounded-lg">
                      <span className="w-1 bg-secondary rounded-full animate-[bounce_1.2s_infinite_100ms] h-4"></span>
                      <span className="w-1 bg-primary rounded-full animate-[bounce_1.1s_infinite_200ms] h-5"></span>
                      <span className="w-1 bg-secondary rounded-full animate-[bounce_1.4s_infinite_150ms] h-2"></span>
                      <span className="w-1 bg-primary rounded-full animate-[bounce_0.9s_infinite_250ms] h-6"></span>
                      <span className="w-1 bg-secondary rounded-full animate-[bounce_1.3s_infinite_80ms] h-3"></span>
                      <span className="w-1 bg-primary rounded-full animate-[bounce_1.0s_infinite_180ms] h-5"></span>
                      <span className="font-label-mono text-label-mono text-secondary font-bold ml-1 text-xs">
                        Kareem (AR) speaking
                      </span>
                    </div>
                    <div className="hidden md:flex items-center gap-1 text-xs">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-mono text-label-mono text-on-surface-variant">
                        AR
                      </span>
                      <span className="material-symbols-outlined text-xs text-on-surface-variant">sync_alt</span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-mono text-label-mono text-on-surface-variant">
                        DE
                      </span>
                      <span className="material-symbols-outlined text-xs text-on-surface-variant">sync_alt</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-mono text-label-mono font-semibold">
                        EN
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-col justify-end md:justify-center items-end gap-2 md:pl-4">
                  <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">8 Devs in Stage</span>
                  <button
                    onClick={() => setJoinedPod(joinedPod === 'pod-mit' ? null : 'pod-mit')}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-label-md text-label-md font-semibold transition-all shadow-sm text-xs sm:text-sm ${
                      joinedPod === 'pod-mit' ? 'bg-tertiary text-on-tertiary' : 'bg-secondary text-on-secondary hover:bg-on-secondary-fixed-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">
                      {joinedPod === 'pod-mit' ? 'check' : 'mic'}
                    </span>
                    <span>{joinedPod === 'pod-mit' ? 'Connected (Mic On)' : 'Join Pod (Mic On)'}</span>
                  </button>
                </div>
              </div>

              {/* Pod 2: DDIA Cohort */}
              <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-5 justify-between border border-outline-variant/30">
                <div className="flex flex-col gap-3 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-mono text-label-mono font-semibold flex items-center gap-1.5 text-xs">
                      <span className="material-symbols-outlined text-xs text-primary">menu_book</span>
                      BOOK SPRINT · CH 7
                    </span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">
                      O'Reilly Designing Data-Intensive Applications
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-headline-md text-headline-md font-bold text-on-surface truncate">
                      DDIA Cohort: Transactions &amp; Serializability (SSI vs 2PL)
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Collaborative whiteboard comparison of snapshot isolation anomalies with real-time synchronized notes in Japanese &amp; English.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-1 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-tertiary">draw</span>
                      <span className="font-body-sm text-body-sm font-medium text-tertiary">Bilingual Shared Board Active</span>
                    </div>
                    <span className="text-on-surface-variant">•</span>
                    <div className="flex items-center gap-1">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-mono text-label-mono text-on-surface-variant">
                        JA
                      </span>
                      <span className="material-symbols-outlined text-xs text-on-surface-variant">east</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-mono text-label-mono font-semibold">
                        EN
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-col justify-end md:justify-center items-end gap-2 md:pl-4">
                  <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">12 Devs listening</span>
                  <button
                    onClick={() => setCurrentView('voice-rooms')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold transition-all text-xs sm:text-sm"
                  >
                    <span className="material-symbols-outlined text-base text-primary">headphones</span>
                    <span>Listen In</span>
                  </button>
                </div>
              </div>

              {/* Pod 3: Zero-Allocation Rust */}
              <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-5 justify-between border border-outline-variant/30">
                <div className="flex flex-col gap-3 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-mono text-label-mono font-semibold flex items-center gap-1.5 text-xs">
                      <span className="material-symbols-outlined text-xs text-primary">code</span>
                      CODE CLINIC
                    </span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">Audio DSP Pipeline</span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-headline-md text-headline-md font-bold text-on-surface truncate">
                      Zero-Allocation Rust for Real-Time Audio Streaming
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Fixing cache line bouncing and atomic ringbuffer contention in lock-free ringbuffers.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-1 text-xs">
                    <span className="font-label-mono text-label-mono text-primary font-medium bg-surface-container px-2 py-0.5 rounded-full">
                      6 peers pair-programming
                    </span>
                    <span className="text-on-surface-variant">•</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Langs: ES, PT, EN</span>
                  </div>
                </div>
                <div className="flex md:flex-col justify-end md:justify-center items-end gap-2 md:pl-4">
                  <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">3 spots open</span>
                  <button
                    onClick={() => setCurrentView('voice-rooms')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-semibold transition-all text-xs sm:text-sm"
                  >
                    <span className="material-symbols-outlined text-base">terminal</span>
                    <span>Open Workspace</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Lesson Module Player & Live Dual-Stream Transcript */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-mono text-label-mono text-primary font-semibold text-xs">
                  MODULE 04 // INTERACTIVE PEER LECTURE
                </span>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Microservices Resilience with Istio &amp; eBPF
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-mono text-label-mono font-semibold text-xs">
                  Synchronized Playback
                </span>
                <button
                  onClick={() => alert('Entering fullscreen lecture mode')}
                  className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface"
                  title="Fullscreen"
                >
                  <span className="material-symbols-outlined text-lg">fullscreen</span>
                </button>
              </div>
            </div>

            {/* Dual Player Box (Terminal Left + Multilingual Voice Transcript Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 bg-surface-container-lowest rounded-xl shadow-md overflow-hidden border border-outline-variant/30">
              {/* Code Terminal Pane (7 cols) */}
              <div className="lg:col-span-7 bg-[#17211E] text-[#DCE7E3] p-5 flex flex-col justify-between min-h-[380px]">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-3 border-b border-surface-variant/20">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-error/80"></span>
                      <span className="w-3 h-3 rounded-full bg-secondary-container/80"></span>
                      <span className="w-3 h-3 rounded-full bg-primary/80"></span>
                      <span className="font-label-mono text-label-mono text-surface-container-high ml-2 text-xs">
                        service_mesh_filter.c (eBPF probe)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-label-mono text-label-mono text-primary-fixed-dim bg-primary/30 px-2 py-0.5 rounded text-xs">
                        Kernel 6.4+
                      </span>
                      <button
                        onClick={handleCopyCode}
                        className="text-surface-container-high hover:text-on-primary"
                        title="Copy code"
                      >
                        <span className="material-symbols-outlined text-base">
                          {codeCopied ? 'done' : 'content_copy'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <pre className="font-body-code text-body-code overflow-x-auto text-xs leading-relaxed">
                    <code className="text-surface-container-highest">
                      <span className="text-secondary-fixed">SEC</span>(<span className="text-primary-fixed">"sockops"</span>)
                      <br />
                      <span className="text-primary-fixed-dim">int</span> bpf_sockmap_intercept(<span className="text-primary-fixed-dim">struct</span> bpf_sock_ops *skops) &#123;
                      <br />
                      <span className="text-outline-variant">    // Glotta Live Tag: Arabic instructor commentary bound at line 4</span>
                      <br />
                      <span className="text-primary-fixed-dim">    __u32</span> family = skops-&gt;family;
                      <br />
                      <span className="text-primary-fixed-dim">    if</span> (family == AF_INET) &#123;
                      <br />
                      <span className="text-secondary-fixed">        bpf_sock_hash_update</span>(skops, &amp;sock_map, &amp;key, BPF_NOEXIST);
                      <br />
                      <span className="text-outline-variant">        /* Latency bypass: 0.12ms socket redirect */</span>
                      <br />
                      <span className="text-primary-fixed-dim">        return</span> BPF_OK;
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&#125;
                      <br />
                      <span className="text-primary-fixed-dim">    return</span> BPF_DROP;
                      <br />
                      &#125;
                    </code>
                  </pre>
                </div>

                <div className="mt-4 pt-3 border-t border-surface-variant/20 flex items-center justify-between text-xs font-label-mono text-surface-container-high">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse"></span>
                    <span>Pod Terminal Node: glotta-cluster-eu-west</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>RAM: 142MB</span>
                    <span>CPU: 4.2%</span>
                  </div>
                </div>
              </div>

              {/* Synchronized Bilingual Transcript Stream Pane (5 cols) */}
              <div className="lg:col-span-5 bg-surface-container-low p-5 flex flex-col justify-between gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-primary">record_voice_over</span>
                    <span className="font-label-md text-label-md font-semibold text-on-surface text-xs">
                      Live Multilingual Stream
                    </span>
                  </div>
                  <span className="font-label-mono text-label-mono text-primary font-bold text-xs">Latency: 28ms</span>
                </div>

                <div className="flex flex-col gap-3.5 overflow-y-auto max-h-[280px] pr-1">
                  {/* Bubble 1 */}
                  <div className="p-3 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-1.5 border border-outline-variant/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">
                          T
                        </div>
                        <span className="font-label-md text-label-md font-semibold text-on-surface text-xs">
                          Tariq (Instructor)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 font-label-mono text-label-mono text-on-surface-variant text-[10px]">
                        <span className="px-1.5 py-0.2 rounded bg-surface-container font-semibold">AR</span>
                        <span>→</span>
                        <span className="px-1.5 py-0.2 rounded bg-primary-fixed text-on-primary-fixed font-semibold">
                          EN
                        </span>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface text-right font-medium text-xs font-arabic" dir="rtl">
                      "هنا نتجاوز طبقة TCP بالكامل ونمرر الحزم مباشرة بين المقابس عبر BPF sockmap."
                    </p>
                    <div className="pl-2.5 border-l-2 border-primary mt-1">
                      <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                        "Here we bypass the TCP/IP stack entirely, redirecting packets directly between sockets via BPF sockmap."
                      </p>
                    </div>
                    <span className="text-right font-label-mono text-[10px] text-on-surface-variant">
                      99.4% confidence · 26ms
                    </span>
                  </div>

                  {/* Bubble 2 */}
                  <div className="p-3 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-1.5 border border-outline-variant/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs">
                          M
                        </div>
                        <span className="font-label-md text-label-md font-semibold text-on-surface text-xs">Maximilian</span>
                      </div>
                      <div className="flex items-center gap-1 font-label-mono text-label-mono text-on-surface-variant text-[10px]">
                        <span className="px-1.5 py-0.2 rounded bg-surface-container font-semibold">DE</span>
                        <span>→</span>
                        <span className="px-1.5 py-0.2 rounded bg-primary-fixed text-on-primary-fixed font-semibold">
                          EN
                        </span>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface text-xs">
                      "Ist das kompatibel mit dem Standard-Container-Network-Interface?"
                    </p>
                    <div className="pl-2.5 border-l-2 border-secondary mt-1">
                      <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                        "Is that fully compatible with the standard CNI plugin in Kubernetes?"
                      </p>
                    </div>
                    <span className="text-right font-label-mono text-[10px] text-on-surface-variant">
                      98.9% confidence · 31ms
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => alert('You raised your hand to speak in German with live English translation!')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md text-xs font-semibold"
                  >
                    <span className="material-symbols-outlined text-sm">record_voice_over</span>
                    <span>Raise Hand (Ask in German)</span>
                  </button>
                  <button
                    onClick={() => alert('Audio channel balanced: 48kHz HD stereo')}
                    className="p-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high"
                    title="Audio settings"
                  >
                    <span className="material-symbols-outlined text-base">volume_up</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Key Concept Flashcards & Quiz Trigger */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col justify-between gap-3 border border-outline-variant/30">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono text-label-mono text-primary font-bold text-xs">CONCEPT #01</span>
                  <span className="material-symbols-outlined text-base text-on-surface-variant">layers</span>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md font-bold text-on-surface">BPF Socket Redirection</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-xs">
                    Direct memory transport without socket buffer re-encapsulation overhead.
                  </p>
                </div>
                <span className="font-label-mono text-label-mono text-tertiary text-xs">Verified by 4 peers</span>
              </div>

              <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col justify-between gap-3 border border-outline-variant/30">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono text-label-mono text-secondary font-bold text-xs">CONCEPT #02</span>
                  <span className="material-symbols-outlined text-base text-on-surface-variant">memory</span>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md font-bold text-on-surface">Envoy Sidecarless</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-xs">
                    Ambient mesh offloading mutual TLS logic to per-node proxy instances.
                  </p>
                </div>
                <span className="font-label-mono text-label-mono text-tertiary text-xs">Active discussion</span>
              </div>

              <div className="bg-primary-container text-on-primary-container p-4 rounded-xl shadow-sm flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-label-mono text-label-mono text-on-primary font-bold text-xs">INTERACTIVE QUIZ</span>
                  <span className="material-symbols-outlined text-base text-on-primary">quiz</span>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md font-bold text-on-primary">Test Bridge Comprehension</h4>
                  <p className="font-body-sm text-body-sm text-on-primary-container mt-1 text-xs">
                    3 quick questions generated from the live Arab-German speech transcript.
                  </p>
                </div>
                <button
                  onClick={() => setQuizOpen(true)}
                  className="w-full py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-bold hover:bg-surface-bright transition-all text-xs"
                >
                  Take Micro-Quiz
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar (4 Columns) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* My Study Tracks */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col gap-4 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface">My Study Tracks</h3>
              <span className="font-label-mono text-label-mono text-primary font-semibold text-xs">2 IN PROGRESS</span>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md font-bold text-on-surface text-xs">
                    Go Concurrency Mastery
                  </span>
                  <span className="font-label-mono text-label-mono text-primary font-bold text-xs">72%</span>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '72%' }}></div>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm pt-1 text-[11px]">
                  <span>Next: Channel Select Patterns</span>
                  <span className="font-label-mono text-label-mono">Cohort meets 19:00</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md font-bold text-on-surface text-xs">
                    Rust Embedded &amp; SIMD
                  </span>
                  <span className="font-label-mono text-label-mono text-secondary font-bold text-xs">45%</span>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: '45%' }}></div>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm pt-1 text-[11px]">
                  <span>Next: Memory Mapped I/O</span>
                  <span className="font-label-mono text-label-mono">Cohort meets Fri</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert('New learning tracks available: eBPF Network Kernels, Distributed KV Stores, LLM Vector Compaction')}
              className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-all flex items-center justify-center gap-1.5 text-xs"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              <span>Enroll in New Track</span>
            </button>
          </div>

          {/* Upcoming Peer Workshops */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col gap-4 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-xl">event_available</span>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                  Upcoming Peer Workshop
                </h3>
              </div>
              <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">TOMORROW</span>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-3 border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-mono text-label-mono font-bold text-xs">
                  16:00 UTC
                </span>
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-mono text-label-mono text-xs">
                    AR
                  </span>
                  <span className="material-symbols-outlined text-xs text-on-surface-variant">sync_alt</span>
                  <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-mono text-label-mono text-xs">
                    EN
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <h4 className="font-headline-md text-label-md font-bold text-on-surface text-sm">
                  Kubernetes Operator Pattern Deep Dive
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-xs">
                  Writing custom controllers using controller-runtime with multi-master consensus drills.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <img
                  className="w-10 h-10 rounded-full object-cover shadow-sm ring-1 ring-surface-variant"
                  alt="Fatima Zahra"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWJMda7E84n5YOUC8z4h2BsnkkpOe6wTqujju54Fj945A9_lSSeh3Ea9XcGkk02y4KyJgc-T5YCRCs3SLwZuC4MVtVr2vp8dO2CXgPdNoLbl5OsGCPadlC_eRD1OUD9mBJke7wGSJxhyNKE_dhD9nFO33E1BGlJUQsV9HP7wnc5qULPQvcQe22x95IMOjcHFhWzQaYaCcipiAdtSKIbzTmoqUzaRF7TmCBXLEb56fEFLWcS7gDvRYr"
                />
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-semibold text-on-surface text-xs">Fatima Zahra</span>
                  <span className="font-label-mono text-label-mono text-on-surface-variant text-[11px]">
                    Staff SRE · Lead Facilitator
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="font-label-mono text-label-mono text-tertiary font-semibold flex items-center gap-1 text-xs">
                  <span className="material-symbols-outlined text-sm">groups</span>
                  184 developers RSVP'd
                </span>
                <button
                  onClick={() => setWorkshopRsvp(!workshopRsvp)}
                  className={`px-4 py-2 rounded-xl font-label-md text-label-md font-semibold transition-all shadow-sm text-xs ${
                    workshopRsvp
                      ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                      : 'bg-primary text-on-primary hover:bg-primary-container'
                  }`}
                >
                  {workshopRsvp ? '✓ Attending' : 'RSVP Spot'}
                </button>
              </div>
            </div>
          </div>

          {/* Cross-Language Mentors Leaderboard */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col gap-4 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Cross-Language Mentors</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">Top contributors bridging multilingual pods</p>
              </div>
              <span className="material-symbols-outlined text-secondary text-xl">military_tech</span>
            </div>

            <div className="flex flex-col gap-3">
              {/* Leader 1 */}
              <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-label-mono text-label-mono font-bold text-secondary w-4 text-center text-xs">01</span>
                  <img
                    className="w-9 h-9 rounded-full object-cover"
                    alt="Henrik Lindqvist"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3LrSeA8Ud9YfLDNNH8-k2YsPZzzrxXfVZECI0cClCYvyyqLAX2Io-rjfJv7Mz76HW_UrPgJZ8KNeLMIlHiD6x9WNeucokufQKi9nIFw5Ob3fBRfi8Tt6Z4TAE2A922QQEr2dNyogJxjf1iXr71hNUxMjTT4Iy2Z3WIYHgnAOoWQjKE5REu1BLSn7jCwvJ4DH9DiXa-x13zA3vYF10OgNhGy7Z7CAm3rwE5TjHV_lWwIKYcV6CEhq8"
                  />
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-semibold text-on-surface leading-tight text-xs">
                      Henrik Lindqvist
                    </span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant text-[11px]">
                      Rust &amp; C++ · SE/EN
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-label-mono text-label-mono font-bold text-primary text-xs">1,420 pts</span>
                  <span className="font-label-mono text-[10px] text-tertiary">34 Pods Led</span>
                </div>
              </div>

              {/* Leader 2 */}
              <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-label-mono text-label-mono font-bold text-on-surface-variant w-4 text-center text-xs">02</span>
                  <img
                    className="w-9 h-9 rounded-full object-cover"
                    alt="Yuki Tanaka"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbihXBxSqhjWbEECuPQQ4sfMEhdtrj_hKGnj8e4uDYU8ojSz3TZt2ea6JGQ_QMbEkQpyabuPGcRG1JbLMfbyy1neA0T9MzMWFYdh4z40KSdE58fDcrcQ5ZJ4CQVUVy3_qiD2BDDV2MAjCYCt3GL6qRjGluWimE3Ko_xQUi5xqDKrpKE8TnUsDYGQwxge4ERMeJv9qFHWcUEkkAl29Egm1JaruAsBFMgDMK2IpwJMq0YAhdgQ6yRIgK"
                  />
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-semibold text-on-surface leading-tight text-xs">
                      Yuki Tanaka
                    </span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant text-[11px]">
                      Database Internals · JA/EN
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-label-mono text-label-mono font-bold text-primary text-xs">1,180 pts</span>
                  <span className="font-label-mono text-[10px] text-tertiary">28 Pods Led</span>
                </div>
              </div>

              {/* Leader 3 */}
              <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-label-mono text-label-mono font-bold text-on-surface-variant w-4 text-center text-xs">03</span>
                  <img
                    className="w-9 h-9 rounded-full object-cover"
                    alt="Lucas Silva"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcQsKSPyQb3imtUVc7rkuRwJ1o1YlGoy_yg-_Gxm8HotpLUdl5CIV31SoDLHtOT27Fe20ZDJDbdIEZWy8Ml2CDx2jYbJOBESDHzMb0H1sbpxSM7IOqSvVbCWxFq4fMkIR3HA1eM1tfbSKEZ5Ssd8idp5DQBVnQD-qzlaZ4JuUxtrnYapg20AhiRUMkqZ-lNQ8-3OGFnohc6EE6h1wvkugNozf4GuG0G2ispZsTlwwNZxn1EBjbbGqW"
                  />
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md font-semibold text-on-surface leading-tight text-xs">
                      Lucas Silva
                    </span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant text-[11px]">
                      Distributed Systems · PT/ES
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-label-mono text-label-mono font-bold text-primary text-xs">960 pts</span>
                  <span className="font-label-mono text-[10px] text-tertiary">21 Pods Led</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between border border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">workspace_premium</span>
                <span className="font-body-sm text-body-sm font-medium text-on-surface text-xs">
                  Earn Peer Mentor Badge
                </span>
              </div>
              <span className="font-label-mono text-label-mono text-primary font-bold text-xs">Host 2 Pods</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Micro-Quiz Modal */}
      {quizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-2xl shadow-xl max-w-md w-full p-6 flex flex-col gap-4 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">quiz</span>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Micro-Quiz</h3>
              </div>
              <button onClick={() => { setQuizOpen(false); setQuizSubmitted(false); }} className="p-1 rounded-lg hover:bg-surface-container">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="font-body-md text-body-md text-on-surface font-semibold text-xs sm:text-sm">
              Question: What is the primary latency reduction mechanism of eBPF BPF_MAP_TYPE_SOCKHASH in Istio?
            </p>

            <div className="flex flex-col gap-2 text-xs">
              {[
                'Bypasses netfilter & TCP stack to route packets directly between socket buffers.',
                'Compacts HTTP/2 headers into Protobuf byte streams on each proxy node.',
                'Disables mutual TLS encryption between sidecars in the same pod.'
              ].map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuizAnswer(idx)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    quizAnswer === idx
                      ? 'border-primary bg-surface-container font-semibold text-primary'
                      : 'border-outline-variant/30 hover:bg-surface-container-low text-on-surface'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {quizSubmitted && (
              <div className={`p-3 rounded-xl text-xs font-semibold ${quizAnswer === 0 ? 'bg-primary-container text-on-primary-container' : 'bg-error-container text-on-error-container'}`}>
                {quizAnswer === 0 ? '✓ Correct! BPF sockmap injects packets directly into the socket receive queue without netfilter traversal.' : 'Incorrect. Option 1 is the correct mechanism.'}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              {!quizSubmitted ? (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={quizAnswer === null}
                  className="px-4 py-2 bg-primary text-on-primary rounded-xl font-bold text-xs disabled:opacity-50"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={() => { setQuizOpen(false); setQuizSubmitted(false); }}
                  className="px-4 py-2 bg-primary text-on-primary rounded-xl font-bold text-xs"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
