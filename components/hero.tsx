"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import Navbar from "@/components/navbar"
import TradingDashboard from "@/components/trading-dashboard"
import TradingChart from "@/components/trading-chart"
import ThreeBackground from "@/components/three-background"

export default function Hero() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI trading assistant. How can I help you with your investment strategy today?",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { role: "user", content: input },
        {
          role: "assistant",
          content:
            "I'm analyzing the market data based on your query. Based on current trends, I recommend considering technology and renewable energy sectors, which show strong growth potential. Would you like more specific stock recommendations?",
        },
      ])
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 z-0">
          <ThreeBackground />
        </div>
        <div className="relative z-10">
          <Navbar />
          <div className="container py-8">
            <div className="mb-8 text-center">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                AI-Powered Trading <span className="text-primary">Insights</span>
              </h1>
              <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
                Make smarter investment decisions with real-time market analysis and personalized recommendations.
              </p>
            </div>
            <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
              <ResizablePanel defaultSize={30} minSize={20} maxSize={50} className="bg-card">
                <Card className="h-full rounded-none border-0">
                  <CardHeader>
                    <CardTitle>AI Trading Assistant</CardTitle>
                    <CardDescription>Ask questions about markets, stocks, or trading strategies</CardDescription>
                  </CardHeader>
                  <CardContent className="flex h-[calc(100%-8rem)] flex-col justify-between p-4">
                    <div className="mb-4 space-y-4 overflow-auto">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                              message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Ask about market trends, stock advice..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1"
                      />
                      <Button size="icon" onClick={handleSend}>
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={70}>
                <Tabs defaultValue="dashboard" className="h-full">
                  <div className="flex items-center justify-between border-b px-4">
                    <TabsList className="my-2">
                      <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                      <TabsTrigger value="chart">Market Chart</TabsTrigger>
                    </TabsList>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Refresh
                      </Button>
                      <Button size="sm">Trade Now</Button>
                    </div>
                  </div>
                  <TabsContent value="dashboard" className="h-[calc(100%-3.5rem)] p-0">
                    <TradingDashboard />
                  </TabsContent>
                  <TabsContent value="chart" className="h-[calc(100%-3.5rem)] p-0">
                    <TradingChart />
                  </TabsContent>
                </Tabs>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </>
  )
}

