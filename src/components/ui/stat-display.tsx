import * as React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  suffix?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
}

const variantStyles = {
  default: "text-foreground",
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-destructive",
};

const StatDisplay = React.forwardRef<HTMLDivElement, StatDisplayProps>(
  (
    {
      className,
      label,
      value,
      suffix,
      trend,
      trendValue,
      icon,
      variant = "default",
      ...props
    },
    ref
  ) => {
    const TrendIcon =
      trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
    const trendColor =
      trend === "up"
        ? "text-success"
        : trend === "down"
        ? "text-destructive"
        : "text-muted-foreground";

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-1", className)}
        {...props}
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
          {icon}
          <span>{label}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span
            className={cn(
              "font-orbitron text-3xl font-bold tracking-tight",
              variantStyles[variant]
            )}
          >
            {value}
          </span>
          {suffix && (
            <span className="text-sm text-muted-foreground">{suffix}</span>
          )}
        </div>
        {trend && (
          <div className={cn("flex items-center gap-1 text-xs", trendColor)}>
            <TrendIcon className="h-3 w-3" />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    );
  }
);
StatDisplay.displayName = "StatDisplay";

export { StatDisplay };
