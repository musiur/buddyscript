import Image from "next/image";
import Link from "next/link";
import { Input } from "../../ui/input";
import { Bell, ChevronDown, ChevronRight, HelpCircle, Home, LogOut, Menu, MessageCircle, Search, Settings, Users } from "lucide-react";
import { Container } from "../container";
import Flex from "../flex-layout";
import NavItem from "./nav-item";
import { v4 as uuid } from "uuid";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import DynamicAvatar from "@/components/common/d-avatar";

const Navbar = () => {

    return (
        <>
            <nav className="bg-background sticky top-0 z-999">
                <Container className="flex items-center justify-between">
                    <Link href="/">
                        <Image src="/images/logo.svg" alt="Logo" width={50} height={50} className="h-7 w-auto" />
                    </Link>

                    <div className="inline-block lg:hidden py-5">
                        <Search className="stroke-primary" />
                    </div>

                    <div className="relative hidden lg:block max-w-lg min-w-sm">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 stroke-muted-foreground" />
                        <Input placeholder="input search text" className="h-10 bg-muted px-12 rounded-full border-none" />
                    </div>
                    <Flex className="hidden lg:flex items-center justify-end gap-0! xl:gap-6!">
                        {
                            Links.map((link) => (
                                <NavItem key={uuid()} link={link} />
                            ))
                        }
                        <AvatarPopover />
                    </Flex>
                </Container>
            </nav>
            <Flex className="fixed bottom-0 left-0 w-full flex lg:hidden items-center justify-between sm:px-10 bg-background z-999">
                {
                    Links.map((link) => (
                        <NavItem key={uuid()} link={link} />
                    ))
                }
                <AvatarPopover bottomMenu={true} />
            </Flex>
        </>

    )
}

export default Navbar;

const AvatarPopover = ({ bottomMenu = false }: { bottomMenu?: boolean }) => {
    const AvatarPopoverLinks = [
        {
            label: "Settings",
            href: "/",
            icon: <Settings />
        },
        {
            label: "Help & Support",
            href: "/",
            icon: <HelpCircle />
        }
    ]
    return (
        <Popover>
            <PopoverTrigger className="flex items-center gap-2 justify-end">
                {bottomMenu ? <Flex className="inline-block w-16 flex items-center justify-center">
                    <Menu className="w-6 h-6 mx-auto stroke-muted-foreground" />
                </Flex> : <><DynamicAvatar src="#" name="Musiur Alam Opu" className="border-2 border-primary/70" />
                    <span className="flex items-center justify-end gap-1 truncate">Musiur Alam Opu <ChevronDown className="w-4 h-4" /></span></>}
            </PopoverTrigger>
            <PopoverContent align="end" className="bg-background space-y-4 p-4">
                <Flex key={uuid()} className="flex items-center gap-2 cursor-pointer" role="button">
                    <DynamicAvatar src="#" name="Musiur Alam Opu" className="border-2 border-primary/70 w-12 h-12" />
                    <div>
                        <p className="text-lg font-medium">Musiur Alam Opu</p>
                        <Link href="/profile" className="text-xs text-primary hover:underline">View profile</Link>
                    </div>
                </Flex>
                {
                    AvatarPopoverLinks.map((item) => {
                        return (
                            <Link key={uuid()} href={item.href} className="flex items-center justify-between gap-2 text-foreground/80 hover:text-primary">
                                <Flex className="items-center">
                                    <Flex className="w-10 h-10 rounded-full bg-primary-foreground text-primary items-center justify-center gap-0!">
                                        {item.icon}
                                    </Flex>
                                    <span className="font-medium">{item.label}</span>
                                </Flex>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        )
                    })
                }
                <Flex key={uuid()} className="flex items-center justify-between gap-2 cursor-pointer text-foreground/80 hover:text-primary" role="button">
                    <Flex className="items-center">
                        <Flex className="w-10 h-10 rounded-full bg-primary-foreground/80 text-primary items-center justify-center gap-0!">
                            <LogOut />
                        </Flex>
                        <span>Logout</span>
                    </Flex>
                    <ChevronRight className="w-4 h-4" />
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