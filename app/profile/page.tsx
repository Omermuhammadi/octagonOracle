"use client"

import { useState } from "react"
import {
  User,
  Trophy,
  TrendingUp,
  Calendar,
  Target,
  Settings,
  Bell,
  Shield,
  BarChart3,
  Clock,
  Award,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

const userStats = {
  name: "Alex Rodriguez",
  username: "@alexfighter",
  level: "Intermediate",
  joinDate: "March 2024",
  totalSessions: 47,
  currentStreak: 12,
  favoriteStyle: "Boxing",
  overallProgress: 68,
}

const recentPredictions = [
  { fight: "Rodriguez vs Silva", prediction: "Rodriguez", confidence: 78, result: "Correct", date: "2024-01-15" },
  { fight: "Johnson vs Lee", prediction: "Johnson", confidence: 65, result: "Correct", date: "2024-01-12" },
  { fight: "Davis vs Wilson", prediction: "Wilson", confidence: 82, result: "Incorrect", date: "2024-01-08" },
  { fight: "Brown vs Taylor", prediction: "Brown", confidence: 71, result: "Correct", date: "2024-01-05" },
]

const trainingProgress = [
  { week: "Week 1", sessions: 3, duration: 45 },
  { week: "Week 2", sessions: 4, duration: 52 },
  { week: "Week 3", sessions: 3, duration: 48 },
  { week: "Week 4", sessions: 5, duration: 58 },
  { week: "Week 5", sessions: 4, duration: 55 },
  { week: "Week 6", sessions: 6, duration: 62 },
]

const skillsData = [
  { skill: "Striking", current: 75, target: 85 },
  { skill: "Grappling", current: 60, target: 75 },
  { skill: "Cardio", current: 82, target: 90 },
  { skill: "Defense", current: 68, target: 80 },
  { skill: "Power", current: 71, target: 85 },
  { skill: "Speed", current: 78, target: 85 },
]

const achievements = [
  {
    name: "First Prediction",
    icon: "🎯",
    description: "Made your first fight prediction",
    unlocked: true,
    date: "March 2024",
  },
  { name: "Streak Master", icon: "🔥", description: "10-day training streak", unlocked: true, date: "April 2024" },
  { name: "Technique Analyst", icon: "📊", description: "Analyzed 25 fight videos", unlocked: true, date: "May 2024" },
  { name: "Gym Explorer", icon: "🏟️", description: "Visited 5 different gyms", unlocked: false, date: null },
  { name: "Form Perfect", icon: "⭐", description: "Perfect form score", unlocked: false, date: null },
  { name: "Prediction Pro", icon: "🏆", description: "80% prediction accuracy", unlocked: false, date: null },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="container mx-auto p-6 space-y-6">
        {/* Profile Header */}
        <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-[#00d4ff]/20 border-2 border-[#00d4ff] flex items-center justify-center">
                <User className="h-12 w-12 text-[#00d4ff]" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white">{userStats.name}</h1>
                <p className="text-white/70">{userStats.username}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge className="bg-[#d20a11]/20 text-[#d20a11] border border-[#d20a11]/30">{userStats.level}</Badge>
                  <span className="text-white/70 text-sm">Member since {userStats.joinDate}</span>
                </div>
              </div>
              <div className="text-right">
                <Button className="bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-black">
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-[#00d4ff]" />
              <div className="text-2xl font-bold text-white">{userStats.totalSessions}</div>
              <div className="text-white/70 text-sm">Total Sessions</div>
            </CardContent>
          </Card>
          <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-[#d20a11]" />
              <div className="text-2xl font-bold text-white">{userStats.currentStreak}</div>
              <div className="text-white/70 text-sm">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-[#00d4ff]" />
              <div className="text-2xl font-bold text-white">{userStats.favoriteStyle}</div>
              <div className="text-white/70 text-sm">Favorite Style</div>
            </CardContent>
          </Card>
          <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-[#d20a11]" />
              <div className="text-2xl font-bold text-white">{userStats.overallProgress}%</div>
              <div className="text-white/70 text-sm">Overall Progress</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#2a2a2a] border-[#333333] grid grid-cols-5">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
              Overview
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
              Training
            </TabsTrigger>
            <TabsTrigger
              value="predictions"
              className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black"
            >
              Predictions
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black"
            >
              Achievements
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Training Progress Chart */}
              <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Training Progress</CardTitle>
                  <CardDescription className="text-white/70">Weekly session duration over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={trainingProgress}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                      <XAxis dataKey="week" tick={{ fill: "#ffffff", fontSize: 12 }} />
                      <YAxis tick={{ fill: "#ffffff", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#2a2a2a",
                          border: "1px solid #333333",
                          borderRadius: "8px",
                          color: "#ffffff",
                        }}
                      />
                      <Line type="monotone" dataKey="duration" stroke="#00d4ff" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Skills Radar */}
              <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Skill Development</CardTitle>
                  <CardDescription className="text-white/70">Current vs target skill levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={skillsData}>
                      <PolarGrid stroke="#333333" />
                      <PolarAngleAxis dataKey="skill" tick={{ fill: "#ffffff", fontSize: 12 }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={{ fill: "#ffffff", fontSize: 10 }} />
                      <Radar
                        name="Current"
                        dataKey="current"
                        stroke="#00d4ff"
                        fill="#00d4ff"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Target"
                        dataKey="target"
                        stroke="#d20a11"
                        fill="#d20a11"
                        fillOpacity={0.1}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-white/70">
                  Your latest training sessions and predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                    <div className="h-10 w-10 rounded-full bg-[#00d4ff]/20 flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-[#00d4ff]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">Completed Boxing Training Session</h4>
                      <p className="text-white/70 text-sm">45 minutes • Focus: Jab-Cross Combinations</p>
                    </div>
                    <span className="text-white/50 text-sm">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                    <div className="h-10 w-10 rounded-full bg-[#d20a11]/20 flex items-center justify-center">
                      <Target className="h-5 w-5 text-[#d20a11]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">Fight Prediction: Rodriguez vs Silva</h4>
                      <p className="text-white/70 text-sm">Predicted Rodriguez to win • 78% confidence</p>
                    </div>
                    <span className="text-white/50 text-sm">1 day ago</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                    <div className="h-10 w-10 rounded-full bg-[#00d4ff]/20 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-[#00d4ff]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">Achievement Unlocked: Streak Master</h4>
                      <p className="text-white/70 text-sm">Completed 10-day training streak</p>
                    </div>
                    <span className="text-white/50 text-sm">3 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Training Plan */}
              <Card className="lg:col-span-2 border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Current Training Plan</CardTitle>
                  <CardDescription className="text-white/70">Adult Beginner - Week 8 of 18</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Overall Progress</span>
                      <span className="text-white">44%</span>
                    </div>
                    <Progress value={44} className="h-3 bg-[#333333]" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                      <div className="h-8 w-8 rounded-full bg-[#00d4ff] flex items-center justify-center">
                        <span className="text-black text-sm font-bold">✓</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">Fighting Fundamentals</h4>
                        <p className="text-white/70 text-sm">Completed • 4 weeks</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                      <div className="h-8 w-8 rounded-full bg-[#00d4ff] flex items-center justify-center">
                        <span className="text-black text-sm font-bold">✓</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">Striking Techniques</h4>
                        <p className="text-white/70 text-sm">Completed • 6 weeks</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-[#d20a11]/30">
                      <div className="h-8 w-8 rounded-full bg-[#d20a11] flex items-center justify-center">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">Grappling Basics</h4>
                        <p className="text-white/70 text-sm">In Progress • Week 2 of 6</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Training Stats */}
              <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">This Week</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#00d4ff]">6</div>
                    <div className="text-white/70 text-sm">Sessions Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#d20a11]">4.2</div>
                    <div className="text-white/70 text-sm">Hours Trained</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">850</div>
                    <div className="text-white/70 text-sm">Calories Burned</div>
                  </div>
                  <Button className="w-full bg-[#d20a11] hover:bg-[#d20a11]/90">Start Today's Session</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Prediction History</CardTitle>
                <CardDescription className="text-white/70">Your recent fight predictions and accuracy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPredictions.map((prediction, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]"
                    >
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{prediction.fight}</h4>
                        <p className="text-white/70 text-sm">Predicted: {prediction.prediction}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-medium">{prediction.confidence}%</div>
                        <div className="text-white/70 text-xs">Confidence</div>
                      </div>
                      <Badge
                        className={`${
                          prediction.result === "Correct"
                            ? "bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30"
                            : "bg-[#d20a11]/20 text-[#d20a11] border-[#d20a11]/30"
                        }`}
                      >
                        {prediction.result}
                      </Badge>
                      <span className="text-white/50 text-sm">{prediction.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className={`border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm ${
                    achievement.unlocked ? "ring-2 ring-[#00d4ff]/30" : ""
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`text-4xl mb-3 ${achievement.unlocked ? "" : "grayscale opacity-50"}`}>
                      {achievement.icon}
                    </div>
                    <h3 className={`font-bold mb-2 ${achievement.unlocked ? "text-white" : "text-white/50"}`}>
                      {achievement.name}
                    </h3>
                    <p className={`text-sm mb-3 ${achievement.unlocked ? "text-white/70" : "text-white/40"}`}>
                      {achievement.description}
                    </p>
                    {achievement.unlocked ? (
                      <Badge className="bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30">
                        Unlocked {achievement.date}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-[#333333] text-white/50">
                        Locked
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full border-[#333333] text-white hover:bg-[#333333]">
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile Information
                  </Button>
                  <Button variant="outline" className="w-full border-[#333333] text-white hover:bg-[#333333]">
                    <Shield className="mr-2 h-4 w-4" />
                    Privacy Settings
                  </Button>
                  <Button variant="outline" className="w-full border-[#333333] text-white hover:bg-[#333333]">
                    <Bell className="mr-2 h-4 w-4" />
                    Notification Preferences
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full border-[#333333] text-white hover:bg-[#333333]">
                    <Settings className="mr-2 h-4 w-4" />
                    Account Security
                  </Button>
                  <Button variant="outline" className="w-full border-[#333333] text-white hover:bg-[#333333]">
                    <Star className="mr-2 h-4 w-4" />
                    Subscription Management
                  </Button>
                  <Button variant="outline" className="w-full border-[#d20a11] text-[#d20a11] hover:bg-[#d20a11]/10">
                    <Award className="mr-2 h-4 w-4" />
                    Delete Account
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
