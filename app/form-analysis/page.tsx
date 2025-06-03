"use client"

import { useState } from "react"
import { Upload, Play, CheckCircle, AlertCircle, TrendingUp, Camera, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const analysisResults = {
  overallScore: 78,
  technique: "Jab Cross Combination",
  strengths: ["Good stance stability", "Proper hip rotation", "Consistent timing"],
  improvements: ["Extend reach fully on jab", "Keep guard up during combination", "Follow through on cross"],
  frameAnalysis: [
    { frame: 1, timestamp: "0:00", score: 85, feedback: "Excellent starting position" },
    { frame: 2, timestamp: "0:02", score: 82, feedback: "Good jab extension" },
    { frame: 3, timestamp: "0:04", score: 70, feedback: "Guard dropped slightly" },
    { frame: 4, timestamp: "0:06", score: 75, feedback: "Cross needs more extension" },
  ],
}

export default function FormAnalysisPage() {
  const [uploadedVideo, setUploadedVideo] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  const handleVideoUpload = () => {
    setUploadedVideo(true)
    setAnalyzing(true)
    // Simulate analysis
    setTimeout(() => {
      setAnalyzing(false)
      setAnalysisComplete(true)
    }, 3000)
  }

  const resetAnalysis = () => {
    setUploadedVideo(false)
    setAnalyzing(false)
    setAnalysisComplete(false)
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">AI Form Analysis</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Upload your training videos and get instant AI-powered feedback on your technique
          </p>
        </div>

        {!uploadedVideo && (
          /* Upload Interface */
          <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Upload className="h-5 w-5 text-[#00d4ff]" />
                Upload Training Video
              </CardTitle>
              <CardDescription className="text-white/70">
                Record or upload a video of your technique for AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-[#333333] rounded-lg p-12 text-center hover:border-[#00d4ff]/50 transition-colors">
                <Upload className="h-16 w-16 mx-auto mb-4 text-[#00d4ff]" />
                <h3 className="text-xl font-semibold text-white mb-2">Drop your video here</h3>
                <p className="text-white/70 mb-4">or click to browse files</p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={handleVideoUpload} className="bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-black">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Video
                  </Button>
                  <Button variant="outline" className="border-[#d20a11] text-[#d20a11] hover:bg-[#d20a11]/10">
                    <Camera className="mr-2 h-4 w-4" />
                    Record Now
                  </Button>
                </div>
              </div>

              {/* Guidelines */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                  <div className="text-2xl mb-2">📹</div>
                  <h4 className="text-white font-medium mb-1">Good Lighting</h4>
                  <p className="text-white/70 text-sm">Ensure your technique is clearly visible</p>
                </div>
                <div className="text-center p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                  <div className="text-2xl mb-2">📐</div>
                  <h4 className="text-white font-medium mb-1">Side Angle</h4>
                  <p className="text-white/70 text-sm">Film from the side for best analysis</p>
                </div>
                <div className="text-center p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                  <div className="text-2xl mb-2">⏱️</div>
                  <h4 className="text-white font-medium mb-1">10-30 Seconds</h4>
                  <p className="text-white/70 text-sm">Keep videos short and focused</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {analyzing && (
          /* Analysis in Progress */
          <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="h-5 w-5 border-2 border-[#00d4ff] border-t-transparent rounded-full animate-spin"></div>
                Analyzing Your Technique
              </CardTitle>
              <CardDescription className="text-white/70">
                Our AI is examining your form and movement patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Processing video...</span>
                  <span className="text-white">67%</span>
                </div>
                <Progress value={67} className="h-2 bg-[#333333]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-[#00d4ff]" />
                  <p className="text-white text-sm">Motion Detection</p>
                </div>
                <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                  <div className="h-8 w-8 mx-auto mb-2 border-2 border-[#00d4ff] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-white text-sm">Form Analysis</p>
                </div>
                <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                  <div className="h-8 w-8 mx-auto mb-2 border-2 border-[#333333] rounded-full"></div>
                  <p className="text-white/50 text-sm">Generating Report</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {analysisComplete && (
          /* Analysis Results */
          <div className="space-y-6">
            {/* Overall Score */}
            <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-[#00d4ff]" />
                      Analysis Complete
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      {analysisResults.technique} - Overall Performance
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetAnalysis}
                    className="border-[#333333] text-white/70 hover:bg-[#333333]"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    New Analysis
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Score Display */}
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center">
                      <div className="h-32 w-32 rounded-full border-8 border-[#333333] relative">
                        <div
                          className="absolute inset-0 rounded-full border-8 border-[#00d4ff] border-r-transparent border-b-transparent"
                          style={{
                            transform: `rotate(${(analysisResults.overallScore / 100) * 360}deg)`,
                          }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold text-white">{analysisResults.overallScore}</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mt-4">Overall Score</h3>
                    <Badge
                      className={`mt-2 ${
                        analysisResults.overallScore >= 80
                          ? "bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30"
                          : analysisResults.overallScore >= 60
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            : "bg-[#d20a11]/20 text-[#d20a11] border-[#d20a11]/30"
                      }`}
                    >
                      {analysisResults.overallScore >= 80
                        ? "Excellent"
                        : analysisResults.overallScore >= 60
                          ? "Good"
                          : "Needs Work"}
                    </Badge>
                  </div>

                  {/* Strengths */}
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#00d4ff]" />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {analysisResults.strengths.map((strength, index) => (
                        <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#00d4ff] mt-2 flex-shrink-0"></div>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-[#d20a11]" />
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-2">
                      {analysisResults.improvements.map((improvement, index) => (
                        <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#d20a11] mt-2 flex-shrink-0"></div>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <Tabs defaultValue="frame-by-frame" className="space-y-4">
              <TabsList className="bg-[#2a2a2a] border-[#333333]">
                <TabsTrigger
                  value="frame-by-frame"
                  className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black"
                >
                  Frame Analysis
                </TabsTrigger>
                <TabsTrigger
                  value="video-review"
                  className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black"
                >
                  Video Review
                </TabsTrigger>
                <TabsTrigger
                  value="recommendations"
                  className="data-[state=active]:bg-[#00d4ff] data-[state=active]:text-black"
                >
                  Recommendations
                </TabsTrigger>
              </TabsList>

              <TabsContent value="frame-by-frame" className="space-y-4">
                <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Frame-by-Frame Analysis</CardTitle>
                    <CardDescription className="text-white/70">
                      Detailed breakdown of your technique at key moments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysisResults.frameAnalysis.map((frame, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-[#333333]"
                        >
                          <div className="flex-shrink-0">
                            <div className="h-16 w-24 bg-[#333333] rounded border flex items-center justify-center">
                              <Play className="h-6 w-6 text-[#00d4ff]" />
                            </div>
                            <p className="text-xs text-white/50 text-center mt-1">{frame.timestamp}</p>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-white font-medium">Frame {frame.frame}</h4>
                              <Badge
                                className={`${
                                  frame.score >= 80
                                    ? "bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30"
                                    : frame.score >= 60
                                      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                      : "bg-[#d20a11]/20 text-[#d20a11] border-[#d20a11]/30"
                                }`}
                              >
                                {frame.score}/100
                              </Badge>
                            </div>
                            <p className="text-white/70 text-sm">{frame.feedback}</p>
                            <Progress value={frame.score} className="h-2 bg-[#333333] mt-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="video-review" className="space-y-4">
                <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Video Review with Annotations</CardTitle>
                    <CardDescription className="text-white/70">
                      Watch your technique with AI-generated feedback overlays
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-[#1a1a1a] rounded-lg border border-[#333333] flex items-center justify-center mb-4">
                      <div className="text-center text-white/70">
                        <Play className="h-16 w-16 mx-auto mb-4 text-[#00d4ff]" />
                        <p className="text-lg font-medium">Annotated Video Playback</p>
                        <p className="text-sm">Your technique with AI feedback overlays</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="bg-[#d20a11] hover:bg-[#d20a11]/90">
                        <Play className="mr-2 h-4 w-4" />
                        Play Analysis
                      </Button>
                      <Button variant="outline" className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10">
                        Download Video
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">Training Drills</CardTitle>
                      <CardDescription className="text-white/70">
                        Specific exercises to improve your technique
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                        <h4 className="text-white font-medium mb-1">Shadow Boxing Focus</h4>
                        <p className="text-white/70 text-sm mb-2">Practice jab-cross combinations slowly</p>
                        <Badge variant="outline" className="border-[#00d4ff] text-[#00d4ff] text-xs">
                          15 minutes daily
                        </Badge>
                      </div>
                      <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                        <h4 className="text-white font-medium mb-1">Guard Position Drills</h4>
                        <p className="text-white/70 text-sm mb-2">Maintain guard during combinations</p>
                        <Badge variant="outline" className="border-[#00d4ff] text-[#00d4ff] text-xs">
                          10 minutes daily
                        </Badge>
                      </div>
                      <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                        <h4 className="text-white font-medium mb-1">Extension Practice</h4>
                        <p className="text-white/70 text-sm mb-2">Focus on full reach extension</p>
                        <Badge variant="outline" className="border-[#00d4ff] text-[#00d4ff] text-xs">
                          5 minutes daily
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-[#333333] bg-[#2a2a2a]/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">Next Steps</CardTitle>
                      <CardDescription className="text-white/70">Recommended progression path</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-2 w-2 rounded-full bg-[#00d4ff]"></div>
                          <h4 className="text-white font-medium">Week 1-2</h4>
                        </div>
                        <p className="text-white/70 text-sm">Focus on guard position and basic combinations</p>
                      </div>
                      <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-2 w-2 rounded-full bg-[#333333]"></div>
                          <h4 className="text-white/50 font-medium">Week 3-4</h4>
                        </div>
                        <p className="text-white/50 text-sm">Add power and speed to combinations</p>
                      </div>
                      <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#333333]">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-2 w-2 rounded-full bg-[#333333]"></div>
                          <h4 className="text-white/50 font-medium">Week 5+</h4>
                        </div>
                        <p className="text-white/50 text-sm">Advanced combinations and footwork</p>
                      </div>
                      <Button className="w-full bg-[#d20a11] hover:bg-[#d20a11]/90">Start Training Plan</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
