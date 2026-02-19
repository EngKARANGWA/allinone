 'use client'

import { useEffect, useState } from 'react'
import carServicesImg from './images/carservices.jpg'
import mcImg from './images/carservices.jpg'
import cateringImg from './images/catering.jpg'
import camera from './images/camera.jpg'
import mc from './images/mc.jpg'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Camera, Car, Mic2, Speaker, Users, Utensils } from 'lucide-react'

export function Hero() {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      id: 1,
      name: 'Photography',
      icon: Camera,
      bgImage: camera,
    },
    {
      id: 2,
      name: 'Vehicles',
      icon: Car,
      bgImage: carServicesImg,
    },
    {
      id: 3,
      name: 'MC Services',
      icon: Mic2,
      bgImage: mc,
    },
    {
      id: 4,
      name: 'Sound & Lighting',
      icon: Speaker,
      bgImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=800&fit=crop',
    },
    {
      id: 5,
      name: 'Coordination',
      icon: Users,
      bgImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&h=800&fit=crop',
    },
    {
      id: 6,
      name: 'Catering',
      icon: Utensils,
      bgImage: cateringImg,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Animated background images */}
      {services.map((service, index) => (
        <div
          key={service.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === activeService ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={typeof service.bgImage === 'string' ? service.bgImage : service.bgImage.src}
            alt={service.name}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to a simple SVG placeholder if the remote image fails to load
              const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(
                `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'><rect width='100%' height='100%' fill='%230b1220'/><text x='50%' y='50%' fill='%23ffffff' font-family='Arial,Helvetica,sans-serif' font-size='28' dominant-baseline='middle' text-anchor='middle'>Image unavailable</text></svg>`
              )}`
              e.currentTarget.src = placeholder
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
        </div>
      ))}

      {/* Welcome content overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-4 py-2 mb-6 animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Welcome to CeremonyHub</span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
              Plan Your Perfect{' '}
              <span className="text-white">Ceremony</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              Discover and book professional {services[activeService].name.toLowerCase()} services and more. 
              From weddings to graduations, we connect you with the best providers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white gap-2">
                Browse Services
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" className="border-2 border-white text-white hover:bg-white/10 gap-2">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-white/20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">500+</p>
                <p className="text-sm text-white/80 mt-2">Service Providers</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">2K+</p>
                <p className="text-sm text-white/80 mt-2">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">10K+</p>
                <p className="text-sm text-white/80 mt-2">Events Booked</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service carousel indicators at bottom */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === activeService
                    ? 'w-8 bg-white'
                    : 'w-3 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Show ${services[index].name}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Service icons navigation */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 md:left-8 md:right-8 z-20 pointer-events-none">
        <div className="flex justify-between">
          <button
            onClick={() => setActiveService((prev) => (prev - 1 + services.length) % services.length)}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 transition-all flex items-center justify-center text-white"
            aria-label="Previous service"
          >
            ←
          </button>
          <button
            onClick={() => setActiveService((prev) => (prev + 1) % services.length)}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 transition-all flex items-center justify-center text-white"
            aria-label="Next service"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
