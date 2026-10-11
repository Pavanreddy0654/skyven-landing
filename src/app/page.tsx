import { Comparison } from "@/components/sections/Comparison";
import { EnquireBar } from "@/components/sections/EnquireBar";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <EnquireBar />
        <Comparison />
      </main>
    </>
  );
}
