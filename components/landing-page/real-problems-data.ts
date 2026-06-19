import harborHouseLogo from '@/assets/imgs/real-prob/harbor-house.png';
import grillhausLogo from '@/assets/imgs/real-prob/grillhaus-co.png';
import nomadBitesLogo from '@/assets/imgs/real-prob/nomand-bites.png';
import noodleLabLogo from '@/assets/imgs/real-prob/noodle-lab.png';
import spiceRunLogo from '@/assets/imgs/real-prob/spice-run.png';
import theBigTableLogo from '@/assets/imgs/real-prob/the-big-table.png';
import type { StaticImageData } from 'next/image';

export type CaseCategory = 'QSR' | 'Casual dining' | 'Cloud kitchen' | 'Franchise';

export type CaseMetric = {
  value: string;
  label: string;
};

export type RealProblemCase = {
  id: string;
  category: CaseCategory;
  brand: string;
  logo: StaticImageData;
  summary: string;
  metrics: [CaseMetric, CaseMetric, CaseMetric];
  problem: string;
  outcome: string;
  quote?: string;
};

export const realProblemsContent = {
  badge: 'Brands We Helped',
  heading: {
    prefix: 'Real',
    highlight: 'Problems',
    suffix: 'Solved.',
  },
  filters: ['All', 'QSR', 'Casual dining', 'Cloud kitchen', 'Franchise'] as const,
  cases: [
    {
      id: 'nomad-bites',
      category: 'Cloud kitchen',
      brand: 'Nomad Bites',
      logo: nomadBitesLogo,
      summary:
        'A strategic consulting engagement focused on brand positioning, quality excellence, supply chain optimization, and building a foundation for sustainable growth.',
      metrics: [
        { value: '+210%', label: 'BRAND POSITIONING' },
        { value: '8 wks', label: 'QUALITY IMPROVEMENT' },
        { value: '3x', label: 'SUPPLY CHAIN OPTIMIZATION' },
      ],
      problem:
        "Nomad Bites was operating on two delivery platforms with inconsistent branding, no social presence, and a menu that hadn't been engineered for profitability.",
      outcome:
        'We rebuilt their brand identity, rewrote the menu with high-margin hero items, and launched a targeted Instagram + TikTok strategy with weekly content. Order volume grew 210% in 12 weeks.',
      quote: "RCS didn't just fix our marketing — they rebuilt how we think about the business.",
    },
    {
      id: 'grillhaus',
      category: 'Franchise',
      brand: 'Grillhaus Co.',
      logo: grillhausLogo,
      summary:
        'Supporting franchise brands through brand consistency, operational standardization, quality assurance, and scalable growth strategies across multiple locations.',
      metrics: [
        { value: '+94%', label: 'Brand consistency' },
        { value: '12->18', label: 'Operational excellence' },
        { value: '4.7★', label: 'Quality assurance' },
      ],
      problem:
        'New franchise branches were rolling out with inconsistent training, menu execution, and customer experience, creating brand dilution.',
      outcome:
        'We standardized onboarding playbooks, introduced audit checkpoints, and implemented weekly management scorecards across all branches.',
    },
    {
      id: 'spice-run',
      category: 'QSR',
      brand: 'Spice Run',
      logo: spiceRunLogo,
      summary: 'Fast-casual delivery brand struggling with conversion and repeat orders.',
      metrics: [
        { value: '+160%', label: 'Delivery revenue in 10 weeks' },
        { value: '4.2x', label: 'Conversion uplift' },
        { value: '38%', label: 'Repeat customer gain' },
      ],
      problem: 'No delivery strategy, poor listing photos, and zero reviews on Talabat.',
      outcome:
        'Professional food photography, review acquisition campaign, and optimized listing copy drove 160% revenue growth.',
    },
    {
      id: 'big-table',
      category: 'QSR',
      brand: 'The Big Table',
      logo: theBigTableLogo,
      summary: 'Dine-in concept with weak online visibility and underperforming weekday traffic.',
      metrics: [
        { value: '2.4x', label: 'Weekend cover increase' },
        { value: '+67%', label: 'Reservations growth' },
        { value: '31%', label: 'Average spend gain' },
      ],
      problem:
        'Inconsistent social presence and lack of online booking visibility resulted in low weekend reservations.',
      outcome:
        'Strategic social content, Google Business optimization, and a streamlined booking flow increased weekend covers by 2.4x in 8 weeks.',
    },
    {
      id: 'noodle-lab',
      category: 'QSR',
      brand: 'Noodle Lab',
      logo: noodleLabLogo,
      summary: 'App-first noodle brand with high cart abandonment and weak reorder cycle.',
      metrics: [
        { value: '+85%', label: 'App order volume in 6 weeks' },
        { value: '41%', label: 'Abandonment reduction' },
        { value: '29%', label: 'AOV increase' },
      ],
      problem:
        'High cart abandonment rate and poor in-app discoverability were limiting repeat customer orders.',
      outcome:
        'Loyalty incentive program, targeted push notifications, and menu restructuring boosted app orders by 85%.',
    },
    {
      id: 'harbor-house',
      category: 'Casual dining',
      brand: 'Harbor House',
      logo: harborHouseLogo,
      summary: 'Casual dining concept with weak post-visit engagement and low return rates.',
      metrics: [
        { value: '3.1x', label: 'Return customer rate' },
        { value: '+54%', label: 'Loyalty signups' },
        { value: '4.8★', label: 'Average review score' },
      ],
      problem:
        'No CRM strategy and inconsistent post-visit engagement led to low customer retention and infrequent repeat visits.',
      outcome:
        'Personalized email journeys, birthday offers, and a tiered loyalty scheme tripled the return customer rate.',
    },
  ] satisfies RealProblemCase[],
};
