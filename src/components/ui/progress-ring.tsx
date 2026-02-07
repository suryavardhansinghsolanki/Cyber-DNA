import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressRingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  size?: number;
  strokeWidth?: number;
  variant?: "default" | "success" | "warning" | "danger" | "primary";
  showValue?: boolean;
  label?: string;
}

const variantColors = {
  default: "stroke-foreground",
  primary: "stroke-primary",
  success: "stroke-success",
  warning: "stroke-warning",
  danger: "stroke-destructive",
};

const variantGlows = {
  default: "drop-shadow-[0_0_8px_hsl(var(--foreground)/0.5)]",
  primary: "drop-shadow-[0_0_8px_hsl(180_100%_50%/0.5)]",
  success: "drop-shadow-[0_0_8px_hsl(150_100%_45%/0.5)]",
  warning: "drop-shadow-[0_0_8px_hsl(30_100%_55%/0.5)]",
  danger: "drop-shadow-[0_0_8px_hsl(0_85%_55%/0.5)]",
};

const ProgressRing = React.forwardRef<HTMLDivElement, ProgressRingProps>(
  (
    {
      className,
      value,
      size = 120,
      strokeWidth = 8,
      variant = "primary",
      showValue = true,
      label,
      ...props
    },
    ref
  ) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex items-center justify-center", className)}
        {...props}
      >
        <svg
          width={size}
          height={size}
          className={cn("transform -rotate-90", variantGlows[variant])}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-muted fill-none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={cn("fill-none transition-all duration-500", variantColors[variant])}
          />
        </svg>
        {showValue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-orbitron text-2xl font-bold">{Math.round(value)}</span>
            {label && (
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {label}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);
ProgressRing.displayName = "ProgressRing";

export { ProgressRing };
