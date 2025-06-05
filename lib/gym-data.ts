// Gym template data for generating mock gyms

export interface GymTemplate {
  name: string;
  type: string;
  address: string;
  rating: number;
}

export const gymTemplates: GymTemplate[] = [
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