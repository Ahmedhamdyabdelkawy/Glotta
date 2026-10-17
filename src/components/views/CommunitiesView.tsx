import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMMUNITY_HUBS } from '../../data/mockData';

export const CommunitiesView: React.FC = () => {
  const { setCurrentView } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showOriginalArabic, setShowOriginalArabic] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(28);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [communityName, setCommunityName] = useState('');
  const [communityTopic, setCommunityTopic] = useState('');
  const [communityTags, setCommunityTags] = useState('Rust, WASM, Tokio');

  const filterCategories = [
    'All (42)',
    'DevOps & Cloud',
    'AI & Machine Learning',
    'Systems & Rust/Go',
    'Frontend & Mobile',
    'Study Groups & LeetCode',
    'Career & Mentorship',
  ];

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-8 max-w-[1540px] mx-auto w-full">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="font-label-mono text-label-mono uppercase tracking-wider text-primary font-semibold bg-surface-container-high px-2.5 py-0.5 rounded-full text-xs">
              Global Developer Network
            </span>
            <span className="inline-flex items-center gap-1 font-label-mono text-label-mono text-secondary font-medium text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span> 42 Active Nodes
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Tech Communities</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Connect and learn with developers speaking your language or any language across the globe with zero acoustic barrier.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container text-on-surface border border-outline-variant/30">
            <span className="material-symbols-outlined text-lg text-primary">sort</span>
            <span className="font-label-md text-label-md text-on-surface-variant text-xs">Sort by:</span>
            <select className="bg-transparent font-label-md text-label-md font-semibold text-primary focus:outline-none cursor-pointer text-xs">
              <option>Most Active</option>
              <option>Highest Online</option>
              <option>Newest</option>
            </select>
          </div>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-headline-md text-label-md shadow-sm hover:opacity-95 transition-all text-xs lg:text-sm font-bold"
            type="button"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            <span>Start Hub</span>
          </button>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filterCategories.map((cat) => {
          const isSelected = selectedFilter === cat || (cat.startsWith('All') && selectedFilter === 'All');
          return (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat.startsWith('All') ? 'All' : cat)}
              className={`px-4 py-2 rounded-full font-label-md text-label-md transition-all whitespace-nowrap text-xs font-semibold ${
                isSelected
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-medium'
              }`}
              type="button"
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Main Grid: 8 Cols Left + 4 Cols Right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols) */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          {/* Hero Featured Community Card */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col border border-outline-variant/30">
            <div className="p-6 lg:p-8 bg-gradient-to-r from-primary via-primary-container to-surface-tint text-on-primary relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-on-primary/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-on-primary/20 backdrop-blur-md text-on-primary font-label-mono text-label-mono font-medium text-xs">
                      <span className="material-symbols-outlined text-sm">verified</span> Verified Tech Community
                    </span>
                    <span className="px-3 py-1 rounded-full bg-on-primary/20 backdrop-blur-md text-on-primary font-label-mono text-label-mono text-xs">
                      1,840 Members
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-mono text-label-mono font-bold text-xs">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span> 52 Online Now
                    </span>
                  </div>
                  <button
                    className="px-4 py-1.5 rounded-xl bg-on-primary text-primary font-headline-md text-label-md font-bold shadow-sm hover:bg-surface-container-lowest transition-all text-xs"
                    type="button"
                  >
                    Joined
                  </button>
                </div>
                <div className="flex flex-col gap-1.5 pt-2">
                  <h2 className="font-headline-lg text-headline-lg font-bold text-on-primary">
                    Kubernetes &amp; Cloud Native Engineers
                  </h2>
                  <p className="font-body-md text-body-md text-on-primary-container max-w-2xl">
                    Multi-cluster orchestration, eBPF telemetry, and service mesh discussions. Real-time translated technical voice bridge across 14 spoken developer dialects.
                  </p>
                </div>
              </div>
            </div>

            {/* Live Audio Stage Bar */}
            <div className="m-6 p-4 rounded-xl bg-surface-container-low flex flex-col lg:flex-row lg:items-center justify-between gap-4 border border-outline-variant/20">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">graphic_eq</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-label-mono text-label-mono font-bold text-secondary uppercase tracking-wide text-xs">
                      Live Audio Stage
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface truncate">
                    Zero-Trust Security on AWS &amp; EKS Pod Identities
                  </h3>
                  <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm pt-0.5 text-xs">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">record_voice_over</span> 8 speaking
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 font-label-mono text-label-mono text-primary font-semibold">
                      4 Languages Translated (EN, AR, JA, DE)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="flex -space-x-2">
                  <img
                    alt="Speaker"
                    className="w-8 h-8 rounded-full shadow-sm object-cover ring-2 ring-surface-container-lowest"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD82WBFfcfDrT64Vw6B1Y0_CRTLRLR3AtG2Kbdnx2JbTFStPM4q-lvxoAu1BQJTQ7HO59cArKCFLCry60bIZyz5LeyUHJF1SVzwL0Q59qJ8dsLqmX3NlKFjLXAIesaOSqIsbyNMPx0ixC6eq7NWu2C1G6R00SLjjRP2YjkYG2n3WLcLJlVa2s1teUPN-tqnr-9rorWoaU-OKIZq5RjGkJdgbCYOKNj3LjAjTIf9MYxk8xg-d4DrtiEH"
                  />
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-xs font-bold shadow-sm ring-2 ring-surface-container-lowest">
                    KR
                  </div>
                  <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-xs font-bold shadow-sm ring-2 ring-surface-container-lowest">
                    +6
                  </div>
                </div>
                <button
                  onClick={() => setCurrentView('voice-rooms')}
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary font-headline-md text-label-md font-semibold hover:opacity-95 shadow-sm transition-all flex items-center gap-1.5 text-xs"
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">volume_up</span> Join Voice Room
                </button>
              </div>
            </div>

            {/* Community Tabs */}
            <div className="px-6 flex items-center gap-6 overflow-x-auto border-b border-surface-container">
              <button className="pb-3 font-label-md text-label-md font-bold text-primary shadow-[0_2px_0_0_currentColor] whitespace-nowrap text-xs sm:text-sm">
                Community Feed
              </button>
              <button
                onClick={() => setCurrentView('voice-rooms')}
                className="pb-3 font-label-md text-label-md font-medium text-on-surface-variant hover:text-on-surface whitespace-nowrap transition-all text-xs sm:text-sm"
              >
                Voice Rooms (3 active)
              </button>
              <button
                onClick={() => setCurrentView('learn-and-study-groups')}
                className="pb-3 font-label-md text-label-md font-medium text-on-surface-variant hover:text-on-surface whitespace-nowrap transition-all text-xs sm:text-sm"
              >
                Study Groups
              </button>
              <button className="pb-3 font-label-md text-label-md font-medium text-on-surface-variant hover:text-on-surface whitespace-nowrap transition-all text-xs sm:text-sm">
                Members
              </button>
              <button className="pb-3 font-label-md text-label-md font-medium text-on-surface-variant hover:text-on-surface whitespace-nowrap transition-all text-xs sm:text-sm">
                Multilingual Resources
              </button>
            </div>

            {/* Post Feed Item with Translation Toggle & Code */}
            <div className="p-6 flex flex-col gap-4 bg-surface-container-low/40">
              <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm flex flex-col gap-4 border border-outline-variant/30">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-primary font-label-md text-sm">
                      FZ
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-headline-md text-label-md font-bold text-on-surface">Fatima Al-Zahra</span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-mono text-label-mono text-[10px]">
                          DevOps Architect
                        </span>
                      </div>
                      <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">
                        Posted 22m ago · Amman, Jordan
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-container px-3 py-1 rounded-full text-xs">
                    <span className="font-label-mono text-label-mono text-on-surface-variant font-semibold">AR</span>
                    <span className="material-symbols-outlined text-xs text-on-surface-variant">arrow_forward</span>
                    <span className="font-label-mono text-label-mono font-bold text-primary">EN</span>
                    <span className="text-on-surface-variant">· Auto-translated</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {!showOriginalArabic ? (
                    <div className="font-body-md text-body-md text-on-surface leading-relaxed">
                      "We finally solved the Cilium BPF map allocation starvation during high-churn pod deployment spikes. Make sure to tune your kernel limit for map max entries or you'll experience silent connection drops on worker nodes:"
                    </div>
                  ) : (
                    <div className="font-body-md text-body-md text-on-surface leading-relaxed font-arabic" dir="rtl">
                      "لقد قمنا أخيرًا بحل مشكلة نقص تعيين ذاكرة Cilium BPF أثناء الارتفاع الكبير في توزيع الحاويات. تأكد من ضبط الحد الأقصى للمدخلات في نواة النظام لتجنب فقدان الاتصالات:"
                    </div>
                  )}

                  <button
                    onClick={() => setShowOriginalArabic(!showOriginalArabic)}
                    className="self-start font-label-mono text-label-mono text-primary font-semibold hover:underline text-xs"
                    type="button"
                  >
                    {showOriginalArabic ? 'Show translated (English)' : 'Show original (Arabic)'}
                  </button>
                </div>

                {/* YAML Code Box */}
                <div className="bg-surface-container rounded-xl p-4 font-body-code text-body-code text-on-surface overflow-x-auto flex flex-col gap-2 text-xs">
                  <div className="flex items-center justify-between text-on-surface-variant font-label-mono text-label-mono pb-2 border-b border-surface-container-high">
                    <span>cilium-values.yaml</span>
                    <span className="text-primary font-bold">YAML</span>
                  </div>
                  <pre className="text-on-surface font-mono">
                    <code>{`bpf:
  mapDynamicSizeRatio: 0.0075
  ctMapMax: 1048576
  natMapMax: 524288
tunnel: disabled
autoDirectNodeRoutes: true`}</code>
                  </pre>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-1.5 transition-all font-body-sm text-body-sm ${
                        liked ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                      }`}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">thumb_up</span> {likeCount}
                    </button>
                    <button
                      className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-all font-body-sm text-body-sm"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">forum</span> 14 replies
                    </button>
                    <button
                      onClick={() => alert('Link copied to clipboard!')}
                      className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-all font-body-sm text-body-sm"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-lg">share</span> Share
                    </button>
                  </div>
                  <span className="font-label-mono text-label-mono text-on-surface-variant">
                    Neural Acoustic Stream Synced
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Explore Hubs Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-lg text-headline-lg text-on-surface">Explore Hubs</h3>
              <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">
                Displaying 4 active clusters
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COMMUNITY_HUBS.map((hub) => (
                <div
                  key={hub.id}
                  className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition-all border border-outline-variant/30"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-2xl">{hub.icon}</span>
                      </div>
                      {hub.activeRoomsCount > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-mono text-label-mono font-bold text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>{' '}
                          {hub.activeRoomsCount} Rooms Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-mono text-label-mono text-xs">
                          Idle
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="font-headline-md text-headline-md text-on-surface">{hub.title}</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                        {hub.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {hub.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-surface-container font-label-mono text-label-mono text-on-surface-variant text-[11px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="font-label-mono text-label-mono text-on-surface font-semibold text-xs">
                        {hub.membersCount.toLocaleString()} members
                      </span>
                      <span className="font-label-mono text-label-mono text-primary text-xs">
                        {hub.onlineCount} online
                      </span>
                    </div>
                    <button
                      onClick={() => setCurrentView('voice-rooms')}
                      className="px-4 py-2 rounded-xl bg-primary text-on-primary font-headline-md text-label-md font-semibold hover:opacity-95 shadow-sm transition-all text-xs"
                      type="button"
                    >
                      {hub.activeRoomsCount > 0 ? 'Join Voice Pod' : 'View Hub'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Create a Community Card */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col gap-4 border border-outline-variant/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">group_add</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-md text-headline-md text-on-surface">Create a Community</h3>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Launch your language-free tech group</span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Set up real-time simultaneous translation channels, invite contributors, and host global live voice panels.
            </p>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-primary text-on-primary font-headline-md text-label-md font-semibold hover:opacity-95 shadow-sm transition-all text-center"
              type="button"
            >
              New Community Space
            </button>
          </div>

          {/* Language Diversity Telemetry */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col gap-4 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-headline-md text-on-surface">Language Diversity</h3>
              <span className="font-label-mono text-label-mono text-primary font-semibold text-xs">Live Telemetry</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
              Simultaneous translation traffic across active voice sessions:
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between font-label-mono text-label-mono text-xs">
                  <span className="text-on-surface font-medium">English ⟷ Spanish</span>
                  <span className="text-primary font-bold">34%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '34%' }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between font-label-mono text-label-mono text-xs">
                  <span className="text-on-surface font-medium">English ⟷ Japanese</span>
                  <span className="text-secondary font-bold">28%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                  <div className="h-full bg-secondary-container rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between font-label-mono text-label-mono text-xs">
                  <span className="text-on-surface font-medium">Arabic ⟷ English</span>
                  <span className="text-primary font-bold">21%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                  <div className="h-full bg-primary-container rounded-full" style={{ width: '21%' }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between font-label-mono text-label-mono text-xs">
                  <span className="text-on-surface font-medium">German ⟷ Mandarin</span>
                  <span className="text-tertiary font-bold">17%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                  <div className="h-full bg-tertiary-container rounded-full" style={{ width: '17%' }}></div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-surface-container flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-xl shrink-0">speed</span>
              <div className="flex flex-col">
                <span className="font-label-mono text-label-mono font-bold text-on-surface text-xs">
                  Average Latency: 38ms
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                  Zero perceptible conversational gap
                </span>
              </div>
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col gap-4 border border-outline-variant/30">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-xl text-primary">policy</span>
              <h3 className="font-headline-md text-headline-md text-on-surface">Community Guidelines</h3>
            </div>
            <div className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface-variant text-xs leading-relaxed">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-base text-primary shrink-0 mt-0.5">check_circle</span>
                <p>
                  <strong className="text-on-surface font-semibold">Inclusive Dialect Environment:</strong> Speak in your native language with confidence. Let our acoustic bridge handle syntax parity.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-base text-primary shrink-0 mt-0.5">check_circle</span>
                <p>
                  <strong className="text-on-surface font-semibold">Respectful Communication:</strong> Constructive code reviews only. Critique the architecture, not the speaker.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-base text-primary shrink-0 mt-0.5">check_circle</span>
                <p>
                  <strong className="text-on-surface font-semibold">Technical Authenticity:</strong> Anchor discussions around real implementations, benchmarks, and reproducible snippets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Community Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-2xl shadow-xl max-w-lg w-full p-6 flex flex-col gap-5 border border-outline-variant/30">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">hub</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Start a Tech Community</h3>
                  <span className="font-label-mono text-label-mono text-on-surface-variant text-xs">Global polyglot hub</span>
                </div>
              </div>
              <button onClick={() => setCreateModalOpen(false)} className="p-1.5 rounded-lg hover:bg-surface-container">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <label className="font-semibold text-on-surface">Community Name</label>
              <input
                type="text"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                placeholder="e.g. Distributed Database Engine Cohort"
                className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <label className="font-semibold text-on-surface">Primary Mission / Focus</label>
              <textarea
                value={communityTopic}
                onChange={(e) => setCommunityTopic(e.target.value)}
                placeholder="Describe the architectural subjects, weekly papers, or codebases you will dissect together..."
                rows={3}
                className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <label className="font-semibold text-on-surface">Tech Tags</label>
              <input
                type="text"
                value={communityTags}
                onChange={(e) => setCommunityTags(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary font-mono text-xs"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setCreateModalOpen(false)}
                className="px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Community "${communityName || 'Distributed Systems'}" created with simultaneous multilingual translation bridge!`);
                  setCreateModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-md"
              >
                Launch Community
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
