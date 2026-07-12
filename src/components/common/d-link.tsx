"use client"

import { forwardRef, useTransition } from "react"
import { cn } from "@/lib/utils"
import clsx from "clsx"
import Link from "next/link"
import { useProgressRouter } from "@/hooks/use-progress-router"

type StatusLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  download?: boolean
  target?: string
  rel?: string
  passHref?: boolean
  onClickAction?: () => void
}

export const StatusLink = forwardRef<HTMLAnchorElement, StatusLinkProps>(
  (
    { href, children, className, download, target, rel, passHref, onClickAction, ...props },
    ref
  ) => {
    const [isPending, startTransition] = useTransition()
    const router = useProgressRouter()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      startTransition(() => {
        if (onClickAction) {
          onClickAction()
        }
        router.push(href)
      })
    }

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          className,
          clsx("inline-flex items-center gap-2", {
            "animate-pulse duration-150": isPending,
          })
        )}
        onClick={handleClick}
        {...props}
        download={download}
        target={target}
        rel={rel}
        passHref={passHref}
      >
        {children}
      </Link>
    )
  }
)

StatusLink.displayName = "StatusLink"
