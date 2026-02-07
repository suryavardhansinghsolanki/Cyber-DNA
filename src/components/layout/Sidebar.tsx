import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Shield, 
  Dna, 
  ScanFace, 
  Wallet, 
  Ghost, 
  Link2, 
  Brain, 
  Activity,
  Settings,
  Network,
  Users,
  BarChart3,
  Bell,
  HelpCircle,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Activity },
  { id: 'threats', label: 'Threat Center', icon: Shield },
  { id: 'cyber-dna', label: 'Cyber-DNA', icon: Dna },
  { id: 'deepfake', label: 'Deepfake Scanner', icon: ScanFace },
  { id: 'wallet', label: 'Wallet Guard', icon: Wallet },
  { id: 'ghost', label: 'Ghost Protocol', icon: Ghost },
  { id: 'blockchain', label: 'Audit Ledger', icon: Link2 },
  { id: 'ai-intel', label: 'AI Intelligence', icon: Brain },
];

const secondaryItems = [
  { id: 'network', label: 'Network Monitor', icon: Network },
  { id: 'sessions', label: 'Active Sessions', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const bottomItems = [
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help Center', icon: HelpCircle },
];

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border/50 bg-sidebar/95 backdrop-blur-xl">
      {/* Logo Section */}
      <div className="flex h-20 items-center gap-3 border-b border-border/50 px-6">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-full bg-primary/30 blur-lg" />
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
        </div>
        <div>
          <h1 className="font-orbitron text-lg font-bold text-foreground tracking-wider">
            SENTINEL-X
          </h1>
          <p className="text-xs text-primary font-mono">Cyber-DNA Security</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col h-[calc(100vh-5rem)] overflow-y-auto p-4">
        {/* Primary Navigation */}
        <div className="space-y-1">
          <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Security Center
          </p>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/20 text-primary shadow-[0_0_20px_hsl(180_100%_50%/0.2)]"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-primary animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Secondary Navigation */}
        <div className="mt-6 space-y-1">
          <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Monitoring
          </p>
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Navigation */}
        <div className="border-t border-border/50 pt-4 space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-all duration-200">
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
