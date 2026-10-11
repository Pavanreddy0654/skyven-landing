import { Reveal } from "@/components/ui/Reveal";
import { VideoCard } from "@/components/ui/VideoCard";
import { closerLook, videos } from "@/data/content";

export function CloserLook() {
  return (
    <section aria-labelledby="closer-look-title" className="bg-navy-900 pb-section">
      <div className="container-content">
        <h2 id="closer-look-title" className="text-center font-display text-h2 text-ivory">
          {closerLook.title}
        </h2>
      </div>
      <Reveal y={0} scale={0.96} className="mt-8 container-content md:mx-auto md:mt-12 md:w-wide">
        <VideoCard
          videoId={videos.closerLook.id}
          title={videos.closerLook.title}
          poster={videos.closerLook.poster}
          autoplayInView
          aspectClassName="aspect-video md:aspect-[1760/731]"
          sizes="(min-width: 768px) 92vw, 100vw"
        />
      </Reveal>
    </section>
  );
}
