"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "@/lib/animation-utils"
import { AnimatedButton } from "@/components/ui/animated-button"
import { TiltCard } from "@/components/ui/tilt-card"
import { FlipCard } from "@/components/ui/flip-card"
import { AnimatedLoader } from "@/components/ui/animated-loader"
import { FighterComparisonCard } from "@/components/ui/fighter-comparison-card"
import { fightersDatabase } from "@/lib/mock-data/fighters"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import PageHeader from "@/components/layout/page-header"
import UnifiedHeader from "@/components/layout/unified-header"
import UnifiedFooter from "@/components/layout/unified-footer"
import { ArrowRight, Zap, Shield, Target, BarChart2, Brain } from "lucide-react"

export default function AnimationsDemo() {
  const [progress, setProgress] = useState(0)
  
  // Animate progress bar on mount
  useState(() => {
    const timer = setTimeout(() => {
      setProgress(100)
    }, 1000)
    return () => clearTimeout(timer)
  })
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <UnifiedHeader />
      
      <main className="container mx-auto py-8 px-4">
        <PageHeader
          title="Animation Components"
          description="Showcase of animation components and effects"
        />
        
        <Tabs defaultValue="buttons" className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="loaders">Loaders</TabsTrigger>
            <TabsTrigger value="fighters">Fighter Cards</TabsTrigger>
            <TabsTrigger value="effects">Micro Effects</TabsTrigger>
          </TabsList>
          
          {/* Buttons Tab */}
          <TabsContent value="buttons" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Animated Buttons</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={staggerContainer(0.1)}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={fadeIn("up")}>
                    <h3 className="text-lg font-medium mb-4">Standard Buttons</h3>
                    <div className="flex flex-wrap gap-4">
                      <AnimatedButton variant="default">Default</AnimatedButton>
                      <AnimatedButton variant="destructive">Destructive</AnimatedButton>
                      <AnimatedButton variant="outline">Outline</AnimatedButton>
                      <AnimatedButton variant="secondary">Secondary</AnimatedButton>
                      <AnimatedButton variant="ghost">Ghost</AnimatedButton>
                      <AnimatedButton variant="link">Link</AnimatedButton>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={fadeIn("up")}>
                    <h3 className="text-lg font-medium mb-4">Premium Buttons</h3>
                    <div className="flex flex-wrap gap-4">
                      <AnimatedButton variant="neon" className="flex items-center">
                        <Zap className="mr-2 h-4 w-4" />
                        Neon
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </AnimatedButton>
                      <AnimatedButton variant="glow" className="flex items-center">
                        <Shield className="mr-2 h-4 w-4" />
                        Glow
                      </AnimatedButton>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={fadeIn("up")}>
                    <h3 className="text-lg font-medium mb-4">Button Sizes</h3>
                    <div className="flex flex-wrap gap-4 items-center">
                      <AnimatedButton variant="default" size="sm">Small</AnimatedButton>
                      <AnimatedButton variant="default" size="default">Default</AnimatedButton>
                      <AnimatedButton variant="default" size="lg">Large</AnimatedButton>
                      <AnimatedButton variant="default" size="icon">
                        <Zap className="h-4 w-4" />
                      </AnimatedButton>
                    </div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Cards Tab */}
          <TabsContent value="cards" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Tilt Cards</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <TiltCard className="w-full h-full" glowColor="blue">
                    <Card className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-xl font-bold mb-2">Tilt Effect</h3>
                        <p className="text-muted-foreground">Hover over this card</p>
                      </div>
                    </Card>
                  </TiltCard>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Flip Cards</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <FlipCard
                    front={
                      <Card className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border-cyan-400/30">
                        <div className="text-center">
                          <h3 className="text-xl font-bold mb-2">Front Side</h3>
                          <p className="text-muted-foreground">Click to flip</p>
                        </div>
                      </Card>
                    }
                    back={
                      <Card className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-500/20 to-pink-600/20 border-red-500/30">
                        <div className="text-center">
                          <h3 className="text-xl font-bold mb-2">Back Side</h3>
                          <p className="text-muted-foreground">Click to flip back</p>
                        </div>
                      </Card>
                    }
                    height="100%"
                    width="100%"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Loaders Tab */}
          <TabsContent value="loaders" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Animated Loaders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <AnimatedLoader type="spinner" color="blue" />
                    <p className="text-sm text-center mt-2">Spinner</p>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <AnimatedLoader type="dots" color="blue" />
                    <p className="text-sm text-center mt-2">Dots</p>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <AnimatedLoader type="pulse" color="red" />
                    <p className="text-sm text-center mt-2">Pulse</p>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <AnimatedLoader type="octagon" color="blue" />
                    <p className="text-sm text-center mt-2">Octagon</p>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-full h-2">
                      <Progress value={progress} className="h-2 w-48" />
                    </div>
                    <p className="text-sm text-center mt-2">Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Fighter Cards Tab */}
          <TabsContent value="fighters" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FighterComparisonCard 
                fighter={fightersDatabase[0]} 
                color="blue" 
                corner="Blue"
                showAdvancedStats={true}
              />
              
              <FighterComparisonCard 
                fighter={fightersDatabase[1]} 
                color="red" 
                corner="Red"
                showAdvancedStats={true}
              />
            </div>
          </TabsContent>
          
          {/* Micro Effects Tab */}
          <TabsContent value="effects" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Floating Elements</CardTitle>
                </CardHeader>
                <CardContent className="h-[200px] flex items-center justify-center">
                  <div className="floating flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-400/30 flex items-center justify-center glow-blue">
                      <Brain className="h-8 w-8 text-cyan-400" />
                    </div>
                    <p className="mt-4 text-sm text-center">Floating animation</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Icon Animations</CardTitle>
                </CardHeader>
                <CardContent className="h-[200px] flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-8">
                    <div className="flex flex-col items-center">
                      <div className="icon-hover-rotate h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-400/30 flex items-center justify-center">
                        <Target className="h-6 w-6 text-cyan-400" />
                      </div>
                      <p className="mt-2 text-xs text-center">Rotate</p>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="icon-hover-bounce h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-400/30 flex items-center justify-center">
                        <BarChart2 className="h-6 w-6 text-cyan-400" />
                      </div>
                      <p className="mt-2 text-xs text-center">Bounce</p>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="icon-hover-glow h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-400/30 flex items-center justify-center">
                        <Shield className="h-6 w-6 text-cyan-400" />
                      </div>
                      <p className="mt-2 text-xs text-center">Glow</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Staggered Animations</CardTitle>
                </CardHeader>
                <CardContent className="h-[200px] flex items-center justify-center">
                  <div className="stagger-container">
                    <div className="flex flex-col gap-2">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div 
                          key={item}
                          className="stagger-item h-8 w-full rounded-md bg-gradient-to-r from-cyan-400/20 to-blue-600/20 border border-cyan-400/30"
                        />
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-center">Hover to trigger</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <UnifiedFooter />
    </div>
  )
} 