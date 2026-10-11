import { JsonLd } from "@/components/JsonLd";
import { CloserLook } from "@/components/sections/CloserLook";
import { Clubhouse456 } from "@/components/sections/Clubhouse456";
import { Comparison } from "@/components/sections/Comparison";
import { ConstructionUpdate } from "@/components/sections/ConstructionUpdate";
import { Engineering } from "@/components/sections/Engineering";
import { EnquireBar } from "@/components/sections/EnquireBar";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Landmarks } from "@/components/sections/Landmarks";
import { Location } from "@/components/sections/Location";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { RooftopClubhouse } from "@/components/sections/RooftopClubhouse";
import { Usps } from "@/components/sections/Usps";
import { logo, seo, site, videos } from "@/data/content";
import { siteUrl } from "@/lib/site";

const address = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: `${site.address.locality}, ${site.address.city}`,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

// Structured data (§11.4), rendered on the server
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: site.name,
    description: seo.description,
    url: `${siteUrl}/`,
    image: `${siteUrl}${seo.ogImage.src}`,
    about: {
      "@type": "ApartmentComplex",
      name: site.name,
      numberOfAccommodationUnits: 210,
      address,
    },
    offers: {
      "@type": "Offer",
      price: seo.priceFrom,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: seo.developers.join(" & "),
    url: `${siteUrl}/`,
    logo: `${siteUrl}${logo.footer.src}`,
    telephone: site.phone.href.replace("tel:", ""),
    address,
  },
  ...Object.values(videos).map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.title,
    thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
    uploadDate: video.uploadDate,
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
  })),
];

export default function Home() {
  return (
    <>
      <JsonLd data={structuredData} />
      <Header />
      <main>
        <Hero />
        <EnquireBar />
        <Comparison />
        <CloserLook />
        <Usps />
        <RooftopClubhouse />
        <ConstructionUpdate />
        <Clubhouse456 />
        <Location />
        <Engineering />
        <Gallery />
        <Faq />
        <Landmarks />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
