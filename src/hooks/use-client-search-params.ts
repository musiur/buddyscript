"use client"
import { useEffect, useState } from "react"
import { useProgressRouter } from "./use-progress-router"

export function useClientSearchParams() {
  const router = useProgressRouter()
  const [params, setParams] = useState(() => {
    if (typeof window !== "undefined") return new URLSearchParams(window.location.search)
    return new URLSearchParams()
  })

  useEffect(() => {
    const update = () => setParams(new URLSearchParams(window.location.search))

    // update on browser navigation
    window.addEventListener("popstate", update)

    // update after client-side navigations
    const interval = setInterval(() => {
      const current = new URLSearchParams(window.location.search).toString()
      const prev = params.toString()
      if (current !== prev) setParams(new URLSearchParams(current))
    }, 100)

    return () => {
      window.removeEventListener("popstate", update)
      clearInterval(interval)
    }
  }, [router, params])

  return params
}
