import DynamicAvatar from "@/components/common/d-avatar"
import Flex from "@/components/layouts/flex-layout"
import Grid from "@/components/layouts/grid-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const YouMightLike = () => {
    return (
        <Flex className="flex-col p-6 bg-background rounded-md gap-5!">
            <Flex className="justify-between items-center">
                <h3 className="font-medium text-lg">You Might Like</h3>
                <Link href="#" className="text-primary hover:underline text-sm font-medium">See all</Link>
            </Flex>
            <Grid className="grid-cols-1">
                <Flex className="items-center pb-2">
                    <DynamicAvatar src={"/images/poeple1.png"} name={"Radovan SkillArena"} className="w-12 h-12" />
                    <div className="space-y-1">
                        <p className="font-medium">Radovan SkillArena</p>
                        <p className="text-xs text-muted-foreground">Founder & CEO at Trophy</p>
                    </div>
                </Flex>
                <Grid className="grid-cols-2">
                    <Button variant="outline" className="rounded text-muted-foreground" size="lg">
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