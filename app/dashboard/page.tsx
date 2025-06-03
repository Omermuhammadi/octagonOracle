"use client"

import type React from "react"
import { useState, useMemo, useCallback, memo, Suspense } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeftRight,
  BarChart3,
  Brain,
  Search,
  Shield,
  TrendingUp,
  Users,
  Zap,
  Filter,
  ChevronDown,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { EmptyState } from "@/components/ui/empty-state"
import PageContainer from "@/components/layout/page-container"
import Section from "@/components/layout/section"
import LoadingSpinner from "@/components/layout/loading-spinner"
import { DashboardSkeleton, FighterCardSkeleton } from "@/components/layout/loading-states"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useDebounce } from "@/hooks/use-debounce"
import { FighterComparisonCard } from "@/components/ui/fighter-comparison-card"
import { AnimatedLoader } from "@/components/ui/animated-loader"
import { AnimatedButton } from "@/components/ui/animated-button"
import { TiltCard } from "@/components/ui/tilt-card"
import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "@/lib/animation-utils"
import ParallaxHero from "@/components/layout/parallax-hero"

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from "recharts"

// Import mock data
import { fightersDatabase } from "@/lib/mock-data/fighters"

// Weight class options
const weightClasses = [
  "All Classes",
  "Heavyweight",
  "Light Heavyweight",
  "Middleweight",
  "Welterweight",
  "Lightweight",
  "Featherweight",
  "Bantamweight",
  "Flyweight",
  "Women's Featherweight",
  "Women's Bantamweight",
  "Women's Flyweight",
  "Women's Strawweight",
]

