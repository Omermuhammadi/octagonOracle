// Mock data for gym locations to use when Google Places API is not available
import { LatLngExpression } from 'leaflet';

// Gym templates (without positions)
export const gymTemplates = [
  { 
    name: "Elite MMA Academy", 
    type: "Mixed Martial Arts", 
    address: "123 Fighter Street", 
    rating: 4.8 
  },
  { 
    name: "Champions Boxing Gym", 
    type: "Boxing", 
    address: "456 Knockout Avenue", 
    rating: 4.5 
  },
  { 
    name: "Gracie Jiu-Jitsu", 
    type: "Brazilian Jiu-Jitsu", 
    address: "789 Submission Road", 
    rating: 4.9 
  },
  { 
    name: "Muay Thai Fighters", 
    type: "Muay Thai", 
    address: "101 Kickboxing Lane", 
    rating: 4.6 
  },
  { 
    name: "Zen Karate Dojo", 
    type: "Karate", 
    address: "202 Traditional Way", 
    rating: 4.7 
  },
  {
    name: "Power Wrestling Club",
    type: "Wrestling",
    address: "303 Grapple Boulevard",
    rating: 4.6
  },
  {
    name: "Taekwondo Masters",
    type: "Taekwondo",
    address: "404 Kick Avenue",
    rating: 4.4
  },
  {
    name: "Sambo Training Center",
    type: "Sambo",
    address: "505 Combat Street",
    rating: 4.7
  },
  {
    name: "Krav Maga Defense",
    type: "Krav Maga",
    address: "606 Tactical Road",
    rating: 4.8
  },
  {
    name: "Judo Academy",
    type: "Judo",
    address: "707 Throw Lane",
    rating: 4.5
  }
];

// Location-specific gym name prefixes
export const locationPrefixes: Record<string, string[]> = {
  "Dubai": ["Dubai", "UAE", "Emirates", "Sheikh Zayed", "Jumeirah"],
  "Islamabad": ["Islamabad", "Capital", "G-13", "Pakistan", "National"],
  "F-11": ["F-11", "Markaz", "Islamabad", "Sector", "Pakistan"],
  "F-10": ["F-10", "Markaz", "Islamabad", "Sector", "Pakistan"],
  "F-9": ["F-9", "Markaz", "Islamabad", "Sector", "Pakistan"],
  "F-8": ["F-8", "Markaz", "Islamabad", "Sector", "Pakistan"],
  "G-9": ["G-9", "Markaz", "Islamabad", "Sector", "Pakistan"],
  "G-8": ["G-8", "Markaz", "Islamabad", "Sector", "Pakistan"],
  "default": ["Local", "City", "Downtown", "Central", "Regional"]
};

/**
 * Generate mock gyms around a location
 * @param location Center coordinates
 * @param count Number of gyms to generate
 * @param startId Starting ID
 * @returns Array of mock gyms
 */
export function generateMockGymsAroundLocation(
  location: LatLngExpression,
  count = 10,
  startId = 0
): any[] {
  const templates = gymTemplates.length >= count
    ? gymTemplates.slice(0, count)
    : Array.from({ length: count }, (_, i) => gymTemplates[i % gymTemplates.length]);

  const lat = Array.isArray(location) ? location[0] : location.lat;
  const lng = Array.isArray(location) ? location[1] : location.lng;

  return templates.map((template, index) => ({
    id: `mock-${startId + index}`,
    name: template.name,
    type: template.type,
    address: template.address,
    rating: template.rating,
    position: [
      lat + ((Math.random() - 0.5) * 0.02),  // ±0.01° ~ 1km
      lng + ((Math.random() - 0.5) * 0.02)
    ] as LatLngExpression
  }));
}

/**
 * Generate location-specific gyms
 * @param location Location name
 * @param coordinates Coordinates
 * @param count Number of gyms to generate
 * @returns Array of mock gyms
 */
export function generateLocationSpecificGyms(
  location: string,
  coordinates: LatLngExpression,
  count = 5
): any[] {
  // Determine the best location key to use
  let locationKey = "default";
  const normalizedLocation = location.toLowerCase();
  
  Object.keys(locationPrefixes).forEach(key => {
    if (normalizedLocation.includes(key.toLowerCase())) {
      locationKey = key;
    }
  });
  
  const prefixes = locationPrefixes[locationKey] || locationPrefixes.default;
  const lat = Array.isArray(coordinates) ? coordinates[0] : coordinates.lat;
  const lng = Array.isArray(coordinates) ? coordinates[1] : coordinates.lng;
  
  return Array.from({ length: count }).map((_, index) => {
    const template = gymTemplates[index % gymTemplates.length];
    const prefix = prefixes[index % prefixes.length];
    
    // Add more relevant addresses for specific locations
    let address = `${Math.floor(Math.random() * 100) + 1} ${prefix} ${template.address}`;
    
    // For F and G sectors, use more realistic addresses
    if (locationKey.startsWith('F-') || locationKey.startsWith('G-')) {
      const streetNum = Math.floor(Math.random() * 20) + 1;
      address = `Street ${streetNum}, ${locationKey}, Islamabad`;
    }
    
    return {
      id: `mock-loc-${index}`,
      name: `${prefix} ${template.name}`,
      type: template.type,
      address: address,
      rating: Math.round((template.rating + (Math.random() * 0.4 - 0.2)) * 10) / 10, // Slight variation
      position: [
        lat + ((Math.random() - 0.5) * 0.02),  // ±0.01° ~ 1km
        lng + ((Math.random() - 0.5) * 0.02)
      ] as LatLngExpression
    };
  });
} 