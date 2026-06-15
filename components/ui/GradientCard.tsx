import GradientBg from "@/components/ui/GradientBg";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type GradientCardProps = {
  children: ReactNode;
  className?: string;
};

const GradientCard = ({ children, className }: GradientCardProps) => {
  return (
    <article className={cn("relative overflow-hidden rounded-3xl shadow-md", className)}>
      <span className="absolute inset-0 bottom-0 left-0 z-0 rotate-180 opacity-50">
        <GradientBg />
      </span>
      {children}
    </article>
  );
};

export default GradientCard;
