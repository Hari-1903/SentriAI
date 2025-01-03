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
        href="/operator"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/operator/ticket-list"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Ticket List
      </Link>
      <Link
        href="/operator/query"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        AI Query
      </Link>
      <Link
        href="/operator/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Callback schedule
      </Link>
    </nav>
  );
}
