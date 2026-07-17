"use client"

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import Flex from "../flex-layout"
import { ChevronDown, ChevronRight, HelpCircle, LogOut, Menu, Settings } from "lucide-react"
import DynamicAvatar from "@/components/common/d-avatar"
import { v4 as uuid } from "uuid"
import Link from "next/link"
import { useAuth } from "@/features/auth/hooks/auth.store"
import { Skeleton } from "@/components/ui/skeleton"
import Grid from "../grid-layout"
import { Button } from "@/components/ui/button"

export const AvatarPopover = ({ bottomMenu = false }: { bottomMenu?: boolean }) => {
  const { data, isPending, error, logout, isLogoutPending } = useAuth()

  return (
    <Popover>
      <PopoverTrigger asChild className="md:cursor-pointer">
        {bottomMenu ? (
          <Flex className="flex w-16 items-center justify-center">
            <Menu className="stroke-muted-foreground mx-auto h-6 w-6" />
          </Flex>
        ) : isPending ? (
          AvatarSkeleton
        ) : error ? (
          "GUEST USER"
        ) : data ? (
          <Flex className="items-center justify-end gap-2!">
            <DynamicAvatar
              src={data?.avatar}
              name={data?.firstName}
              className="border-primary/70 border-2"
            />
            <span className="flex items-center justify-end gap-1 truncate">
              {data?.firstName} <ChevronDown className="h-4 w-4" />
            </span>
          </Flex>
        ) : (
          <Link href="/login">
            <Button className="px-6">Login</Button>
          </Link>
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="bg-background space-y-4 p-4">
        {isPending ? (
          PopoverAvatarSkeleton
        ) : error ? (
          "GUEST USER"
        ) : data ? (
          <Flex key={uuid()} className="flex cursor-pointer items-center gap-2" role="button">
            <DynamicAvatar
              src={data?.avatar}
              name={data?.firstName}
              className="border-primary/70 h-12 w-12 border-2"
            />
            <div>
              <p className="text-lg font-medium">{data?.firstName}</p>
              <Link href="/profile" className="text-primary text-xs hover:underline">
                View profile
              </Link>
            </div>
          </Flex>
        ) : (
          <Link href="/login">
            <Button className="px-6">Login</Button>
          </Link>
        )}

        {AvatarPopoverLinks.map((item) => {
          return (
            <Link
              key={uuid()}
              href={item.href}
              className="text-foreground/80 hover:text-primary flex items-center justify-between gap-2"
            >
              <Flex className="items-center">
                <Flex className="bg-primary-foreground text-primary h-10 w-10 items-center justify-center gap-0! rounded-full">
                  {item.icon}
                </Flex>
                <span className="font-medium">{item.label}</span>
              </Flex>
              <ChevronRight className="h-4 w-4" />
            </Link>
          )
        })}
        <Flex
          key={uuid()}
          className="text-foreground/80 hover:text-primary flex cursor-pointer items-center justify-between gap-2"
          role="button"
          onClick={() => logout()}
          aria-disabled={isLogoutPending}
        >
          <Flex className="items-center">
            <Flex className="bg-primary-foreground/80 text-primary h-10 w-10 items-center justify-center gap-0! rounded-full">
              <LogOut />
            </Flex>
            <span>{isLogoutPending ? "Logging out..." : "Logout"}</span>
          </Flex>
          <ChevronRight className="h-4 w-4" />
        </Flex>
      </PopoverContent>
    </Popover>
  )
}

const AvatarSkeleton = (
  <Flex className="items-center justify-end gap-2!">
    <Skeleton className="h-10 w-10 rounded-full"></Skeleton>
    <Skeleton className="h-6 w-16 rounded"></Skeleton>
    <Skeleton className="h-6 w-10 rounded"></Skeleton>
  </Flex>
)

const PopoverAvatarSkeleton = (
  <Flex className="items-center justify-end gap-2!">
    <Skeleton className="h-12 w-12 rounded-full" />
    <Grid>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-24" />
    </Grid>
  </Flex>
)

const AvatarPopoverLinks = [
  {
    label: "Settings",
    href: "/",
    icon: <Settings />,
  },
  {
    label: "Help & Support",
    href: "/",
    icon: <HelpCircle />,
  },
]
