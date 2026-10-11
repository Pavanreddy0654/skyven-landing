import type { Metadata } from "next";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { GlowDivider } from "@/components/ui/GlowDivider";
import { Logo } from "@/components/ui/Logo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoCard } from "@/components/ui/VideoCard";
import { comparison, faq, gallery, rooftop, videos } from "@/data/content";

// Step 1 test page: colours and type scale. Removed before launch (Step 10).
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const colors = [
  ["navy-900", "bg-navy-900", "#021021"],
  ["navy-800", "bg-navy-800", "#02152C"],
  ["cream", "bg-cream", "#FFF5D9"],
  ["gold", "bg-gold", "#E5D37D"],
  ["gold-deep", "bg-gold-deep", "#B0A562"],
  ["ivory", "bg-ivory", "#F5F3EC"],
  ["ivory-muted", "bg-ivory-muted", "rgba(245,243,236,0.7)"],
  ["ink", "bg-ink", "#1A1A1A"],
  ["line", "bg-line", "rgba(255,255,255,0.25)"],
  ["btn-from", "bg-btn-from", "#E9D9B8"],
  ["btn-to", "bg-btn-to", "#FFFBEF"],
] as const;

const type = [
  ["display-xxl", "font-display text-display-xxl", "A LIVING THAT'S ABOVE ALL"],
  ["display-xl", "font-display text-display-xl", "KOKAPET'S TALLEST SINGLE TOWER"],
  ["h2", "font-display text-h2", "EVERY RUPEE EXTRA SHOULD COME WITH A REASON"],
  ["h3", "font-display text-h3", "HIGH-SPEED ELEVATORS"],
  ["eyebrow", "font-display text-eyebrow text-gold", "CLOSE TO EVERYTHING"],
  ["body", "text-body", "Ask what each number actually buys you, not just what it says."],
  ["small", "text-small text-ivory-muted", "More home for every crore invested"],
  ["micro", "text-micro text-ivory-muted", "RERA: P02400009501"],
  ["button", "text-button font-medium uppercase", "BOOK A SITE VISIT"],
] as const;

export default function StyleguidePage() {
  return (
    <main className="py-section">
      <div className="container-content space-y-16">
        <section>
          <h1 className="font-display text-h2">Colours</h1>
          <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {colors.map(([name, cls, hex]) => (
              <li key={name}>
                <div className={`${cls} h-20 border border-line`} />
                <p className="mt-2 text-small">{name}</p>
                <p className="text-micro text-ivory-muted">{hex}</p>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-h2">Type scale</h2>
          <ul className="mt-6 space-y-8">
            {type.map(([name, cls, sample]) => (
              <li key={name} className="border-b border-line pb-6">
                <p className="mb-2 text-micro text-ivory-muted">{name}</p>
                <p className={cls}>{sample}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="bg-cream p-8 text-ink">
          <h2 className="font-display text-eyebrow text-ink">CONSTRUCTION UPDATE - AUGUST 2026</h2>
          <p className="mt-3 font-display text-h2 text-gold-deep">ONE FLOOR CLOSER TO THE SKY</p>
          <p className="mt-4 text-body text-ink/70">Gold-deep on cream (see §3.1 note).</p>
        </section>
        <section className="space-y-10">
          <h2 className="font-display text-h2">Components</h2>
          <div className="flex flex-wrap items-center gap-6">
            <Logo />
            <Logo variant="footer" className="h-16" />
            <Button>EXPLORE SKYVEN</Button>
            <Button variant="outline" href="#enquire">ENQUIRE NOW</Button>
          </div>
          <GlowDivider className="mx-auto" />
          <SectionHeading eyebrow={comparison.eyebrow} title={comparison.title} subtitle={comparison.subtitle} />
          <Accordion
            items={faq.items.map((item, i) => ({
              id: String(i),
              title: <span className="text-body font-medium">{item.question}</span>,
              content: <p className="pb-5 text-small text-ivory/75">{item.answer}</p>,
            }))}
            defaultOpen={[0]}
            triggerClassName="py-5"
          />
          <VideoCard videoId={videos.usps.id} title={videos.usps.title} poster={videos.usps.poster} />
          <VideoCard videoId={videos.construction.id} title={videos.construction.title} />
          <div className="border border-ivory/60 p-5 md:p-6" id="enquire">
            <EnquiryForm layout="inline" source="styleguide-inline" />
          </div>
          <EnquiryForm layout="grid" source="styleguide-grid" className="mx-auto max-w-[600px]" />
        </section>
      </div>
      <div className="mt-16 bg-cream py-section">
        <Carousel label="Rooftop clubhouse" slides={rooftop.slides} tone="light" sizes="(min-width: 768px) 56vw, 88vw" />
      </div>
      <div className="py-section md:hidden">
        <Carousel label="Gallery" slides={gallery.mobile} slideClassName="basis-full" imageClassName="aspect-[336/200]" sizes="100vw" dots />
      </div>
    </main>
  );
}
