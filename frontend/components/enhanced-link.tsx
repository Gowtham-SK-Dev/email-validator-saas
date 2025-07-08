"use client"

import Link from "next/link"
import { useNavigation } from "@/components/navigation/perfect-navigation-provider"
import { cn } from "@/lib/utils"
import type React from "react"

interface EnhancedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  prefetch?: boolean
  replace?: boolean
  scroll?: boolean
}

export function EnhancedLink({
  href,
  children,
  className,
  onClick,
  prefetch = true,
  replace = false,
  scroll = true,
  ...props
}: EnhancedLinkProps) {
  const { startLoading } = useNavigation()

  const handleClick = (e: React.MouseEvent) => {
    // Don't trigger loading for external links or same page links
    if (href.startsWith("http") || href.startsWith("#") || href === window.location.pathname) {
      onClick?.()
      return
    }

    // Don't trigger loading if it's a modified click (ctrl, cmd, middle click, etc.)
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) {
      onClick?.()
      return
    }
    startLoading("link-navigation")
    onClick?.()
  }

  return (
    <Link
      href={href}
      className={cn(className)}
      onClick={handleClick}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      {...props}
    >
      {children}
    </Link>
  )
}
