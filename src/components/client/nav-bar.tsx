import Link from "next/link";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/client"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/client/raise-ticket"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Raise Ticket
      </Link>
      <Link
        href="/dashboard/products"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        FAQ's
      </Link>
      <Link
        href="/dashboard/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Request Callback
      </Link>
    </nav>
  );
}
