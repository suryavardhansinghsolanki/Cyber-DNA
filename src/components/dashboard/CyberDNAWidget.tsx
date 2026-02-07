import React, { useEffect, useState } from 'react';
import { Dna, Fingerprint, Activity } from 'lucide-react';
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from '@/components/ui/cyber-card';
import { mockCyberDNA } from '@/data/mockData';

const CyberDNAWidget: React.FC = () => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const dna = mockCyberDNA;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(dna.behaviorScore);
    }, 500);
    return () => clearTimeout(timer);
  }, [dna.behaviorScore]);

  // DNA Helix visualization
  const helixPoints = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 4;
    const y = (i / 20) * 100;
    const x1 = 50 + Math.sin(angle) * 30;
    const x2 = 50 - Math.sin(angle) * 30;
    return { y, x1, x2, opacity: 0.3 + (i / 20) * 0.7 };
  });

  return (
    <CyberCard variant="holographic" className="col-span-full lg:col-span-1">
      <CyberCardHeader>
        <CyberCardTitle className="flex items-center gap-2">
          <Dna className="h-5 w-5 text-primary animate-pulse" />
          Cyber-DNA Profile
        </CyberCardTitle>
      </CyberCardHeader>
      <CyberCardContent>
        <div className="flex items-center gap-6">
          {/* DNA Helix Visualization */}
          <div className="relative w-24 h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {helixPoints.map((point, i) => (
                <g key={i}>
                  <circle
                    cx={point.x1}
                    cy={point.y}
                    r="3"
                    className="fill-primary"
                    style={{ opacity: point.opacity }}
                  />
                  <circle
                    cx={point.x2}
                    cy={point.y}
                    r="3"
                    className="fill-secondary"
                    style={{ opacity: point.opacity }}
                  />
                  <line
                    x1={point.x1}
                    y1={point.y}
                    x2={point.x2}
                    y2={point.y}
                    className="stroke-muted"
                    strokeWidth="1"
                    style={{ opacity: point.opacity * 0.5 }}
                  />
                </g>
              ))}
            </svg>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card pointer-events-none" />
          </div>

          {/* Stats */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Behavior Match
                </span>
                <span className="font-orbitron text-lg font-bold text-success">
                  {animatedScore.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-success transition-all duration-1000 ease-out"
                  style={{ width: `${animatedScore}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Fingerprint className="h-3 w-3 text-primary" />
                <span className="text-muted-foreground">Fingerprint</span>
              </div>
              <span className="font-mono text-foreground truncate">
                {dna.browsingFingerprint}
              </span>

              <div className="flex items-center gap-2">
                <Activity className="h-3 w-3 text-secondary" />
                <span className="text-muted-foreground">Devices</span>
              </div>
              <span className="font-mono text-foreground">
                {dna.deviceFingerprints.length} trusted
              </span>
            </div>
          </div>
        </div>

        {/* Activity Pattern */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-2">Typing Pattern Signature</p>
          <div className="flex items-end gap-1 h-8">
            {dna.typingPattern.map((value, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-primary/50 to-primary rounded-t transition-all duration-300"
                style={{ height: `${(value / 140) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </CyberCardContent>
    </CyberCard>
  );
};

export default CyberDNAWidget;