// Memoized Fighter Card Component
const FighterCard = memo(function FighterCard({
  fighter,
  color,
  corner,
  showAdvancedStats,
}: {
  fighter: typeof fightersDatabase[0]
  color: string
  corner: string
  showAdvancedStats: boolean
}) {
  return (
    <Card
      className={`border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-${color}/10`}
    >
      <CardHeader className="p-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={fighter.image || "/placeholder.svg"}
              alt={`${fighter.name} profile`}
              className={`h-20 w-20 rounded-2xl border-2 border-${color} object-cover`}
              loading="lazy"
            />
            <div className={`absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-${color} border-2 border-[#1a1a1a]`} />
          </div>
          <div className="flex-1">
            <CardTitle className="text-white text-2xl mb-2">{fighter.name}</CardTitle>
            <CardDescription className="text-white/70 text-lg">"{fighter.nickname}"</CardDescription>
            <div className="flex gap-3 mt-4">
              <Badge variant="outline" className={`border-${color} text-${color} px-3 py-1`}>
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
            <span className="text-white font-semibold">
              <AnimatedCounter value={fighter.winRate} suffix="%" />
            </span>
          </div>
          <Progress value={fighter.winRate} className="h-3 bg-white/10" />
        </div>

        {showAdvancedStats && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="recent-form" className="border-white/10">
              <AccordionTrigger className="text-white hover:no-underline text-base">Recent Form</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {fighter.recentForm.map((fight, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-white/70">{fight.fight}</span>
                      <span
                        className={`font-medium ${
                          fight.result === "W"
                            ? "text-[#00d4ff]"
                            : fight.result === "L"
                              ? "text-[#d20a11]"
                              : "text-white/70"
                        }`}
                      >
                        {fight.result} ({fight.method}, R{fight.round})
                      </span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  )
})

export default function Dashboard() {
  const router = useRouter()
  const { toast } = useToast()

  // State for fighter selection and filtering
  const [selectedFighter1, setSelectedFighter1] = useState(fightersDatabase[0])
  const [selectedFighter2, setSelectedFighter2] = useState(fightersDatabase[1])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedWeightClass, setSelectedWeightClass] = useState("All Classes")
  const [isLoading, setIsLoading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showAdvancedStats, setShowAdvancedStats] = useLocalStorage("showAdvancedStats", false)
  const [confidenceLevel, setConfidenceLevel] = useState(87)
  const [activeTab, setActiveTab] = useState("attributes")
  const [favorites, setFavorites] = useLocalStorage<number[]>("favoriteFighters", [])

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Filter fighters based on search term and weight class
  const filteredFighters = useMemo(() => {
    return fightersDatabase.filter((fighter) => {
      const matchesSearch =
        debouncedSearchTerm === "" ||
        fighter.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        fighter.nickname.toLowerCase().includes(debouncedSearchTerm.toLowerCase())

      const matchesWeightClass = selectedWeightClass === "All Classes" || fighter.weightClass === selectedWeightClass

      return matchesSearch && matchesWeightClass
    })
  }, [debouncedSearchTerm, selectedWeightClass])

  // Handle fighter selection
  const handleSelectFighter = useCallback(
    (fighter: typeof fightersDatabase[0], position: 1 | 2) => {
      if (position === 1) {
        setSelectedFighter1(fighter)
      } else {
        setSelectedFighter2(fighter)
      }
    },
    []
  )

  // Handle fighter swap
  const handleSwapFighters = useCallback(() => {
    setSelectedFighter1(selectedFighter2)
    setSelectedFighter2(selectedFighter1)
  }, [selectedFighter1, selectedFighter2])

  // Toggle favorite status
  const toggleFavorite = useCallback(
    (fighterId: number) => {
      setFavorites((prev) => {
        if (prev.includes(fighterId)) {
          return prev.filter((id) => id !== fighterId)
        } else {
          return [...prev, fighterId]
        }
      })
    },
    [setFavorites]
  )

  // Handle analysis
  const handleAnalyze = useCallback(() => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      toast({
        title: "Analysis Complete",
        description: `${selectedFighter1.name} has a ${confidenceLevel}% chance of winning against ${selectedFighter2.name}.`,
      })
    }, 3000)
  }, [selectedFighter1, selectedFighter2, confidenceLevel, toast])

  // Prepare radar chart data
  const radarData = useMemo(() => {
    if (!selectedFighter1 || !selectedFighter2) return []

    return [
      { attribute: "Striking", [selectedFighter1.name]: selectedFighter1.stats.striking, [selectedFighter2.name]: selectedFighter2.stats.striking },
      { attribute: "Grappling", [selectedFighter1.name]: selectedFighter1.stats.grappling, [selectedFighter2.name]: selectedFighter2.stats.grappling },
      { attribute: "Cardio", [selectedFighter1.name]: selectedFighter1.stats.cardio, [selectedFighter2.name]: selectedFighter2.stats.cardio },
      { attribute: "Power", [selectedFighter1.name]: selectedFighter1.stats.power, [selectedFighter2.name]: selectedFighter2.stats.power },
      { attribute: "Speed", [selectedFighter1.name]: selectedFighter1.stats.speed, [selectedFighter2.name]: selectedFighter2.stats.speed },
      { attribute: "Defense", [selectedFighter1.name]: selectedFighter1.stats.defense, [selectedFighter2.name]: selectedFighter2.stats.defense },
    ]
  }, [selectedFighter1, selectedFighter2])

  return (
    <div>
      <main>
        <Section spacing="lg" background="muted">
          <PageContainer>
            <div className="space-y-12">
              {/* Fighter Selection */}
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                variants={staggerContainer(0.1)}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={fadeIn("right")}>
                  <FighterComparisonCard
                    fighter={selectedFighter1}
                    color="blue"
                    corner="Blue"
                    showAdvancedStats={showAdvancedStats}
                  />
                </motion.div>

                <motion.div 
                  className="flex flex-col items-center justify-center gap-6"
                  variants={fadeIn("up")}
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-600/20 blur-3xl"></div>
                    <AnimatedButton 
                      variant="outline" 
                      size="icon" 
                      className="h-16 w-16 rounded-full border-white/20 relative z-10"
                      onClick={handleSwapFighters}
                    >
                      <ArrowLeftRight className="h-8 w-8 text-white" />
                    </AnimatedButton>
                  </div>

                  <div className="space-y-6 w-full">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Prediction Confidence</span>
                        <span className="text-white font-semibold">{confidenceLevel}%</span>
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1 }}
                      >
                        <Progress value={confidenceLevel} className="h-3 bg-white/10" />
                      </motion.div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <AnimatedButton
                        variant={isAnalyzing ? "outline" : "neon"}
                        className="w-full"
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? (
                          <div className="flex items-center gap-2">
                            <AnimatedLoader type="spinner" size="sm" color="blue" />
                            <span>Analyzing...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4" />
                            <span>Analyze Matchup</span>
                          </div>
                        )}
                      </AnimatedButton>

                      <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                          <Switch
                            id="advanced-stats"
                            checked={showAdvancedStats}
                            onCheckedChange={setShowAdvancedStats}
                          />
                          <Label htmlFor="advanced-stats" className="text-sm text-white/70">
                            Show Advanced Stats
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn("left")}>
                  <FighterComparisonCard
                    fighter={selectedFighter2}
                    color="red"
                    corner="Red"
                    showAdvancedStats={showAdvancedStats}
                  />
                </motion.div>
              </motion.div>

              {/* Stats Comparison */}
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <TiltCard className="col-span-1 lg:col-span-3" glowColor="blue" tiltMaxAngleX={2} tiltMaxAngleY={2}>
                  <Card className="border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">Fighter Comparison</CardTitle>
                      <CardDescription className="text-white/70">
                        Detailed statistical breakdown between {selectedFighter1.name} and {selectedFighter2.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid grid-cols-2 mb-8">
                          <TabsTrigger value="attributes">Attributes</TabsTrigger>
                          <TabsTrigger value="stats">Stats Breakdown</TabsTrigger>
                        </TabsList>
                        <TabsContent value="attributes" className="h-[400px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                              <PolarGrid stroke="rgba(255,255,255,0.1)" />
                              <PolarAngleAxis dataKey="attribute" tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }} />
                              <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: "rgba(255,255,255,0.7)" }} />
                              <Radar
                                name={selectedFighter1.name}
                                dataKey={selectedFighter1.name}
                                stroke="#00d4ff"
                                fill="#00d4ff"
                                fillOpacity={0.3}
                              />
                              <Radar
                                name={selectedFighter2.name}
                                dataKey={selectedFighter2.name}
                                stroke="#d20a11"
                                fill="#d20a11"
                                fillOpacity={0.3}
                              />
                              <RechartsTooltip />
                            </RadarChart>
                          </ResponsiveContainer>
                        </TabsContent>
                        <TabsContent value="stats" className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <h3 className="text-lg font-medium text-white">Physical Comparison</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <div className="text-sm text-white/70 mb-1">Height</div>
                                  <div className="flex justify-between">
                                    <span className="text-cyan-400 font-medium">{selectedFighter1.height}</span>
                                    <span className="text-red-500 font-medium">{selectedFighter2.height}</span>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-white/70 mb-1">Reach</div>
                                  <div className="flex justify-between">
                                    <span className="text-cyan-400 font-medium">{selectedFighter1.reach}</span>
                                    <span className="text-red-500 font-medium">{selectedFighter2.reach}</span>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-white/70 mb-1">Age</div>
                                  <div className="flex justify-between">
                                    <span className="text-cyan-400 font-medium">{selectedFighter1.age}</span>
                                    <span className="text-red-500 font-medium">{selectedFighter2.age}</span>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-white/70 mb-1">Stance</div>
                                  <div className="flex justify-between">
                                    <span className="text-cyan-400 font-medium">{selectedFighter1.stance}</span>
                                    <span className="text-red-500 font-medium">{selectedFighter2.stance}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <h3 className="text-lg font-medium text-white">Win Rate</h3>
                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-cyan-400">{selectedFighter1.name}</span>
                                    <span className="text-white">{selectedFighter1.winRate}%</span>
                                  </div>
                                  <Progress value={selectedFighter1.winRate} className="h-2 bg-white/10" />
                                </div>
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-red-500">{selectedFighter2.name}</span>
                                    <span className="text-white">{selectedFighter2.winRate}%</span>
                                  </div>
                                  <Progress value={selectedFighter2.winRate} className="h-2 bg-white/10" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>

              {/* Fighter Selection */}
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Card className="col-span-1 lg:col-span-3 border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Fighter Database</CardTitle>
                    <CardDescription className="text-white/70">
                      Select fighters to compare or analyze
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                        <Input
                          placeholder="Search fighters..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-[#1a1a1a] border-[#333333] text-white placeholder:text-white/50"
                        />
                      </div>
                      <Select value={selectedWeightClass} onValueChange={setSelectedWeightClass}>
                        <SelectTrigger className="bg-[#1a1a1a] border-[#333333] text-white">
                          <SelectValue placeholder="Weight Class" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#2a2a2a] border-[#333333]">
                          {weightClasses.map((weightClass) => (
                            <SelectItem key={weightClass} value={weightClass} className="text-white hover:bg-[#333333]">
                              {weightClass}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          className="border-[#333333] text-white/70 hover:bg-[#333333] w-full"
                          onClick={() => {
                            setSearchTerm("")
                            setSelectedWeightClass("All Classes")
                          }}
                        >
                          Reset Filters
                        </Button>
                      </div>
                    </div>

                    {filteredFighters.length === 0 ? (
                      <EmptyState
                        icon={<Search className="h-12 w-12 text-white/30" />}
                        title="No fighters found"
                        description="Try adjusting your search or filters"
                      />
                    ) : (
                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        variants={staggerContainer(0.05)}
                        initial="hidden"
                        animate="show"
                      >
                        {filteredFighters.map((fighter) => (
                          <motion.div key={fighter.id} variants={fadeIn("up")}>
                            <Card className="border-white/10 bg-[#1a1a1a] hover:bg-[#222222] transition-colors">
                              <CardHeader className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="relative">
                                      <img
                                        src={fighter.image || "/placeholder.svg"}
                                        alt={fighter.name}
                                        className="h-12 w-12 rounded-lg object-cover"
                                        loading="lazy"
                                      />
                                    </div>
                                    <div>
                                      <CardTitle className="text-white text-lg">{fighter.name}</CardTitle>
                                      <CardDescription className="text-white/70">{fighter.weightClass}</CardDescription>
                                    </div>
                                  </div>
                                  <Badge variant="outline" className="border-white/20 text-white/70">
                                    {fighter.record}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="p-4 pt-0">
                                <div className="flex justify-between gap-2">
                                  <AnimatedButton
                                    variant="outline"
                                    size="sm"
                                    className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 flex-1"
                                    onClick={() => handleSelectFighter(fighter, 1)}
                                  >
                                    Blue Corner
                                  </AnimatedButton>
                                  <AnimatedButton
                                    variant="outline"
                                    size="sm"
                                    className="border-red-500/30 text-red-500 hover:bg-red-500/10 flex-1"
                                    onClick={() => handleSelectFighter(fighter, 2)}
                                  >
                                    Red Corner
                                  </AnimatedButton>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </PageContainer>
        </Section>
      </main>
    </div>
  )
}
