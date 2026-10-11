import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clubhouse } from "@/data/content";

export function Clubhouse456() {
  return (
    <section aria-labelledby="clubhouse-title" className="bg-navy-900 pb-section">
      {/* Full-bleed podium photo; the title sits on its faded lower edge from md up (below it on mobile) */}
      <div className="relative">
        {/* Show only the top ~62% of the photo: below 60% it is flat navy (A9), which left a large empty gap */}
        <div className="relative aspect-[375/300] overflow-hidden md:aspect-[1920/779]">
          <div className="absolute inset-x-0 top-0 h-[160%]">
            <Image
              src={clubhouse.background.src}
              alt={clubhouse.background.alt}
              fill
              sizes="(min-width: 768px) 100vw, 200vw"
              className="object-cover object-top"
            />
          </div>
        </div>
        <SectionHeading
          id="clubhouse-title"
          className="relative container-content mt-6 md:absolute md:inset-x-0 md:bottom-[3%] md:mt-0"
          title={clubhouse.title}
          lineBreaks="mobile"
          subtitle={clubhouse.subtitle}
          subtitleStyle="tagline"
        />
      </div>

      <Reveal className="relative mt-10 md:mt-12 lg:mt-16">
        <Carousel
          label="Clubhouse floors 4, 5 and 6 amenities"
          slides={clubhouse.slides}
          imageClassName="aspect-[335/319] md:aspect-[808/456]"
          sizes="(min-width: 768px) 808px, 88vw"
        />
      </Reveal>
      <div className="mt-8 flex justify-center">
        <Button href={clubhouse.cta.href}>{clubhouse.cta.label}</Button>
      </div>
    </section>
  );
}
