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
      <ParticleBackground />

      <main>
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
                  <motion.h1 className="text-hero leading-none" variants={fadeIn("up", 0.2)}>
                    Master the
                    <motion.span 
                      className="gradient-text-primary block mt-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.5,
                        ease: [0.25, 1, 0.5, 1]
                      }}
                    >
                      Octagon
                    </motion.span>
                  </motion.h1>
                  <motion.p 
                    className="text-body text-white/80 max-w-2xl text-xl leading-relaxed"
                    variants={fadeIn("up", 0.3)}
                  >
                    Leverage cutting-edge AI to analyze fighting techniques, predict outcomes, and develop personalized
                    training roadmaps that elevate your game to championship level.
                  </motion.p>
                </motion.div>
                <motion.div 
                  className="flex flex-col gap-6 sm:flex-row"
                  variants={fadeIn("up", 0.4)}
                >
                  <Link href="/dashboard" className="flex-1">
                    <AnimatedButton
                      variant="neon"
                      size="lg"
                      className="w-full px-10 py-6 h-16 text-lg rounded-2xl font-bold"
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

                {/* Stats */}
                <motion.div 
                  className="grid grid-cols-3 gap-8 pt-8"
                  variants={staggerContainer(0.1)}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div className="text-center" variants={fadeIn("up", 0.1)}>
                    <motion.div 
                      className="text-3xl font-bold gradient-text-blue mb-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      10K+
                    </motion.div>
                    <div className="text-white/70 text-sm tracking-wide">Fighters Analyzed</div>
                  </motion.div>
                  <motion.div className="text-center" variants={fadeIn("up", 0.2)}>
                    <motion.div 
                      className="text-3xl font-bold gradient-text-red mb-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                      95%
                    </motion.div>
                    <div className="text-white/70 text-sm tracking-wide">Prediction Accuracy</div>
                  </motion.div>
                  <motion.div className="text-center" variants={fadeIn("up", 0.3)}>
                    <motion.div 
                      className="text-3xl font-bold championship-belt mb-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      24/7
                    </motion.div>
                    <div className="text-white/70 text-sm tracking-wide">AI Analysis</div>
                  </motion.div>
                </motion.div>
              </motion.div>

              <div className="flex items-center justify-center">
                <div className="relative h-[600px] w-[600px]">
                  {/* Outer glow ring */}
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-600/20 blur-3xl"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  ></motion.div>

                  {/* Octagon rings */}
                  <motion.div
                    className="absolute inset-8 octagon border-2 border-cyan-400/30 glow-blue"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  ></motion.div>
                  <motion.div
                    className="absolute inset-16 octagon border-2 border-red-500/30 glow-red"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  ></motion.div>

                  {/* Central dashboard mockup */}
                  <motion.div 
                    className="absolute inset-20 flex items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <TiltCard
                      className="h-full w-full"
                      glowColor="blue"
                      tiltMaxAngleX={10}
                      tiltMaxAngleY={10}
                      perspective={1000}
                      scale={1.02}
                    >
                      <PremiumCard variant="neon" glowColor="blue" className="h-full w-full p-8">
                        <div className="h-full w-full rounded-2xl bg-black/50 p-8 relative overflow-hidden">
                          {/* Scan lines */}
                          <div className="scan-lines absolute inset-0"></div>

                          {/* Header */}
                          <div className="mb-8 flex items-center justify-between">
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
                          </div>

                          {/* Content bars */}
                          <div className="space-y-6">
                            <motion.div 
                              className="h-4 w-3/4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 glow-blue"
                              initial={{ width: "0%" }}
                              animate={{ width: "75%" }}
                              transition={{ duration: 1, delay: 0.8 }}
                            ></motion.div>
                            <motion.div 
                              className="h-4 w-full rounded-full bg-gradient-to-r from-white/20 to-white/10"
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1, delay: 1 }}
                            ></motion.div>
                            <motion.div 
                              className="h-4 w-2/3 rounded-full bg-gradient-to-r from-red-500 to-pink-600 glow-red"
                              initial={{ width: "0%" }}
                              animate={{ width: "66.7%" }}
                              transition={{ duration: 1, delay: 1.2 }}
                            ></motion.div>
                          </div>

                          {/* Fighter comparison */}
                          <div className="mt-12 flex items-center justify-between">
                            <motion.div 
                              className="h-12 w-12 rounded-full bg-gradient-to-br from-red-500 to-pink-600 glow-red flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Users className="h-6 w-6 text-white" />
                            </motion.div>
                            <motion.div 
                              className="text-2xl font-bold gradient-text-primary"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              VS
                            </motion.div>
                            <motion.div 
                              className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 glow-blue flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Users className="h-6 w-6 text-white" />
                            </motion.div>
                          </div>

                          {/* Stats grid */}
                          <motion.div 
                            className="mt-12 grid grid-cols-3 gap-4"
                            variants={staggerContainer(0.1)}
                            initial="hidden"
                            animate="show"
                          >
                            <motion.div 
                              className="h-20 rounded-xl glass border border-cyan-400/30 flex items-center justify-center"
                              variants={fadeIn("up", 0.1)}
                              whileHover={{ scale: 1.05, borderColor: "rgba(0, 212, 255, 0.6)" }}
                            >
                              <Trophy className="h-8 w-8 text-cyan-400" />
                            </motion.div>
                            <motion.div 
                              className="h-20 rounded-xl glass border border-white/20 flex items-center justify-center"
                              variants={fadeIn("up", 0.2)}
                              whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.4)" }}
                            >
                              <BarChart2 className="h-8 w-8 text-white/70" />
                            </motion.div>
                            <motion.div 
                              className="h-20 rounded-xl glass border border-red-500/30 flex items-center justify-center"
                              variants={fadeIn("up", 0.3)}
                              whileHover={{ scale: 1.05, borderColor: "rgba(210, 10, 17, 0.6)" }}
                            >
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

        {/* Key Features Section */}
        <Section spacing="lg" background="muted">
          <PageContainer>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-white/20 mb-8">
                <Zap className="h-5 w-5 text-white/70" />
                <span className="text-sm font-semibold text-white/70 tracking-wide">CUTTING-EDGE TECHNOLOGY</span>
              </div>
              <h2 className="text-display mb-8 gradient-text-primary">Revolutionary Features</h2>
              <p className="text-body text-white/70 max-w-3xl mx-auto text-xl leading-relaxed">
                Advanced AI technology meets combat sports expertise to deliver unprecedented insights
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <PremiumCard variant="holographic" className="p-8 group">
                <div className="space-y-6">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-400/30 flex items-center justify-center glow-blue group-hover:scale-110 transition-transform duration-300">
                    <BarChart2 className="h-8 w-8 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-title text-white mb-3">Fight Predictions</h3>
                    <p className="text-body text-white/70 leading-relaxed mb-6">
                      AI-powered analysis of fighting styles and historical data to predict fight outcomes with 95%
                      accuracy.
                    </p>
                    <Link
                      href="/dashboard"
                      className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center group"
                    >
                      Explore Predictions
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </PremiumCard>

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

              <PremiumCard variant="holographic" className="p-8 group sm:col-span-2 lg:col-span-1">
                <div className="space-y-6">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30 flex items-center justify-center glow-white group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-title text-white mb-3">Form Analysis</h3>
                    <p className="text-body text-white/70 leading-relaxed mb-6">
                      Upload videos of your technique and receive AI-powered feedback and correction suggestions in
                      real-time.
                    </p>
                    <Link
                      href="/form-analysis"
                      className="text-sm font-semibold text-purple-400 hover:text-purple-300 inline-flex items-center group"
                    >
                      Analyze Form
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </PremiumCard>
            </div>
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
