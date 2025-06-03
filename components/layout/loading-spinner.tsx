"use client"

import { AnimatedLoader } from "@/components/ui/animated-loader"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: "blue" | "red" | "white"
  text?: string
  fullScreen?: boolean
}

export default function LoadingSpinner({
  size = "md",
  color = "blue",
  text = "Loading...",
  fullScreen = false,
}: LoadingSpinnerProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-4">
          <AnimatedLoader type="octagon" size={size} color={color} text={text} />
        </div>
      </div>
    )
  }

  return <AnimatedLoader type="spinner" size={size} color={color} text={text} />
}
