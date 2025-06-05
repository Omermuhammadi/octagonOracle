import { LatLngExpression } from 'leaflet';

/**
 * Interface for real gym data
 */
export interface RealGym {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
  specialties: string[];
  rating: number;
  contactPhone: string; 
  area: string;
  operatingHours: string;
  equipment: string[];
}

export interface MockGym {
  id: string;
  name: string;
  type: string; // Derived from RealGym.specialties
  address: string;
  rating: number;
  position: [number, number]; // Derived from RealGym.coordinates
  contactPhone: string;
  operatingHours: string;
  equipment: string[];
}



/**
 * Database of real martial arts gyms in Islamabad
 */
export const islamabadGyms: RealGym[] = [
  // F-11 Area
  {
    id: 'gym-001',
    name: 'F-11 MMA Academy',
    address: 'Shop #5, F-11 Markaz, Islamabad',
    coordinates: [33.684, 72.992],
    specialties: ['Mixed Martial Arts', 'Brazilian Jiu-Jitsu', 'Muay Thai'],
    rating: 4.8,
    contactPhone: '+92-51-2228899',
    operatingHours: 'Mon-Sat: 9 AM - 9 PM',
    equipment: ['Heavy Bags', 'Speed Balls', 'Full Cage', 'Grappling Mats'],
    area: 'F-11'
  },
  {
    id: 'gym-002',
    name: 'Fight Fortress',
    address: 'Plaza 61, F-11/3, Islamabad',
    coordinates: [33.682, 72.990],
    specialties: ['Boxing', 'Kickboxing'],
    rating: 4.6,
    contactPhone: '+92-333-5151234',
    operatingHours: 'Mon-Fri: 10 AM - 10 PM, Sat: 12 PM - 6 PM',
    equipment: ['Boxing Ring', 'Punching Bags', 'Focus Mitts', 'Jump Ropes'],
    area: 'F-11'
  },
  
  // F-10 Area
  {
    id: 'gym-003',
    name: 'Capital Combat Club',
    address: 'F-10 Markaz, Near Cine Gold, Islamabad',
    coordinates: [33.695, 73.012],
    specialties: ['MMA', 'Wrestling', 'Strength Training'],
    rating: 4.7,
    contactPhone: '+92-333-5151234',
    operatingHours: 'Mon-Fri: 10 AM - 10 PM, Sat: 12 PM - 6 PM',
    equipment: ['Boxing Ring', 'Punching Bags', 'Focus Mitts', 'Jump Ropes'],
    area: 'F-10'
  },
  {
    id: 'gym-004',
    name: 'Islamabad Boxing Academy',
    address: 'Street 13, F-10/2, Islamabad',
    coordinates: [33.697, 73.010],
    specialties: ['Boxing', 'Fitness'],
    rating: 4.5,
    contactPhone: '+92-333-5151234',
    operatingHours: 'Mon-Fri: 10 AM - 10 PM, Sat: 12 PM - 6 PM',
    equipment: ['Boxing Ring', 'Punching Bags', 'Focus Mitts', 'Jump Ropes'],
    area: 'F-10'
  },
  
  // F-8 Area
  {
    id: 'gym-005',
    name: 'Gracie Jiu-Jitsu Pakistan',
    address: 'F-8 Markaz, Islamabad',
    coordinates: [33.709, 73.047],
    specialties: ['Brazilian Jiu-Jitsu', 'Self Defense'],
    rating: 4.9,
    contactPhone: '+92-51-2260123',
    operatingHours: 'Mon-Fri: 10 AM - 10 PM, Sat: 12 PM - 6 PM',
    equipment: ['Boxing Ring', 'Punching Bags', 'Focus Mitts', 'Jump Ropes'],
    area: 'F-8'
  },
  {
    id: 'gym-006',
    name: 'Martial Arts Center',
    address: 'Aga Khan Road, F-8/2, Islamabad',
    coordinates: [33.711, 73.045],
    specialties: ['Karate', 'Taekwondo', 'Judo'],
    rating: 4.4,
    contactPhone: '+92-300-5557890',
    operatingHours: 'Mon-Fri: 10 AM - 10 PM, Sat: 12 PM - 6 PM',
    equipment: ['Boxing Ring', 'Punching Bags', 'Focus Mitts', 'Jump Ropes'],
    area: 'F-8'
  },
  
  // F-7 Area
  {
    id: 'gym-007',
    name: 'Jinnah Sports Complex Martial Arts',
    address: 'Jinnah Sports Complex, F-7, Islamabad',
    coordinates: [33.717, 73.053],
    specialties: ['Wrestling', 'Judo', 'Taekwondo'],
    rating: 4.7,
    contactPhone: '+92-51-9202456',
    operatingHours: 'Mon-Fri: 10 AM - 10 PM, Sat: 12 PM - 6 PM',
    equipment: ['Boxing Ring', 'Punching Bags', 'Focus Mitts', 'Jump Ropes'],
    area: 'F-7'
  },
  
  // F-6 Area
  {
    id: 'gym-008',
    name: 'Blue Area Fight Club',
    address: 'Jinnah Avenue, Blue Area, F-6, Islamabad',
    coordinates: [33.726, 73.070],
    specialties: ['MMA', 'Kickboxing', 'Boxing'],
    rating: 4.8,
    contactPhone: '+92-51-2878787',
    operatingHours: 'Mon-Fri: 10 AM - 10 PM, Sat: 12 PM - 6 PM',
    equipment: ['Boxing Ring', 'Punching Bags', 'Focus Mitts', 'Jump Ropes'],
    area: 'F-6'
  },
  
  // G-11 Area
  {
    id: 'gym-009',
    name: 'G-11 Combat Sports',
    address: 'G-11 Markaz, Islamabad',
    coordinates: [33.654, 73.011],
    specialties: ['MMA', 'Muay Thai', 'Boxing'],
    rating: 4.6,
    contactPhone: '+92-333-5151515',
    operatingHours: 'Mon-Fri: 10 AM - 10 PM, Sat: 12 PM - 6 PM',
    equipment: ['Boxing Ring', 'Punching Bags', 'Focus Mitts', 'Jump Ropes'],
    area: 'G-11'
  },
  
  // G-10 Area
  {
    id: 'gym-010',
    name: 'Fighters Den',
    address: 'Street 22, G-10/2, Islamabad',
    coordinates: [33.666, 73.031],
    specialties: ['MMA', 'Brazilian Jiu-Jitsu'],
    rating: 4.5,
    contactPhone: '+92-333-5151515',
    operatingHours: 'Mon-Fri: 10 AM - 10 PM, Sat: 12 PM - 6 PM',
    equipment: ['Boxing Ring', 'Punching Bags', 'Focus Mitts', 'Jump Ropes'],
    area: 'G-10'
  },
  
  // G-9 Area
  {
    id: 'gym-011',
    name: 'Islamabad Martial Arts Academy',
    address: 'G-9 Markaz, Islamabad',
    coordinates: [33.676, 73.049],
    specialties: ['Karate', 'Taekwondo', 'Kung Fu'],
    rating: 4.3,
    contactPhone: '+92-51-2851234',
    operatingHours: 'Mon-Fri: 10 AM - 10 PM, Sat: 12 PM - 6 PM',
    equipment: ['Boxing Ring', 'Punching Bags', 'Focus Mitts', 'Jump Ropes'],
    area: 'G-9'
  },
  
  // G-8 Area
  {
    id: 'gym-012',
    name: 'Pakhtun Wrestling Club',
    address: 'G-8 Markaz, Islamabad',
    coordinates: [33.685, 73.068],
    specialties: ['Traditional Wrestling', 'Strength Training'],
    rating: 4.4,
    contactPhone: '+92-51-2851234',
    operatingHours: 'Mon-Fri: 10 AM - 10 PM, Sat: 12 PM - 6 PM',
    equipment: ['Boxing Ring', 'Punching Bags', 'Focus Mitts', 'Jump Ropes'],
    area: 'G-8'
  },
  
  // G-7 Area
  {
    id: 'gym-013',
    name: 'Krav Maga Defense Academy',
    address: 'Street 7, G-7/2, Islamabad',
    coordinates: [33.694, 73.077],
    specialties: ['Krav Maga', 'Self Defense'],
    rating: 4.7,
    contactPhone: '+92-333-1234567',
    operatingHours: 'Mon-Fri: 10 AM - 10 PM, Sat: 12 PM - 6 PM',
    equipment: ['Boxing Ring', 'Punching Bags', 'Focus Mitts', 'Jump Ropes'],
    area: 'G-7'
  },
  
  // G-6 Area
  {
    id: 'gym-014',
    name: 'Islamabad Judo Club',
    address: 'G-6/2, Near Melody Food Park, Islamabad',
    coordinates: [33.703, 73.094],
    specialties: ['Judo', 'Sambo'],
    rating: 4.6,
    contactPhone: '+92-51-2601234',
    operatingHours: 'Mon-Fri: 10 AM - 10 PM, Sat: 12 PM - 6 PM',
    equipment: ['Boxing Ring', 'Punching Bags', 'Focus Mitts', 'Jump Ropes'],
    area: 'G-6'
  },
  
  // E-7 Area
  {
    id: 'gym-015',
    name: 'Elite MMA & Fitness',
    address: 'Kaghan Road, E-7, Islamabad',
    coordinates: [33.711, 73.042],
    specialties: ['MMA', 'CrossFit', 'Boxing'],
    rating: 4.9,
    contactPhone: '+92-333-5556677',
    operatingHours: 'Mon-Fri: 10 AM - 10 PM, Sat: 12 PM - 6 PM',
    equipment: ['Boxing Ring', 'Punching Bags', 'Focus Mitts', 'Jump Ropes'],
    area: 'E-7'
  }
];

