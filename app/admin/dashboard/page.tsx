import { DashboardHeaderAdmin } from '@/components/header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, TrendingUp, Users, ShoppingCart, AlertCircle } from 'lucide-react'

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <DashboardHeaderAdmin />
      
      <div className="container mx-auto px-4 py-12">
        {/* Dashboard Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-foreground/60">Platform management and analytics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6">
            <Users className="w-8 h-8 text-primary mb-4" />
            <p className="text-sm text-foreground/60 mb-1">Total Users</p>
            <p className="text-3xl font-bold">2,456</p>
            <p className="text-xs text-green-600 mt-2">↑ 125 this week</p>
          </Card>
          <Card className="p-6">
            <ShoppingCart className="w-8 h-8 text-primary mb-4" />
            <p className="text-sm text-foreground/60 mb-1">Total Bookings</p>
            <p className="text-3xl font-bold">10,285</p>
            <p className="text-xs text-green-600 mt-2">↑ 856 this month</p>
          </Card>
          <Card className="p-6">
            <BarChart3 className="w-8 h-8 text-primary mb-4" />
            <p className="text-sm text-foreground/60 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold">$485K</p>
            <p className="text-xs text-green-600 mt-2">↑ 23% this month</p>
          </Card>
          <Card className="p-6">
            <TrendingUp className="w-8 h-8 text-primary mb-4" />
            <p className="text-sm text-foreground/60 mb-1">Providers</p>
            <p className="text-3xl font-bold">512</p>
            <p className="text-xs text-green-600 mt-2">↑ 38 verified this month</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users" className="mb-12">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="providers">Service Providers</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="categories">Service Categories</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Button className="mb-4">Add New User</Button>
            <Card className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="p-4 font-semibold">User</th>
                    <th className="p-4 font-semibold">Email</th>
                    <th className="p-4 font-semibold">Joined</th>
                    <th className="p-4 font-semibold">Bookings</th>
                    <th className="p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((i) => (
                    <tr key={i} className="border-b hover:bg-muted/50">
                      <td className="p-4">Sarah Smith</td>
                      <td className="p-4">sarah@email.com</td>
                      <td className="p-4">Jan 15, 2024</td>
                      <td className="p-4">12</td>
                      <td className="p-4">
                        <Button size="sm" variant="outline">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </TabsContent>

          {/* Providers Tab */}
          <TabsContent value="providers" className="space-y-4">
            <Button className="mb-4">Approve New Providers</Button>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">Golden Lens Studio</h3>
                      <p className="text-sm text-foreground/60">Photography Service</p>
                    </div>
                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-semibold">
                      Verified
                    </span>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-foreground/60">Rating</p>
                      <p className="font-semibold">4.9/5 (203 reviews)</p>
                    </div>
                    <div>
                      <p className="text-foreground/60">Bookings</p>
                      <p className="font-semibold">156</p>
                    </div>
                    <div>
                      <p className="text-foreground/60">Revenue</p>
                      <p className="font-semibold">$245,000</p>
                    </div>
                    <div>
                      <p className="text-foreground/60">Since</p>
                      <p className="font-semibold">May 2023</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm" variant="outline">Suspend</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Recent Bookings</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">Photography Service</p>
                      <p className="text-sm text-foreground/60">Sarah Smith → Golden Lens Studio</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">$5,000</p>
                        <p className="text-xs text-green-600">✓ Completed</p>
                      </div>
                      <Button size="sm" variant="outline">Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <Button className="mb-4">Add New Category</Button>
            <Card className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold">Services</th>
                    <th className="p-4 font-semibold">Providers</th>
                    <th className="p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {['Photography', 'Vehicles', 'MC & Events', 'Sound Systems', 'Catering'].map((cat) => (
                    <tr key={cat} className="border-b hover:bg-muted/50">
                      <td className="p-4 font-semibold">{cat}</td>
                      <td className="p-4">145</td>
                      <td className="p-4">87</td>
                      <td className="p-4">
                        <Button size="sm" variant="outline">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </TabsContent>

          {/* Disputes Tab */}
          <TabsContent value="disputes" className="space-y-4">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-orange-900">No active disputes</p>
                <p className="text-sm text-orange-700">All transactions have been completed successfully</p>
              </div>
            </div>
            <Card className="p-6">
              <p className="text-foreground/60">Dispute resolution center is ready. No issues to resolve at this time.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
