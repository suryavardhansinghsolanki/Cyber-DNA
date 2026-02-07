import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle, Info, CheckCircle, XCircle } from "lucide-react";

const threatBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold font-mono uppercase tracking-wider transition-all duration-300",
  {
    variants: {
      severity: {
        critical:
          "bg-destructive/20 text-destructive border border-destructive/50 shadow-[0_0_10px_hsl(0_85%_55%/0.3)] animate-pulse",
        high:
          "bg-warning/20 text-warning border border-warning/50 shadow-[0_0_10px_hsl(30_100%_55%/0.2)]",
        medium:
          "bg-secondary/20 text-secondary border border-secondary/50",
        low:
          "bg-success/20 text-success border border-success/50",
        info:
          "bg-primary/20 text-primary border border-primary/50",
      },
    },
    defaultVariants: {
      severity: "info",
    },
  }
);

const severityIcons = {
  critical: XCircle,
  high: AlertTriangle,
  medium: AlertCircle,
  low: CheckCircle,
  info: Info,
};

export interface ThreatBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof threatBadgeVariants> {
  showIcon?: boolean;
}

const ThreatBadge = React.forwardRef<HTMLSpanElement, ThreatBadgeProps>(
  ({ className, severity, showIcon = true, children, ...props }, ref) => {
    const Icon = severity ? severityIcons[severity] : severityIcons.info;
    
    return (
      <span
        ref={ref}
        className={cn(threatBadgeVariants({ severity, className }))}
        {...props}
      >
        {showIcon && <Icon className="h-3 w-3" />}
        {children}
      </span>
    );
  }
);
ThreatBadge.displayName = "ThreatBadge";

export { ThreatBadge, threatBadgeVariants };
