import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoCard } from "@/components/ui/VideoCard";
import { usps, videos } from "@/data/content";

export function Usps() {
  return (
    <section id="usps" aria-labelledby="usps-title" className="scroll-mt-20 bg-cream pt-section">
      <div className="container-content">
        <SectionHeading id="usps-title" title={usps.title} tone="light" />
        <VideoCard
          className="mt-8 md:mt-10"
          videoId={videos.usps.id}
          title={videos.usps.title}
          poster={videos.usps.poster}
          aspectClassName="aspect-video md:aspect-[1224/731]"
        />
        <div className="mt-8 flex justify-center">
          <Button href={usps.cta.href}>{usps.cta.label}</Button>
        </div>
      </div>
    </section>
  );
}
