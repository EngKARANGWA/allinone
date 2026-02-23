"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardHeaderUser } from '@/components/header'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Calendar, Heart, ShoppingCart, User } from 'lucide-react'
import {
  SidebarProvider,
  UserSidebarActions,
  AdminSidebarActions,
} from '@/components/ui/sidebar'

export default function DashboardPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState<'user' | 'admin'>('user')

  useEffect(() => {
    const loggedIn = typeof window !== 'undefined' ? window.localStorage.getItem('isLoggedIn') === 'true' : false
    const storedRole = typeof window !== 'undefined' ? window.localStorage.getItem('userRole') : null
    
    if (!loggedIn || storedRole !== 'user') {
      router.push('/auth/login')
      return
    }
    
    setIsLoggedIn(true)
    setRole('user')
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') window.localStorage.setItem('userRole', role)
  }, [role])

  if (!isLoggedIn) return null

  return (
    <SidebarProvider>
      <UserSidebarActions />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeaderUser />
        
        <div className="flex-1 container mx-auto px-4 py-8 mt-16">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome Back, John!</h1>
            <p className="text-muted-foreground">Manage your ceremonies and bookings</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <Calendar className="w-8 h-8 text-primary mb-4" />
              <p className="text-sm text-muted-foreground mb-1">Upcoming Events</p>
              <p className="text-3xl font-bold">3</p>
            </Card>

            <Card className="p-6">
              <ShoppingCart className="w-8 h-8 text-primary mb-4" />
              <p className="text-sm text-muted-foreground mb-1">Active Bookings</p>
              <p className="text-3xl font-bold">5</p>
            </Card>

            <Card className="p-6">
              <Heart className="w-8 h-8 text-primary mb-4" />
              <p className="text-sm text-muted-foreground mb-1">Saved Services</p>
              <p className="text-3xl font-bold">12</p>
            </Card>

            <Card className="p-6">
              <User className="w-8 h-8 text-primary mb-4" />
              <p className="text-sm text-muted-foreground mb-1">Profile</p>
              <Button size="sm" variant="outline" className="mt-2 w-full">View Profile</Button>
            </Card>
          </div>

          <Tabs defaultValue="upcoming" className="mb-12">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4 mt-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Wedding Event</h3>
                    <p className="text-sm text-muted-foreground">Date: March 15, 2024</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="bookings" className="space-y-4 mt-6">
              {[1, 2].map((i) => (
                <Card key={i} className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Photography Service Booking</h3>
                    <p className="text-sm text-muted-foreground">Provider: Golden Lens Studio • Status: Confirmed</p>
                  </div>
                  <Button size="sm" variant="outline">View Booking</Button>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="saved" className="space-y-4 mt-6">
              <Card className="p-6">
                <p className="text-muted-foreground">Your saved services and favorites will appear here.</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  )
}
