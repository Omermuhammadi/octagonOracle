"use client"

import LoadingSpinner from "./loading-spinner"

interface PageLoadingProps {
  message?: string
}

export default function PageLoading({ message = "Loading..." }: PageLoadingProps) {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-white/70">{message}</p>
      </div>
    </div>
  )
}
