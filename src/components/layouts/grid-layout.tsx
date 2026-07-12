import clsx from "clsx"
import { HTMLAttributes, forwardRef } from "react"

/**
 * GridLayout component
 * @param {Object} props - The component props
 * @param {ReactNode} props.children - The child elements to be rendered inside the grid
 * @param {string} props.className - Additional CSS classes to be applied to the grid container
 * @returns {React.ReactNode} The rendered GridLayout component
 */
const Grid = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return (
    <div {...props} ref={ref} className={clsx(props.className, "grid grid-cols-1 gap-4")}>
      {props.children}
    </div>
  )
})

Grid.displayName = "Grid"

export default Grid
