"use client"

import Link from "next/link"
import { ArrowRight, BarChart2, Brain, CheckCircle, Shield, Sparkles, Zap, Trophy, Target, Users } from "lucide-react"
import { PremiumButton } from "@/components/ui/premium-button"
import { PremiumCard } from "@/components/ui/premium-card"
import PageContainer from "@/components/layout/page-container"
import Section from "@/components/layout/section"
import ParticleBackground from "@/components/layout/particle-background"
import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "@/lib/animation-utils"
import { AnimatedButton } from "@/components/ui/animated-button"
import { TiltCard } from "@/components/ui/tilt-card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Enhanced particle background with more particles and glow */}
      <div className="absolute inset-0 overflow-hidden">
        <ParticleBackground particleDensity={1.5} />
        
        {/* Animated gradient blobs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <Section spacing="xl" background="accent">
          <PageContainer>
            <div className="grid gap-20 lg:grid-cols-2 lg:gap-24 items-center">
              <motion.div 
                className="space-y-10"
                initial="hidden"
                animate="show"
                variants={staggerContainer(0.2)}
              >
                {/* Animated badge */}
                <motion.div className="space-y-8" variants={fadeIn("up")}>
                  <motion.div 
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-cyan-400/30 glow-blue"
                    variants={fadeIn("right")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Sparkles className="h-5 w-5 text-cyan-400" />
                    <span className="text-sm font-semibold text-cyan-400 tracking-wide">AI-POWERED ANALYTICS</span>
                  </motion.div>
                  
                  {/* Enhanced 3D headline with floating effect */}
                  <motion.div className="relative">
                    <motion.h1 
                      className="text-hero leading-none text-transparent"
                      style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
                      variants={fadeIn("up", 0.2)}
                    >
                      Master the
                    </motion.h1>
                    <motion.div 
                      className="relative"
                      initial={{ perspective: 1000 }}
                    >
                      <motion.span 
                        className="gradient-text-primary block mt-2 text-hero leading-none"
                        initial={{ opacity: 0, y: 20, rotateX: 30 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          rotateX: 0,
                          textShadow: [
                            "0 0 10px rgba(0, 212, 255, 0.5)",
                            "0 0 20px rgba(0, 212, 255, 0.3)",
                            "0 0 10px rgba(0, 212, 255, 0.5)"
                          ]
                        }}
                        transition={{ 
                          duration: 1.2, 
                          delay: 0.5,
                          ease: [0.25, 1, 0.5, 1]
                        }}
                      >
                        Octagon
                      </motion.span>
                      
                      {/* Floating effect for the main title */}
                      <motion.div
                        className="absolute -inset-x-4 -inset-y-2 border border-cyan-400/20 rounded-3xl -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: 1,
                          y: [0, -5, 0],
                        }}
                        transition={{
                          y: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          opacity: {
                            duration: 0.8,
                            delay: 1
                          }
                        }}
                      />
                    </motion.div>
                  </motion.div>
                  
                  {/* Animated description with typewriter effect */}
                  <motion.p 
                    className="text-body text-white/80 max-w-2xl text-xl leading-relaxed"
                    variants={fadeIn("up", 0.3)}
                  >
                    <motion.span
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 1.2 }}
                      className="inline-block"
                    >
                      Leverage cutting-edge AI to analyze fighting techniques, predict outcomes, and develop personalized
                      training roadmaps that elevate your game to championship level.
                    </motion.span>
                  </motion.p>
                </motion.div>
                
                {/* Enhanced call to action buttons */}
                <motion.div 
                  className="flex flex-col gap-6 sm:flex-row"
                  variants={fadeIn("up", 0.4)}
                >
                  <Link href="/dashboard" className="flex-1 relative group">
                    {/* Button glow effect */}
                    <motion.div 
                      className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                      animate={{
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <AnimatedButton
                      variant="neon"
                      size="lg"
                      className="w-full px-10 py-6 h-16 text-lg rounded-2xl font-bold relative"
                      ripple={true}
                      pressEffect={true}
                      glowOnHover={true}
                    >
                      <div className="flex items-center">
                        <BarChart2 className="mr-3 h-6 w-6" />
                        Start Analyzing
                        <ArrowRight className="ml-3 h-6 w-6" />
                      </div>
                    </AnimatedButton>
                  </Link>
                  <Link href="/training" className="flex-1">
                    <AnimatedButton
                      variant="outline"
                      size="lg"
                      className="w-full px-10 py-6 h-16 text-lg rounded-2xl font-bold border-white/20 text-white"
                      ripple={true}
                      pressEffect={true}
                    >
                      <div className="flex items-center">
                        <Target className="mr-3 h-6 w-6" />
                        View Training
                        <ArrowRight className="ml-3 h-6 w-6" />
                      </div>
                    </AnimatedButton>
                  </Link>
                </motion.div>

                {/* Enhanced 3D Stats with floating animation */}
                <motion.div 
                  className="grid grid-cols-3 gap-8 pt-8"
                  variants={staggerContainer(0.1)}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div 
                    className="text-center relative"
                    variants={fadeIn("up", 0.1)}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-xl -z-10"
                      animate={{ 
                        boxShadow: [
                          "0 0 0 rgba(0, 212, 255, 0)",
                          "0 0 20px rgba(0, 212, 255, 0.3)",
                          "0 0 0 rgba(0, 212, 255, 0)"
                        ]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className="text-4xl font-bold gradient-text-blue mb-2"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.6 }}
                    >
                      10K+
                    </motion.div>
                    <motion.div 
                      className="text-white/70 text-sm tracking-wide"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.7 }}
                    >
                      Fighters Analyzed
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center relative"
                    variants={fadeIn("up", 0.2)}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-600/10 rounded-xl -z-10"
                      animate={{ 
                        boxShadow: [
                          "0 0 0 rgba(239, 68, 68, 0)",
                          "0 0 20px rgba(239, 68, 68, 0.3)",
                          "0 0 0 rgba(239, 68, 68, 0)"
                        ]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3
                      }}
                    />
                    <motion.div 
                      className="text-4xl font-bold gradient-text-red mb-2"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.7 }}
                    >
                      95%
                    </motion.div>
                    <motion.div 
                      className="text-white/70 text-sm tracking-wide"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.8 }}
                    >
                      Prediction Accuracy
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center relative"
                    variants={fadeIn("up", 0.3)}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-amber-600/10 rounded-xl -z-10"
                      animate={{ 
                        boxShadow: [
                          "0 0 0 rgba(250, 204, 21, 0)",
                          "0 0 20px rgba(250, 204, 21, 0.3)",
                          "0 0 0 rgba(250, 204, 21, 0)"
                        ]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.6
                      }}
                    />
                    <motion.div 
                      className="text-4xl font-bold championship-belt mb-2"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.8 }}
                    >
                      24/7
                    </motion.div>
                    <motion.div 
                      className="text-white/70 text-sm tracking-wide"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.9 }}
                    >
                      AI Analysis
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>

              <div className="flex items-center justify-center">
                <div className="relative h-[600px] w-[600px]">
                  {/* Enhanced outer glow ring with more dynamic animation */}
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-600/20 blur-3xl"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.8, 0.3],
                      rotate: 360
                    }}
                    transition={{ 
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  ></motion.div>

                  {/* Enhanced Octagon rings with more layers and effects */}
                  <motion.div
                    className="absolute inset-4 octagon border-2 border-white/5"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  ></motion.div>
                  <motion.div
                    className="absolute inset-8 octagon border-2 border-cyan-400/30 glow-blue"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  ></motion.div>
                  <motion.div
                    className="absolute inset-12 octagon border-[1px] border-white/10"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  ></motion.div>
                  <motion.div
                    className="absolute inset-16 octagon border-2 border-red-500/30 glow-red"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  ></motion.div>
                  <motion.div
                    className="absolute inset-20 octagon border-[1px] border-white/10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                  ></motion.div>

                  {/* Central dashboard mockup with enhanced 3D effects */}
                  <motion.div 
                    className="absolute inset-24 flex items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <TiltCard
                      className="h-full w-full"
                      glowColor="blue"
                      tiltMaxAngleX={15}
                      tiltMaxAngleY={15}
                      perspective={1200}
                      scale={1.05}
                      glowOpacity={0.6}
                    >
                      <PremiumCard variant="neon" glowColor="blue" className="h-full w-full p-8">
                        <div className="h-full w-full rounded-2xl bg-black/50 p-8 relative overflow-hidden backdrop-blur-sm">
                          {/* Enhanced scan lines effect */}
                          <div className="scan-lines absolute inset-0 opacity-30"></div>
                          
                          {/* Animated grid pattern */}
                          <motion.div 
                            className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"
                            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          ></motion.div>

                          {/* Header with floating effect */}
                          <motion.div 
                            className="mb-8 flex items-center justify-between"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <div className="text-sm font-semibold text-cyan-400 tracking-wide">FIGHT ANALYSIS</div>
                            <div className="flex gap-2">
                              <motion.div 
                                className="w-3 h-3 rounded-full bg-green-400 led-indicator"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              ></motion.div>
                              <motion.div 
                                className="w-3 h-3 rounded-full bg-yellow-400 led-indicator"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                              ></motion.div>
                              <motion.div 
                                className="w-3 h-3 rounded-full bg-red-400 led-indicator"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                              ></motion.div>
                            </div>
                          </motion.div>

                          {/* Content bars with enhanced animation */}
                          <div className="space-y-6">
                            <motion.div 
                              className="h-4 w-3/4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 glow-blue relative overflow-hidden"
                              initial={{ width: "0%" }}
                              animate={{ width: "75%" }}
                              transition={{ duration: 1, delay: 0.8 }}
                            >
                              <motion.div 
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                              />
                            </motion.div>
                            
                            <motion.div 
                              className="h-4 w-full rounded-full bg-gradient-to-r from-white/20 to-white/10 relative overflow-hidden"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1, delay: 1 }}
                            >
                              <motion.div 
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, delay: 0.3 }}
                              />
                            </motion.div>
                            
                            <motion.div 
                              className="h-4 w-2/3 rounded-full bg-gradient-to-r from-red-500 to-pink-600 glow-red relative overflow-hidden"
                              initial={{ width: "0%" }}
                              animate={{ width: "66.7%" }}
                              transition={{ duration: 1, delay: 1.2 }}
                            >
                              <motion.div 
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.6 }}
                              />
                            </motion.div>
                          </div>

                          {/* Fighter comparison with enhanced 3D effects */}
                          <div className="mt-12 flex items-center justify-between">
                            <motion.div 
                              className="h-12 w-12 rounded-full bg-gradient-to-br from-red-500 to-pink-600 glow-red flex items-center justify-center z-10"
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                              drag
                              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                            >
                              <Users className="h-6 w-6 text-white" />
                            </motion.div>
                            
                            <motion.div 
                              className="text-3xl font-bold gradient-text-primary relative"
                              animate={{ 
                                scale: [1, 1.2, 1],
                                textShadow: [
                                  "0 0 10px rgba(0, 212, 255, 0.5)",
                                  "0 0 20px rgba(0, 212, 255, 0.8)",
                                  "0 0 10px rgba(0, 212, 255, 0.5)"
                                ]
                              }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity,
                                ease: "easeInOut" 
                              }}
                            >
                              VS
                              
                              {/* Animated sparks */}
                              <motion.div
                                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full"
                                animate={{ y: [0, -20], opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                              >
                                <Zap className="h-4 w-4 text-cyan-400" />
                              </motion.div>
                            </motion.div>
                            
                            <motion.div 
                              className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 glow-blue flex items-center justify-center z-10"
                              whileHover={{ scale: 1.2, rotate: -10 }}
                              whileTap={{ scale: 0.9 }}
                              drag
                              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                            >
                              <Users className="h-6 w-6 text-white" />
                            </motion.div>
                          </div>

                          {/* Stats grid with enhanced 3D interactions */}
                          <motion.div 
                            className="mt-12 grid grid-cols-3 gap-4"
                            variants={staggerContainer(0.1)}
                            initial="hidden"
                            animate="show"
                          >
                            <motion.div 
                              className="h-20 rounded-xl glass border border-cyan-400/30 flex items-center justify-center relative overflow-hidden"
                              variants={fadeIn("up", 0.1)}
                              whileHover={{ 
                                scale: 1.1, 
                                borderColor: "rgba(0, 212, 255, 0.6)",
                                boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)"
                              }}
                            >
                              <motion.div 
                                className="absolute -inset-1 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 blur-md"
                                animate={{ opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              />
                              <Trophy className="h-8 w-8 text-cyan-400" />
                            </motion.div>
                            
                            <motion.div 
                              className="h-20 rounded-xl glass border border-white/20 flex items-center justify-center relative overflow-hidden"
                              variants={fadeIn("up", 0.2)}
                              whileHover={{ 
                                scale: 1.1, 
                                borderColor: "rgba(255, 255, 255, 0.4)",
                                boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)"
                              }}
                            >
                              <motion.div 
                                className="absolute -inset-1 bg-gradient-to-r from-white/5 to-white/10 blur-md"
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                              />
                              <BarChart2 className="h-8 w-8 text-white/70" />
                            </motion.div>
                            
                            <motion.div 
                              className="h-20 rounded-xl glass border border-red-500/30 flex items-center justify-center relative overflow-hidden"
                              variants={fadeIn("up", 0.3)}
                              whileHover={{ 
                                scale: 1.1, 
                                borderColor: "rgba(210, 10, 17, 0.6)",
                                boxShadow: "0 0 20px rgba(210, 10, 17, 0.4)"
                              }}
                            >
                              <motion.div 
                                className="absolute -inset-1 bg-gradient-to-r from-red-500/10 to-pink-600/10 blur-md"
                                animate={{ opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                              />
                              <Zap className="h-8 w-8 text-red-400" />
                            </motion.div>
                          </motion.div>
                        </div>
                      </PremiumCard>
                    </TiltCard>
                  </motion.div>
                </div>
              </div>
            </div>
          </PageContainer>
        </Section>

        {/* Features Section */}
        <Section spacing="lg" background="default">
          <PageContainer>
            <motion.div 
              className="text-center mb-20"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn("up")}
            >
              <motion.div 
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-white/20 mb-8"
                whileHover={{ scale: 1.05 }}
              >
                <Shield className="h-5 w-5 text-white/70" />
                <span className="text-sm font-semibold text-white/70 tracking-wide">FOR EVERY FIGHTER</span>
              </motion.div>
              <motion.h2 
                className="text-display mb-8 gradient-text-primary"
                variants={fadeIn("up", 0.1)}
              >
                Designed for Champions
              </motion.h2>
              <motion.p 
                className="text-body text-white/70 max-w-3xl mx-auto text-xl leading-relaxed"
                variants={fadeIn("up", 0.2)}
              >
                Whether you're a professional fighter or just starting out, OctagonOracle provides the insights you need
                to improve and excel in the octagon.
              </motion.p>
            </motion.div>

            <motion.div 
              className="grid gap-10 md:grid-cols-2"
              variants={staggerContainer(0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={fadeIn("right")}>
                <TiltCard glowColor="blue" perspective={1000}>
                  <PremiumCard variant="neon" glowColor="blue" className="p-10 h-full">
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <motion.div 
                          className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-400/30 flex items-center justify-center glow-blue"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Shield className="h-8 w-8 text-cyan-400" />
                        </motion.div>
                        <div>
                          <h3 className="text-headline text-white mb-2">For Professionals</h3>
                          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"></div>
                        </div>
                      </div>

                      <p className="text-body text-white/80 leading-relaxed">
                        Advanced analytics, opponent breakdowns, and strategic insights to give you the competitive edge in
                        the octagon. Dominate your division with data-driven decisions.
                      </p>

                      <div className="space-y-4">
                        <motion.div 
                          className="flex items-center gap-4 corner-blue p-4 rounded-xl"
                          whileHover={{ x: 5 }}
                        >
                          <CheckCircle className="h-6 w-6 text-cyan-400 flex-shrink-0" />
                          <span className="text-white font-medium">Detailed opponent analysis with AI insights</span>
                        </motion.div>
                        <motion.div 
                          className="flex items-center gap-4 corner-blue p-4 rounded-xl"
                          whileHover={{ x: 5 }}
                        >
                          <CheckCircle className="h-6 w-6 text-cyan-400 flex-shrink-0" />
                          <span className="text-white font-medium">Real-time performance tracking</span>
                        </motion.div>
                        <motion.div 
                          className="flex items-center gap-4 corner-blue p-4 rounded-xl"
                          whileHover={{ x: 5 }}
                        >
                          <CheckCircle className="h-6 w-6 text-cyan-400 flex-shrink-0" />
                          <span className="text-white font-medium">Strategic fight planning tools</span>
                        </motion.div>
                      </div>
                    </div>
                  </PremiumCard>
                </TiltCard>
              </motion.div>
              
              <motion.div variants={fadeIn("left")}>
                <TiltCard glowColor="red" perspective={1000}>
                  <PremiumCard variant="neon" glowColor="red" className="p-10 h-full">
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-pink-600/20 border border-red-500/30 flex items-center justify-center glow-red">
                          <Brain className="h-8 w-8 text-red-400" />
                        </div>
                        <div>
                          <h3 className="text-headline text-white mb-2">For Beginners</h3>
                          <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-pink-600 rounded-full"></div>
                        </div>
                      </div>

                      <p className="text-body text-white/80 leading-relaxed">
                        Learn proper techniques, follow structured training programs, and track your progress over time.
                        Build your foundation with expert guidance and AI-powered feedback.
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center gap-4 corner-red p-4 rounded-xl">
                          <CheckCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                          <span className="text-white font-medium">Technique breakdowns with video analysis</span>
                        </div>
                        <div className="flex items-center gap-4 corner-red p-4 rounded-xl">
                          <CheckCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                          <span className="text-white font-medium">Progressive training plans</span>
                        </div>
                        <div className="flex items-center gap-4 corner-red p-4 rounded-xl">
                          <CheckCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                          <span className="text-white font-medium">AI-powered form correction</span>
                        </div>
                      </div>
                    </div>
                  </PremiumCard>
                </TiltCard>
              </motion.div>
            </motion.div>
          </PageContainer>
        </Section>

        {/* Key Features Section - Enhanced with more 3D effects and emphasis on core modules */}
        <Section spacing="lg" background="muted">
          <PageContainer>
            <motion.div 
              className="text-center mb-24"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn("up")}
            >
              <motion.div 
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-white/20 mb-8"
                whileHover={{ scale: 1.05 }}
                animate={{ boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 15px rgba(255,255,255,0.2)", "0 0 0px rgba(255,255,255,0)"] }}
                transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
              >
                <Zap className="h-5 w-5 text-white/70" />
                <span className="text-sm font-semibold text-white/70 tracking-wide">CUTTING-EDGE TECHNOLOGY</span>
              </motion.div>
              
              <motion.h2 
                className="text-5xl font-bold mb-8 relative inline-block"
                variants={fadeIn("up", 0.1)}
              >
                <span className="gradient-text-primary">Revolutionary</span> <span className="text-white">Features</span>
                <motion.div 
                  className="absolute -bottom-4 left-0 h-1 w-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </motion.h2>
              
              <motion.p 
                className="text-body text-white/70 max-w-3xl mx-auto text-xl leading-relaxed"
                variants={fadeIn("up", 0.2)}
              >
                Advanced AI technology meets combat sports expertise to deliver unprecedented insights
              </motion.p>
            </motion.div>

            {/* Core Features Grid - Highlighting the two main features */}
            <div className="grid gap-8 sm:grid-cols-12 mb-20">
              {/* Fight Predictions - CORE FEATURE 1 */}
              <motion.div 
                className="sm:col-span-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <TiltCard
                  glowColor="blue"
                  perspective={1000}
                  scale={1.02}
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  className="h-full"
                >
                  <PremiumCard variant="neon" glowColor="blue" className="p-0 h-full relative overflow-hidden">
                    {/* Label for core feature */}
                    <div className="absolute top-6 right-6 z-10">
                      <motion.div 
                        className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/40 rounded-full text-xs font-bold text-cyan-400 tracking-wider"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        CORE FEATURE
                      </motion.div>
                    </div>
                    
                    <div className="relative p-10 h-full">
                      {/* Background elements */}
                      <motion.div 
                        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      />
                      
                      <div className="space-y-8 relative z-10">
                        <motion.div 
                          className="h-20 w-20 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-400/30 flex items-center justify-center glow-blue"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          initial={{ scale: 0, rotate: -10 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <BarChart2 className="h-10 w-10 text-cyan-400" />
                        </motion.div>
                        
                        <div>
                          <motion.h3 
                            className="text-2xl font-bold text-white mb-4 flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                          >
                            <span>Fight Predictions</span>
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <Sparkles className="h-5 w-5 text-cyan-400" />
                            </motion.div>
                          </motion.h3>
                          
                          <motion.p 
                            className="text-lg text-white/70 leading-relaxed mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                          >
                            AI-powered analysis of fighting styles, techniques, and historical data to predict fight outcomes with <span className="text-white font-bold">95% accuracy</span>.
                          </motion.p>
                          
                          <motion.div
                            className="space-y-3"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            variants={staggerContainer(0.1)}
                          >
                            <motion.div 
                              className="flex items-center gap-3 p-3 rounded-lg bg-cyan-900/20 border border-cyan-400/20"
                              variants={fadeIn("right", 0.1)}
                              whileHover={{ x: 5, backgroundColor: "rgba(8, 145, 178, 0.2)" }}
                            >
                              <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                              <span className="text-white">Win probability calculations</span>
                            </motion.div>
                            
                            <motion.div 
                              className="flex items-center gap-3 p-3 rounded-lg bg-cyan-900/20 border border-cyan-400/20"
                              variants={fadeIn("right", 0.2)}
                              whileHover={{ x: 5, backgroundColor: "rgba(8, 145, 178, 0.2)" }}
                            >
                              <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                              <span className="text-white">Head-to-head matchup analysis</span>
                            </motion.div>
                            
                            <motion.div 
                              className="flex items-center gap-3 p-3 rounded-lg bg-cyan-900/20 border border-cyan-400/20"
                              variants={fadeIn("right", 0.3)}
                              whileHover={{ x: 5, backgroundColor: "rgba(8, 145, 178, 0.2)" }}
                            >
                              <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                              <span className="text-white">Pre-fight strategic insights</span>
                            </motion.div>
                          </motion.div>
                          
                          <motion.div 
                            className="mt-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                          >
                            <Link
                              href="/dashboard"
                              className="relative group inline-flex items-center"
                            >
                              <motion.span 
                                className="absolute -inset-1 rounded-lg bg-gradient-to-r from-cyan-400/20 to-blue-600/20 blur-md opacity-0 group-hover:opacity-100"
                                transition={{ duration: 0.2 }}
                              />
                              <span className="relative text-lg font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center group">
                                Explore Predictions
                                <motion.div
                                  className="ml-2"
                                  animate={{ x: [0, 4, 0] }}
                                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                                >
                                  <ArrowRight className="h-5 w-5" />
                                </motion.div>
                              </span>
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </PremiumCard>
                </TiltCard>
              </motion.div>

              {/* Form Analysis - CORE FEATURE 2 */}
              <motion.div 
                className="sm:col-span-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <TiltCard
                  glowColor="purple"
                  perspective={1000}
                  scale={1.02}
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  className="h-full"
                >
                  <PremiumCard variant="neon" glowColor="purple" className="p-0 h-full relative overflow-hidden">
                    {/* Label for core feature */}
                    <div className="absolute top-6 right-6 z-10">
                      <motion.div 
                        className="px-3 py-1 bg-purple-500/20 border border-purple-400/40 rounded-full text-xs font-bold text-purple-400 tracking-wider"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        CORE FEATURE
                      </motion.div>
                    </div>
                    
                    <div className="relative p-10 h-full">
                      {/* Background elements */}
                      <motion.div 
                        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-400/10 blur-3xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      />
                      
                      <div className="space-y-8 relative z-10">
                        <motion.div 
                          className="h-20 w-20 rounded-2xl bg-gradient-to-br from-purple-400/20 to-pink-500/20 border border-purple-400/30 flex items-center justify-center glow-purple"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          initial={{ scale: 0, rotate: -10 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <Zap className="h-10 w-10 text-purple-400" />
                        </motion.div>
                        
                        <div>
                          <motion.h3 
                            className="text-2xl font-bold text-white mb-4 flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                          >
                            <span>Form Analysis</span>
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <Sparkles className="h-5 w-5 text-purple-400" />
                            </motion.div>
                          </motion.h3>
                          
                          <motion.p 
                            className="text-lg text-white/70 leading-relaxed mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                          >
                            Upload videos of your technique and receive <span className="text-white font-bold">AI-powered feedback</span> and correction suggestions in real-time.
                          </motion.p>
                          
                          <motion.div
                            className="space-y-3"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            variants={staggerContainer(0.1)}
                          >
                            <motion.div 
                              className="flex items-center gap-3 p-3 rounded-lg bg-purple-900/20 border border-purple-400/20"
                              variants={fadeIn("right", 0.1)}
                              whileHover={{ x: 5, backgroundColor: "rgba(147, 51, 234, 0.2)" }}
                            >
                              <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0" />
                              <span className="text-white">Real-time technique analysis</span>
                            </motion.div>
                            
                            <motion.div 
                              className="flex items-center gap-3 p-3 rounded-lg bg-purple-900/20 border border-purple-400/20"
                              variants={fadeIn("right", 0.2)}
                              whileHover={{ x: 5, backgroundColor: "rgba(147, 51, 234, 0.2)" }}
                            >
                              <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0" />
                              <span className="text-white">Stance and movement corrections</span>
                            </motion.div>
                            
                            <motion.div 
                              className="flex items-center gap-3 p-3 rounded-lg bg-purple-900/20 border border-purple-400/20"
                              variants={fadeIn("right", 0.3)}
                              whileHover={{ x: 5, backgroundColor: "rgba(147, 51, 234, 0.2)" }}
                            >
                              <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0" />
                              <span className="text-white">Personalized improvement tips</span>
                            </motion.div>
                          </motion.div>
                          
                          <motion.div 
                            className="mt-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                          >
                            <Link
                              href="/form-analysis"
                              className="relative group inline-flex items-center"
                            >
                              <motion.span 
                                className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-400/20 to-pink-500/20 blur-md opacity-0 group-hover:opacity-100"
                                transition={{ duration: 0.2 }}
                              />
                              <span className="relative text-lg font-semibold text-purple-400 hover:text-purple-300 inline-flex items-center group">
                                Analyze Form
                                <motion.div
                                  className="ml-2"
                                  animate={{ x: [0, 4, 0] }}
                                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                                >
                                  <ArrowRight className="h-5 w-5" />
                                </motion.div>
                              </span>
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </PremiumCard>
                </TiltCard>
              </motion.div>
            </div>

            {/* Secondary feature */}
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <TiltCard
                glowColor="red"
                perspective={1000}
                scale={1.01}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                className="h-full"
              >
                <PremiumCard variant="holographic" className="p-8 group">
                  <div className="space-y-6">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-pink-600/20 border border-red-500/30 flex items-center justify-center glow-red group-hover:scale-110 transition-transform duration-300">
                      <Brain className="h-8 w-8 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-title text-white mb-3">Training Roadmaps</h3>
                      <p className="text-body text-white/70 leading-relaxed mb-6">
                        Personalized training programs based on your goals, experience, and fighting style preferences.
                      </p>
                      <Link
                        href="/training"
                        className="text-sm font-semibold text-red-400 hover:text-red-300 inline-flex items-center group"
                      >
                        Start Training
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </PremiumCard>
              </TiltCard>
            </motion.div>
          </PageContainer>
        </Section>

        {/* CTA Section */}
        <Section spacing="lg" background="accent">
          <PageContainer>
            <div className="text-center space-y-10">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-cyan-400/30 glow-blue mb-8">
                <Trophy className="h-5 w-5 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-400 tracking-wide">JOIN THE ELITE</span>
              </div>

              <h2 className="text-display gradient-text-primary mb-8">Ready to Transform Your Fighting Game?</h2>

              <p className="text-body text-white/80 max-w-3xl mx-auto text-xl leading-relaxed mb-12">
                Join thousands of fighters who are using OctagonOracle to reach their full potential and dominate in the
                octagon.
              </p>

              <div className="flex flex-col gap-6 sm:flex-row justify-center items-center">
                <PremiumButton
                  variant="neon"
                  glowColor="blue"
                  size="lg"
                  className="px-12 py-6 h-16 text-lg rounded-2xl font-bold"
                  asChild
                >
                  <Link href="/dashboard">
                    <Sparkles className="mr-3 h-6 w-6" />
                    Get Started Free
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Link>
                </PremiumButton>

                <PremiumButton variant="glass" size="lg" className="px-12 py-6 h-16 text-lg rounded-2xl font-bold">
                  <BarChart2 className="mr-3 h-6 w-6" />
                  View Demo
                </PremiumButton>
              </div>

              {/* Trust indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 mt-16 border-t border-white/10">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-4 glow-white">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Free Trial</h4>
                  <p className="text-white/70 text-sm">No credit card required</p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center mx-auto mb-4 glow-blue">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Secure & Private</h4>
                  <p className="text-white/70 text-sm">Your data is protected</p>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center mx-auto mb-4 glow-white">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Expert Support</h4>
                  <p className="text-white/70 text-sm">24/7 assistance available</p>
                </div>
              </div>
            </div>
          </PageContainer>
        </Section>
      </main>
    </div>
  )
}
