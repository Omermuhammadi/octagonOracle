"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { MapPin, Search, AlertCircle, Dumbbell } from "lucide-react"
import PageContainer from "@/components/layout/page-container"
import Section from "@/components/layout/section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import dynamic from 'next/dynamic'
import GymCard from '@/components/gym-finder/GymCard'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MockGym } from '@/lib/real-gym-data'
import { useDebounce } from '@/lib/utils'

// Import GymMap with dynamic import to prevent SSR issues with Leaflet
// This is necessary because Leaflet relies on browser APIs
const GymMap = dynamic(
  () => import('@/components/gym-finder/GymMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[500px] w-full rounded-lg bg-[#2a2a2a] border border-white/10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 text-cyan-400 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="text-white/50 text-lg">Loading map component...</p>
        </div>
      </div>
    )
  }
)

export default function GymFinder() {
  const [mainPageSearchInput, setMainPageSearchInput] = useState('') // Renamed from searchInput
  const [gymListFilterInput, setGymListFilterInput] = useState('')
  const debouncedGymListFilter = useDebounce(gymListFilterInput, 300)
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const [selectedGymId, setSelectedGymId] = useState<string | null>(null)
  const [searchMessage, setSearchMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [displayedGyms, setDisplayedGyms] = useState<MockGym[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const mapComponentRef = useRef<any>(null)

  // Example: If you have static gyms, import and use them here
  // import { staticGyms } from '@/lib/static-gym-data'
  const staticGyms: MockGym[] = [] // Replace with actual static gyms if available

  // Merge displayedGyms (from map) and staticGyms, avoid duplicates, and add a 'source' property
  const mergedGyms = [
    ...displayedGyms.map(g => ({ ...g, source: 'map' as const })),
    ...staticGyms
      .filter(sg => !displayedGyms.some(g => g.id === sg.id))
      .map(g => ({ ...g, source: 'static' as const }))
  ]
  
  // New state variables for Task 1
  const [mapRef, setMapRef] = useState<any>(null)
  const [searchLocation, setSearchLocation] = useState<string | null>(null)
  const [mapGyms, setMapGyms] = useState<MockGym[]>([])
  
  // Handle clicking "View on Map" for a gym
  const handleViewOnMap = (id: string) => {
    setSelectedGymId(id)
    // Scroll to map
    const mapElement = document.getElementById('gym-map')
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth' })
    }
    
    // Tell map component to focus on this gym
    if (mapComponentRef.current?.focusGym) {
      mapComponentRef.current.focusGym(id);
    }
  }
  
  // Detect if search term looks like a location
  const isLocationSearch = (term: string): boolean => {
    // Common location indicators
    const locationKeywords = [
      'street', 'road', 'avenue', 'lane', 'drive', 'boulevard', 'plaza',
      'markaz', 'sector', 'block', 'phase', 'area', 'town', 'city',
      'islamabad', 'f-', 'g-', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11',
      'g6', 'g7', 'g8', 'g9', 'g10', 'g11'
    ]
    
    const lowercaseTerm = term.toLowerCase()
    return locationKeywords.some(keyword => lowercaseTerm.includes(keyword))
  }
  
  // Handle search (renamed from filterGyms)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (mainPageSearchInput.trim()) {
      // Check if this looks like a location search
      if (isLocationSearch(mainPageSearchInput)) {
        // Set location search
        setSearchLocation(mainPageSearchInput.trim())
        setSearchQuery(mainPageSearchInput.trim())
      } else {
        // Regular filter search (no location)
        setSearchLocation(null)
        setSearchQuery(undefined)
      }
      
      // Clear previous search message
      setSearchMessage(null)
      // Show loading state
      setIsLoading(true)
      setIsSearchMode(true)
    }
  }
  
  // Handle gyms loaded from map component
  const handleGymsLoaded = useCallback((gyms: MockGym[]) => {
    setDisplayedGyms(gyms);
    setMapGyms(gyms); // Store map gyms separately
    setIsLoading(false);
  }, []);
  
  // Handle search completion from map component
  const handleSearchComplete = useCallback((success: boolean, message?: string) => {
    if (!success && message) {
      setSearchMessage({
        type: 'error',
        text: message
      });
      setIsLoading(false);
    } else if (success) {
      setSearchMessage({
        type: 'success',
        text: message || 'Location found!'
      });
      setIsSearchMode(true);
      setIsLoading(false);
    }
  }, []);
  
  // Clear search message when input changes
  useEffect(() => {
    if (searchMessage) {
      setSearchMessage(null)
    }
  }, [mainPageSearchInput]) // Corrected dependency

  // Derived state for the final list of gyms to display, after applying the debounced filter
  const finalFilteredGyms = useMemo(() => {
    if (!debouncedGymListFilter) {
      return mergedGyms;
    }
    return mergedGyms.filter(gym => {
      const filterText = debouncedGymListFilter.toLowerCase();
      return (
        gym.name.toLowerCase().includes(filterText) ||
        gym.type.toLowerCase().includes(filterText) ||
        gym.address.toLowerCase().includes(filterText)
      );
    });
  }, [mergedGyms, debouncedGymListFilter]);


  return (
    <>
      <Section spacing="lg" background="default">
        <PageContainer>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto py-8">
            <div className="flex items-center justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg glow-blue">
                <MapPin className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
              Gym Finder
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Find the best martial arts academies and training facilities near you.
            </p>
            
            {/* Search form - Updated to use handleSearch */}
            <form onSubmit={handleSearch} className="w-full max-w-xl">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                <Input
                  placeholder="Search for a location, city, or address..."
                  className="pl-10 h-12 w-full border-white/10 bg-[#2a2a2a] text-white placeholder:text-white/50"
                  value={mainPageSearchInput}
                  onChange={(e) => setMainPageSearchInput(e.target.value)}
                />
                <Button 
                  type="submit" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 bg-cyan-500 hover:bg-cyan-600"
                >
                  Find
                </Button>
              </div>

              {/* Search message/alert */}
              {searchMessage && (
                <Alert 
                  className={`mt-4 ${
                    searchMessage.type === 'error' 
                      ? 'bg-red-900/20 border-red-900/50 text-red-200' 
                      : 'bg-green-900/20 border-green-900/50 text-green-200'
                  }`}
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{searchMessage.text}</AlertDescription>
                </Alert>
              )}
            </form>
          </div>
        </PageContainer>
      </Section>

      <Section spacing="lg" background="muted">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side: Map */}
            <div className="lg:col-span-2" id="gym-map">
              <Card className="border-white/10 bg-[#1a1a1a] shadow-xl overflow-hidden">
                <CardHeader className="border-b border-white/10">
                  <CardTitle className="text-2xl text-white">
                    {isSearchMode ? 'Gyms Near Search Location' : 'Nearby Gyms'}
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Find martial arts gyms in your area
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="w-full">
                    <GymMap
                      ref={mapComponentRef}
                      searchQuery={searchLocation || undefined}
                      onGymsLoaded={(gyms) => {
                        setDisplayedGyms(gyms);
                        setIsLoading(false);
                      }}
                      onSearchComplete={(success, message) => {
                        if (success) {
                          setSearchMessage({ type: 'success', text: message || 'Location found!' });
                        } else {
                          setSearchMessage({ type: 'error', text: message || 'Could not find gyms for this location.' });
                        }
                        setIsLoading(false);
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right side: Gym list */}
            <div>
              <div className="sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-white">
                    {isSearchMode ? 'Gyms Near Search Location' : 'Nearby Gyms'}
                  </h2>
                  <span className="text-white/70 text-sm">
                    {finalFilteredGyms.length} found
                  </span>
                </div>
                
                {/* Gym list filter */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                    <Input
                      placeholder="Filter gyms..."
                      className="pl-9 h-10 w-full border-white/10 bg-[#2a2a2a] text-white placeholder:text-white/50"
                      value={gymListFilterInput}
                      onChange={(e) => setGymListFilterInput(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Gym list */}
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 gym-scrollbar">
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-cyan-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                      <p className="mt-4 text-white/50">Loading gyms...</p>
                    </div>
                  ) : finalFilteredGyms.length === 0 ? (
                    <div className="text-center py-8 bg-[#2a2a2a] rounded-lg border border-white/10 p-6">
                      <Dumbbell className="h-12 w-12 text-white/20 mx-auto mb-4" />
                      <p className="text-white/50 text-lg mb-2">No gyms found</p>
                      <p className="text-white/30 text-sm">Try a different search term or location, or check the map.</p>
                    </div>
                  ) : (
                    finalFilteredGyms.map((gym: MockGym & { source: 'map' | 'static' }) => (
                      <div 
                        key={gym.id} 
                        className={`relative rounded-lg transition-all ${selectedGymId === gym.id ? 'ring-2 ring-cyan-400 shadow-lg' : 'ring-0'}`}
                      >
                        <GymCard
                          {...gym} // Spread gym properties
                          onViewOnMap={() => handleViewOnMap(gym.id)} // Rename to onViewOnMap
                        />
                        <span
                          className={`absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-semibold ${gym.source === 'map' ? 'bg-cyan-700 text-cyan-100' : 'bg-gray-700 text-gray-200'}`}
                          title={gym.source === 'map' ? 'From Map Search' : 'Static Gym Data'}
                        >
                          {gym.source === 'map' ? 'Map' : 'Static'}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>
    </>
  )
}
