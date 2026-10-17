import { Participant, VoiceRoom, StudyPod, CommunityHub, ChatMessage } from '../types';

export const CURRENT_USER: Participant = {
  id: 'user-elena',
  name: 'Elena Rostova',
  role: 'Platform Engineer',
  handle: '@elena_dev',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD82WBFfcfDrT64Vw6B1Y0_CRTLRLR3AtG2Kbdnx2JbTFStPM4q-lvxoAu1BQJTQ7HO59cArKCFLCry60bIZyz5LeyUHJF1SVzwL0Q59qJ8dsLqmX3NlKFjLXAIesaOSqIsbyNMPx0ixC6eq7NWu2C1G6R00SLjjRP2YjkYG2n3WLcLJlVa2s1teUPN-tqnr-9rorWoaU-OKIZq5RjGkJdgbCYOKNj3LjAjTIf9MYxk8xg-d4DrtiEH',
  location: 'Berlin, DE',
  language: 'English / German / Russian',
  langCode: 'EN',
  flag: '🇩🇪',
  status: 'listening',
  latencyMs: 28,
};

export const MOCK_PARTICIPANTS: Record<string, Participant> = {
  ahmed: {
    id: 'p-ahmed',
    name: 'Ahmed Hassan',
    role: 'Core Maintainer',
    handle: '@ahmed_k8s',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDysnHVPz9oxfbMff_jyw7csq5NSSFSLnLIlc521m8_Hx5yz7_tbEzBAsGp6Gk946p2OLzhmJz9vdGPx_QTAjYmwERpPn5zRBA-Cib2BFue3KxH_zOY1Xmajp6MNa7HuH47vbURf12k9qPOIbEwdElfjEq1DgocF3Qcyhx6uZpUA7oXwhPcnbXdTJLk56yM9O7x4tguPfyFxytJeFlIYrqPNn_26anhiVdIkhNm2aSoNp_u07r_JgOb',
    location: 'Cairo, EG',
    language: 'Arabic (Cairo Dialect)',
    langCode: 'AR',
    flag: '🇪🇬',
    status: 'speaking',
    latencyMs: 28,
    syncInfo: 'Acoustic Bridge: 28ms'
  },
  maria: {
    id: 'p-maria',
    name: 'Maria Santos',
    role: 'Host · Senior Platform Engineer',
    handle: '@maria_santos',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC78CllCxwYcNQ5Wx6lAZ4AGzOpq_eBccsQFZn2KVaBC5TlAbnaw7QmXDrQWxhzpAdOgaHnTecj-3tLQZ1nFxnlJqtu5qxWE337pz_OLn8QQ5aU3uQqNQev5u_EE683LUDPtSxy2Xm5PqfBUZfQEJB-vt3kcZXJGrqfxHr1XxcEmQVpVug_fR70wvM9fAjSZP8IGYk3nuFV8OIfjCIkP3b2ZCO3SPye6pyEdfQe7dGTQkC7JxbuRQab',
    location: 'Seattle, US',
    language: 'English',
    langCode: 'EN',
    flag: '🇺🇸',
    status: 'muted',
    latencyMs: 12,
    syncInfo: 'Sync: 12ms'
  },
  pierre: {
    id: 'p-pierre',
    name: 'Pierre Dubois',
    role: 'Core Reviewer · Systems DevOps',
    handle: '@pierre_dubois',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyRZqi-3WLAg4TzJJNDjoCycEdPmg7RCZA0e301m0APysdeienEsCYgBDq4WxorlQK8yDOf6r7zdEFr693qE4-Xi4PqzxH1hQ3dPNFynZTtJPCQ-Z8Qm6sK2w1_YnJh769cGKrr_dKNpn0TR8FXMT_iyrMoYl8pG6L53To-Zt_iU8Ehe0YMdAh8QF8G8_nmcjsgqKvsY1-wpKysmNVnII-1jNV2awfnRl-Sv3Ozw1OrvxnXhJo364K',
    location: 'Lyon, FR',
    language: 'French',
    langCode: 'FR',
    flag: '🇫🇷',
    status: 'speaking',
    latencyMs: 34,
    syncInfo: 'Speaking...'
  },
  ivan: {
    id: 'p-ivan',
    name: 'Ivan Becker',
    role: 'Backend Architect',
    handle: '@ivan_becker',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1t-_FN4HzJSpzfn27Hjv6sk0rV4wTcJwjFaQzaIK92bo4qsWgzH_qE_CtZHQXljf5XSDGJzECX26zBeDZb5LyO8aq9h8vL2Qbnqc5Iu-iiistjeFxzVAzk1tW8_x9FNs5Wh7kN97-64I1u5M7PDv9YtELc3ikjLftOnuE60-Q3UFzOgSPCmopOpbG-sRDxoy_7TcKxeRdAZZbrGU4ov4lmWsnloSf9BV6IBxEnVKp_BM412QCOG3q',
    location: 'Berlin, DE',
    language: 'German',
    langCode: 'DE',
    flag: '🇩🇪',
    status: 'muted',
    latencyMs: 24,
    syncInfo: 'Muted'
  },
  fatima: {
    id: 'p-fatima',
    name: 'Fatima Zahra',
    role: 'Distributed Database Researcher',
    handle: '@fatima_db',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_2mxMUDlfqUCXHsK2yyRaILTkbpBCkjZFM6ZUaTWbOu2oyF3z_lccf_XAcVGMsFTbooRSIcH-0et4WVl9ZyS2I3zLxUaJ5d-9D6I_wxwNJSmQ39pWfapnBgHHe5IvEMm0ClQc7LgQqqaBqgrInq32yqr4UKyzc80B9tMkT9mcr8LZfZtxgQai0k3LQQxzgUUm-zcFiy9HSzvPd5nEcRYKeCaCIMlvc2izlYNA_zXUNQiIQ5XR44SA',
    location: 'Rabat, MA',
    language: 'Arabic',
    langCode: 'AR',
    flag: '🇲🇦',
    status: 'queue',
    latencyMs: 36,
    queueNumber: 1,
    syncInfo: 'Hand #1'
  },
  lukas: {
    id: 'p-lukas',
    name: 'Lukas Meyer',
    role: 'Maintainer · Systems Specialist',
    handle: '@lukas_m',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbGs2X7F31SCJWvY9_1w46DhinUJwU6NEPDolkGxWvQ2VtsCK8t0mCbJ81LcSOMye_rjPox_m_C5px0teji8KzvPpKm6dn-VuGhgGJJaxQOzyhSIIbPxsY50Yys1hcQfENwiFJ7DwSmraY9cJs17NMQFS3hAe8JdwlTRsvF9aEyFDoRq498yhG9mOgx1JoGXAsJHYpdBQhd7gkdk6Ou338nx_phzhhW3WfWU06NVXLhtxn_YCL8hU4',
    location: 'Munich, DE',
    language: 'German',
    langCode: 'DE',
    flag: '🇩🇪',
    status: 'muted',
    latencyMs: 29,
    syncInfo: 'DE → EN Bridge'
  }
};

