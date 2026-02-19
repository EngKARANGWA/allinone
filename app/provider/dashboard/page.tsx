import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, TrendingUp, Users, Calendar, Star } from 'lucide-react'

export default function ProviderDashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Dashboard Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Golden Lens Studio</h1>
          <p className="text-foreground/60">Professional Wedding & Event Photography</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6">
            <BarChart3 className="w-8 h-8 text-primary mb-4" />
            <p className="text-sm text-foreground/60 mb-1">Total Bookings</p>
            <p className="text-3xl font-bold">48</p>
            <p className="text-xs text-green-600 mt-2">↑ 12% this month</p>
          </Card>
          <Card className="p-6">
            <TrendingUp className="w-8 h-8 text-primary mb-4" />
            <p className="text-sm text-foreground/60 mb-1">Revenue</p>
            <p className="text-3xl font-bold">$24K</p>
            <p className="text-xs text-green-600 mt-2">↑ 8% this month</p>
          </Card>
          <Card className="p-6">
            <Users className="w-8 h-8 text-primary mb-4" />
            <p className="text-sm text-foreground/60 mb-1">Clients</p>
            <p className="text-3xl font-bold">156</p>
            <p className="text-xs text-green-600 mt-2">↑ 24 new this month</p>
          </Card>
          <Card className="p-6">
            <Star className="w-8 h-8 text-primary mb-4" />
            <p className="text-sm text-foreground/60 mb-1">Rating</p>
            <p className="text-3xl font-bold">4.9</p>
            <p className="text-xs text-foreground/60 mt-2">Based on 203 reviews</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="mb-12">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Wedding Photography</h3>
                    <p className="text-sm text-foreground/60 mb-3">Client: Sarah & John Doe</p>
                    <div className="flex flex-wrap gap-4 text-sm text-foreground/60">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        March 15, 2024
                      </span>
                      <span>Location: Grand Ballroom</span>
                      <span>10:00 AM - 11:00 PM</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">$5,000</p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">Decline</Button>
                      <Button size="sm">Accept</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {[1, 2].map((i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Wedding Photography</h3>
                    <p className="text-sm text-foreground/60">Client: Emily & Michael</p>
                    <p className="text-sm text-green-600 mt-2">✓ Completed & Delivered</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">$5,000</p>
                    <p className="text-xs text-foreground/60 mt-2">Feb 14, 2024</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <Button className="mb-4">Add New Service</Button>
            {[1, 2].map((i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Wedding Photography Package</h3>
                    <p className="text-sm text-foreground/60 mb-3">Professional coverage for ceremonies and receptions</p>
                    <div className="flex gap-4 flex-wrap">
                      <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded text-xs">Photography</span>
                      <span className="text-sm">Rating: 4.9/5 (203 reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">$5,000</p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="earnings" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Earnings Overview</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-secondary/20 rounded-lg">
                  <span className="text-foreground/60">This Month</span>
                  <span className="text-2xl font-bold text-primary">$24,000</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary/20 rounded-lg">
                  <span className="text-foreground/60">This Year</span>
                  <span className="text-2xl font-bold text-primary">$156,000</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-secondary/20 rounded-lg">
                  <span className="text-foreground/60">Available Balance</span>
                  <span className="text-2xl font-bold text-primary">$8,400</span>
                </div>
              </div>
              <Button className="w-full mt-6">Withdraw Earnings</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
