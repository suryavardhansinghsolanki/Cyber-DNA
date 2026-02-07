import React from 'react';
import { Ghost, Eye, EyeOff, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GhostOverlayProps {
  isActive: boolean;
}

const GhostOverlay: React.FC<GhostOverlayProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <>
      {/* Corner Indicator */}
      <div className="fixed top-20 right-4 z-50 animate-fade-in-up">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/50 shadow-[0_0_30px_hsl(180_100%_50%/0.3)] backdrop-blur-xl">
          <Ghost className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">Ghost Mode Active</span>
          <EyeOff className="h-4 w-4 text-primary" />
        </div>
      </div>

      {/* Subtle border glow effect */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <div className="absolute inset-0 border-2 border-primary/20 rounded-lg m-1 animate-pulse" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    </>
  );
};

export default GhostOverlay;
