import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { GlowDivider } from "@/components/ui/GlowDivider";
import { enquiry } from "@/data/content";

/**
 * Enquire card in the dark area under the hero (§6.3). In every frame the card's top sits at
 * y ≈ 1940 and the next section's eyebrow at y ≈ 3111, so the top gap is derived from the hero
 * height and the large space below is kept (H3).
 */
export function EnquireBar() {
  return (
    <section
      aria-labelledby="enquire-title"
      className="bg-navy-900 pt-[calc(181*var(--m))] pb-[600px] md:pt-[clamp(48px,calc(1940px-var(--t)-1856*var(--u)),260px)] md:pb-[770px]"
    >
      <div
        id="enquire"
        className="relative container-content scroll-mt-28 border border-cream/80 bg-navy-900 px-5 pt-7 pb-8 md:px-[38px] md:pt-[30px] md:pb-[34px]"
      >
        <GlowDivider floating className="top-0 left-[70%] w-[min(220px,55vw)] -translate-1/2 md:left-3/4 md:w-[340px] lg:w-[448px]" />
        <h2
          id="enquire-title"
          className="mb-6 font-display text-[24px] leading-tight md:mb-7 md:text-[clamp(28px,calc(33px+0.625vw),45px)]"
        >
          {enquiry.title}
        </h2>
        <EnquiryForm layout="inline" source="hero-bar" />
      </div>
    </section>
  );
}
