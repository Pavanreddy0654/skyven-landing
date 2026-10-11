import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoCard } from "@/components/ui/VideoCard";
import { construction, videos } from "@/data/content";

export function ConstructionUpdate() {
  return (
    <section aria-labelledby="construction-title" className="bg-cream py-section">
      <div className="container-content">
        <SectionHeading
          id="construction-title"
          eyebrow={construction.eyebrow}
          title={construction.title}
          subtitle={construction.subtitle}
          tone="light"
        />
        <VideoCard
          className="mt-8 md:mt-10"
          videoId={videos.construction.id}
          title={videos.construction.title}
          poster={videos.construction.poster}
        />
        <div className="mt-8 flex justify-center">
          <Button href={construction.cta.href}>{construction.cta.label}</Button>
        </div>
      </div>
    </section>
  );
}
