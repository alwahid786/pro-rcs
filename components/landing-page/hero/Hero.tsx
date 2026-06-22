import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import LogoMarquee from "./LogoMarquee";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import Heading from "@/components/ui/Heading";
import RoatatingStar from "@/components/ui/RoatatingStar";

// Tight orange range around primary — smooth sweep without harsh dark/light contrast
const highlightColors = ["#eb692c", "#f08a52", "#e57638"];

const HeroGrad = ({ position }: { position: string }) => {
  return <div className={`absolute ${position} h-150 w-100 rounded-full bg-[#C04A12]/60 blur-[144px] animate-pulse [animation-duration:5s]`} />;
};

const Hero = () => {
  return (
    <section className="relative z-10 overflow-x-clip bg-white">
      <div className="pointer-events-none absolute inset-0 overflow-visible">
        <HeroGrad position="lg:top-0 lg:left-[-20%] max-lg:hidden" />

        <HeroGrad position="top-[-60%] right-1/2 translate-x-1/2 opacity-50 lg:top-0 lg:right-[-20%] lg:translate-x-0 lg:opacity-100" />

        <RoatatingStar position="top-0 right-0" width="70" />
      </div>

      <div className="container relative z-10 flex flex-col items-center gap-10 px-5 py-16 text-center sm:gap-12 sm:py-20 lg:py-24">
        <span className="relative max-w-7xl font-bold">
          <RoatatingStar position="top-[-10px] left-[70px]" width="30" />

          <Heading as="h1" align="center" className="relative z-10">
            We Help{" "}
            <GradientText colors={highlightColors} animationSpeed={3} showBorder={false} direction="vertical">
              Restaurant
            </GradientText>{" "}
            Businesses Scale With Strong Systems,{" "}
            <GradientText colors={highlightColors} animationSpeed={3} showBorder={false} direction="vertical">
              Franchise Models
            </GradientText>
            , And Optimized Supply Chains
          </Heading>
        </span>

        <div className="flex w-full max-w-2xl flex-col items-center gap-6">
          <Heading as="p" align="center" tone="muted">
            From Startup To Multi-Location Growth, We Build The Structure, Processes, And Partnerships That Keep Your Operations Efficient, Compliant, And Profitable.
          </Heading>

          <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
            <Button href="/contact" variant="secondary" size="md" icon={<ArrowRightIcon />} className="w-full sm:w-auto">
              Get A Quote
            </Button>

            <Button href="/contact" variant="primary" size="md" icon={<ArrowRightIcon />} className="w-full sm:w-auto">
              Book Consultation
            </Button>
          </div>
        </div>
      </div>

      <LogoMarquee />
    </section>
  );
};

export default Hero;
