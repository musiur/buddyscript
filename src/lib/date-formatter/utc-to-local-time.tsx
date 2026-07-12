import type { ReactNode } from "react"
import type { Locale } from "date-fns"
import { formatInTimeZone } from "date-fns-tz"

import { customFormatDate, formatDate } from "./date-formatter"

type FormatDateType = Parameters<typeof formatDate>[1]

export type UtcToLocalTimeProps = {
  value?: string | number | Date | null | undefined
  type?: FormatDateType
  format?: string
  locale?: Locale
  fallback?: ReactNode
  className?: string
}

const DEFAULT_FORMAT = "PPP p"

export function UtcToLocalTime({
  value,
  type,
  format = DEFAULT_FORMAT,
  locale,
  fallback = null,
  className,
}: UtcToLocalTimeProps) {
  if (!value && value !== 0) {
    return fallback ? <span className={className}>{fallback}</span> : null
  }

  const parsedDate =
    typeof value === "string" || typeof value === "number"
      ? new Date(value)
      : (value ?? new Date(NaN))

  if (Number.isNaN(parsedDate.getTime())) {
    return fallback ? <span className={className}>{fallback}</span> : null
  }

  let formatted: string

  if (type) {
    formatted = formatDate(parsedDate, type)
  } else if (format) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    formatted = formatInTimeZone(
      parsedDate,
      timeZone,
      format,
      locale
        ? {
            locale,
          }
        : undefined
    )
  } else {
    formatted = customFormatDate(parsedDate, DEFAULT_FORMAT)
  }

  return (
    <time className={className} dateTime={parsedDate.toISOString()}>
      {formatted}
    </time>
  )
}
