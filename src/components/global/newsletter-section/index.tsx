import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  return (
    <section className="container max-w-[1400px] mx-auto px-4 py-20">
      <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
        <div className="flex flex-col justify-center space-y-8">
          <div className="border border-gray-200 p-8">
            <h2 className="text-4xl font-bold mb-4">
              Stay Updated with SentriAI
            </h2>
            <p className="text-gray-600 mb-6 text-md">
              Subscribe to our newsletter for the latest insights on AI in
              workflow management.
            </p>
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-1"
              />
              <Button className="bg-[#0F172A] text-white hover:bg-[#1E293B]">
                Subscribe Now
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              By clicking Subscribe Now, you agree to our Terms and Conditions.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="/placeholder.svg"
            alt="Newsletter Illustration"
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
