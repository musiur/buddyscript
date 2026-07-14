import DynamicAvatar from "@/components/common/d-avatar"
import DynamicAvatarGroup from "@/components/common/d-avatar.group"
import Flex from "@/components/layouts/flex-layout"
import Grid from "@/components/layouts/grid-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { Heart, ImageIcon, Laugh, MessageSquare, Mic, MoreVertical, ScanFace, Share2, ThumbsUp } from "lucide-react"
import Image from "next/image"

export const PostList = () => {
    return (
        <Grid>
            {
                [1, 2].map((item) => {
                    return (
                        <Grid key={item} className="rounded-lg bg-background p-4">
                            <div>
                                <Flex className="justify-between items-center">
                                    <Flex className="items-center gap-3!">
                                        <DynamicAvatar name="Musiur Alam Opu" className="w-10 h-10" />
                                        <div>
                                            <h3 className="font-medium">Musiur Alam Opu</h3>
                                            <Flex className="text-sm text-muted-foreground"><p>5 minutes ago</p><p>Public</p></Flex>
                                        </div>
                                    </Flex>
                                    <Button variant="ghost" size="icon-sm">
                                        <MoreVertical />
                                    </Button>
                                </Flex>
                                <p className="py-2">
                                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                </p>
                            </div>
                            <div className="h-96 w-full relative">
                                <Image src="/images/timeline_img.png" alt="" fill className="object-cover object-center rounded-lg" />
                            </div>
                            <Flex className="flex-wrap items-center justify-between">
                                <DynamicAvatarGroup items={[
                                    { name: "Musiur Alam Opu", src: "#" },
                                    { name: "Ataur Rahman", src: "#" },
                                    { name: "Tonmoy Zohani", src: "#" },
                                    { name: "Tanvir Hossain", src: "#" },
                                    { name: "Jamshed Mia", src: "#" },
                                ]} />
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
                            <ButtonGroup className="rounded grid grid-cols-3 w-full my-2 bg-input/30">
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
                })
            }
        </Grid>
    )
}

const CommentInputBox = () => {
    return (
        <div className="relative">
            <DynamicAvatar className="absolute top-1/2 -translate-y-1/2 left-2 z-2" />
            <Input className="bg-muted pl-12 rounded-xl border-none" placeholder="Write your comment" />
            <Flex className="absolute top-1/2 -translate-y-1/2 right-2 z-2 gap-0! backdrop-blur rounded-full">
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
            <h4 className="font-medium text-foreground/80 text-sm">View 4 previous comments</h4>
            <Flex>
                <DynamicAvatar className="w-10 h-10" />
                <Grid>
                    <div className="p-3 rounded-lg bg-input/30 space-y-1 relative">
                        <h5 className="font-medium text-sm">Musiur Alam Opu</h5>
                        <p className="text-foreground/80 text-sm">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                        <div className="absolute -bottom-2 right-2 z-2">
                            <Badge variant="ghost" className="h-7 bg-background">
                                <Flex className="-space-x-2 gap-0!">
                                    <Flex className="w-5 h-5 bg-red-400 rounded-full border-1 border-background items-center justify-center">
                                        <Heart className="stroke-white fill-white w-3 h-3" />
                                    </Flex>
                                    <Flex className="w-5 h-5 bg-blue-400 rounded-full border-1 border-background items-center justify-center">
                                        <ThumbsUp className="stroke-white fill-white w-3 h-3" />
                                    </Flex>
                                </Flex>
                                    <span>198</span>
                            </Badge>
                        </div>
                    </div>
                    <Flex className="text-sm items-center">
                        <ButtonGroup>
                            <Button variant="ghost" size="sm" className="font-medium px-[4px]">
                                Like
                            </Button>
                            <Button variant="ghost" size="sm" className="font-medium px-[4px]">
                                Reply
                            </Button>
                            <Button variant="ghost" size="sm" className="font-medium px-[4px]">
                                Share
                            </Button>
                        </ButtonGroup>
                        <p className="text-xs text-muted-foreground">21m</p>
                    </Flex>
                    <CommentInputBox />
                </Grid>
            </Flex>
        </Grid>
    )
}