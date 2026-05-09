"use client"

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Calendar } from '@/components/ui/calendar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Star, MapPin, Clock, Users, Heart, Share2, ChevronRight,
  CheckCircle2, ArrowLeft, Phone, Mail, ShieldCheck,
} from 'lucide-react'
import { ALL_SERVICES } from '@/lib/services-data'

function barWidthClass(pct: number): string {
  if (pct <= 0)  return 'w-0'
  if (pct <= 15) return 'w-[15%]'
  if (pct <= 25) return 'w-1/4'
  if (pct <= 35) return 'w-1/3'
  if (pct <= 50) return 'w-1/2'
  if (pct <= 65) return 'w-[65%]'
  if (pct <= 75) return 'w-3/4'
  if (pct <= 85) return 'w-[85%]'
  return 'w-full'
}

const AVAILABILITY_STYLE: Record<string, string> = {
  available: 'bg-green-100 text-green-700 border-green-200',
  limited:   'bg-yellow-100 text-yellow-700 border-yellow-200',
  booked:    'bg-red-100 text-red-700 border-red-200',
}

const SEED_REVIEWS = [
  { id: 1, name: 'Sarah Smith',   date: 'March 2024',    rating: 5, text: 'Absolutely amazing! The team was professional, friendly, and exceeded our expectations. Highly recommended for any event.' },
  { id: 2, name: 'James Mugisha', date: 'January 2024',  rating: 5, text: 'Outstanding service from start to finish. Every detail was handled perfectly — we could not have asked for more.' },
  { id: 3, name: 'Alice Uwera',   date: 'December 2023', rating: 4, text: 'Very professional and responsive. Delivered exactly what was promised. Will definitely book again!' },
]

