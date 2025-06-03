"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Github, Youtube, Mail, Phone, MapPin, Zap, Heart, Shield, Code } from "lucide-react"
import { PremiumButton } from "@/components/ui/premium-button"
import { PremiumInput } from "@/components/ui/premium-input"
import { TiltCard } from "@/components/ui/tilt-card"
import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "@/lib/animation-utils"

const footerSections = [
  {
    title: "Product",
    links: [
      { name: "Fight Analysis", href: "/dashboard" },
      { name: "Training", href: "/training" },
      { name: "Store", href: "/store" },
      { name: "API", href: "/api" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "Tutorials", href: "/tutorials" },
      { name: "Blog", href: "/blog" },
      { name: "Support", href: "/support" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
      { name: "Press", href: "/press" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Cookies", href: "/cookies" },
      { name: "Security", href: "/security" },
    ],
  },
]

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com", color: "#1877F2" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com", color: "#1DA1F2" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com", color: "#E4405F" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com", color: "#FF0000" },
  { name: "GitHub", icon: Github, href: "https://github.com", color: "#181717" },
]

const features = [
  { name: "Fast Analytics", icon: Zap, description: "Real-time fight predictions" },
  { name: "Secure Platform", icon: Shield, description: "Enterprise-grade security" },
  { name: "Open API", icon: Code, description: "Build custom applications" },
  { name: "Community", icon: Heart, description: "Join the fighters network" },
]

export default function UnifiedFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#0a0a0a] to-black">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />

        {/* Animated Line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-20" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5" 
          style={{ 
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', 
            backgroundSize: '30px 30px' 
          }}
        />
      </div>

      {/* Main Footer Content */}
      <motion.div 
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer(0.1)}
      >
        <div className="grid gap-8 sm:gap-16 md:grid-cols-2 lg:grid-cols-7">
          {/* Brand Section */}
          <motion.div variants={fadeIn("up")} className="md:col-span-2 lg:col-span-3">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <div className="relative h-10 w-10 octagon-border glow-blue">
                <div className="absolute inset-1 octagon bg-gradient-to-br from-cyan-400 to-blue-600"></div>
                <div className="absolute inset-2 octagon bg-gradient-to-br from-red-500 to-pink-600 opacity-70"></div>
                <Zap className="absolute inset-0 m-auto h-5 w-5 text-white z-10" />
              </div>
              <span className="text-2xl font-bold gradient-text-primary tracking-tight">OctagonOracle</span>
            </Link>
            
            <p className="text-white/70 mb-8 max-w-md leading-relaxed">
              AI-powered fight analytics and training platform for MMA and UFC enthusiasts. Elevate your fighting game
              with cutting-edge technology and personalized insights.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <motion.div 
                    key={feature.name}
                    className="flex items-start gap-3 group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="h-10 w-10 rounded-xl glass-strong border border-white/10 flex items-center justify-center group-hover:border-cyan-400/30 group-hover:glow-blue transition-all duration-300">
                      <Icon className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{feature.name}</h4>
                      <p className="text-white/50 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Newsletter Signup */}
            <TiltCard tiltMaxAngleX={5} tiltMaxAngleY={5} className="mb-8">
              <div className="glass-strong p-6 rounded-2xl border border-white/10">
                <h4 className="text-white font-semibold mb-4 text-lg">Stay in the Fight Loop</h4>
                <p className="text-white/70 text-sm mb-4">Get the latest fight predictions and analysis delivered to your inbox.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <PremiumInput
                    placeholder="Enter your email"
                    className="h-12 rounded-xl flex-1"
                    variant="neon"
                  />
                  <PremiumButton className="bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 px-8 h-12 rounded-xl whitespace-nowrap">
                    Subscribe
                  </PremiumButton>
                </div>
              </div>
            </TiltCard>

            {/* Contact Info */}
            <div className="space-y-4 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full glass-strong border border-white/10 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-cyan-400" />
                </div>
                <span>support@octagonoracle.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full glass-strong border border-white/10 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-cyan-400" />
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full glass-strong border border-white/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-cyan-400" />
                </div>
                <span>San Francisco, CA</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          <motion.div variants={fadeIn("up")} className="md:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-white font-semibold mb-6 text-lg relative inline-block">
                  {section.title}
                  <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></div>
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center text-sm leading-relaxed"
                      >
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Footer */}
      <div className="relative z-10 border-t border-white/10 backdrop-blur-sm py-8">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6 text-center md:text-left">
            <p className="text-sm text-white/70">
              © {new Date().getFullYear()} OctagonOracle. All rights reserved.
            </p>
            <div className="flex items-center gap-4 md:gap-6">
              <Link href="/privacy" className="text-sm text-white/70 hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-white/70 hover:text-white">
                Terms
              </Link>
              <Link href="/cookies" className="text-sm text-white/70 hover:text-white">
                Cookies
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  className="group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div 
                    className="h-10 w-10 rounded-xl glass-strong border border-white/10 flex items-center justify-center hover:border-cyan-400/30 hover:glow-blue transition-all duration-300"
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Icon className="h-5 w-5 text-white/70 group-hover:text-cyan-400 transition-colors" />
                  </motion.div>
                  <span className="sr-only">{social.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