export const DEFAULT_VOICE_ROOM: VoiceRoom = {
  id: 'k8s-deep-dive',
  title: 'Kubernetes & Distributed Microservices Deep-Dive',
  category: 'DevOps & Infra',
  clusterTag: 'k8s-prod',
  isLive: true,
  recordingDuration: '42:19',
  listenersCount: 34,
  edgeLatencyMs: 28,
  activeSpeaker: MOCK_PARTICIPANTS.ahmed,
  currentTranslation: {
    sourceLang: 'Arabic (AR 🇪🇬)',
    targetLang: 'English (US 🇺🇸)',
    sourceText: 'نحن نقوم بفصل الـ stateful sets باستخدام custom Kubernetes operators لضمان تحديثات متدرجة بدون أي انقطاع في الخدمة عبر مجموعات العناقيد متعددة المناطق الجغرافية، مع الحفاظ على تزامن قواعد البيانات الموزعة.',
    targetText: 'We are decoupling the stateful sets using custom Kubernetes operators to ensure zero-downtime rolling deployments across multi-region clusters.',
    confidence: 99.4,
    latencyMs: 31
  },
  panelists: [
    MOCK_PARTICIPANTS.maria,
    MOCK_PARTICIPANTS.pierre,
    MOCK_PARTICIPANTS.ivan,
    MOCK_PARTICIPANTS.fatima
  ],
  audience: [
    { initials: 'KL', name: 'Kenji Lindqvist', listeningLang: 'Japanese', flag: '🇯🇵', avatarColor: 'bg-primary-container text-on-primary' },
    { initials: 'SN', name: 'Sonia Ndiaye', listeningLang: 'French', flag: '🇸🇳', avatarColor: 'bg-surface-container-highest text-on-surface' },
    { initials: 'TL', name: 'Tomasz Lewandowski', listeningLang: 'Polish', flag: '🇵🇱', avatarColor: 'bg-secondary-container text-on-secondary-container' },
    { initials: 'AR', name: 'Amina Rahal', listeningLang: 'Arabic', flag: '🇩🇿', avatarColor: 'bg-surface-container text-primary' },
    { initials: 'MK', name: 'Marcus Keller', listeningLang: 'German', flag: '🇩🇪', avatarColor: 'bg-tertiary-container text-on-tertiary-container' },
    { initials: 'SL', name: 'Soo-Min Lee', listeningLang: 'Korean', flag: '🇰🇷', avatarColor: 'bg-primary-fixed text-on-primary-fixed' }
  ],
  historyTurns: [
    {
      id: 'turn-1',
      speaker: 'Pierre Dubois',
      langPair: 'FR ➔ EN',
      timestamp: '14:28:02',
      latency: '34ms latency',
      originalText: 'Pourriez-vous préciser le comportement de la latence d\'élection Raft d\'etcd lors d\'une dégradation du lien inter-régional ?',
      translatedText: 'Could you elaborate on how etcd raft election latency behaves during inter-region link degradation?'
    },
    {
      id: 'turn-2',
      speaker: 'Maria Santos',
      langPair: 'EN (Native)',
      timestamp: '14:27:14',
      latency: 'Direct Broadcast',
      translatedText: 'We saw that Ahmed was testing quorum partitions with Istio circuit breakers yesterday. Ahmed, can you walk us through the benchmark?'
    }
  ]
};

