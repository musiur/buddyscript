import Flex from "@/components/layouts/flex-layout"
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { v4 as uuid } from "uuid";

import { Bookmark, ChartNoAxesCombined, Gamepad, Save, Settings, UserPlus, Users, Video } from "lucide-react";

type TBadgeVariants = "default" | "link" | "secondary" | "destructive" | "outline" | "ghost" | null | undefined;
type TExploreLinks = Array<{
  label: string,
  icon: React.ReactNode,
  href: string,
  badge?: {
    label: string,
    type: TBadgeVariants
  }
}>

export const Explore = () => {
    return (
        <Flex className="flex-col p-6 bg-background rounded-md gap-5!">
          <h3 className="font-medium text-lg">Explore</h3>
          {
            ExploreLinks.map((item) => {
              return (
                <Link key={uuid()} href={item.href} className="flex items-center justify-between gap-4 text-muted-foreground group">
                  <Flex className="[&>svg]:w-6 [&>svg]:w]h-6">
                    {item.icon}
                    <span className="group-hover:text-primary font-medium">{item.label}</span>
                  </Flex>
                  {
                    item.badge ? <Badge variant={item.badge.type} className="bg-[#0ACF83] text-white">{item.badge.label}</Badge> : null
                  }
                </Link>
              )
            })
          }
        </Flex>
    )
}

const ExploreLinks: TExploreLinks = [
  {
    label: "Learning",
    icon: <Video />,
    href: "#",
    badge: {
      label: "New",
      type: "default"
    }
  },
  {
    label: "Insights",
    icon: <ChartNoAxesCombined />,
    href: "#",
  },
  {
    label: "Find friends",
    icon: <UserPlus />,
    href: "#"
  },
  {
    label: "Bookmarks",
    icon: <Bookmark />,
    href: "#",
  },
  {
    label: "Group",
    icon: <Users />,
    href: "#"
  },
  {
    label: "Gaming",
    icon: <Gamepad />,
    href: "#",
    badge: {
      label: "New",
      type: "default"
    }
  },
  {
    label: "Settings",
    icon: <Settings />,
    href: "#"
  },
  {
    label: "Save post",
    icon: <Save />,
    href: "#"
  },
]