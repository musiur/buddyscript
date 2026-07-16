import Image from "next/image"
import Link from "next/link"
import { Input } from "../../ui/input"
import { Bell, Home, MessageCircle, Search, Users } from "lucide-react"
import { Container } from "../container"
import Flex from "../flex-layout"
import NavItem from "./nav-item"
import { v4 as uuid } from "uuid"
import { AvatarPopover } from "./avatar-popover"

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
