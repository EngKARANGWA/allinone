'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, MapPin, Star, Sparkles } from 'lucide-react'

const MOCK_SERVICES = [
  {
    id: 1,
    name: 'Luxury Wedding Photography',
    category: 'Photography',
    provider: 'Golden Lens Studio',
    price: 5000,
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1606216174052-a92cedc7c840?w=400&h=300&fit=crop',
    location: 'Downtown',
    description: 'Professional wedding photography with drone coverage',
    badge: 'Featured',
  },
  {
    id: 2,
    name: 'Premium Wedding Car Service',
    category: 'Vehicles',
    provider: 'Elite Chauffeur Co.',
    price: 2500,
    rating: 4.8,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1551632786-e91434bef721?w=400&h=300&fit=crop',
    location: 'City Wide',
    description: 'Luxury limousine service for your special day',
    badge: 'Popular',
  },
  {
    id: 3,
    name: 'Professional MC & Emcee Service',
    category: 'MC',
    provider: 'Star Event Productions',
    price: 3000,
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=300&fit=crop',
    location: 'Downtown',
    description: 'Energetic and professional master of ceremonies',
    badge: 'Trending',
  },
  {
    id: 4,
    name: 'Premium Sound & Lighting',
    category: 'Sound System',
    provider: 'Sonic Wave Events',
    price: 4000,
    rating: 4.6,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop',
    location: 'City Wide',
    description: 'State-of-the-art audio and lighting equipment',
  },
  {
    id: 5,
    name: 'Event Coordination Team',
    category: 'Coordination',
    provider: 'Perfect Day Events',
    price: 3500,
    rating: 4.9,
    reviews: 187,
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&h=300&fit=crop',
    location: 'Downtown',
    description: 'Full event planning and coordination services',
    badge: 'Award Winner',
  },
  {
    id: 6,
    name: 'Professional Catering Service',
    category: 'Catering',
    provider: 'Gourmet Delights',
    price: 6000,
    rating: 4.8,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561482?w=400&h=300&fit=crop',
    location: 'City Wide',
    description: 'Elegant catering for ceremonies of all sizes',
  },
]

export function ServicesCatalogEnhanced() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useEffect(() => {
    // Stagger animation for cards
    MOCK_SERVICES.forEach((service, index) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, service.id])
      }, index * 100)
    })
  }, [])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    )
  }

  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-white">
      <div className="container mx-auto px-4">
        {/* Section header with animation */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 mb-6 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Our Featured Services</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
            Browse Our Premium Services
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto animate-fade-in-up">
            Explore our curated selection of premium ceremony services. From photography to catering,
            we have everything you need for a perfect event.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_SERVICES.map((service) => (
            <Card
              key={service.id}
              className={`overflow-hidden transition-all duration-500 transform cursor-pointer ${
                visibleCards.includes(service.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              } ${
                hoveredId === service.id
                  ? 'shadow-2xl scale-105'
                  : 'hover:shadow-lg scale-100'
              }`}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image container */}
              <div className="relative h-48 bg-muted overflow-hidden group">
                <img
                  src={service.image}
                  alt={service.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    hoveredId === service.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                {/* Dark overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                    hoveredId === service.id ? 'opacity-100' : 'opacity-60'
                  }`}
                />

                {/* Badge and heart button */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(service.id)
                    }}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 transform ${
                      favorites.includes(service.id)
                        ? 'bg-red-500/80 text-white scale-110'
                        : 'bg-white/80 text-foreground hover:bg-white hover:scale-110'
                    }`}
                  >
                    <Heart
                      className="w-4 h-4 transition-all"
                      fill={favorites.includes(service.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>

                {/* Category and badge */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {service.category}
                  </span>
                  {service.badge && (
                    <span className="inline-block bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      ⭐ {service.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{service.name}</h3>
                <p className="text-sm text-foreground/60 mb-3 font-medium">{service.provider}</p>
                <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{service.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-pulse-soft" />
                    <span className="font-semibold">{service.rating}</span>
                  </div>
                  <span className="text-sm text-foreground/60">({service.reviews})</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-foreground/60 mb-4">
                  <MapPin className="w-4 h-4" />
                  {service.location}
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <div>
                    <p className="text-2xl font-bold text-primary">${service.price.toLocaleString()}</p>
                  </div>
                  <Button
                    size="sm"
                    className={`transition-all duration-300 ${
                      hoveredId === service.id
                        ? 'bg-primary text-primary-foreground scale-105'
                        : 'bg-primary/90 text-primary-foreground'
                    }`}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