export default function ServiceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params?.id) || 1

  const service = ALL_SERVICES.find((s) => s.id === id) ?? ALL_SERVICES[0]

  const [activeImage, setActiveImage] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [wishlisted, setWishlisted] = useState(false)

  const [reviewRating, setReviewRating] = useState(0)
  const [reviewHover, setReviewHover] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [reviews, setReviews] = useState(SEED_REVIEWS)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  const today = new Date()
  const bookedDates = [
    (() => { const d = new Date(today); d.setDate(d.getDate() + (2 + (id % 3))); return d })(),
    (() => { const d = new Date(today); d.setDate(d.getDate() + (5 + (id % 4))); return d })(),
  ]
  const disabledDays: Parameters<typeof Calendar>[0]['disabled'] = [
    { before: today },
    { dayOfWeek: [0, 6] },
    ...bookedDates,
  ]

  const submitReview = () => {
    if (!reviewRating || !reviewText.trim()) return
    setReviews((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: 'You',
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        rating: reviewRating,
        text: reviewText.trim(),
      },
    ])
    setReviewRating(0)
    setReviewText('')
    setReviewSubmitted(true)
    setTimeout(() => setReviewSubmitted(false), 3000)
  }

  const handleConfirm = () => {
    alert(`Booking confirmed for ${service.name} on ${selectedDate?.toDateString() ?? ''}`)
    setIsBookingOpen(false)
    setSelectedDate(undefined)
  }

  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-foreground/60 mb-6">
          <button type="button" onClick={() => router.push('/services')} className="flex items-center gap-1 hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Services
          </button>
          <span>/</span>
          <span className="capitalize">{service.category}</span>
          <span>/</span>
          <span className="text-foreground font-medium">{service.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left / Main ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Image Gallery */}
            <div>
              <div className="relative mb-3 rounded-2xl overflow-hidden aspect-video bg-muted">
                <img
                  src={(service.gallery[activeImage] as { src: string }).src}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold border capitalize ${AVAILABILITY_STYLE[service.availability]}`}>
                    {service.availability}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {service.gallery.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === i ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img
                      src={(img as { src: string }).src}
                      alt={`${service.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Header Info */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-primary capitalize mb-1">{service.category}</p>
                  <h1 className="text-3xl font-bold mb-1">{service.name}</h1>
                  <p className="text-foreground/60">{service.description}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setWishlisted(!wishlisted)}
                    aria-label="Add to wishlist"
                  >
                    <Heart className={`w-5 h-5 transition-colors ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button size="icon" variant="outline" aria-label="Share">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-5 mt-4">
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className={`w-4 h-4 ${i <= Math.round(service.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-foreground/20'}`} />
                    ))}
                  </div>
                  <span className="font-semibold">{service.rating}</span>
                  <span className="text-sm text-foreground/60">({service.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-foreground/60">
                  <MapPin className="w-4 h-4" />
                  {service.location}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-foreground/60">
                  <Users className="w-4 h-4" />
                  {service.bookingsCount} bookings
                </div>
              </div>

              {/* Price + CTA bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-primary/5 border border-primary/20 rounded-xl mt-6">
                <div>
                  <p className="text-xs text-foreground/50 mb-0.5">Starting price</p>
                  <p className="text-3xl font-bold text-primary">${service.price.toLocaleString()}</p>
                </div>
                <div className="flex gap-3 mt-3 sm:mt-0">
                  <Button variant="outline" className="gap-2">
                    <Phone className="w-4 h-4" /> Contact
                  </Button>
                  <Button
                    className="gap-2"
                    disabled={service.availability === 'booked'}
                    onClick={() => setIsBookingOpen(true)}
                  >
                    {service.availability === 'booked' ? 'Fully Booked' : (<>Book Now <ChevronRight className="w-4 h-4" /></>)}
                  </Button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview">
              <TabsList className="mb-6 w-full sm:w-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              </TabsList>

              {/* Overview */}
              <TabsContent value="overview" className="space-y-5">
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-3">About This Service</h2>
                  <p className="text-foreground/70 leading-relaxed">{service.about}</p>
                </Card>
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4">What's Included</h2>
                  <ul className="grid sm:grid-cols-2 gap-2.5">
                    {service.included.map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>

              {/* Details */}
              <TabsContent value="details" className="space-y-5">
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-5">Coverage Options</h2>
                  <div className="flex flex-wrap gap-2">
                    {service.coverageOptions.map((opt) => (
                      <Badge key={opt} variant="secondary" className="text-sm px-3 py-1">{opt}</Badge>
                    ))}
                  </div>
                </Card>
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-5">Pricing Tiers</h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {service.pricingTiers.map((tier, i) => (
                      <div
                        key={tier.label}
                        className={`rounded-xl border p-4 text-center ${i === 1 ? 'border-primary bg-primary/5' : 'border-border'}`}
                      >
                        {i === 1 && <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wide">Most Popular</p>}
                        <p className="font-bold text-lg">{tier.label}</p>
                        <p className="text-2xl font-bold text-primary my-2">{tier.price}</p>
                        <p className="text-sm text-foreground/60">{tier.desc}</p>
                        <Button size="sm" variant={i === 1 ? 'default' : 'outline'} className="mt-4 w-full" onClick={() => setIsBookingOpen(true)}>
                          Select
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Reviews */}
              <TabsContent value="reviews" className="space-y-4">
                {/* Summary bar */}
                <Card className="p-5 flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold">{avgRating.toFixed(1)}</p>
                    <div className="flex justify-center mt-1">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className={`w-4 h-4 ${i <= Math.round(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-foreground/20'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-foreground/50 mt-1">{reviews.length} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1">
                    {[5,4,3,2,1].map((star) => {
                      const count = reviews.filter((r) => r.rating === star).length
                      const pct = reviews.length ? (count / reviews.length) * 100 : 0
                      return (
                        <div key={star} className="flex items-center gap-2 text-xs">
                          <span className="w-3 text-right">{star}</span>
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className={`h-full bg-yellow-400 rounded-full ${barWidthClass(pct)}`} />
                          </div>
                          <span className="w-4 text-foreground/50">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </Card>

                {reviews.map((r) => (
                  <Card key={r.id} className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {r.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-sm">{r.name}</p>
                          <p className="text-xs text-foreground/50">{r.date}</p>
                        </div>
                        <div className="flex mt-0.5">
                          {[1,2,3,4,5].map((j) => (
                            <Star key={j} className={`w-3.5 h-3.5 ${j <= r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-foreground/20'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/70 leading-relaxed">{r.text}</p>
                  </Card>
                ))}

                {/* Write a review */}
                <Card className="p-5 border-dashed">
                  <h3 className="font-bold mb-4">Write a Review</h3>
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Your Rating</p>
                    <div className="flex gap-1 items-center">
                      {[1,2,3,4,5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onMouseEnter={() => setReviewHover(s)}
                          onMouseLeave={() => setReviewHover(0)}
                          onClick={() => setReviewRating(s)}
                          className="focus:outline-none"
                          aria-label={`Rate ${s} stars`}
                        >
                          <Star className={`w-7 h-7 transition-colors ${s <= (reviewHover || reviewRating) ? 'fill-yellow-400 text-yellow-400' : 'text-foreground/20'}`} />
                        </button>
                      ))}
                      {reviewRating > 0 && (
                        <span className="ml-2 text-sm text-foreground/60">
                          {['','Poor','Fair','Good','Very Good','Excellent'][reviewRating]}
                        </span>
                      )}
                    </div>
                  </div>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience..."
                    rows={4}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none mb-4"
                  />
                  <div className="flex items-center gap-3">
                    <Button type="button" onClick={submitReview} disabled={!reviewRating || !reviewText.trim()}>
                      Submit Review
                    </Button>
                    {reviewSubmitted && (
                      <span className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Submitted!
                      </span>
                    )}
                  </div>
                </Card>
              </TabsContent>

              {/* Portfolio */}
              <TabsContent value="portfolio">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {service.gallery.concat(service.gallery).slice(0, 6).map((img, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden bg-muted">
                      <img
                        src={(img as { src: string }).src}
                        alt={`Portfolio ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* ── Right / Sidebar ── */}
          <div>
            <div className="space-y-4 lg:sticky lg:top-24">

              {/* Provider card */}
              <Card className="p-5">
                <h3 className="font-bold mb-4">Service Provider</h3>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {service.provider[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{service.provider}</p>
                    <p className="text-xs text-foreground/60">{service.providerTitle}</p>
                    <p className="text-xs text-foreground/50 mt-0.5">Member since {service.memberSince}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-foreground/70">
                    <Clock className="w-4 h-4 text-primary" />
                    Response time: <span className="font-medium text-foreground">{service.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/70">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    Response rate: <span className="font-medium text-foreground">{service.responseRate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/70">
                    <Users className="w-4 h-4 text-primary" />
                    {service.bookingsCount} successful bookings
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full gap-2">
                  <Mail className="w-4 h-4" /> Message Provider
                </Button>
              </Card>

              {/* Book card */}
              <Card className="p-5">
                <div className="mb-4">
                  <p className="text-xs text-foreground/50">Starting from</p>
                  <p className="text-3xl font-bold text-primary">${service.price.toLocaleString()}</p>
                </div>
                <Button
                  className="w-full mb-2"
                  disabled={service.availability === 'booked'}
                  onClick={() => setIsBookingOpen(true)}
                >
                  {service.availability === 'booked' ? 'Fully Booked' : 'Book Now'}
                </Button>
                <Button variant="outline" className="w-full" onClick={() => router.push('/cart')}>
                  Add to Cart
                </Button>

                {/* Quick stats */}
                <div className="mt-4 pt-4 border-t space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Cancellation</span>
                    <span className="font-medium">{service.cancellationRate} rate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Availability</span>
                    <span className={`font-medium capitalize ${service.availability === 'available' ? 'text-green-600' : service.availability === 'limited' ? 'text-yellow-600' : 'text-red-600'}`}>
                      {service.availability}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Location</span>
                    <span className="font-medium">{service.location}</span>
                  </div>
                </div>
              </Card>

              {/* Trust badges */}
              <Card className="p-4">
                <div className="flex items-center gap-2 text-sm text-foreground/70 mb-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="font-medium">CeremonyHub Verified</span>
                </div>
                <p className="text-xs text-foreground/50">This provider has been verified and reviewed by our team for quality and reliability.</p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Book — {service.name}</DialogTitle>
            <DialogDescription>Select an available date to confirm your booking.</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={disabledDays}
            />
            <div className="space-y-4">
              <Card className="p-4">
                <p className="text-sm font-semibold mb-1">Service</p>
                <p className="text-foreground/70 text-sm">{service.name}</p>
                <p className="text-sm font-semibold mt-3 mb-1">Selected Date</p>
                <p className="text-foreground/70 text-sm">
                  {selectedDate ? selectedDate.toDateString() : 'None selected'}
                </p>
                <p className="text-sm font-semibold mt-3 mb-1">Price</p>
                <p className="text-primary font-bold">${service.price.toLocaleString()}</p>
              </Card>
              <Button onClick={handleConfirm} disabled={!selectedDate} className="w-full">
                Confirm Booking
              </Button>
              <Button variant="outline" onClick={() => setIsBookingOpen(false)} className="w-full">
                Cancel
              </Button>
            </div>
          </div>
          <DialogFooter />
        </DialogContent>
      </Dialog>
    </main>
  )
}
