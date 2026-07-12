/**
 * Returns a previous date string in YYYY-MM-DD format.
 * @param daysAgo Number of days to subtract from today
 * @returns Formatted date string
 */
export function getPreviousDate(daysAgo: number): string {
  const today = new Date()
  today.setDate(today.getDate() - daysAgo)

  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}T00:00:00Z`
}
