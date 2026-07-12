"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import NProgress from "nprogress"
import { ComponentProps, MouseEvent } from "react"

type ProgressLinkProps = ComponentProps<typeof Link>

export default function ProgressLink({ href, onClick, className, ...props }: ProgressLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call original onClick if provided
    onClick?.(e)

    // Don't interfere with modified clicks or external links
    if (
      e.defaultPrevented ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      (typeof href === "string" && (href.startsWith("http") || href.startsWith("mailto:")))
    ) {
      return
    }

    // Start progress bar
    NProgress.start()

    // Let Next.js handle the navigation
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      {...props}
      className={cn(className, cn("inline-flex items-center gap-2", {}))}
    />
  )
}
