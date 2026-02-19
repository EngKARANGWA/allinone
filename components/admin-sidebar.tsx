'use client'

import Link from 'next/link'
import { Home, CalendarCheck, Box, Users, ClipboardList, Tag, LifeBuoy, Settings, LogOut } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'

export function AdminSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div className="font-semibold">Admin</div>
            </div>
          </SidebarHeader>

          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/admin/dashboard" passHref>
                <SidebarMenuButton asChild>
                  <a>
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/admin/events" passHref>
                <SidebarMenuButton asChild>
                  <a>
                    <CalendarCheck className="h-4 w-4" />
                    <span>Events</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/admin/services" passHref>
                <SidebarMenuButton asChild>
                  <a>
                    <Box className="h-4 w-4" />
                    <span>Services</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/admin/providers" passHref>
                <SidebarMenuButton asChild>
                  <a>
                    <Users className="h-4 w-4" />
                    <span>Providers</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/admin/users" passHref>
                <SidebarMenuButton asChild>
                  <a>
                    <ClipboardList className="h-4 w-4" />
                    <span>Users</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/admin/bookings" passHref>
                <SidebarMenuButton asChild>
                  <a>
                    <Tag className="h-4 w-4" />
                    <span>Bookings</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/admin/categories" passHref>
                <SidebarMenuButton asChild>
                  <a>
                    <LifeBuoy className="h-4 w-4" />
                    <span>Categories</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/admin/settings" passHref>
                  <SidebarMenuButton asChild>
                    <a>
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/signout" passHref>
                  <SidebarMenuButton asChild>
                    <a>
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="flex-1">
        <div className="flex items-center justify-between p-4">
          <SidebarTrigger />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminSidebar
