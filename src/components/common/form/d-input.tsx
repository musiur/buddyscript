/**
 * @author: github.com/musiur
 * Created: 29 May, 2024
 * Updated: 15 Feb, 2025
 *
 * @description Unified & reusable INPUT component
 *
 * @params form, name, type, label, placeholder etc
 * form: react-hook-form
 * name: input name
 * type: input types
 * placeholder: input placeholder
 */

"use client"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { CalendarIcon, Eye, EyeOff } from "lucide-react"
import { ChangeEvent, ReactNode, useState } from "react"
import { ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TypeSelectOption } from "./multibox"
import DynamicTooltip from "../d-tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDate } from "@/lib/date-formatter/date-formatter"

export type TypeDInputTypes = "text" | "password" | "textarea" | "select" | "date" | "datetime" | "number"

type TypeDInputField = ControllerRenderProps<FieldValues, string>

const DInput = ({
  name = "input",
  type = "text",
  label = "Input Field",
  placeholder = "",
  options = [{ label: "Test", value: "test" }],
  maxValue = 9999999999,
  minValue = 0,
  readOnly = false,
  disabled = false,
  className = "",
  tooltip = "",
  description,
  defaultValue = "",
}: {
  name: string
  type?: TypeDInputTypes
  label?: string
  placeholder?: string
  options?: TypeSelectOption[]
  maxValue?: number
  minValue?: number
  readOnly?: boolean
  disabled?: boolean
  className?: string
  tooltip?: string
  description?: string
  defaultValue?: string
}) => {
  const form = useFormContext()
  // State to manage showing password fields input as text or, password
  const [compost, setCompost] = useState({ showPass: false, dateOpen: false })

  // All Input fields in an Object Scaffold
  const inputFields: Record<TypeDInputTypes, (field: TypeDInputField) => ReactNode> = {
    text: (field: TypeDInputField) => (
      <Input
        placeholder={placeholder}
        {...field}
        type={type}
        readOnly={readOnly}
        disabled={disabled || readOnly}
        className={className}
      />
    ),
    number: (field: TypeDInputField) => (
      <Input
        placeholder={placeholder}
        value={parseFloat(field.value || "0")}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.value) {
            field.onChange(parseFloat(e.target.value))
          }
        }}
        type={type}
        readOnly={readOnly}
        disabled={disabled || readOnly}
        className={className}
        max={maxValue}
        min={minValue}
      />
    ),
    password: (field: TypeDInputField) => (
      <div className="relative">
        <Input
          placeholder={placeholder}
          {...field}
          type={compost.showPass ? "text" : "password"}
          readOnly={readOnly}
          disabled={disabled || readOnly}
          className={className}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2.5 h-7 w-7"
          onClick={() => setCompost(prev => ({ ...prev, showPass: !prev.showPass }))}
        >
          {compost.showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
    ),
    textarea: (field: TypeDInputField) => (
      <Textarea
        placeholder={placeholder}
        {...field}
        readOnly={readOnly}
        disabled={disabled || readOnly}
        className={className}
      />
    ),
    select: (field: TypeDInputField) => (
      <Select
        onValueChange={field.onChange}
        defaultValue={field.value}
        disabled={disabled || readOnly}
      >
        <FormControl>
          <SelectTrigger className={cn("w-full", className)}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <ScrollArea className="max-h-[160px] h-auto">
            {options?.length
              ? options?.map((option: TypeSelectOption, index: number) => {
                  const { value, label } = option
                  return (
                    <SelectItem key={value || `option-${index}`} value={value}>
                      {label}
                    </SelectItem>
                  )
                })
              : null}
          </ScrollArea>
        </SelectContent>
      </Select>
    ),
    date: (field: TypeDInputField) => (
      <Popover
        open={compost.dateOpen}
        onOpenChange={open => setCompost(prev => ({ ...prev, dateOpen: open }))}
      >
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "w-full pl-3 text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
              onClick={() => setCompost(prev => ({ ...prev, dateOpen: true }))}
            >
              {field.value ? formatDate(field.value) : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        {disabled || readOnly ? null : (
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={value => {
                if (value) {
                  field.onChange(new Date(value))
                  setCompost(prev => ({ ...prev, dateOpen: false }))
                }
              }}
              disabled={(date: Date) => date < new Date() && date > new Date("1900-01-01")}
            />
          </PopoverContent>
        )}
      </Popover>
    ),
    datetime: (field: TypeDInputField) => (
      <Popover
        open={compost.dateOpen}
        onOpenChange={open => setCompost(prev => ({ ...prev, dateOpen: open }))}
      >
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "w-full pl-3 text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
              onClick={() => setCompost(prev => ({ ...prev, dateOpen: true }))}
            >
              {field.value ? formatDate(field.value, "withTime") : <span>Pick date & time</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        {disabled || readOnly ? null : (
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={value => {
                if (value) {
                  const existing = field.value instanceof Date ? field.value : new Date()
                  const next = new Date(value)
                  next.setHours(existing.getHours(), existing.getMinutes(), 0, 0)
                  field.onChange(next)
                }
              }}
            />
            <div className="border-t p-3">
              <input
                type="time"
                className="w-full rounded border px-2 py-1 text-sm"
                value={
                  field.value instanceof Date
                    ? `${String(field.value.getHours()).padStart(2, "0")}:${String(field.value.getMinutes()).padStart(2, "0")}`
                    : ""
                }
                onChange={e => {
                  const [hours, minutes] = e.target.value.split(":").map(Number)
                  const next = field.value instanceof Date ? new Date(field.value) : new Date()
                  next.setHours(hours, minutes, 0, 0)
                  field.onChange(next)
                }}
              />
            </div>
          </PopoverContent>
        )}
      </Popover>
    ),
  }
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className, "space-y-2")}>
          <FormLabel className="flex items-center justify-between gap-4">
            {label} {tooltip && <DynamicTooltip content={tooltip} />}
          </FormLabel>
          <FormControl>{inputFields[type](field)}</FormControl>
          {description ? <FormDescription>{description}</FormDescription> : null}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default DInput
