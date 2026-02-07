import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import GhostOverlay from '@/components/GhostOverlay';

// Dashboard Components
import ThreatOverview from '@/components/dashboard/ThreatOverview';
import SecurityScore from '@/components/dashboard/SecurityScore';
import RecentThreats from '@/components/dashboard/RecentThreats';
import CyberDNAWidget from '@/components/dashboard/CyberDNAWidget';
import AIInsights from '@/components/dashboard/AIInsights';
import NetworkActivity from '@/components/dashboard/NetworkActivity';
import QuickActions from '@/components/dashboard/QuickActions';

// Feature Components
import ThreatCenter from '@/components/features/ThreatCenter';
import CyberDNAProfile from '@/components/features/CyberDNAProfile';
import DeepfakeScanner from '@/components/features/DeepfakeScanner';
import WalletGuard from '@/components/features/WalletGuard';
import GhostProtocol from '@/components/features/GhostProtocol';
import BlockchainAudit from '@/components/features/BlockchainAudit';
import AIIntelligence from '@/components/features/AIIntelligence';
import SessionsMonitor from '@/components/features/SessionsMonitor';

const Index: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [ghostActive, setGhostActive] = useState(false);

  const toggleGhost = () => {
    setGhostActive(!ghostActive);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <QuickActions onActivateGhost={toggleGhost} ghostActive={ghostActive} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ThreatOverview />
              <SecurityScore />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <AIInsights />
              <NetworkActivity />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentThreats />
              <CyberDNAWidget />
            </div>
          </div>
        );
      case 'threats':
        return <ThreatCenter />;
      case 'cyber-dna':
        return <CyberDNAProfile />;
      case 'deepfake':
        return <DeepfakeScanner />;
      case 'wallet':
        return <WalletGuard />;
      case 'ghost':
        return <GhostProtocol isActive={ghostActive} onToggle={toggleGhost} />;
      case 'blockchain':
        return <BlockchainAudit />;
      case 'ai-intel':
        return <AIIntelligence />;
      case 'sessions':
        return <SessionsMonitor />;
      case 'network':
        return (
          <div className="grid grid-cols-1 gap-6">
            <NetworkActivity />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="font-orbitron text-2xl font-bold mb-2">
                {currentView.charAt(0).toUpperCase() + currentView.slice(1).replace('-', ' ')}
              </h2>
              <p className="text-muted-foreground">This section is coming soon...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Ghost Mode Overlay */}
      <GhostOverlay isActive={ghostActive} />
      
      {/* Sidebar */}
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      {/* Main Content */}
      <div className="pl-64">
        <Header currentView={currentView} />
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
