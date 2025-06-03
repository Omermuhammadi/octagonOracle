"use client"

import { useState } from "react"
import { MessageCircle, Send, X, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI training assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")

  const sendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInputText("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputText),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("training") || input.includes("workout")) {
      return "I can help you with training plans! Based on your profile, I recommend focusing on your grappling skills. Would you like me to suggest some specific drills?"
    }

    if (input.includes("prediction") || input.includes("fight")) {
      return "For fight predictions, I analyze fighter stats, recent performance, and fighting styles. What fight are you interested in predicting?"
    }

    if (input.includes("technique") || input.includes("form")) {
      return "I can analyze your technique! Upload a video of your training, and I'll provide detailed feedback on your form and suggest improvements."
    }

    if (input.includes("gym") || input.includes("location")) {
      return "I can help you find gyms near you! What type of martial arts are you interested in, and what's your location?"
    }

    return "I'm here to help with training, predictions, technique analysis, and more! What specific area would you like assistance with?"
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-black shadow-lg z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 border-[#333333] bg-[#2a2a2a]/95 backdrop-blur-sm shadow-xl z-50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Bot className="h-5 w-5 text-[#00d4ff]" />
            AI Assistant
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col h-full p-4">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.sender === "bot" && (
                <div className="h-8 w-8 rounded-full bg-[#00d4ff]/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-[#00d4ff]" />
                </div>
              )}
              <div
                className={`max-w-[70%] p-3 rounded-lg text-sm ${
                  message.sender === "user"
                    ? "bg-[#00d4ff] text-black"
                    : "bg-[#1a1a1a] text-white border border-[#333333]"
                }`}
              >
                {message.text}
              </div>
              {message.sender === "user" && (
                <div className="h-8 w-8 rounded-full bg-[#d20a11]/20 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-[#d20a11]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask me anything..."
            className="bg-[#1a1a1a] border-[#333333] text-white placeholder:text-white/50"
          />
          <Button onClick={sendMessage} size="icon" className="bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-black">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
