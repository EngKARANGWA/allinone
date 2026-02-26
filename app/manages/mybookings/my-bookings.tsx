'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardHeaderUser } from '@/components/header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SidebarProvider, UserSidebarActions } from '@/components/ui/sidebar'
import { Calendar, MapPin, DollarSign } from 'lucide-react'

export default function MyBookingsPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loggedIn = typeof window !== 'undefined' ? window.localStorage.getItem('isLoggedIn') === 'true' : false
    const storedRole = typeof window !== 'undefined' ? window.localStorage.getItem('userRole') : null
    
    if (!loggedIn || storedRole !== 'user') {
      router.push('/auth/login')
      return
    }
    
    setIsLoggedIn(true)
  }, [])

  if (!isLoggedIn) return null

  return (
    <SidebarProvider>
      <UserSidebarActions />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeaderUser />
        
        <div className="flex-1 container mx-auto px-4 py-8 mt-16">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
            <p className="text-muted-foreground">View and manage your bookings</p>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-3">Photography Service Booking</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>March 15, 2024 at 10:00 AM</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>Golden Lens Studio</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span className="font-semibold text-foreground">$500</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-semibold">
                        Confirmed
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm">Contact Provider</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
