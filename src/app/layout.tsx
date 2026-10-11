import type { Metadata, Viewport } from "next";
import { Aboreto, Karla } from "next/font/google";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { seo, site } from "@/data/content";
import { isProduction, siteUrl } from "@/lib/site";
import "./globals.css";

const aboreto = Aboreto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-aboreto",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seo.title,
  description: seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: "/",
    siteName: site.name,
    locale: "en_IN",
    type: "website",
    images: [seo.ogImage.src].map((url) => ({ ...seo.ogImage, url })),
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage.src],
  },
  // Staging / preview deployments stay out of search results (§11.2)
  robots: isProduction ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#021021",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${aboreto.variable} ${karla.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
