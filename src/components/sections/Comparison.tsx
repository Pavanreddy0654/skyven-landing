import clsx from "clsx";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { comparison } from "@/data/content";

// Keep a figure and its unit on one line when the narrow mobile columns wrap ("913 sq. ft.")
const keepTogether = (value: string) => value.replace(/(\d) (sq\.) (ft\.)/g, "$1\u00a0$2\u00a0$3");

export function Comparison() {
  const { headers, rows } = comparison;
  const last = rows.length - 1; // the last table row has no divider below it

  return (
    <section aria-labelledby="comparison-title" className="bg-navy-900 py-section">
      <div className="container-content">
        <SectionHeading
          id="comparison-title"
          eyebrow={comparison.eyebrow}
          title={comparison.title}
          subtitle={comparison.subtitle}
        />

        <Reveal>
          {/* Desktop / tablet: table */}
          <table className="mt-12 hidden w-full table-fixed border-collapse text-left md:table lg:mt-16">
            <caption className="sr-only">{comparison.title.join(" ")}: Skyven compared with other projects</caption>
            <colgroup>
              <col className="w-[49%]" />
              <col className="w-[28%]" />
              <col className="w-[23%]" />
            </colgroup>
            <thead>
              <tr>
                {[headers.value, headers.skyven, headers.others].map((h) => (
                  <th key={h} scope="col" className="pb-8 align-bottom font-normal lg:pb-12">
                    <span className="inline-block border-b border-cream/80 pb-1.5 font-display text-h3 text-cream">
                      {h}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={clsx(i < last && "border-b border-line")}>
                  <th scope="row" className="py-7 pr-6 align-middle font-normal lg:py-9">
                    <span className="block text-[15px] text-ivory lg:text-body">{row.label}</span>
                    <span className="mt-1 block text-small text-ivory/60">{row.sub}</span>
                  </th>
                  <td className="py-7 pr-6 align-middle text-[15px] text-ivory lg:py-9 lg:text-body">{row.skyven}</td>
                  <td className="py-7 align-middle text-[15px] text-ivory lg:py-9 lg:text-body">{row.others}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile: accordion */}
          <Accordion
            className="mt-10 md:hidden"
            headingLevel="h3"
            defaultOpen={[0]}
            triggerClassName="py-4 text-[18px] text-ivory aria-expanded:font-semibold"
            items={rows.map((row) => ({
              id: row.label,
              title: row.label,
              content: (
                <div className="pb-5">
                  <p className="text-small text-ivory/70">{row.sub}</p>
                  <dl className="mt-5 grid grid-cols-2">
                    <div className="min-w-0 pr-4">
                      <dt className="text-small uppercase">{headers.skyven}</dt>
                      <dd className="mt-1 font-display text-[17px] leading-snug break-words text-cream">{keepTogether(row.skyven)}</dd>
                    </div>
                    <div className="min-w-0 border-l border-line pl-4">
                      <dt className="text-small uppercase">{headers.others}</dt>
                      <dd className="mt-1 font-display text-[17px] leading-snug break-words text-cream">{keepTogether(row.others)}</dd>
                    </div>
                  </dl>
                </div>
              ),
            }))}
          />
        </Reveal>

        <div className="mt-10 flex justify-center md:mt-0">
          <Button href={comparison.cta.href} className="w-full md:w-auto">
            {comparison.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
