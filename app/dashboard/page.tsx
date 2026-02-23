"use client"

import { useEffect, useState } from 'react'
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
  const [role, setRole] = useState<'user' | 'admin'>('user')

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('userRole') : null
    if (stored === 'admin' || stored === 'user') setRole(stored)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') window.localStorage.setItem('userRole', role)
  }, [role])

  return (
    <SidebarProvider>
      <main className="min-h-screen min-w-full bg-background">
        <DashboardHeaderUser />

        <div className="w-full px-4 py-12 grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-8">
          {/* Sidebar column (desktop only) */}
          <aside className="hidden lg:block">
            <div className="sticky top-16">
              {role === 'admin' ? <AdminSidebarActions /> : <UserSidebarActions />}
            </div>
          </aside>

          {/* Main content */}
          <section className="prose-lg">
            <div className="mb-6 flex items-center justify-end gap-3">
              <div className="text-sm text-foreground/60 hidden sm:block">Role</div>
              <div className="inline-flex rounded-full bg-secondary/10 p-1">
                <Button size="sm" variant={role === 'user' ? undefined : 'ghost'} onClick={() => setRole('user')} className={role === 'user' ? 'bg-primary/10' : ''}>User</Button>
                <Button size="sm" variant={role === 'admin' ? undefined : 'ghost'} onClick={() => setRole('admin')} className={role === 'admin' ? 'bg-primary/10' : ''}>Admin</Button>
              </div>
            </div>

            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Welcome Back, John!</h1>
              <p className="text-foreground/60">Manage your ceremonies and bookings</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 flex flex-col items-start gap-4">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-foreground/60">Upcoming Events</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </Card>

              <Card className="p-6 flex flex-col items-start gap-4">
                <ShoppingCart className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-foreground/60">Active Bookings</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </Card>

              <Card className="p-6 flex flex-col items-start gap-4">
                <Heart className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-foreground/60">Saved Services</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </Card>

              <Card className="p-6 flex flex-col items-start gap-4">
                <User className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-foreground/60">Profile</p>
                  <Button size="sm" variant="outline" className="mt-2">View Profile</Button>
                </div>
              </Card>
            </div>

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
          </section>
        </div>
      </main>
    </SidebarProvider>
  )
}
