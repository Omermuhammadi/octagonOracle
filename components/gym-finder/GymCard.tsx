"use client";

import { Dumbbell, MapPin, Star, Phone, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface GymCardProps {
  id: string
  name: string
  type: string
  address: string
  rating: number
  distance?: number // Optional distance in km
  contactPhone: string
  operatingHours: string
  equipment: string[]
  onViewOnMap: (id: string) => void
}

export default function GymCard({ 
  id, 
  name, 
  type, 
  address, 
  rating, 
  distance,
  contactPhone,
  operatingHours,
  equipment,
  onViewOnMap 
}: GymCardProps) {
  // Convert rating to stars (1-5)
  const stars = Math.round(rating)
  
  return (
    <Card className="overflow-hidden border-white/10 bg-[#1a1a1a] hover:bg-[#252525] transition-colors">
      <CardContent className="p-0">
        <div className="flex items-start gap-4 p-5">
          <div className="h-12 w-12 rounded-xl bg-[#2a2a2a] flex items-center justify-center flex-shrink-0">
            <Dumbbell className="h-6 w-6 text-red-400" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white truncate mb-1">{name}</h3>
            <p className="text-sm text-white/70 mb-1">{type}</p>
            
            <div className="flex items-center gap-1 mb-2">
              <MapPin className="h-3.5 w-3.5 text-white/50" />
              <p className="text-sm text-white/50 truncate">{address}</p>
            </div>
            
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < stars ? 'text-yellow-500 fill-yellow-500' : 'text-white/20'}`} 
                />
              ))}
              <span className="ml-2 text-sm text-white/70">{rating.toFixed(1)}</span>
            </div>

            {/* Contact Phone */}
            {contactPhone && (
              <div className="flex items-center gap-1.5 mt-2">
                <Phone className="h-3.5 w-3.5 text-white/50 flex-shrink-0" />
                <p className="text-sm text-white/50 truncate">{contactPhone}</p>
              </div>
            )}

            {/* Operating Hours */}
            {operatingHours && (
              <div className="flex items-center gap-1.5 mt-1">
                <Clock className="h-3.5 w-3.5 text-white/50 flex-shrink-0" />
                <p className="text-sm text-white/50 truncate">{operatingHours}</p>
              </div>
            )}

            {/* Equipment */}
            {equipment && equipment.length > 0 && (
              <div className="flex items-start gap-1.5 mt-1">
                <Dumbbell className="h-3.5 w-3.5 text-white/50 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white/50">
                  {equipment.join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t border-white/10 p-3">
          <Button 
            variant="ghost"
            size="sm"
            className="w-full text-red-400 hover:text-red-300 hover:bg-[#2a2a2a]"
            onClick={() => onViewOnMap(id)}
          >
            <MapPin className="h-4 w-4 mr-2" />
            View on Map
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 