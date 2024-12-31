import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="w-full border-b bg-background py-4">
      <div className="container max-w-fll mx-auto px-4 flex items-center justify-between">
        <nav className="flex items-center space-x-6 gap-x-6 justify-between">
          <Link href="/" className="text-sm hover:text-gray-600 text-black ">
            Home Page
          </Link>
          <Link
            href="/about"
            className="text-sm hover:text-gray-600 text-black"
          >
            About Us
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-sm hover:text-gray-600">
              <span>Services</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/services/workflow">Workflow Management</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/services/automation">Task Automation</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/services/analytics">Analytics</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="absolute left-1/2 -translate-x-1/2 items-center">
          <Link href="/" className="font-semibold text-2xl">
            SentriAI
          </Link>
        </div>

        <div className="justify-start">
          <Button
            variant="default"
            className="bg-[#0F172A] text-white hover:bg-[#1E293B] rounded-xl
            px-6 py-2 text-lg transition-all duration-500 ease-in-out"
          >
            Join
          </Button>
        </div>
      </div>
    </header>
  );
}
