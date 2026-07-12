import { formatInTimeZone } from "date-fns-tz"
import { formatDistanceToNow } from "date-fns"

/**
 * Ensures a date string is treated as UTC if it doesn't have timezone info
 */
function ensureUtcDate(dateInput: string | Date): Date {
  if (dateInput instanceof Date) {
    return dateInput
  }

  // If the string doesn't end with 'Z' or have timezone info, treat it as UTC
  if (
    typeof dateInput === "string" &&
    !dateInput.includes("Z") &&
    !dateInput.includes("+") &&
    !dateInput.includes("-", 10)
  ) {
    // Add 'Z' to indicate UTC
    return new Date(dateInput + "Z")
  }

  return new Date(dateInput)
}

export const getFormattedDate = (date: string): string => {
  const parsedDate = ensureUtcDate(date)
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return formatInTimeZone(parsedDate, timeZone, "dd MMMM yyyy")
}

export const formatISODate = (isoDate: string): string => {
  const date = ensureUtcDate(isoDate)
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return formatInTimeZone(date, timeZone, "MMM d, yyyy")
}

export function formatDate(
  givenDate: Date | string,
  type?:
    | "withTime"
    | "withoutTime"
    | "onlyTime"
    | "tillNow"
    | "dateDayName"
    | "hour"
    | "weekdays"
    | "day"
    | "week"
    | "timeLeft"
    | "timeAmPm"
) {
  // Ensure we have a proper Date object, treating strings as UTC if no timezone specified
  const date = ensureUtcDate(givenDate)

  // Validate the date
  if (isNaN(date.getTime())) {
    return "Invalid date"
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  if (type === "withTime") {
    return formatInTimeZone(date, timeZone, "PPP h:mm a")
  }
  if (type === "onlyTime") {
    return formatInTimeZone(date, timeZone, "h:mm a")
  }
  if (type === "timeAmPm") {
    return formatInTimeZone(date, timeZone, "hh:mm a")
  }

  if (type === "tillNow") {
    return formatDistanceToNow(date, { addSuffix: true })
  }
  if (type === "dateDayName") {
    return formatInTimeZone(date, timeZone, "d MMM, EEEE")
  }
  if (type === "hour") {
    return formatInTimeZone(date, timeZone, "h a")
  }
  if (type === "weekdays") {
    return formatInTimeZone(date, timeZone, "EEE")
  }
  if (type === "day") {
    return formatInTimeZone(date, timeZone, "d")
  }
  if (type === "week") {
    return formatInTimeZone(date, timeZone, "O")
  }
  if (type === "timeLeft") {
    const now = new Date()
    if (date < now) {
      return `Expired on ${formatInTimeZone(date, timeZone, "PPP")}`
    }
    return `${formatDistanceToNow(date).replace("about ", "")} left`
  }
  return formatInTimeZone(date, timeZone, "PPP")
}

export function customFormatDate(date: Date, formatValue: string) {
  return formatInTimeZone(date, Intl.DateTimeFormat().resolvedOptions().timeZone, formatValue)
}