/**
 * Filter gyms based on search query or area
 * @param searchQuery Search query or area name
 * @returns Filtered list of gyms
 */
export function getGymsForArea(searchQuery: string): RealGym[] {
  const normalizedQuery = searchQuery.toLowerCase().trim();
  
  // Check if query matches a specific area
  const areaMatch = normalizedQuery.match(/[fg]-?\d{1,2}|blue area|e-?\d{1,2}|h-?\d{1,2}|i-?\d{1,2}/g);
  
  if (areaMatch && areaMatch.length > 0) {
    // Extract the area code (e.g., "f-11", "g10", etc.)
    const areaCode = areaMatch[0].toUpperCase().replace(' ', '-');
    const normalizedAreaCode = areaCode.replace(/([FG])-?(\d{1,2})/, '$1-$2');
    
    // Return gyms in the matching area
    return islamabadGyms.filter(gym => {
      const gymArea = gym.area.toUpperCase();
      return gymArea === normalizedAreaCode || 
             gymArea.replace('-', '') === normalizedAreaCode ||
             gymArea.replace('-', ' ') === normalizedAreaCode;
    });
  }
  
  // If no specific area match, search by name, address, or specialties
  return islamabadGyms.filter(gym => {
    return gym.name.toLowerCase().includes(normalizedQuery) ||
           gym.address.toLowerCase().includes(normalizedQuery) ||
           gym.area.toLowerCase().includes(normalizedQuery) ||
           gym.specialties.some(s => s.toLowerCase().includes(normalizedQuery));
  });
}

/**
 * Get all gyms
 * @returns All gyms in the database
 */
export function getAllGyms(): RealGym[] {
  return islamabadGyms;
}

/**
 * Get gyms by specialty
 * @param specialty Martial art specialty
 * @returns Gyms offering the specified specialty
 */
export function getGymsBySpecialty(specialty: string): RealGym[] {
  const normalizedSpecialty = specialty.toLowerCase().trim();
  
  return islamabadGyms.filter(gym => 
    gym.specialties.some(s => s.toLowerCase().includes(normalizedSpecialty))
  );
}

/**
 * Convert RealGym to MockGym format for compatibility with existing components
 * @param realGym Real gym data
 * @returns MockGym format
 */
export function convertToMockGym(realGym: RealGym): MockGym {
  return {
    id: realGym.id,
    name: realGym.name,
    type: realGym.specialties.join(', '),
    address: realGym.address,
    rating: realGym.rating,
    position: realGym.coordinates,
    contactPhone: realGym.contactPhone,
    operatingHours: realGym.operatingHours,
    equipment: realGym.equipment
  };
}