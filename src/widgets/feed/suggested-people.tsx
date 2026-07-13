import DynamicAvatar from "@/components/common/d-avatar"
import Flex from "@/components/layouts/flex-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { v4 as uuid } from "uuid"

export const SuggestedPeople = () => {
    return (
        <Flex className="flex-col p-6 bg-background rounded-md gap-5!">
            <Flex className="justify-between items-center">
                <h3 className="font-medium text-lg">Suggested People</h3>
                <Link href="#" className="text-primary hover:underline text-sm font-medium">See all</Link>
            </Flex>
            {
                SuggestedPeopleData.map((item) => {
                    return (
                        <Flex key={uuid()} className="flex items-center justify-between gap-4 group">
                            <Flex className="items-center gap-2!">
                                <DynamicAvatar src={item.image} name={item.name} className="w-9 h-9" />
                                <div>
                                    <p className="font-medium text-sm">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">{item.designation} of {item.company}</p>
                                </div>
                            </Flex>
                            <Button variant="outline" className="rounded h-8" size="xs">
                                Connect
                            </Button>
                        </Flex>
                    )
                })
            }
        </Flex>
    )
}


const SuggestedPeopleData = [
    {
        image: "/images/poeple1.png",
        name: "Steve Jobs",
        designation: "CEO",
        company: "Apple",
        href: "#"
    },
    {
        image: "/images/poeple2.png",
        name: "Ryan Roslanski",
        designation: "CEO",
        company: "Linkedin",
        href: "#"
    },
    {
        image: "/images/poeple3.png",
        name: "Dylan Field",
        designation: "CEO",
        company: "Figma",
        href: "#"
    },
]