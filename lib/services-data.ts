import cameraImg from '@/components/images/camera.jpg'
import carImg from '@/components/images/carservices.jpg'
import cateringImg from '@/components/images/catering.jpg'
import djImg from '@/components/images/dj.jpg'
import planImg from '@/components/images/plan.jpg'
import protocalImg from '@/components/images/protocal.jpeg'

export type ServiceImage = typeof cameraImg

export interface PricingTier {
  label: string
  price: string
  desc: string
}

export interface Service {
  id: number
  name: string
  provider: string
  providerTitle: string
  category: string
  img: ServiceImage
  gallery: ServiceImage[]
  price: number
  location: string
  availability: string
  rating: number
  reviewCount: number
  responseTime: string
  bookingsCount: number
  responseRate: string
  cancellationRate: string
  memberSince: string
  description: string
  about: string
  included: string[]
  pricingTiers: PricingTier[]
  coverageOptions: string[]
}

export const ALL_SERVICES: Service[] = [
  {
    id: 1,
    name: 'MC & Events',
    provider: 'EventPro Rwanda',
    providerTitle: 'Professional MC & Event Host',
    category: 'mc',
    img: protocalImg,
    gallery: [protocalImg, cameraImg, planImg, cateringImg],
    price: 2500,
    location: 'Downtown',
    availability: 'available',
    rating: 4.9,
    reviewCount: 87,
    responseTime: '1 hour',
    bookingsCount: 203,
    responseRate: '99%',
    cancellationRate: '1%',
    memberSince: 'Jan 2023',
    description: 'Professional MC services for weddings, corporate events, and ceremonies.',
    about:
      'EventPro Rwanda provides experienced MCs who bring energy, professionalism, and joy to your event. With over 8 years of hosting experience across Rwanda, our team ensures smooth event flow and unforgettable moments for every guest.',
    included: [
      'Pre-event consultation & scripting',
      'Full event coordination',
      'Bilingual hosting (English & Kinyarwanda)',
      'Microphone & PA system setup',
      'Guest engagement activities',
      'Timeline management',
    ],
    pricingTiers: [
      { label: 'Basic', price: '$1,500', desc: '4-hour coverage' },
      { label: 'Standard', price: '$2,500', desc: '8-hour full event' },
      { label: 'Premium', price: '$3,500', desc: 'Full day + rehearsal' },
    ],
    coverageOptions: ['Ceremony Only', 'Reception Only', 'Full Day', 'Multi-Day Events'],
  },
  {
    id: 2,
    name: 'Photography',
    provider: 'Golden Lens Studio',
    providerTitle: 'Professional Photography',
    category: 'photography',
    img: cameraImg,
    gallery: [cameraImg, protocalImg, planImg, cateringImg],
    price: 5000,
    location: 'Kigali City',
    availability: 'available',
    rating: 4.8,
    reviewCount: 120,
    responseTime: '2 hours',
    bookingsCount: 156,
    responseRate: '98%',
    cancellationRate: '2%',
    memberSince: 'May 2023',
    description: 'Luxury wedding and event photography capturing timeless memories.',
    about:
      'Golden Lens Studio provides professional wedding and event photography with over 10 years of experience. Our team specializes in capturing emotional moments with artistic precision, using state-of-the-art equipment to ensure stunning results.',
    included: [
      'Pre-wedding consultation',
      '8–10 hours of coverage',
      '2 professional photographers',
      'Drone photography & videography',
      'Professional editing & retouching',
      '500+ edited photos delivered',
      'Album design & printing',
      '24-hour highlight reel',
    ],
    pricingTiers: [
      { label: 'Basic', price: '$3,500', desc: 'Ceremony only (4h)' },
      { label: 'Standard', price: '$5,000', desc: 'Full day (10h)' },
      { label: 'Premium', price: '$7,500', desc: 'Full day + drone + album' },
    ],
    coverageOptions: ['Ceremony Only (4h)', 'Half Day (6h)', 'Full Day (10h)', 'Extended (12h+)'],
  },
  {
    id: 3,
    name: 'Wedding Vehicles',
    provider: 'LuxRide Rwanda',
    providerTitle: 'Luxury Wedding Transport',
    category: 'vehicles',
    img: carImg,
    gallery: [carImg, protocalImg, planImg, cameraImg],
    price: 1200,
    location: 'Remera',
    availability: 'limited',
    rating: 4.7,
    reviewCount: 54,
    responseTime: '3 hours',
    bookingsCount: 89,
    responseRate: '95%',
    cancellationRate: '3%',
    memberSince: 'Aug 2023',
    description: 'Luxury vehicles for wedding processions, transfers, and VIP guest transport.',
    about:
      'LuxRide Rwanda offers a premium fleet of wedding cars including classic limousines, luxury SUVs, and beautifully decorated wedding vehicles. We ensure your arrival and departure are as memorable as the event itself.',
    included: [
      'Professional chauffeur service',
      'Decorated wedding car',
      'Champagne & welcome amenities',
      'Hotel or venue pickup & drop-off',
      'On-call for entire event day',
      'Flexible route planning',
    ],
    pricingTiers: [
      { label: 'Economy', price: '$800', desc: '1 luxury sedan (6h)' },
      { label: 'Standard', price: '$1,200', desc: '2 vehicles (8h)' },
      { label: 'Premium', price: '$2,000', desc: 'Full fleet (all day)' },
    ],
    coverageOptions: ['Ceremony Transfer', 'Reception Transfer', 'Full Day', 'Airport Pickup'],
  },
  {
    id: 4,
    name: 'Catering Services',
    provider: 'Taste of Rwanda',
    providerTitle: 'Gourmet Event Catering',
    category: 'catering',
    img: cateringImg,
    gallery: [cateringImg, planImg, protocalImg, cameraImg],
    price: 3000,
    location: 'Kimironko',
    availability: 'available',
    rating: 4.6,
    reviewCount: 203,
    responseTime: '4 hours',
    bookingsCount: 340,
    responseRate: '96%',
    cancellationRate: '2%',
    memberSince: 'Mar 2022',
    description: 'Exquisite catering from traditional Rwandan dishes to international cuisine.',
    about:
      'Taste of Rwanda brings gourmet catering to your event with locally sourced ingredients, professional chefs, and beautifully presented dishes. From traditional Rwandan cuisine to international menus, we cater to every taste and dietary need.',
    included: [
      'Menu consultation & tasting session',
      'Professional kitchen team',
      'Full table setup & linen décor',
      'Buffet or plated service options',
      'Vegetarian & dietary accommodations',
      'Post-event cleanup',
    ],
    pricingTiers: [
      { label: 'Basic', price: '$2,000', desc: 'Buffet up to 100 guests' },
      { label: 'Standard', price: '$3,000', desc: 'Plated up to 150 guests' },
      { label: 'Premium', price: '$5,000', desc: 'Fine dining up to 250 guests' },
    ],
    coverageOptions: ['Buffet Style', 'Plated Service', 'Family Style', 'Cocktail Reception'],
  },
  {
    id: 5,
    name: 'Sound & Lighting',
    provider: 'SoundWave Pro',
    providerTitle: 'Audio & Visual Specialists',
    category: 'sound',
    img: djImg,
    gallery: [djImg, cameraImg, protocalImg, planImg],
    price: 1800,
    location: 'Nyamirambo',
    availability: 'available',
    rating: 4.5,
    reviewCount: 66,
    responseTime: '2 hours',
    bookingsCount: 112,
    responseRate: '97%',
    cancellationRate: '2%',
    memberSince: 'Jun 2023',
    description: 'Professional sound systems, DJ services, and stunning event lighting solutions.',
    about:
      'SoundWave Pro delivers crystal-clear audio and spectacular lighting for weddings and events across Kigali. Our experienced DJs read the room and keep your guests energized throughout the night.',
    included: [
      'Professional DJ & MC combo',
      'High-end sound system setup',
      'LED dance floor lighting rig',
      'Wireless microphones (×2)',
      'Custom playlist consultation',
      'Smoke machine & special effects',
    ],
    pricingTiers: [
      { label: 'Basic', price: '$1,000', desc: 'Sound only (6h)' },
      { label: 'Standard', price: '$1,800', desc: 'Sound + Lighting (8h)' },
      { label: 'Premium', price: '$3,000', desc: 'Full AV + DJ (all day)' },
    ],
    coverageOptions: ['Sound Only', 'Lighting Only', 'DJ Package', 'Full AV Setup'],
  },
  {
    id: 6,
    name: 'Event Planning',
    provider: 'PlanIt Events',
    providerTitle: 'Full-Service Event Management',
    category: 'mc',
    img: planImg,
    gallery: [planImg, protocalImg, cateringImg, cameraImg],
    price: 4000,
    location: 'Downtown',
    availability: 'booked',
    rating: 4.9,
    reviewCount: 158,
    responseTime: '1 hour',
    bookingsCount: 278,
    responseRate: '99%',
    cancellationRate: '1%',
    memberSince: 'Feb 2022',
    description: 'End-to-end event planning and coordination for flawless ceremonies.',
    about:
      "PlanIt Events is Rwanda's premier event management company. From initial concept to final execution, we handle every detail — vendors, logistics, décor, and timeline — so you can fully enjoy your special day without stress.",
    included: [
      'Full event concept & design',
      'Vendor selection & coordination',
      'Budget planning & management',
      'Day-of coordination team',
      'Timeline & logistics planning',
      'Post-event wrap-up & reporting',
    ],
    pricingTiers: [
      { label: 'Partial', price: '$2,500', desc: 'Day-of coordination only' },
      { label: 'Standard', price: '$4,000', desc: 'Full planning (3 months)' },
      { label: 'Premium', price: '$7,000', desc: 'Luxury end-to-end planning' },
    ],
    coverageOptions: ['Day-Of Only', 'Month-Of', 'Full Planning', 'Destination Events'],
  },
]
