export type ApartIconKey = 'expertise' | 'consulting' | 'scale' | 'global';

export type ApartCard = {
  number: string;
  title: {
    prefix: string;
    highlight: string;
  };
  description: string;
  iconKey: ApartIconKey;
};

export const whatSetsApartContent = {
  badge: 'Why Choose RCS',
  heading: {
    prefix: 'What Sets Us',
    highlight: 'Apart',
  },
  cards: [
    {
      number: '1',
      title: {
        prefix: 'Industry-Focused',
        highlight: 'Expertise',
      },
      description:
        'Deep understanding of restaurant operations, growth challenges, and evolving market dynamics-allowing us to identify inefficiencies, optimize workflows, and implement strategies that drive sustainable growth, improve customer experience, and maximize pofitability.',
      iconKey: 'expertise',
    },
    {
      number: '2',
      title: {
        prefix: 'End-to-End',
        highlight: 'Consulting',
      },
      description:
        'From concept to expansion, we support every stage of your business journey-guiding you through planning, launch, optimization, and scaling with strategies designed to drive efficiency, growth, and long-term success.',
      iconKey: 'consulting',
    },
    {
      number: '3',
      title: {
        prefix: 'Built for',
        highlight: 'Scale',
      },
      description:
        'We design robust systems and streamlined structures that enable sustainable, scalable growth-ensuring your operations remain efficient,adapadaptable, and ready to evolve as your business expands.',
      iconKey: 'scale',
    },
    {
      number: '4',
      title: {
        prefix: 'Global',
        highlight: 'Experience',
      },
      description:
        'Our team brings extensive experience across multiple international markets, supported by full legal services: brand registartion, trademark registration, FDD support, supply chain development, and expansion planning and execution.',
      iconKey: 'global',
    },
  ] satisfies ApartCard[],
};
