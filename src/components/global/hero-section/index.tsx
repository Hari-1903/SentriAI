import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="container flex flex-col gap-8 py-8 md:min-h-[calc(100vh-4rem)] md:py-12 lg:flex-row lg:items-center">
      <div className="flex flex-col items-start gap-4 lg:w-1/2">
        <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
          Transform Your BPO Workflow with AI
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          SentriAI offers an innovative, AI-powered solution tailored to address
          critical challenges in workflow management and task prioritization
          within BPOs. By leveraging AI, SentriAI transforms repetitive and
          inefficient systems into streamlined, intelligent workflows.
        </p>
        <div className="flex gap-4">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center lg:w-1/2">
        <Image
          src="/placeholder.svg"
          alt="SentriAI Platform Preview"
          width={580}
          height={420}
          className="rounded-lg object-cover"
          priority
        />
      </div>
    </section>
  );
}
