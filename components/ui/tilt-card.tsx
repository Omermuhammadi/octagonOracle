"use client"

import { ReactNode } from "react"
import { Tilt } from "react-tilt"
import { cn } from "@/lib/utils"
import { prefersReducedMotion } from "@/lib/animation-utils"

interface TiltCardProps {
  children: ReactNode
  className?: string
  glowColor?: "blue" | "red" | "none"
  tiltMaxAngleX?: number
  tiltMaxAngleY?: number
  perspective?: number
  scale?: number
  transitionSpeed?: number
  tiltReverse?: boolean
  glowIntensity?: number
}

const defaultOptions = {
  reverse: false,
  max: 15,
  perspective: 1000,
  scale: 1.02,
  speed: 300,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
}

export function TiltCard({
  children,
  className,
  glowColor = "none",
  tiltMaxAngleX = 15,
  tiltMaxAngleY = 15,
  perspective = 1000,
  scale = 1.02,
  transitionSpeed = 300,
  tiltReverse = false,
  glowIntensity = 0.3,
}: TiltCardProps) {
  // Don't apply tilt effect if user prefers reduced motion
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const tiltOptions = {
    ...defaultOptions,
    max: Math.max(tiltMaxAngleX, tiltMaxAngleY),
    perspective,
    scale,
    speed: transitionSpeed,
    reverse: tiltReverse,
  }

  // Generate glow effect styles
  const getGlowStyles = (glowColor: string) => {
    return {
      "&:hover::before": {
        opacity: glowIntensity,
      },
      "&::before": {
        content: '""',
        position: "absolute",
        inset: "-1px",
        zIndex: -1,
        opacity: 0,
        transition: "opacity 0.3s ease",
        borderRadius: "inherit",
        background: `radial-gradient(circle at var(--x) var(--y), ${glowColor}, transparent 70%)`,
      },
    }
  }

  const getGlowColor = () => {
    switch (glowColor) {
      case "blue":
        return "rgba(0, 212, 255, 0.6)"
      case "red":
        return "rgba(210, 10, 17, 0.6)"
      default:
        return "transparent"
    }
  }

  return (
    <Tilt options={tiltOptions} className={cn("relative transform-gpu", className)}>
      <div
        className="w-full h-full"
        style={{
          "--x": "50%",
          "--y": "50%",
          ...(glowColor !== "none" ? getGlowStyles(getGlowColor()) : {}),
        } as React.CSSProperties}
        onMouseMove={(e) => {
          if (glowColor !== "none") {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = ((e.clientX - rect.left) / rect.width) * 100
            const y = ((e.clientY - rect.top) / rect.height) * 100
            e.currentTarget.style.setProperty("--x", `${x}%`)
            e.currentTarget.style.setProperty("--y", `${y}%`)
          }
        }}
      >
        {children}
      </div>
    </Tilt>
  )
} 