import { ThemeProvider } from "@/components/theme/theme-provider"
import { ModeToggle } from "@/components/theme/mode-toggle"
import Navbar from "./navbar/navbar"

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ModeToggle />
      <Navbar />
      {children}
    </ThemeProvider>
  )
}
