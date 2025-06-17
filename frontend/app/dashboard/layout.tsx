import type React from "react"
import { Navbar } from "@/components/dashboard/navbar"
import { Sidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative">
          {/* Background Circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-blue-400/10 dark:bg-blue-600/5 blur-3xl" />
            <div className="absolute top-1/4 right-1/4 w-60 h-60 rounded-full bg-purple-400/10 dark:bg-purple-600/5 blur-3xl" />
            <div className="absolute bottom-1/3 left-1/3 w-60 h-60 rounded-full bg-cyan-400/10 dark:bg-cyan-600/5 blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10">{children}</div>
        </main>
      </div>
    </div>
  )
}
