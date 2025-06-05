"use client"

import type React from "react"
import { useState, useCallback, memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  X,
  User,
  Settings,
  LogOut,
  ChevronDown,
  BarChart3,
  Target,
  ShoppingBag,
  Home,
  Zap,
  LogIn,
  MapPin,
} from "lucide-react"
import { PremiumButton } from "@/components/ui/premium-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Fight Analysis", href: "/dashboard", icon: BarChart3 },
  { name: "Training", href: "/training", icon: Target },
  { name: "Gym Finder", href: "/gym-finder", icon: MapPin },
  { name: "Store", href: "/store", icon: ShoppingBag },
]

const UnifiedHeader = memo(function UnifiedHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { toast } = useToast()

  const isActive = useCallback(
    (href: string) => {
      if (href === "/" && pathname === "/") return true
      if (href !== "/" && pathname.startsWith(href)) return true
      return false
    },
    [pathname],
  )

  const handleLogout = useCallback(() => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
      variant: "default",
    });
    setIsMobileMenuOpen(false);
  }, [logout, toast]);

  return (
    <>
      <TooltipProvider>
        <header className="sticky top-0 z-50 w-full glass-strong border-b border-white/20 scan-lines">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex h-20 items-center justify-between">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-4 hover:opacity-80 transition-all duration-300 transform-gpu hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-xl p-2"
                aria-label="OctagonOracle Home"
              >
                <div className="relative h-12 w-12 octagon-border" role="img" aria-label="OctagonOracle Logo">
                  <div className="absolute inset-1 octagon bg-gradient-to-br from-cyan-400 to-blue-600 glow-blue"></div>
                  <div className="absolute inset-2 octagon bg-gradient-to-br from-red-500 to-pink-600 glow-red opacity-70"></div>
                  <Zap className="absolute inset-0 m-auto h-6 w-6 text-white z-10" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold gradient-text-primary tracking-tight">OctagonOracle</span>
                  <span className="text-xs text-white/60 tracking-widest uppercase">AI Sports Analytics</span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Main navigation">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex items-center justify-center gap-3 px-6 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 transform-gpu focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                        isActive(item.href)
                          ? "text-cyan-400 glass-strong glow-blue scale-105"
                          : "text-white/70 hover:text-white hover:glass hover:scale-105"
                      }`}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      <Icon className="h-5 w-5 transition-transform group-hover:scale-110" aria-hidden="true" />
                      {item.name}
                      {isActive(item.href) && <div className="w-2 h-2 rounded-full bg-cyan-400 led-indicator" />}
                    </Link>
                  )
                })}
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center gap-5">
                {/* User Profile Dropdown or Sign In */}
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <PremiumButton
                        variant="neon"
                        glowColor="blue"
                        className="flex items-center gap-2 px-3 py-2 h-12 rounded-xl border border-cyan-400/30"
                        aria-label="User menu"
                      >
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center glow-blue overflow-hidden">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                          <span className="font-semibold text-white text-sm">{user.name}</span>
                          <ChevronDown className="h-4 w-4 opacity-70" />
                        </div>
                      </PremiumButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 glass-strong border-white/20 rounded-xl p-2">
                      <div className="px-4 py-3 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center glow-blue">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex flex-col">
                            <p className="text-sm font-semibold text-white">{user.name}</p>
                            <p className="text-xs text-white/70">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <DropdownMenuItem asChild className="text-white hover:glass focus:glass px-4 py-3 rounded-lg flex items-center gap-3">
                          <Link href="/profile">
                            <User className="h-4 w-4 text-cyan-400" />
                            <span>Profile</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="text-white hover:glass focus:glass px-4 py-3 rounded-lg flex items-center gap-3">
                          <Link href="/settings">
                            <Settings className="h-4 w-4 text-cyan-400" />
                            <span>Settings</span>
                          </Link>
                        </DropdownMenuItem>
                      </div>
                      <div className="p-2 border-t border-white/10">
                        <DropdownMenuItem 
                          className="text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 px-4 py-3 rounded-lg flex items-center gap-3 cursor-pointer"
                          onClick={handleLogout}
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <PremiumButton
                        variant="glass"
                        glowColor="blue"
                        className="flex items-center gap-2 px-3 py-2 h-12 rounded-xl border border-white/20"
                        aria-label="Sign in options"
                      >
                        <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                          <LogIn className="h-4 w-4 text-white" />
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                          <span className="font-semibold text-white text-sm">Sign In</span>
                          <ChevronDown className="h-4 w-4 opacity-70" />
                        </div>
                      </PremiumButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 glass-strong border-white/20 rounded-xl p-2">
                      <div className="p-2">
                        <DropdownMenuItem asChild className="text-white hover:glass focus:glass px-4 py-3 rounded-lg flex items-center gap-3">
                          <Link href="/auth/login">
                            <LogIn className="h-4 w-4 text-cyan-400" />
                            <span>Sign In</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="text-white hover:glass focus:glass px-4 py-3 rounded-lg flex items-center gap-3">
                          <Link href="/auth/signup">
                            <User className="h-4 w-4 text-cyan-400" />
                            <span>Sign Up</span>
                          </Link>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {/* Mobile Menu Button */}
                <PremiumButton
                  variant="glass"
                  size="icon"
                  className="lg:hidden h-12 w-12 rounded-xl flex items-center justify-center"
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Open mobile menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  <Menu className="h-5 w-5" />
                </PremiumButton>
              </div>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
              <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
              />
              <div className="fixed right-0 top-0 bottom-0 w-full max-w-xs glass-strong border-l border-white/20 shadow-xl transform transition-transform duration-300 ease-in-out">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="relative h-10 w-10 octagon-border">
                      <div className="absolute inset-1 octagon bg-gradient-to-br from-cyan-400 to-blue-600 glow-blue"></div>
                      <div className="absolute inset-2 octagon bg-gradient-to-br from-red-500 to-pink-600 opacity-70"></div>
                      <Zap className="absolute inset-0 m-auto h-5 w-5 text-white z-10" />
                    </div>
                    <span className="text-xl font-bold gradient-text-primary">OctagonOracle</span>
                  </Link>
                  <PremiumButton
                    variant="glass"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="h-10 w-10 rounded-xl flex items-center justify-center"
                    aria-label="Close mobile menu"
                  >
                    <X className="h-5 w-5" />
                  </PremiumButton>
                </div>

                {/* Mobile Navigation */}
                <nav className="p-6 space-y-4" role="navigation" aria-label="Mobile navigation">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl text-base font-semibold tracking-wide transition-all duration-300 transform-gpu ${
                          isActive(item.href)
                            ? "text-cyan-400 glass-strong glow-blue"
                            : "text-white/70 hover:text-white hover:glass"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                        {item.name}
                        {isActive(item.href) && <div className="w-2 h-2 rounded-full bg-cyan-400 led-indicator ml-auto" />}
                      </Link>
                    )
                  })}
                </nav>

                {/* Mobile User Section */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center glow-blue">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold text-white">{user.name}</p>
                          <p className="text-xs text-white/70">{user.email}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Link 
                          href="/profile" 
                          className="flex items-center justify-center gap-2 glass text-white rounded-xl py-3 px-4 text-sm font-semibold hover:glass-strong"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <User className="h-4 w-4 text-cyan-400" />
                          Profile
                        </Link>
                        <Link 
                          href="/settings" 
                          className="flex items-center justify-center gap-2 glass text-white rounded-xl py-3 px-4 text-sm font-semibold hover:glass-strong"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4 text-cyan-400" />
                          Settings
                        </Link>
                      </div>
                      <button 
                        className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 rounded-xl py-3 px-4 text-sm font-semibold hover:bg-red-500/20"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <Link 
                        href="/auth/login" 
                        className="flex items-center justify-center gap-2 glass text-white rounded-xl py-3 px-4 text-sm font-semibold hover:glass-strong"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <LogIn className="h-4 w-4 text-cyan-400" />
                        Sign In
                      </Link>
                      <Link 
                        href="/auth/signup" 
                        className="flex items-center justify-center gap-2 glass-strong text-white rounded-xl py-3 px-4 text-sm font-semibold hover:glass-strong glow-blue"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="h-4 w-4 text-cyan-400" />
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </header>
      </TooltipProvider>
    </>
  )
})

export default UnifiedHeader
