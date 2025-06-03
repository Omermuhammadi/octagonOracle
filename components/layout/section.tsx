import type React from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: "default" | "muted" | "accent"
  spacing?: "none" | "sm" | "md" | "lg" | "xl"
}

export default function Section({ children, className, background = "default", spacing = "lg" }: SectionProps) {
  const backgroundClasses = {
    default: "bg-[#0a0a0a]",
    muted: "bg-[#111111]",
    accent: "bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]",
  }

  const spacingClasses = {
    none: "",
    sm: "py-16",
    md: "py-24",
    lg: "py-32",
    xl: "py-40",
  }

  return <section className={cn(backgroundClasses[background], spacingClasses[spacing], className)}>{children}</section>
}
