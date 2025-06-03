"use client"

import { useState } from "react"
import { HelpCircle, MessageSquare, Book, Video, Mail, Phone, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const faqItems = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I create my first training plan?",
        a: "Navigate to the Training Roadmaps section and select your age group and goals. Our AI will create a personalized plan for you.",
      },
      {
        q: "What equipment do I need to get started?",
        a: "For beginners, we recommend starting with basic gloves and comfortable workout clothes. Check our Gear Store for beginner-friendly equipment.",
      },
      {
        q: "How accurate are the fight predictions?",
        a: "Our AI analyzes multiple factors including fighter stats, recent performance, and fighting styles. Accuracy varies but typically ranges from 65-80%.",
      },
    ],
  },
  {
    category: "Training",
    questions: [
      {
        q: "How often should I train?",
        a: "For beginners, we recommend 3-4 sessions per week. Your personalized plan will adjust based on your progress and goals.",
      },
      {
        q: "Can I modify my training plan?",
        a: "Yes! You can adjust your training plan at any time based on your progress, schedule, or changing goals.",
      },
      {
        q: "What if I miss a training session?",
        a: "Don't worry! Your plan will automatically adjust. Consistency is more important than perfection.",
      },
    ],
  },
  {
    category: "Technical",
    questions: [
      {
        q: "What video formats are supported for form analysis?",
        a: "We support MP4, MOV, and AVI formats. Videos should be 10-30 seconds long and filmed from the side for best results.",
      },
      {
        q: "How do I reset my password?",
        a: "Click 'Forgot Password' on the login page, enter your email, and follow the instructions sent to your inbox.",
      },
      {
        q: "Can I use OctagonOracle on mobile?",
        a: "Yes! Our platform is fully responsive and works great on mobile devices. We also have dedicated mobile apps coming soon.",
      },
    ],
  },
]

