"use client"

/// <reference types="react" />
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  User, Users, Shield, Calendar, BookOpen, Home, Play, 
  AlertTriangle, Phone, MapPin, Heart, Clock 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type AgeGroup = {
  key: string;
  label: string;
  icon: React.ReactNode;
};

type Scenario = {
  key: string;
  label: string;
};

type SafetyTip = {
  category: string;
  icon: string;
  tips: string[];
};

type Technique = {
  name: string;
  difficulty: string;
  description: string;
  steps: string[];
  videoId: string;
  duration?: string; // Added duration as optional
};

// Age Groups and Scenarios
const AGE_GROUPS = [
  { key: "kids", label: "Kids", icon: <User className="w-4 h-4 mr-1" /> },
  { key: "teens", label: "Teens", icon: <Users className="w-4 h-4 mr-1" /> },
  { key: "adults", label: "Adults", icon: <Shield className="w-4 h-4 mr-1" /> },
  { key: "seniors", label: "Seniors", icon: <Calendar className="w-4 h-4 mr-1" /> },
]

const SCENARIOS = [
  { key: "street", label: "Street Harassment" },
  { key: "domestic", label: "Domestic Abuse" },
  { key: "bullying", label: "Bullying" },
  { key: "workplace", label: "Workplace Safety" },
  { key: "online", label: "Online Threats" },
]

const emergencyContacts = [
  { name: "Emergency Services", number: "911", description: "Police, Fire, Medical" },
  { name: "National Domestic Violence Hotline", number: "1-800-799-7233", description: "24/7 confidential support" },
  {
    name: "RAINN National Sexual Assault Hotline",
    number: "1-800-656-4673",
    description: "24/7 support and resources",
  },
  { name: "Crisis Text Line", number: "Text HOME to 741741", description: "24/7 crisis support via text" },
];

const safetyTips = [
  {
    category: "Awareness",
    icon: "👀",
    tips: [
      "Stay alert and aware of your surroundings",
      "Avoid distractions like phones when walking alone",
      "Trust your instincts - if something feels wrong, it probably is"
    ]
  },
  {
    category: "Prevention",
    icon: "🚫",
    tips: [
      "Keep doors and windows locked",
      "Vary your routine and be unpredictable",
      "Park in well-lit areas"
    ]
  },
  {
    category: "De-escalation",
    icon: "🕊️",
    tips: [
      "Use confident body language",
      "Set clear boundaries",
      "Use a calm but firm voice"
    ]
  }
];

const techniques = [
  {
    name: "Wrist Release",
    difficulty: "Beginner",
    description: "Basic technique to escape from wrist grabs",
    steps: [
      "Twist your wrist toward their thumb",
      "Use your body weight to pull away",
      "Create distance and escape"
    ],
    videoId: "wrist-release",
    duration: "3 min" // Added duration
  },
  {
    name: "Bear Hug Defense",
    difficulty: "Intermediate",
    description: "Escape from rear bear hug attacks",
    steps: [
      "Lower your center of gravity",
      "Step on attacker's foot",
      "Use elbows to strike"
    ],
    videoId: "bear-hug",
    duration: "5 min" // Added duration
  }
];

