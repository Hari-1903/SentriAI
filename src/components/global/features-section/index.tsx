import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="container max-w-[1400px] mx-auto px-4 py-20 items-center justify-between">
      <div className="flex flex-col items-center text-center space-y-10 mb-16 justify-between">
        <h2 className="text-4xl font-bold leading-tight tracking-tight lg:text-6xl max-w-3xl">
          Revolutionize Your Workflow with AI
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl">
          SentriAI harnesses the power of artificial intelligence to streamline
          your operations. Experience enhanced productivity and efficiency like
          never before.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mb-16">
        <div className="flex flex-col space-y-4">
          <Image
            src="/placeholder.svg"
            alt="Intelligent Task Management"
            width={400}
            height={300}
            className="rounded-lg object-cover w-full"
          />
          <h3 className="text-xl font-semibold">
            Intelligent Task Management for Optimal Efficiency
          </h3>
          <p className="text-gray-600">
            Prioritize tasks intelligently to maximize your team's output.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <Image
            src="/placeholder.svg"
            alt="Automated Workflow"
            width={400}
            height={300}
            className="rounded-lg object-cover w-full"
          />
          <h3 className="text-xl font-semibold">
            Automated Workflow Optimization for Seamless Operations
          </h3>
          <p className="text-gray-600">
            Streamline processes automatically, reducing manual effort.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <Image
            src="/placeholder.svg"
            alt="Real-Time Monitoring"
            width={400}
            height={300}
            className="rounded-lg object-cover w-full"
          />
          <h3 className="text-xl font-semibold">
            Real-Time Monitoring for Proactive Management
          </h3>
          <p className="text-gray-600">
            Stay informed with live updates on your workflows.
          </p>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Button variant="outline" className="border-gray-200">
          Learn More
        </Button>
        <Button variant="outline" className="border-gray-200 group">
          Sign Up
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
}
