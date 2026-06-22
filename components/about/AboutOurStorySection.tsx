import CheckIcon from "@/assets/icons/CheckIcon";
import Location from "@/assets/icons/about/Location";
import OurMission from "@/assets/icons/about/OurMission";
import Vision from "@/assets/icons/about/Vision";
import type { OurStorySectionContent } from "@/components/content/types";
import GradientCard from "@/components/ui/GradientCard";
import HeadingBlock from "@/components/ui/HeadingBlock";

import Badge from "../ui/Badge";

type AboutOurStorySectionProps = Omit<OurStorySectionContent, "type">;

type StoryCardItemProps = {
  title: string;
  text: string;
};

const StoryCardItem = ({ title, text }: StoryCardItemProps) => (
  <div className="flex items-start gap-2 flex-col glass lg:p-6 p-4 rounded-2xl bg-white/10!">
    <h3 className="font-sans text-lg font-bold text-white">{title}</h3>
    <p className="font-sans text-base leading-relaxed text-white/45">{text}</p>
  </div>
);

const AboutOurStorySection = ({ badge, heading, paragraphs, features, card }: AboutOurStorySectionProps) => {
  return (
    <section className=" py-16 sm:py-20 lg:py-24 ">
      <div className="container relative">
        <div className="grid items-center gap-10 grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="flex flex-col gap-8 lg:gap-10">
            <HeadingBlock badge={badge} heading={heading} weight="semibold" uppercase={false} headingClassName="" />

            <div className="flex flex-col gap-6">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="font-sans text-base leading-relaxed text-text-secondary sm:text-lg sm:leading-8">
                  {paragraph}
                </p>
              ))}
            </div>

            <ul className="flex flex-col gap-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="shrink-0">
                    <CheckIcon />
                  </span>
                  <span className="font-sans text-base font-medium text-text sm:text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className=" relative">
            <div className="absolute w-[80%] h-full bg-primary/10 rounded-4xl border border-primary/15 z-2 left-1/2 -translate-x-1/2 top-0 rotate-6" />
            <section className="flex bg-secondary   lg:p-10 p-8 rounded-4xl flex-col gap-8 items-start relative z-10">
              <Badge showIcon={false} text={card.badge} />
              <div className="grid lg:grid-cols-2 gap-8">
                <StoryCardItem title={card.mission.title} text={card.mission.text} />
                <StoryCardItem title={card.vision.title} text={card.vision.text} />
              </div>
              <div className="flex items-center gap-2">
                <Location />
                <div className="flex flex-col gap-1">
                  <h4 className="font-sans text-sm font-medium text-white">{card.location.title}</h4>
                  <p className="font-sans text-xs font-light leading-relaxed text-white/45">{card.location.address}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOurStorySection;
