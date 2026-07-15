"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { useFormContext } from "react-hook-form"

export default function DCheckbox({ name, label }: { name: string; label: string }) {
  const form = useFormContext()
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={name}
        checked={form.watch(name)}
        onCheckedChange={(checked) => {
          form.setValue(name, checked === true)
          if (!checked) {
            form.setValue(name, false)
          }
        }}
      />
      <label
        htmlFor={name}
        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  )
}
