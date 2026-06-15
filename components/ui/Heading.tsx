import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "hr";

type HeadingProps = Omit<HTMLAttributes<HTMLElement>, "as"> & {
  as?: HeadingTag;
  children?: ReactNode;
  align?: "left" | "center" | "right";
  tone?: "default" | "muted";
};

const sizeStyles: Record<Exclude<HeadingTag, "hr">, string> = {
  h1: "text-[2rem] font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.12]",
  h2: "text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl",
  h3: "text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl",
  h4: "text-xl font-semibold leading-snug sm:text-2xl lg:text-3xl",
  h5: "text-lg font-semibold leading-snug sm:text-xl",
  h6: "text-base font-semibold uppercase tracking-[0.14em] sm:text-lg",
  p: "text-base leading-relaxed sm:text-lg sm:leading-8",
};

const alignStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const toneStyles = {
  default: "text-text",
  muted: "text-text-secondary",
};

const Heading = ({
  as = "h2",
  children,
  className,
  align = "left",
  tone = "default",
  ...props
}: HeadingProps) => {
  if (as === "hr") {
    return (
      <hr
        className={cn("w-full border-0 border-t border-dashed border-[#b8d9f0]", className)}
        {...props}
      />
    );
  }

  const Component = as;

  return (
    <Component
      className={cn(
        sizeStyles[as],
        alignStyles[align],
        toneStyles[tone],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Heading;
