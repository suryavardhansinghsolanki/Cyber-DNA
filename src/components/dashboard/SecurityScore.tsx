import React from 'react';
import { ProgressRing } from '@/components/ui/progress-ring';
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from '@/components/ui/cyber-card';
import { mockSecurityScore } from '@/data/mockData';
import { TrendingUp, ShieldCheck } from 'lucide-react';

const SecurityScore: React.FC = () => {
  const score = mockSecurityScore;
  
  const getScoreVariant = (value: number): 'success' | 'warning' | 'danger' | 'primary' => {
    if (value >= 80) return 'success';
    if (value >= 60) return 'warning';
    if (value >= 40) return 'primary';
    return 'danger';
  };

  const categories = [
    { key: 'browsingSecurity', label: 'Browsing' },
    { key: 'passwordStrength', label: 'Passwords' },
    { key: 'privacyLevel', label: 'Privacy' },
    { key: 'networkSecurity', label: 'Network' },
    { key: 'deviceSecurity', label: 'Device' },
    { key: 'behaviorConsistency', label: 'Behavior' },
  ] as const;

  return (
    <CyberCard variant="glow" className="col-span-full lg:col-span-1">
      <CyberCardHeader>
        <CyberCardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Security Score
        </CyberCardTitle>
      </CyberCardHeader>
      <CyberCardContent>
        <div className="flex flex-col items-center">
          <ProgressRing
            value={score.overall}
            size={160}
            strokeWidth={12}
            variant={getScoreVariant(score.overall)}
            label="Overall"
          />
          
          <div className="mt-4 flex items-center gap-2 text-sm text-success">
            <TrendingUp className="h-4 w-4" />
            <span>+5 points this week</span>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {categories.map(({ key, label }) => {
            const value = score.categories[key];
            return (
              <div key={key} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{label}</span>
                  <span className={`font-mono font-medium ${
                    value >= 80 ? 'text-success' : value >= 60 ? 'text-warning' : 'text-destructive'
                  }`}>
                    {value}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      value >= 80 ? 'bg-success' : value >= 60 ? 'bg-warning' : 'bg-destructive'
                    }`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CyberCardContent>
    </CyberCard>
  );
};

export default SecurityScore;
