import React from 'react';
import { Ghost, ScanFace, Wallet, Shield, Lock, Zap, RefreshCw, FileSearch } from 'lucide-react';
import { CyberCard, CyberCardHeader, CyberCardTitle, CyberCardContent } from '@/components/ui/cyber-card';
import { CyberButton } from '@/components/ui/cyber-button';

interface QuickActionsProps {
  onActivateGhost: () => void;
  ghostActive: boolean;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActivateGhost, ghostActive }) => {
  const actions = [
    {
      icon: Ghost,
      label: ghostActive ? 'Deactivate Ghost' : 'Activate Ghost Protocol',
      variant: ghostActive ? 'destructive' : 'ghost_protocol',
      onClick: onActivateGhost,
    },
    {
      icon: ScanFace,
      label: 'Scan for Deepfakes',
      variant: 'secondary',
      onClick: () => {},
    },
    {
      icon: Wallet,
      label: 'Check Wallet Security',
      variant: 'warning',
      onClick: () => {},
    },
    {
      icon: Shield,
      label: 'Full Security Scan',
      variant: 'neon',
      onClick: () => {},
    },
    {
      icon: Lock,
      label: 'Lock All Sessions',
      variant: 'outline',
      onClick: () => {},
    },
    {
      icon: RefreshCw,
      label: 'Sync Cyber-DNA',
      variant: 'outline',
      onClick: () => {},
    },
  ] as const;

  return (
    <CyberCard variant="default" className="col-span-full">
      <CyberCardHeader>
        <CyberCardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Quick Actions
        </CyberCardTitle>
      </CyberCardHeader>
      <CyberCardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {actions.map((action, i) => {
            const Icon = action.icon;
            return (
              <CyberButton
                key={i}
                variant={action.variant as any}
                className="flex-col h-auto py-4 gap-2"
                onClick={action.onClick}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs text-center leading-tight">{action.label}</span>
              </CyberButton>
            );
          })}
        </div>
      </CyberCardContent>
    </CyberCard>
  );
};

export default QuickActions;
