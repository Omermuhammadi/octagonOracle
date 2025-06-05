// Google Maps API services for geocoding and nearby search
// Note: We're using our own API endpoint to proxy requests to Google APIs

import { MockGym, generateMockGymsAroundLocation, generateLocationSpecificGyms } from './mock-gym-data';
import { LatLngExpression } from 'leaflet';

// Simple cache to prevent duplicate API calls
const geocodeCache: Record<string, any> = {};
const nearbyGymsCache: Record<string, any> = {};

// Flag to determine if we're using mock data due to API key issues
let useMockData = false;

// Interface for location coordinates
export interface Coordinates {
  lat: number;
  lng: number;
}

// Interface for gym data from Google Places API
export interface GoogleGym {
  place_id: string;
  name: string;
  vicinity: string; // short address
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
  };
  rating?: number;
  user_ratings_total?: number;
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  opening_hours?: {
    open_now: boolean;
  };
}

/**
 * Geocode a location name to coordinates using Google Geocoding API
 * @param locationName Name of the location to geocode
 * @returns Promise with location coordinates
 */
export async function geocodeLocation(locationName: string): Promise<Coordinates> {
  try {
    // If we already know the API key is invalid, use mock geocoding
    if (useMockData) {
      console.log('Using mock geocoding for:', locationName);
      return mockGeocodeLocation(locationName);
    }

    // Check cache first
    const cacheKey = `geocode:${locationName}`;
    if (geocodeCache[cacheKey]) {
      console.log('Using cached geocode results for:', locationName);
      return geocodeCache[cacheKey];
    }
    
    // Use our server endpoint to proxy the request to Google's API
    const url = `/api/google/geocode?address=${encodeURIComponent(locationName)}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Geocoding API error:', errorData.error);
      
      // If we get an API key error, switch to mock data
      if (errorData.error && (
          errorData.error.includes('API key is invalid') || 
          errorData.error.includes('REQUEST_DENIED'))) {
        console.log('Switching to mock geocoding due to API key issues');
        useMockData = true;
        return mockGeocodeLocation(locationName);
      }
      
      throw new Error(errorData.error || `Geocoding error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status !== "OK" || !data.results || data.results.length === 0) {
      console.log('No geocoding results, using mock data');
      return mockGeocodeLocation(locationName);
    }
    
    // Extract coordinates from the first result
    const location = data.results[0].geometry.location;
    
    // Cache the result
    geocodeCache[cacheKey] = location;
    
    return location;
  } catch (error) {
    console.error('Geocoding failed, using mock data:', error);
    useMockData = true;
    return mockGeocodeLocation(locationName);
  }
}

/**
 * Mock geocoding function that returns coordinates for common locations
 * @param locationName Name of the location
 * @returns Coordinates
 */
