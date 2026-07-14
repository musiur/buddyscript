import DynamicAvatar from "@/components/common/d-avatar"
import Flex from "@/components/layouts/flex-layout"
import { Button } from "@/components/ui/button"
import { ChevronRight, Plus } from "lucide-react"
import Image from "next/image"

export const Stories = () => {
    return (
        <div className="relative overflow-hidden">
            <div className="w-full sticky top-1/2 right-2 -translate-y-1/2">
                <Button variant="default" size="icon" className="rounded-full mx-auto border-2 border-background z-10">
                    <ChevronRight />
                </Button>
            </div>
            <Flex className="gap-3! sm:gap-6!">
                <div className="min-w-32 w-32 h-36 rounded-lg relative overflow-hidden">
                    <Image src="/images/card_ppl1.png" alt="" fill className="object-cover object-center h-full" />
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-end">
                        <div className="bg-background rounded-t-3xl h-12 w-full flex flex-col items-center justify-center pb-5">
                            <Button variant="default" size="icon" className="rounded-full mx-auto border-2 border-background">
                                <Plus />
                            </Button>
                            <p className="text-sm font-medium">Your story</p>
                        </div>
                    </div>
                </div>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                        return (
                            <div key={item} className="min-w-32 w-32 h-36 rounded-lg relative overflow-hidden">
                                <Image src="/images/card_ppl1.png" alt="" fill className="object-cover object-center h-full" />
                                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end">
                                    <p className="absolute bottom-2 left-0 w-full text-center text-sm text-white truncate">Your story</p>
                                    <div className="absolute top-2 right-2 text-sm">
                                        <DynamicAvatar src="#" name="User" className="w-8 h-8 border-2 border-white" />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </Flex>
        </div>
    )
}