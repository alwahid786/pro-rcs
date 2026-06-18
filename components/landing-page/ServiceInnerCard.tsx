import Image from "next/image";
import React from "react";

const ServiceInnerCard = ({
  title,
  description,
  listItems,
  image,
  imageMobile,
}: {
  title: string;
  description: string;
  listItems: string[];
  image: string;
  imageMobile: string;
}) => {
  return (
    <section className="container mx-auto bg-pink-300">
      <article className="relative max-w-225 overflow-hidden">
        <div
          className="hidden max-[900px]:block absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageMobile})`,
          }}
        />

        <div
          className="
        absolute top-3.75 left-0 z-10
        px-6 py-4
        text-xl font-medium text-black
        glass rounded-full
        max-[900px]:static
        max-[900px]:inline-block
        max-[900px]:mb-6
        max-[900px]:ml-5
        max-[900px]:mt-5
        max-[900px]:text-white
      "
        >
          {title}
        </div>

        <Image src={image} alt="service" className="w-full h-full object-contain max-[900px]:hidden" priority />

        <div
          className="
        absolute bottom-0 right-0 z-10
        flex flex-col gap-4
        p-4 text-base text-white

        max-[900px]:static
        max-[900px]:p-6
      "
        >
          <p>{description}</p>

          <ul className="flex flex-col gap-2 pl-4 list-disc list-inside">
            {listItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
};

export default ServiceInnerCard;
