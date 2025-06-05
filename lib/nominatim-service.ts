// Service for handling Nominatim API requests (OpenStreetMap geocoding)
// Documentation: https://nominatim.org/release-docs/develop/api/Search/

// Simple cache to prevent duplicate API calls
const geocodeCache: Record<string, any> = {};

// Response type for Nominatim geocoding API
export interface NominatimResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  address?: {
    road?: string;
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
  };
}

/**
 * Normalize search query to improve geocoding results
 * @param query Raw search query
 * @returns Normalized search query
 */
function normalizeSearchQuery(query: string): string {
  // Convert to lowercase
  let normalized = query.toLowerCase().trim();
  
  // Add country context if it seems to be a locality without country
  if (!normalized.includes('pakistan') && 
      (normalized.includes('islamabad') || 
       normalized.includes('f-') || 
       normalized.includes('f ') || 
       normalized.includes('g-') || 
       normalized.includes('g '))) {
    normalized += ', pakistan';
  }
  
  // Add city context for sectors
  if (!normalized.includes('islamabad') && 
      (normalized.includes('f-') || 
       normalized.includes('f ') || 
       normalized.includes('g-') || 
       normalized.includes('g '))) {
    normalized += ', islamabad';
  }
  
  // Add Dubai context
  if (!normalized.includes('dubai') && 
      !normalized.includes('uae') && 
      !normalized.includes('emirates') &&
      (normalized.includes('jumeirah') || 
       normalized.includes('burj') || 
       normalized.includes('sheikh'))) {
    normalized += ', dubai';
  }
  
  return normalized;
}

/**
 * Geocode a search query using our API endpoint
 * @param query Search query (address, city, landmark, etc.)
 * @returns Promise with geocoding results
 */
export async function geocodeAddress(query: string): Promise<NominatimResponse[]> {
  try {
    // Normalize the query to improve results
    const normalizedQuery = normalizeSearchQuery(query);
    
    // Check cache first
    const cacheKey = `geocode:${normalizedQuery}`;
    if (geocodeCache[cacheKey]) {
      console.log('Using cached geocode results for:', normalizedQuery);
      return geocodeCache[cacheKey];
    }
    
    // Use our internal API endpoint instead of calling Nominatim directly
    // This avoids CORS issues
    const encodedQuery = encodeURIComponent(normalizedQuery);
    const url = `/api/geocode?q=${encodedQuery}`;
    
    const response = await fetch(url);
    
    // Parse the JSON response first to get any error message
    const data = await response.json();
    
    // Check if the response contains an error
    if (!response.ok) {
      const errorMessage = data.error || `Geocoding error: ${response.status} ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    
    // If we got an empty array but no error, try with original query
    if (Array.isArray(data) && data.length === 0 && normalizedQuery !== query) {
      const encodedOriginalQuery = encodeURIComponent(query);
      const originalUrl = `/api/geocode?q=${encodedOriginalQuery}`;
      
      const originalResponse = await fetch(originalUrl);
      const originalData = await originalResponse.json();
      
      if (!originalResponse.ok) {
        const errorMessage = originalData.error || `Geocoding error: ${originalResponse.status} ${originalResponse.statusText}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }
      
      if (Array.isArray(originalData) && originalData.length > 0) {
        // Cache the results
        geocodeCache[cacheKey] = originalData;
        return originalData;
      }
    }
    
    // If we got here, the data is valid
    if (Array.isArray(data)) {
      // Cache the results
      geocodeCache[cacheKey] = data;
      return data;
    }
    
    // If we got here but data is not an array, something went wrong
    throw new Error('Invalid response format from geocoding service');
  } catch (error) {
    console.error('Geocoding failed:', error);
    throw error;
  }
}

/**
 * Get address details from coordinates using reverse geocoding
 * @param lat Latitude
 * @param lon Longitude
 * @returns Promise with location details
 */
export async function reverseGeocode(lat: number, lon: number): Promise<NominatimResponse> {
  try {
    // Check cache first
    const cacheKey = `reverse:${lat},${lon}`;
    if (geocodeCache[cacheKey]) {
      console.log('Using cached reverse geocode results for:', lat, lon);
      return geocodeCache[cacheKey];
    }
    
    // Use our internal API endpoint for reverse geocoding
    const url = '/api/geocode';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lat, lon }),
    });
    
    if (!response.ok) {
      throw new Error(`Reverse geocoding error: ${response.status} ${response.statusText}`);
    }
    
    const results = await response.json();
    
    // Cache the results
    geocodeCache[cacheKey] = results;
    
    return results;
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
    throw error;
  }
}

// Nominatim requires a delay between requests to avoid being rate-limited
export function addRequestDelay(ms = 1000): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
} 