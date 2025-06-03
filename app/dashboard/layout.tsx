import type React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#1a1a1a]">
      {/* Main content */}
      <div className="flex flex-col flex-1">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
