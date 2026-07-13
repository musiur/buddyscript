"use client"

import DynamicAvatar from "@/components/common/d-avatar"
import { DynamicForm } from "@/components/common/form";
import DynamicSubmit from "@/components/common/form/d-submit";
import Flex from "@/components/layouts/flex-layout"
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Image, Notebook, Rocket, Send, Video } from "lucide-react";
import { useForm } from "react-hook-form"
import { z } from "zod";

const FormSchema = z.object({
    input: z.string().min(10, "Write at least 10 charecters"),
    images: z.array(z.string()).optional()
})

type TFormSchema = z.infer<typeof FormSchema>

export const PostForm = () => {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            input: "",
            images: []
        }
    })

    const handleSubmit = (data: TFormSchema) => {
        console.log(data);
    }
    return (
        <div className="bg-background p-5 rounded-lg">


            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <Flex>
                        <DynamicAvatar src="/" name="US" className="w-10 h-10" />
                        <DynamicForm.Input name="input" placeholder="What's on your mind?" className="w-full ring-0 focus:outline-0 focus:ring-0 border-none" type="textarea" hideLevel={true}/>
                    </Flex>
                    <Flex className="justify-between items-center mt-2 bg-muted rounded-md">
                        <Flex className="px-2 items-center gap-0!">
                            <Button variant="ghost">
                                <Image />
                                Image
                            </Button>
                            <Button variant="ghost">
                                <Video />
                                Video
                            </Button>
                            <Button variant="ghost">
                                <Calendar />
                                Event
                            </Button>
                            <Button variant="ghost">
                                <Notebook />
                                Article
                            </Button>
                        </Flex>
                        <DynamicSubmit pending={form.formState.isSubmitting} text="Post" icon={<Send />} className="max-w-24"/>
                    </Flex>
                </form>
            </Form>
        </div>
    )
}