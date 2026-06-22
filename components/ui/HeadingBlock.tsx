import Badge from "@/components/ui/Badge";
import type { HeadingSegment } from "@/components/content/types";
import Heading, { type HeadingWeight, type MulticolorHeading } from "@/components/ui/Heading";
import { cn } from "@/lib/utils";

type HeadingBlockBaseProps = {
  badge: string;
  isCenter?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "display" | "display-sm";
  uppercase?: boolean;
  weight?: HeadingWeight;
  className?: string;
  headingClassName?: string;
};

type HeadingBlockProps = HeadingBlockBaseProps &
  ({ heading: MulticolorHeading; segments?: never } | { segments: HeadingSegment[]; heading?: never });

const HeadingBlock = ({
  badge,
  heading,
  segments,
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

      <Heading as={as} align={isCenter ? "center" : "left"} multicolor={heading} size={size} uppercase={uppercase} weight={weight} className={headingClassName}>
        {segments?.map((segment, index) =>
          segment.highlight ? (
            <span key={index} className="text-primary">
              {segment.text}
            </span>
          ) : (
            <span key={index}>{segment.text}</span>
          ),
        )}
      </Heading>
    </div>
  );
};

export default HeadingBlock;
