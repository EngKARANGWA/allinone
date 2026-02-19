import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Calendar, Users, Heart } from 'lucide-react'

export default function ServicesPage() {
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
          <Button variant="outline" size="sm">All Services</Button>
          <Button variant="outline" size="sm">Photography</Button>
          <Button variant="outline" size="sm">Vehicles</Button>
          <Button variant="outline" size="sm">MC & Events</Button>
          <Button variant="outline" size="sm">Sound Systems</Button>
          <Button variant="outline" size="sm">Catering</Button>
        </div>

        {/* Service Grid - Will be populated with database data */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-6xl opacity-20">📸</div>
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
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
