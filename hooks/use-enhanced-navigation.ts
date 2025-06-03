"use client"

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export function useEnhancedNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    // Reset navigation state when route changes
    setIsNavigating(false)

    // Prefetch links on the current page
    const preloadLinks = () => {
      try {
        const links = document.querySelectorAll('a[href^="/"]')
        links.forEach(link => {
          const href = link.getAttribute('href')
          if (href && href !== pathname) {
            router.prefetch(href)
          }
        })
      } catch (err) {
        console.error('Error prefetching links:', err)
      }
    }

    // Run once on mount
    preloadLinks()
  }, [pathname, router])

  // Simple function to handle navigation with Next Router directly
  const navigateTo = (href: string) => {
    if (href && href !== pathname && !isNavigating) {
      setIsNavigating(true)
      router.push(href)
    }
  }

  return { isNavigating, navigateTo }
} 