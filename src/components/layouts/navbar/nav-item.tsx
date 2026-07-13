"use client"

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItem = ({ link }: { link: { href: string, notificationCount: number, icon: React.ReactNode, label: string } }) => {
    const pathname = usePathname();
    const active = pathname === link.href;
    return (
        <Link href={link.href} className="group">
            <div className={clsx("border-b-2 group-hover:border-primary group-hover:text-primary py-5 w-12 flex items-center justify-center transition-colors duration-200", {
                "border-primary text-primary": active,
                "border-transparent text-muted-foreground": !active
            })}>
                <div className="relative inline-block">
                    {link.notificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[12px] rounded-full h-4 w-4 flex items-center justify-center">
                            {link.notificationCount}
                        </span>
                    )}
                    {link.icon}
                </div>
            </div>
        </Link>
    )
}

export default NavItem;