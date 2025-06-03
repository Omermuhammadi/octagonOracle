"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Github, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerSections = [
  {
    title: "Product",
    links: [
      { name: "Fight Analysis", href: "/dashboard" },
      { name: "Training Roadmaps", href: "/training" },
      { name: "Form Analysis", href: "/form-analysis" },
      { name: "Gym Finder", href: "/gym-finder" },
      { name: "Self-Defense Guide", href: "/self-defense" },
      { name: "Gear Store", href: "/store" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api-docs" },
      { name: "Tutorials", href: "/tutorials" },
      { name: "Blog", href: "/blog" },
      { name: "Community", href: "/community" },
      { name: "Support", href: "/support" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Partners", href: "/partners" },
      { name: "Contact", href: "/contact" },
      { name: "Investors", href: "/investors" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "DMCA", href: "/dmca" },
      { name: "Licenses", href: "/licenses" },
      { name: "Security", href: "/security" },
    ],
  },
]

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
  { name: "GitHub", icon: Github, href: "https://github.com" },
]

export default function MainFooter() {
  return (
    <footer className="border-t border-[#333333] bg-[#1a1a1a]">
      {/* Main Footer Content */}
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rotate-45 border-2 border-[#00d4ff] opacity-70"></div>
                <div className="absolute inset-0 rotate-[22.5deg] border-2 border-[#d20a11] opacity-70"></div>
              </div>
              <span className="text-xl font-bold text-white">OctagonOracle</span>
            </Link>
            <p className="text-white/70 mb-6 max-w-md">
              AI-powered fight analytics and training platform for MMA and UFC enthusiasts. Elevate your fighting game
              with cutting-edge technology.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="text-white font-medium mb-3">Stay Updated</h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your email"
                  className="bg-[#2a2a2a] border-[#333333] text-white placeholder:text-white/50"
                />
                <Button className="bg-[#d20a11] hover:bg-[#d20a11]/90">Subscribe</Button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@octagonoracle.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-medium mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/70 hover:text-white transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#333333] py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <p className="text-center text-sm text-white/70">
              © {new Date().getFullYear()} OctagonOracle. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
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
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-white/70 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-5 w-5" />
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
