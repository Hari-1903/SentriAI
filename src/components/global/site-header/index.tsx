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
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium">
            Home Page
          </Link>
          <Link href="/about" className="text-sm font-medium">
            About Us
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium">
              Services <ChevronDown className="h-4 w-4" />
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

        <Link href="/" className="text-xl font-bold">
          SentriAI
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="default">Join</Button>
        </div>
      </div>
    </header>
  );
}
