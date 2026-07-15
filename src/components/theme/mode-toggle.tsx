"use client"

import { Moon, Sun, Computer } from "lucide-react"
import { useTheme } from "next-themes"
import { motion as m } from "motion/react"

type Theme = "light" | "dark" | "system"

const Themes: Array<{ theme: Theme; icon: React.ComponentType }> = [
  {
    theme: "light",
    icon: Sun,
  },
  {
    theme: "dark",
    icon: Moon,
  },
  {
    theme: "system",
    icon: Computer,
  },
]

const positions = {
  light: 0,
  dark: 24,
  system: 48,
}

export function ModeToggle() {
  const { theme: _theme, setTheme } = useTheme()

  const handleThemeSwitch = (theme: Theme) => {
    setTheme(theme)
  }

  return (
    <div
      className={
        "border-primary bg-primary dark:bg-background fixed top-1/2 right-2 z-10 flex -translate-y-1/2 flex-col gap-0 rounded-full border p-0.5 shadow-xl backdrop-blur sm:right-6"
      }
    >
      {Themes.map(({ theme: theme, icon: Icon }) => {
        return (
          <div
            key={theme}
            onClick={() => handleThemeSwitch(theme)}
            className="text-background flex h-6 w-6 items-center justify-center rounded-full dark:text-white [&>svg]:h-4 [&>svg]:w-4"
            role="button"
          >
            <Icon />
          </div>
        )
      })}
      <m.span
        className="dark:bg-primary absolute top-0.5 left-0.5 z-20 h-6 w-6 rounded-full bg-white"
        animate={{ y: positions[_theme as Theme] }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 35,
        }}
      />
    </div>
  )
}