export const STUDY_PODS: StudyPod[] = [
  {
    id: 'pod-mit-6824',
    tag: 'STUDY POD #04 · LIVE ON AIR',
    course: 'MIT 6.824 Spring Lab 2B',
    title: 'MIT 6.824 Distributed Systems (Raft in Go)',
    description: 'Debugging leader election heartbeats and uncommitted log compaction edge cases across split brains.',
    activeDevs: 8,
    speakingUser: 'Kareem (AR)',
    speakingLang: 'Arabic',
    langBridges: ['AR', 'DE', 'EN'],
    avatars: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC7CoaPirO3BCSvTFB-sVvAd5j8p-tHS6lOz-U3ynDk5Guc_9t1-dVa5I6LwSeh5nuhllynf0QBmMpbBjDAAOdpOn2Y3mInuI4SMBGT_039XtMRRhRUhoGyYov9ig20aXH7K5GR6z_LMw3_rklYR2r4xiHQdxjwXFFDKkmZNj1mUEqriuso4J-x4LKMoaKylVVEXaO8g2FyxXjBN5qh1zwobYsG3LpcaRjpihKLNPQu2wATUtqp_any',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBes-fj6TdEavf2HT1risbOLAuvDHzEq_-Nt73WNemwL7pJ1PJ0hPSCAVyUG1dhb5cl6q-pT1wQ4TgvJTuPlFHu-acODMVMO5xfVLni7JJUIaGSYmex7vSByFE3iCkP_LQI12KYpmDNzQ_EPGFzB69vh7e1CFtlymoD5goIIel0MWlQXz_oHTqEH6Vuk8LPNgF0zk5ovtzyarwtA3xXFInawiP-BNpjLLJta_Jr_eKrM991C-6eq_x3',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC79gVYmConW3eTW26-w8vjiKhDI-L5dWijasLdDhCvLGu2D_CQmBwfc_a2zLU_dje4VNCZ0eSF-ahuVt2rnvPh1fX_WvK2VUeomPEPdFT2RpMR1vap9aAMX_zyDFFl-jaMh3ApWK4Fhkrp_upClvfcAYRjbb-OmE-zcbIN3_fCKLL8gVEWB8fWf2MoxWOt93pEBz2GlSbiR6i5aFlmRoiQjwcAwdZMei7TZQ09NBeRGZA4veRVVply'
    ],
    type: 'live'
  },
  {
    id: 'pod-ddia',
    tag: 'BOOK SPRINT · CH 7',
    course: "O'Reilly Designing Data-Intensive Applications",
    title: 'DDIA Cohort: Transactions & Serializability (SSI vs 2PL)',
    description: 'Collaborative whiteboard comparison of snapshot isolation anomalies with real-time synchronized notes in Japanese & English.',
    activeDevs: 12,
    langBridges: ['JA', 'EN'],
    avatars: [],
    type: 'book'
  },
  {
    id: 'pod-rust-audio',
    tag: 'CODE CLINIC',
    course: 'Audio DSP Pipeline',
    title: 'Zero-Allocation Rust for Real-Time Audio Streaming',
    description: 'Fixing cache line bouncing and atomic ringbuffer contention in lock-free ringbuffers.',
    activeDevs: 6,
    langBridges: ['ES', 'PT', 'EN'],
    avatars: [],
    type: 'clinic'
  }
];

