"use client"

import type React from "react"

import { useState, useEffect, useCallback, memo } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  BarChart3,
  Target,
  MapPin,
  Heart,
  Camera,
  ShoppingBag,
  HelpCircle,
  Keyboard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { useKeyboardShortcuts, commonShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { useToast } from "@/hooks/use-toast"
import { useDebounce } from "@/hooks/use-debounce"

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3, shortcut: "Ctrl+D" },
  { name: "Training", href: "/training", icon: Target, shortcut: "Ctrl+T" },
  { name: "Gym Finder", href: "/gym-finder", icon: MapPin },
  { name: "Self-Defense", href: "/self-defense", icon: Heart },
  { name: "Form Analysis", href: "/form-analysis", icon: Camera },
  { name: "Store", href: "/store", icon: ShoppingBag },
  { name: "Support", href: "/support", icon: HelpCircle },
]

// Mock user data
const mockUser = {
  name: "Alex Rodriguez",
  email: "alex@example.com",
  avatar: "/placeholder.svg?height=32&width=32",
  notifications: 3,
}

const MainHeader = memo(function MainHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showShortcuts, setShowShortcuts] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Keyboard shortcuts
  const shortcuts = [
    {
      ...commonShortcuts.search,
      action: useCallback(() => setIsSearchOpen(true), []),
    },
    {
      ...commonShortcuts.dashboard,
      action: useCallback(() => router.push("/dashboard"), [router]),
    },
    {
      ...commonShortcuts.training,
      action: useCallback(() => router.push("/training"), [router]),
    },
    {
      ...commonShortcuts.help,
      action: useCallback(() => setShowShortcuts(true), []),
    },
    {
      ...commonShortcuts.escape,
      action: useCallback(() => {
        setIsMobileMenuOpen(false)
        setIsSearchOpen(false)
        setShowShortcuts(false)
      }, []),
    },
  ]

  useKeyboardShortcuts(shortcuts)

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Handle search
  useEffect(() => {
    if (debouncedSearchQuery) {
      // Simulate search functionality
      console.log("Searching for:", debouncedSearchQuery)
    }
  }, [debouncedSearchQuery])

  const isActive = useCallback(
    (href: string) => {
      if (href === "/" && pathname === "/") return true
      if (href !== "/" && pathname.startsWith(href)) return true
      return false
    },
    [pathname],
  )

  const handleNotificationClick = useCallback(() => {
    toast({
      title: "Notifications",
      description: "You have 3 new notifications",
      variant: "default",
    })
  }, [toast])

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
        setIsSearchOpen(false)
      }
    },
    [searchQuery, router],
  )

  return (
    <>
      <TooltipProvider>
        <header className="sticky top-0 z-50 w-full border-b border-[#333333] bg-[#1a1a1a]/95 backdrop-blur-sm">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#00d4ff] rounded-md"
              aria-label="OctagonOracle Home"
            >
              <div className="relative h-8 w-8" role="img" aria-label="OctagonOracle Logo">
                <div className="absolute inset-0 rotate-45 border-2 border-[#00d4ff] opacity-70"></div>
                <div className="absolute inset-0 rotate-[22.5deg] border-2 border-[#d20a11] opacity-70"></div>
              </div>
              <span className="text-xl font-bold text-white">OctagonOracle</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6" role="navigation" aria-label="Main navigation">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#00d4ff] ${
                          isActive(item.href)
                            ? "text-[#00d4ff] bg-[#00d4ff]/10"
                            : "text-white/70 hover:text-white hover:bg-[#333333]/50"
                        }`}
                        aria-current={isActive(item.href) ? "page" : undefined}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        {item.name}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {item.name} {item.shortcut && `(${item.shortcut})`}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:block relative">
                {isSearchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                    <div className="relative">
                      <Search
                        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50"
                        aria-hidden="true"
                      />
                      <Input
                        placeholder="Search fighters, gyms..."
                        className="pl-10 w-64 bg-[#2a2a2a] border-[#333333] text-white placeholder:text-white/50 focus:ring-2 focus:ring-[#00d4ff]"
                        autoFocus
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                        aria-label="Search"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSearchOpen(false)}
                      className="text-white/70 hover:text-white"
                      aria-label="Close search"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </form>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSearchOpen(true)}
                        className="text-white/70 hover:text-white focus:ring-2 focus:ring-[#00d4ff]"
                        aria-label="Open search (Ctrl+K)"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Search (Ctrl+K)</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Keyboard Shortcuts */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowShortcuts(true)}
                    className="text-white/70 hover:text-white focus:ring-2 focus:ring-[#00d4ff]"
                    aria-label="Show keyboard shortcuts"
                  >
                    <Keyboard className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Keyboard shortcuts (?)</p>
                </TooltipContent>
              </Tooltip>

              {/* Notifications */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-white/70 hover:text-white focus:ring-2 focus:ring-[#00d4ff]"
                    onClick={handleNotificationClick}
                    aria-label={`Notifications (${mockUser.notifications} unread)`}
                  >
                    <Bell className="h-4 w-4" />
                    {mockUser.notifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#d20a11] text-xs p-0 flex items-center justify-center">
                        {mockUser.notifications}
                      </Badge>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{mockUser.notifications} new notifications</p>
                </TooltipContent>
              </Tooltip>

              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-white/70 hover:text-white hover:bg-[#333333]/50 focus:ring-2 focus:ring-[#00d4ff]"
                    aria-label="User menu"
                  >
                    <div className="h-8 w-8 rounded-full bg-[#00d4ff]/20 border border-[#00d4ff] flex items-center justify-center">
                      <User className="h-4 w-4 text-[#00d4ff]" />
                    </div>
                    <span className="hidden md:block">{mockUser.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-[#2a2a2a] border-[#333333]">
                  <DropdownMenuLabel className="text-white">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{mockUser.name}</p>
                      <p className="text-xs text-white/70">{mockUser.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#333333]" />
                  <DropdownMenuItem asChild className="text-white hover:bg-[#333333] focus:bg-[#333333]">
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-white hover:bg-[#333333] focus:bg-[#333333]">
                    <Link href="/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#333333]" />
                  <DropdownMenuItem className="text-[#d20a11] hover:bg-[#d20a11]/10 focus:bg-[#d20a11]/10">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white focus:ring-2 focus:ring-[#00d4ff]"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
              <div
                className="fixed inset-0 bg-black/50"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
              />
              <div className="fixed right-0 top-0 h-full w-80 bg-[#1a1a1a] border-l border-[#333333] p-6">
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="relative h-8 w-8">
                      <div className="absolute inset-0 rotate-45 border-2 border-[#00d4ff] opacity-70"></div>
                      <div className="absolute inset-0 rotate-[22.5deg] border-2 border-[#d20a11] opacity-70"></div>
                    </div>
                    <span className="text-xl font-bold text-white">OctagonOracle</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white focus:ring-2 focus:ring-[#00d4ff]"
                    aria-label="Close mobile menu"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                {/* Mobile Search */}
                <div className="mb-6">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                      <Input
                        placeholder="Search..."
                        className="pl-10 bg-[#2a2a2a] border-[#333333] text-white placeholder:text-white/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </form>
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-2" role="navigation" aria-label="Mobile navigation">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#00d4ff] ${
                          isActive(item.href)
                            ? "text-[#00d4ff] bg-[#00d4ff]/10"
                            : "text-white/70 hover:text-white hover:bg-[#333333]/50"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    )
                  })}
                </nav>

                {/* Mobile User Section */}
                <div className="mt-8 pt-8 border-t border-[#333333]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-[#00d4ff]/20 border border-[#00d4ff] flex items-center justify-center">
                      <User className="h-5 w-5 text-[#00d4ff]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{mockUser.name}</p>
                      <p className="text-white/70 text-sm">{mockUser.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-white/70 hover:text-white hover:bg-[#333333]/50 focus:outline-none focus:ring-2 focus:ring-[#00d4ff]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-white/70 hover:text-white hover:bg-[#333333]/50 focus:outline-none focus:ring-2 focus:ring-[#00d4ff]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                    <button className="flex items-center gap-3 px-3 py-2 rounded-md text-[#d20a11] hover:bg-[#d20a11]/10 w-full text-left focus:outline-none focus:ring-2 focus:ring-[#00d4ff]">
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>
      </TooltipProvider>

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#2a2a2a] border border-[#333333] rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-lg font-semibold">Keyboard Shortcuts</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowShortcuts(false)}
                className="text-white/70 hover:text-white"
                aria-label="Close shortcuts"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">{shortcut.description}</span>
                  <kbd className="px-2 py-1 bg-[#1a1a1a] border border-[#333333] rounded text-xs text-white">
                    {shortcut.ctrlKey && "Ctrl+"}
                    {shortcut.metaKey && "Cmd+"}
                    {shortcut.shiftKey && "Shift+"}
                    {shortcut.altKey && "Alt+"}
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
})

export default MainHeader
