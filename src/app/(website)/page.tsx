import { HeroSection } from "@/components/global/hero-section";
import { SiteHeader } from "@/components/global/site-header";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center">
      <div className="w-full">
        <SiteHeader />
        <main className="flex-1">
          <HeroSection />
        </main>
      </div>
    </div>
  );
}
