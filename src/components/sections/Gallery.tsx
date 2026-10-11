import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { GlowDivider } from "@/components/ui/GlowDivider";
import { LightboxGroup, LightboxItem } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gallery, type Image as GalleryImage } from "@/data/content";

/** Mosaic tile; clicking it opens the image in the full-screen viewer */
function Tile({ image, index, aspect, sizes }: { image: GalleryImage; index: number; aspect: string; sizes: string }) {
  return (
    <LightboxItem index={index} label={image.alt} className={`relative overflow-hidden ${aspect}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </LightboxItem>
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
        <Reveal className="mt-12 hidden md:block">
          <LightboxGroup images={gallery.mosaic}>
            <div className="grid grid-cols-[606fr_426fr] gap-4 lg:gap-6">
              <Tile image={aerial} index={0} aspect="aspect-[606/454]" sizes="58vw" />
              <Tile image={pool} index={1} aspect="aspect-[426/454]" sizes="41vw" />
            </div>
            <div className="mt-4 grid grid-cols-3 items-start gap-4 lg:mt-6 lg:gap-6">
              <Tile image={podium} index={2} aspect="aspect-[336/430]" sizes="32vw" />
              <div>
                <Tile image={balconies} index={3} aspect="aspect-square" sizes="32vw" />
                <div className="mt-8 flex justify-center">
                  <Button href={gallery.cta.href}>{gallery.cta.label}</Button>
                </div>
              </div>
              <Tile image={terrace} index={4} aspect="aspect-[336/430]" sizes="32vw" />
            </div>
          </LightboxGroup>
        </Reveal>
      </div>

      {/* Mobile: swipe carousel with dots; tapping opens the larger mosaic images */}
      <Reveal className="mt-10 container-content md:hidden">
        <Carousel
          bleed={false}
          label="Skyven gallery"
          slides={gallery.mobile}
          slideClassName="basis-full"
          imageClassName="aspect-[336/200]"
          sizes="100vw"
          dots
          lightbox
          lightboxImages={gallery.mosaic}
        />
        <div className="mt-6 flex justify-center">
          <Button href={gallery.cta.href}>{gallery.cta.label}</Button>
        </div>
      </Reveal>
    </section>
  );
}
