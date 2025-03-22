"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, ArrowUp, DollarSign, TrendingDown, TrendingUp } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts"

export default function TradingDashboard() {
  return (
    <div className="h-full overflow-auto p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.change > 0 ? (
                  <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={stat.change > 0 ? "text-green-500" : "text-red-500"}>
                  {stat.change > 0 ? "+" : ""}
                  {stat.change}%
                </span>
                <span className="ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Your investment growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={portfolioData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Holdings</CardTitle>
            <CardDescription>Your best performing assets</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={holdingsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Market Watchlist</CardTitle>
          <CardDescription>Track your favorite stocks</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="stocks">
            <TabsList className="mb-4">
              <TabsTrigger value="stocks">Stocks</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
              <TabsTrigger value="forex">Forex</TabsTrigger>
            </TabsList>
            <TabsContent value="stocks" className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-7 gap-4 p-4 font-medium">
                  <div>Symbol</div>
                  <div>Name</div>
                  <div className="text-right">Price</div>
                  <div className="text-right">Change</div>
                  <div className="text-right">Market Cap</div>
                  <div className="text-right">Volume</div>
                  <div className="text-right">Sentiment</div>
                </div>
                {stocksData.map((stock) => (
                  <div key={stock.symbol} className="grid grid-cols-7 gap-4 border-t p-4">
                    <div className="font-medium">{stock.symbol}</div>
                    <div className="text-muted-foreground">{stock.name}</div>
                    <div className="text-right">${stock.price}</div>
                    <div className={`text-right ${stock.change > 0 ? "text-green-500" : "text-red-500"}`}>
                      {stock.change > 0 ? "+" : ""}
                      {stock.change}%
                    </div>
                    <div className="text-right text-muted-foreground">${stock.marketCap}B</div>
                    <div className="text-right text-muted-foreground">{stock.volume}M</div>
                    <div className="flex justify-end">
                      <Badge
                        variant={
                          stock.sentiment === "Bullish"
                            ? "success"
                            : stock.sentiment === "Bearish"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {stock.sentiment}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="crypto" className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-7 gap-4 p-4 font-medium">
                  <div>Symbol</div>
                  <div>Name</div>
                  <div className="text-right">Price</div>
                  <div className="text-right">Change</div>
                  <div className="text-right">Market Cap</div>
                  <div className="text-right">Volume</div>
                  <div className="text-right">Sentiment</div>
                </div>
                {cryptoData.map((crypto) => (
                  <div key={crypto.symbol} className="grid grid-cols-7 gap-4 border-t p-4">
                    <div className="font-medium">{crypto.symbol}</div>
                    <div className="text-muted-foreground">{crypto.name}</div>
                    <div className="text-right">${crypto.price}</div>
                    <div className={`text-right ${crypto.change > 0 ? "text-green-500" : "text-red-500"}`}>
                      {crypto.change > 0 ? "+" : ""}
                      {crypto.change}%
                    </div>
                    <div className="text-right text-muted-foreground">${crypto.marketCap}B</div>
                    <div className="text-right text-muted-foreground">${crypto.volume}M</div>
                    <div className="flex justify-end">
                      <Badge
                        variant={
                          crypto.sentiment === "Bullish"
                            ? "success"
                            : crypto.sentiment === "Bearish"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {crypto.sentiment}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="forex" className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium">
                  <div>Pair</div>
                  <div className="text-right">Rate</div>
                  <div className="text-right">Change</div>
                  <div className="text-right">High</div>
                  <div className="text-right">Low</div>
                  <div className="text-right">Sentiment</div>
                </div>
                {forexData.map((forex) => (
                  <div key={forex.pair} className="grid grid-cols-6 gap-4 border-t p-4">
                    <div className="font-medium">{forex.pair}</div>
                    <div className="text-right">{forex.rate}</div>
                    <div className={`text-right ${forex.change > 0 ? "text-green-500" : "text-red-500"}`}>
                      {forex.change > 0 ? "+" : ""}
                      {forex.change}%
                    </div>
                    <div className="text-right text-muted-foreground">{forex.high}</div>
                    <div className="text-right text-muted-foreground">{forex.low}</div>
                    <div className="flex justify-end">
                      <Badge
                        variant={
                          forex.sentiment === "Bullish"
                            ? "success"
                            : forex.sentiment === "Bearish"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {forex.sentiment}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null

  return (
    <ChartTooltip>
      <ChartTooltipContent>
        <div className="font-medium">{label || ""}</div>
        <div className="text-muted-foreground">Value: ${payload[0]?.value?.toLocaleString() || "0"}</div>
      </ChartTooltipContent>
    </ChartTooltip>
  )
}

const stats = [
  {
    title: "Total Portfolio Value",
    value: "$124,765.89",
    change: 2.5,
    icon: DollarSign,
    iconColor: "text-green-500",
  },
  {
    title: "Today's Change",
    value: "+$1,245.23",
    change: 1.2,
    icon: TrendingUp,
    iconColor: "text-green-500",
  },
  {
    title: "Open Positions",
    value: "12",
    change: -2,
    icon: TrendingDown,
    iconColor: "text-red-500",
  },
  {
    title: "Available Cash",
    value: "$34,567.00",
    change: 5.7,
    icon: DollarSign,
    iconColor: "text-green-500",
  },
]

const portfolioData = [
  { date: "Jan", value: 100000 },
  { date: "Feb", value: 105000 },
  { date: "Mar", value: 102000 },
  { date: "Apr", value: 110000 },
  { date: "May", value: 115000 },
  { date: "Jun", value: 118000 },
  { date: "Jul", value: 120000 },
  { date: "Aug", value: 124000 },
  { date: "Sep", value: 122000 },
  { date: "Oct", value: 128000 },
  { date: "Nov", value: 132000 },
  { date: "Dec", value: 124765 },
]

const holdingsData = [
  { name: "AAPL", value: 32500 },
  { name: "MSFT", value: 28700 },
  { name: "AMZN", value: 22400 },
  { name: "GOOGL", value: 18900 },
  { name: "TSLA", value: 15600 },
]

const stocksData = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 182.63,
    change: 1.25,
    marketCap: 2850.4,
    volume: 62.3,
    sentiment: "Bullish",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 337.22,
    change: 0.87,
    marketCap: 2510.6,
    volume: 28.7,
    sentiment: "Bullish",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 132.83,
    change: -0.54,
    marketCap: 1370.2,
    volume: 45.8,
    sentiment: "Neutral",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 125.3,
    change: 0.32,
    marketCap: 1580.7,
    volume: 18.9,
    sentiment: "Bullish",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 237.49,
    change: -1.87,
    marketCap: 753.8,
    volume: 124.5,
    sentiment: "Bearish",
  },
]

const cryptoData = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 43250.75,
    change: 2.34,
    marketCap: 845.2,
    volume: 28.7,
    sentiment: "Bullish",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 2345.18,
    change: 1.56,
    marketCap: 280.4,
    volume: 15.3,
    sentiment: "Bullish",
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 98.72,
    change: 5.23,
    marketCap: 42.8,
    volume: 8.7,
    sentiment: "Bullish",
  },
  {
    symbol: "ADA",
    name: "Cardano",
    price: 0.58,
    change: -0.87,
    marketCap: 20.5,
    volume: 3.2,
    sentiment: "Neutral",
  },
  {
    symbol: "DOT",
    name: "Polkadot",
    price: 7.82,
    change: -2.14,
    marketCap: 10.2,
    volume: 1.8,
    sentiment: "Bearish",
  },
]

const forexData = [
  {
    pair: "EUR/USD",
    rate: 1.0865,
    change: 0.12,
    high: 1.0882,
    low: 1.0845,
    sentiment: "Neutral",
  },
  {
    pair: "GBP/USD",
    rate: 1.2654,
    change: 0.28,
    high: 1.2675,
    low: 1.2612,
    sentiment: "Bullish",
  },
  {
    pair: "USD/JPY",
    rate: 149.82,
    change: -0.35,
    high: 150.24,
    low: 149.65,
    sentiment: "Bearish",
  },
  {
    pair: "USD/CAD",
    rate: 1.3542,
    change: -0.18,
    high: 1.3568,
    low: 1.3525,
    sentiment: "Bearish",
  },
  {
    pair: "AUD/USD",
    rate: 0.6578,
    change: 0.42,
    high: 0.6592,
    low: 0.6552,
    sentiment: "Bullish",
  },
]

