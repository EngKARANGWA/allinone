import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Clock, Users, Heart, Share2, ChevronRight, CheckCircle2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 aspect-video flex items-center justify-center">
                <div className="text-6xl opacity-20">📸</div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            </div>

            {/* Service Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">Luxury Wedding Photography</h1>
                  <p className="text-foreground/60">Professional wedding & event photography services</p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Rating and Location */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-semibold">4.9</span>
                  <span className="text-foreground/60">(203 reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-foreground/60">
                  <MapPin className="w-4 h-4" />
                  Downtown / City Wide
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex items-center justify-between p-6 bg-secondary/20 rounded-xl mb-8">
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Starting price</p>
                  <p className="text-4xl font-bold text-primary">$5,000</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    Contact Provider
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90 gap-2">
                    Book Now <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-4">About This Service</h2>
                  <p className="text-foreground/70 leading-relaxed mb-4">
                    Golden Lens Studio provides professional wedding and event photography services with over 10 years
                    of experience. Our team specializes in capturing emotional moments and creating timeless memories.
                  </p>
                  <p className="text-foreground/70 leading-relaxed">
                    Each wedding is treated as a unique story. We use the latest photography techniques and equipment
                    to ensure your special day is documented beautifully. Our packages include pre-wedding shoots,
                    ceremony coverage, reception photography, and professional editing.
                  </p>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-6">What's Included</h2>
                  <ul className="space-y-3">
                    {[
                      'Pre-wedding consultation',
                      '8-10 hours of coverage',
                      '2 professional photographers',
                      'Drone photography & videography',
                      'Professional editing & retouching',
                      '500+ edited photos',
                      'Album design & printing',
                      '24-hour highlight reel',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-bold mb-6">Service Details</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-4">Coverage Options</h3>
                      <ul className="space-y-2 text-sm text-foreground/70">
                        <li>• Ceremony Only (4 hours)</li>
                        <li>• Half Day (6 hours)</li>
                        <li>• Full Day (10 hours)</li>
                        <li>• Extended (12+ hours)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">Pricing Tiers</h3>
                      <ul className="space-y-2 text-sm text-foreground/70">
                        <li>• Basic: $3,500</li>
                        <li>• Standard: $5,000</li>
                        <li>• Premium: $7,500</li>
                        <li>• Deluxe: $10,000+</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">Sarah Smith</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((j) => (
                              <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-xs text-foreground/60">March 2024</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-foreground/70">
                      Absolutely amazing! Golden Lens captured our wedding day perfectly. The photographers were
                      professional, friendly, and had a great eye for detail. Highly recommended!
                    </p>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="p-6 sticky top-24 space-y-6">
              {/* Provider Info */}
              <div className="pb-6 border-b">
                <h3 className="font-bold mb-4">Service Provider</h3>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent" />
                  <div>
                    <p className="font-semibold text-sm">Golden Lens Studio</p>
                    <p className="text-xs text-foreground/60">Professional Photography</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  View Provider Profile
                </Button>
              </div>

              {/* Booking Info */}
              <div className="pb-6 border-b space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Avg. response time: 2 hours</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Booked 156 times</span>
                </div>
              </div>

              {/* CTA */}
              <Button className="w-full bg-primary hover:bg-primary/90 py-3 mb-3">
                Add to Cart
              </Button>
              <Button variant="outline" className="w-full py-3 mb-3">
                Contact Provider
              </Button>

              {/* Quick Facts */}
              <div className="bg-secondary/20 rounded-lg p-4 space-y-2 text-sm">
                <p>
                  <span className="text-foreground/60">Response Rate:</span>
                  <span className="ml-2 font-semibold">98%</span>
                </p>
                <p>
                  <span className="text-foreground/60">Cancellation Rate:</span>
                  <span className="ml-2 font-semibold">2%</span>
                </p>
                <p>
                  <span className="text-foreground/60">Member Since:</span>
                  <span className="ml-2 font-semibold">May 2023</span>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
