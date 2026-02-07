// Sentinel-X Type Definitions

export interface ThreatEvent {
  id: string;
  type: 'phishing' | 'malware' | 'deepfake' | 'wallet_attack' | 'suspicious_login' | 'data_breach' | 'social_engineering';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  source: string;
  timestamp: Date;
  blocked: boolean;
  details?: Record<string, unknown>;
}

export interface CyberDNAProfile {
  id: string;
  userId: string;
  behaviorScore: number;
  typingPattern: number[];
  mousePattern: number[];
  browsingFingerprint: string;
  loginTimes: string[];
  deviceFingerprints: string[];
  anomalyThreshold: number;
  lastUpdated: Date;
}

export interface DeepfakeScanResult {
  id: string;
  mediaType: 'image' | 'video' | 'audio';
  mediaUrl: string;
  confidenceScore: number;
  isDeepfake: boolean;
  analysisDetails: {
    faceConsistency: number;
    audioSync: number;
    artifactDetection: number;
    temporalConsistency: number;
  };
  timestamp: Date;
}

export interface WalletTransaction {
  id: string;
  walletAddress: string;
  type: 'incoming' | 'outgoing';
  amount: number;
  currency: string;
  riskScore: number;
  flagged: boolean;
  flagReason?: string;
  timestamp: Date;
  destinationAddress?: string;
  sourceAddress?: string;
}

export interface BlockchainAuditLog {
  id: string;
  transactionHash: string;
  eventType: string;
  eventData: Record<string, unknown>;
  blockNumber: number;
  timestamp: Date;
  verified: boolean;
}

export interface GhostProtocolStatus {
  active: boolean;
  activatedAt?: Date;
  duration?: number;
  level: 'standard' | 'paranoid' | 'complete';
  protections: {
    trackingBlocked: boolean;
    fingerprintMasked: boolean;
    locationHidden: boolean;
    historyPaused: boolean;
    cookiesBlocked: boolean;
    webrtcDisabled: boolean;
  };
}

export interface AIThreatPrediction {
  id: string;
  threatType: string;
  probability: number;
  timeframe: string;
  indicators: string[];
  recommendation: string;
  confidence: number;
}

export interface SecurityScore {
  overall: number;
  categories: {
    browsingSecurity: number;
    passwordStrength: number;
    privacyLevel: number;
    networkSecurity: number;
    deviceSecurity: number;
    behaviorConsistency: number;
  };
  trends: {
    daily: number[];
    weekly: number[];
  };
  lastUpdated: Date;
}

export interface NetworkActivity {
  id: string;
  domain: string;
  ip: string;
  requestCount: number;
  dataTransferred: number;
  riskLevel: 'safe' | 'suspicious' | 'dangerous';
  country: string;
  timestamp: Date;
}

export interface UserSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  startTime: Date;
  lastActivity: Date;
  isCurrentSession: boolean;
  riskScore: number;
}
