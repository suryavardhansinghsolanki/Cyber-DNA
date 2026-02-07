import type {
  ThreatEvent,
  CyberDNAProfile,
  DeepfakeScanResult,
  WalletTransaction,
  BlockchainAuditLog,
  GhostProtocolStatus,
  AIThreatPrediction,
  SecurityScore,
  NetworkActivity,
  UserSession,
} from '@/types/sentinel';

export const mockThreats: ThreatEvent[] = [
  {
    id: 'threat-001',
    type: 'phishing',
    severity: 'critical',
    title: 'Phishing Attack Blocked',
    description: 'Sophisticated phishing attempt mimicking your bank detected and neutralized',
    source: 'secure-bank-login.malicious.com',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    blocked: true,
    details: { targetedService: 'Bank of America', confidence: 0.98 },
  },
  {
    id: 'threat-002',
    type: 'deepfake',
    severity: 'high',
    title: 'Deepfake Video Detected',
    description: 'AI-generated video attempting to impersonate CEO in video call',
    source: 'zoom.meeting.intercepted',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    blocked: true,
    details: { confidenceScore: 0.94, mediaType: 'video' },
  },
  {
    id: 'threat-003',
    type: 'wallet_attack',
    severity: 'critical',
    title: 'Crypto Wallet Attack Prevented',
    description: 'Malicious smart contract attempting to drain wallet funds',
    source: '0x742d35Cc6634C0532925a3b844Bc9e7595f',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    blocked: true,
    details: { potentialLoss: '$45,000', contractAddress: '0x123...' },
  },
  {
    id: 'threat-004',
    type: 'suspicious_login',
    severity: 'medium',
    title: 'Unusual Login Location',
    description: 'Login attempt from unrecognized device in Russia',
    source: '185.234.72.156',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    blocked: true,
    details: { location: 'Moscow, Russia', device: 'Unknown Android' },
  },
  {
    id: 'threat-005',
    type: 'malware',
    severity: 'high',
    title: 'Malware Download Blocked',
    description: 'Trojan disguised as PDF document intercepted',
    source: 'invoice-2024.pdf.exe',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    blocked: true,
    details: { malwareType: 'Trojan.GenericKD', fileHash: 'a1b2c3d4...' },
  },
  {
    id: 'threat-006',
    type: 'social_engineering',
    severity: 'medium',
    title: 'Social Engineering Attempt',
    description: 'Suspicious request for credentials via fake IT support',
    source: 'it-support@company-help.fake',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    blocked: true,
  },
  {
    id: 'threat-007',
    type: 'data_breach',
    severity: 'low',
    title: 'Credentials Found in Breach',
    description: 'Your email found in recent data breach - password change recommended',
    source: 'haveibeenpwned.com',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    blocked: false,
  },
];

export const mockCyberDNA: CyberDNAProfile = {
  id: 'dna-001',
  userId: 'user-12345',
  behaviorScore: 94.7,
  typingPattern: [120, 85, 92, 110, 78, 95, 88, 102, 91, 87],
  mousePattern: [45, 62, 38, 55, 41, 58, 44, 51, 47, 53],
  browsingFingerprint: 'fp_a7b3c9d2e5f1',
  loginTimes: ['08:30', '12:15', '14:45', '18:30', '21:00'],
  deviceFingerprints: ['device_macbook_pro', 'device_iphone_14', 'device_ipad_air'],
  anomalyThreshold: 15,
  lastUpdated: new Date(),
};

