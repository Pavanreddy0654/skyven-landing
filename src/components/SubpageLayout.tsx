import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";
import { footer, site } from "@/data/content";

/** Simple frame for standalone pages (thank you, privacy policy): logo header, content, small footer. */
export function SubpageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="py-4 lg:py-5">
        <div className="container-content">
          <Link href="/" aria-label="Skyven Residences, back to the home page" className="inline-block">
            <Logo className="h-[34px] lg:h-[43px]" />
          </Link>
        </div>
      </header>
      <main className="pb-section">{children}</main>
      <footer className="border-t border-line py-8">
        <div className="container-content flex flex-col items-center gap-2 text-center text-small text-ivory/70 md:flex-row md:justify-between md:text-left">
          <p>{footer.copyright}</p>
          <p>{footer.rera}</p>
        </div>
      </footer>
    </>
  );
}

/** Phone and WhatsApp links, shared by the standalone pages */
export function ContactLinks({ className }: { className?: string }) {
  return (
    <ul className={className}>
      <li>
        <a href={site.phone.href} className="inline-flex items-center gap-3 hover:text-gold">
          <Image src="/assets/icons/phone.svg" alt="" width={18} height={18} />
          <span>
            <span className="sr-only">Call </span>
            {site.phone.display}
          </span>
        </a>
      </li>
      <li>
        <a
          href={site.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 hover:text-gold"
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
  );
}

