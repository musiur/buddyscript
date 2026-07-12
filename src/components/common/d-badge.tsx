import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type BadgeStyle = "pending" | "warning" | "success" | "failed"

const styles: Record<BadgeStyle, string> = {
  pending:
    "ring-yellow-600 border-background bg-gradient-to-t from-yellow-500/60 dark:from-yellow-500/40 via-yellow-600/20 to-yellow-600/20 text-yellow-600",
  warning:
    "ring-orange-600 border-background bg-gradient-to-t from-orange-500/60 dark:from-orange-500/40 via-orange-600/20 to-orange-600/20 text-orange-600",
  success:
    "ring-green-600 border-background bg-gradient-to-t from-green-500/60 dark:from-green-500/40 via-green-600/20 to-green-600/20 text-green-600",
  failed:
    "ring-red-600 border-background bg-gradient-to-t from-red-500/60 dark:from-red-500/40 via-red-600/20 to-red-600/20 text-red-600",
}
const DynamicBadge = ({
  style,
  children,
  ...props
}: {
  style: BadgeStyle
  children: ReactNode
}) => {
  return (
    <Badge className={cn(styles[style], "ring-1 hover:bg-transparent")} {...props}>
      {children}
    </Badge>
  )
}

export default DynamicBadge
