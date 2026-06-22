import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "hr";

export type HeadingWeight = "bold" | "medium" | "semibold" | "regular" | "light";

export type MulticolorHeading = {
  prefix: string;
  highlight: string;
  suffix?: string;
};

type HeadingProps = Omit<HTMLAttributes<HTMLElement>, "as"> & {
  as?: HeadingTag;
  children?: ReactNode;
  align?: "left" | "center" | "right";
  tone?: "default" | "muted";
  multicolor?: MulticolorHeading;
  size?: "default" | "display" | "display-sm" | "step-number" | "card-title";
  uppercase?: boolean;
  weight?: HeadingWeight;
};

const sizeStyles: Record<Exclude<HeadingTag, "hr">, string> = {
  h1: "text-[2rem] leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.12]",
  h2: "text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl",
  h3: "text-2xl leading-tight sm:text-3xl lg:text-4xl",
  h4: "text-xl leading-snug sm:text-2xl lg:text-3xl",
  h5: "text-lg leading-snug sm:text-xl",
  h6: "text-base uppercase tracking-[0.14em] sm:text-lg",
  p: "text-base leading-relaxed sm:text-lg sm:leading-8",
};

const customSizeStyles = {
  display: "text-4xl leading-[121%] tracking-[-0.03em] sm:text-5xl lg:text-[62px]",
  "display-sm": "text-3xl leading-[121%] tracking-[-0.03em] sm:text-4xl lg:text-[54px]",
  "step-number": "text-5xl leading-none tracking-normal text-primary/35 sm:text-6xl lg:text-[70.72px]",
  "card-title": "text-2xl leading-[121%] tracking-[-0.03em] sm:text-[26px] lg:text-[30.38px]",
};

const alignStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const weightStyles: Record<HeadingWeight, string> = {
  bold: "font-bold",
  medium: "font-medium",
  semibold: "font-semibold",
  regular: "font-normal",
  light: "font-light",
};

const defaultWeightByTag: Record<Exclude<HeadingTag, "hr">, HeadingWeight> = {
  h1: "bold",
  h2: "bold",
  h3: "semibold",
  h4: "semibold",
  h5: "semibold",
  h6: "semibold",
  p: "regular",
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
  multicolor,
  size = "default",
  uppercase = false,
  weight,
  ...props
}: HeadingProps) => {
  const renderWithLineBreaks = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, index) => (
      <span key={`${line}-${index}`}>
        {index > 0 ? <br /> : null}
        {line}
      </span>
    ));
  };

  if (as === "hr") {
    return <hr className={cn("w-full border-0 border-t border-dashed border-[#b8d9f0]", className)} {...props} />;
  }

  const Component = as;
  const resolvedSizeStyle = size === "default" ? sizeStyles[as] : customSizeStyles[size];
  const resolvedWeight =
    weight ??
    (size === "step-number" ? "medium" : size === "card-title" ? "bold" : defaultWeightByTag[as]);

  return (
    <Component
      className={cn(
        "font-sans",
        resolvedSizeStyle,
        weightStyles[resolvedWeight],
        alignStyles[align],
        toneStyles[tone],
        uppercase && "uppercase",
        className,
      )}
      {...props}
    >
      {multicolor ? (
        <>
          {renderWithLineBreaks(multicolor.prefix)} <span className="text-primary">{renderWithLineBreaks(multicolor.highlight)}</span>
          {multicolor.suffix ? <>{` `}{renderWithLineBreaks(multicolor.suffix)}</> : null}
        </>
      ) : (
        children
      )}
    </Component>
  );
};

export default Heading;
