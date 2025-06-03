"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"
import { prefersReducedMotion } from "@/lib/animation-utils"

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  formatValue?: (value: number) => string
  className?: string
  delay?: number
  ease?: string
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  formatValue = (value) => Math.round(value).toString(),
  className,
  delay = 0,
  ease = "easeOut",
}: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const [isInView, setIsInView] = useState(false)
  
  // Skip animation if user prefers reduced motion
  const shouldAnimate = !prefersReducedMotion
  
  // Use motion value for smooth animation
  const motionValue = useMotionValue(from)
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
    duration: shouldAnimate ? duration * 1000 : 0,
  })
  
  const animatedValue = useTransform(springValue, (value) => formatValue(value))
  
  // Start animation when in view
  useEffect(() => {
    if (isInView || !shouldAnimate) {
      setTimeout(() => {
        motionValue.set(to)
      }, delay * 1000)
    }
  }, [isInView, to, motionValue, delay, shouldAnimate])
  
  // Set up intersection observer to detect when counter is in view
  useEffect(() => {
    if (!nodeRef.current) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    
    observer.observe(nodeRef.current)
    
    return () => {
      observer.disconnect()
    }
  }, [])
  
  // If reduced motion is preferred, just show the final value
  if (prefersReducedMotion) {
    return <span className={className}>{formatValue(to)}</span>
  }
  
  return (
    <motion.span ref={nodeRef} className={cn("tabular-nums", className)}>
      {animatedValue}
    </motion.span>
  )
}