function mockGeocodeLocation(locationName: string): Coordinates {
  const normalizedLocation = locationName.toLowerCase().trim();
  
  // Common locations with approximate coordinates
  const locations: Record<string, Coordinates> = {
    'islamabad': { lat: 33.6844, lng: 73.0479 },
    'f-11': { lat: 33.6841, lng: 72.9925 },
    'g-11': { lat: 33.6537, lng: 73.0114 },
    'f-10': { lat: 33.6956, lng: 73.0118 },
    'g-10': { lat: 33.6659, lng: 73.0306 },
    'f-9': { lat: 33.7006, lng: 73.0312 },
    'g-9': { lat: 33.6762, lng: 73.0491 },
    'f-8': { lat: 33.7090, lng: 73.0471 },
    'g-8': { lat: 33.6852, lng: 73.0680 },
    'f-7': { lat: 33.7173, lng: 73.0529 },
    'g-7': { lat: 33.6936, lng: 73.0768 },
    'f-6': { lat: 33.7259, lng: 73.0696 },
    'g-6': { lat: 33.7026, lng: 73.0943 },
    'dubai': { lat: 25.2048, lng: 55.2708 },
    'new york': { lat: 40.7128, lng: -74.0060 },
    'london': { lat: 51.5074, lng: -0.1278 },
    'tokyo': { lat: 35.6762, lng: 139.6503 },
    'paris': { lat: 48.8566, lng: 2.3522 },
    'sydney': { lat: -33.8688, lng: 151.2093 }
  };
  
  // Try to find an exact match
  for (const [key, coords] of Object.entries(locations)) {
    if (normalizedLocation === key || normalizedLocation.includes(key)) {
      console.log(`Found mock coordinates for ${locationName}: ${coords.lat}, ${coords.lng}`);
      
      // Cache the result
      const cacheKey = `geocode:${locationName}`;
      geocodeCache[cacheKey] = coords;
      
      return coords;
    }
  }
  
  // If no match found, return random coordinates near Islamabad as default
  const defaultLat = 33.6844 + (Math.random() - 0.5) * 0.1;
  const defaultLng = 73.0479 + (Math.random() - 0.5) * 0.1;
  console.log(`No match found for ${locationName}, using default coordinates: ${defaultLat}, ${defaultLng}`);
  
  const defaultCoords = { lat: defaultLat, lng: defaultLng };
  
  // Cache the result
  const cacheKey = `geocode:${locationName}`;
  geocodeCache[cacheKey] = defaultCoords;
  
  return defaultCoords;
}

/**
 * Fetch nearby gyms using Google Places Nearby Search API
 * @param lat Latitude
 * @param lng Longitude
 * @param radius Search radius in meters (default 5000m = 5km)
 * @returns Promise with an array of nearby gyms
 */
export async function fetchNearbyGyms(lat: number, lng: number, radius: number = 5000): Promise<GoogleGym[]> {
  try {
    // If we already know the API key is invalid, use mock data
    if (useMockData) {
      console.log('Using mock gym data for:', lat, lng);
      return mockNearbyGyms(lat, lng);
    }

    // Check cache first
    const cacheKey = `nearby:${lat},${lng},${radius}`;
    if (nearbyGymsCache[cacheKey]) {
      console.log('Using cached nearby gyms results for:', lat, lng);
      return nearbyGymsCache[cacheKey];
    }
    
    // Use our server endpoint to proxy the request to Google's API
    const url = `/api/google/places/nearby?lat=${lat}&lng=${lng}&radius=${radius}&type=gym`;
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Places API error:', errorData.error);
      
      // If we get an API key error, switch to mock data
      if (errorData.error && (
          errorData.error.includes('API key is invalid') || 
          errorData.error.includes('REQUEST_DENIED'))) {
        console.log('Switching to mock gym data due to API key issues');
        useMockData = true;
        return mockNearbyGyms(lat, lng);
      }
      
      throw new Error(errorData.error || `Nearby search error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status !== "OK" || !data.results || data.results.length === 0) {
      console.log('No places results or empty results, using mock data');
      return mockNearbyGyms(lat, lng);
    }
    
    // Cache the result
    nearbyGymsCache[cacheKey] = data.results;
    
    return data.results;
  } catch (error) {
    console.error('Nearby gyms search failed, using mock data:', error);
    useMockData = true;
    return mockNearbyGyms(lat, lng);
  }
}

/**
 * Generate mock gym data for nearby locations
 * @param lat Latitude
 * @param lng Longitude
 * @returns Array of mock gyms in Google Places API format
 */
function mockNearbyGyms(lat: number, lng: number): GoogleGym[] {
  // Generate mock gyms using our mock data generator
  const mockGyms = generateMockGymsAroundLocation([lat, lng], 10, 0);
  
  // Convert to Google Places API format
  return mockGyms.map(gym => ({
    place_id: gym.id,
    name: gym.name,
    vicinity: gym.address,
    geometry: {
      location: {
        lat: Array.isArray(gym.position) ? gym.position[0] : gym.position.lat,
        lng: Array.isArray(gym.position) ? gym.position[1] : gym.position.lng
      }
    },
    rating: gym.rating
  }));
} 