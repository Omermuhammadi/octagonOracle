"use client"
import { cn } from "@/lib/utils"

interface PremiumProgressProps {
  value: number
  max?: number
  className?: string
  variant?: "default" | "neon" | "gradient" | "championship"
  glowColor?: "blue" | "red" | "white"
  animated?: boolean
}

export function PremiumProgress({
  value,
  max = 100,
  className,
  variant = "default",
  glowColor = "blue",
  animated = false,
}: PremiumProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)

  const containerClasses = "relative h-3 w-full overflow-hidden rounded-full glass border border-white/20"

  const barClasses = {
    default: "bg-gradient-to-r from-cyan-400 to-blue-500",
    neon: cn(
      "relative",
      glowColor === "blue" && "bg-cyan-400 glow-blue",
      glowColor === "red" && "bg-red-500 glow-red",
      glowColor === "white" && "bg-white glow-white",
    ),
    gradient: "animated-gradient",
    championship: "bg-gradient-to-r from-yellow-400 to-yellow-600",
  }

  const animationClasses = animated ? "transition-all duration-1000 ease-out" : ""

  return (
    <div className={cn(containerClasses, className)}>
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10" />

      {/* Progress bar */}
      <div
        className={cn(
          "h-full transition-all duration-500 ease-out rounded-full",
          barClasses[variant],
          animationClasses,
        )}
        style={{ width: `${percentage}%` }}
      >
        {/* Shimmer effect */}
        {animated && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
        )}
      </div>

      {/* LED indicators */}
      <div className="absolute inset-y-0 right-2 flex items-center">
        <div
          className={cn(
            "w-1 h-1 rounded-full led-indicator",
            percentage > 75 ? "text-green-400" : percentage > 50 ? "text-yellow-400" : "text-red-400",
          )}
        />
      </div>
    </div>
  )
}
