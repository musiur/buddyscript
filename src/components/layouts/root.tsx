"use client"

import { ThemeProvider } from "@/components/theme/theme-provider"
import { ModeToggle } from "@/components/theme/mode-toggle"
import Navbar from "./navbar/navbar"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"
import { Toaster } from "sonner"

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <ModeToggle />
        <Navbar />
        {children}
        <Toaster />
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
