import DynamicAvatar from "@/components/common/d-avatar"
import Flex from "@/components/layouts/flex-layout"
import Grid from "@/components/layouts/grid-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const YouMightLike = () => {
  return (
    <Flex className="bg-background flex-col gap-5! rounded-md p-6">
      <Flex className="items-center justify-between">
        <h3 className="text-lg font-medium">You Might Like</h3>
        <Link href="#" className="text-primary text-sm font-medium hover:underline">
          See all
        </Link>
      </Flex>
      <Grid className="grid-cols-1">
        <Flex className="items-center pb-2">
          <DynamicAvatar
            src={"/images/poeple1.png"}
            name={"Radovan SkillArena"}
            className="h-12 w-12"
          />
          <div className="space-y-1">
            <p className="font-medium">Radovan SkillArena</p>
            <p className="text-muted-foreground text-xs">Founder & CEO at Trophy</p>
          </div>
        </Flex>
        <Grid className="grid-cols-2">
          <Button variant="outline" className="text-muted-foreground rounded" size="lg">
            Ignore
          </Button>
          <Button className="rounded" size="lg">
            Follow
          </Button>
        </Grid>
      </Grid>
    </Flex>
  )
}
