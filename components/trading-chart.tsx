"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts"
import { CandlestickChart, Clock, TrendingUp } from "lucide-react"

export default function TradingChart() {
  const [timeframe, setTimeframe] = useState("1D")
  const [symbol, setSymbol] = useState("AAPL")

  return (
    <div className="h-full p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Select value={symbol} onValueChange={setSymbol}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Symbol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AAPL">Apple (AAPL)</SelectItem>
              <SelectItem value="MSFT">Microsoft (MSFT)</SelectItem>
              <SelectItem value="AMZN">Amazon (AMZN)</SelectItem>
              <SelectItem value="GOOGL">Alphabet (GOOGL)</SelectItem>
              <SelectItem value="TSLA">Tesla (TSLA)</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">$182.63</div>
            <div className="flex items-center text-green-500">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+1.25%</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeframe("1D")}
            className={timeframe === "1D" ? "bg-primary text-primary-foreground" : ""}
          >
            1D
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeframe("1W")}
            className={timeframe === "1W" ? "bg-primary text-primary-foreground" : ""}
          >
            1W
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeframe("1M")}
            className={timeframe === "1M" ? "bg-primary text-primary-foreground" : ""}
          >
            1M
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeframe("3M")}
            className={timeframe === "3M" ? "bg-primary text-primary-foreground" : ""}
          >
            3M
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeframe("1Y")}
            className={timeframe === "1Y" ? "bg-primary text-primary-foreground" : ""}
          >
            1Y
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTimeframe("ALL")}
            className={timeframe === "ALL" ? "bg-primary text-primary-foreground" : ""}
          >
            ALL
          </Button>
        </div>
      </div>

      <Tabs defaultValue="price">
        <TabsList className="mb-4">
          <TabsTrigger value="price">Price</TabsTrigger>
          <TabsTrigger value="volume">Volume</TabsTrigger>
          <TabsTrigger value="indicators">Indicators</TabsTrigger>
        </TabsList>
        <TabsContent value="price" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <CandlestickChart className="h-5 w-5" />
                Price Chart
              </CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> Last updated: Today, 16:30 EST
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" />
                    <YAxis domain={["auto", "auto"]} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill="url(#colorPrice)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Market Depth</CardTitle>
                <CardDescription>Buy and sell orders at different price levels</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marketDepthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="price" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="buy" fill="#22c55e" name="Buy Orders" />
                      <Bar dataKey="sell" fill="#ef4444" name="Sell Orders" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Price Prediction</CardTitle>
                <CardDescription>AI-powered price forecast</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={predictionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="hsl(var(--primary))"
                        name="Actual Price"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#8884d8"
                        name="Predicted Price"
                        strokeDasharray="5 5"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="volume" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Trading Volume</CardTitle>
              <CardDescription>Number of shares traded over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="volume" fill="hsl(var(--primary))" name="Volume" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="indicators" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Technical Indicators</CardTitle>
              <CardDescription>Moving averages and other indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={indicatorData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" name="Price" strokeWidth={2} />
                    <Line type="monotone" dataKey="sma20" stroke="#8884d8" name="SMA 20" strokeWidth={1.5} />
                    <Line type="monotone" dataKey="sma50" stroke="#82ca9d" name="SMA 50" strokeWidth={1.5} />
                    <Line type="monotone" dataKey="sma200" stroke="#ff7300" name="SMA 200" strokeWidth={1.5} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null

  return (
    <ChartTooltip>
      <ChartTooltipContent>
        <div className="font-medium">{label || ""}</div>
        {payload.map((entry: any, index: number) => {
          if (!entry) return null
          return (
            <div key={`item-${index}`} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color || "#000" }} />
              <div className="text-muted-foreground">
                {entry.name || ""}: {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value || ""}
                {entry.dataKey === "ytd" && "%"}
              </div>
            </div>
          )
        })}
      </ChartTooltipContent>
    </ChartTooltip>
  )
}

