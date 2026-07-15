import DynamicAvatar from "@/components/common/d-avatar"
import Flex from "@/components/layouts/flex-layout"
import Grid from "@/components/layouts/grid-layout"
import { Button } from "@/components/ui/button"
import { ChevronRight, Plus } from "lucide-react"
import Image from "next/image"

export const Stories = () => {
  return (
    <div className="relative">
      <div className="absolute top-1/2 right-2 z-20 -translate-y-1/2">
        <Button
          variant="default"
          size="icon"
          className="border-background z-10 mx-auto rounded-full border-2"
        >
          <ChevronRight />
        </Button>
      </div>
      <Grid className="grid-cols-4 gap-3! sm:gap-6!">
        <div className="relative h-36 w-auto overflow-hidden rounded-lg">
          <Image
            src="/images/card_ppl1.png"
            alt=""
            fill
            className="h-full object-cover object-center"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-black/50">
            <div className="bg-background flex h-12 w-full flex-col items-center justify-center rounded-t-3xl pb-5">
              <Button
                variant="default"
                size="icon"
                className="border-background mx-auto rounded-full border-2"
              >
                <Plus />
              </Button>
              <p className="text-sm font-medium">Your story</p>
            </div>
          </div>
        </div>
        {[1, 2, 3].map((item) => {
          return (
            <div key={item} className="relative h-36 w-auto overflow-hidden rounded-lg">
              <Image
                src="/images/card_ppl1.png"
                alt=""
                fill
                className="h-full object-cover object-center"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-black/50">
                <p className="absolute bottom-2 left-0 w-full truncate text-center text-sm text-white">
                  Your story
                </p>
                <div className="absolute top-2 right-2 text-sm">
                  <DynamicAvatar src="#" name="User" className="h-8 w-8 border-2 border-white" />
                </div>
              </div>
            </div>
          )
        })}
      </Grid>
    </div>
  )
}
