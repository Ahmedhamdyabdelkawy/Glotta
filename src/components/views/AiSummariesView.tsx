import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AiSummariesView: React.FC = () => {
  const { setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState<'exec-summary' | 'key-points' | 'action-items' | 'transcript'>('exec-summary');
  const [summaryLang, setSummaryLang] = useState('Arabic (العربية)');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [playingClip, setPlayingClip] = useState<string | null>(null);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Benchmark Raft implementation under 20% simulated packet loss', subtitle: 'Use Linux traffic control (tc netem) to validate pre-vote stability over 10,000 artificial partition cycles.', assignee: 'Lukas (🇩🇪)', due: 'May 22, 2024', done: false, issue: 'Issue #448' },
    { id: 2, title: 'Draft RFC for gRPC streaming snapshot transfers', subtitle: 'Define client-side chunk receiver proto spec, checksum validation, and backpressure throttling during heavy state transfers.', assignee: 'Ahmed (🇪🇬) & Maria (🇺🇸)', due: 'May 25, 2024', done: false, issue: 'Issue #449' },
    { id: 3, title: 'Distribute Go 1.22 memory profiler artifacts', subtitle: 'Compiled pprof heaps from the 5-node test harness shared in the #consensus channel.', assignee: 'Completed by Pierre (🇫🇷)', done: true, mergedPR: 'Merged PR #432' }
  ]);
  const [rsvpd, setRsvpd] = useState(false);
  const [transcriptSearch, setTranscriptSearch] = useState('');

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handlePlayClip = (clipId: string) => {
    if (playingClip === clipId) {
      setPlayingClip(null);
    } else {
      setPlayingClip(clipId);
      setTimeout(() => setPlayingClip(null), 4000);
    }
  };

  const handleCopyMarkdown = () => {
    const md = `# Distributed Consensus & Raft Algorithm in Go\n\nExecutive Summary:\nThe room assembled 16 distributed systems engineers to critique modern Raft consensus primitives implemented natively in Go 1.22...`;
    navigator.clipboard.writeText(md);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  return (
    <div className="px-4 sm:px-8 py-8 flex flex-col gap-8 max-w-7xl mx-auto w-full">
      {/* Top Banner & Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm flex flex-col gap-6 border border-outline-variant/30">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-gradient-to-br from-primary-fixed/20 via-secondary-container/15 to-transparent pointer-events-none blur-2xl"></div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container font-label-mono text-label-mono font-semibold text-primary text-xs">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              SYNTHESIS READY · ID #RF-8821
            </span>
            <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">
              Archived May 14, 2024 · 18:42 UTC
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Summary in Language Selector */}
            <div className="relative inline-flex items-center">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-all text-xs"
                type="button"
              >
                <span className="material-symbols-outlined text-sm text-secondary">translate</span>
                <span className="font-body-sm text-body-sm font-medium">Summary in:</span>
                <span className="font-label-md text-label-md font-semibold text-primary">{summaryLang}</span>
                <span className="material-symbols-outlined text-sm text-on-surface-variant">expand_more</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-48 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/30 py-1.5 z-50">
                  {['Arabic (العربية)', 'English (US)', 'German (Deutsch)', 'French (Français)', 'Spanish (Español)'].map(l => (
                    <button
                      key={l}
                      onClick={() => {
                        setSummaryLang(l);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs hover:bg-surface-container text-on-surface"
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-all text-xs font-semibold"
              type="button"
            >
              <span className="material-symbols-outlined text-base text-on-surface-variant">
                {copiedMarkdown ? 'done' : 'content_copy'}
              </span>
              <span>{copiedMarkdown ? 'Copied MD' : 'Markdown'}</span>
            </button>

            <button
              onClick={() => alert('PDF report exported and downloaded!')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-all text-xs font-semibold"
              type="button"
            >
              <span className="material-symbols-outlined text-base text-on-surface-variant">picture_as_pdf</span>
              <span>Export PDF</span>
            </button>

            <button
              onClick={() => {
                alert('Shared to #distributed-systems community feed!');
                setCurrentView('chat-and-messages');
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all shadow-sm text-xs font-semibold"
              type="button"
            >
              <span className="material-symbols-outlined text-base">share</span>
              <span>Share to Community</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-3xl">
            <div className="flex items-center gap-2 text-secondary font-label-mono text-label-mono tracking-wide uppercase font-semibold text-xs">
              <span className="material-symbols-outlined text-sm">hub</span>
              Systems Engineering · Go Working Group
            </div>
            <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
              Distributed Consensus &amp; Raft Algorithm in Go
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              In-depth engineering dissection of quorum health, heartbeat jitter, split-brain mitigation during cluster network partitions, and concurrent snapshot compaction.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center gap-2.5 px-3.5 py-2 bg-surface-container-low rounded-xl">
              <span className="material-symbols-outlined text-primary text-lg">timer</span>
              <div className="flex flex-col">
                <span className="font-label-mono text-label-mono text-on-surface-variant text-[10px]">DURATION</span>
                <span className="font-label-md text-label-md font-semibold text-on-surface text-xs">52 mins</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 px-3.5 py-2 bg-surface-container-low rounded-xl">
              <span className="material-symbols-outlined text-secondary text-lg">group</span>
              <div className="flex flex-col">
                <span className="font-label-mono text-label-mono text-on-surface-variant text-[10px]">PEERS</span>
                <span className="font-label-md text-label-md font-semibold text-on-surface text-xs">16 Devs</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 bg-surface-container-low rounded-xl">
              <span className="text-xs" title="English">🇺🇸</span>
              <span className="text-xs" title="German">🇩🇪</span>
              <span className="text-xs" title="Arabic">🇪🇬</span>
              <span className="text-xs" title="French">🇫🇷</span>
              <span className="text-xs" title="Spanish">🇪🇸</span>
              <span className="font-label-mono text-label-mono text-primary font-bold pl-1 text-xs">5 LANGS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Tab Content */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Tab buttons */}
          <div className="flex items-center gap-2 p-1.5 bg-surface-container rounded-xl overflow-x-auto">
            <button
              onClick={() => setActiveTab('exec-summary')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap text-xs sm:text-sm ${
                activeTab === 'exec-summary'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-base">auto_awesome</span>
              <span>Executive Summary</span>
            </button>
            <button
              onClick={() => setActiveTab('key-points')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap text-xs sm:text-sm ${
                activeTab === 'key-points'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-base">forum</span>
              <span>Key Discussion Points</span>
              <span className="font-label-mono text-label-mono bg-surface-container-highest px-1.5 py-0.5 rounded-full text-on-surface-variant text-xs">
                3
              </span>
            </button>
            <button
              onClick={() => setActiveTab('action-items')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap text-xs sm:text-sm ${
                activeTab === 'action-items'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-base">task_alt</span>
              <span>Action Items &amp; Code</span>
              <span className="font-label-mono text-label-mono bg-secondary-fixed text-on-secondary-fixed px-1.5 py-0.5 rounded-full font-bold text-xs">
                {tasks.filter(t => !t.done).length} Open
              </span>
            </button>
            <button
              onClick={() => setActiveTab('transcript')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap text-xs sm:text-sm ${
                activeTab === 'transcript'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-base">subtitles</span>
              <span>Multilingual Transcript</span>
            </button>
          </div>

          {/* TAB 1: EXECUTIVE SUMMARY */}
          {activeTab === 'exec-summary' && (
            <div className="flex flex-col gap-6">
              <div className="p-6 sm:p-8 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col gap-6 border border-outline-variant/30">
                <div className="flex items-center justify-between pb-4 border-b border-surface-container">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">psychology</span>
                    <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-primary text-xs">
                      Synthesized Architecture Brief
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-container px-2.5 py-1 rounded-full">
                    <span className="material-symbols-outlined text-xs text-secondary">verified</span>
                    <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">
                      Neural Model v4 · 99.4% Confidence
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 text-on-surface leading-relaxed font-body-md text-body-md text-sm sm:text-base">
                  <p>
                    The room assembled 16 distributed systems engineers to critique modern Raft consensus primitives implemented natively in Go 1.22. The session opened with an audit of leader election timeouts under high-jitter conditions. The consensus established that randomized heartbeats ranging between{' '}
                    <code className="px-1.5 py-0.5 rounded bg-surface-container font-body-code text-body-code text-primary text-xs">
                      150ms-300ms
                    </code>{' '}
                    remain insufficient across multi-region WAN topologies, prompting the proposal of an adaptive backoff heuristic factoring observed peer round-trip times.
                  </p>

                  <div className="p-4 bg-surface-container-low rounded-xl flex items-start gap-4 border border-outline-variant/20">
                    <span className="material-symbols-outlined text-secondary text-2xl shrink-0 mt-0.5">lightbulb</span>
                    <div className="flex flex-col gap-1">
                      <span className="font-label-md text-label-md font-bold text-on-surface text-sm">
                        Architectural Verdict: Snapshot Over-the-Wire
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                        Rather than blocking the state machine applier thread during memory compaction, snapshots will stream in chunked 4MB segments over dedicated HTTP/2 gRPC channels with asynchronous disk flushing on follower nodes.
                      </span>
                    </div>
                  </div>

                  <p>
                    A vigorous debate emerged comparing pure Raft against Multi-Paxos throughput profiles in read-heavy workloads. Benchmarks presented by the North American node team proved that with{' '}
                    <span className="font-semibold text-primary">LeaseRead optimization</span>, Raft avoids commit index synchronizations for read operations, effectively matching Paxos latency profiles while retaining Raft’s state clarity and deterministic debugging guarantees.
                  </p>

                  <p>
                    The session concluded with an agreement on unified telemetry hooks: instrumenting state machine transitions using OpenTelemetry metrics, standardizing log entry compaction markers, and executing a fault injection fuzzing marathon on Go channels before cutting release tag{' '}
                    <code className="px-1.5 py-0.5 rounded bg-surface-container font-body-code text-body-code text-secondary text-xs">
                      v0.9.4-rc1
                    </code>.
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-surface-container">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">KEY TOPICS:</span>
                    <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-mono text-label-mono font-medium text-xs">
                      #raft-consensus
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-mono text-label-mono font-medium text-xs">
                      #golang-concurrency
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-mono text-label-mono font-medium text-xs">
                      #split-brain
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-mono text-label-mono font-medium text-xs">
                      #grpc-streaming
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTab('transcript')}
                    className="flex items-center gap-1.5 text-primary hover:text-primary-container font-label-md text-label-md font-semibold text-xs"
                    type="button"
                  >
                    <span>View Full Audio Trace Log</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Consensus & Exploration Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col gap-3 border border-outline-variant/30">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    <span className="font-label-md text-label-md font-bold text-sm">Unanimous Consensus</span>
                  </div>
                  <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant text-xs">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">·</span>
                      <span>Adopt gRPC Protobuf v3 for binary log entry replication.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">·</span>
                      <span>Reject raw TCP byte streams due to framing overhead in multi-language clients.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">·</span>
                      <span>Mandate strict WAL fsync on write-heavy clusters with NVMe backend.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col gap-3 border border-outline-variant/30">
                  <div className="flex items-center gap-2 text-secondary">
                    <span className="material-symbols-outlined text-lg">tune</span>
                    <span className="font-label-md text-label-md font-bold text-sm">Pending Exploration</span>
                  </div>
                  <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant text-xs">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary font-bold">·</span>
                      <span>Jepsen chaos suite integration into continuous staging deployment.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary font-bold">·</span>
                      <span>Non-voting learner nodes for cross-ocean read replicas.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: KEY DISCUSSION POINTS */}
          {activeTab === 'key-points' && (
            <div className="flex flex-col gap-4">
              {/* Point 1 */}
              <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col gap-4 border border-outline-variant/30">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-label-mono text-label-mono font-bold text-primary text-xs">
                      00:11:42
                    </span>
                    <span className="font-headline-md text-headline-md font-bold text-on-surface">
                      Leader Election Timeouts &amp; Partition Recovery
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-low font-label-mono text-label-mono text-on-surface font-semibold text-xs">
                      <span>🇫🇷</span> Pierre
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-low font-label-mono text-label-mono text-on-surface font-semibold text-xs">
                      <span>🇩🇪</span> Lukas
                    </span>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-sm">
                  Dissected the failure mode where network latency spikes trigger duplicate elections simultaneously. Lukas demonstrated that when 2 of 5 nodes partition off, heartbeat failures cascade into term increments that can thrash the valid leader once connectivity is restored. Recommended incorporating pre-vote phases to verify quorum connectivity prior to incrementing the node term.
                </p>
                <div className="p-3 bg-surface-container rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handlePlayClip('clip-1')}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        playingClip === 'clip-1' ? 'bg-secondary text-on-secondary animate-pulse' : 'bg-primary text-on-primary'
                      }`}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {playingClip === 'clip-1' ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                    <span className="font-label-mono text-label-mono text-on-surface font-medium text-xs">
                      Audio Clip: Pierre explains Pre-Vote RPC protocol (FR → EN translate)
                    </span>
                  </div>
                  <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">02:18 min</span>
                </div>
              </div>

              {/* Point 2 */}
              <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col gap-4 border border-outline-variant/30">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-label-mono text-label-mono font-bold text-primary text-xs">
                      00:26:05
                    </span>
                    <span className="font-headline-md text-headline-md font-bold text-on-surface">
                      Log Compaction Techniques via Snapshots
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-low font-label-mono text-label-mono text-on-surface font-semibold text-xs">
                      <span>🇪🇬</span> Ahmed
                    </span>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-sm">
                  Ahmed presented real production memory flamegraphs showing WAL log growth stalling node restarts. To alleviate this, snapshots are serialized using zero-copy memory buffers. Rather than locking the internal state map, a copy-on-write fork pattern is employed so query throughput remains uninterrupted during 12GB snapshot writes to persistent storage.
                </p>
                <div className="p-3 bg-surface-container rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handlePlayClip('clip-2')}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        playingClip === 'clip-2' ? 'bg-secondary text-on-secondary animate-pulse' : 'bg-primary text-on-primary'
                      }`}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {playingClip === 'clip-2' ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                    <span className="font-label-mono text-label-mono text-on-surface font-medium text-xs">
                      Audio Clip: Ahmed on Zero-Copy Snapshotting (AR → EN translate)
                    </span>
                  </div>
                  <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">01:45 min</span>
                </div>
              </div>

              {/* Point 3 */}
              <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col gap-4 border border-outline-variant/30">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-label-mono text-label-mono font-bold text-primary text-xs">
                      00:41:19
                    </span>
                    <span className="font-headline-md text-headline-md font-bold text-on-surface">
                      Production Benchmarks: Raft vs. Multi-Paxos
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-low font-label-mono text-label-mono text-on-surface font-semibold text-xs">
                      <span>🇺🇸</span> Maria
                    </span>
                  </div>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-sm">
                  Maria walked through comparative throughput charts run on 9-node bare-metal clusters across AWS us-east and eu-central. Under write loads of 85,000 ops/sec, Raft’s leader bottleneck was observed when log entries exceeded 64KB. Pipeling append requests using asynchronous batching yielded a 2.4x latency improvement without forfeiting linearizability.
                </p>
                <div className="p-3 bg-surface-container rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handlePlayClip('clip-3')}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        playingClip === 'clip-3' ? 'bg-secondary text-on-secondary animate-pulse' : 'bg-primary text-on-primary'
                      }`}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {playingClip === 'clip-3' ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                    <span className="font-label-mono text-label-mono text-on-surface font-medium text-xs">
                      Audio Clip: Maria details Pipelined Appends (EN original)
                    </span>
                  </div>
                  <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">03:12 min</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ACTION ITEMS & CODE */}
          {activeTab === 'action-items' && (
            <div className="p-6 sm:p-8 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col gap-6 border border-outline-variant/30">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                    Commitments &amp; Sprint Deliverables
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                    Extracted in real-time from verbal consensus agreements
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newTitle = prompt('Enter new architectural task:');
                    if (newTitle) {
                      setTasks(prev => [
                        ...prev,
                        { id: Date.now(), title: newTitle, subtitle: 'Self-assigned from AI synthesis', assignee: 'Elena (🇩🇪)', due: 'May 30, 2024', done: false, issue: 'Issue #450' }
                      ]);
                    }
                  }}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md font-semibold transition-all text-xs"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">add_task</span>
                  <span>Add Task</span>
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-5 rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-sm border border-outline-variant/20 ${
                      task.done ? 'opacity-70' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(task.id)}
                        className="mt-1 h-5 w-5 rounded bg-surface-container-lowest text-primary accent-primary cursor-pointer"
                      />
                      <div className="flex flex-col gap-1">
                        <span className={`font-label-md text-label-md font-bold text-on-surface text-sm ${task.done ? 'line-through' : ''}`}>
                          {task.title}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                          {task.subtitle}
                        </span>
                        <div className="flex items-center gap-3 pt-2 flex-wrap">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container font-label-mono text-label-mono font-medium text-on-surface text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Assigned: {task.assignee}
                          </span>
                          {task.due && (
                            <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">
                              Due: {task.due}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 md:self-center">
                      {task.issue && (
                        <button
                          onClick={() => alert(`Navigating to GitHub repository ${task.issue}`)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-mono text-label-mono font-medium transition-all text-xs"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-sm text-primary">data_object</span>
                          <span>Create {task.issue}</span>
                        </button>
                      )}
                      {task.mergedPR && (
                        <span className="font-label-mono text-label-mono text-primary font-semibold flex items-center gap-1 text-xs">
                          <span className="material-symbols-outlined text-sm">done</span> {task.mergedPR}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MULTILINGUAL TRANSCRIPT */}
          {activeTab === 'transcript' && (
            <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col gap-4 border border-outline-variant/30">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="relative flex-1 min-w-[240px]">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-lg">search</span>
                  <input
                    value={transcriptSearch}
                    onChange={(e) => setTranscriptSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-surface-container rounded-xl font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                    placeholder="Search transcript text, speakers, or translated keywords..."
                    type="text"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-2">
                {/* Transcript row 1 */}
                <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2 border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-6 h-6 rounded-full object-cover"
                        alt="Pierre Dubois"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0Da_a8M7cSV9sF9eSmc4nmgDLO4MFOXHp397RyTwfweMRiPXzKU_JhA0j8aSfYWpaCaf-NxcxsvtvYXAY6C6pKZLuVFuAdBtuGFsEJ-7eZ7JVhTIxOC0wkal9FHcRYUZcoSZWP2DmZ4GTrQUHSJ51pgk6LnD9CnoPG5bgYXOrDdBs9lNPc0-0VzPtI6etQIMWHosZ09Jh3KvqmXX_yVRCFJpl2GPoOjJF9S9RvRffT1pYPngP18Y8"
                      />
                      <span className="font-label-md text-label-md font-bold text-on-surface text-xs">Pierre Dubois</span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-mono text-label-mono text-secondary font-semibold text-[10px]">
                        FR → EN
                      </span>
                      <span className="font-label-mono text-label-mono text-on-surface-variant text-[10px]">00:11:45</span>
                    </div>
                    <button
                      onClick={() => handlePlayClip('tr-pierre')}
                      className="w-7 h-7 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary flex items-center justify-center transition-all"
                      title="Listen to original audio"
                    >
                      <span className="material-symbols-outlined text-sm">volume_up</span>
                    </button>
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant italic pl-8 text-xs">
                    "Si le heartbeat expire avant la confirmation du quorum, le nœud déclenche une élection inutile. Nous devons différer le vote."
                  </div>
                  <div className="pl-8 pt-1 border-l-2 border-primary ml-4">
                    <p className="font-body-md text-body-md text-on-surface text-xs sm:text-sm">
                      "If the heartbeat expires prior to quorum confirmation, the node triggers an unnecessary election. We must defer the pre-vote phase."
                    </p>
                  </div>
                </div>

                {/* Transcript row 2 */}
                <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2 border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-6 h-6 rounded-full object-cover"
                        alt="Ahmed Mansour"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIV_AydGMwvavzDNR7rFbWKNb4OHn_SnvlfPEpcyzQ9dabB101lw-oYeskouThkgpwRIAPgTKmcJj9NWLqCoQQ9HRf72g2pJmWjYTR0Didm7nARxCb9PnHCIRRXAyY1d1dR8DJkOPG1MD5vMEvHaGUKRe-wtbx-XAHB-_SR4Jjyrjf3CelqVTTBiY1TzJ5aHHFu8Gk72HVr5_lUBEvfjM-xINoU_P2yW6FDqGhf9J_2gH78GfgqmcO"
                      />
                      <span className="font-label-md text-label-md font-bold text-on-surface text-xs">Ahmed Mansour</span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-mono text-label-mono text-secondary font-semibold text-[10px]">
                        AR → EN
                      </span>
                      <span className="font-label-mono text-label-mono text-on-surface-variant text-[10px]">00:26:12</span>
                    </div>
                    <button
                      onClick={() => handlePlayClip('tr-ahmed')}
                      className="w-7 h-7 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary flex items-center justify-center transition-all"
                      title="Listen to original audio"
                    >
                      <span className="material-symbols-outlined text-sm">volume_up</span>
                    </button>
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant italic pl-8 text-xs font-arabic" dir="rtl">
                    "قمنا بحل مشكلة الذاكرة عن طريق استخدام مجرى بيانات مضغوط عبر بروتوكول gRPC بدلاً من قفل شجرة الحالة بأكملها."
                  </div>
                  <div className="pl-8 pt-1 border-l-2 border-primary ml-4">
                    <p className="font-body-md text-body-md text-on-surface text-xs sm:text-sm">
                      "We resolved the memory bottleneck by utilizing a compressed gRPC data stream rather than locking the entire state tree during dump operations."
                    </p>
                  </div>
                </div>

                {/* Transcript row 3 */}
                <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2 border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-6 h-6 rounded-full object-cover"
                        alt="Maria Chen"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2MxdIvxVhsP29MlzyKJ9QwuOxjzVQc3ILeMnCh-yf2nJ3VFAfFz0WyUZRBioNRKRPgFym5TvFSYiYHYIyT50_1sfReZJB2KMIvOvByiw2eG8EtDf_eLeunTMc843VpXUPkOufftXJefMqMYU1oZwodboue7zPyYTjpRJY1TiW9Lf1UIMga-_UY4Mx3tdP5RekWbJ36UdOOKh0rgzs9IhhXL3lR_l8l9Jcq5MkhMAGw10ib6AKy2xV"
                      />
                      <span className="font-label-md text-label-md font-bold text-on-surface text-xs">Maria Chen</span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-mono text-label-mono text-primary font-semibold text-[10px]">
                        EN (Original)
                      </span>
                      <span className="font-label-mono text-label-mono text-on-surface-variant text-[10px]">00:41:22</span>
                    </div>
                    <button
                      onClick={() => handlePlayClip('tr-maria')}
                      className="w-7 h-7 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary flex items-center justify-center transition-all"
                      title="Listen to original audio"
                    >
                      <span className="material-symbols-outlined text-sm">volume_up</span>
                    </button>
                  </div>
                  <div className="pl-8 pt-1">
                    <p className="font-body-md text-body-md text-on-surface text-xs sm:text-sm">
                      "Under 85,000 writes per second, pipelining append requests directly onto the channel shaved off almost 60% of our p99 latency without sacrificing linearizability."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Language Distribution & Archive */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Language Distribution */}
          <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col gap-5 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wider text-xs">
                Language Distribution
              </span>
              <span className="font-label-mono text-label-mono text-primary font-bold text-xs">5 Spoken</span>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between font-label-mono text-label-mono text-xs">
                  <span className="flex items-center gap-1 font-semibold text-on-surface">🇺🇸 English (US/UK)</span>
                  <span className="text-on-surface-variant">42% · 21.8m</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between font-label-mono text-label-mono text-xs">
                  <span className="flex items-center gap-1 font-semibold text-on-surface">🇪🇬 Arabic (العربية)</span>
                  <span className="text-on-surface-variant">24% · 12.5m</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary-container rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between font-label-mono text-label-mono text-xs">
                  <span className="flex items-center gap-1 font-semibold text-on-surface">🇩🇪 German (Deutsch)</span>
                  <span className="text-on-surface-variant">16% · 8.3m</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary-container rounded-full" style={{ width: '16%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between font-label-mono text-label-mono text-xs">
                  <span className="flex items-center gap-1 font-semibold text-on-surface">🇫🇷 French (Français)</span>
                  <span className="text-on-surface-variant">11% · 5.7m</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary-fixed-dim rounded-full" style={{ width: '11%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between font-label-mono text-label-mono text-xs">
                  <span className="flex items-center gap-1 font-semibold text-on-surface">🇪🇸 Spanish (Español)</span>
                  <span className="text-on-surface-variant">7% · 3.6m</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-outline-variant rounded-full" style={{ width: '7%' }}></div>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-surface-container-low rounded-xl flex items-center justify-between border border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-lg">bolt</span>
                <span className="font-body-sm text-body-sm text-on-surface text-xs">Avg. Live Translation Latency</span>
              </div>
              <span className="font-label-mono text-label-mono font-bold text-primary text-xs">34.2 ms</span>
            </div>
          </div>

          {/* Session History Archive */}
          <div className="p-6 bg-surface-container-lowest rounded-2xl shadow-sm flex flex-col gap-5 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">history</span>
                <h3 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wider text-xs">
                  Session History
                </h3>
              </div>
              <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">Archive</span>
            </div>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-base pointer-events-none">
                search
              </span>
              <input
                className="w-full pl-9 pr-3 py-1.5 bg-surface-container rounded-xl font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none text-xs"
                placeholder="Filter past voice rooms..."
                type="text"
              />
            </div>

            <div className="flex flex-col gap-3">
              <a
                className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col gap-1.5 group border border-outline-variant/20"
                href="#k8s-101"
              >
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-primary transition-colors text-xs">
                    Kubernetes Operators 101
                  </span>
                  <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">May 11</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 text-xs">
                  Reconciliation loop semantics &amp; CRD design patterns
                </p>
                <div className="flex items-center gap-2 pt-1 font-label-mono text-label-mono text-on-surface-variant text-[11px]">
                  <span>44 mins</span>
                  <span>·</span>
                  <span>12 devs</span>
                  <span>·</span>
                  <span>3 langs</span>
                </div>
              </a>

              <a
                className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col gap-1.5 group border border-outline-variant/20"
                href="#pg-vacuum"
              >
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-primary transition-colors text-xs">
                    PostgreSQL Vacuum Internals
                  </span>
                  <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">May 08</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 text-xs">
                  Multi-version concurrency, bloat mitigation &amp; autovacuum triggers
                </p>
                <div className="flex items-center gap-2 pt-1 font-label-mono text-label-mono text-on-surface-variant text-[11px]">
                  <span>68 mins</span>
                  <span>·</span>
                  <span>21 devs</span>
                  <span>·</span>
                  <span>6 langs</span>
                </div>
              </a>

              <a
                className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col gap-1.5 group border border-outline-variant/20"
                href="#wasm-runtimes"
              >
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-primary transition-colors text-xs">
                    WebAssembly Micro-runtimes
                  </span>
                  <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">May 02</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 text-xs">
                  Wasmtime vs WasmEdge edge function performance in Envoy
                </p>
                <div className="flex items-center gap-2 pt-1 font-label-mono text-label-mono text-on-surface-variant text-[11px]">
                  <span>38 mins</span>
                  <span>·</span>
                  <span>9 devs</span>
                  <span>·</span>
                  <span>4 langs</span>
                </div>
              </a>
            </div>

            <button
              onClick={() => alert('Loaded all 42 archived voice room syntheses!')}
              className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md font-semibold transition-all text-center text-xs"
              type="button"
            >
              View All 42 Archived Rooms
            </button>
          </div>

          {/* Live Room Re-engagement Card */}
          <div className="p-5 bg-gradient-to-br from-surface-container to-surface-container-high rounded-2xl flex flex-col gap-3 border border-outline-variant/30">
            <div className="flex items-center gap-2 text-primary font-label-md text-label-md font-bold text-xs">
              <span className="material-symbols-outlined text-lg">electric_bolt</span>
              <span>Live Room Re-engagement</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
              Next scheduled voice room in this working group:{' '}
              <strong className="text-on-surface">Raft Leader Election Fuzz Testing Live Demo</strong>
            </p>
            <div className="flex items-center justify-between pt-1">
              <span className="font-label-mono text-label-mono text-secondary font-bold text-xs">Tomorrow · 16:00 UTC</span>
              <button
                onClick={() => setRsvpd(!rsvpd)}
                className={`px-3 py-1.5 rounded-lg font-label-md text-label-md font-semibold transition-all text-xs ${
                  rsvpd ? 'bg-tertiary text-on-tertiary' : 'bg-primary text-on-primary hover:bg-primary-container'
                }`}
                type="button"
              >
                {rsvpd ? '✓ RSVP\'d' : 'RSVP'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
