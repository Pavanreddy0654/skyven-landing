import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import { footer, site } from "@/data/content";

const row = "flex items-center justify-center gap-3 border-b border-line py-4 md:justify-start";

export function Footer() {
  return (
    <footer className="bg-navy-900 pt-[clamp(140px,calc(60px+16vw),300px)] pb-10 md:pb-16">
      {/* Silver gradient fading toward the bottom of the letters (§6.16) */}
      <p className="footer-tagline bg-linear-to-b from-[#eef1f5] via-[#aab3bf] to-[#aab3bf]/25 bg-clip-text text-center font-display text-[36px] leading-[1.1] text-transparent md:text-[6.5vw] md:leading-none md:whitespace-nowrap">
        <span className="block md:inline">{footer.tagline[0]}</span>{" "}
        <span className="block md:inline">{footer.tagline[1]}</span>
      </p>

      <div className="mt-[clamp(80px,12vw,180px)] container-content flex flex-col items-center text-center md:grid md:grid-cols-[1fr_46%] md:grid-rows-[auto_1fr] md:items-start md:text-left">
        <Logo variant="footer" className="h-[85px] md:col-start-1 md:row-start-1 md:h-[91px]" />

        <ul className="mt-8 w-full text-[15px] text-ivory md:col-start-2 md:row-span-2 md:row-start-1 md:mt-0 md:text-[clamp(15px,1.25vw,20px)]">
          <li className="border-b border-line py-4">
            <address className="flex items-start gap-3 not-italic">
              <Image src="/assets/icons/location-pin.svg" alt="" width={16} height={20} className="mt-1 shrink-0" />
              <span className="text-left">{site.address.full}</span>
            </address>
          </li>
          <li className={row}>RERA No: {site.rera}</li>
          <li className={row}>
            <a href={site.phone.href} className="flex items-center gap-3 hover:text-gold">
              <Image src="/assets/icons/phone.svg" alt="" width={18} height={18} />
              <span>
                <span className="sr-only">Call </span>
                {site.phone.display}
              </span>
            </a>
          </li>
          <li className={`${row} border-b-0`}>
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-gold"
            >
              <span className="grid size-7 place-items-center rounded-full bg-[#25d366]">
                <Image src="/assets/icons/whatsapp.svg" alt="" width={14} height={13} />
              </span>
              <span>
                <span className="sr-only">WhatsApp </span>
                {site.whatsapp.display}
              </span>
            </a>
          </li>
        </ul>

        <p className="mt-8 max-w-[18rem] text-[13px] leading-relaxed text-ivory/90 md:col-start-1 md:row-start-2 md:mt-10 md:max-w-[17rem] md:text-small">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
