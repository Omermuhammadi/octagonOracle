"use client"

import { memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FlipCard } from "@/components/ui/flip-card"
import { TiltCard } from "@/components/ui/tilt-card"
import { motion } from "framer-motion"
import { fadeIn } from "@/lib/animation-utils"

interface Fighter {
  id: number
  name: string
  nickname: string
  image?: string
  record: string
  weightClass: string
  height: string
  reach: string
  age: number
  stance: string
  winRate: number
  recentForm: Array<{
    fight: string
    result: string
    method: string
    round: number
  }>
  strengths: string[]
  weaknesses: string[]
  stats: {
    striking: number
    grappling: number
    cardio: number
    power: number
    speed: number
    defense: number
  }
}

interface FighterComparisonCardProps {
  fighter: Fighter
  color: "blue" | "red"
  corner: string
  showAdvancedStats?: boolean
  flipEnabled?: boolean
}

const FighterComparisonCard = memo(function FighterComparisonCard({
  fighter,
  color,
  corner,
  showAdvancedStats = false,
  flipEnabled = true,
}: FighterComparisonCardProps) {
  const colorClass = color === "blue" ? "cyan-400" : "red-500"
  
  const frontCard = (
    <Card className={`border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] backdrop-blur-sm transition-all duration-300 h-full`}>
      <CardHeader className="p-8">
        <div className="flex items-center gap-6">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <img
              src={fighter.image || "/placeholder.svg"}
              alt={`${fighter.name} profile`}
              className={`h-20 w-20 rounded-2xl border-2 border-${colorClass} object-cover`}
              loading="lazy"
            />
            <motion.div 
              className={`absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-${colorClass} border-2 border-[#1a1a1a]`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <div className="flex-1">
            <CardTitle className="text-white text-2xl mb-2">{fighter.name}</CardTitle>
            <CardTitle className="text-white/70 text-lg">"{fighter.nickname}"</CardTitle>
            <div className="flex gap-3 mt-4">
              <Badge variant="outline" className={`border-${colorClass} text-${colorClass} px-3 py-1`}>
                {fighter.record}
              </Badge>
              <Badge variant="outline" className="border-white/20 text-white/70 px-3 py-1">
                {fighter.weightClass}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8 pt-0 space-y-6">
        <div className="grid grid-cols-2 gap-6 text-base">
          <div>
            <span className="text-white/70">Height:</span>
            <span className="text-white ml-3 font-medium">{fighter.height}</span>
          </div>
          <div>
            <span className="text-white/70">Reach:</span>
            <span className="text-white ml-3 font-medium">{fighter.reach}</span>
          </div>
          <div>
            <span className="text-white/70">Age:</span>
            <span className="text-white ml-3 font-medium">{fighter.age}</span>
          </div>
          <div>
            <span className="text-white/70">Stance:</span>
            <span className="text-white ml-3 font-medium">{fighter.stance}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-base">
            <span className="text-white/70">Win Rate</span>
            <span className="text-white font-semibold">{fighter.winRate}%</span>
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Progress value={fighter.winRate} className={`h-3 bg-white/10 [&>div]:bg-${colorClass}`} />
          </motion.div>
        </div>

        {showAdvancedStats && (
          <div className="space-y-3 pt-2">
            {fighter.recentForm.slice(0, 3).map((fight, index) => (
              <motion.div 
                key={index} 
                className="flex justify-between text-sm"
                variants={fadeIn("up", index * 0.1)}
                initial="hidden"
                animate="show"
              >
                <span className="text-white/70">{fight.fight}</span>
                <span
                  className={`font-medium ${
                    fight.result === "W"
                      ? "text-cyan-400"
                      : fight.result === "L"
                        ? "text-red-500"
                        : "text-white/70"
                  }`}
                >
                  {fight.result} ({fight.method}, R{fight.round})
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
  
  const backCard = (
    <Card className={`border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] backdrop-blur-sm transition-all duration-300 h-full`}>
      <CardHeader className="p-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-2xl">{fighter.name}</CardTitle>
          <Badge variant="outline" className={`border-${colorClass} text-${colorClass} px-3 py-1`}>
            {corner} Corner
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-8 pt-0 space-y-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-medium mb-2">Strengths</h4>
            <div className="flex flex-wrap gap-2">
              {fighter.strengths.map((strength, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge className={`bg-${colorClass}/20 text-${colorClass} border border-${colorClass}/30`}>
                    {strength}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-2">Weaknesses</h4>
            <div className="flex flex-wrap gap-2">
              {fighter.weaknesses.map((weakness, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Badge className="bg-white/10 text-white/70 border border-white/20">
                    {weakness}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-white font-medium mb-2">Stats</h4>
          {Object.entries(fighter.stats).map(([stat, value], index) => (
            <div key={stat} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-white/70 capitalize">{stat}</span>
                <span className="text-white">{value}/10</span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
              >
                <Progress 
                  value={value * 10} 
                  className={`h-2 bg-white/10 [&>div]:bg-${colorClass}`} 
                />
              </motion.div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
  
  if (!flipEnabled) {
    return frontCard
  }
  
  return (
    <TiltCard
      className="h-full"
      glowColor={color === "blue" ? "blue" : "red"}
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
    >
      <FlipCard
        front={frontCard}
        back={backCard}
        flipOnClick={true}
        flipOnHover={false}
        height="100%"
        width="100%"
        flipDuration={0.6}
      />
    </TiltCard>
  )
})

export { FighterComparisonCard }
export type { Fighter } 