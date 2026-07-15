import DynamicAvatar from "@/components/common/d-avatar"
import Flex from "@/components/layouts/flex-layout"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import { v4 as uuid } from "uuid"

export const YourFriends = () => {
  return (
    <Flex className="bg-background flex-col gap-5! rounded-md p-6">
      <Flex className="items-center justify-between">
        <h3 className="text-lg font-medium">Your friends</h3>
        <Link href="#" className="text-primary text-sm font-medium hover:underline">
          See all
        </Link>
      </Flex>
      <div className="relative">
        <Search className="stroke-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform" />
        <Input
          placeholder="input search text"
          className="bg-muted h-10 rounded-full border-none px-12"
        />
      </div>
      <Flex className="flex-col">
        {YourFriendsData.map((item) => {
          return (
            <Flex
              key={uuid()}
              className="group hover:bg-muted flex items-center justify-between gap-4 rounded p-2"
            >
              <Flex className="items-center gap-2!">
                <DynamicAvatar src={item.image} name={item.name} className="h-9 w-9" />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {item.designation} of {item.company}
                  </p>
                </div>
              </Flex>
              {item.activeStatus ? (
                <span className="h-3 w-3 rounded-full border-2 border-white bg-green-400"></span>
              ) : (
                <span className="text-muted-foreground text-xs">
                  {item.lastActiveTime} minutes ago
                </span>
              )}
            </Flex>
          )
        })}
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
    lastActiveTime: 5,
  },
  {
    image: "/images/poeple2.png",
    name: "Ryan Roslanski",
    designation: "CEO",
    company: "Linkedin",
    activeStatus: true,
    lastActiveTime: 0,
  },
  {
    image: "/images/poeple3.png",
    name: "Dylan Field",
    designation: "CEO",
    company: "Figma",
    activeStatus: true,
    lastActiveTime: 0,
  },
  {
    image: "/images/poeple1.png",
    name: "Steve Jobs",
    designation: "CEO",
    company: "Apple",
    activeStatus: false,
    lastActiveTime: 5,
  },
  {
    image: "/images/poeple2.png",
    name: "Ryan Roslanski",
    designation: "CEO",
    company: "Linkedin",
    activeStatus: true,
    lastActiveTime: 0,
  },
  {
    image: "/images/poeple3.png",
    name: "Dylan Field",
    designation: "CEO",
    company: "Figma",
    activeStatus: true,
    lastActiveTime: 0,
  },
  {
    image: "/images/poeple1.png",
    name: "Steve Jobs",
    designation: "CEO",
    company: "Apple",
    activeStatus: false,
    lastActiveTime: 5,
  },
  {
    image: "/images/poeple2.png",
    name: "Ryan Roslanski",
    designation: "CEO",
    company: "Linkedin",
    activeStatus: true,
    lastActiveTime: 0,
  },
  {
    image: "/images/poeple3.png",
    name: "Dylan Field",
    designation: "CEO",
    company: "Figma",
    activeStatus: true,
    lastActiveTime: 0,
  },
]
