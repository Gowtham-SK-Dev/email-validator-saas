"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, CreditCard, Home, Settings, Users, MessageSquare, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/admin",
    color: "text-sky-500",
  },
  {
    label: "Users",
    icon: Users,
    href: "/admin/users",
    color: "text-violet-500",
  },
  {
    label: "Usage Stats",
    icon: BarChart,
    href: "/admin/usage",
    color: "text-pink-700",
  },
  {
    label: "Subscriptions",
    icon: CreditCard,
    href: "/admin/subscriptions",
    color: "text-orange-500",
  },
  {
    label: "Reports",
    icon: FileText,
    href: "/admin/reports",
    color: "text-emerald-500",
  },
  {
    label: "Support Tickets",
    icon: MessageSquare,
    href: "/admin/support",
    color: "text-blue-600",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-background">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn("w-full justify-start", pathname === route.href ? "bg-accent" : "")}
              asChild
            >
              <Link href={route.href}>
                <route.icon className={cn("mr-2 h-5 w-5", route.color)} />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
