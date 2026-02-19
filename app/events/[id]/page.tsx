import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, MapPin, Users, DollarSign, Share2, Edit2 } from 'lucide-react'

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Sarah & John's Wedding</h1>
              <p className="text-foreground/60">Wedding • March 15, 2024</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" gap-2 className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button className="gap-2">
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            </div>
          </div>

          {/* Event Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-foreground/60">Date</p>
                  <p className="font-semibold">March 15, 2024</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-foreground/60">Location</p>
                  <p className="font-semibold">Grand Ballroom</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-foreground/60">Guests</p>
                  <p className="font-semibold">200 people</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-foreground/60">Budget</p>
                  <p className="font-semibold">$50,000</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="mb-12">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
            <TabsTrigger value="checklist">Checklist</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Event Summary</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Ceremony Details</h3>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    <li>Ceremony Time: 5:00 PM</li>
                    <li>Reception Time: 6:00 PM</li>
                    <li>Venue: Grand Ballroom Downtown</li>
                    <li>Dress Code: Black Tie</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Contacts</h3>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    <li>Bride: Sarah Smith</li>
                    <li>Groom: John Doe</li>
                    <li>Phone: (555) 123-4567</li>
                    <li>Email: sarah.john@email.com</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <Button className="mb-4">Add New Booking</Button>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Photography Service</h3>
                      <p className="text-sm text-foreground/60">Provider: Golden Lens Studio</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">$5,000</p>
                      <p className="text-xs text-foreground/60">Confirmed</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="invitations" className="space-y-4">
            <Button className="mb-4">Send Invitations</Button>
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                  <div>
                    <p className="font-semibold">Digital Invitation Template</p>
                    <p className="text-sm text-foreground/60">Customizable email invitation</p>
                  </div>
                  <Button size="sm" variant="outline">Edit</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                  <div>
                    <p className="font-semibold">Guest List</p>
                    <p className="text-sm text-foreground/60">200 guests added</p>
                  </div>
                  <Button size="sm" variant="outline">Manage</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="checklist" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Event Checklist</h2>
              <div className="space-y-3">
                {[
                  'Book photography service',
                  'Reserve venue',
                  'Arrange catering',
                  'Send invitations',
                  'Confirm guest list',
                  'Plan menu',
                  'Arrange transportation',
                  'Design invitation cards',
                ].map((item, i) => (
                  <label key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    <span className="text-sm">{item}</span>
                  </label>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
