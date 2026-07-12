"use client"

import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { DynamicCombobox } from "./d-combobox"
import DynamicTooltip from "../d-tooltip"

type ComboboxOption = {
  label: string
  value: string
  [key: string]: any
}

interface DComboboxInputProps {
  name: string
  label?: string
  placeholder?: string
  options: ComboboxOption[]
  description?: string
  className?: string
  tooltip?: string
  renderOption?: (option: ComboboxOption) => React.ReactNode
  searchPlaceholder?: string
  emptyPlaceholder?: string
}

const DComboboxInput = ({
  name,
  label,
  placeholder,
  options,
  description,
  className,
  tooltip,
  renderOption,
  searchPlaceholder,
  emptyPlaceholder,
}: DComboboxInputProps) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className, "space-y-2")}>
          {label && (
            <FormLabel className="flex items-center justify-between gap-4">
              {label} {tooltip && <DynamicTooltip content={tooltip} />}
            </FormLabel>
          )}
          <FormControl>
            <DynamicCombobox
              options={options}
              value={field.value}
              onSelect={field.onChange}
              placeholder={placeholder}
              renderOption={renderOption}
              searchPlaceholder={searchPlaceholder}
              emptyPlaceholder={emptyPlaceholder}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default DComboboxInput
