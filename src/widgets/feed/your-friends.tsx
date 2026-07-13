import DynamicAvatar from "@/components/common/d-avatar"
import Flex from "@/components/layouts/flex-layout"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import { v4 as uuid } from "uuid"

export const YourFriends = () => {
    return (
        <Flex className="flex-col p-6 bg-background rounded-md gap-5!">
            <Flex className="justify-between items-center">
                <h3 className="font-medium text-lg">Your friends</h3>
                <Link href="#" className="text-primary hover:underline text-sm font-medium">See all</Link>
            </Flex>
            <div className="relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 stroke-muted-foreground" />
                <Input placeholder="input search text" className="h-10 bg-muted px-12 rounded-full border-none" />
            </div>
            <Flex className="flex-col">
                {
                YourFriendsData.map((item) => {
                    return (
                        <Flex key={uuid()} className="flex items-center justify-between gap-4 group hover:bg-muted rounded p-2">
                            <Flex className="items-center gap-2!">
                                <DynamicAvatar src={item.image} name={item.name} className="w-9 h-9" />
                                <div>
                                    <p className="font-medium text-sm">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">{item.designation} of {item.company}</p>
                                </div>
                            </Flex>
                            {item.activeStatus ? <span className="w-3 h-3 rounded-full bg-green-400 border-2 border-white"></span> : <span className="text-xs text-muted-foreground">{item.lastActiveTime} minutes ago</span>}
                        </Flex>
                    )
                })
            }
            </Flex>
        </Flex>
    )
}

const YourFriendsData = [
    {
        image: "/images/poeple1.png",
        name: "Steve Jobs",
        designation: "CEO",
        company: "Apple",
        activeStatus: false,
        lastActiveTime: 5
    },
    {
        image: "/images/poeple2.png",
        name: "Ryan Roslanski",
        designation: "CEO",
        company: "Linkedin",
        activeStatus: true,
        lastActiveTime: 0
    },
    {
        image: "/images/poeple3.png",
        name: "Dylan Field",
        designation: "CEO",
        company: "Figma",
        activeStatus: true,
        lastActiveTime: 0
    },
    {
        image: "/images/poeple1.png",
        name: "Steve Jobs",
        designation: "CEO",
        company: "Apple",
        activeStatus: false,
        lastActiveTime: 5
    },
    {
        image: "/images/poeple2.png",
        name: "Ryan Roslanski",
        designation: "CEO",
        company: "Linkedin",
        activeStatus: true,
        lastActiveTime: 0
    },
    {
        image: "/images/poeple3.png",
        name: "Dylan Field",
        designation: "CEO",
        company: "Figma",
        activeStatus: true,
        lastActiveTime: 0
    },
    {
        image: "/images/poeple1.png",
        name: "Steve Jobs",
        designation: "CEO",
        company: "Apple",
        activeStatus: false,
        lastActiveTime: 5
    },
    {
        image: "/images/poeple2.png",
        name: "Ryan Roslanski",
        designation: "CEO",
        company: "Linkedin",
        activeStatus: true,
        lastActiveTime: 0
    },
    {
        image: "/images/poeple3.png",
        name: "Dylan Field",
        designation: "CEO",
        company: "Figma",
        activeStatus: true,
        lastActiveTime: 0
    },
]