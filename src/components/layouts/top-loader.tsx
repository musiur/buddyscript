"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import NProgress from "nprogress"

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.08,
  easing: "ease",
  speed: 500,
})

export default function TopLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchParamsString = searchParams.toString()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Add a small delay to batch multiple rapid navigations
    timeoutRef.current = setTimeout(() => {
      NProgress.done()
    }, 50)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [pathname, searchParamsString])

  useEffect(() => {
    // Cleanup: ensure progress is done on mount
    NProgress.done()

    return () => {
      // Cleanup: ensure progress is done on unmount
      NProgress.done()
    }
  }, [])

  return null
}
