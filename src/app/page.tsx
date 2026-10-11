import { CloserLook } from "@/components/sections/CloserLook";
import { Comparison } from "@/components/sections/Comparison";
import { ConstructionUpdate } from "@/components/sections/ConstructionUpdate";
import { EnquireBar } from "@/components/sections/EnquireBar";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
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
      </main>
    </>
  );
}
