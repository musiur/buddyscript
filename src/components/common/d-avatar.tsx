import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useFetchUrl } from "@/features/board-settings/hooks/use-fetch-url"
import { cn, getAvatarColor, getAvatarFallback } from "@/lib/utils"
import type { ReactNode } from "react"
import DynamicTooltip from "./d-tooltip"

type DynamicAvatarProps = {
  className?: string
  name?: string
  src?: string
  tooltip?: boolean
}

const DynamicAvatar = ({
  className,
  name = "John Doe",
  src = "",
  tooltip = false,
}: DynamicAvatarProps): ReactNode => {
  const { fileUrl } = useFetchUrl(src)

  const avatarBody = (
    <Avatar
      role="button"
      className={cn("overflow-hidden rounded-full border border-border", className)}
    >
      <AvatarImage src={fileUrl || undefined} alt={name} className="object-cover object-center" />
      <AvatarFallback
        className="rounded-full text-white text-xs"
        style={{
          background: getAvatarColor(name),
        }}
      >
        {getAvatarFallback(name) || "NA"}
      </AvatarFallback>
    </Avatar>
  )

  if (!tooltip) {
    return avatarBody
  }

  return <DynamicTooltip trigger={avatarBody} content={name} />
}

export default DynamicAvatar
