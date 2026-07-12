import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const Section = (props: SectionProps) => {
  return (
    <section {...props} className={cn(props.className, "py-16")}>
      {props.children}
    </section>
  )
}
