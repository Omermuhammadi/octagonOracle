"use client"

import { useState, useEffect, useMemo } from "react"
import PageHeader from "@/components/layout/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Check, ChevronDown, ChevronUp, Clock, Filter, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SelfDefensePage from "@/app/self-defense/page";

// Training paths data
const allTrainingPaths = [
  {
    id: 1,
    title: "Youth Foundation",
    ageRange: "10-14 years",
    description: "Build fundamental skills and discipline",
    color: "#00d4ff",
    goals: ["Fitness", "Discipline", "Confidence"],
    duration: "6-12 months",
    modules: [
      {
        name: "Basic Stance & Movement",
        completed: true,
        duration: "2 weeks",
        content: "Learn proper fighting stance and basic footwork.",
      },
      {
        name: "Fundamental Strikes",
        completed: true,
        duration: "3 weeks",
        content: "Master basic punches, kicks, and defensive movements.",
      },
      {
        name: "Defense Basics",
        completed: false,
        duration: "2 weeks",
        content: "Develop blocking, parrying, and evasive techniques.",
      },
      {
        name: "Conditioning",
        completed: false,
        duration: "4 weeks",
        content: "Build strength, endurance, and flexibility.",
      },
      {
        name: "Sparring Introduction",
        completed: false,
        duration: "3 weeks",
        content: "Begin controlled practice with partners.",
      },
    ],
    progress: 40,
  },
  {
    id: 2,
    title: "Adult Beginner",
    ageRange: "15-25 years",
    description: "Comprehensive martial arts foundation",
    color: "#d20a11",
    goals: ["Fitness", "Career", "Self-Defense"],
    duration: "12-18 months",
    modules: [
      {
        name: "Fighting Fundamentals",
        completed: true,
        duration: "4 weeks",
        content: "Master stance, movement, and basic techniques.",
      },
      {
        name: "Striking Techniques",
        completed: true,
        duration: "6 weeks",
        content: "Develop powerful and accurate striking combinations.",
      },
      {
        name: "Grappling Basics",
        completed: true,
        duration: "6 weeks",
        content: "Learn takedowns, control positions, and submissions.",
      },
      {
        name: "Advanced Combinations",
        completed: false,
        duration: "8 weeks",
        content: "Integrate striking and grappling into effective combinations.",
      },
      {
        name: "Competition Prep",
        completed: false,
        duration: "12 weeks",
        content: "Prepare for amateur competition with specialized training.",
      },
    ],
    progress: 60,
  },
  {
    id: 3,
    title: "Mature Starter",
    ageRange: "25+ years",
    description: "Fitness-focused with practical applications",
    color: "#ffffff",
    goals: ["Fitness", "Self-Defense", "Stress Relief"],
    duration: "8-12 months",
    modules: [
      {
        name: "Mobility & Flexibility",
        completed: true,
        duration: "3 weeks",
        content: "Improve range of motion and prevent injuries.",
      },
      {
        name: "Low-Impact Techniques",
        completed: false,
        duration: "4 weeks",
        content: "Learn effective techniques that minimize joint stress.",
      },
      {
        name: "Practical Self-Defense",
        completed: false,
        duration: "6 weeks",
        content: "Master real-world self-defense scenarios and responses.",
      },
      {
        name: "Fitness Integration",
        completed: false,
        duration: "8 weeks",
        content: "Combine martial arts with overall fitness programming.",
      },
      {
        name: "Lifestyle Maintenance",
        completed: false,
        duration: "ongoing",
        content: "Develop sustainable training habits for long-term practice.",
      },
    ],
    progress: 20,
  },
  {
    id: 4,
    title: "Professional Track",
    ageRange: "18-30 years",
    description: "Elite training for competitive fighters",
    color: "#ffd700",
    goals: ["Career", "Competition", "Mastery"],
    duration: "24-36 months",
    modules: [
      {
        name: "Advanced Striking",
        completed: false,
        duration: "8 weeks",
        content: "Develop elite-level striking techniques and combinations.",
      },
      {
        name: "Advanced Grappling",
        completed: false,
        duration: "8 weeks",
        content: "Master complex submission systems and positional control.",
      },
      {
        name: "Fight Strategy",
        completed: false,
        duration: "6 weeks",
        content: "Learn to analyze opponents and develop winning game plans.",
      },
      {
        name: "Strength & Conditioning",
        completed: false,
        duration: "12 weeks",
        content: "Build fight-specific athletic performance.",
      },
      {
        name: "Competition Cycles",
        completed: false,
        duration: "ongoing",
        content: "Structured training camps for professional competition.",
      },
    ],
    progress: 0,
  },
  {
    id: 5,
    title: "Women's Self-Defense",
    ageRange: "All ages",
    description: "Practical techniques for real-world situations",
    color: "#9932cc",
    goals: ["Self-Defense", "Confidence", "Awareness"],
    duration: "3-6 months",
    modules: [
      {
        name: "Situational Awareness",
        completed: false,
        duration: "2 weeks",
        content: "Learn to identify and avoid potential threats.",
      },
      {
        name: "Defensive Techniques",
        completed: false,
        duration: "4 weeks",
        content: "Master effective responses to common attacks.",
      },
      {
        name: "Escape Methods",
        completed: false,
        duration: "3 weeks",
        content: "Develop skills to break free from holds and restraints.",
      },
      {
        name: "Verbal De-escalation",
        completed: false,
        duration: "2 weeks",
        content: "Learn communication strategies to prevent physical confrontation.",
      },
      {
        name: "Confidence Building",
        completed: false,
        duration: "ongoing",
        content: "Build mental resilience and self-assurance.",
      },
    ],
    progress: 0,
  },
]

