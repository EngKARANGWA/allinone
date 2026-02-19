 'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Star, MapPin, Calendar, Users, Heart } from 'lucide-react'
import cameraImg from '@/components/images/camera.jpg'
import carImg from '@/components/images/carservices.jpg'
import cateringImg from '@/components/images/catering.jpg'
import dj from '@/components/images/dj.jpg'
import plan from '@/components/images/plan.jpg'
import protocal from '@/components/images/protocal.jpeg'

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all'|'photography'|'vehicles'|'mc'|'sound'|'catering'>('all')
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Browse All Services</h1>
          <p className="text-foreground/60">Find the perfect services for your ceremony</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {(
            [
              { key: 'all', label: 'All Services' },
              { key: 'photography', label: 'Photography' },
              { key: 'vehicles', label: 'Vehicles' },
              { key: 'mc', label: 'MC & Events' },
              { key: 'sound', label: 'Sound Systems' },
              { key: 'catering', label: 'Catering' },
            ] as const
          ).map((cat) => (
            <Button
              key={cat.key}
              variant={selectedCategory === cat.key ? undefined : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat.key)}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Service Grid - Will be populated with database data */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(() => {
            // Map categories to service indices as requested
            const mapping: Record<string, number[]> = {
              all: [1, 2, 3, 4, 5, 6],
              mc: [1], // MC & Events -> Service Name 1
              photography: [2], // Photography -> Service Name 2
              vehicles: [3], // Vehicles -> Service Name 3
              catering: [4], // Catering -> Service Name 4
              sound: [5], // Sound Systems -> Service Name 5
            }

            const indices = mapping[selectedCategory] || mapping.all
            const imgs = [protocal, cameraImg, carImg, cateringImg, dj, plan]

            return indices.map((i) => {
              const img = imgs[(i - 1) % imgs.length]
              return (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 w-full bg-muted overflow-hidden">
                    <img src={img.src ?? img} alt={`Service ${i}`} className="w-full h-full object-cover" />
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-2">Service Name {i}</h3>
                    <p className="text-sm text-foreground/60 mb-4">Provider Name</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">4.8</span>
                      <span className="text-sm text-foreground/60">(120 reviews)</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-foreground/60 mb-4">
                      <MapPin className="w-4 h-4" />
                      Downtown
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-primary">$3,000</div>
                      <Button size="sm">Book Now</Button>
                    </div>
                  </div>
                </Card>
              )
            })
          })()}
        </div>
      </div>

      <Footer />
    </main>
  )
}
