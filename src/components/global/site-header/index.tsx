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
      <div className="container max-w-[1400px] mx-auto px-4 flex items-center justify-between">
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-sm hover:text-gray-600">
            Home Page
          </Link>
          <Link href="/about" className="text-sm hover:text-gray-600">
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

        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="text-xl font-semibold">
            SentriAI
          </Link>
        </div>

        <div>
          <Button
            variant="default"
            className="bg-[#0F172A] text-white hover:bg-[#1E293B]"
          >
            Join
          </Button>
        </div>
      </div>
    </header>
  );
}
