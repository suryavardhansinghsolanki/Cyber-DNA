import * as React from "react";
import { cn } from "@/lib/utils";

interface DataStreamProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: "slow" | "normal" | "fast";
  variant?: "horizontal" | "vertical";
  opacity?: number;
}

const DataStream = React.forwardRef<HTMLDivElement, DataStreamProps>(
  ({ className, speed = "normal", variant = "horizontal", opacity = 0.3, ...props }, ref) => {
    const speedClasses = {
      slow: "animate-[dataStream_4s_linear_infinite]",
      normal: "animate-[dataStream_2s_linear_infinite]",
      fast: "animate-[dataStream_1s_linear_infinite]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "absolute pointer-events-none",
          variant === "horizontal" ? "left-0 right-0 h-px" : "top-0 bottom-0 w-px",
          className
        )}
        style={{ opacity }}
        {...props}
      >
        <div
          className={cn(
            "h-full w-full",
            variant === "horizontal"
              ? "bg-gradient-to-r from-transparent via-primary to-transparent bg-[length:200%_100%]"
              : "bg-gradient-to-b from-transparent via-primary to-transparent bg-[length:100%_200%]",
            speedClasses[speed]
          )}
        />
      </div>
    );
  }
);
DataStream.displayName = "DataStream";

export { DataStream };
