"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface PremiumCardProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "glass" | "neon" | "holographic"
  glowColor?: "blue" | "red" | "white"
  hover?: boolean
}

export function PremiumCard({
  children,
  className,
  variant = "default",
  glowColor = "blue",
  hover = true,
}: PremiumCardProps) {
  const baseClasses = "relative overflow-hidden rounded-2xl border transition-all duration-300"

  const variantClasses = {
    default: "bg-gradient-to-br from-gray-900/50 to-black/50 border-white/10",
    glass: "glass border-white/20 shadow-premium",
    neon: cn(
      "glass border-2",
      glowColor === "blue" && "border-cyan-400/50 glow-blue",
      glowColor === "red" && "border-red-500/50 glow-red",
      glowColor === "white" && "border-white/50 glow-white",
    ),
    holographic: "glass border-white/20 holographic shadow-premium-lg",
  }

  const hoverClasses = hover ? "hover:shadow-premium-lg hover:scale-[1.02] transform-gpu" : ""

  return (
    <div className={cn(baseClasses, variantClasses[variant], hoverClasses, className)}>
      {/* Scan line effect */}
      <div className="scan-lines absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    </div>
  )
}
