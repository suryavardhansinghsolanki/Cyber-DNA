import React, { useState, useEffect } from 'react';
import { Ghost, Shield, Eye, EyeOff, MapPin, Cookie, History, Radio, Lock, Unlock } from 'lucide-react';
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from '@/components/ui/cyber-card';
import { CyberButton } from '@/components/ui/cyber-button';
import { cn } from '@/lib/utils';
import { mockGhostProtocol } from '@/data/mockData';
import type { GhostProtocolStatus } from '@/types/sentinel';

interface GhostProtocolProps {
  isActive: boolean;
  onToggle: () => void;
}

const protectionItems = [
  { key: 'trackingBlocked', label: 'Tracking Blocked', icon: Eye, description: 'Block all third-party trackers' },
  { key: 'fingerprintMasked', label: 'Fingerprint Masked', icon: Shield, description: 'Randomize browser fingerprint' },
  { key: 'locationHidden', label: 'Location Hidden', icon: MapPin, description: 'Mask your real location' },
  { key: 'historyPaused', label: 'History Paused', icon: History, description: 'Stop recording browsing history' },
  { key: 'cookiesBlocked', label: 'Cookies Blocked', icon: Cookie, description: 'Block third-party cookies' },
  { key: 'webrtcDisabled', label: 'WebRTC Disabled', icon: Radio, description: 'Prevent IP leaks via WebRTC' },
] as const;

const GhostProtocol: React.FC<GhostProtocolProps> = ({ isActive, onToggle }) => {
  const [protections, setProtections] = useState(mockGhostProtocol.protections);
  const [level, setLevel] = useState<'standard' | 'paranoid' | 'complete'>('standard');
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (isActive && countdown === null) {
      setCountdown(3600); // 1 hour default
    } else if (!isActive) {
      setCountdown(null);
    }
  }, [isActive]);

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const toggleProtection = (key: keyof typeof protections) => {
    setProtections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const setProtectionLevel = (newLevel: typeof level) => {
    setLevel(newLevel);
    if (newLevel === 'standard') {
      setProtections({
        trackingBlocked: true,
        fingerprintMasked: true,
        locationHidden: false,
        historyPaused: false,
        cookiesBlocked: true,
        webrtcDisabled: false,
      });
    } else if (newLevel === 'paranoid') {
      setProtections({
        trackingBlocked: true,
        fingerprintMasked: true,
        locationHidden: true,
        historyPaused: true,
        cookiesBlocked: true,
        webrtcDisabled: false,
      });
    } else {
      setProtections({
        trackingBlocked: true,
        fingerprintMasked: true,
        locationHidden: true,
        historyPaused: true,
        cookiesBlocked: true,
        webrtcDisabled: true,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Control Card */}
      <CyberCard variant={isActive ? 'glow' : 'default'} className="relative overflow-hidden">
        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 animate-pulse" />
        )}
        
        <CyberCardContent className="relative">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Ghost Icon */}
            <div className="relative">
              <div className={cn(
                "w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500",
                isActive 
                  ? "bg-primary/20 shadow-[0_0_60px_hsl(180_100%_50%/0.4)]" 
                  : "bg-muted"
              )}>
                <Ghost className={cn(
                  "h-16 w-16 transition-all duration-500",
                  isActive ? "text-primary animate-pulse" : "text-muted-foreground"
                )} />
              </div>
              {isActive && (
                <>
                  <div className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
                  <div className="absolute inset-0 rounded-full animate-pulse bg-primary/10" />
                </>
              )}
            </div>

            {/* Status & Controls */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-orbitron text-3xl font-bold mb-2">
                Ghost Protocol
              </h2>
              <p className="text-muted-foreground mb-4">
                {isActive 
                  ? "You are currently invisible. All tracking is blocked and your identity is masked."
                  : "Activate Ghost Protocol to become invisible online and protect your identity."}
              </p>

              {isActive && countdown !== null && (
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Time Remaining
                  </p>
                  <p className="font-mono text-2xl text-primary">
                    {formatTime(countdown)}
                  </p>
                </div>
              )}

              <CyberButton
                variant={isActive ? 'destructive' : 'neon'}
                size="lg"
                onClick={onToggle}
              >
                {isActive ? (
                  <>
                    <EyeOff className="h-5 w-5" />
                    Deactivate Ghost Mode
                  </>
                ) : (
                  <>
                    <Ghost className="h-5 w-5" />
                    Activate Ghost Mode
                  </>
                )}
              </CyberButton>
            </div>
          </div>
        </CyberCardContent>
      </CyberCard>

      {/* Protection Level */}
      <CyberCard>
        <CyberCardHeader>
          <CyberCardTitle>Protection Level</CyberCardTitle>
        </CyberCardHeader>
        <CyberCardContent>
          <div className="grid grid-cols-3 gap-3">
            {(['standard', 'paranoid', 'complete'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setProtectionLevel(lvl)}
                className={cn(
                  "p-4 rounded-lg border transition-all duration-200 text-center",
                  level === lvl
                    ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(180_100%_50%/0.2)]"
                    : "border-border/50 hover:border-primary/30"
                )}
              >
                <h3 className="font-orbitron font-semibold capitalize mb-1">{lvl}</h3>
                <p className="text-xs text-muted-foreground">
                  {lvl === 'standard' && 'Basic protection'}
                  {lvl === 'paranoid' && 'Enhanced privacy'}
                  {lvl === 'complete' && 'Maximum stealth'}
                </p>
              </button>
            ))}
          </div>
        </CyberCardContent>
      </CyberCard>

      {/* Individual Protections */}
      <CyberCard>
        <CyberCardHeader>
          <CyberCardTitle>Protection Controls</CyberCardTitle>
        </CyberCardHeader>
        <CyberCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {protectionItems.map((item) => {
              const Icon = item.icon;
              const isEnabled = protections[item.key];
              
              return (
                <button
                  key={item.key}
                  onClick={() => toggleProtection(item.key)}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-lg border transition-all duration-200 text-left",
                    isEnabled
                      ? "border-success/50 bg-success/10"
                      : "border-border/50 hover:border-muted"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg",
                    isEnabled ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{item.label}</h4>
                      {isEnabled ? (
                        <Lock className="h-3 w-3 text-success" />
                      ) : (
                        <Unlock className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </CyberCardContent>
      </CyberCard>
    </div>
  );
};

export default GhostProtocol;
