import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
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
      <Carousel
        className="mt-8 md:mt-10"
        label="Rooftop clubhouse amenities"
        slides={rooftop.slides}
        tone="light"
        imageClassName="aspect-[335/319] md:aspect-[808/456]"
        sizes="(min-width: 768px) 808px, 88vw"
      />
      <div className="mt-8 flex justify-center">
        <Button href={rooftop.cta.href}>{rooftop.cta.label}</Button>
      </div>
    </section>
  );
}
