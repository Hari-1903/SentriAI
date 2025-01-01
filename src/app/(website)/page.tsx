import { DiscoverSection } from "@/components/global/discover-section";
import { EfficiencySection } from "@/components/global/efficiency-section";
import { FeaturesSection } from "@/components/global/features-section";
import { HeroSection } from "@/components/global/hero-section";
import { SiteHeader } from "@/components/global/site-header";
import { TestimonialsSection } from "@/components/global/testimonials-section";
import { TransformSection } from "@/components/global/transform-section";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center">
      <div className="w-full ">
        <SiteHeader />
        <main className="flex flex-col items-center w-full justify-between mt-40 gap-y-20 ">
          <HeroSection />
          <TransformSection />
          <FeaturesSection />
          <EfficiencySection />
          <DiscoverSection />
          <TestimonialsSection />
        </main>
      </div>
    </div>
  );
}
