import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cyberCardVariants = cva(
  "relative overflow-hidden rounded-xl border backdrop-blur-xl transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-card/80 border-border/50 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(180_100%_50%/0.1)]",
        glow:
          "bg-card/80 border-primary/30 shadow-[0_0_20px_hsl(180_100%_50%/0.1)] hover:shadow-[0_0_40px_hsl(180_100%_50%/0.2)] hover:border-primary/50",
        danger:
          "bg-destructive/10 border-destructive/30 shadow-[0_0_20px_hsl(0_85%_55%/0.1)] hover:shadow-[0_0_40px_hsl(0_85%_55%/0.2)]",
        success:
          "bg-success/10 border-success/30 shadow-[0_0_20px_hsl(150_100%_45%/0.1)] hover:shadow-[0_0_40px_hsl(150_100%_45%/0.2)]",
        warning:
          "bg-warning/10 border-warning/30 shadow-[0_0_20px_hsl(30_100%_55%/0.1)] hover:shadow-[0_0_40px_hsl(30_100%_55%/0.2)]",
        holographic:
          "bg-card/60 border-transparent [background-image:linear-gradient(135deg,hsl(180_100%_50%/0.1)_0%,hsl(270_100%_65%/0.1)_25%,hsl(300_100%_60%/0.1)_50%,hsl(180_100%_50%/0.1)_75%,hsl(270_100%_65%/0.1)_100%)] [background-size:400%_400%] animate-[holographic_8s_ease_infinite]",
        glass:
          "bg-white/5 border-white/10 backdrop-blur-2xl",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CyberCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cyberCardVariants> {
  gradient?: boolean;
}

const CyberCard = React.forwardRef<HTMLDivElement, CyberCardProps>(
  ({ className, variant, size, gradient = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cyberCardVariants({ variant, size, className }))}
        {...props}
      >
        {gradient && (
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        )}
        {children}
      </div>
    );
  }
);
CyberCard.displayName = "CyberCard";

const CyberCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
));
CyberCardHeader.displayName = "CyberCardHeader";

const CyberCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-orbitron text-lg font-semibold leading-none tracking-wide text-foreground",
      className
    )}
    {...props}
  />
));
CyberCardTitle.displayName = "CyberCardTitle";

const CyberCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CyberCardDescription.displayName = "CyberCardDescription";

const CyberCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CyberCardContent.displayName = "CyberCardContent";

const CyberCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
CyberCardFooter.displayName = "CyberCardFooter";

export {
  CyberCard,
  CyberCardHeader,
  CyberCardFooter,
  CyberCardTitle,
  CyberCardDescription,
  CyberCardContent,
  cyberCardVariants,
};
