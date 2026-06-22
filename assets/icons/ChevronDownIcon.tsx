import { cn } from "@/lib/utils";

type ChevronDownIconProps = {
  className?: string;
};

const ChevronDownIcon = ({ className }: ChevronDownIconProps) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <path d="M3 5H5V7H7V9H9V7H11V5H9V7H7V5H5V3H3V5Z" fill="currentColor" />
    </svg>
  );
};

export default ChevronDownIcon;
