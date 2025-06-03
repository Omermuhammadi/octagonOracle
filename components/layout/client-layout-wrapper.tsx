"use client"

import React, { ReactNode, useEffect } from "react"
import PageTransition from "@/components/layout/page-transition"
import { usePathname, useRouter } from "next/navigation"
import { useEnhancedNavigation } from "@/hooks/use-enhanced-navigation"

interface ClientLayoutWrapperProps {
  children: ReactNode
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { navigateTo } = useEnhancedNavigation()

  // Handle link clicks
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      
      if (link) {
        const href = link.getAttribute('href')
        
        // Only handle internal links
        if (href && href.startsWith('/') && !link.getAttribute('target')) {
          e.preventDefault()
          navigateTo(href)
        }
      }
    }
    
    document.addEventListener('click', handleLinkClick)
    
    return () => {
      document.removeEventListener('click', handleLinkClick)
    }
  }, [navigateTo])

  return (
    <PageTransition>
      {children}
    </PageTransition>
  )
} 