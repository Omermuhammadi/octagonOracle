"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { PremiumButton } from "@/components/ui/premium-button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <PremiumButton
          variant={theme === "dark" ? "neon" : "outline"}
          glowColor={theme === "dark" ? "blue" : undefined}
          size="icon"
          className="relative h-12 w-12 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {mounted ? (
            <>
              <Sun 
                className={`h-5 w-5 absolute transition-all duration-500 ${
                  theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`} 
              />
              <Moon 
                className={`h-5 w-5 absolute transition-all duration-500 ${
                  theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                }`} 
              />
            </>
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </PremiumButton>
      </TooltipTrigger>
      <TooltipContent>
        <p>Switch to {mounted ? (theme === "dark" ? "light" : "dark") : "..."} mode</p>
      </TooltipContent>
    </Tooltip>
  )
}
