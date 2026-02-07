import React from 'react';
import { Shield, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from '@/components/ui/cyber-card';
import { StatDisplay } from '@/components/ui/stat-display';
import { mockThreats } from '@/data/mockData';

const ThreatOverview: React.FC = () => {
  const criticalCount = mockThreats.filter(t => t.severity === 'critical').length;
  const highCount = mockThreats.filter(t => t.severity === 'high').length;
  const blockedCount = mockThreats.filter(t => t.blocked).length;
  const totalCount = mockThreats.length;

  return (
    <CyberCard variant="glow" className="col-span-full lg:col-span-2">
      <CyberCardHeader>
        <div className="flex items-center justify-between">
          <CyberCardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Threat Overview
          </CyberCardTitle>
          <span className="text-xs text-muted-foreground font-mono">
            Last 24 hours
          </span>
        </div>
      </CyberCardHeader>
      <CyberCardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatDisplay
            label="Total Threats"
            value={totalCount}
            icon={<AlertTriangle className="h-3 w-3" />}
            variant="warning"
            trend="down"
            trendValue="12% vs last week"
          />
          <StatDisplay
            label="Critical"
            value={criticalCount}
            icon={<XCircle className="h-3 w-3" />}
            variant="danger"
            trend="down"
            trendValue="25% vs last week"
          />
          <StatDisplay
            label="High Priority"
            value={highCount}
            icon={<AlertTriangle className="h-3 w-3" />}
            variant="warning"
          />
          <StatDisplay
            label="Blocked"
            value={blockedCount}
            suffix={`/ ${totalCount}`}
            icon={<CheckCircle className="h-3 w-3" />}
            variant="success"
            trend="up"
            trendValue="100% block rate"
          />
        </div>

        {/* Threat Bar Visualization */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Threat Types Distribution</span>
            <span>Today</span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden flex">
            <div 
              className="bg-destructive transition-all duration-500" 
              style={{ width: `${(criticalCount / totalCount) * 100}%` }}
            />
            <div 
              className="bg-warning transition-all duration-500" 
              style={{ width: `${(highCount / totalCount) * 100}%` }}
            />
            <div 
              className="bg-secondary transition-all duration-500" 
              style={{ width: `${((totalCount - criticalCount - highCount) / totalCount) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-destructive" />
              <span className="text-muted-foreground">Critical</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-warning" />
              <span className="text-muted-foreground">High</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-secondary" />
              <span className="text-muted-foreground">Medium/Low</span>
            </div>
          </div>
        </div>
      </CyberCardContent>
    </CyberCard>
  );
};

export default ThreatOverview;
