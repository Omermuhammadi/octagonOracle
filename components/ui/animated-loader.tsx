"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedLoaderProps {
  type?: "spinner" | "dots" | "pulse" | "bar" | "octagon"
  size?: "sm" | "md" | "lg"
  color?: "blue" | "red" | "white"
  className?: string
  text?: string
}

export function AnimatedLoader({
  type = "spinner",
  size = "md",
  color = "blue",
  className,
  text,
}: AnimatedLoaderProps) {
  const getColorClass = () => {
    switch (color) {
      case "blue":
        return "text-cyan-400 border-cyan-400"
      case "red":
        return "text-red-500 border-red-500"
      case "white":
        return "text-white border-white"
      default:
        return "text-cyan-400 border-cyan-400"
    }
  }

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "w-5 h-5 border-2"
      case "md":
        return "w-8 h-8 border-3"
      case "lg":
        return "w-12 h-12 border-4"
      default:
        return "w-8 h-8 border-3"
    }
  }

  const renderLoader = () => {
    switch (type) {
      case "spinner":
        return (
          <motion.div
            className={cn(
              "rounded-full border-t-transparent animate-spin",
              getColorClass(),
              getSizeClass(),
              className
            )}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )
      case "dots":
        return (
          <div className={cn("flex items-center gap-1", className)}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={cn(
                  "rounded-full",
                  color === "blue" && "bg-cyan-400",
                  color === "red" && "bg-red-500",
                  color === "white" && "bg-white",
                  size === "sm" && "w-2 h-2",
                  size === "md" && "w-3 h-3",
                  size === "lg" && "w-4 h-4"
                )}
                animate={{
                  y: ["0%", "-50%", "0%"],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )
      case "pulse":
        return (
          <motion.div
            className={cn(
              "rounded-full",
              color === "blue" && "bg-cyan-400",
              color === "red" && "bg-red-500",
              color === "white" && "bg-white",
              getSizeClass(),
              className
            )}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )
      case "bar":
        return (
          <div className={cn("w-full h-1 bg-gray-800 rounded overflow-hidden", className)}>
            <motion.div
              className={cn(
                "h-full",
                color === "blue" && "bg-cyan-400",
                color === "red" && "bg-red-500",
                color === "white" && "bg-white"
              )}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ width: "30%" }}
            />
          </div>
        )
      case "octagon":
        return (
          <div className="relative">
            <motion.div
              className={cn(
                "octagon border-2",
                color === "blue" && "border-cyan-400 glow-blue",
                color === "red" && "border-red-500 glow-red",
                color === "white" && "border-white",
                size === "sm" && "w-8 h-8",
                size === "md" && "w-12 h-12",
                size === "lg" && "w-16 h-16",
                className
              )}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className={cn(
                "octagon border-2 absolute inset-0 m-2",
                color === "blue" && "border-cyan-400/50",
                color === "red" && "border-red-500/50",
                color === "white" && "border-white/50"
              )}
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {renderLoader()}
      {text && <p className={cn("text-sm", `text-${color === "white" ? "white" : color}-${color === "white" ? "" : "400"}`)}>{text}</p>}
    </div>
  )
} 