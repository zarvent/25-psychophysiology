// src/components/landing/InfoTooltip.tsx
"use client";

import type { FC, ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type InfoTooltipProps = {
  title: string;
  description: string;
  children: ReactNode; // The trigger element
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
};

export const InfoTooltip: FC<InfoTooltipProps> = ({ title, description, children, side = "top", className }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent 
          side={side} 
          className={cn(
            "max-w-xs bg-popover text-popover-foreground border-accent/50 shadow-xl p-4 rounded-lg",
            "backdrop-blur-sm bg-opacity-80", // Glassmorphism effect
            className
          )}
        >
          <h4 className="font-bold text-accent mb-1 text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
