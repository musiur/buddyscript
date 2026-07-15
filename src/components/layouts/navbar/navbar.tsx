import Image from "next/image"
import Link from "next/link"
import { Input } from "../../ui/input"
import {
  Bell,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  Search,
  Settings,
  Users,
} from "lucide-react"
import { Container } from "../container"
import Flex from "../flex-layout"
import NavItem from "./nav-item"
import { v4 as uuid } from "uuid"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import DynamicAvatar from "@/components/common/d-avatar"

const Navbar = () => {
  return (
    <>
      <nav className="bg-background sticky top-0 z-999">
        <Container className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={50}
              height={50}
              className="h-7 w-auto"
            />
          </Link>

          <div className="inline-block py-5 lg:hidden">
            <Search className="stroke-primary" />
          </div>

          <div className="relative hidden max-w-lg min-w-sm lg:block">
            <Search className="stroke-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="input search text"
              className="bg-muted h-10 rounded-full border-none px-12"
            />
          </div>
          <Flex className="hidden items-center justify-end gap-0! lg:flex xl:gap-6!">
            {Links.map((link) => (
              <NavItem key={uuid()} link={link} />
            ))}
            <AvatarPopover />
          </Flex>
        </Container>
      </nav>
      <Flex className="bg-background fixed bottom-0 left-0 z-999 flex w-full items-center justify-between sm:px-10 lg:hidden">
        {Links.map((link) => (
          <NavItem key={uuid()} link={link} />
        ))}
        <AvatarPopover bottomMenu={true} />
      </Flex>
    </>
  )
}

export default Navbar

const AvatarPopover = ({ bottomMenu = false }: { bottomMenu?: boolean }) => {
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
  return (
    <Popover>
      <PopoverTrigger className="flex items-center justify-end gap-2">
        {bottomMenu ? (
          <Flex className="flex inline-block w-16 items-center justify-center">
            <Menu className="stroke-muted-foreground mx-auto h-6 w-6" />
          </Flex>
        ) : (
          <>
            <DynamicAvatar src="#" name="Musiur Alam Opu" className="border-primary/70 border-2" />
            <span className="flex items-center justify-end gap-1 truncate">
              Musiur Alam Opu <ChevronDown className="h-4 w-4" />
            </span>
          </>
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="bg-background space-y-4 p-4">
        <Flex key={uuid()} className="flex cursor-pointer items-center gap-2" role="button">
          <DynamicAvatar
            src="#"
            name="Musiur Alam Opu"
            className="border-primary/70 h-12 w-12 border-2"
          />
          <div>
            <p className="text-lg font-medium">Musiur Alam Opu</p>
            <Link href="/profile" className="text-primary text-xs hover:underline">
              View profile
            </Link>
          </div>
        </Flex>
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
        >
          <Flex className="items-center">
            <Flex className="bg-primary-foreground/80 text-primary h-10 w-10 items-center justify-center gap-0! rounded-full">
              <LogOut />
            </Flex>
            <span>Logout</span>
          </Flex>
          <ChevronRight className="h-4 w-4" />
        </Flex>
      </PopoverContent>
    </Popover>
  )
}

const Links = [
  {
    label: "Home",
    href: "/",
    icon: <Home />,
    notificationCount: 0,
  },
  {
    label: "Group",
    href: "/group",
    icon: <Users />,
    notificationCount: 0,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: <Bell />,
    notificationCount: 6,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: <MessageCircle />,
    notificationCount: 2,
  },
]
