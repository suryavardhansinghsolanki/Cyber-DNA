import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cyberButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium font-rajdhani uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:shadow-[0_0_20px_hsl(180_100%_50%/0.5)] border border-primary/50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700",
        destructive:
          "bg-destructive/20 text-destructive border border-destructive/50 hover:bg-destructive/30 hover:shadow-[0_0_20px_hsl(0_85%_55%/0.5)]",
        outline:
          "border border-primary/50 bg-transparent text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(180_100%_50%/0.3)]",
        secondary:
          "bg-secondary/20 text-secondary border border-secondary/50 hover:bg-secondary/30 hover:shadow-[0_0_20px_hsl(300_100%_60%/0.5)]",
        ghost:
          "bg-transparent text-foreground hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success:
          "bg-success/20 text-success border border-success/50 hover:bg-success/30 hover:shadow-[0_0_20px_hsl(150_100%_45%/0.5)]",
        warning:
          "bg-warning/20 text-warning border border-warning/50 hover:bg-warning/30 hover:shadow-[0_0_20px_hsl(30_100%_55%/0.5)]",
        neon:
          "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-primary-foreground shadow-[0_0_10px_hsl(180_100%_50%/0.3),inset_0_0_10px_hsl(180_100%_50%/0.1)] hover:shadow-[0_0_30px_hsl(180_100%_50%/0.6),inset_0_0_20px_hsl(180_100%_50%/0.2)]",
        cyber:
          "bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground border-0 hover:shadow-[0_0_30px_hsl(180_100%_50%/0.5)]",
        ghost_protocol:
          "bg-muted/50 text-muted-foreground border border-muted hover:bg-muted hover:text-foreground hover:border-primary/50 hover:shadow-[0_0_20px_hsl(180_100%_50%/0.2)]",
      },
      size: {
        default: "h-10 px-6 py-2 rounded-lg",
        sm: "h-8 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CyberButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cyberButtonVariants> {
  asChild?: boolean;
}

const CyberButton = React.forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(cyberButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
CyberButton.displayName = "CyberButton";

export { CyberButton, cyberButtonVariants };
