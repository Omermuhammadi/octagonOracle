"use client"

import type React from "react"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import BreadcrumbNav from "./breadcrumb-nav"

interface PageHeaderProps {
  title: string
  description?: string
  showBackButton?: boolean
  backHref?: string
  children?: React.ReactNode
  breadcrumbs?: Array<{ label: string; href: string }>
}

export default function PageHeader({
  title,
  description,
  showBackButton = false,
  backHref,
  children,
  breadcrumbs,
}: PageHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (backHref) {
      router.push(backHref)
    } else {
      router.back()
    }
  }

  return (
    <div className="border-b border-[#333333] bg-[#1a1a1a]">
      <div className="container px-4 py-6 md:px-6">
        {/* Breadcrumbs */}
        {breadcrumbs && <BreadcrumbNav items={breadcrumbs} className="mb-4" />}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Button variant="ghost" size="icon" onClick={handleBack} className="text-white/70 hover:text-white">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Go back</span>
              </Button>
            )}

            <div>
              <h1 className="text-3xl font-bold text-white">{title}</h1>
              {description && <p className="text-white/70 mt-2 max-w-2xl">{description}</p>}
            </div>
          </div>

          {children && <div className="flex items-center gap-4">{children}</div>}
        </div>
      </div>
    </div>
  )
}
