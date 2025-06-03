"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbNavProps {
  items?: BreadcrumbItem[]
  className?: string
}

const pathLabels: Record<string, string> = {
  dashboard: "Dashboard",
  training: "Training Roadmaps",
  "gym-finder": "Gym Finder",
  "self-defense": "Self-Defense Guide",
  "form-analysis": "Form Analysis",
  store: "Gear Store",
  profile: "Profile",
  support: "Support",
  settings: "Settings",
}

export default function BreadcrumbNav({ items, className = "" }: BreadcrumbNavProps) {
  const pathname = usePathname()

  // Generate breadcrumbs from pathname if items not provided
  const breadcrumbs = items || generateBreadcrumbs(pathname)

  if (breadcrumbs.length <= 1) return null

  return (
    <nav className={`flex items-center space-x-1 text-sm text-white/70 ${className}`} aria-label="Breadcrumb">
      <Link href="/" className="flex items-center hover:text-white transition-colors">
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>

      {breadcrumbs.map((item, index) => (
        <div key={item.href} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-2 text-white/50" />
          {index === breadcrumbs.length - 1 ? (
            <span className="text-white font-medium" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []

  let currentPath = ""
  for (const segment of segments) {
    currentPath += `/${segment}`
    const label = pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    breadcrumbs.push({
      label,
      href: currentPath,
    })
  }

  return breadcrumbs
}
