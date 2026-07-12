import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncate = (
  text: string,
  limit: number = 25,
  preserveExtension: boolean = false
): string => {
  if (!text || text?.length <= limit) return text

  if (!preserveExtension) {
    return `${text.slice(0, limit)}...`
  }
  const dotIndex = text.lastIndexOf(".")
  const hasExtension = dotIndex !== -1
  const name = hasExtension ? text.slice(0, dotIndex) : text
  const ext = hasExtension ? text.slice(dotIndex) : ""

  const availableLength = limit - ext?.length - 3
  if (availableLength <= 0) return `${text.slice(0, limit)}...`

  return `${name.slice(0, availableLength)}...${ext}`
}

export const truncateFileName = (fileName: string, limit: number = 25): string => {
  if (!fileName) return fileName

  const cleanedName = fileName.replace(/^\d{10,}-?/, "")

  return truncate(cleanedName, limit, true)
}

export function getAvatarFallback(name: string): string {
  if (!name || name.trim()?.length === 0) return "NA"
  const words = name.trim().split(/\s+/)
  if (words?.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }
  return (words[0][0] + words[1][0]).toUpperCase()
}

export function stringToNumber(str: string): number {
  let hash = 0
  for (let i = 0; i < str?.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash)
}

export function numberToHsl(num: number): string {
  const hue = num % 360
  return `hsl(${hue}, 20%, 40%)`
}

export function getAvatarColor(seed: string): string {
  const num = stringToNumber(seed)
  return numberToHsl(num)
}

export const getUsernameFromEmail = (email: string) => {
  return email?.split("@")[0].replace(/[^a-zA-Z0-9]/g, " ") || " "
}

export const MakeUUIDFromEmailSub = (email: string, sub: string) => {
  return `${email.split("@")[0]}${sub.split("-")[0]}`.slice(0, 15)?.replace(/[^a-zA-Z0-9]/g, "")
}

export const MakeModalKey = (id: string) => {
  return id.replaceAll("-", "").slice(0, 10)
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}
