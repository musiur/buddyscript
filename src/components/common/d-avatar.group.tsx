"use client"

import DynamicAvatar from "./d-avatar"
import { cn } from "@/lib/utils"
import { AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { DetailedHTMLProps, HTMLAttributes } from "react"

export type DynamicAvatarItem = {
  name: string
  src?: string
}

export interface TypeDynamicAvatarGroupProps extends DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> {
  items: Array<DynamicAvatarItem>
  className?: string
  max?: number
}

const DynamicAvatarGroup = ({
  items,
  className,
  max = 3,
  ...props
}: TypeDynamicAvatarGroupProps) => {
  const limited = (items || []).slice(0, max)

  if (!items?.length) {
    return (
      <DynamicAvatar name="?" src="" className={cn("size-full relative w-8 h-8")} />
    )
  }

  return (
    <AvatarGroup className={cn(className)} {...props}>
      {limited.slice(0, max).map((item, idx) => (
        <DynamicAvatar
          key={`${item.name}-${idx}`}
          name={item.name}
          src={item.src}
          className={cn("size-full relative w-8 h-8")}
          tooltip={true}
        />
      ))}
      {items.length > max && <AvatarGroupCount>+{items.length - max}</AvatarGroupCount>}
    </AvatarGroup>
  )
}

export default DynamicAvatarGroup
