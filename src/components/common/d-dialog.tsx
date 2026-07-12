"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import useStatefulUrl from "@/hooks/use-stateful-url"
import clsx from "clsx"
import { useState } from "react"
import { useProgressRouter } from "@/hooks/use-progress-router"

interface PropsDynamicDialog extends React.HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode
  contents: {
    title?: React.ReactNode
    description?: React.ReactNode
    content?: React.ReactNode
    onlyContent?: boolean
  }
  className?: string
  queryKey?: string
  urlState?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const DynamicDialog = (props: PropsDynamicDialog) => {
  const { trigger, contents, className, urlState = true, open, onOpenChange } = props
  const { title, description, content, onlyContent } = contents
  const {
    getQueryParam,
    addQueryParam,
    removeQueryFromString,
    getAllQueryParamsToString,
    getCurrentPathname,
  } = useStatefulUrl()

  const router = useProgressRouter()

  const [localOpen, setLocalOpen] = useState(false)

  const isControlled = open !== undefined

  const isDialogOpen = isControlled
    ? open
    : urlState
      ? getQueryParam(props?.queryKey || "modal") === "true"
      : localOpen

  const closeDialog = () => {
    const query = removeQueryFromString(getAllQueryParamsToString(), props?.queryKey || "modal")
    const updatedQuery = removeQueryFromString(query, "modalContentOnly")
    return `${getCurrentPathname()}?${updatedQuery}`
  }

  const handleOnChange = (value: boolean) => {
    if (isControlled) {
      onOpenChange?.(value)
    } else if (urlState) {
      router.push(
        value ? addQueryParam(props.queryKey || "modal", value.toString()) : closeDialog()
      )
    } else {
      setLocalOpen(value)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOnChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn("max-w-sm rounded-2xl", className)}>
        <DialogHeader
          className={clsx({
            "sr-only": onlyContent,
          })}
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
}
