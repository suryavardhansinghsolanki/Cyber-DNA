import React, { useState, useEffect } from 'react';
import { Bell, Search, User, ChevronDown, Shield, Zap, AlertTriangle } from 'lucide-react';
import { CyberButton } from '@/components/ui/cyber-button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  currentView: string;
}

const viewTitles: Record<string, string> = {
  dashboard: 'Security Dashboard',
  threats: 'Threat Center',
  'cyber-dna': 'Cyber-DNA Profile',
  deepfake: 'Deepfake Scanner',
  wallet: 'Wallet Guard',
  ghost: 'Ghost Protocol',
  blockchain: 'Blockchain Audit Ledger',
  'ai-intel': 'AI Threat Intelligence',
  network: 'Network Monitor',
  sessions: 'Active Sessions',
  analytics: 'Security Analytics',
  notifications: 'Notifications',
  settings: 'Settings',
  help: 'Help Center',
};

const Header: React.FC<HeaderProps> = ({ currentView }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [threatCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Section - Title */}
        <div className="flex items-center gap-4">
          <h2 className="font-orbitron text-xl font-semibold text-foreground tracking-wide">
            {viewTitles[currentView] || 'Dashboard'}
          </h2>
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <Shield className="h-3 w-3 text-success" />
            <span>System Active</span>
            <span className="text-border">|</span>
            <Zap className="h-3 w-3 text-primary" />
            <span>AI Online</span>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search threats, logs, settings..."
              className="w-full h-9 rounded-lg border border-border/50 bg-muted/50 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Time Display */}
          <div className="hidden xl:flex flex-col items-end">
            <span className="font-mono text-sm text-primary tracking-wider">
              {formatTime(currentTime)}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDate(currentTime)}
            </span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell className="h-5 w-5 text-muted-foreground" />
            {threatCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground animate-pulse">
                {threatCount}
              </span>
            )}
          </button>

          {/* Alert Status */}
          <div className={cn(
            "hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
            threatCount > 0 
              ? "bg-warning/20 text-warning border border-warning/50" 
              : "bg-success/20 text-success border border-success/50"
          )}>
            {threatCount > 0 ? (
              <>
                <AlertTriangle className="h-3 w-3" />
                <span>{threatCount} Active Threats</span>
              </>
            ) : (
              <>
                <Shield className="h-3 w-3" />
                <span>All Clear</span>
              </>
            )}
          </div>

          {/* User Menu */}
          <button className="flex items-center gap-2 rounded-lg border border-border/50 bg-muted/50 px-3 py-1.5 hover:bg-muted transition-colors">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="hidden sm:block text-sm font-medium">Admin</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
