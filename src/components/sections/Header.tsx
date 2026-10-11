import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { header } from "@/data/content";
import { HeaderShell } from "./HeaderShell";

export function Header() {
  return (
    <HeaderShell>
      <div className="container-content flex items-center justify-between">
        <a href="#top" aria-label="Skyven Residences, back to top" className="shrink-0">
          <Logo preload className="h-[34px] lg:h-[43px]" />
        </a>
        <Button
          variant="outline"
          size="header"
          href={header.cta.href}
        >
          {header.cta.label}
        </Button>
      </div>
    </HeaderShell>
  );
}
