import clsx from "clsx"
import { HTMLAttributes, forwardRef } from "react"

const Flex = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return (
    <div {...props} ref={ref} className={clsx(props.className, "flex gap-4")}>
      {props.children}
    </div>
  )
})

Flex.displayName = "Flex"

export default Flex
