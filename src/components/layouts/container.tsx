import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const Container = (props: ContainerProps) => {
  return (
    <div {...props} className={cn(props.className, "container mx-auto px-4 md:px-0")}>
      {props.children}
    </div>
  )
}
