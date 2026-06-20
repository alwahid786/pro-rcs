import aboutImage from "@/assets/imgs/about-img.png";
import Image from "next/image";
import HeadingBlock from "@/components/ui/HeadingBlock";

const AboutSection = () => {
  return (
    <section className="bg-[#FFF8F4]  py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto flex flex-col gap-10 sm:gap-12">
        <HeadingBlock badge="Who We Are" heading={{ prefix: "About", highlight: "Us", suffix: "" }} weight="regular" />

        <p className="text-base leading-relaxed text-text-secondary sm:text-lg sm:leading-8">
          With over 20 years of experience across North America, the GCC, and international markets, PRO RCS combines deep industry knowledge with a powerful network of trusted
          partners. Our team includes experienced restaurant consultants, chefs, technical professionals, legal advisors, auditors, marketing and branding experts, franchise
          specialists, and supply chain professionals. Together, we deliver comprehensive solutions that support every stage of business growth—from concept development and
          operational excellence to brand expansion, compliance, and market entry. Our goal is to provide clients with the expertise, guidance, and resources needed to build
          scalable, sustainable, and successful businesses.
        </p>

        <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
          <Image
            src={aboutImage}
            alt="PRO RCS team collaborating in a modern office"
            className="h-auto w-full object-cover"
            sizes="(max-width: 1220px) 100vw, 1220px"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
