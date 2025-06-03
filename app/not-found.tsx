"use client"

import Link from "next/link"
import { ArrowLeft, Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Visual */}
        <div className="relative">
          <div className="text-9xl font-bold text-[#333333] select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-32 w-32">
              <div className="absolute inset-0 rotate-45 border-4 border-[#00d4ff] opacity-30 animate-pulse"></div>
              <div className="absolute inset-0 rotate-[22.5deg] border-4 border-[#d20a11] opacity-30 animate-pulse delay-300"></div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Page Not Found</CardTitle>
            <CardDescription className="text-white/70 text-lg">
              The page you're looking for doesn't exist or has been moved.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <Input
                placeholder="Search for fighters, gyms, or training..."
                className="pl-10 bg-[#1a1a1a] border-[#333333] text-white placeholder:text-white/50"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-[#d20a11] hover:bg-[#d20a11]/90">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10">
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="pt-6 border-t border-[#333333]">
              <h3 className="text-white font-medium mb-4">Popular Pages</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Link href="/dashboard" className="text-white/70 hover:text-[#00d4ff] transition-colors text-sm">
                  Fight Analysis
                </Link>
                <Link href="/training" className="text-white/70 hover:text-[#00d4ff] transition-colors text-sm">
                  Training
                </Link>
                <Link href="/gym-finder" className="text-white/70 hover:text-[#00d4ff] transition-colors text-sm">
                  Gym Finder
                </Link>
                <Link href="/store" className="text-white/70 hover:text-[#00d4ff] transition-colors text-sm">
                  Gear Store
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
