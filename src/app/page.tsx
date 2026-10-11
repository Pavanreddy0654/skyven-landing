import { CloserLook } from "@/components/sections/CloserLook";
import { Clubhouse456 } from "@/components/sections/Clubhouse456";
import { Comparison } from "@/components/sections/Comparison";
import { ConstructionUpdate } from "@/components/sections/ConstructionUpdate";
import { Engineering } from "@/components/sections/Engineering";
import { EnquireBar } from "@/components/sections/EnquireBar";
import { Gallery } from "@/components/sections/Gallery";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Location } from "@/components/sections/Location";
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
      </main>
    </>
  );
}
