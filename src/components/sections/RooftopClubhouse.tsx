import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { rooftop } from "@/data/content";

export function RooftopClubhouse() {
  return (
    <section aria-labelledby="rooftop-title" className="bg-cream pt-section">
      <SectionHeading
        id="rooftop-title"
        className="container-content"
        title={rooftop.title}
        subtitle={rooftop.subtitle}
        subtitleStyle="tagline"
        tone="light"
      />
      <Reveal className="mt-8 md:mt-10">
        <Carousel
          label="Rooftop clubhouse amenities"
          slides={rooftop.slides}
          tone="light"
          imageClassName="aspect-[335/319] md:aspect-[808/456]"
          sizes="(min-width: 768px) 808px, 88vw"
          lightbox
        />
      </Reveal>
      <div className="mt-8 flex justify-center">
        <Button href={rooftop.cta.href}>{rooftop.cta.label}</Button>
      </div>
    </section>
  );
}
