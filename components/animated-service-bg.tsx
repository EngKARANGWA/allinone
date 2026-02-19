'use client'

import { useEffect, useState } from 'react'
import { Camera, Car, Mic2, Speaker, Users, Utensils } from 'lucide-react'

export function AnimatedServiceBackground() {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      id: 1,
      name: 'Photography',
      icon: Camera,
      color: 'from-blue-500 to-blue-600',
      bgImage: 'https://images.unsplash.com/photo-1606216174052-a92cedc7c840?w=800&h=600&fit=crop',
    },
    {
      id: 2,
      name: 'Vehicles',
      icon: Car,
      color: 'from-blue-600 to-blue-700',
      bgImage: 'https://images.unsplash.com/photo-1551632786-e91434bef721?w=800&h=600&fit=crop',
    },
    {
      id: 3,
      name: 'MC Services',
      icon: Mic2,
      color: 'from-blue-500 to-cyan-500',
      bgImage: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&h=600&fit=crop',
    },
    {
      id: 4,
      name: 'Sound & Lighting',
      icon: Speaker,
      color: 'from-cyan-500 to-blue-500',
      bgImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop',
    },
    {
      id: 5,
      name: 'Coordination',
      icon: Users,
      color: 'from-blue-600 to-blue-500',
      bgImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop',
    },
    {
      id: 6,
      name: 'Catering',
      icon: Utensils,
      color: 'from-blue-500 to-indigo-500',
      bgImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561482?w=800&h=600&fit=crop',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-96 md:h-screen overflow-hidden bg-black">
      {/* Animated background images */}
      {services.map((service, index) => (
        <div
          key={service.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === activeService ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background image */}
          <img
            src={service.bgImage}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white z-10">
          <div className="mb-6 flex justify-center">
            {services[activeService].icon && (
              <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                {(() => {
                  const IconComponent = services[activeService].icon
                  return <IconComponent className="w-16 h-16" />
                })()}
              </div>
            )}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-pulse">
            {services[activeService].name}
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
            Professional {services[activeService].name.toLowerCase()} services for your perfect ceremony
          </p>
          <div className="flex gap-2 justify-center">
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

      {/* Service icons carousel at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-8 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300 ${
                    index === activeService
                      ? 'bg-white text-black scale-110'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Icon className="w-6 h-6 md:w-8 md:h-8" />
                  <span className="text-xs md:text-sm font-semibold text-center line-clamp-2">
                    {service.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