export default function SelfDefensePage() {
  const [selectedTechnique, setSelectedTechnique] = useState(techniques[0]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(AGE_GROUPS[0].key);
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0].key);
  const [ageGroup, setAgeGroup] = useState("adults")
  const [scenario, setScenario] = useState("street")

  // Sidebar navigation (dummy for now)
  const sidebarLinks = [
    { label: "Overview", section: "overview", icon: <Home className="w-4 h-4" /> },
    { label: "Age Groups", section: "age-groups", icon: <Users className="w-4 h-4" /> },
    { label: "Scenarios", section: "scenarios", icon: <BookOpen className="w-4 h-4" /> },
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white">
      {/* Main Content */}
      {/* Hero Section */}
      <section className="w-full px-4 md:px-0 max-w-4xl mx-auto pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-fuchsia-400 via-sky-400 to-emerald-400 text-transparent bg-clip-text">
              Women's Self-Defense Mastery
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-6">
              Learn practical, science-backed self-defense for every age, scenario, and skill level. Interactive. Empowering. Built for real life.
            </p>
            <div className="flex justify-center">
              <Badge className="bg-[#d20a11]/20 text-[#d20a11] border border-[#d20a11]/30">
                <Heart className="h-3 w-3 mr-1" />
                Women-Focused Content
              </Badge>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Emergency Alert */}
        <Card className="border-[#d20a11]/30 bg-[#d20a11]/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#d20a11]" />
              Emergency? Get Help Now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="bg-[#d20a11] hover:bg-[#d20a11]/90 text-white h-12">
                <Phone className="mr-2 h-5 w-5" />
                Call 911
              </Button>
              <Button variant="outline" className="border-[#d20a11] text-[#d20a11] hover:bg-[#d20a11]/10 h-12">
                <MapPin className="mr-2 h-5 w-5" />
                Share Location
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="safety" className="space-y-6">
          <TabsList className="bg-[#2a2a2a] border-[#333333] grid grid-cols-4">
            <TabsTrigger value="safety" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
              Safety Tips
            </TabsTrigger>
            <TabsTrigger value="techniques" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
              Techniques
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
              Scenarios
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
              Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="safety" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {safetyTips.map((category, index) => (
                <Card key={index} className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <span className="text-2xl">{category.icon}</span>
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-white/70 text-sm flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#00d4ff] mt-2 flex-shrink-0"></div>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="techniques" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Technique List */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Basic Techniques</h3>
                {techniques.map((technique, index) => (
                  <Card
                    key={index}
                    className={`border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm cursor-pointer transition-all ${
                      selectedTechnique.name === technique.name ? "ring-2 ring-[#00d4ff]" : ""
                    }`}
                    onClick={() => setSelectedTechnique(technique)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white text-lg">{technique.name}</CardTitle>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            technique.difficulty === "Beginner"
                              ? "border-[#00d4ff] text-[#00d4ff]"
                              : "border-[#d20a11] text-[#d20a11]"
                          }`}
                        >
                          {technique.difficulty}
                        </Badge>
                      </div>
                      <CardDescription className="text-white/70">{technique.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-white/50">
                        <Clock className="h-4 w-4" />
                        {technique.duration}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Video Player */}
              <div className="lg:col-span-2">
                <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">{selectedTechnique.name}</CardTitle>
                    <CardDescription className="text-white/70">{selectedTechnique.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Video Placeholder */}
                    <div className="aspect-video bg-[#1a1a1a] rounded-lg border border-[#333333] flex items-center justify-center">
                      <div className="text-center text-white/70">
                        <Play className="h-16 w-16 mx-auto mb-4 text-[#00d4ff]" />
                        <p className="text-lg font-medium">Video Tutorial</p>
                        <p className="text-sm">{selectedTechnique.name} demonstration</p>
                      </div>
                    </div>

                    {/* Key Points */}
                    <div>
                      <h4 className="text-white font-medium mb-3">Key Points to Remember:</h4>
                      <ul className="space-y-2">
                        {selectedTechnique.steps.map((point, index) => (
                          <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#d20a11] mt-2 flex-shrink-0"></div>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full bg-[#d20a11] hover:bg-[#d20a11]/90">
                      <Play className="mr-2 h-4 w-4" />
                      Practice This Technique
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Walking Alone at Night</CardTitle>
                  <CardDescription className="text-white/70">
                    How to stay safe when walking alone after dark
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-[#1a1a1a] rounded-lg border border-[#333333] flex items-center justify-center">
                    <Play className="h-12 w-12 text-[#00d4ff]" />
                  </div>
                  <Button variant="outline" className="w-full border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10">
                    Watch Scenario
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Parking Lot Safety</CardTitle>
                  <CardDescription className="text-white/70">Staying alert and safe in parking areas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-[#1a1a1a] rounded-lg border border-[#333333] flex items-center justify-center">
                    <Play className="h-12 w-12 text-[#00d4ff]" />
                  </div>
                  <Button variant="outline" className="w-full border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10">
                    Watch Scenario
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Public Transportation</CardTitle>
                  <CardDescription className="text-white/70">
                    Safety tips for buses, trains, and rideshares
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-[#1a1a1a] rounded-lg border border-[#333333] flex items-center justify-center">
                    <Play className="h-12 w-12 text-[#00d4ff]" />
                  </div>
                  <Button variant="outline" className="w-full border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10">
                    Watch Scenario
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Home Security</CardTitle>
                  <CardDescription className="text-white/70">
                    Protecting yourself at home and recognizing threats
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-[#1a1a1a] rounded-lg border border-[#333333] flex items-center justify-center">
                    <Play className="h-12 w-12 text-[#00d4ff]" />
                  </div>
                  <Button variant="outline" className="w-full border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10">
                    Watch Scenario
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Emergency Contacts */}
              <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Phone className="h-5 w-5 text-[#d20a11]" />
                    Emergency Contacts
                  </CardTitle>
                  <CardDescription className="text-white/70">Important numbers to save in your phone</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-medium text-sm">{contact.name}</h4>
                        <Button size="sm" className="bg-[#d20a11] hover:bg-[#d20a11]/90 text-xs">
                          Call
                        </Button>
                      </div>
                      <p className="text-[#00d4ff] font-mono text-sm">{contact.number}</p>
                      <p className="text-white/70 text-xs">{contact.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Safety Apps */}
              <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#00d4ff]" />
                    Recommended Safety Apps
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Mobile apps to enhance your personal safety
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                    <h4 className="text-white font-medium">bSafe</h4>
                    <p className="text-white/70 text-sm">Personal safety network with GPS tracking</p>
                    <Button size="sm" variant="outline" className="mt-2 border-[#00d4ff] text-[#00d4ff] text-xs">
                      Download
                    </Button>
                  </div>
                  <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                    <h4 className="text-white font-medium">Noonlight</h4>
                    <p className="text-white/70 text-sm">Emergency response at the touch of a button</p>
                    <Button size="sm" variant="outline" className="mt-2 border-[#00d4ff] text-[#00d4ff] text-xs">
                      Download
                    </Button>
                  </div>
                  <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                    <h4 className="text-white font-medium">Life360</h4>
                    <p className="text-white/70 text-sm">Family location sharing and safety features</p>
                    <Button size="sm" variant="outline" className="mt-2 border-[#00d4ff] text-[#00d4ff] text-xs">
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
