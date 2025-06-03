"use client"

import LoadingSpinner from "@/components/layout/loading-spinner"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="h-16 w-16 mx-auto">
            <div className="absolute inset-0 rotate-45 border-4 border-[#00d4ff] opacity-30 animate-pulse"></div>
            <div className="absolute inset-0 rotate-[22.5deg] border-4 border-[#d20a11] opacity-30 animate-pulse delay-300"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">Loading OctagonOracle</h2>
          <p className="text-white/70">Preparing your fight analytics...</p>
        </div>
      </div>
    </div>
  )
}
