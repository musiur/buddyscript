"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

/**
 * DynamicPopover component
 * @param {Object} props - The component props
 * @param {ReactNode} props.trigger - The trigger element
 * @param {ReactNode} props.content - The content element
 * @param {string} props.contentClassName - Additional CSS classes to be applied to the content
 * @returns {React.ReactNode} The rendered DynamicPopover component
 */

type DynamicPopoverProps = {
  trigger: ReactNode
  content: ReactNode
  contentClassName?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
}

const DynamicPopover: React.FC<DynamicPopoverProps> = (props): React.ReactNode => {
  const { trigger, content, contentClassName, open, onOpenChange, align = "end", side = "bottom" } = props

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent
        className={cn(contentClassName, "p-1! rounded-xl z-10!")}
        align={align}
        side={side}
      >
        {content}
      </PopoverContent>
    </Popover>
  )
}

export default DynamicPopover
