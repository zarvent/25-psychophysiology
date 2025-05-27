// src/components/icons/PulsingDot.tsx
import { cn } from "@/lib/utils";
import type { FC } from 'react';

type PulsingDotProps = {
  className?: string;
  colorClassName?: string; // e.g., "bg-primary"
  size?: 'sm' | 'md' | 'lg';
};

export const PulsingDot: FC<PulsingDotProps> = ({ 
  className, 
  colorClassName = "bg-primary",
  size = 'md'
}) => {
  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  return (
    <span className={cn("relative flex cursor-pointer", sizeClasses[size], className)} role="button" tabIndex={0} aria-label="Information point">
      <span 
        className={cn(
          "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", 
          colorClassName
        )}
      ></span>
      <span 
        className={cn(
          "relative inline-flex rounded-full h-full w-full", 
          colorClassName
        )}
      ></span>
    </span>
  );
};
