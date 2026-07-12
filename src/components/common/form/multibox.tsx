"use client"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, MessageCircleWarning } from "lucide-react"
import { ReactElement, useState } from "react"
import { useFormContext } from "react-hook-form"
import Flex from "@/components/layouts/flex-layout"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export type TypeSelectOption = {
  label: string | React.ReactNode | ReactElement
  value: string
}

const Multibox = ({
  name = "multibox",
  label = "Multibox",
  description,
  defaultOptions = [],
  className = "",
}: {
  name: string
  label: string
  defaultOptions: TypeSelectOption[]
  description?: string
  className?: string
}) => {
  const form = useFormContext()
  const [newInput, setNewInput] = useState("")
  const [options, setOptions] = useState<TypeSelectOption[]>(defaultOptions)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className, "grid grid-cols-1 gap-4")}>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between h-auto px-2",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <div className="flex flex-wrap gap-2">
                    {" "}
                    {field?.value?.length > 0
                      ? field?.value
                          ?.map(
                            (item: string) => options.find(option => option.value === item)?.label
                          )
                          ?.map((item: string) => {
                            return (
                              <div
                                className="px-[8px] pt-[2px] bg-gray-200 dark:bg-gray-800 rounded"
                                key={item}
                              >
                                {item}
                              </div>
                            )
                          })
                      : "Select option"}
                  </div>
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full border border-border p-0 rounded-xl overflow-hidden bg-background z-[2]">
              <Command>
                <Flex className="w-full p-2 flex gap-2">
                  <Input
                    placeholder="Add option..."
                    className="w-full h-9"
                    onChange={e => setNewInput(e.target.value)}
                    value={newInput}
                  />
                  <Flex
                    className="w-auto h-9 bg-gray-100 dark:bg-gray-800 rounded-xl px-2 flex items-center justify-center"
                    role="button"
                    onClick={() => {
                      if (
                        !options.find(option => option.value === newInput.trim()) &&
                        newInput.trim() !== ""
                      ) {
                        const value = newInput.trim()
                        setNewInput("")
                        setOptions([{ label: value, value: value }, ...options])
                        form.setValue(name, [...field.value, value])
                      }
                    }}
                  >
                    Add
                  </Flex>
                </Flex>
                <CommandInput placeholder="Search option..." className="w-full h-9" />
                <CommandList>
                  <CommandEmpty>No option found.</CommandEmpty>
                  <CommandGroup>
                    <ScrollArea>
                      {options.map(option => (
                        <CommandItem
                          value={option.value}
                          key={option.value}
                          onSelect={() => {
                            const values = field.value
                            const newValue = option.value
                            if (values?.includes(newValue)) {
                              form.setValue(
                                name,
                                values.filter((item: string) => item !== newValue)
                              )
                            } else {
                              form.setValue(name, [...values, newValue])
                            }
                          }}
                        >
                          {option.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              field?.value?.includes(option.value) ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </ScrollArea>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {description ? (
            <FormDescription className="flex flex-wrap items-center gap-2">
              <MessageCircleWarning className="w-4 h-4" />
              <span>{description}</span>
            </FormDescription>
          ) : null}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default Multibox
