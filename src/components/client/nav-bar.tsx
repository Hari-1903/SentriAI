"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const menuItems = [
  { name: "Overview", href: "/" },
  { name: "Customers", href: "/customers" },
  { name: "Products", href: "/products" },
  { name: "Settings", href: "/settings" },
]

export function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 h-14 border-b">
      <div className="flex items-center space-x-8">
        <Link href="/" className="font-semibold text-xl">
          AK
        </Link>
        <div className="flex items-center space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm text-muted-foreground hover:text-primary transition-colors",
                item.name === "Overview" && "text-primary font-medium"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="w-72">
        <Input type="search" placeholder="Search..." className="w-full" />
      </div>
    </nav>
  )
}

