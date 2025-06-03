"use client"
import { cn } from "@/lib/utils"
import { Input, type InputProps } from "@/components/ui/input"

interface PremiumInputProps extends InputProps {
  label?: string
  variant?: "default" | "floating" | "neon"
  glowColor?: "blue" | "red" | "white"
}

export function PremiumInput({
  label,
  className,
  variant = "default",
  glowColor = "blue",
  ...props
}: PremiumInputProps) {
  const baseClasses = "glass border-white/20 text-white placeholder:text-white/50 transition-all duration-300"

  const variantClasses = {
    default: "focus:border-white/40 focus:glow-white",
    floating: "focus:border-cyan-400/50 focus:glow-blue",
    neon: cn(
      "border-2",
      glowColor === "blue" && "border-cyan-400/30 focus:border-cyan-400 focus:glow-blue",
      glowColor === "red" && "border-red-500/30 focus:border-red-500 focus:glow-red",
      glowColor === "white" && "border-white/30 focus:border-white focus:glow-white",
    ),
  }

  if (variant === "floating" && label) {
    return (
      <div className="floating-label">
        <Input
          className={cn(baseClasses, variantClasses[variant], "pt-6 pb-2", className)}
          placeholder=" "
          {...props}
        />
        <label className="absolute left-3 top-3 text-white/70 transition-all duration-200 pointer-events-none">
          {label}
        </label>
      </div>
    )
  }

  return <Input className={cn(baseClasses, variantClasses[variant], className)} {...props} />
}
