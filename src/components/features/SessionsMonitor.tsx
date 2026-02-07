import React from 'react';
import { Users, Monitor, Smartphone, MapPin, Clock, Shield, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from '@/components/ui/cyber-card';
import { CyberButton } from '@/components/ui/cyber-button';
import { mockSessions } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

const SessionsMonitor: React.FC = () => {
  const sessions = mockSessions;

  const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes('phone') || device.toLowerCase().includes('iphone')) {
      return Smartphone;
    }
    return Monitor;
  };

  const getRiskColor = (score: number) => {
    if (score <= 10) return 'text-success';
    if (score <= 30) return 'text-warning';
    return 'text-destructive';
  };

  const getRiskBg = (score: number) => {
    if (score <= 10) return 'bg-success/10 border-success/30';
    if (score <= 30) return 'bg-warning/10 border-warning/30';
    return 'bg-destructive/10 border-destructive/30';
  };

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CyberCard variant="glow">
          <CyberCardContent className="text-center py-6">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="font-orbitron text-3xl font-bold">{sessions.length}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Active Sessions</p>
          </CyberCardContent>
        </CyberCard>

        <CyberCard variant="success">
          <CyberCardContent className="text-center py-6">
            <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="font-orbitron text-3xl font-bold text-success">
              {sessions.filter(s => s.riskScore <= 10).length}
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Verified Safe</p>
          </CyberCardContent>
        </CyberCard>

        <CyberCard variant="warning">
          <CyberCardContent className="text-center py-6">
            <AlertTriangle className="h-8 w-8 text-warning mx-auto mb-2" />
            <p className="font-orbitron text-3xl font-bold text-warning">
              {sessions.filter(s => s.riskScore > 10).length}
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Needs Review</p>
          </CyberCardContent>
        </CyberCard>
      </div>

      {/* Sessions List */}
      <CyberCard>
        <CyberCardHeader>
          <div className="flex items-center justify-between">
            <CyberCardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              All Sessions
            </CyberCardTitle>
            <CyberButton variant="destructive" size="sm">
              <XCircle className="h-4 w-4" />
              End All Other Sessions
            </CyberButton>
          </div>
        </CyberCardHeader>
        <CyberCardContent>
          <div className="space-y-4">
            {sessions.map((session) => {
              const DeviceIcon = getDeviceIcon(session.device);
              
              return (
                <div
                  key={session.id}
                  className={cn(
                    "p-4 rounded-lg border transition-all",
                    session.isCurrentSession 
                      ? "bg-primary/10 border-primary/30 ring-1 ring-primary/20" 
                      : getRiskBg(session.riskScore)
                  )}
                >
                  <div className="flex items-start gap-4">
                    {/* Device Icon */}
                    <div className={cn(
                      "p-3 rounded-xl",
                      session.isCurrentSession ? "bg-primary/20" : "bg-muted"
                    )}>
                      <DeviceIcon className={cn(
                        "h-6 w-6",
                        session.isCurrentSession ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>

                    {/* Session Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{session.device}</h4>
                        {session.isCurrentSession && (
                          <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                            Current Session
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground mb-2">
                        {session.browser}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {session.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Active {formatDistanceToNow(session.lastActivity, { addSuffix: true })}
                        </span>
                        <span className="font-mono">{session.ip}</span>
                      </div>
                    </div>

                    {/* Risk & Actions */}
                    <div className="flex flex-col items-end gap-2">
                      <div className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                        session.riskScore <= 10 
                          ? "bg-success/20 text-success"
                          : session.riskScore <= 30
                          ? "bg-warning/20 text-warning"
                          : "bg-destructive/20 text-destructive"
                      )}>
                        <Shield className="h-3 w-3" />
                        Risk: {session.riskScore}
                      </div>

                      {!session.isCurrentSession && (
                        <CyberButton variant="ghost" size="sm">
                          <XCircle className="h-4 w-4" />
                          End Session
                        </CyberButton>
                      )}
                    </div>
                  </div>

                  {/* Risk Details for Non-Current Sessions */}
                  {!session.isCurrentSession && session.riskScore > 10 && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-xs text-warning flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        This session has elevated risk due to unusual location or device
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CyberCardContent>
      </CyberCard>

      {/* Security Tips */}
      <CyberCard>
        <CyberCardHeader>
          <CyberCardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-success" />
            Session Security Tips
          </CyberCardTitle>
        </CyberCardHeader>
        <CyberCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Review and end sessions you don\'t recognize',
              'Enable two-factor authentication for added security',
              'Use unique passwords for each service',
              'Regularly check for suspicious login attempts',
            ].map((tip, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-success shrink-0" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </CyberCardContent>
      </CyberCard>
    </div>
  );
};

export default SessionsMonitor;