export const COMMUNITY_HUBS: CommunityHub[] = [
  {
    id: 'comm-k8s',
    title: 'Kubernetes & Cloud Native Engineers',
    description: 'Multi-cluster orchestration, eBPF telemetry, and service mesh discussions. Real-time translated technical voice bridge across 14 spoken developer dialects.',
    membersCount: 1840,
    onlineCount: 52,
    activeRoomsCount: 3,
    tags: ['DevOps', 'Infra', 'eBPF', 'Cilium'],
    languages: ['EN', 'AR', 'JA', 'DE', 'ES'],
    icon: 'cloud_sync',
    isVerified: true
  },
  {
    id: 'comm-ai-ml',
    title: 'AI Agents & LLM Infrastructure',
    description: 'Autonomous agent architectures, vLLM serving, vector databases, and semantic routing pipelines.',
    membersCount: 1240,
    onlineCount: 64,
    activeRoomsCount: 3,
    tags: ['Python', 'PyTorch', 'LangChain'],
    languages: ['EN', 'FR', 'JA', 'ZH'],
    icon: 'neurology'
  },
  {
    id: 'comm-rust',
    title: 'Rust Systems & Performance Engineering',
    description: 'Zero-cost abstractions, unsafe memory models, async Tokio runtime internals, and embedded firmware.',
    membersCount: 950,
    onlineCount: 38,
    activeRoomsCount: 1,
    tags: ['Rust', 'Embedded', 'WASM'],
    languages: ['EN', 'DE', 'SE', 'RU'],
    icon: 'memory'
  },
  {
    id: 'comm-web',
    title: 'Full-Stack Web & Next.js Global Hub',
    description: 'Server actions, edge rendering architectures, distributed caching, and micro-frontend design patterns.',
    membersCount: 3400,
    onlineCount: 120,
    activeRoomsCount: 4,
    tags: ['Next.js', 'TypeScript', 'GraphQL'],
    languages: ['EN', 'DE', 'PT', 'HI'],
    icon: 'devices'
  },
  {
    id: 'comm-mobile',
    title: 'Mobile Engineering (Flutter & Swift)',
    description: 'Cross-platform state management, Swift Concurrency, Kotlin Multiplatform, and mobile machine learning inference.',
    membersCount: 820,
    onlineCount: 25,
    activeRoomsCount: 0,
    tags: ['Flutter', 'Swift', 'KMP'],
    languages: ['EN', 'ES', 'FR', 'JA'],
    icon: 'smartphone'
  }
];

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: MOCK_PARTICIPANTS.ahmed,
    timestamp: '10:42 AM',
    sourceLang: 'AR (EG)',
    targetLang: 'EN (US)',
    originalText: 'هل قمنا بقياس الفارق الزمني لنبضات القلب (heartbeat interval) في etcd عند نشر العقد عبر مناطق جغرافية مختلفة؟ التذبذب في زمن الاستجابة قد يؤدي لانتخابات غير ضرورية للقائد.',
    translatedText: 'Did we benchmark the etcd heartbeat interval when deploying cross-region nodes? The latency jitter might trigger unnecessary leader elections.',
    hasAudio: true,
    audioDuration: '0:24',
    reactions: [
      { emoji: '⚡', count: 4, active: true },
      { emoji: '👍', count: 7, active: false }
    ],
    repliesCount: 3
  },
  {
    id: 'msg-2',
    sender: MOCK_PARTICIPANTS.lukas,
    timestamp: '10:44 AM',
    sourceLang: 'DE',
    targetLang: 'EN',
    originalText: 'Genau Ahmed, hier ist die Logik zur Kompaktierung von Snapshots. Wenn der Snapshot zu groß ist, wird der Heartbeat-Stream blockiert:',
    translatedText: 'Exactly Ahmed, here is the logic for snapshot compaction. If the snapshot is too large, the heartbeat stream gets blocked:',
    codeSnippet: {
      filename: 'raft_heartbeat.go',
      language: 'Go 1.22',
      code: `func (r *Raft) handleHeartbeat(ctx context.Context, req *HeartbeatReq) {
    // Verhindere Pufferüberläufe während der Snapshot-Kompaktierung
    if r.isCompacting.Load() {
        r.logger.Warn("compaction in progress: adjusting election timer +150ms")
        r.resetElectionTimeout(r.electionTimeout + 150*time.Millisecond)
        return
    }
    r.appendEntriesCh <- req
}`,
      lexiconNote: '"Verhindere Pufferüberläufe..." → "Prevent buffer overflows during snapshot compaction: if compacting, dynamic election timer extended by 150ms."'
    },
    reactions: [
      { emoji: '💡', count: 12, active: true },
      { emoji: '🔥', count: 4, active: false }
    ]
  },
  {
    id: 'msg-3',
    sender: MOCK_PARTICIPANTS.maria,
    timestamp: '10:46 AM',
    sourceLang: 'EN (US)',
    targetLang: 'EN (US)',
    translatedText: 'Thanks Lukas and Ahmed. That validates our multi-region Frankfurt ↔ Cairo latency tolerance metrics. Here is the topology for quorum replication:',
    reactions: [
      { emoji: '👍', count: 6, active: false },
      { emoji: '💡', count: 12, active: false },
      { emoji: '🔥', count: 4, active: true }
    ]
  }
];
