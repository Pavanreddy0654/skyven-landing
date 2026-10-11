import { JsonLd } from "@/components/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { faq } from "@/data/content";

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section aria-labelledby="faq-title" className="bg-navy-900 pt-section">
      <JsonLd data={jsonLd} />
      <div className="container-content">
        <h2 id="faq-title" className="inline-block border-b border-ivory/80 pb-1.5 font-display text-h2 text-cream">
          {faq.title}
        </h2>
        <Reveal className="mt-6 md:mt-8">
          <Accordion
            headingLevel="h3"
            // All answers open by default, as in the design; each can be closed on its own
            allowMultiple
            defaultOpen={faq.items.map((_, i) => i)}
            triggerClassName="py-5 text-[17px] font-medium text-ivory md:text-[clamp(16px,1.39vw,22px)]"
            contentClassName="pb-6 text-[15px] leading-relaxed text-ivory/75 md:text-body"
            items={faq.items.map((item) => ({
              id: item.question,
              title: item.question,
              content: <p>{item.answer}</p>,
            }))}
          />
        </Reveal>
      </div>
    </section>
  );
}
