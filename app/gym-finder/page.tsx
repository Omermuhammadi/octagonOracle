"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { Filter, MapPin, Search, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList } from "@/components/ui/tabs"
import PageHeader from "@/components/layout/page-header"
import LoadingSpinner from "@/components/layout/loading-spinner"
import { gymsDatabase, type Gym } from "@/lib/mock-data/gyms"

export default function GymFinderPage() {
  // State for search and filtering
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDistance, setSelectedDistance] = useState(10)
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedPriceRange, setSelectedPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("distance")
  const [isLoading, setIsLoading] = useState(false)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [favoriteGyms, setFavoriteGyms] = useState<number[]>([])
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null)
  const [showMap, setShowMap] = useState(false)

  // Simulate getting user location
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setUserLocation({ lat: 34.0522, lng: -118.2437 }) // Los Angeles
      setIsLoading(false)
    }, 1000)
  }, [])

  // Calculate distance between two points (simplified)
  const calculateDistance = (gym: Gym) => {
    if (!userLocation) return Number.parseFloat(gym.distance)
    
    // Simplified distance calculation for demo
    const latDiff = Math.abs(gym.coordinates.lat - userLocation.lat)
    const lngDiff = Math.abs(gym.coordinates.lng - userLocation.lng)
    const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 69 // Rough miles conversion
    return Math.round(distance * 10) / 10
  }

  // Filter and sort gyms
  const filteredGyms = useMemo(() => {
    const filtered = gymsDatabase.filter((gym) => {
      // Search filter
      const matchesSearch = searchTerm === "" || 
        gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gym.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        gym.city.toLowerCase().includes(searchTerm.toLowerCase())

      // Distance filter
      const gymDistance = calculateDistance(gym)
      const matchesDistance = gymDistance <= selectedDistance

      // Specialty filter
      const matchesSpecialty = selectedSpecialty === "all" || 
        gym.specialties.includes(selectedSpecialty)

      // Price range filter
      const matchesPriceRange = selectedPriceRange === "all" || 
        gym.priceRange === selectedPriceRange

      return matchesSearch && matchesDistance && matchesSpecialty && matchesPriceRange
    })

    // Sort gyms
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return calculateDistance(a) - calculateDistance(b)
        case "rating":
          return b.rating - a.rating
        case "reviews":
          return b.reviews - a.reviews
        case "price-low":
          return a.priceRange.length - b.priceRange.length
        case "price-high":
          return b.priceRange.length - a.priceRange.length
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedDistance, selectedSpecialty, selectedPriceRange, sortBy, userLocation])

  // Handle search with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Toggle favorite gym
  const toggleFavorite = (gymId: number) => {
    setFavoriteGyms(prev => 
      prev.includes(gymId) 
        ? prev.filter(id => id !== gymId)
        : [...prev, gymId]
    )
  }

  // Handle gym selection
  const handleGymSelect = (gym: Gym) => {
    setSelectedGym(gym)
  }

  // Get unique specialties for filter
  const allSpecialties = Array.from(
    new Set(gymsDatabase.flatMap(gym => gym.specialties))
  ).sort()

  // Apply filters with loading state
  const applyFilters = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <PageHeader
        title="Find Your Perfect Gym"
        description="Discover martial arts gyms and training centers near you"
      >
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10"
            onClick={() => setShowMap(!showMap)}
          >
            <MapPin className="mr-2 h-4 w-4" />
            {showMap ? "Hide Map" : "Show Map"}
          </Button>
          <Button className="bg-[#d20a11] hover:bg-[#d20a11]/90">
            <Navigation className="mr-2 h-4 w-4" />
            Get Directions
          </Button>
        </div>
      </PageHeader>

      <div className="container mx-auto p-6 space-y-6">
        {/* Search and Filters */}
        <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Filter className="h-5 w-5 text-[#00d4ff]" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                <Input
                  placeholder="Search gyms or martial arts..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 bg-[#1a1a1a] border-[#333333] text-white placeholder:text-white/50"
                />
              </div>

              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="bg-[#1a1a1a] border-[#333333] text-white">
                  <SelectValue placeholder="Martial Art" />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-[#333333]">
                  <SelectItem value="all" className="text-white hover:bg-[#333333]">
                    All Martial Arts
                  </SelectItem>
                  {allSpecialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty} className="text-white hover:bg-[#333333]">
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger className="bg-[#1a1a1a] border-[#333333] text-white">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-[#333333]">
                  <SelectItem value="all" className="text-white hover:bg-[#333333]">
                    Any Price
                  </SelectItem>
                  <SelectItem value="$" className="text-white hover:bg-[#333333]">
                    $ - Budget
                  </SelectItem>
                  <SelectItem value="$$" className="text-white hover:bg-[#333333]">
                    $$ - Moderate
                  </SelectItem>
                  <SelectItem value="$$$" className="text-white hover:bg-[#333333]">
                    $$$ - Premium
                  </SelectItem>
                  <SelectItem value="$$$$" className="text-white hover:bg-[#333333]">
                    $$$$ - Luxury
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-[#1a1a1a] border-[#333333] text-white">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="bg-[#2a2a2a] border-[#333333]">
                  <SelectItem value="distance" className="text-white hover:bg-[#333333]">
                    Distance
                  </SelectItem>
                  <SelectItem value="rating" className="text-white hover:bg-[#333333]">
                    Highest Rated
                  </SelectItem>
                  <SelectItem value="reviews" className="text-white hover:bg-[#333333]">
                    Most Reviews
                  </SelectItem>
                  <SelectItem value="price-low" className="text-white hover:bg-[#333333]">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high" className="text-white hover:bg-[#333333]">
                    Price: High to Low
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-white mb-2 block">
                  Distance: {selectedDistance} miles
                </Label>
                <Slider
                  value={[selectedDistance]}
                  onValueChange={(value) => setSelectedDistance(value[0])}
                  max={25}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <Button onClick={applyFilters} className="bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-black">
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Searching...
                  </>
                ) : (
                  "Apply Filters"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Map Placeholder */}
        {showMap && (
          <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#d20a11]" />
                Map View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-[#1a1a1a] rounded-lg border border-[#333333] flex items-center justify-center relative overflow-hidden">
                <div className="text-center text-white/70">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-[#00d4ff]" />
                  <p className="text-lg font-medium">Interactive Map</p>
                  <p className="text-sm">Showing {filteredGyms.length} gyms in your area</p>
                </div>
                {/* Simulated map pins */}
                {filteredGyms.slice(0, 5).map((gym, index) => (
                  <div
                    key={gym.id}
                    className="absolute bg-[#d20a11] text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-[#d20a11]/80"
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${30 + index * 10}%`,
                    }}
                    onClick={() => handleGymSelect(gym)}
                  >
                    {gym.name.split(' ')[0]}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Found {filteredGyms.length} gym{filteredGyms.length !== 1 ? "s" : ""} near you
          </h2>
          {userLocation && (
            <div className="text-white/70 text-sm">
              📍 Searching within {selectedDistance} miles of your location
            </div>
          )}
        </div>

        {/* Gym Listings */}
        <Tabs defaultValue="list" className="space-y-6">
          <TabsList className="bg-[#2a2a2a] border-[#333\
