import { create } from "zustand"
import { User } from "@/entities/user/model"
import { useQuery } from "@tanstack/react-query"
import { meAction } from "../actions/me"
import { persist } from "zustand/middleware"

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
  const setUser = useAuthStore((s) => s.setUser)
  const persistedUser = useAuthStore((s) => s.user)

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

  return query
}
