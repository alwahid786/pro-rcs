import challengeIcon from "@/assets/imgs/st-1.png";
import solutionIcon from "@/assets/imgs/st-2.png";
import Badge from "@/components/ui/Badge";
import Image from "next/image";

const challengeItems = [
  "Inconsistent quality across locations",
  "Lack of scalable systems",
  "Supply chain inefficiencies and rising costs",
  "Difficulty expanding into a franchise model",
  "Operational chaos during growth",
];

const cardGradientStyle = {
  background: "linear-gradient(180deg, rgba(192, 74, 18, 0.3) 0%, rgba(233, 173, 86, 0.3) 43.36%)",
  backdropFilter: "blur(324px)",
  WebkitBackdropFilter: "blur(324px)",
} as const;

const StrategySection = () => {
  return (
    <section className="relative container mx-auto flex flex-col items-center overflow-hidden bg-white px-5 py-16 sm:py-20 lg:py-24">
      <Badge showIcon text="Our Strategy" />

      <h2 className="mt-6 max-w-3xl text-[2rem] font-bold uppercase leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-[3.25rem]">
        Our <span className="text-primary">Strategic</span> Approach
      </h2>

      <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-8 w-full">
        <article className="relative overflow-hidden rounded-3xl px-6 py-8 sm:px-8 sm:py-10" style={cardGradientStyle}>
          <div className="relative z-10 max-w-md">
            <h3 className="text-2xl font-bold text-primary sm:text-3xl">The Challenge</h3>
            <p className="mt-3 text-base font-semibold italic text-text sm:text-lg">Scaling a restaurant business comes with real challenges</p>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">Growth sounds exciting until operations start breaking down.</p>
            <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-text-secondary sm:text-base">
              {challengeItems.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-text-secondary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Image src={challengeIcon} alt="" aria-hidden className="pointer-events-none absolute -bottom-6 -right-4 w-44 opacity-90 sm:w-56 lg:w-64" />
        </article>

        <article className="relative overflow-hidden rounded-3xl px-6 py-8 sm:px-8 sm:py-10" style={cardGradientStyle}>
          <div className="relative z-10 max-w-md">
            <h3 className="text-2xl font-bold text-primary sm:text-3xl">The Solution</h3>
            <p className="mt-3 text-base font-semibold italic text-text sm:text-lg">We bring structure – and the right partners – to your growth</p>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
              At PRO RCS, we help restaurant owners and franchise operators build strong foundations for sustainable growth. We don&apos;t just advise, we implement systems and
              connect you with the right experts to execute.
            </p>
          </div>

          <Image src={solutionIcon} alt="" aria-hidden className="pointer-events-none absolute -bottom-4 -right-2 w-44 opacity-90 sm:w-56 lg:w-64" />
        </article>
      </div>
    </section>
  );
};

export default StrategySection;