const priceData = [
  { time: "9:30", price: 180.25 },
  { time: "10:00", price: 180.75 },
  { time: "10:30", price: 181.5 },
  { time: "11:00", price: 181.25 },
  { time: "11:30", price: 180.9 },
  { time: "12:00", price: 181.1 },
  { time: "12:30", price: 181.45 },
  { time: "13:00", price: 181.8 },
  { time: "13:30", price: 182.15 },
  { time: "14:00", price: 182.4 },
  { time: "14:30", price: 182.1 },
  { time: "15:00", price: 182.35 },
  { time: "15:30", price: 182.75 },
  { time: "16:00", price: 182.63 },
]

const volumeData = [
  { time: "9:30", volume: 1250000 },
  { time: "10:00", volume: 980000 },
  { time: "10:30", volume: 750000 },
  { time: "11:00", volume: 620000 },
  { time: "11:30", volume: 540000 },
  { time: "12:00", volume: 480000 },
  { time: "12:30", volume: 520000 },
  { time: "13:00", volume: 580000 },
  { time: "13:30", volume: 620000 },
  { time: "14:00", volume: 680000 },
  { time: "14:30", volume: 720000 },
  { time: "15:00", volume: 850000 },
  { time: "15:30", volume: 950000 },
  { time: "16:00", volume: 1100000 },
]

const indicatorData = [
  { time: "9:30", price: 180.25, sma20: 179.8, sma50: 178.5, sma200: 175.2 },
  { time: "10:00", price: 180.75, sma20: 179.85, sma50: 178.55, sma200: 175.25 },
  { time: "10:30", price: 181.5, sma20: 179.9, sma50: 178.6, sma200: 175.3 },
  { time: "11:00", price: 181.25, sma20: 179.95, sma50: 178.65, sma200: 175.35 },
  { time: "11:30", price: 180.9, sma20: 180.0, sma50: 178.7, sma200: 175.4 },
  { time: "12:00", price: 181.1, sma20: 180.05, sma50: 178.75, sma200: 175.45 },
  { time: "12:30", price: 181.45, sma20: 180.1, sma50: 178.8, sma200: 175.5 },
  { time: "13:00", price: 181.8, sma20: 180.15, sma50: 178.85, sma200: 175.55 },
  { time: "13:30", price: 182.15, sma20: 180.2, sma50: 178.9, sma200: 175.6 },
  { time: "14:00", price: 182.4, sma20: 180.25, sma50: 178.95, sma200: 175.65 },
  { time: "14:30", price: 182.1, sma20: 180.3, sma50: 179.0, sma200: 175.7 },
  { time: "15:00", price: 182.35, sma20: 180.35, sma50: 179.05, sma200: 175.75 },
  { time: "15:30", price: 182.75, sma20: 180.4, sma50: 179.1, sma200: 175.8 },
  { time: "16:00", price: 182.63, sma20: 180.45, sma50: 179.15, sma200: 175.85 },
]

const marketDepthData = [
  { price: 180.5, buy: 12500, sell: 0 },
  { price: 181.0, buy: 18700, sell: 0 },
  { price: 181.5, buy: 24300, sell: 0 },
  { price: 182.0, buy: 32500, sell: 0 },
  { price: 182.5, buy: 0, sell: 28700 },
  { price: 183.0, buy: 0, sell: 22400 },
  { price: 183.5, buy: 0, sell: 18900 },
  { price: 184.0, buy: 0, sell: 15600 },
]

const predictionData = [
  { date: "Today", actual: 182.63, predicted: 182.63 },
  { date: "Tomorrow", actual: null, predicted: 183.25 },
  { date: "Day 3", actual: null, predicted: 184.1 },
  { date: "Day 4", actual: null, predicted: 183.75 },
  { date: "Day 5", actual: null, predicted: 184.5 },
  { date: "Day 6", actual: null, predicted: 185.2 },
  { date: "Day 7", actual: null, predicted: 186.15 },
]