const achievements = [
  { name: "First Steps", icon: "🥋", description: "Completed first training module", unlocked: true },
  { name: "Consistency", icon: "📅", description: "7 days of training", unlocked: true },
  { name: "Technique Master", icon: "🎯", description: "Perfect form score", unlocked: false },
  { name: "Endurance", icon: "💪", description: "30-minute session", unlocked: false },
  { name: "Sparring Ready", icon: "🥊", description: "Ready for partner training", unlocked: false },
]

export default function TrainingPage() {
  // State for filtering and selection
  const [selectedPath, setSelectedPath] = useState(allTrainingPaths[1])
  const [selectedGoal, setSelectedGoal] = useState("All")
  const [ageFilter, setAgeFilter] = useState("All Ages")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [expandedModules, setExpandedModules] = useState<string[]>([])
  const [completedModules, setCompletedModules] = useState<{[key: string]: boolean}>({})
  const [activeTab, setActiveTab] = useState("paths")

  // Initialize completed modules from training path data
  useEffect(() => {
    const initialCompletedState: {[key: string]: boolean} = {}
    allTrainingPaths.forEach(path => {
      path.modules.forEach(module => {
        initialCompletedState[`${path.id}-${module.name}`] = module.completed
      })
    })
    setCompletedModules(initialCompletedState)
  }, [])

  // Filter training paths based on selected goal, age filter, and search term
  const filteredPaths = useMemo(() => {
    const pathsToDisplay = allTrainingPaths.filter(path => path.id !== 5); // Exclude old Women's Self-Defense path
    return pathsToDisplay.filter(path => {
      const matchesGoal = selectedGoal === "All" || path.goals.includes(selectedGoal);
      const matchesAge = ageFilter === "All Ages" || path.ageRange.includes(ageFilter);
      const matchesSearch = searchTerm === "" ||
        path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        path.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesGoal && matchesAge && matchesSearch;
    });
  }, [selectedGoal, ageFilter, searchTerm]);

  // Handle path selection with loading state
  const handlePathSelect = (path: typeof allTrainingPaths[0]) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedPath(path);
      setIsLoading(false);
    }, 300);
  };

  // Toggle module completion status
  const toggleModuleCompletion = (pathId: number, moduleName: string) => {
    const moduleKey = `${pathId}-${moduleName}`;
    setCompletedModules(prev => ({
      ...prev,
      [moduleKey]: !prev[moduleKey]
    }));
  };

  // Toggle module expansion
  const toggleModuleExpansion = (moduleName: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleName)
        ? prev.filter(name => name !== moduleName)
        : [...prev, moduleName]
    );
  };

  // Age filter options
  const ageOptions = ["All Ages", "10-14", "15-25", "25+", "18-30"];

  // Goal options
  const goalOptions = ["All", "Fitness", "Self-Defense", "Career", "Discipline", "Confidence", "Competition"];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <PageHeader
        title="Training Roadmaps"
        description="Personalized training paths designed for your age, goals, and experience level"
      />

      <div className="container mx-auto p-6 space-y-6">
        {/* Tabs for different sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#2a2a2a] border-[#333333]">
            <TabsTrigger value="paths" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
              Training Paths
            </TabsTrigger>
            <TabsTrigger value="selfDefense" className="data-[state=active]:bg-[#9932cc] data-[state=active]:text-white">
              Self Defense
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Training Paths Content */}
          <TabsContent value="paths" className="mt-6">
            <div className="space-y-6">
              {/* Search and Filter Bar */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                  <Input 
                    type="search"
                    placeholder="Search training paths..."
                    className="pl-10 bg-[#2a2a2a] border-[#333333] text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={ageFilter} onValueChange={setAgeFilter}>
                    <SelectTrigger className="w-36 bg-[#2a2a2a] border-[#333333] text-white">
                      <Filter size={16} className="mr-2" />
                      <SelectValue placeholder="Age Group" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2a2a2a] border-[#333333] text-white">
                      {ageOptions.map(age => (
                        <SelectItem key={age} value={age}>{age}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedGoal} onValueChange={setSelectedGoal}>
                    <SelectTrigger className="w-36 bg-[#2a2a2a] border-[#333333] text-white">
                      <Filter size={16} className="mr-2" />
                      <SelectValue placeholder="Goal" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2a2a2a] border-[#333333] text-white">
                      {goalOptions.map(goal => (
                        <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Training Paths Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPaths.map(path => (
                  <Card 
                    key={path.id} 
                    className={`border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm hover:border-[${path.color}]/70 transition-all cursor-pointer ${
                      selectedPath.id === path.id ? `border-[${path.color}]` : ''
                    }`}
                    onClick={() => handlePathSelect(path)}
                  >
                    <CardHeader className="pb-2">
                      <Badge className="w-fit mb-2" style={{ backgroundColor: path.color, color: path.color === '#ffffff' ? '#000000' : '#ffffff' }}>
                        {path.ageRange}
                      </Badge>
                      <CardTitle className="text-white">{path.title}</CardTitle>
                      <CardDescription className="text-white/70">{path.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {path.goals.map(goal => (
                            <Badge key={goal} variant="outline" className="text-white/70 border-[#444444]">
                              {goal}
                            </Badge>
                          ))}
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/70">Progress</span>
                            <span className="text-white">{path.progress}%</span>
                          </div>
                          <Progress value={path.progress} className="h-2" style={{ backgroundColor: '#333333' }}>
                            <div className="h-full" style={{ backgroundColor: path.color, width: `${path.progress}%` }} />
                          </Progress>
                        </div>
                        <div className="text-sm text-white/70 mt-1">
                          Duration: {path.duration}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Selected Path Details */}
              {selectedPath && (
                <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm mt-8">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <Badge className="mb-2" style={{ backgroundColor: selectedPath.color, color: selectedPath.color === '#ffffff' ? '#000000' : '#ffffff' }}>
                          {selectedPath.ageRange}
                        </Badge>
                        <CardTitle className="text-white text-xl">{selectedPath.title}</CardTitle>
                        <CardDescription className="text-white/70">{selectedPath.description}</CardDescription>
                      </div>
                      <div>
                        <div className="text-right mb-1">
                          <span className="text-white font-semibold">{selectedPath.progress}%</span>
                        </div>
                        <Progress value={selectedPath.progress} className="h-2 w-32" style={{ backgroundColor: '#333333' }}>
                          <div className="h-full" style={{ backgroundColor: selectedPath.color, width: `${selectedPath.progress}%` }} />
                        </Progress>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-white font-semibold mb-4">Training Modules</h3>
                    <div className="space-y-3">
                      {selectedPath.modules.map(module => {
                        const isExpanded = expandedModules.includes(module.name);
                        const isCompleted = completedModules[`${selectedPath.id}-${module.name}`];
                        
                        return (
                          <div key={module.name} className="border border-[#333333] rounded-lg overflow-hidden">
                            <div 
                              className="flex items-center justify-between p-4 bg-[#1a1a1a] cursor-pointer"
                              onClick={() => toggleModuleExpansion(module.name)}
                            >
                              <div className="flex items-center gap-3">
                                <div 
                                  className="h-8 w-8 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: isCompleted ? selectedPath.color : '#333333' }}
                                >
                                  {isCompleted ? (
                                    <Check className="h-4 w-4" style={{ color: selectedPath.color === '#ffffff' ? '#000000' : '#ffffff' }} />
                                  ) : (
                                    <Clock className="h-4 w-4 text-white/70" />
                                  )}
                                </div>
                                <div>
                                  <h4 className="text-white font-medium">{module.name}</h4>
                                  <p className="text-white/70 text-sm">
                                    {isCompleted ? 'Completed' : 'In Progress'} • {module.duration}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleModuleCompletion(selectedPath.id, module.name);
                                  }}
                                  className="mr-2 hover:bg-[#333333]"
                                >
                                  <Check className={`h-4 w-4 ${isCompleted ? 'text-green-500' : 'text-white/50'}`} />
                                </Button>
                                {isExpanded ? (
                                  <ChevronUp className="h-5 w-5 text-white/50" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-white/50" />
                                )}
                              </div>
                            </div>
                            
                            {isExpanded && (
                              <div className="p-4 bg-[#222222]">
                                <p className="text-white/80 mb-3">{module.content}</p>
                                <Button 
                                  className="bg-[#333333] hover:bg-[#444444] text-white"
                                >
                                  Start Module
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="selfDefense">
            <SelfDefensePage />
          </TabsContent>

          {/* Achievements Content */}
          <TabsContent value="achievements" className="mt-6">
            <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Your Achievements</CardTitle>
                <CardDescription className="text-white/70">
                  Track your progress through training milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map(achievement => (
                    <Card 
                      key={achievement.name}
                      className={`border-[#333333] ${
                        achievement.unlocked 
                          ? 'bg-gradient-to-br from-[#2a2a2a] to-[#333333]' 
                          : 'bg-[#222222] opacity-60'
                      }`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-2xl">
                            {achievement.icon}
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{achievement.name}</h3>
                            <p className="text-white/70 text-sm">{achievement.description}</p>
                            <Badge 
                              className={`mt-2 ${
                                achievement.unlocked 
                                  ? 'bg-[#00d4ff] text-black' 
                                  : 'bg-[#333333] text-white/50'
                              }`}
                            >
                              {achievement.unlocked ? 'Unlocked' : 'Locked'}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
