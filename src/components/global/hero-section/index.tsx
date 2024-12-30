import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="container max-w-[1400px] mx-auto px-4 py-20">
      <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
        <div className="flex flex-col justify-center space-y-8">
          <h1 className="text-5xl font-bold leading-tight tracking-tight lg:text-6xl">
            Transform Your BPO Workflow with AI
          </h1>
          <p className="text-lg text-gray-600">
            SentriAI offers an innovative, AI-powered solution tailored to
            address critical challenges in workflow management and task
            prioritization within BPOs. By leveraging AI, SentriAI transforms
            repetitive and inefficient systems into streamlined, intelligent
            workflows.
          </p>
          <div className="flex space-x-4">
            <Button
              size="lg"
              className="bg-[#0F172A] text-white hover:bg-[#1E293B]"
            >
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-gray-200">
              Learn More
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="/placeholder.svg"
            alt="SentriAI Platform Preview"
            width={580}
            height={420}
            className="rounded-lg object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
