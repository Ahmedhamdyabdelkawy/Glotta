export type ViewType = 
  | 'dashboard' 
  | 'communities' 
  | 'voice-rooms' 
  | 'chat-and-messages' 
  | 'learn-and-study-groups' 
  | 'ai-session-summaries' 
  | 'settings';

export interface Participant {
  id: string;
  name: string;
  role: string;
  handle: string;
  avatar: string;
  location: string;
  language: string;
  langCode: string;
  flag: string;
  status: 'speaking' | 'muted' | 'listening' | 'queue';
  latencyMs: number;
  syncInfo?: string;
  queueNumber?: number;
}

export interface VoiceRoom {
  id: string;
  title: string;
  category: string;
  clusterTag: string;
  isLive: boolean;
  recordingDuration: string;
  listenersCount: number;
  edgeLatencyMs: number;
  activeSpeaker: Participant;
  currentTranslation: {
    sourceLang: string;
    targetLang: string;
    sourceText: string;
    targetText: string;
    confidence: number;
    latencyMs: number;
  };
  panelists: Participant[];
  audience: {
    initials: string;
    name: string;
    listeningLang: string;
    flag: string;
    avatarColor?: string;
  }[];
  historyTurns: {
    id: string;
    speaker: string;
    langPair: string;
    timestamp: string;
    latency: string;
    originalText?: string;
    translatedText: string;
  }[];
}

export interface StudyPod {
  id: string;
  tag: string;
  course: string;
  title: string;
  description: string;
  activeDevs: number;
  speakingUser?: string;
  speakingLang?: string;
  langBridges: string[];
  avatars: string[];
  type: 'live' | 'book' | 'clinic';
}

export interface CommunityHub {
  id: string;
  title: string;
  description: string;
  membersCount: number;
  onlineCount: number;
  activeRoomsCount: number;
  tags: string[];
  languages: string[];
  icon: string;
  isVerified?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: Participant;
  timestamp: string;
  sourceLang: string;
  targetLang: string;
  originalText?: string;
  translatedText: string;
  hasAudio?: boolean;
  audioDuration?: string;
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
    lexiconNote?: string;
  };
  reactions: { emoji: string; count: number; active?: boolean }[];
  repliesCount?: number;
}
