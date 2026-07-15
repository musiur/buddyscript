import DynamicAvatar from "@/components/common/d-avatar"
import DynamicAvatarGroup from "@/components/common/d-avatar.group"
import Flex from "@/components/layouts/flex-layout"
import Grid from "@/components/layouts/grid-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import {
  Heart,
  ImageIcon,
  Laugh,
  MessageSquare,
  Mic,
  MoreVertical,
  ScanFace,
  Share2,
  ThumbsUp,
} from "lucide-react"
import Image from "next/image"

export const PostList = () => {
  return (
    <Grid>
      {[1, 2].map((item) => {
        return (
          <Grid key={item} className="bg-background rounded-lg p-4">
            <div>
              <Flex className="items-center justify-between">
                <Flex className="items-center gap-3!">
                  <DynamicAvatar name="Musiur Alam Opu" className="h-10 w-10" />
                  <div>
                    <h3 className="font-medium">Musiur Alam Opu</h3>
                    <Flex className="text-muted-foreground text-sm">
                      <p>5 minutes ago</p>
                      <p>Public</p>
                    </Flex>
                  </div>
                </Flex>
                <Button variant="ghost" size="icon-sm">
                  <MoreVertical />
                </Button>
              </Flex>
              <p className="py-2">
                It is a long established fact that a reader will be distracted by the readable
                content of a page when looking at its layout.
              </p>
            </div>
            <div className="relative h-96 w-full">
              <Image
                src="/images/timeline_img.png"
                alt=""
                fill
                className="rounded-lg object-cover object-center"
              />
            </div>
            <Flex className="flex-wrap items-center justify-between">
              <DynamicAvatarGroup
                items={[
                  { name: "Musiur Alam Opu", src: "#" },
                  { name: "Ataur Rahman", src: "#" },
                  { name: "Tonmoy Zohani", src: "#" },
                  { name: "Tanvir Hossain", src: "#" },
                  { name: "Jamshed Mia", src: "#" },
                ]}
              />
              <Flex className="text-muted-foreground">
                <p className="space-x-1">
                  <span className="text-foreground">12</span>
                  <span>Comments</span>
                </p>
                <p className="space-x-1">
                  <span className="text-foreground">122</span>
                  <span>Shares</span>
                </p>
              </Flex>
            </Flex>
            <ButtonGroup className="bg-input/30 my-2 grid w-full grid-cols-3 rounded">
              <Button variant="ghost">
                <Laugh /> Ha ha
              </Button>
              <Button variant="ghost">
                <MessageSquare /> Comment
              </Button>
              <Button variant="ghost">
                <Share2 /> Share
              </Button>
            </ButtonGroup>
            <CommentInputBox />

            <CommentList />
          </Grid>
        )
      })}
    </Grid>
  )
}

const CommentInputBox = () => {
  return (
    <div className="relative">
      <DynamicAvatar className="absolute top-1/2 left-2 z-2 -translate-y-1/2" />
      <Input className="bg-muted rounded-xl border-none pl-12" placeholder="Write your comment" />
      <Flex className="absolute top-1/2 right-2 z-2 -translate-y-1/2 gap-0! rounded-full backdrop-blur">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Mic />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <ImageIcon />
        </Button>
      </Flex>
    </div>
  )
}

const CommentList = () => {
  return (
    <Grid>
      <h4 className="text-foreground/80 text-sm font-medium">View 4 previous comments</h4>
      <Flex>
        <DynamicAvatar className="h-10 w-10" />
        <Grid>
          <div className="bg-input/30 relative space-y-1 rounded-lg p-3">
            <h5 className="text-sm font-medium">Musiur Alam Opu</h5>
            <p className="text-foreground/80 text-sm">
              It is a long established fact that a reader will be distracted by the readable content
              of a page when looking at its layout.
            </p>
            <div className="absolute right-2 -bottom-2 z-2">
              <Badge variant="ghost" className="bg-background h-7">
                <Flex className="gap-0! -space-x-2">
                  <Flex className="border-background h-5 w-5 items-center justify-center rounded-full border-1 bg-red-400">
                    <Heart className="h-3 w-3 fill-white stroke-white" />
                  </Flex>
                  <Flex className="border-background h-5 w-5 items-center justify-center rounded-full border-1 bg-blue-400">
                    <ThumbsUp className="h-3 w-3 fill-white stroke-white" />
                  </Flex>
                </Flex>
                <span>198</span>
              </Badge>
            </div>
          </div>
          <Flex className="items-center text-sm">
            <ButtonGroup>
              <Button variant="ghost" size="sm" className="px-[4px] font-medium">
                Like
              </Button>
              <Button variant="ghost" size="sm" className="px-[4px] font-medium">
                Reply
              </Button>
              <Button variant="ghost" size="sm" className="px-[4px] font-medium">
                Share
              </Button>
            </ButtonGroup>
            <p className="text-muted-foreground text-xs">21m</p>
          </Flex>
          <CommentInputBox />
        </Grid>
      </Flex>
    </Grid>
  )
}
