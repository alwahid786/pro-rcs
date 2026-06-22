import CheckIcon from "@/assets/icons/CheckIcon";
import Location from "@/assets/icons/about/Location";
import type { OurStorySectionContent } from "@/components/content/types";
import Badge from "@/components/ui/Badge";
import HeadingBlock from "@/components/ui/HeadingBlock";

type AboutOurStorySectionProps = Omit<OurStorySectionContent, "type">;

type StoryCardItemProps = {
  title: string;
  text: string;
};

const StoryCardItem = ({ title, text }: StoryCardItemProps) => (
  <div className="flex flex-col items-start gap-2 rounded-2xl bg-white/10! p-4 glass lg:p-6">
    <h3 className="font-sans text-lg font-bold text-white">{title}</h3>
    <p className="font-sans text-base leading-relaxed text-white/45">{text}</p>
  </div>
);

const AboutOurStorySection = ({ badge, heading, paragraphs, features, card }: AboutOurStorySectionProps) => {
  return (
    <section className="overflow-x-clip py-16 sm:py-20 lg:py-24">
      <div className="container relative">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
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

          <div className="relative w-full">
            <div className="absolute top-0 left-1/2 z-2 h-full w-[90%] -translate-x-1/2 rotate-3 rounded-4xl border border-primary/15 bg-primary/10 lg:w-[80%] lg:rotate-6" />
            <section className="relative z-10 flex flex-col items-start gap-6 rounded-4xl bg-secondary p-6 sm:gap-8 sm:p-8 lg:gap-8 lg:p-10">
              <Badge showIcon={false} text={card.badge} />
              <div className="grid w-full gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
                <StoryCardItem title={card.mission.title} text={card.mission.text} />
                <StoryCardItem title={card.vision.title} text={card.vision.text} />
              </div>
              <div className="flex w-full items-start gap-3 sm:items-center sm:gap-2">
                <span className="shrink-0">
                  <Location />
                </span>
                <div className="flex min-w-0 flex-col gap-1">
                  <h4 className="font-sans text-sm font-medium text-white">{card.location.title}</h4>
                  <p className="font-sans text-xs leading-relaxed font-light text-white/45">{card.location.address}</p>
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
