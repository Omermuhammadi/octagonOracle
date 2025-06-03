import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import ErrorBoundary from "@/components/layout/error-boundary"
import ClientLayoutWrapper from "@/components/layout/client-layout-wrapper"
import UnifiedHeader from "@/components/layout/unified-header"
import UnifiedFooter from "@/components/layout/unified-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OctagonOracle - AI-Powered UFC/MMA Analytics Platform",
  description:
    "Leverage cutting-edge AI to analyze fighting techniques, predict outcomes, and develop personalized training roadmaps.",
  keywords: "UFC, MMA, fight analysis, martial arts, training, predictions, AI",
  authors: [{ name: "OctagonOracle Team" }],
  creator: "OctagonOracle",
  publisher: "OctagonOracle",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://octagonoracle.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "OctagonOracle - AI-Powered UFC/MMA Analytics",
    description: "Advanced fight analytics and training platform for MMA enthusiasts",
    url: "https://octagonoracle.com",
    siteName: "OctagonOracle",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OctagonOracle Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OctagonOracle - AI-Powered UFC/MMA Analytics",
    description: "Advanced fight analytics and training platform for MMA enthusiasts",
    images: ["/twitter-image.png"],
    creator: "@octagonoracle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <TooltipProvider>
            <ClientLayoutWrapper>
              <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
                <UnifiedHeader />
                <main className="flex-1 w-full">
                  {children}
                </main>
                <UnifiedFooter />
              </div>
            </ClientLayoutWrapper>
            <Toaster />
          </TooltipProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
