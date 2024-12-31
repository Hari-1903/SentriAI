import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function TransformSection() {
  return (
    <section className="container w-full mx-auto px-4 py-20 mt-20">
      <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
        <div className="flex items-center justify-center">
          <Image
            src="/placeholder.svg"
            alt="SentriAI Workflow Transformation"
            width={580}
            height={420}
            className="rounded-lg object-cover"
            priority
          />
        </div>
        <div className="flex flex-col justify-center space-y-8">
          <span className="text-sm font-medium">Transform</span>
          <h2 className="text-4xl font-bold leading-tight tracking-tight lg:text-6xl">
            Streamline Your Workflows with SentriAI
          </h2>
          <p className="text-xl text-gray-600">
            SentriAI revolutionizes your workflow by converting repetitive tasks
            into efficient, intelligent processes. Experience a new level of
            productivity and focus on what truly matters.
          </p>
          <div className="flex space-x-4">
            <Button variant="outline" className="border-gray-200">
              Discover
            </Button>
            <Button variant="outline" className="border-gray-200 group">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
