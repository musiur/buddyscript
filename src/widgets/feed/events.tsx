import Flex from "@/components/layouts/flex-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export const Events = () => {
    return (
        <Flex className="flex-col p-6 bg-background rounded-md gap-5!">
            <Flex className="justify-between items-center">
                <h3 className="font-medium text-lg">Events</h3>
                <Link href="#" className="text-primary hover:underline text-sm font-medium">See all</Link>
            </Flex>
            {
                [1, 2].map((item) => {
                    return (
                        <Card key={item} className="grid-cols-1 group p-0 rounded gap-0">

                            <CardContent className="p-0 rounded bg-background">
                                <div className="w-full">
                                    <Image src="/images/feed_event1.png" alt="event-image" width={400} height={400} className="object-contain" />
                                </div>
                                <Flex className="p-3 items-center gap-3!">
                                    <Flex className="px-3 py-1 flex-col items-center justify-center gap-0! text-white bg-[#0ACF83]">
                                        <p className="text-lg font-semibold leading-tight">10</p>
                                        <p className="text-sm font-medium leading-tight">Jul</p>
                                    </Flex>
                                    <h3 className="font-medium">No more terrorism no more cry</h3>
                                </Flex>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between rounded p-3 bg-background">
                                <p className="text-sm text-muted-foreground">17 people going</p>
                                <Button variant="outline" size="sm" className="rounded border-primary text-primary">
                                    Going
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                })
            }
        </Flex>
    )
}