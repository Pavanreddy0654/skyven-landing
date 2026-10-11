import { mapEmbed } from "@/data/content";

export function MapEmbed() {
  return (
    <section aria-label="Map" className="bg-navy-900 pt-12 md:pt-16">
      <div className="container-content">
        <iframe
          src={mapEmbed.src}
          title={mapEmbed.title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[300px] w-full border-0 md:h-[390px]"
        />
      </div>
    </section>
  );
}
