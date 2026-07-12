"use client"
import * as React from "react"
import { Check, X } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import DynamicAvatar from "@/components/dynamic/d-avatar"

interface MultiComboboxOption {
  label: string
  value: string
  avatar?: string
  [key: string]: string | number | boolean | undefined | null
}

interface DynamicMultiComboboxProps {
  options: MultiComboboxOption[]
  onSelect: (values: MultiComboboxOption[]) => void
  value: MultiComboboxOption[]
  searchPlaceholder?: string
  emptyPlaceholder?: string
  placeholder?: string
  renderOption?: (option: MultiComboboxOption) => React.ReactNode
  trigger?: React.ReactNode
  showAvatar?: boolean
}

export function DynamicMultiCombobox({
  options,
  onSelect,
  value,
  searchPlaceholder = "Search...",
  emptyPlaceholder = "No results found.",
  placeholder = "Select items...",
  renderOption,
  trigger,
  showAvatar = false,
}: DynamicMultiComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (selectedValue: string) => {
    const isSelected = value.some(item => item.value === selectedValue)

    if (isSelected) {
      onSelect(value.filter(item => item.value !== selectedValue))
    } else {
      const selectedOption = options.find(item => item.value === selectedValue)
      if (selectedOption) {
        onSelect([...value, selectedOption])
      }
    }
  }

  const handleRemove = (valueToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect(value.filter(item => item.value !== valueToRemove))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-start min-h-10 h-auto"
          >
            <div className="flex flex-wrap gap-1 w-full">
              {value?.length > 0 ? (
                value.map(item => (
                  <Badge
                    key={item.value}
                    variant="secondary"
                    className="mr-1 mb-1 pl-1 pr-2 py-1 flex items-center gap-1.5"
                  >
                    {showAvatar && (
                      <DynamicAvatar name={item.label} src={item.avatar || ""} className="size-6" />
                    )}
                    <span>{item.label}</span>
                    <button
                      className="ml-0.5 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          handleRemove(item.value, e as any)
                        }
                      }}
                      onMouseDown={e => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onClick={e => handleRemove(item.value, e)}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </div>
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="z-[60] w-full p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
            <CommandGroup>
              {options.map(item => {
                const isSelected = value.some(v => v.value === item.value)
                return (
                  <CommandItem
                    key={item.value}
                    onSelect={() => handleSelect(item.value)}
                    className="cursor-pointer flex items-center justify-between"
                  >
                    {renderOption ? (
                      renderOption(item)
                    ) : showAvatar ? (
                      <div className="flex items-center gap-2">
                        <DynamicAvatar
                          name={item.label}
                          src={item.avatar || ""}
                          className="size-6"
                        />
                        <span>{item.label}</span>
                      </div>
                    ) : (
                      item.label
                    )}
                    <Check
                      className={cn(
                        "ml-2 h-4 w-4 shrink-0",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
