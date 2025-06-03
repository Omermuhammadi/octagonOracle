"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-6">
      <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-[#d20a11]/20 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-[#d20a11]" />
          </div>
          <CardTitle className="text-white text-xl">Something went wrong!</CardTitle>
          <CardDescription className="text-white/70">
            We encountered an unexpected error. This has been logged and we'll look into it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === "development" && (
            <details className="text-sm text-white/70 bg-[#1a1a1a] p-3 rounded border border-[#333333]">
              <summary className="cursor-pointer font-medium">Error details (dev only)</summary>
              <pre className="mt-2 text-xs overflow-auto whitespace-pre-wrap">
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
              </pre>
            </details>
          )}

          <div className="flex flex-col gap-2">
            <Button onClick={reset} className="w-full bg-[#d20a11] hover:bg-[#d20a11]/90">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button
              variant="outline"
              className="w-full border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10"
              onClick={() => (window.location.href = "/")}
            >
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
