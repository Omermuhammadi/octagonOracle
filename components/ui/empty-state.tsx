"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <Card className={`border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm ${className}`}>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 h-16 w-16 rounded-full bg-[#333333]/50 flex items-center justify-center">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/70 mb-6 max-w-md">{description}</p>
        {action && (
          <Button onClick={action.onClick} className="bg-[#d20a11] hover:bg-[#d20a11]/90">
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
