"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

interface PremiumButtonProps extends ButtonProps {
  variant?: "default" | "neon" | "glass" | "gradient" | "championship"
  glowColor?: "blue" | "red" | "white"
  children: React.ReactNode
}

export function PremiumButton({
  children,
  className,
  variant = "default",
  glowColor = "blue",
  asChild = false,
  ...props
}: PremiumButtonProps) {
  const baseClasses = "relative overflow-hidden font-semibold tracking-wide transform-gpu transition-all duration-300"

  const variantClasses = {
    default: "btn-premium",
    neon: cn(
      "glass border-2 font-bold",
      glowColor === "blue" && "border-cyan-400/50 text-cyan-400 hover:glow-blue hover:bg-cyan-400/10",
      glowColor === "red" && "border-red-500/50 text-red-500 hover:glow-red hover:bg-red-500/10",
      glowColor === "white" && "border-white/50 text-white hover:glow-white hover:bg-white/10",
    ),
    glass: "glass-strong hover:bg-white/20 text-white border-white/30",
    gradient: "animated-gradient text-white border-0 font-bold",
    championship:
      "championship-belt bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold border-yellow-500",
  }

  // When asChild is true, we need to pass the children directly without wrapping
  if (asChild) {
    return (
      <Button 
        className={cn(baseClasses, variantClasses[variant], className)} 
        asChild={true}
        {...props}
      >
        {children}
      </Button>
    )
  }

  // Normal rendering with shimmer effect for non-asChild usage
  return (
    <Button className={cn(baseClasses, variantClasses[variant], className)} {...props}>
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </Button>
  )
}
