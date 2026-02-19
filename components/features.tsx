'use client'

import { Card } from '@/components/ui/card'
import { CheckCircle2, Clock, Shield, Users } from 'lucide-react'

const FEATURES = [
  {
    icon: CheckCircle2,
    title: 'Curated Services',
    description: 'All service providers are carefully vetted and verified for quality.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Book services at your convenience with flexible date and time options.',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Safe and secure payment processing with buyer protection.',
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Dedicated customer support team available 24/7 for assistance.',
  },
]

export function Features() {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CeremonyHub?</h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            We make it easy to find and book the perfect services for your ceremony.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-foreground/60 text-sm">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
