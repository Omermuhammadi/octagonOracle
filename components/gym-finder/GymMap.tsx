"use client"

import { useEffect, useState, useRef, forwardRef, useImperativeHandle, useCallback } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LatLngExpression } from 'leaflet'
import { Dumbbell, Loader2, MapPin } from 'lucide-react'
import { userIcon, initializeLeafletIcons } from '@/lib/leaflet-icons'
import { generateMockGymsAroundLocation } from '@/lib/mock-gym-data'
import { MockGym } from '@/lib/real-gym-data';
import { getGymsForArea, RealGym, convertToMockGym } from '@/lib/real-gym-data'

// Interface for map component props
interface GymMapProps {
  searchQuery?: string;
  searchLocation?: string | null;
  onSearchComplete?: (success: boolean, message?: string, locationName?: string) => void;
  onGymsLoaded?: (gyms: MockGym[]) => void;
}

// Common locations with approximate coordinates
const locationCoordinates: Record<string, LatLngExpression> = {
  // Islamabad main areas
  'islamabad': [33.6844, 73.0479],
  
  // F sectors with variations
  'f-11': [33.6841, 72.9925],
  'f11': [33.6841, 72.9925],
  'f 11': [33.6841, 72.9925],
  'f-11 markaz': [33.6841, 72.9925],
  'f11 markaz': [33.6841, 72.9925],
  'f 11 markaz': [33.6841, 72.9925],
  'f-11 markaz islamabad': [33.6841, 72.9925],
  'f11 markaz islamabad': [33.6841, 72.9925],
  'f 11 markaz islamabad': [33.6841, 72.9925],
  
  'f-10': [33.6956, 73.0118],
  'f10': [33.6956, 73.0118],
  'f 10': [33.6956, 73.0118],
  'f-10 markaz': [33.6956, 73.0118],
  'f10 markaz': [33.6956, 73.0118],
  'f 10 markaz': [33.6956, 73.0118],
  'f-10 markaz islamabad': [33.6956, 73.0118],
  'f10 markaz islamabad': [33.6956, 73.0118],
  'f 10 markaz islamabad': [33.6956, 73.0118],
  
  'f-9': [33.7006, 73.0312],
  'f9': [33.7006, 73.0312],
  'f 9': [33.7006, 73.0312],
  'f-9 markaz': [33.7006, 73.0312],
  'f9 markaz': [33.7006, 73.0312],
  'f 9 markaz': [33.7006, 73.0312],
  'f-9 markaz islamabad': [33.7006, 73.0312],
  'f9 markaz islamabad': [33.7006, 73.0312],
  'f 9 markaz islamabad': [33.7006, 73.0312],
  
  'f-8': [33.7090, 73.0471],
  'f8': [33.7090, 73.0471],
  'f 8': [33.7090, 73.0471],
  'f-8 markaz': [33.7090, 73.0471],
  'f8 markaz': [33.7090, 73.0471],
  'f 8 markaz': [33.7090, 73.0471],
  'f-8 markaz islamabad': [33.7090, 73.0471],
  'f8 markaz islamabad': [33.7090, 73.0471],
  'f 8 markaz islamabad': [33.7090, 73.0471],
  
  'f-7': [33.7173, 73.0529],
  'f7': [33.7173, 73.0529],
  'f 7': [33.7173, 73.0529],
  'f-7 markaz': [33.7173, 73.0529],
  'f7 markaz': [33.7173, 73.0529],
  'f 7 markaz': [33.7173, 73.0529],
  'f-7 markaz islamabad': [33.7173, 73.0529],
  'f7 markaz islamabad': [33.7173, 73.0529],
  'f 7 markaz islamabad': [33.7173, 73.0529],
  
  'f-6': [33.7259, 73.0696],
  'f6': [33.7259, 73.0696],
  'f 6': [33.7259, 73.0696],
  'f-6 markaz': [33.7259, 73.0696],
  'f6 markaz': [33.7259, 73.0696],
  'f 6 markaz': [33.7259, 73.0696],
  'f-6 markaz islamabad': [33.7259, 73.0696],
  'f6 markaz islamabad': [33.7259, 73.0696],
  'f 6 markaz islamabad': [33.7259, 73.0696],
  
  // G sectors with variations
  'g-11': [33.6537, 73.0114],
  'g11': [33.6537, 73.0114],
  'g 11': [33.6537, 73.0114],
  'g-11 markaz': [33.6537, 73.0114],
  'g11 markaz': [33.6537, 73.0114],
  'g 11 markaz': [33.6537, 73.0114],
  'g-11 markaz islamabad': [33.6537, 73.0114],
  'g11 markaz islamabad': [33.6537, 73.0114],
  'g 11 markaz islamabad': [33.6537, 73.0114],
  
  'g-10': [33.6659, 73.0306],
  'g10': [33.6659, 73.0306],
  'g 10': [33.6659, 73.0306],
  'g-10 markaz': [33.6659, 73.0306],
  'g10 markaz': [33.6659, 73.0306],
  'g 10 markaz': [33.6659, 73.0306],
  'g-10 markaz islamabad': [33.6659, 73.0306],
  'g10 markaz islamabad': [33.6659, 73.0306],
  'g 10 markaz islamabad': [33.6659, 73.0306],
  
  'g-9': [33.6762, 73.0491],
  'g9': [33.6762, 73.0491],
  'g 9': [33.6762, 73.0491],
  'g-9 markaz': [33.6762, 73.0491],
  'g9 markaz': [33.6762, 73.0491],
  'g 9 markaz': [33.6762, 73.0491],
  'g-9 markaz islamabad': [33.6762, 73.0491],
  'g9 markaz islamabad': [33.6762, 73.0491],
  'g 9 markaz islamabad': [33.6762, 73.0491],
  
  'g-8': [33.6852, 73.0680],
  'g8': [33.6852, 73.0680],
  'g 8': [33.6852, 73.0680],
  'g-8 markaz': [33.6852, 73.0680],
  'g8 markaz': [33.6852, 73.0680],
  'g 8 markaz': [33.6852, 73.0680],
  'g-8 markaz islamabad': [33.6852, 73.0680],
  'g8 markaz islamabad': [33.6852, 73.0680],
  'g 8 markaz islamabad': [33.6852, 73.0680],
  
  'g-7': [33.6936, 73.0768],
  'g7': [33.6936, 73.0768],
  'g 7': [33.6936, 73.0768],
  'g-7 markaz': [33.6936, 73.0768],
  'g7 markaz': [33.6936, 73.0768],
  'g 7 markaz': [33.6936, 73.0768],
  'g-7 markaz islamabad': [33.6936, 73.0768],
  'g7 markaz islamabad': [33.6936, 73.0768],
  'g 7 markaz islamabad': [33.6936, 73.0768],
  
  'g-6': [33.7026, 73.0943],
  'g6': [33.7026, 73.0943],
  'g 6': [33.7026, 73.0943],
  'g-6 markaz': [33.7026, 73.0943],
  'g6 markaz': [33.7026, 73.0943],
  'g 6 markaz': [33.7026, 73.0943],
  'g-6 markaz islamabad': [33.7026, 73.0943],
  'g6 markaz islamabad': [33.7026, 73.0943],
  'g 6 markaz islamabad': [33.7026, 73.0943],
  
  // Blue Area
  'blue area': [33.7294, 73.0731],
  'blue area islamabad': [33.7294, 73.0731],
  
  // Other areas in Islamabad
  'i-8': [33.6602, 73.0741],
  'i8': [33.6602, 73.0741],
  'i 8': [33.6602, 73.0741],
  'i-8 markaz': [33.6602, 73.0741],
  
  'e-7': [33.7107, 73.0415],
  'e7': [33.7107, 73.0415],
  'e 7': [33.7107, 73.0415],
  
  'h-8': [33.6914, 73.0492],
  'h8': [33.6914, 73.0492],
  'h 8': [33.6914, 73.0492],
  
  // International cities
  'dubai': [25.2048, 55.2708],
  'new york': [40.7128, -74.0060],
  'london': [51.5074, -0.1278],
  'tokyo': [35.6762, 139.6503],
  'paris': [48.8566, 2.3522],
  'sydney': [-33.8688, 151.2093],
  'default': [33.6844, 73.0479] // Default to Islamabad
};

