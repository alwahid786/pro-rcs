import ServiceInnerCard from "@/components/landing-page/ServiceInnerCard";
import { serviceData } from "@/components/landing-page/service-data";
import HeadingBlock from "@/components/ui/HeadingBlock";
import Link from "next/link";

const ServiceSection = () => {
  return (
    <section className="relative container mx-auto flex flex-col items-center overflow-hidden bg-white px-5 py-16 sm:py-20 lg:py-24">
      <HeadingBlock badge="Our Services" heading={{ prefix: "Our", highlight: "Services", suffix: "" }} />

      <div className="w-full bg-red-300 flex gap-10 justify-between items-center">
        <nav>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-2 text-black">
              <span className="text-blue-500 text-2xl glass rounded-full px-4 py-3">01</span>
              <Link href="#consulting-strategy" className="text-lg font-medium px-4 py-3 glass rounded-full ">
                Consulting & Strategy
              </Link>
            </li>
            <li className="flex items-center gap-2 text-black">
              <span className="text-blue-500 text-2xl glass rounded-full px-4 py-3">01</span>
              <Link href="#consulting-strategy" className="text-lg font-medium px-4 py-3 glass rounded-full ">
                Consulting & Strategy
              </Link>
            </li>
            <li className="flex items-center gap-2 text-black">
              <span className="text-blue-500 text-2xl glass rounded-full px-4 py-3">01</span>
              <Link href="#consulting-strategy" className="text-lg font-medium px-4 py-3 glass rounded-full ">
                Consulting & Strategy
              </Link>
            </li>
            <li className="flex items-center gap-2 text-black">
              <span className="text-blue-500 text-2xl glass rounded-full px-4 py-3">01</span>
              <Link href="#consulting-strategy" className="text-lg font-medium px-4 py-3 glass rounded-full ">
                Consulting & Strategy
              </Link>
            </li>
            <li className="flex items-center gap-2 text-black">
              <span className="text-blue-500 text-2xl glass rounded-full px-4 py-3">01</span>
              <Link href="#consulting-strategy" className="text-lg font-medium px-4 py-3 glass rounded-full ">
                Consulting & Strategy
              </Link>
            </li>
          </ul>
        </nav>
        <div className=" bg-blue-300 ">
          {serviceData.map((service) => (
            <ServiceInnerCard key={service.category} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
