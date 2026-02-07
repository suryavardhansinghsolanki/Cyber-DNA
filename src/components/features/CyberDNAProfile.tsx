import React, { useState, useEffect } from 'react';
import { Dna, Fingerprint, Activity, Clock, Smartphone, Shield, RefreshCw, TrendingUp, MousePointer, Keyboard } from 'lucide-react';
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from '@/components/ui/cyber-card';
import { CyberButton } from '@/components/ui/cyber-button';
import { ProgressRing } from '@/components/ui/progress-ring';
import { mockCyberDNA } from '@/data/mockData';
import { cn } from '@/lib/utils';

const CyberDNAProfile: React.FC = () => {
  const dna = mockCyberDNA;
  const [isLearning, setIsLearning] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    behaviorScore: 0,
    typing: [] as number[],
    mouse: [] as number[],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues({
        behaviorScore: dna.behaviorScore,
        typing: dna.typingPattern,
        mouse: dna.mousePattern,
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [dna]);

  const startLearning = () => {
    setIsLearning(true);
    setTimeout(() => setIsLearning(false), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <CyberCard variant="holographic" className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* DNA Background Pattern */}
          <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
            {Array.from({ length: 50 }).map((_, i) => {
              const x = (i / 50) * 200;
              const y1 = 50 + Math.sin((i / 50) * Math.PI * 8) * 30;
              const y2 = 50 - Math.sin((i / 50) * Math.PI * 8) * 30;
              return (
                <g key={i}>
                  <circle cx={x} cy={y1} r="2" className="fill-primary" />
                  <circle cx={x} cy={y2} r="2" className="fill-secondary" />
                  <line x1={x} y1={y1} x2={x} y2={y2} className="stroke-muted" strokeWidth="0.5" />
                </g>
              );
            })}
          </svg>
        </div>

        <CyberCardContent className="relative">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* DNA Visualization */}
            <div className="relative">
              <ProgressRing
                value={animatedValues.behaviorScore}
                size={180}
                strokeWidth={12}
                variant="success"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Dna className="h-10 w-10 text-primary mb-1" />
                <span className="font-orbitron text-2xl font-bold">{animatedValues.behaviorScore.toFixed(1)}%</span>
                <span className="text-xs text-muted-foreground">Match Score</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-orbitron text-3xl font-bold mb-2">
                Your Cyber-DNA Profile
              </h2>
              <p className="text-muted-foreground mb-4 max-w-lg">
                Your unique digital fingerprint based on your behavioral patterns, typing rhythm, 
                mouse movements, and browsing habits. This profile helps detect imposters and 
                protects your identity.
              </p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <CyberButton 
                  variant="neon" 
                  onClick={startLearning}
                  disabled={isLearning}
                >
                  {isLearning ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Learning...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4" />
                      Update Profile
                    </>
                  )}
                </CyberButton>
                <CyberButton variant="outline">
                  <Shield className="h-4 w-4" />
                  View Anomalies
                </CyberButton>
              </div>
            </div>
          </div>
        </CyberCardContent>
      </CyberCard>

      {/* Biometric Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Typing Pattern */}
        <CyberCard variant="glow">
          <CyberCardHeader>
            <CyberCardTitle className="flex items-center gap-2">
              <Keyboard className="h-5 w-5 text-primary" />
              Typing Pattern Analysis
            </CyberCardTitle>
          </CyberCardHeader>
          <CyberCardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Your unique keystroke dynamics - timing between key presses that creates 
                an unforgeable signature.
              </p>
              
              {/* Waveform Visualization */}
              <div className="relative h-32 bg-muted/50 rounded-lg p-4">
                <div className="flex items-end justify-between h-full gap-1">
                  {animatedValues.typing.map((value, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-primary/50 to-primary rounded-t transition-all duration-700 ease-out"
                      style={{ 
                        height: `${(value / 140) * 100}%`,
                        transitionDelay: `${i * 50}ms`
                      }}
                    />
                  ))}
                </div>
                <div className="absolute bottom-2 left-4 right-4 flex justify-between text-xs text-muted-foreground">
                  <span>Key 1</span>
                  <span>Key 10</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-orbitron text-xl font-bold text-primary">92ms</p>
                  <p className="text-xs text-muted-foreground">Avg. Interval</p>
                </div>
                <div>
                  <p className="font-orbitron text-xl font-bold text-primary">±15ms</p>
                  <p className="text-xs text-muted-foreground">Deviation</p>
                </div>
                <div>
                  <p className="font-orbitron text-xl font-bold text-success">98%</p>
                  <p className="text-xs text-muted-foreground">Consistency</p>
                </div>
              </div>
            </div>
          </CyberCardContent>
        </CyberCard>

        {/* Mouse Pattern */}
        <CyberCard variant="glow">
          <CyberCardHeader>
            <CyberCardTitle className="flex items-center gap-2">
              <MousePointer className="h-5 w-5 text-secondary" />
              Mouse Movement Pattern
            </CyberCardTitle>
          </CyberCardHeader>
          <CyberCardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Your distinctive mouse movement patterns - speed, curves, and click timing.
              </p>
              
              {/* Movement Visualization */}
              <div className="relative h-32 bg-muted/50 rounded-lg overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 100 50">
                  <path
                    d={`M 0 25 ${animatedValues.mouse.map((v, i) => 
                      `Q ${i * 12 + 5} ${25 - (v - 50) / 2}, ${i * 12 + 10} ${25 + (v - 50) / 3}`
                    ).join(' ')}`}
                    fill="none"
                    className="stroke-secondary"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {animatedValues.mouse.map((v, i) => (
                    <circle
                      key={i}
                      cx={i * 12 + 10}
                      cy={25 + (v - 50) / 3}
                      r="3"
                      className="fill-secondary"
                      style={{ opacity: 0.5 + (i / animatedValues.mouse.length) * 0.5 }}
                    />
                  ))}
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-orbitron text-xl font-bold text-secondary">1.8°</p>
                  <p className="text-xs text-muted-foreground">Avg. Curve</p>
                </div>
                <div>
                  <p className="font-orbitron text-xl font-bold text-secondary">420px/s</p>
                  <p className="text-xs text-muted-foreground">Avg. Speed</p>
                </div>
                <div>
                  <p className="font-orbitron text-xl font-bold text-success">95%</p>
                  <p className="text-xs text-muted-foreground">Match Rate</p>
                </div>
              </div>
            </div>
          </CyberCardContent>
        </CyberCard>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Fingerprint */}
        <CyberCard>
          <CyberCardContent className="text-center py-6">
            <Fingerprint className="h-10 w-10 text-primary mx-auto mb-3" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Browser Fingerprint</p>
            <code className="font-mono text-sm text-foreground">{dna.browsingFingerprint}</code>
          </CyberCardContent>
        </CyberCard>

        {/* Trusted Devices */}
        <CyberCard>
          <CyberCardContent className="text-center py-6">
            <Smartphone className="h-10 w-10 text-secondary mx-auto mb-3" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Trusted Devices</p>
            <p className="font-orbitron text-2xl font-bold">{dna.deviceFingerprints.length}</p>
            <div className="flex justify-center gap-1 mt-2">
              {dna.deviceFingerprints.map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-success" />
              ))}
            </div>
          </CyberCardContent>
        </CyberCard>

        {/* Login Times */}
        <CyberCard>
          <CyberCardContent className="text-center py-6">
            <Clock className="h-10 w-10 text-accent mx-auto mb-3" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Usual Login Times</p>
            <div className="flex flex-wrap justify-center gap-1 mt-2">
              {dna.loginTimes.slice(0, 3).map((time, i) => (
                <span key={i} className="px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-mono">
                  {time}
                </span>
              ))}
            </div>
          </CyberCardContent>
        </CyberCard>
      </div>

      {/* Anomaly Detection Settings */}
      <CyberCard>
        <CyberCardHeader>
          <CyberCardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-warning" />
            Anomaly Detection Settings
          </CyberCardTitle>
        </CyberCardHeader>
        <CyberCardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Anomaly Threshold</span>
                <span className="font-mono text-sm text-primary">{dna.anomalyThreshold}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                defaultValue={dna.anomalyThreshold}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>More Strict</span>
                <span>More Lenient</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Typing Anomaly', enabled: true },
                { label: 'Mouse Anomaly', enabled: true },
                { label: 'Location Anomaly', enabled: true },
                { label: 'Time Anomaly', enabled: false },
              ].map((setting) => (
                <div
                  key={setting.label}
                  className={cn(
                    "p-3 rounded-lg border text-center cursor-pointer transition-all",
                    setting.enabled
                      ? "border-success/50 bg-success/10"
                      : "border-border/50 bg-muted/50"
                  )}
                >
                  <p className="text-xs font-medium">{setting.label}</p>
                  <p className={cn(
                    "text-xs mt-1",
                    setting.enabled ? "text-success" : "text-muted-foreground"
                  )}>
                    {setting.enabled ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CyberCardContent>
      </CyberCard>
    </div>
  );
};

export default CyberDNAProfile;
