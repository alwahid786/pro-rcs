import type { ReactNode } from "react";
import OurMission from "@/assets/icons/about/OurMission";
import Vision from "@/assets/icons/about/Vision";
import type { MissionVisionCard, MissionVisionSectionContent } from "@/components/content/types";
import HeadingBlock from "@/components/ui/HeadingBlock";
import { cn } from "@/lib/utils";

type AboutMissionVisionSectionProps = Omit<MissionVisionSectionContent, "type">;

type MissionVisionCardProps = MissionVisionCard & {
  icon: ReactNode;
  variant: "light" | "dark";
};

const MissionVisionCardBlock = ({ icon, title, description, quote, variant }: MissionVisionCardProps) => {
  const isDark = variant === "dark";

  return (
    <article className={cn("flex flex-col gap-5 rounded-3xl p-6 sm:p-8 lg:p-10", isDark ? "bg-[#1A1612]" : "bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]")}>
      <div className="flex items-center gap-4">
        {icon}
        <h3 className={cn("font-sans text-xl font-bold sm:text-2xl", isDark ? "text-white" : "text-text")}>{title}</h3>
      </div>

      <p className={cn("font-sans text-base leading-relaxed sm:text-lg sm:leading-8", isDark ? "text-white/60" : "text-text-secondary")}>{description}</p>

      <blockquote
        className={cn(
          "rounded-2xl p-5 font-sans text-sm font-medium italic leading-relaxed sm:p-6 sm:text-base",
          isDark
            ? "bg-white/5 text-white/80 shadow-[inset_0px_8.4px_16.8px_0px_#FFFFFF08,inset_0px_7.2px_4.8px_0px_#FFFFFF05,inset_0px_1.2px_1.2px_0px_#FFFFFF1A,inset_0px_1.09px_1.09px_0px_#FFFFFF40]"
            : "bg-[#FFF8F4] text-text-secondary",
        )}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>
    </article>
  );
};

const AboutMissionVisionSection = ({ badge, heading, mission, vision }: AboutMissionVisionSectionProps) => {
  return (
    <section className="bg-[#FFF8F4] py-16 sm:py-20 lg:py-24">
      <div className="container flex flex-col items-center gap-10 lg:gap-12">
        <HeadingBlock badge={badge} segments={heading} isCenter weight="semibold" uppercase={false} headingClassName="max-w-4xl" />

        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <MissionVisionCardBlock variant="light" icon={<OurMission />} {...mission} />
          <MissionVisionCardBlock variant="dark" icon={<Vision />} {...vision} />
        </div>
      </div>
    </section>
  );
};

export default AboutMissionVisionSection;
