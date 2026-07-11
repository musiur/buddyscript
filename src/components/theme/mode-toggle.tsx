"use client"

import { Moon, Sun, Computer } from "lucide-react"
import { useTheme } from "next-themes"
import { motion as m } from "motion/react";

type Theme = "light" | "dark" | "system";

const Themes: Array<{ theme: Theme; icon: React.ComponentType }> = [
    {
        theme: "light",
        icon: Sun,
    },
    {
        theme: "dark",
        icon: Moon,
    },
    // {
    //     theme: "system",
    //     icon: Computer,
    // },

]

const positions = {
    light: 0,
    dark: 24,
    system: 48,
};

export function ModeToggle() {
    const { theme: _theme, setTheme } = useTheme();

    const handleThemeSwitch = (theme: Theme) => {
        setTheme(theme);
    };

    return (
        <div className={"fixed top-1/2 right-6 -translate-y-1/2 z-10 flex flex-col gap-0 rounded-full border border-primary bg-primary dark:bg-background shadow-xl p-0.5 backdrop-blur"}>
            {
                Themes.map(({ theme: theme, icon: Icon }) => {
                    return (
                        <div
                            key={theme}
                            onClick={() => handleThemeSwitch(theme)}
                            className="rounded-full w-6 h-6 flex items-center justify-center text-background dark:text-white [&>svg]:w-4 [&>svg]:h-4"
                            role="button"
                        >
                            <Icon />
                        </div>)
                })
            }
            <m.span
                className="absolute left-0.5 top-0.5 z-20 h-6 w-6 rounded-full bg-white dark:bg-primary"
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
