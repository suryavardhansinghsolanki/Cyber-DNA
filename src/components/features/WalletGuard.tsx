import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, AlertTriangle, Shield, CheckCircle, Link2, Copy, ExternalLink } from 'lucide-react';
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from '@/components/ui/cyber-card';
import { CyberButton } from '@/components/ui/cyber-button';
import { ThreatBadge } from '@/components/ui/threat-badge';
import { cn } from '@/lib/utils';
import { mockWalletTransactions } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';

const WalletGuard: React.FC = () => {
  const [selectedWallet] = useState('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
  const transactions = mockWalletTransactions;
  
  const totalValue = 15234.56;
  const riskScore = 12;
  const blockedTransactions = 3;

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getRiskColor = (score: number) => {
    if (score <= 20) return 'text-success';
    if (score <= 50) return 'text-warning';
    return 'text-destructive';
  };

  const getRiskLevel = (score: number) => {
    if (score <= 20) return 'Low Risk';
    if (score <= 50) return 'Medium Risk';
    return 'High Risk';
  };

  return (
    <div className="space-y-6">
      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CyberCard variant="glow">
          <CyberCardContent className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/20">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Value</p>
              <p className="font-orbitron text-2xl font-bold">${totalValue.toLocaleString()}</p>
            </div>
          </CyberCardContent>
        </CyberCard>

        <CyberCard variant={riskScore <= 20 ? 'success' : riskScore <= 50 ? 'warning' : 'danger'}>
          <CyberCardContent className="flex items-center gap-4">
            <div className={cn(
              "p-3 rounded-xl",
              riskScore <= 20 ? "bg-success/20" : riskScore <= 50 ? "bg-warning/20" : "bg-destructive/20"
            )}>
              <Shield className={cn(
                "h-6 w-6",
                getRiskColor(riskScore)
              )} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Risk Score</p>
              <p className={cn("font-orbitron text-2xl font-bold", getRiskColor(riskScore))}>
                {riskScore}/100
              </p>
              <p className={cn("text-xs", getRiskColor(riskScore))}>{getRiskLevel(riskScore)}</p>
            </div>
          </CyberCardContent>
        </CyberCard>

        <CyberCard>
          <CyberCardContent className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-destructive/20">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Threats Blocked</p>
              <p className="font-orbitron text-2xl font-bold text-destructive">{blockedTransactions}</p>
              <p className="text-xs text-muted-foreground">This month</p>
            </div>
          </CyberCardContent>
        </CyberCard>
      </div>

      {/* Connected Wallet */}
      <CyberCard>
        <CyberCardHeader>
          <CyberCardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            Connected Wallet
          </CyberCardTitle>
        </CyberCardHeader>
        <CyberCardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Wallet className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-mono text-sm">{shortenAddress(selectedWallet)}</p>
                <p className="text-xs text-muted-foreground">Ethereum Mainnet</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CyberButton variant="ghost" size="icon">
                <Copy className="h-4 w-4" />
              </CyberButton>
              <CyberButton variant="ghost" size="icon">
                <ExternalLink className="h-4 w-4" />
              </CyberButton>
              <CyberButton variant="outline" size="sm">
                Change Wallet
              </CyberButton>
            </div>
          </div>

          {/* Protection Status */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {[
              { label: 'Contract Scanner', active: true },
              { label: 'Phishing Protection', active: true },
              { label: 'Approval Monitor', active: true },
              { label: 'Drain Protection', active: true },
            ].map((item) => (
              <div
                key={item.label}
                className={cn(
                  "p-3 rounded-lg border text-center",
                  item.active 
                    ? "bg-success/10 border-success/30" 
                    : "bg-muted border-border/50"
                )}
              >
                <CheckCircle className={cn(
                  "h-4 w-4 mx-auto mb-1",
                  item.active ? "text-success" : "text-muted-foreground"
                )} />
                <p className="text-xs font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </CyberCardContent>
      </CyberCard>

      {/* Transaction History */}
      <CyberCard>
        <CyberCardHeader>
          <div className="flex items-center justify-between">
            <CyberCardTitle>Recent Transactions</CyberCardTitle>
            <CyberButton variant="ghost" size="sm">
              View All
              <ExternalLink className="h-3 w-3" />
            </CyberButton>
          </div>
        </CyberCardHeader>
        <CyberCardContent>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-lg border transition-all",
                  tx.flagged 
                    ? "bg-destructive/10 border-destructive/30" 
                    : "bg-muted/50 border-border/50 hover:border-primary/30"
                )}
              >
                {/* Direction Icon */}
                <div className={cn(
                  "p-2 rounded-lg",
                  tx.type === 'incoming' ? "bg-success/20" : "bg-primary/20"
                )}>
                  {tx.type === 'incoming' ? (
                    <ArrowDownLeft className="h-5 w-5 text-success" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5 text-primary" />
                  )}
                </div>

                {/* Transaction Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {tx.type === 'incoming' ? 'Received' : 'Sent'}
                    </span>
                    <span className="font-orbitron font-bold">
                      {tx.amount} {tx.currency}
                    </span>
                    {tx.flagged && (
                      <ThreatBadge severity="critical">Blocked</ThreatBadge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="font-mono">
                      {tx.type === 'incoming' 
                        ? `From: ${shortenAddress(tx.sourceAddress || '')}` 
                        : `To: ${shortenAddress(tx.destinationAddress || '')}`}
                    </span>
                    <span>•</span>
                    <span>{formatDistanceToNow(tx.timestamp, { addSuffix: true })}</span>
                  </div>
                  {tx.flagReason && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {tx.flagReason}
                    </p>
                  )}
                </div>

                {/* Risk Score */}
                <div className="text-right">
                  <div className={cn(
                    "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                    tx.riskScore <= 20 
                      ? "bg-success/20 text-success" 
                      : tx.riskScore <= 50 
                      ? "bg-warning/20 text-warning" 
                      : "bg-destructive/20 text-destructive"
                  )}>
                    <Shield className="h-3 w-3" />
                    Risk: {tx.riskScore}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CyberCardContent>
      </CyberCard>
    </div>
  );
};

export default WalletGuard;
