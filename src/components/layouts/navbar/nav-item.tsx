"use client"

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavItem = ({
  link,
}: {
  link: { href: string; notificationCount: number; icon: React.ReactNode; label: string }
}) => {
  const pathname = usePathname()
  const active = pathname === link.href
  return (
    <Link href={link.href} className="group">
      <div
        className={clsx(
          "group-hover:border-primary group-hover:text-primary flex w-12 items-center justify-center border-b-2 py-5 transition-colors duration-200",
          {
            "border-primary text-primary": active,
            "text-muted-foreground border-transparent": !active,
          }
        )}
      >
        <div className="relative inline-block">
          {link.notificationCount > 0 && (
            <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[12px]">
              {link.notificationCount}
            </span>
          )}
          {link.icon}
        </div>
      </div>
    </Link>
  )
}

export default NavItem
