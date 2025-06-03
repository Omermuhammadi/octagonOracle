"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { ReactNode, useEffect } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  
  // Force scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  // Very light animation that won't cause performance issues
  const variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.2,
        ease: "easeOut" 
      }
    }
  }

  return (
    <motion.div
      key={pathname}
      initial="hidden"
      animate="visible"
      variants={variants}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  )
} 