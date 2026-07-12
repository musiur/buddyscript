import { Info } from "lucide-react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const DynamicTooltip = ({
  trigger,
  content,
  side = "top",
}: {
  trigger?: React.ReactNode
  content: React.ReactNode
  side?: "top" | "left" | "right" | "bottom"
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{trigger || <Info className="w-4 h-4" />}</TooltipTrigger>

        <TooltipContent side={side}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default DynamicTooltip
