import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { GlowDivider } from "@/components/ui/GlowDivider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landmarks } from "@/data/content";

export function Landmarks() {
  return (
    <section aria-labelledby="landmarks-title" className="bg-navy-900 pt-section">
      <div className="container-content">
        <GlowDivider className="mx-auto mb-6 md:mb-10" />
        <SectionHeading
          id="landmarks-title"
          eyebrow={landmarks.eyebrow}
          title={landmarks.title}
          subtitle={landmarks.subtitle}
        />
        <Reveal className="mx-auto mt-10 max-w-[808px] md:mt-14">
          <EnquiryForm layout="grid" source="landmarks" />
        </Reveal>
      </div>
    </section>
  );
}
