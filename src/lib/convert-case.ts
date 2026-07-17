export type LetterCase = "snake" | "camel" | "pascal"

const splitWords = (input: string): string[] => {
  return (
    input
      // camelCase / PascalCase → camel Case
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      // snake_case / kebab-case → snake case
      .replace(/[_-]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word.toLowerCase())
  )
}

export const convertCase = (input: string, target: LetterCase): string => {
  const words = splitWords(input)

  switch (target) {
    case "snake":
      return words.join("_")

    case "camel":
      return words
        .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
        .join("")

    case "pascal":
      return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("")

    default:
      return input
  }
}

export const convertObjectKeysCase = <T extends object>(input: T, target?: LetterCase): T => {
  const result: Record<string, unknown> = {}

  Object.entries(input).forEach(([key, value]) => {
    result[convertCase(key, target || "camel")] = value
  })

  return result as T
}
