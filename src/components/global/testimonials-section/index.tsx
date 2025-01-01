import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section className="container max-w-[1400px] mx-auto px-4 py-20">
      <div className="space-y-4 mb-16">
        <h2 className="text-6xl font-bold">Customer Testimonials</h2>
        <p className="text-xl text-gray-600">
          See how SentriAI has transformed our clients' workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {/* First Testimonial */}
        <div className="space-y-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <blockquote className="text-xl font-semibold">
            "SentriAI has revolutionized our task management, making us more
            efficient than ever!"
          </blockquote>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-200" />
            <div className="flex items-center space-x-4">
              <div>
                <div className="font-semibold">Jane Doe</div>
                <div className="text-sm text-gray-600">Manager, TechCorp</div>
              </div>
              <Image
                src="/placeholder.svg"
                alt="Webflow"
                width={100}
                height={30}
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>

        {/* Second Testimonial */}
        <div className="space-y-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <blockquote className="text-xl font-semibold">
            "The AI-driven insights from SentriAI have been a game changer for
            our team!"
          </blockquote>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-200" />
            <div className="flex items-center space-x-4">
              <div>
                <div className="font-semibold">John Smith</div>
                <div className="text-sm text-gray-600">
                  Director, BPO Solutions
                </div>
              </div>
              <Image
                src="/placeholder.svg"
                alt="Webflow"
                width={100}
                height={30}
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="border rounded-lg p-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div>
            <h3 className="text-2xl font-bold mb-2">
              Unlock Your Workflow Potential
            </h3>
            <p className="text-gray-600">
              Experience the future of task management today.
            </p>
          </div>
          <div className="flex space-x-4">
            <Button className="bg-[#0F172A] text-white hover:bg-[#1E293B]">
              Sign Up
            </Button>
            <Button variant="outline" className="border-gray-200">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
