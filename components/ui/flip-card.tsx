"use client"

import { useState, ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { prefersReducedMotion } from "@/lib/animation-utils"

interface FlipCardProps {
  front: ReactNode
  back: ReactNode
  className?: string
  flipOnHover?: boolean
  flipOnClick?: boolean
  height?: string
  width?: string
  perspective?: number
  flipDuration?: number
}

export function FlipCard({
  front,
  back,
  className,
  flipOnHover = false,
  flipOnClick = true,
  height = "100%",
  width = "100%",
  perspective = 1000,
  flipDuration = 0.6,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  // Don't apply flip effect if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <div className={cn("relative", className)} style={{ height, width }}>
        <div className="absolute inset-0">{isFlipped ? back : front}</div>
        {flipOnClick && (
          <button
            className="absolute inset-0 z-10 w-full h-full cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            aria-label={isFlipped ? "Show front" : "Show back"}
          />
        )}
      </div>
    )
  }

  const handleFlip = () => {
    if (flipOnClick) {
      setIsFlipped(!isFlipped)
    }
  }

  return (
    <div
      className={cn("flip-card", className)}
      style={{
        perspective: `${perspective}px`,
        height,
        width,
      }}
      onClick={handleFlip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleFlip()
        }
      }}
      tabIndex={flipOnClick ? 0 : -1}
      role={flipOnClick ? "button" : undefined}
      aria-label={flipOnClick ? (isFlipped ? "Show front" : "Show back") : undefined}
    >
      <motion.div
        className="flip-card-inner relative w-full h-full transform-style-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: flipDuration, ease: "easeInOut" }}
        style={{
          ...(flipOnHover && { rotateY: isFlipped ? 180 : 0 }),
        }}
        onHoverStart={() => flipOnHover && setIsFlipped(true)}
        onHoverEnd={() => flipOnHover && setIsFlipped(false)}
      >
        <div className="flip-card-front absolute w-full h-full backface-hidden">
          {front}
        </div>
        <div
          className="flip-card-back absolute w-full h-full backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  )
} 