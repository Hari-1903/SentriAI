import { Box } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DiscoverSection() {
  return (
    <section className="container max-w-[1400px] mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold leading-tight tracking-tight lg:text-6xl mb-24 max-w-4xl">
        Discover How SentriAI Revolutionizes Workflow Management for BPOs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-20 gap-12">
        <div className="flex flex-col space-y-4">
          <Box className="h-8 w-8" />
          <h3 className="text-xl font-semibold">
            Seamless Integration with Your Existing Systems for Enhanced
            Efficiency
          </h3>
          <p className="text-gray-600 flex-grow">
            SentriAI effortlessly connects with your current tools, optimizing
            task prioritization.
          </p>
          <Button
            variant="link"
            className="text-gray-900 p-0 h-auto font-semibold hover:no-underline"
          >
            Learn More →
          </Button>
        </div>

        <div className="flex flex-col space-y-4">
          <Box className="h-8 w-8" />
          <h3 className="text-xl font-semibold">
            Automate Repetitive Tasks and Focus on What Matters Most
          </h3>
          <p className="text-gray-600 flex-grow">
            Our AI-driven platform minimizes manual effort, allowing teams to
            concentrate on strategic goals.
          </p>
          <Button
            variant="link"
            className="text-gray-900 p-0 h-auto font-semibold hover:no-underline"
          >
            Sign Up →
          </Button>
        </div>

        <div className="flex flex-col space-y-4">
          <Box className="h-8 w-8" />
          <h3 className="text-xl font-semibold">
            Transform Your Workflow with Intelligent Automation and Insights
          </h3>
          <p className="text-gray-600 flex-grow">
            Experience data-driven decision-making that enhances productivity
            and drives results.
          </p>
          <Button
            variant="link"
            className="text-gray-900 p-0 h-auto font-semibold hover:no-underline"
          >
            Get Started →
          </Button>
        </div>
      </div>
    </section>
  );
}
