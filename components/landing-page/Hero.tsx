import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import LogoMarquee from "@/components/landing-page/LogoMarquee";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import Heading from "@/components/ui/Heading";
import RoatatingStar from "../ui/RoatatingStar";

// Tight orange range around primary — smooth sweep without harsh dark/light contrast
const highlightColors = ["#eb692c", "#f08a52", "#e57638"];

const HeroGrad = ({ position }: { position: string }) => {
  return <div className={`absolute ${position} h-150 w-100 rounded-full bg-[#C04A12]/80 blur-[144px] animate-pulse [animation-duration:5s]`} />;
};

const Hero = () => {
  return (
    <section className="relative bg-white z-10">
      <HeroGrad position="top-0 left-[-20%]" />
      <HeroGrad position="top-0 right-[-20%]" />
      <RoatatingStar position="top-0 right-0" width="70" />

      <div className="container relative flex flex-col items-center px-5 py-16 text-center sm:py-20 lg:py-24 ">
        <span className="max-w-7xl font-bold relative ">
          <RoatatingStar position="top-[-10px] left-[70px]" width="30" />
          <Heading as="h1" align="center" className=" z-10 relative">
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

        <Heading as="p" align="center" tone="muted" className="mt-6 max-w-2xl sm:mt-8">
          From Startup To Multi-Location Growth, We Build The Structure, Processes, And Partnerships That Keep Your Operations Efficient, Compliant, And Profitable.
        </Heading>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:mt-12 sm:w-auto sm:flex-row">
          <Button variant="secondary" size="md" icon={<ArrowRightIcon />} className="w-full sm:w-auto">
            Get A Quote
          </Button>
          <Button variant="primary" size="md" icon={<ArrowRightIcon />} className="w-full sm:w-auto">
            Book Consultation
          </Button>
        </div>
      </div>

      <LogoMarquee />
    </section>
  );
};

export default Hero;
