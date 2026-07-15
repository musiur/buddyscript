"use client"
import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import clsx from "clsx"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ComboboxOption {
  label: string
  value: string
  [key: string]: string | number | boolean | undefined | null
}

interface ComboboxProps {
  options: ComboboxOption[]
  onSelect: (value: string) => void
  value: string
  values?: string[]
  multiple?: boolean
  closeOnSelect?: boolean
  searchPlaceholder?: string
  emptyPlaceholder?: string
  renderOption?: (option: ComboboxOption) => React.ReactNode
  isOptimistic?: boolean
  trigger?: React.ReactNode
  placeholder?: string
  align?: "center" | "start" | "end"
  side?: "top" | "bottom" | "left" | "right"
  disabled?: boolean
}

export function DynamicCombobox({
  options,
  onSelect,
  value,
  values = [],
  multiple = false,
  closeOnSelect,
  searchPlaceholder = "Search...",
  emptyPlaceholder = "No results found.",
  placeholder = "Select option",
  renderOption,
  isOptimistic,
  trigger,
  align = "center",
  side = "bottom",
  disabled = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const listRef = React.useRef<HTMLDivElement>(null)
  const shouldCloseOnSelect = closeOnSelect ?? !multiple

  const handleSelect = (currentValue: string) => {
    onSelect(currentValue)
    if (shouldCloseOnSelect) {
      setOpen(false)
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation()
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger
        className={clsx({
          "opacity-60": disabled,
        })}
        disabled={disabled}
        asChild
      >
        {trigger || <DefaultTrigger />}
      </PopoverTrigger>
      <PopoverContent className="z-100 w-full p-0" onWheel={handleWheel} align={align} side={side}>
        <Command className="overflow-hidden">
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList ref={listRef}>
            <ScrollArea className="h-65">
              <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
              <CommandGroup>
                {options.map((item) => (
                  <CommandItem key={item.value} onSelect={() => handleSelect(item.value)}>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        (multiple ? values.includes(item.value) : value === item.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {renderOption ? renderOption(item) : item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )

  function DefaultTrigger() {
    return (
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className={cn("w-full justify-between", {
          "text-muted-foreground": isOptimistic || !value,
        })}
      >
        {value ? options.find((item) => item.value === value)?.label : placeholder}
      </Button>
    )
  }
}
