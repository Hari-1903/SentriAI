import { HeroSection } from "@/components/global/hero-section";
import { SiteHeader } from "@/components/global/site-header";
import { TransformSection } from "@/components/global/transform-section";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center">
      <div className="w-full ">
        <SiteHeader />
        <main className="flex flex-col items-center w-full justify-between mt-40 gap-y-20 ">
          <HeroSection />
          <TransformSection />
        </main>
      </div>
    </div>
  );
}
