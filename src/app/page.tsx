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

export default function Home() {
  return (
    <>
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
