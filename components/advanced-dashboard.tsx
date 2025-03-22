"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts"

export default function AdvancedDashboard() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">Advanced Market Analysis</h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Gain deeper insights into market trends and make informed investment decisions with our advanced analytics
            tools.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="mx-auto flex w-full max-w-md justify-center">
            <TabsTrigger value="overview" className="flex-1">
              Market Overview
            </TabsTrigger>
            <TabsTrigger value="sectors" className="flex-1">
              Sector Performance
            </TabsTrigger>
            <TabsTrigger value="sentiment" className="flex-1">
              Market Sentiment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Market Indices</CardTitle>
                  <CardDescription>Performance of major market indices</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={indicesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey="sp500" stroke="#8884d8" name="S&P 500" strokeWidth={2} />
                        <Line type="monotone" dataKey="nasdaq" stroke="#82ca9d" name="NASDAQ" strokeWidth={2} />
                        <Line type="monotone" dataKey="dowjones" stroke="#ffc658" name="Dow Jones" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                  <CardDescription>Recommended portfolio distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={allocationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => {
                            if (!name || percent === undefined) return ""
                            return `${name} ${(percent * 100).toFixed(0)}%`
                          }}
                        >
                          {allocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Economic Indicators</CardTitle>
                <CardDescription>Key economic metrics affecting the market</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-8 md:grid-cols-3">
                  {economicIndicators.map((indicator) => (
                    <div key={indicator.name} className="flex flex-col items-center text-center">
                      <div className="mb-2 text-4xl font-bold">{indicator.value}</div>
                      <div className="mb-1 text-lg font-medium">{indicator.name}</div>
                      <div
                        className={`flex items-center text-sm ${indicator.trend === "up" ? "text-green-500" : "text-red-500"}`}
                      >
                        {indicator.trend === "up" ? "↑" : "↓"} {indicator.change}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sectors" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Sector Performance</CardTitle>
                <CardDescription>Year-to-date performance by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sectorData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={["dataMin", "dataMax"]} />
                      <YAxis type="category" dataKey="name" width={120} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="ytd" fill="hsl(var(--primary))" name="YTD Performance %" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Stocks</CardTitle>
                  <CardDescription>Best performers in the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topStocks.map((stock, index) => (
                      <div key={stock.symbol} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{stock.name}</div>
                            <div className="text-sm text-muted-foreground">{stock.symbol}</div>
                          </div>
                        </div>
                        <div className="text-green-500">+{stock.change}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sector Rotation Strategy</CardTitle>
                  <CardDescription>AI-recommended sector allocation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sectorAllocationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => {
                            if (!name || percent === undefined) return ""
                            return `${name} ${(percent * 100).toFixed(0)}%`
                          }}
                        >
                          {sectorAllocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sentiment" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Market Sentiment Analysis</CardTitle>
                <CardDescription>AI-powered analysis of market sentiment from news and social media</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sentimentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[-100, 100]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="overall"
                        stroke="hsl(var(--primary))"
                        name="Overall Sentiment"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="retail"
                        stroke="#8884d8"
                        name="Retail Investors"
                        strokeWidth={1.5}
                      />
                      <Line
                        type="monotone"
                        dataKey="institutional"
                        stroke="#82ca9d"
                        name="Institutional Investors"
                        strokeWidth={1.5}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>News Sentiment</CardTitle>
                  <CardDescription>Sentiment analysis of recent financial news</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {newsSentiment.map((news) => (
                      <div key={news.title} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{news.title}</div>
                          <div
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              news.sentiment > 50
                                ? "bg-green-100 text-green-800"
                                : news.sentiment < -50
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {news.sentiment > 50 ? "Bullish" : news.sentiment < -50 ? "Bearish" : "Neutral"}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {news.source} • {news.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Media Buzz</CardTitle>
                  <CardDescription>Most discussed stocks on social media</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={socialMediaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="symbol" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="mentions" fill="hsl(var(--primary))" name="Mentions" />
                        <Bar dataKey="sentiment" fill="#8884d8" name="Sentiment Score" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
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

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF6B6B",
  "#6A6AFF",
  "#FFD700",
]

const indicesData = [
  { date: "Jan", sp500: 4800, nasdaq: 16800, dowjones: 37500 },
  { date: "Feb", sp500: 4750, nasdaq: 16600, dowjones: 37200 },
  { date: "Mar", sp500: 4900, nasdaq: 17000, dowjones: 38000 },
  { date: "Apr", sp500: 5000, nasdaq: 17500, dowjones: 38500 },
  { date: "May", sp500: 4950, nasdaq: 17300, dowjones: 38300 },
  { date: "Jun", sp500: 5100, nasdaq: 17800, dowjones: 39000 },
]

const allocationData = [
  { name: "US Stocks", value: 45 },
  { name: "Int'l Stocks", value: 20 },
  { name: "Bonds", value: 15 },
  { name: "Real Estate", value: 10 },
  { name: "Crypto", value: 5 },
  { name: "Cash", value: 5 },
]

const economicIndicators = [
  { name: "Inflation Rate", value: "3.2%", trend: "down", change: "0.3%" },
  { name: "Interest Rate", value: "5.25%", trend: "up", change: "0.25%" },
  { name: "Unemployment", value: "3.8%", trend: "down", change: "0.1%" },
]

const sectorData = [
  { name: "Technology", ytd: 22.5 },
  { name: "Healthcare", ytd: 8.7 },
  { name: "Financials", ytd: 6.2 },
  { name: "Consumer Discretionary", ytd: 12.8 },
  { name: "Communication Services", ytd: 18.3 },
  { name: "Industrials", ytd: 9.5 },
  { name: "Energy", ytd: -3.2 },
  { name: "Materials", ytd: 4.8 },
  { name: "Utilities", ytd: -2.5 },
  { name: "Real Estate", ytd: 5.6 },
]

const topStocks = [
  { name: "Nvidia Corp", symbol: "NVDA", change: 45.8 },
  { name: "Advanced Micro Devices", symbol: "AMD", change: 32.4 },
  { name: "Meta Platforms", symbol: "META", change: 28.7 },
  { name: "Tesla Inc", symbol: "TSLA", change: 24.5 },
  { name: "Apple Inc", symbol: "AAPL", change: 18.2 },
]

const sectorAllocationData = [
  { name: "Technology", value: 35 },
  { name: "Healthcare", value: 15 },
  { name: "Financials", value: 12 },
  { name: "Consumer", value: 10 },
  { name: "Communication", value: 8 },
  { name: "Industrials", value: 7 },
  { name: "Energy", value: 5 },
  { name: "Materials", value: 4 },
  { name: "Utilities", value: 2 },
  { name: "Real Estate", value: 2 },
]

const sentimentData = [
  { date: "Jan", overall: 45, retail: 60, institutional: 30 },
  { date: "Feb", overall: 38, retail: 50, institutional: 25 },
  { date: "Mar", overall: 52, retail: 65, institutional: 40 },
  { date: "Apr", overall: 65, retail: 75, institutional: 55 },
  { date: "May", overall: 58, retail: 70, institutional: 45 },
  { date: "Jun", overall: 72, retail: 80, institutional: 65 },
]

const newsSentiment = [
  {
    title: "Fed Signals Potential Rate Cuts Later This Year",
    sentiment: 75,
    source: "Financial Times",
    time: "2 hours ago",
  },
  {
    title: "Tech Earnings Beat Expectations Across the Board",
    sentiment: 85,
    source: "Wall Street Journal",
    time: "5 hours ago",
  },
  {
    title: "Oil Prices Drop Amid Supply Concerns",
    sentiment: -60,
    source: "Bloomberg",
    time: "8 hours ago",
  },
  {
    title: "Retail Sales Show Mixed Results for Q2",
    sentiment: 10,
    source: "CNBC",
    time: "1 day ago",
  },
  {
    title: "Housing Market Cools as Mortgage Rates Rise",
    sentiment: -45,
    source: "Reuters",
    time: "1 day ago",
  },
]

const socialMediaData = [
  { symbol: "AAPL", mentions: 12500, sentiment: 65 },
  { symbol: "TSLA", mentions: 18700, sentiment: 72 },
  { symbol: "NVDA", mentions: 15600, sentiment: 85 },
  { symbol: "AMD", mentions: 8900, sentiment: 78 },
  { symbol: "META", mentions: 7500, sentiment: 62 },
]