export const mockDeepfakeScans: DeepfakeScanResult[] = [
  {
    id: 'scan-001',
    mediaType: 'video',
    mediaUrl: 'https://example.com/video1.mp4',
    confidenceScore: 94.2,
    isDeepfake: true,
    analysisDetails: {
      faceConsistency: 23,
      audioSync: 45,
      artifactDetection: 78,
      temporalConsistency: 34,
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: 'scan-002',
    mediaType: 'image',
    mediaUrl: 'https://example.com/image1.jpg',
    confidenceScore: 12.5,
    isDeepfake: false,
    analysisDetails: {
      faceConsistency: 92,
      audioSync: 100,
      artifactDetection: 8,
      temporalConsistency: 95,
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: 'scan-003',
    mediaType: 'audio',
    mediaUrl: 'https://example.com/audio1.mp3',
    confidenceScore: 67.8,
    isDeepfake: true,
    analysisDetails: {
      faceConsistency: 100,
      audioSync: 34,
      artifactDetection: 56,
      temporalConsistency: 41,
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
];

export const mockWalletTransactions: WalletTransaction[] = [
  {
    id: 'tx-001',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    type: 'incoming',
    amount: 2.5,
    currency: 'ETH',
    riskScore: 5,
    flagged: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    sourceAddress: '0x123...abc',
  },
  {
    id: 'tx-002',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    type: 'outgoing',
    amount: 0.5,
    currency: 'ETH',
    riskScore: 85,
    flagged: true,
    flagReason: 'Destination linked to known scam addresses',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    destinationAddress: '0xdead...beef',
  },
  {
    id: 'tx-003',
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    type: 'incoming',
    amount: 15000,
    currency: 'USDC',
    riskScore: 12,
    flagged: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    sourceAddress: '0x456...def',
  },
];

export const mockAuditLogs: BlockchainAuditLog[] = [
  {
    id: 'log-001',
    transactionHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
    eventType: 'THREAT_BLOCKED',
    eventData: { threatId: 'threat-001', action: 'blocked' },
    blockNumber: 18524632,
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    verified: true,
  },
  {
    id: 'log-002',
    transactionHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab',
    eventType: 'DNA_UPDATED',
    eventData: { behaviorScore: 94.7 },
    blockNumber: 18524631,
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    verified: true,
  },
  {
    id: 'log-003',
    transactionHash: '0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
    eventType: 'GHOST_ACTIVATED',
    eventData: { level: 'paranoid', duration: 3600 },
    blockNumber: 18524630,
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    verified: true,
  },
];

export const mockGhostProtocol: GhostProtocolStatus = {
  active: false,
  level: 'standard',
  protections: {
    trackingBlocked: true,
    fingerprintMasked: true,
    locationHidden: false,
    historyPaused: false,
    cookiesBlocked: true,
    webrtcDisabled: false,
  },
};

export const mockAIPredictions: AIThreatPrediction[] = [
  {
    id: 'pred-001',
    threatType: 'Spear Phishing Campaign',
    probability: 78,
    timeframe: 'Next 48 hours',
    indicators: ['Increased reconnaissance activity', 'Similar attacks on industry peers', 'Known threat actor patterns'],
    recommendation: 'Enable enhanced email filtering and brief team on social engineering',
    confidence: 85,
  },
  {
    id: 'pred-002',
    threatType: 'Credential Stuffing Attack',
    probability: 45,
    timeframe: 'Next 7 days',
    indicators: ['Recent breach exposure', 'Dark web activity spike', 'Bot traffic increase'],
    recommendation: 'Enable MFA on all accounts and monitor for unusual login patterns',
    confidence: 72,
  },
  {
    id: 'pred-003',
    threatType: 'Ransomware Targeting',
    probability: 23,
    timeframe: 'Next 30 days',
    indicators: ['Industry targeting trend', 'Vulnerability exposure'],
    recommendation: 'Ensure backups are current and test recovery procedures',
    confidence: 61,
  },
];

export const mockSecurityScore: SecurityScore = {
  overall: 87,
  categories: {
    browsingSecurity: 92,
    passwordStrength: 78,
    privacyLevel: 85,
    networkSecurity: 91,
    deviceSecurity: 88,
    behaviorConsistency: 94,
  },
  trends: {
    daily: [82, 84, 85, 83, 87, 86, 87],
    weekly: [78, 80, 82, 85, 87],
  },
  lastUpdated: new Date(),
};

export const mockNetworkActivity: NetworkActivity[] = [
  { id: 'net-001', domain: 'google.com', ip: '142.250.185.46', requestCount: 245, dataTransferred: 15.2, riskLevel: 'safe', country: 'US', timestamp: new Date() },
  { id: 'net-002', domain: 'suspicious-tracker.xyz', ip: '185.234.72.156', requestCount: 12, dataTransferred: 0.3, riskLevel: 'dangerous', country: 'RU', timestamp: new Date() },
  { id: 'net-003', domain: 'cdn.jsdelivr.net', ip: '104.16.88.20', requestCount: 89, dataTransferred: 8.7, riskLevel: 'safe', country: 'US', timestamp: new Date() },
  { id: 'net-004', domain: 'analytics.unclear.io', ip: '45.33.32.156', requestCount: 34, dataTransferred: 1.2, riskLevel: 'suspicious', country: 'NL', timestamp: new Date() },
  { id: 'net-005', domain: 'github.com', ip: '140.82.121.4', requestCount: 156, dataTransferred: 22.1, riskLevel: 'safe', country: 'US', timestamp: new Date() },
];

export const mockSessions: UserSession[] = [
  { id: 'sess-001', device: 'MacBook Pro', browser: 'Chrome 120', location: 'San Francisco, CA', ip: '73.158.64.22', startTime: new Date(), lastActivity: new Date(), isCurrentSession: true, riskScore: 5 },
  { id: 'sess-002', device: 'iPhone 14 Pro', browser: 'Safari', location: 'San Francisco, CA', ip: '73.158.64.25', startTime: new Date(Date.now() - 1000 * 60 * 60 * 2), lastActivity: new Date(Date.now() - 1000 * 60 * 30), isCurrentSession: false, riskScore: 8 },
  { id: 'sess-003', device: 'Windows PC', browser: 'Firefox 121', location: 'New York, NY', ip: '98.234.12.55', startTime: new Date(Date.now() - 1000 * 60 * 60 * 24), lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 20), isCurrentSession: false, riskScore: 15 },
];
