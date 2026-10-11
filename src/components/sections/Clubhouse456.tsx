import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clubhouse } from "@/data/content";

export function Clubhouse456() {
  return (
    <section aria-labelledby="clubhouse-title" className="bg-navy-900 pb-section">
      {/* Full-bleed podium photo; the title sits on its faded lower part from md up (below it on mobile) */}
      <div className="relative">
        <div className="relative aspect-[375/322] md:aspect-[1920/1247]">
          <Image
            src={clubhouse.background.src}
            alt={clubhouse.background.alt}
            fill
            sizes="100vw"
            className="object-cover object-[50%_20%] md:object-top"
          />
        </div>
        <SectionHeading
          id="clubhouse-title"
          className="relative container-content mt-6 md:absolute md:inset-x-0 md:top-[72%] md:mt-0"
          title={clubhouse.title}
          lineBreaks="mobile"
          subtitle={clubhouse.subtitle}
          subtitleStyle="tagline"
        />
      </div>

      <Carousel
        className="relative mt-10 md:-mt-[5.4vw]"
        label="Clubhouse floors 4, 5 and 6 amenities"
        slides={clubhouse.slides}
        imageClassName="aspect-[335/319] md:aspect-[808/456]"
        sizes="(min-width: 768px) 808px, 88vw"
      />
      <div className="mt-8 flex justify-center">
        <Button href={clubhouse.cta.href}>{clubhouse.cta.label}</Button>
      </div>
    </section>
  );
}
