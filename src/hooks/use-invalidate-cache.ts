import { useQueryClient } from "@tanstack/react-query"

type QueryKey = string | readonly unknown[]
export const useInvalidateCache = () => {
  const queryClient = useQueryClient()

  const invalidateCache = async (keys: QueryKey[]) => {
    await Promise.all(
      keys.map(key => {
        const queryKey = typeof key === "string" ? [key] : key
        return queryClient.invalidateQueries({ queryKey })
      })
    )
  }

  return { invalidateCache }
}
