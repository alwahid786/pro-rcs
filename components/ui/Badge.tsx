import StarIcon from "@/assets/icons/StarIcon";
import { cn } from "@/lib/utils";

type BadgeProps = {
  showIcon?: boolean;
  text: string;
  variant?: "default" | "glass";
  className?: string;
};

const Badge = ({ showIcon = true, text, variant = "default", className }: BadgeProps) => {
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-2 rounded-full py-1.5 pl-3 pr-5 text-white",
        variant === "default" && "bg-secondary shadow-glass",
        variant === "glass" && "border border-white/10 bg-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      {showIcon && <StarIcon />}
      <span className="font-sans text-xs font-bold uppercase tracking-[0.08em]">{text}</span>
    </div>
  );
};

export default Badge;
