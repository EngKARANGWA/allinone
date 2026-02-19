import { DashboardHeaderUser } from '@/components/header'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Calendar, Heart, ShoppingCart, User } from 'lucide-react'

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <DashboardHeaderUser />
      
      <div className="container mx-auto px-4 py-12">
        {/* Dashboard Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome Back, John!</h1>
          <p className="text-foreground/60">Manage your ceremonies and bookings</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6">
            <Calendar className="w-8 h-8 text-primary mb-4" />
            <p className="text-sm text-foreground/60 mb-1">Upcoming Events</p>
            <p className="text-3xl font-bold">3</p>
          </Card>
          <Card className="p-6">
            <ShoppingCart className="w-8 h-8 text-primary mb-4" />
            <p className="text-sm text-foreground/60 mb-1">Active Bookings</p>
            <p className="text-3xl font-bold">5</p>
          </Card>
          <Card className="p-6">
            <Heart className="w-8 h-8 text-primary mb-4" />
            <p className="text-sm text-foreground/60 mb-1">Saved Services</p>
            <p className="text-3xl font-bold">12</p>
          </Card>
          <Card className="p-6">
            <User className="w-8 h-8 text-primary mb-4" />
            <p className="text-sm text-foreground/60 mb-1">Profile</p>
            <Button size="sm" variant="outline" className="mt-4 w-full">
              View Profile
            </Button>
          </Card>
        </div>

        {/* Tabs: Upcoming / Bookings / Saved / Profile — styled like admin */}
        <Tabs defaultValue="upcoming" className="mb-12">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Wedding Event</h3>
                  <p className="text-sm text-foreground/60">Date: March 15, 2024</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm">View Details</Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            {[1, 2].map((i) => (
              <Card key={i} className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Photography Service Booking</h3>
                  <p className="text-sm text-foreground/60">Provider: Golden Lens Studio • Status: Confirmed</p>
                </div>
                <Button size="sm" variant="outline">View Booking</Button>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <Card className="p-6">
              <p className="text-foreground/60">Your saved services and favorites will appear here.</p>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold text-lg">Profile</h3>
              <p className="text-foreground/60">View and edit your profile details.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

    </main>
  )
}
