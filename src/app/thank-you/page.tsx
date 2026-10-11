import type { Metadata } from "next";
import { ContactLinks, SubpageLayout } from "@/components/SubpageLayout";
import { Button } from "@/components/ui/Button";
import { GlowDivider } from "@/components/ui/GlowDivider";
import { thankYou } from "@/data/content";

// Shown after a successful enquiry. Kept out of search results (and not linked from the landing page).
export const metadata: Metadata = {
  title: thankYou.metaTitle,
  alternates: { canonical: thankYou.path },
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <SubpageLayout>
      <section
        aria-labelledby="thank-you-title"
        className="container-content flex min-h-[60vh] flex-col items-center justify-center pt-12 text-center md:pt-20"
      >
        <GlowDivider className="mb-6" />
        <p className="mb-3 font-display text-eyebrow text-gold">{thankYou.eyebrow}</p>
        <h1 id="thank-you-title" className="font-display text-display-xl text-ivory">
          {thankYou.title}
        </h1>
        <p role="status" className="mt-5 max-w-[34rem] text-body text-ivory/85">
          {thankYou.message}
        </p>
        <p className="mt-8 text-small text-ivory/70">{thankYou.contactLead}</p>
        <ContactLinks className="mt-4 flex flex-col items-center gap-4 text-[15px] text-ivory sm:flex-row sm:gap-8 md:text-body" />
        <Button href={thankYou.cta.href} className="mt-10 w-full max-w-[18rem] md:w-auto">
          {thankYou.cta.label}
        </Button>
      </section>
    </SubpageLayout>
  );
}
