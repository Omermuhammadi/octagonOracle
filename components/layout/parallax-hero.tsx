"use client"

import { ReactNode, useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { prefersReducedMotion } from "@/lib/animation-utils"

interface ParallaxHeroProps {
  title: string | ReactNode
  subtitle?: string | ReactNode
  backgroundImage?: string
  className?: string
  height?: string
  children?: ReactNode
  overlayOpacity?: number
  parallaxStrength?: number
}

export default function ParallaxHero({
  title,
  subtitle,
  backgroundImage = "/hero-bg.jpg",
  className,
  height = "600px",
  children,
  overlayOpacity = 0.5,
  parallaxStrength = 0.2,
}: ParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${parallaxStrength * 100}%`]
  )
  
  // Handle mouse movement for subtle parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    
    const x = (clientX / innerWidth - 0.5) * 2
    const y = (clientY / innerHeight - 0.5) * 2
    
    setMousePosition({ x, y })
  }
  
  // Reset mouse position when component unmounts
  useEffect(() => {
    return () => setMousePosition({ x: 0, y: 0 })
  }, [])
  
  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ height }}
      onMouseMove={handleMouseMove}
    >
      {/* Background image with parallax effect */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: prefersReducedMotion ? 0 : backgroundY,
          x: prefersReducedMotion ? 0 : mousePosition.x * -10,
          scale: 1.1,
        }}
      />
      
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black" 
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <div className="parallax-container w-full max-w-4xl mx-auto">
          {/* Layer 3 (Furthest back) */}
          <motion.div
            className="parallax-layer-3"
            style={{
              x: prefersReducedMotion ? 0 : mousePosition.x * -30,
              y: prefersReducedMotion ? 0 : mousePosition.y * -30,
            }}
          >
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-cyan-400/5 blur-3xl"></div>
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-red-500/5 blur-3xl"></div>
          </motion.div>
          
          {/* Layer 2 (Middle) */}
          <motion.div
            className="parallax-layer-2"
            style={{
              x: prefersReducedMotion ? 0 : mousePosition.x * -20,
              y: prefersReducedMotion ? 0 : mousePosition.y * -20,
            }}
          >
            {typeof subtitle === "string" ? (
              <p className="text-xl md:text-2xl text-white/80 mt-6 max-w-2xl mx-auto">{subtitle}</p>
            ) : (
              subtitle
            )}
          </motion.div>
          
          {/* Layer 1 (Front) */}
          <motion.div
            className="parallax-layer-1"
            style={{
              x: prefersReducedMotion ? 0 : mousePosition.x * -10,
              y: prefersReducedMotion ? 0 : mousePosition.y * -10,
            }}
          >
            {typeof title === "string" ? (
              <h1 className="text-4xl md:text-6xl font-bold text-white">{title}</h1>
            ) : (
              title
            )}
          </motion.div>
          
          {/* Layer 0 (Closest to viewer) */}
          <motion.div
            className="parallax-layer-0 mt-8"
            style={{
              x: prefersReducedMotion ? 0 : mousePosition.x * -5,
              y: prefersReducedMotion ? 0 : mousePosition.y * -5,
            }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  )
} 