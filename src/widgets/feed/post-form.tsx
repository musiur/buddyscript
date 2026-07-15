"use client"

import DynamicAvatar from "@/components/common/d-avatar"
import { DynamicForm } from "@/components/common/form"
import DynamicSubmit from "@/components/common/form/d-submit"
import Flex from "@/components/layouts/flex-layout"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Form } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Calendar, Image, Notebook, Rocket, Send, Video } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const FormSchema = z.object({
  input: z.string().min(10, "Write at least 10 charecters"),
  images: z.array(z.string()).optional(),
})

type TFormSchema = z.infer<typeof FormSchema>

export const PostForm = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      input: "",
      images: [],
    },
  })

  const handleSubmit = (data: TFormSchema) => {
    console.log(data)
  }
  return (
    <div className="bg-background rounded-lg p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="relative">
            <DynamicAvatar src="/" name="US" className="absolute top-0 left-0 h-10 w-10" />
            <Textarea
              placeholder="Write what's on your mind"
              className="bg-background dark:bg-background max-h-60 min-h-24 border-none pl-14"
            />
          </div>
          <Flex className="bg-input/30 mt-2 items-center justify-between rounded-md">
            <ButtonGroup className="hidden sm:inline-flex">
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
            </ButtonGroup>
            <ButtonGroup className="inline-flex sm:hidden">
              <Button variant="ghost" size="icon">
                <Image />
              </Button>
              <Button variant="ghost" size="icon">
                <Video />
              </Button>
              <Button variant="ghost" size="icon">
                <Calendar />
              </Button>
              <Button variant="ghost" size="icon">
                <Notebook />
              </Button>
            </ButtonGroup>
            <DynamicSubmit
              pending={form.formState.isSubmitting}
              text="Post"
              icon={<Send />}
              className="max-w-24"
            />
          </Flex>
        </form>
      </Form>
    </div>
  )
}
