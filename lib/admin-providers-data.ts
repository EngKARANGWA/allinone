export type ProviderStatus = 'active' | 'pending' | 'suspended'

export interface Provider {
  id: number
  name: string
  owner: string
  email: string
  phone: string
  category: string
  location: string
  status: ProviderStatus
  rating: number
  reviews: number
  services: number
  revenue: number
  joinedAt: string
  about: string
}

export const ADMIN_PROVIDERS_SEED: Provider[] = [
  { id: 1, name: 'Golden Lens Studio',  owner: 'Jean Paul Mugisha',  email: 'info@goldenlens.rw',    phone: '+250 788 100 001', category: 'photography', location: 'Kigali City', status: 'active',    rating: 4.9, reviews: 203, services: 3, revenue: 42000, joinedAt: 'Jan 10, 2024', about: 'Award-winning photography studio with over 10 years of experience covering weddings and high-end events across Rwanda.' },
  { id: 2, name: 'LuxRide Rwanda',       owner: 'Alice Uwimana',      email: 'bookings@luxride.rw',   phone: '+250 788 100 002', category: 'vehicles',    location: 'Remera',      status: 'active',    rating: 4.7, reviews: 54,  services: 2, revenue: 15600, joinedAt: 'Feb 3, 2024',  about: 'Premium chauffeur and luxury vehicle rental service for weddings, corporate events, and VIP transfers in Kigali.' },
  { id: 3, name: 'EventPro Rwanda',      owner: 'David Niyonzima',    email: 'hello@eventpro.rw',     phone: '+250 788 100 003', category: 'mc',          location: 'Downtown',    status: 'active',    rating: 4.9, reviews: 87,  services: 4, revenue: 29500, joinedAt: 'Mar 1, 2024',  about: 'Rwanda\'s leading event hosting company providing professional bilingual MCs and full event management services.' },
  { id: 4, name: 'SoundWave Pro',        owner: 'Eric Habimana',      email: 'info@soundwave.rw',     phone: '+250 788 100 004', category: 'sound',       location: 'Nyamirambo',  status: 'active',    rating: 4.5, reviews: 66,  services: 2, revenue: 18200, joinedAt: 'Mar 15, 2024', about: 'Professional audio-visual specialists delivering crystal-clear sound, stunning lighting, and DJ services for events of all sizes.' },
  { id: 5, name: 'Taste of Rwanda',      owner: 'Marie Claire Ingabire', email: 'orders@tasteofrwanda.rw', phone: '+250 788 100 005', category: 'catering', location: 'Kimironko',  status: 'active',    rating: 4.6, reviews: 203, services: 3, revenue: 67000, joinedAt: 'Apr 2, 2024',  about: 'Gourmet catering company specialising in both traditional Rwandan cuisine and international menus for weddings and corporate events.' },
  { id: 6, name: 'PlanIt Events',        owner: 'Samuel Kamanzi',     email: 'plan@planit.rw',        phone: '+250 788 100 006', category: 'mc',          location: 'Downtown',    status: 'active',    rating: 4.9, reviews: 158, services: 2, revenue: 54000, joinedAt: 'Apr 18, 2024', about: 'Rwanda\'s premier full-service event planning and coordination company handling everything from concept to completion.' },
  { id: 7, name: 'SkyShot Rwanda',       owner: 'Patrick Uwase',      email: 'fly@skyshot.rw',        phone: '+250 788 100 007', category: 'photography', location: 'Kigali City', status: 'pending',   rating: 0,   reviews: 0,   services: 1, revenue: 0,     joinedAt: 'May 1, 2024',  about: 'Specialist aerial photography and videography company offering licensed drone operations for events and real estate.' },
  { id: 8, name: 'Rwanda Flavors',       owner: 'Claudine Mukamana',  email: 'hello@rwandaflavors.rw', phone: '+250 788 100 008', category: 'catering',  location: 'Kimironko',   status: 'suspended', rating: 3.8, reviews: 22,  services: 1, revenue: 4200,  joinedAt: 'May 5, 2024',  about: 'Authentic Rwandan cuisine caterer specialising in traditional dishes and cultural ceremony catering.' },
]
