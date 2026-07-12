/**
 * Utility functions for timezone detection and display
 */

export interface TimezoneInfo {
  timezone: string
  offset: string
  offsetMinutes: number
  country?: string
  city?: string
}

/**
 * Get comprehensive timezone information for the current user
 */
export function getUserTimezoneInfo(): TimezoneInfo {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const now = new Date()
  const offsetMinutes = -now.getTimezoneOffset()
  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60)
  const offsetMins = Math.abs(offsetMinutes) % 60
  const offsetSign = offsetMinutes >= 0 ? "+" : "-"
  const offset = `UTC${offsetSign}${offsetHours.toString().padStart(2, "0")}:${offsetMins.toString().padStart(2, "0")}`

  // Extract city and potential country from timezone
  const parts = timezone.split("/")
  const city = parts[parts?.length - 1]?.replace(/_/g, " ")
  const country = parts?.length > 2 ? parts[1] : parts[0]

  return {
    timezone,
    offset,
    offsetMinutes,
    city,
    country: country !== city ? country : undefined,
  }
}

/**
 * Format timezone info for display
 */
export function formatTimezoneDisplay(info?: TimezoneInfo): string {
  const tz = info || getUserTimezoneInfo()

  if (tz.city && tz.country) {
    return `${tz.city}, ${tz.country} (${tz.offset})`
  } else if (tz.city) {
    return `${tz.city} (${tz.offset})`
  }

  return `${tz.timezone} (${tz.offset})`
}

/**
 * Check if a date string needs UTC treatment
 */
export function needsUtcTreatment(dateString: string): boolean {
  return !dateString.includes("Z") && !dateString.includes("+") && !dateString.includes("-", 10) // Don't match date separators
}

/**
 * Debug function to show timezone conversion details
 */
export function debugTimezoneConversion(originalDate: string | Date) {
  const userTz = getUserTimezoneInfo()
  const original = typeof originalDate === "string" ? originalDate : originalDate.toISOString()
  const parsed = new Date(original)
  const withUtc =
    typeof originalDate === "string" && needsUtcTreatment(original)
      ? new Date(original + "Z")
      : parsed

  return {
    userTimezone: userTz,
    originalString: original,
    parsedAsLocal: parsed.toISOString(),
    parsedAsUtc: withUtc.toISOString(),
    localDisplay: parsed.toLocaleString(),
    utcDisplay: withUtc.toLocaleString(),
    recommendation: needsUtcTreatment(original) ? "Treat as UTC" : "Has timezone info",
  }
}
