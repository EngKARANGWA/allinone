'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import mc from './images/mc.jpg'
import camera from './images/camera.jpg'
import carservices from './images/carservices.jpg'
import catering from './images/catering.jpg'
import dj from './images/dj.jpg'

const SERVICES = [
  {
    id: 1,
    name: 'Photography',
    category: 'photography',
    description: 'Professional photographers for your special day',
    image: camera,
    providers: 150,
  },
  {
    id: 2,
    name: 'Wedding Vehicles',
    category: 'vehicles',
    description: 'Luxury cars and limousines for transport',
    image: carservices,
    providers: 85,
  },
  {
    id: 3,
    name: 'MC Services',
    category: 'mc',
    description: 'Professional emcees and event hosts',
    image: mc,
    providers: 120,
  },
  {
    id: 4,
    name: 'Sound & Lighting',
    category: 'sound',
    description: 'Premium audio and visual equipment',
    image: dj,
    providers: 95,
  },
]

export function ServiceShowcase() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [visibleIndices, setVisibleIndices] = useState<number[]>([])
  const router = useRouter()

  useEffect(() => {
    // Animate cards in on mount
    SERVICES.forEach((_, index) => {
      setTimeout(() => {
        setVisibleIndices((prev) => [...prev, index])
      }, index * 150)
    })
  }, [])

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Service Categories</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Explore our comprehensive range of ceremony services
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <Card
              key={service.id}
              className={`overflow-hidden transition-all duration-500 transform ${
                visibleIndices.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              } hover:shadow-xl cursor-pointer group`}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => router.push(`/services?category=${service.category}`)}
            >
              {/* Image container */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={typeof service.image === 'string' ? service.image : service.image.src}
                  alt={service.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    hoveredId === service.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                {/* Dark overlay on hover */}
                <div
                  className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                    hoveredId === service.id ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-sm text-foreground/60 mb-4">{service.description}</p>

                {/* Provider count */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-foreground/70">{service.providers} providers</span>
                  <span className="text-xs font-semibold text-primary">Available</span>
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full transition-all duration-300 gap-2 ${
                    hoveredId === service.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/services?category=${service.category}`)
                  }}
                >
                  Explore
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
