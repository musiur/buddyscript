"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function RouteLoader() {
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!pathname) return
    setProgress(20)

    const interval = setInterval(() => {
      setProgress(prev => (prev < 90 ? prev + 10 : prev))
    }, 200)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
      setTimeout(() => {
        setProgress(0)
      }, 300)
    }, 500)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [pathname])

  return (
    <div className="fixed top-0 left-0 w-full h-0.75 z-9999">
      <div
        className={`h-full bg-primary transition-all duration-300 ease-out ${
          progress > 0 ? "opacity-100" : "opacity-0"
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
