import Flex from "@/components/layouts/flex-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export const Events = () => {
  return (
    <Flex className="bg-background flex-col gap-5! rounded-md p-6">
      <Flex className="items-center justify-between">
        <h3 className="text-lg font-medium">Events</h3>
        <Link href="#" className="text-primary text-sm font-medium hover:underline">
          See all
        </Link>
      </Flex>
      {[1, 2].map((item) => {
        return (
          <Card key={item} className="group grid-cols-1 gap-0 rounded p-0">
            <CardContent className="bg-background rounded p-0">
              <div className="w-full">
                <Image
                  src="/images/feed_event1.png"
                  alt="event-image"
                  width={400}
                  height={400}
                  className="object-contain"
                />
              </div>
              <Flex className="items-center gap-3! p-3">
                <Flex className="flex-col items-center justify-center gap-0! bg-[#0ACF83] px-3 py-1 text-white">
                  <p className="text-lg leading-tight font-semibold">10</p>
                  <p className="text-sm leading-tight font-medium">Jul</p>
                </Flex>
                <h3 className="font-medium">No more terrorism no more cry</h3>
              </Flex>
            </CardContent>
            <CardFooter className="bg-background flex items-center justify-between rounded p-3">
              <p className="text-muted-foreground text-sm">17 people going</p>
              <Button variant="outline" size="sm" className="border-primary text-primary rounded">
                Going
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </Flex>
  )
}
