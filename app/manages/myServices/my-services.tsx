'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardHeaderUser } from '@/components/header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SidebarProvider, UserSidebarActions } from '@/components/ui/sidebar'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function MyServicesPage() {
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
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Services</h1>
              <p className="text-muted-foreground">Manage services you provide</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Photography Service</h3>
                    <p className="text-sm text-muted-foreground mb-4">Professional wedding and event photography</p>
                    <div className="flex gap-4 text-sm">
                      <span className="text-muted-foreground">Price: <span className="font-semibold text-foreground">$500/day</span></span>
                      <span className="text-muted-foreground">Status: <span className="font-semibold text-green-600">Active</span></span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
