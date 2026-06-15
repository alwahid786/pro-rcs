import { cn } from "@/lib/utils";

type GradientBgProps = {
  className?: string;
};

const GradientBg = ({ className }: GradientBgProps) => {
  return (
    <div className={cn("pointer-events-none relative h-full w-full overflow-hidden", className)} aria-hidden>
      <div className="absolute top-0 left-0 h-30 w-175 rounded-full bg-[#C04A12]/50 blur-[80px]" />
      <div className="absolute top-0 right-0 h-30 w-175 rounded-full bg-[#E9AD56]/50 blur-[80px]" />
    </div>
  );
};

export default GradientBg;
