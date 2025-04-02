"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export interface PricingTier {
  id: string
  name: string
  description: string
  price: {
    monthly: string | number
    yearly: string | number
  }
  features: string[]
  cta: string
  popular?: boolean
  highlighted?: boolean
}

interface PricingCardProps {
  tier: PricingTier
  paymentFrequency: string
}

export function PricingCard({ tier, paymentFrequency }: PricingCardProps) {
  const price =
    typeof tier.price[paymentFrequency as keyof typeof tier.price] === "number"
      ? `$${tier.price[paymentFrequency as keyof typeof tier.price]}`
      : tier.price[paymentFrequency as keyof typeof tier.price]

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl border p-6",
        tier.highlighted
          ? "border-conison-600 bg-conison-50/50 dark:bg-conison-950/50"
          : "border-border bg-card",
        tier.popular && "border-2 border-conison-600 shadow-lg"
      )}
    >
      {tier.popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <div className="rounded-full bg-conison-600 px-3 py-1 text-xs font-medium text-white">
            Most Popular
          </div>
        </div>
      )}

      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-medium">{tier.name}</h3>
      </div>

      <div className="mb-2 flex items-baseline gap-1">
        <span className="text-3xl font-bold">{price}</span>
        {typeof tier.price[paymentFrequency as keyof typeof tier.price] === "number" && (
          <span className="text-muted-foreground">/{paymentFrequency === "monthly" ? "mo" : "yr"}</span>
        )}
      </div>

      <p className="mb-6 text-sm text-muted-foreground">{tier.description}</p>

      <div className="mt-auto">
        <Button
          asChild
          className={cn(
            "w-full",
            tier.highlighted || tier.popular
              ? "bg-conison-600 hover:bg-conison-700 text-white"
              : ""
          )}
          variant={tier.highlighted || tier.popular ? "default" : "outline"}
        >
          <Link to="/contact">{tier.cta}</Link>
        </Button>

        <ul className="mt-6 space-y-3">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-conison-600 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 