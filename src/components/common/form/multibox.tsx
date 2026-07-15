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
                    "h-auto justify-between px-2",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <div className="flex flex-wrap gap-2">
                    {" "}
                    {field?.value?.length > 0
                      ? field?.value
                          ?.map(
                            (item: string) => options.find((option) => option.value === item)?.label
                          )
                          ?.map((item: string) => {
                            return (
                              <div
                                className="rounded bg-gray-200 px-[8px] pt-[2px] dark:bg-gray-800"
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
            <PopoverContent className="border-border bg-background z-[2] w-full overflow-hidden rounded-xl border p-0">
              <Command>
                <Flex className="flex w-full gap-2 p-2">
                  <Input
                    placeholder="Add option..."
                    className="h-9 w-full"
                    onChange={(e) => setNewInput(e.target.value)}
                    value={newInput}
                  />
                  <Flex
                    className="flex h-9 w-auto items-center justify-center rounded-xl bg-gray-100 px-2 dark:bg-gray-800"
                    role="button"
                    onClick={() => {
                      if (
                        !options.find((option) => option.value === newInput.trim()) &&
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
                <CommandInput placeholder="Search option..." className="h-9 w-full" />
                <CommandList>
                  <CommandEmpty>No option found.</CommandEmpty>
                  <CommandGroup>
                    <ScrollArea>
                      {options.map((option) => (
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
              <MessageCircleWarning className="h-4 w-4" />
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
