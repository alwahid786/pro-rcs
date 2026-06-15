import challengeIcon from "@/assets/imgs/st-1.png";
import solutionIcon from "@/assets/imgs/st-2.png";
import type { StaticImageData } from "next/image";

export type StrategyCardData = {
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  listItems?: string[];
  image: StaticImageData;
  imageClassName: string;
};

export const strategySectionContent = {
  badge: "Our Strategy",
  heading: {
    prefix: "Our",
    highlight: "Strategic",
    suffix: "Approach",
  },
  cards: [
    {
      titlePrefix: "The",
      titleHighlight: "Challenge",
      subtitle: "Scaling a restaurant business comes with real challenges",
      description: "Growth sounds exciting until operations start breaking down.",
      listItems: [
        "Inconsistent quality across locations",
        "Lack of scalable systems",
        "Supply chain inefficiencies and rising costs",
        "Difficulty expanding into a franchise model",
        "Operational chaos during growth",
      ],
      image: challengeIcon,
      imageClassName: "pointer-events-none absolute z-10 -bottom-6 -right-4 w-44 opacity-90 sm:w-56 lg:w-64",
    },
    {
      titlePrefix: "The",
      titleHighlight: "Solution",
      subtitle: "We bring structure – and the right partners – to your growth",
      description:
        "At PRO RCS, we help restaurant owners and franchise operators build strong foundations for sustainable growth. We don't just advise, we implement systems and connect you with the right experts to execute.",
      image: solutionIcon,
      imageClassName: "pointer-events-none absolute z-10 -bottom-4 -right-2 w-44 opacity-90 sm:w-56 lg:w-64",
    },
  ] satisfies StrategyCardData[],
};
