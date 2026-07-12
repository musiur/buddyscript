"use client"

import { useRouter } from "next/navigation"
import NProgress from "nprogress"
import { useCallback } from "react"

let navigationTimeout: NodeJS.Timeout | null = null

export function useProgressRouter() {
  const router = useRouter()

  const push = useCallback(
    (href: string, options?: { scroll?: boolean }) => {
      // Clear any existing timeout
      if (navigationTimeout) {
        clearTimeout(navigationTimeout)
      }

      // Start or restart progress
      if (!NProgress.isStarted()) {
        NProgress.start()
      }

      // Safety timeout: force complete after 5 seconds
      navigationTimeout = setTimeout(() => {
        NProgress.done()
      }, 5000)

      router.push(href, options)
    },
    [router]
  )

  const replace = useCallback(
    (href: string, options?: { scroll?: boolean }) => {
      if (navigationTimeout) {
        clearTimeout(navigationTimeout)
      }

      if (!NProgress.isStarted()) {
        NProgress.start()
      }

      navigationTimeout = setTimeout(() => {
        NProgress.done()
      }, 5000)

      router.replace(href, options)
    },
    [router]
  )

  const back = useCallback(() => {
    if (navigationTimeout) {
      clearTimeout(navigationTimeout)
    }

    if (!NProgress.isStarted()) {
      NProgress.start()
    }

    navigationTimeout = setTimeout(() => {
      NProgress.done()
    }, 5000)

    router.back()
  }, [router])

  const forward = useCallback(() => {
    if (navigationTimeout) {
      clearTimeout(navigationTimeout)
    }

    if (!NProgress.isStarted()) {
      NProgress.start()
    }

    navigationTimeout = setTimeout(() => {
      NProgress.done()
    }, 5000)

    router.forward()
  }, [router])

  return {
    push,
    replace,
    back,
    forward,
    refresh: router.refresh,
    prefetch: router.prefetch,
  }
}
