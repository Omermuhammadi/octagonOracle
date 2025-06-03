"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedLoader } from "@/components/ui/animated-loader"

export function FighterCardSkeleton() {
  return (
    <Card className="border-white/10 bg-[#1a1a1a]">
      <CardHeader className="p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full bg-white/10" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 bg-white/10" />
            <Skeleton className="h-4 w-24 bg-white/10" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16 bg-white/10" />
              <Skeleton className="h-4 w-24 bg-white/10" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16 bg-white/10" />
              <Skeleton className="h-4 w-24 bg-white/10" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16 bg-white/10" />
              <Skeleton className="h-4 w-24 bg-white/10" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16 bg-white/10" />
              <Skeleton className="h-4 w-24 bg-white/10" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24 bg-white/10" />
              <Skeleton className="h-4 w-12 bg-white/10" />
            </div>
            <Skeleton className="h-3 w-full bg-white/10" />
          </div>

          <div className="flex gap-4">
            <Skeleton className="h-10 w-full bg-white/10" />
            <Skeleton className="h-10 w-full bg-white/10" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function GymCardSkeleton() {
  return (
    <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-40 bg-[#333333]" />
            <Skeleton className="h-4 w-32 bg-[#333333]" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-16 bg-[#333333]" />
              <Skeleton className="h-4 w-12 bg-[#333333]" />
            </div>
          </div>
          <Skeleton className="h-16 w-24 rounded-lg bg-[#333333]" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 bg-[#333333]" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-4 w-24 bg-[#333333]" />
          <Skeleton className="h-4 w-20 bg-[#333333]" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1 bg-[#333333]" />
          <Skeleton className="h-10 w-24 bg-[#333333]" />
        </div>
      </CardContent>
    </Card>
  )
}

export function ProductCardSkeleton() {
  return (
    <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
      <CardHeader className="relative">
        <Skeleton className="aspect-square bg-[#333333] rounded-lg mb-4" />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-16 bg-[#333333]" />
            <Skeleton className="h-4 w-20 bg-[#333333]" />
          </div>
          <Skeleton className="h-6 w-32 bg-[#333333]" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-12 bg-[#333333]" />
            <Skeleton className="h-4 w-16 bg-[#333333]" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 bg-[#333333]" />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-20 bg-[#333333]" />
          <Skeleton className="h-5 w-16 bg-[#333333]" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1 bg-[#333333]" />
          <Skeleton className="h-10 w-24 bg-[#333333]" />
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="border-white/10 bg-[#1a1a1a]">
          <CardHeader className="p-6">
            <Skeleton className="h-6 w-48 bg-white/10" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-4">
              <Skeleton className="h-32 w-full bg-white/10" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-white/10" />
                <Skeleton className="h-4 w-3/4 bg-white/10" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[#1a1a1a]">
          <CardHeader className="p-6">
            <div className="flex justify-center">
              <AnimatedLoader type="octagon" color="blue" />
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-4">
              <Skeleton className="h-4 w-full bg-white/10" />
              <Skeleton className="h-4 w-full bg-white/10" />
              <div className="flex justify-center mt-6">
                <Skeleton className="h-10 w-32 bg-white/10" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[#1a1a1a]">
          <CardHeader className="p-6">
            <Skeleton className="h-6 w-48 bg-white/10" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-4">
              <Skeleton className="h-32 w-full bg-white/10" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-white/10" />
                <Skeleton className="h-4 w-3/4 bg-white/10" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-white/10 bg-[#1a1a1a]">
        <CardHeader className="p-6">
          <Skeleton className="h-6 w-48 bg-white/10" />
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="h-[400px] flex items-center justify-center">
            <AnimatedLoader type="spinner" color="blue" text="Loading data..." />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
