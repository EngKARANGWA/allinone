'use client'

import { Card } from '@/components/ui/card'
import { CheckCircle, Award, Zap, Shield, Users, Smile } from 'lucide-react'

const FEATURES = [
  {
    icon: CheckCircle,
    title: 'Easy Booking',
    description: 'Browse and book services in minutes with our intuitive platform',
    delay: 0,
  },
  {
    icon: Award,
    title: 'Verified Providers',
    description: 'All service providers are thoroughly vetted and verified',
    delay: 0.2,
  },
  {
    icon: Zap,
    title: 'Instant Confirmation',
    description: 'Get real-time booking confirmations and updates',
    delay: 0.4,
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Your payments are protected with industry-leading security',
    delay: 0.6,
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: '24/7 customer support to assist you throughout your journey',
    delay: 0.8,
  },
  {
    icon: Smile,
    title: 'Satisfaction Guaranteed',
    description: 'We ensure your complete satisfaction with every service',
    delay: 1.0,
  },
]

export function AnimatedFeatures() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
            Why Choose CeremonyHub?
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto animate-fade-in-up">
            We provide everything you need to plan and execute your perfect ceremony with ease and confidence
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border-primary/20 hover:border-primary/50 bg-white/50 backdrop-blur-sm animate-fade-in-up"
                style={{
                  animationDelay: `${feature.delay}s`,
                }}
              >
                <div className="mb-4 inline-block p-3 bg-primary/10 rounded-lg">
                  <Icon className="w-6 h-6 text-primary animate-float" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/60">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
