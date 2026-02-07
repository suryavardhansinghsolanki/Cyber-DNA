import React from 'react';
import { Network, Globe, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from '@/components/ui/cyber-card';
import { mockNetworkActivity } from '@/data/mockData';
import { cn } from '@/lib/utils';

const NetworkActivity: React.FC = () => {
  const activities = mockNetworkActivity;

  const riskIcons = {
    safe: CheckCircle,
    suspicious: AlertCircle,
    dangerous: XCircle,
  };

  const riskColors = {
    safe: 'text-success',
    suspicious: 'text-warning',
    dangerous: 'text-destructive',
  };

  const riskBg = {
    safe: 'bg-success/10 border-success/30',
    suspicious: 'bg-warning/10 border-warning/30',
    dangerous: 'bg-destructive/10 border-destructive/30',
  };

  return (
    <CyberCard variant="default" className="col-span-full lg:col-span-1">
      <CyberCardHeader>
        <CyberCardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5 text-primary" />
          Network Activity
        </CyberCardTitle>
      </CyberCardHeader>
      <CyberCardContent>
        <div className="space-y-2">
          {activities.map((activity) => {
            const RiskIcon = riskIcons[activity.riskLevel];
            
            return (
              <div
                key={activity.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border transition-all",
                  riskBg[activity.riskLevel]
                )}
              >
                <RiskIcon className={cn("h-4 w-4", riskColors[activity.riskLevel])} />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">{activity.domain}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {activity.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                    <span>{activity.requestCount} requests</span>
                    <span>{activity.dataTransferred.toFixed(1)} MB</span>
                  </div>
                </div>

                <span className={cn(
                  "text-xs font-medium uppercase",
                  riskColors[activity.riskLevel]
                )}>
                  {activity.riskLevel}
                </span>
              </div>
            );
          })}
        </div>

        {/* Live indicator */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span>Monitoring Active</span>
        </div>
      </CyberCardContent>
    </CyberCard>
  );
};

export default NetworkActivity;
