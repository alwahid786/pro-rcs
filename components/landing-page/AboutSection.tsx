import aboutImage from "@/assets/imgs/about-img.png";
import Badge from "@/components/ui/Badge";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="bg-[#FFF8F4] px-5 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-305">
        <Badge showIcon text="Who We Are" />

        <h2 className="mt-6 text-[2rem] font-bold uppercase leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-[3.25rem]">
          About <span className="text-primary">Us</span>
        </h2>

        <p className="mt-6 max-w-5xl text-sm leading-relaxed text-text-secondary sm:mt-8 sm:text-base sm:leading-8">
          With over 20 years of experience across North America, the GCC, and international markets, PRO RCS combines deep
          industry knowledge with a powerful network of trusted partners. Our team includes experienced restaurant consultants,
          chefs, technical professionals, legal advisors, auditors, marketing and branding experts, franchise specialists, and
          supply chain professionals. Together, we deliver comprehensive solutions that support every stage of business
          growth—from concept development and operational excellence to brand expansion, compliance, and market entry. Our goal
          is to provide clients with the expertise, guidance, and resources needed to build scalable, sustainable, and
          successful businesses.
        </p>

        <div className="mt-10 overflow-hidden rounded-2xl sm:mt-12 sm:rounded-3xl">
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
