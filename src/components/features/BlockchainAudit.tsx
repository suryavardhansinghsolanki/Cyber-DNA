import React from 'react';
import { Link2, CheckCircle, ExternalLink, Copy, Hash, Clock, FileText } from 'lucide-react';
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from '@/components/ui/cyber-card';
import { CyberButton } from '@/components/ui/cyber-button';
import { mockAuditLogs } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

const eventTypeColors: Record<string, string> = {
  THREAT_BLOCKED: 'text-destructive bg-destructive/20 border-destructive/30',
  DNA_UPDATED: 'text-primary bg-primary/20 border-primary/30',
  GHOST_ACTIVATED: 'text-secondary bg-secondary/20 border-secondary/30',
  WALLET_PROTECTED: 'text-warning bg-warning/20 border-warning/30',
  SCAN_COMPLETED: 'text-success bg-success/20 border-success/30',
};

const BlockchainAudit: React.FC = () => {
  const logs = mockAuditLogs;

  const shortenHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CyberCard variant="glow">
          <CyberCardContent className="text-center py-6">
            <Link2 className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="font-orbitron text-3xl font-bold">{logs.length}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Logs</p>
          </CyberCardContent>
        </CyberCard>

        <CyberCard>
          <CyberCardContent className="text-center py-6">
            <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="font-orbitron text-3xl font-bold text-success">
              {logs.filter(l => l.verified).length}
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Verified</p>
          </CyberCardContent>
        </CyberCard>

        <CyberCard>
          <CyberCardContent className="text-center py-6">
            <Hash className="h-8 w-8 text-accent mx-auto mb-2" />
            <p className="font-orbitron text-3xl font-bold">
              {logs[0]?.blockNumber.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Latest Block</p>
          </CyberCardContent>
        </CyberCard>

        <CyberCard>
          <CyberCardContent className="text-center py-6">
            <Clock className="h-8 w-8 text-secondary mx-auto mb-2" />
            <p className="font-orbitron text-lg font-bold">
              {formatDistanceToNow(logs[0]?.timestamp || new Date(), { addSuffix: true })}
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Last Update</p>
          </CyberCardContent>
        </CyberCard>
      </div>

      {/* Info Banner */}
      <CyberCard variant="holographic">
        <CyberCardContent className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/20">
            <Link2 className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-orbitron font-semibold">Immutable Security Ledger</h3>
            <p className="text-sm text-muted-foreground">
              All security events are permanently recorded on the blockchain, providing an 
              tamper-proof audit trail that cannot be modified or deleted.
            </p>
          </div>
          <CyberButton variant="outline">
            <ExternalLink className="h-4 w-4" />
            View on Explorer
          </CyberButton>
        </CyberCardContent>
      </CyberCard>

      {/* Audit Log Timeline */}
      <CyberCard>
        <CyberCardHeader>
          <div className="flex items-center justify-between">
            <CyberCardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Audit Log Timeline
            </CyberCardTitle>
            <CyberButton variant="ghost" size="sm">
              Export Logs
            </CyberButton>
          </div>
        </CyberCardHeader>
        <CyberCardContent>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

            {/* Log Entries */}
            <div className="space-y-6">
              {logs.map((log, index) => (
                <div key={log.id} className="relative pl-10">
                  {/* Timeline Dot */}
                  <div className={cn(
                    "absolute left-2 top-2 w-4 h-4 rounded-full border-2 border-background",
                    log.verified ? "bg-success" : "bg-muted"
                  )} />

                  <div className="p-4 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/30 transition-all">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "px-2 py-1 rounded-md text-xs font-mono font-medium border",
                          eventTypeColors[log.eventType] || 'text-foreground bg-muted border-border'
                        )}>
                          {log.eventType}
                        </span>
                        {log.verified && (
                          <span className="flex items-center gap-1 text-xs text-success">
                            <CheckCircle className="h-3 w-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(log.timestamp, { addSuffix: true })}
                      </span>
                    </div>

                    {/* Transaction Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                        <div className="flex items-center gap-2">
                          <code className="font-mono text-xs bg-background px-2 py-1 rounded">
                            {shortenHash(log.transactionHash)}
                          </code>
                          <button
                            onClick={() => copyToClipboard(log.transactionHash)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                          <a href="#" className="text-primary hover:text-primary/80">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Block Number</p>
                        <code className="font-mono text-xs">#{log.blockNumber.toLocaleString()}</code>
                      </div>
                    </div>

                    {/* Event Data */}
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-xs text-muted-foreground mb-2">Event Data</p>
                      <pre className="bg-background rounded-lg p-3 text-xs font-mono overflow-x-auto">
                        {JSON.stringify(log.eventData, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="mt-6 text-center">
            <CyberButton variant="outline">
              Load More Logs
            </CyberButton>
          </div>
        </CyberCardContent>
      </CyberCard>
    </div>
  );
};

export default BlockchainAudit;
