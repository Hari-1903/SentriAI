import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container max-w-[1400px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-12">
          <div className="space-y-6">
            <Link href="/" className="text-xl font-bold">
              SentriAI
            </Link>
            <nav className="flex flex-wrap gap-4">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900"
              >
                Contact Us
              </Link>
              <Link
                href="/support"
                className="text-gray-600 hover:text-gray-900"
              >
                Support Center
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                Blog Posts
              </Link>
              <Link
                href="/careers"
                className="text-gray-600 hover:text-gray-900"
              >
                Careers Page
              </Link>
            </nav>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-4">
              <h3 className="font-semibold text-xl">Subscribe</h3>
              <div className="flex gap-4 max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button variant="outline">Subscribe</Button>
              </div>
              <p className="text-sm text-gray-500">
                By subscribing you agree to our Privacy Policy
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t">
          <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Cookies Settings
            </Link>
          </div>
          <p className="text-sm text-gray-600">
            © 2024 SentriAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
