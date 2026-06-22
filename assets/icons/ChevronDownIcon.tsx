"use client";

import ChevronDown from "@iconify-react/pixelarticons/chevron-down";
import { cn } from "@/lib/utils";

type ChevronDownIconProps = {
  className?: string;
};

const ChevronDownIcon = ({ className }: ChevronDownIconProps) => {
  return <ChevronDown width={14} height={14} className={cn("shrink-0", className)} aria-hidden />;
};

export default ChevronDownIcon;
