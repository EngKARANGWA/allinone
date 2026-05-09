export type ServiceStatus = 'active' | 'pending' | 'suspended'
export type AdminAvailability = 'available' | 'limited' | 'booked'

export interface AdminService {
  id: number
  name: string
  provider: string
  category: string
  description: string
  price: number
  location: string
  availability: AdminAvailability
  status: ServiceStatus
  rating: number
  reviews: number
  createdAt: string
}

export const ADMIN_SERVICES_SEED: AdminService[] = [
  { id: 1, name: 'Luxury Wedding Photography', provider: 'Golden Lens Studio', category: 'photography', description: 'Professional wedding & event photography with 10+ years experience. We capture every emotion and detail with artistic precision using state-of-the-art equipment.',          price: 5000, location: 'Kigali City', availability: 'available', status: 'active',    rating: 4.9, reviews: 203, createdAt: 'Jan 10, 2024' },
  { id: 2, name: 'Premium Wedding Vehicles',   provider: 'LuxRide Rwanda',     category: 'vehicles',    description: 'Luxury car hire including Mercedes S-Class, BMW 7 Series, and stretch limousines. All vehicles are fully decorated and chauffeur-driven.',                            price: 1200, location: 'Remera',      availability: 'limited',   status: 'active',    rating: 4.7, reviews: 54,  createdAt: 'Feb 3, 2024'  },
  { id: 3, name: 'Professional MC Services',   provider: 'EventPro Rwanda',    category: 'mc',          description: 'Experienced bilingual MCs for weddings, graduations, and corporate events. We bring energy, professionalism and seamless event flow.',                              price: 2500, location: 'Downtown',    availability: 'available', status: 'active',    rating: 4.9, reviews: 87,  createdAt: 'Mar 1, 2024'  },
  { id: 4, name: 'Sound & Stage Lighting',     provider: 'SoundWave Pro',      category: 'sound',       description: 'Premium audio-visual equipment with professional technicians. Includes high-end speakers, LED lighting rigs, wireless microphones, and special effects.',            price: 1800, location: 'Nyamirambo',  availability: 'available', status: 'active',    rating: 4.5, reviews: 66,  createdAt: 'Mar 15, 2024' },
  { id: 5, name: 'Full Event Catering',        provider: 'Taste of Rwanda',    category: 'catering',    description: 'Complete catering solutions from appetizers to desserts. Local and international menus tailored to your guests with full table setup and cleanup included.',         price: 3000, location: 'Kimironko',   availability: 'available', status: 'active',    rating: 4.6, reviews: 203, createdAt: 'Apr 2, 2024'  },
  { id: 6, name: 'Event Coordination',         provider: 'PlanIt Events',      category: 'mc',          description: 'End-to-end event planning and coordination services. Budget management, vendor selection, timeline planning, and on-the-day coordination.',                        price: 4000, location: 'Downtown',    availability: 'booked',    status: 'active',    rating: 4.9, reviews: 158, createdAt: 'Apr 18, 2024' },
  { id: 7, name: 'Drone Photography',          provider: 'SkyShot Rwanda',     category: 'photography', description: 'Aerial photography and videography for events and venues. Stunning bird-eye views and cinematic footage captured by licensed drone operators.',                    price: 2200, location: 'Kigali City', availability: 'available', status: 'pending',   rating: 0,   reviews: 0,   createdAt: 'May 1, 2024'  },
  { id: 8, name: 'Traditional Cuisine',        provider: 'Rwanda Flavors',     category: 'catering',    description: 'Authentic Rwandan dishes for cultural events and ceremonies. Umutsima, isombe, brochettes, and more — all freshly prepared by experienced local chefs.',           price: 1500, location: 'Kimironko',   availability: 'limited',   status: 'suspended', rating: 3.8, reviews: 22,  createdAt: 'May 5, 2024'  },
]
