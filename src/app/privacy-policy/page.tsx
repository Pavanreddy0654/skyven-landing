import type { Metadata } from "next";
import { ContactLinks, SubpageLayout } from "@/components/SubpageLayout";
import { Button } from "@/components/ui/Button";
import { privacyPolicy, site } from "@/data/content";

// Standalone page, intentionally not linked from the landing page.
export const metadata: Metadata = {
  title: privacyPolicy.metaTitle,
  description: privacyPolicy.metaDescription,
  alternates: { canonical: privacyPolicy.path },
};

export default function PrivacyPolicyPage() {
  return (
    <SubpageLayout>
      <article aria-labelledby="privacy-title" className="container-content pt-10 md:pt-16">
        <div className="mx-auto max-w-[52rem]">
          <h1 id="privacy-title" className="font-display text-h2 text-ivory">
            {privacyPolicy.title}
          </h1>
          <p className="mt-3 text-small text-ivory/60">{privacyPolicy.lastUpdated}</p>
          <p className="mt-8 text-body text-ivory/85">{privacyPolicy.intro}</p>

          {privacyPolicy.sections.map((section) => (
            <section key={section.heading} className="mt-10 border-t border-line pt-8">
              <h2 className="font-display text-h3 text-gold">{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p} className="mt-4 text-body text-ivory/85">
                  {p}
                </p>
              ))}
              {"list" in section && section.list && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-body text-ivory/85 marker:text-gold">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className="mt-10 border-t border-line pt-8">
            <h2 className="font-display text-h3 text-gold">{privacyPolicy.contactHeading}</h2>
            <p className="mt-4 text-body text-ivory/85">{privacyPolicy.contactIntro}</p>
            <address className="mt-4 text-body text-ivory/85 not-italic">{site.address.full}</address>
            <ContactLinks className="mt-5 flex flex-col gap-4 text-[15px] text-ivory sm:flex-row sm:gap-8 md:text-body" />
          </section>

          <Button href={privacyPolicy.cta.href} className="mt-12 w-full md:w-auto">
            {privacyPolicy.cta.label}
          </Button>
        </div>
      </article>
    </SubpageLayout>
  );
}
