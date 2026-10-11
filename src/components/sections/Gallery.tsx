import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { GlowDivider } from "@/components/ui/GlowDivider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gallery, type Image as GalleryImage } from "@/data/content";

function Tile({ image, aspect, sizes }: { image: GalleryImage; aspect: string; sizes: string }) {
  return (
    <div className={`relative w-full overflow-hidden ${aspect}`}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

export function Gallery() {
  const [aerial, pool, podium, balconies, terrace] = gallery.mosaic;

  return (
    <section aria-labelledby="gallery-title" className="bg-navy-800 pt-section pb-section">
      <div className="container-content">
        <GlowDivider className="mx-auto mb-4" />
        <SectionHeading id="gallery-title" eyebrow={gallery.eyebrow} title={gallery.title} />

        {/* Desktop / tablet mosaic: 2 on top, 3 below, button under the middle image */}
        <div className="mt-12 hidden md:block">
          <div className="grid grid-cols-[606fr_426fr] gap-4 lg:gap-6">
            <Tile image={aerial} aspect="aspect-[606/454]" sizes="58vw" />
            <Tile image={pool} aspect="aspect-[426/454]" sizes="41vw" />
          </div>
          <div className="mt-4 grid grid-cols-3 items-start gap-4 lg:mt-6 lg:gap-6">
            <Tile image={podium} aspect="aspect-[336/430]" sizes="32vw" />
            <div>
              <Tile image={balconies} aspect="aspect-square" sizes="32vw" />
              <div className="mt-8 flex justify-center">
                <Button href={gallery.cta.href}>{gallery.cta.label}</Button>
              </div>
            </div>
            <Tile image={terrace} aspect="aspect-[336/430]" sizes="32vw" />
          </div>
        </div>
      </div>

      {/* Mobile: swipe carousel with dots */}
      <div className="mt-10 container-content md:hidden">
        <Carousel
          bleed={false}
          label="Skyven gallery"
          slides={gallery.mobile}
          slideClassName="basis-full"
          imageClassName="aspect-[336/200]"
          sizes="100vw"
          dots
        />
        <div className="mt-6 flex justify-center">
          <Button href={gallery.cta.href}>{gallery.cta.label}</Button>
        </div>
      </div>
    </section>
  );
}
