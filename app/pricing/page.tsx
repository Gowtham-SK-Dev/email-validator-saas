import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const plans = [
  {
    name: "Free Trial",
    price: "₹0",
    hits: "100 hits",
    validity: "7 days",
    suitableFor: "Testing",
    features: ["API Access", "Email Validation", "Basic Support"],
  },
  {
    name: "Starter",
    price: "₹50",
    hits: "300 hits",
    validity: "One-time",
    suitableFor: "Small projects",
    features: ["API Access", "Email Validation", "Standard Support", "Syntax Checking"],
  },
  {
    name: "Basic",
    price: "₹100",
    hits: "650 hits",
    validity: "One-time",
    suitableFor: "Freelancers",
    features: ["API Access", "Email Validation", "Priority Support", "Syntax Checking", "Domain Validation"],
  },
  {
    name: "Standard",
    price: "₹200",
    hits: "1400 hits",
    validity: "One-time",
    suitableFor: "Startups",
    features: [
      "API Access",
      "Email Validation",
      "Priority Support",
      "Syntax Checking",
      "Domain Validation",
      "MX Record Checking",
    ],
  },
  {
    name: "Pro",
    price: "₹500",
    hits: "3500 hits",
    validity: "One-time",
    suitableFor: "Businesses",
    features: [
      "API Access",
      "Email Validation",
      "Priority Support",
      "Syntax Checking",
      "Domain Validation",
      "MX Record Checking",
      "SMTP Verification",
    ],
  },
  {
    name: "Unlimited (1M)",
    price: "₹1000",
    hits: "Unlimited",
    validity: "1 Month",
    suitableFor: "API Startups",
    features: [
      "API Access",
      "Email Validation",
      "Priority Support",
      "Syntax Checking",
      "Domain Validation",
      "MX Record Checking",
      "SMTP Verification",
      "Disposable Email Detection",
    ],
  },
  {
    name: "Unlimited (3M)",
    price: "₹2500",
    hits: "Unlimited",
    validity: "3 Months",
    suitableFor: "Agencies",
    features: [
      "API Access",
      "Email Validation",
      "Priority Support",
      "Syntax Checking",
      "Domain Validation",
      "MX Record Checking",
      "SMTP Verification",
      "Disposable Email Detection",
      "Catch-All Detection",
    ],
  },
  {
    name: "Unlimited (6M)",
    price: "₹4500",
    hits: "Unlimited",
    validity: "6 Months",
    suitableFor: "SaaS",
    features: [
      "API Access",
      "Email Validation",
      "Priority Support",
      "Syntax Checking",
      "Domain Validation",
      "MX Record Checking",
      "SMTP Verification",
      "Disposable Email Detection",
      "Catch-All Detection",
      "Role Account Detection",
    ],
  },
  {
    name: "Unlimited (1Y)",
    price: "₹7000",
    hits: "Unlimited",
    validity: "1 Year",
    suitableFor: "Enterprises",
    features: [
      "API Access",
      "Email Validation",
      "Priority Support",
      "Syntax Checking",
      "Domain Validation",
      "MX Record Checking",
      "SMTP Verification",
      "Disposable Email Detection",
      "Catch-All Detection",
      "Role Account Detection",
      "Dedicated Support",
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pricing Plans</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the perfect plan for your email verification needs
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <Card key={plan.name} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.suitableFor}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-4">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">
                        {plan.validity !== "One-time" ? `/ ${plan.validity}` : ""}
                      </span>
                    </div>
                    <p className="mb-2 text-muted-foreground">
                      {plan.hits} • {plan.validity}
                    </p>
                    <ul className="space-y-2 mt-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
