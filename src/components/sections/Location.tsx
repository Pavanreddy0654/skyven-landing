import Image from "next/image";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { GlowDivider } from "@/components/ui/GlowDivider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { location, type LocationEntry } from "@/data/content";

function Entry({ place, time, note, emphasis }: LocationEntry) {
  return (
    <li className={emphasis ? "mb-1" : undefined}>
      <span className={emphasis ? "text-[17px] font-semibold text-ivory md:text-[19px]" : "text-ivory/90"}>
        {place} - <strong className="font-bold text-ivory">{time}</strong>
      </span>
      {note && <span className="mt-1 block text-ivory/80">{note}</span>}
    </li>
  );
}

export function Location() {
  return (
    <section aria-labelledby="location-title" className="bg-navy-900 pb-section">
      <div className="container-content">
        <GlowDivider className="mx-auto mb-4" />
        <SectionHeading
          id="location-title"
          eyebrow={location.eyebrow}
          title={location.title}
          subtitle={location.subtitle}
        />

        <div className="mt-10 grid items-start gap-10 md:mt-14 md:grid-cols-2 md:gap-8 lg:grid-cols-[45%_55%] lg:gap-0">
          <div className="relative aspect-[860/848] w-full md:order-last lg:w-[calc(100%+10vw)] lg:max-w-[860px]">
            <Image src={location.map.src} alt={location.map.alt} fill sizes="(min-width: 1024px) 60vw, (min-width: 768px) 50vw, 100vw" className="object-contain" />
          </div>

          <div className="lg:pr-10">
            <Accordion
              allowMultiple
              divided={false}
              headingLevel="h3"
              defaultOpen={location.categories.flatMap((c, i) => (c.open ? [i] : []))}
              triggerClassName="py-4"
              items={location.categories.map((category) => ({
                id: category.title,
                title: (
                  <span className="inline-block border-b border-ivory/70 pb-1.5 font-display text-h3 text-ivory">
                    {category.title}
                  </span>
                ),
                content: (
                  <ul className="space-y-2 pb-4 text-[15px] md:text-body">
                    {category.entries.map((entry) => (
                      <Entry key={entry.place} {...entry} />
                    ))}
                  </ul>
                ),
              }))}
            />
            <Button href={location.cta.href} className="mt-8 w-full md:w-auto">
              {location.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
