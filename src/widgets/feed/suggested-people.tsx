import DynamicAvatar from "@/components/common/d-avatar"
import Flex from "@/components/layouts/flex-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { v4 as uuid } from "uuid"

export const SuggestedPeople = () => {
  return (
    <Flex className="bg-background flex-col gap-5! rounded-md p-6">
      <Flex className="items-center justify-between">
        <h3 className="text-lg font-medium">Suggested People</h3>
        <Link href="#" className="text-primary text-sm font-medium hover:underline">
          See all
        </Link>
      </Flex>
      {SuggestedPeopleData.map((item) => {
        return (
          <Flex key={uuid()} className="group flex items-center justify-between gap-4">
            <Flex className="items-center gap-2!">
              <DynamicAvatar src={item.image} name={item.name} className="h-9 w-9" />
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-muted-foreground text-xs">
                  {item.designation} of {item.company}
                </p>
              </div>
            </Flex>
            <Button variant="outline" className="h-8 rounded" size="xs">
              Connect
            </Button>
          </Flex>
        )
      })}
    </Flex>
  )
}

const SuggestedPeopleData = [
  {
    image: "/images/poeple1.png",
    name: "Steve Jobs",
    designation: "CEO",
    company: "Apple",
    href: "#",
  },
  {
    image: "/images/poeple2.png",
    name: "Ryan Roslanski",
    designation: "CEO",
    company: "Linkedin",
    href: "#",
  },
  {
    image: "/images/poeple3.png",
    name: "Dylan Field",
    designation: "CEO",
    company: "Figma",
    href: "#",
  },
]