const tutorials = [
  {
    title: "Getting Started with OctagonOracle",
    description: "Complete walkthrough of the platform features",
    duration: "8 min",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    title: "Creating Your First Training Plan",
    description: "Step-by-step guide to personalized training",
    duration: "5 min",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    title: "Using the Fight Prediction Dashboard",
    description: "How to analyze fights and make predictions",
    duration: "6 min",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    title: "Form Analysis Tutorial",
    description: "Upload videos and get AI feedback",
    duration: "4 min",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
]

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredFAQ = faqItems.filter((category) => {
    if (selectedCategory !== "all" && category.category !== selectedCategory) return false
    if (searchTerm) {
      return category.questions.some(
        (q) =>
          q.q.toLowerCase().includes(searchTerm.toLowerCase()) || q.a.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    return true
  })

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Help & Support</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Find answers to your questions or get in touch with our support team
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-[#00d4ff]" />
              <h3 className="text-white font-semibold mb-2">Live Chat</h3>
              <p className="text-white/70 text-sm mb-4">Get instant help from our support team</p>
              <Button className="bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-black">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6 text-center">
              <Mail className="h-12 w-12 mx-auto mb-4 text-[#d20a11]" />
              <h3 className="text-white font-semibold mb-2">Email Support</h3>
              <p className="text-white/70 text-sm mb-4">Send us a detailed message</p>
              <Button variant="outline" className="border-[#d20a11] text-[#d20a11] hover:bg-[#d20a11]/10">
                Send Email
              </Button>
            </CardContent>
          </Card>

          <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="p-6 text-center">
              <Phone className="h-12 w-12 mx-auto mb-4 text-[#00d4ff]" />
              <h3 className="text-white font-semibold mb-2">Phone Support</h3>
              <p className="text-white/70 text-sm mb-4">Call us during business hours</p>
              <Button variant="outline" className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10">
                Call Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="bg-[#2a2a2a] border-[#333333] grid grid-cols-4">
            <TabsTrigger value="faq" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
              FAQ
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
              Tutorials
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
              Contact Us
            </TabsTrigger>
            <TabsTrigger
              value="documentation"
              className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black"
            >
              Documentation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-6">
            {/* Search and Filter */}
            <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                    <Input
                      placeholder="Search FAQ..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-[#1a1a1a] border-[#333333] text-white placeholder:text-white/50"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48 bg-[#1a1a1a] border-[#333333] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2a2a2a] border-[#333333]">
                      <SelectItem value="all" className="text-white hover:bg-[#333333]">
                        All Categories
                      </SelectItem>
                      <SelectItem value="Getting Started" className="text-white hover:bg-[#333333]">
                        Getting Started
                      </SelectItem>
                      <SelectItem value="Training" className="text-white hover:bg-[#333333]">
                        Training
                      </SelectItem>
                      <SelectItem value="Technical" className="text-white hover:bg-[#333333]">
                        Technical
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Items */}
            <div className="space-y-6">
              {filteredFAQ.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-[#00d4ff]" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.questions
                      .filter((q) => {
                        if (!searchTerm) return true
                        return (
                          q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          q.a.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                      })
                      .map((item, index) => (
                        <div key={index} className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                          <h4 className="text-white font-medium mb-2">{item.q}</h4>
                          <p className="text-white/70 text-sm">{item.a}</p>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorials.map((tutorial, index) => (
                <Card
                  key={index}
                  className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm hover:shadow-lg transition-all"
                >
                  <CardContent className="p-6">
                    <div className="aspect-video bg-[#1a1a1a] rounded-lg border border-[#333333] mb-4 overflow-hidden">
                      <img
                        src={tutorial.thumbnail || "/placeholder.svg"}
                        alt={tutorial.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{tutorial.title}</h3>
                    <p className="text-white/70 text-sm mb-3">{tutorial.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-sm">{tutorial.duration}</span>
                      <Button size="sm" className="bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-black">
                        <Video className="mr-2 h-4 w-4" />
                        Watch
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Form */}
              <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Send us a Message</CardTitle>
                  <CardDescription className="text-white/70">We'll get back to you within 24 hours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="First Name"
                      className="bg-[#1a1a1a] border-[#333333] text-white placeholder:text-white/50"
                    />
                    <Input
                      placeholder="Last Name"
                      className="bg-[#1a1a1a] border-[#333333] text-white placeholder:text-white/50"
                    />
                  </div>
                  <Input
                    placeholder="Email Address"
                    type="email"
                    className="bg-[#1a1a1a] border-[#333333] text-white placeholder:text-white/50"
                  />
                  <Select>
                    <SelectTrigger className="bg-[#1a1a1a] border-[#333333] text-white">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2a2a2a] border-[#333333]">
                      <SelectItem value="technical" className="text-white hover:bg-[#333333]">
                        Technical Issue
                      </SelectItem>
                      <SelectItem value="billing" className="text-white hover:bg-[#333333]">
                        Billing Question
                      </SelectItem>
                      <SelectItem value="feature" className="text-white hover:bg-[#333333]">
                        Feature Request
                      </SelectItem>
                      <SelectItem value="other" className="text-white hover:bg-[#333333]">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea
                    placeholder="Describe your question or issue..."
                    rows={4}
                    className="bg-[#1a1a1a] border-[#333333] text-white placeholder:text-white/50"
                  />
                  <Button className="w-full bg-[#d20a11] hover:bg-[#d20a11]/90">Send Message</Button>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Contact Information</CardTitle>
                  <CardDescription className="text-white/70">Multiple ways to reach our support team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#00d4ff]/20 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-[#00d4ff]" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Email Support</h4>
                      <p className="text-white/70 text-sm">support@octagonoracle.com</p>
                      <p className="text-white/50 text-xs">Response within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#d20a11]/20 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-[#d20a11]" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Phone Support</h4>
                      <p className="text-white/70 text-sm">+1 (555) 123-4567</p>
                      <p className="text-white/50 text-xs">Mon-Fri 9AM-6PM EST</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#00d4ff]/20 flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-[#00d4ff]" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Live Chat</h4>
                      <p className="text-white/70 text-sm">Available 24/7</p>
                      <p className="text-white/50 text-xs">Instant responses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6">
                  <Book className="h-12 w-12 mb-4 text-[#00d4ff]" />
                  <h3 className="text-white font-semibold mb-2">API Documentation</h3>
                  <p className="text-white/70 text-sm mb-4">Complete API reference and integration guides</p>
                  <Button variant="outline" className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10">
                    View Docs
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6">
                  <HelpCircle className="h-12 w-12 mb-4 text-[#d20a11]" />
                  <h3 className="text-white font-semibold mb-2">User Guide</h3>
                  <p className="text-white/70 text-sm mb-4">Comprehensive guide to using all features</p>
                  <Button variant="outline" className="border-[#d20a11] text-[#d20a11] hover:bg-[#d20a11]/10">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6">
                  <Video className="h-12 w-12 mb-4 text-[#00d4ff]" />
                  <h3 className="text-white font-semibold mb-2">Video Tutorials</h3>
                  <p className="text-white/70 text-sm mb-4">Step-by-step video walkthroughs</p>
                  <Button variant="outline" className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10">
                    Watch Videos
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
