import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export function EfficiencySection() {
  return (
    <section className="container max-w-[1400px] mx-auto px-4 py-20">
      <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
        <div className="flex flex-col justify-center space-y-8">
          <h2 className="text-4xl font-bold leading-tight tracking-tight lg:text-6xl">
            Unlock Your BPO's Full Potential with AI
          </h2>
          <p className="text-xl text-gray-600">
            SentriAI revolutionizes workflow management for BPOs, enhancing
            productivity and accuracy. Experience a significant reduction in
            operational costs while streamlining your processes.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <Check className="h-5 w-5 text-gray-800" />
              <span className="text-gray-600">
                Boost productivity with intelligent task prioritization.
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <Check className="h-5 w-5 text-gray-800" />
              <span className="text-gray-600">
                Cut costs with automated workflow solutions.
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <Check className="h-5 w-5 text-gray-800" />
              <span className="text-gray-600">
                Achieve higher accuracy in task execution.
              </span>
            </li>
          </ul>
          <div className="flex space-x-4">
            <Button variant="outline" className="border-gray-200">
              Learn More
            </Button>
            <Button variant="outline" className="border-gray-200 group">
              Sign Up
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="/placeholder.svg"
            alt="BPO Efficiency Illustration"
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
