"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMediaQuery } from "@/hooks/use-media-query"

interface BreadcrumbItem {
  href: string
  label: string
}

const ITEMS_TO_DISPLAY = 3

function generateBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  // Remove trailing slash and split path
  const paths = pathname.replace(/\/$/, "").split("/").filter(Boolean)

  // Always start with home
  const items: BreadcrumbItem[] = [{ href: "/", label: "Home" }]

  // Build up the breadcrumb items
  let currentPath = ""
  paths.forEach(path => {
    currentPath += `/${path}`
    // Convert path to readable label (e.g., "create-page" -> "Create Page")
    const label = path
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    items.push({
      href: currentPath,
      label,
    })
  })

  return items
}

export default function DynamicBreadcrumb() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const pathname = usePathname()
  const items = generateBreadcrumbItems(pathname)

  if (items?.length === 1) return null // Don't show breadcrumb on home page

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items?.length > ITEMS_TO_DISPLAY ? (
          <>
            {/* First item is always visible */}
            <BreadcrumbItem>
              <BreadcrumbLink href={items[0].href}>{items[0].label}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            {/* Dropdown or Drawer for middle items */}
            <BreadcrumbItem>
              {isDesktop ? (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger
                    className="flex items-center gap-1"
                    aria-label="Toggle breadcrumb dropdown"
                  >
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {items.slice(1, -1).map((item, index) => (
                      <DropdownMenuItem key={index}>
                        <Link href={item.href}>{item.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger aria-label="Toggle breadcrumb drawer">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Navigation</DrawerTitle>
                      <DrawerDescription>Select a page to navigate to</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                      {items.slice(1, -1).map((item, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="w-full justify-start"
                          asChild
                        >
                          <Link href={item.href}>{item.label}</Link>
                        </Button>
                      ))}
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            {/* Last item is always visible */}
            <BreadcrumbItem>
              <BreadcrumbPage>{items[items?.length - 1].label}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          // If 3 or fewer items, show all of them
          items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {index === items?.length - 1 ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < items?.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
