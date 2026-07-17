import { create } from "zustand"
import { User } from "@/entities/user/model"
import { useMutation, useQuery } from "@tanstack/react-query"
import { meAction } from "../actions/me"
import { persist } from "zustand/middleware"
import { logoutAction } from "../actions/logout"
import { useInvalidateCache } from "@/hooks/use-invalidate-cache"

interface IAuthStore {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => {
        set({ user })
      },
      clearUser: () => {
        set({ user: null })
      },
    }),
    { name: "auth-storage" }
  )
)

export function useAuth() {
  const { invalidateCache } = useInvalidateCache()
  const setUser = useAuthStore((s) => s.setUser)
  const persistedUser = useAuthStore((s) => s.user)
  const clearUser = useAuthStore((s) => s.clearUser)

  const query = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await meAction()

      if (response?.success && response.data) {
        setUser(response.data)
        return response.data
      }

      return null
    },

    initialData: persistedUser ?? undefined,

    staleTime: 3600,
  })

  const { isPending, mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await logoutAction()

      return response
    },
  })

  return { ...query, logout: mutate, isLogoutPending: isPending }
}
