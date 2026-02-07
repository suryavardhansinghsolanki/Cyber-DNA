import React from 'react';
import { Shield, ExternalLink, Clock } from 'lucide-react';
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from '@/components/ui/cyber-card';
import { ThreatBadge } from '@/components/ui/threat-badge';
import { CyberButton } from '@/components/ui/cyber-button';
import { mockThreats } from '@/data/mockData';
import type { ThreatEvent } from '@/types/sentinel';
import { formatDistanceToNow } from 'date-fns';

const threatTypeIcons: Record<ThreatEvent['type'], string> = {
  phishing: '🎣',
  malware: '🦠',
  deepfake: '🎭',
  wallet_attack: '💰',
  suspicious_login: '🔐',
  data_breach: '💾',
  social_engineering: '🎯',
};

const RecentThreats: React.FC = () => {
  const recentThreats = mockThreats.slice(0, 5);

  return (
    <CyberCard variant="default" className="col-span-full">
      <CyberCardHeader>
        <div className="flex items-center justify-between">
          <CyberCardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Recent Threats
          </CyberCardTitle>
          <CyberButton variant="ghost" size="sm">
            View All
            <ExternalLink className="h-3 w-3" />
          </CyberButton>
        </div>
      </CyberCardHeader>
      <CyberCardContent>
        <div className="space-y-3">
          {recentThreats.map((threat) => (
            <div
              key={threat.id}
              className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/30 transition-all duration-200"
            >
              {/* Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-xl">
                {threatTypeIcons[threat.type]}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium text-foreground">{threat.title}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                      {threat.description}
                    </p>
                  </div>
                  <ThreatBadge severity={threat.severity}>
                    {threat.severity}
                  </ThreatBadge>
                </div>

                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="font-mono truncate max-w-[200px]" title={threat.source}>
                    {threat.source}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(threat.timestamp, { addSuffix: true })}
                  </span>
                  {threat.blocked && (
                    <span className="flex items-center gap-1 text-success">
                      <Shield className="h-3 w-3" />
                      Blocked
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CyberCardContent>
    </CyberCard>
  );
};

export default RecentThreats;
