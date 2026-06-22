import Badge from "@/components/ui/Badge";
import Heading, { type HeadingWeight, type MulticolorHeading } from "@/components/ui/Heading";
import { cn } from "@/lib/utils";

type HeadingBlockProps = {
  badge: string;
  heading: MulticolorHeading;
  isCenter?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "display" | "display-sm";
  uppercase?: boolean;
  weight?: HeadingWeight;
  className?: string;
  headingClassName?: string;
};

const HeadingBlock = ({
  badge,
  heading,
  isCenter = false,
  as = "h2",
  size = "display",
  uppercase = true,
  weight = "regular",
  className,
  headingClassName = "",
}: HeadingBlockProps) => {
  return (
    <div className={cn("flex w-full flex-col gap-6", isCenter ? "items-center" : "items-start", className)}>
      <Badge showIcon text={badge} />

      <Heading as={as} align={isCenter ? "center" : "left"} multicolor={heading} size={size} uppercase={uppercase} weight={weight} className={headingClassName} />
    </div>
  );
};

export default HeadingBlock;
