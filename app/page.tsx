import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import Hero from "@/components/hero"
import AdvancedDashboard from "@/components/advanced-dashboard"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <section className="container py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">Why Choose Our Platform</h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Our AI-powered platform provides real-time insights, personalized recommendations, and advanced analytics to
            help you make informed trading decisions.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-lg border bg-card p-6 shadow-sm">
              <feature.icon className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button asChild size="lg">
            <Link href="/features">
              Explore All Features <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
      <AdvancedDashboard />
      <section className="bg-muted py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight">Testimonials</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              See what our users are saying about their experience with our platform.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-primary">
                    <img
                      src={`/placeholder.svg?height=48&width=48&text=${testimonial.name.charAt(0)}`}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

const features = [
  {
    title: "AI-Powered Insights",
    description:
      "Get real-time market analysis and personalized recommendations based on your trading history and preferences.",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 1 1-4-4" />
        <path d="M18 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        <path d="M10 18v.01" />
        <path d="M6 18v.01" />
        <path d="M14 18v.01" />
        <path d="M18 14v.01" />
        <path d="M18 10v.01" />
        <path d="M18 6v.01" />
      </svg>
    ),
  },
  {
    title: "Advanced Analytics",
    description:
      "Visualize market trends and patterns with our interactive charts and comprehensive data analysis tools.",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M3 3v18h18" />
        <path d="M18 12V8" />
        <path d="M14 16v-2" />
        <path d="M10 12v-1" />
        <path d="M6 16v-4" />
      </svg>
    ),
  },
  {
    title: "Real-Time Alerts",
    description:
      "Stay informed with instant notifications about market movements, price changes, and trading opportunities.",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    ),
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Day Trader",
    quote:
      "This platform has completely transformed my trading strategy. The AI insights have helped me make more informed decisions and increase my returns.",
  },
  {
    name: "Michael Chen",
    role: "Investment Analyst",
    quote:
      "The advanced analytics tools are unmatched. I can quickly identify trends and patterns that would have taken hours to discover manually.",
  },
  {
    name: "Emma Rodriguez",
    role: "Retail Investor",
    quote:
      "As a beginner in trading, this platform has been invaluable. The chat assistant provides clear explanations and guidance that have helped me learn quickly.",
  },
]