/**
 * Find coordinates for a location name
 */
function findLocationCoordinates(query: string): LatLngExpression {
  const normalizedQuery = query.toLowerCase().trim();
  
  for (const [key, coords] of Object.entries(locationCoordinates)) {
    if (normalizedQuery === key || normalizedQuery.includes(key)) {
      return coords;
    }
  }
  
  // Default to Islamabad with slight randomization if no match
  const [defaultLat, defaultLng] = locationCoordinates.default as [number, number];
  return [
    defaultLat + (Math.random() - 0.5) * 0.05,
    defaultLng + (Math.random() - 0.5) * 0.05
  ];
}

const GymMap = forwardRef<any, GymMapProps>(({ searchQuery, searchLocation, onSearchComplete, onGymsLoaded }, ref) => {
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null)
  const [gyms, setGyms] = useState<MockGym[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<{
    user: L.Marker | null,
    search: L.Marker | null,
    gyms: L.Marker[]
  }>({
    user: null,
    search: null,
    gyms: []
  })
  
  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    focusGym: (gymId: string) => {
      const marker = markersRef.current.gyms.find(marker => 
        marker.getElement()?.getAttribute('data-gym-id') === gymId
      );
      
      if (marker && mapRef.current) {
        mapRef.current.flyTo(marker.getLatLng(), 15);
        marker.openPopup();
      }
    }
  }), []);
  
  // Initialize Leaflet icons once
  useEffect(() => {
    initializeLeafletIcons()
  }, [])
  
  // Clean up map on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Clear all existing gym markers
  const clearGymMarkers = useCallback(() => {
    markersRef.current.gyms.forEach(marker => {
      marker.remove();
    });
    markersRef.current.gyms = [];
  }, []);
  
  // Create gym markers on the map
  const createGymMarkers = useCallback((newGyms: MockGym[]) => {
    if (!mapRef.current) return;
    
    // Clear existing markers first
    clearGymMarkers();
    
    // Create custom red marker icon
    const redGymIcon = L.divIcon({
      html: `<div class="flex items-center justify-center h-full w-full">
              <div class="h-6 w-6 bg-red-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M6.5 6.5h11"></path><path d="M6.5 17.5h11"></path><path d="M8 6.5v11"></path><path d="M16 6.5v11"></path></svg>
              </div>
             </div>`,
      className: 'custom-div-icon',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
    
    // Add new gym markers
    newGyms.forEach(gym => {
      if (!mapRef.current) return;
      
      // Create marker with custom data attribute for ID
      const marker = L.marker(gym.position, { icon: redGymIcon })
        .addTo(mapRef.current);
      
      // Set custom data attribute for ID
      const element = marker.getElement();
      if (element) {
        element.setAttribute('data-gym-id', gym.id);
      }
      
      // Add popup
      marker.bindPopup(`
        <div class="p-1">
          <h3 class="font-bold text-base mb-1">${gym.name}</h3>
          <p class="text-sm text-gray-500 mb-2">${gym.address}</p>
          ${gym.rating ? `
          <div class="flex items-center">
            <span class="text-yellow-500">★</span>
            <span class="ml-1 text-sm">${gym.rating}/5.0</span>
          </div>` : ''}
        </div>
      `);
      
      // Save reference
      markersRef.current.gyms.push(marker);
    });
  }, [clearGymMarkers]);
  
  // Get user location and find nearby gyms
  useEffect(() => {
    // Skip if already loaded
    if (!isLoading) return;
    
    // Get user's geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const userCoords: LatLngExpression = [latitude, longitude];
            setUserLocation(userCoords);
            
            // Try to get real gyms for the user's area
            let realGyms = getGymsForArea('');
            let userGyms: MockGym[] = [];
            if (realGyms && realGyms.length > 0) {
              userGyms = realGyms.map(convertToMockGym);
            } else {
              // Fallback to mock gyms around user location
              userGyms = generateMockGymsAroundLocation(userCoords, 10, 0);
            }
            setGyms(userGyms);
            
            // Notify parent component about loaded gyms
            if (onGymsLoaded) {
              onGymsLoaded(userGyms);
            }
            
            setIsLoading(false);
          } catch (error) {
            console.error("Error processing user location:", error);
            setError("Failed to get nearby gyms for your location.");
            setIsLoading(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Failed to get your location. Please enable location services.");
          
          // Fallback to a default location (Islamabad)
          const defaultLocation = locationCoordinates.default;
          setUserLocation(defaultLocation);
          
          // Try to get real gyms for the default area
          let realGyms = getGymsForArea('');
          let defaultGyms: MockGym[] = [];
          if (realGyms && realGyms.length > 0) {
            defaultGyms = realGyms.map(convertToMockGym);
          } else {
            // Fallback to mock gyms around default location
            defaultGyms = generateMockGymsAroundLocation(defaultLocation, 10, 0);
          }
          setGyms(defaultGyms);
          
          // Notify parent component about loaded gyms
          if (onGymsLoaded) {
            onGymsLoaded(defaultGyms);
          }
          
          setIsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
    }
  }, [isLoading]);
  
  // Initialize map after user location is set
  useEffect(() => {
    // Skip if map already exists or location not set
    if (mapRef.current || !userLocation || !mapContainerRef.current) return;
    
    // Create map instance
    const map = L.map(mapContainerRef.current).setView(userLocation, 13);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add user marker
    const userMarker = L.marker(userLocation, { icon: userIcon })
      .addTo(map)
      .bindPopup('<div class="text-center"><p class="font-semibold">Your Location</p></div>');
    
    // Save user marker reference
    markersRef.current.user = userMarker;
    
    // Add gym markers
    createGymMarkers(gyms);
    
    // Store map reference
    mapRef.current = map;
    
    // Handle resize events
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [userLocation, gyms]);
  
  // Handle search queries
  useEffect(() => {
    // Skip if no search query or map not initialized
    if (!searchQuery || !mapRef.current) return;
    
    const handleSearch = () => {
      try {
        setIsSearching(true);
        
        // Find coordinates for the search query
        const searchCoords = findLocationCoordinates(searchQuery);
        
        // Remove existing search marker if it exists
        if (markersRef.current.search) {
          markersRef.current.search.remove();
          markersRef.current.search = null;
        }
        
        // Try to get real gyms for the area
        let realGyms = getGymsForArea(searchQuery);
        let searchGyms: MockGym[] = [];
        if (realGyms && realGyms.length > 0) {
          searchGyms = realGyms.map(convertToMockGym);
        } else {
          // Fallback to mock gyms if no real data found
          searchGyms = generateMockGymsAroundLocation(searchCoords, 10, 100);
        }
        setGyms(searchGyms);
        
        // Notify parent component about loaded gyms
        if (onGymsLoaded) {
          onGymsLoaded(searchGyms);
        }
        
        // Create markers for search location gyms
        createGymMarkers(searchGyms);
        
        // Create new marker with custom icon
        const searchIcon = L.divIcon({
          html: `<div class="flex items-center justify-center h-full w-full">
                  <div class="h-5 w-5 bg-purple-500 rounded-full border-2 border-white shadow-md"></div>
                 </div>`,
          className: 'custom-div-icon',
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });
        
        // Add marker to map
        if (mapRef.current) {
          // Add search marker
          markersRef.current.search = L.marker(searchCoords, { icon: searchIcon })
            .addTo(mapRef.current)
            .bindPopup(`<div class="text-center"><p class="font-semibold">Search: ${searchQuery}</p></div>`);
          
          // Open popup and fly to location
          markersRef.current.search.openPopup();
          mapRef.current.flyTo(searchCoords, 14, {
            duration: 1.5
          });
        }
        
        // Notify parent component of success
        if (onSearchComplete) {
          onSearchComplete(
            true, 
            `Found ${searchGyms.length} gyms near ${searchQuery}`, 
            searchQuery
          );
        }
      } catch (error) {
        console.error("Search error:", error);
        if (onSearchComplete) {
          onSearchComplete(false, error instanceof Error ? error.message : "Failed to search for that location. Please try a different search term.");
        }
      } finally {
        setIsSearching(false);
      }
    };
    
    handleSearch();
  }, [searchQuery]);
  
  if (isLoading) {
    return (
      <div className="h-64 w-full rounded-lg bg-[#2a2a2a] border border-white/10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-cyan-400 animate-spin" />
          <p className="text-white/50 text-lg">Loading map...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="h-64 w-full rounded-lg bg-[#2a2a2a] border border-white/10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 max-w-md text-center px-4">
          <Dumbbell className="h-12 w-12 text-red-400 opacity-50" />
          <p className="text-white/50 text-lg">{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden border border-white/10 shadow-xl relative">
      <div 
        ref={mapContainerRef} 
        className="h-full w-full"
      />
      
      {/* Searching overlay */}
      {isSearching && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-[1000]">
          <div className="flex flex-col items-center gap-3 bg-[#1a1a1a] p-4 rounded-lg border border-white/10">
            <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
            <p className="text-white">Searching for gyms...</p>
          </div>
        </div>
      )}
      
      {/* Map controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-[400]">
        {/* User location button */}
        {userLocation && (
          <button 
            className="bg-[#1a1a1a] p-2 rounded-lg border border-white/10 hover:bg-[#252525] transition-colors"
            onClick={() => {
              if (mapRef.current && userLocation) {
                mapRef.current.flyTo(userLocation, 13);
                if (markersRef.current.user) {
                  markersRef.current.user.openPopup();
                }
              }
            }}
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-400" />
              <span className="text-white text-sm">Your Location</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
});

GymMap.displayName = 'GymMap';

export default GymMap; 