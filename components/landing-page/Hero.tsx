import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import Heading from "@/components/ui/Heading";

// Tight orange range around primary — smooth sweep without harsh dark/light contrast
const highlightColors = ["#eb692c", "#f08a52", "#e57638"];

const Hero = () => {
  return (
    <section className="relative bg-white">
      <div className="container relative flex flex-col items-center px-5 py-16 text-center sm:py-20 lg:py-24">
        <Heading as="h1" align="center" className="max-w-7xl font-bold">
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
    </section>
  );
};

export default Hero;
