import type React from "react"
import { cn } from "@/lib/utils"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  padding?: "none" | "sm" | "md" | "lg"
}

export default function PageContainer({ children, className, maxWidth = "xl", padding = "lg" }: PageContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    "2xl": "max-w-8xl",
    full: "max-w-full",
  }

  const paddingClasses = {
    none: "",
    sm: "px-4 sm:px-4 py-6 sm:py-8",
    md: "px-4 sm:px-6 py-8 sm:py-16",
    lg: "px-4 sm:px-6 py-12 sm:py-24",
  }

  return (
    <div className={cn("mx-auto w-full", maxWidthClasses[maxWidth], paddingClasses[padding], className)}>
      {children}
    </div>
  )
}
