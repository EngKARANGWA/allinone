'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardHeaderAdmin } from '@/components/header'
import { SidebarProvider, SidebarInset, AdminSidebarActions } from '@/components/ui/sidebar'
import { Card } from '@/components/ui/card'
import {
  DollarSign, Users, BookOpen, TrendingUp,
  Camera, Car, Mic2, Speaker, Utensils,
  CheckCircle, Clock, XCircle, RefreshCw,
  Star, CreditCard, Banknote, Smartphone, Landmark,
  BarChart2, ArrowUpRight,
} from 'lucide-react'
import { ADMIN_BOOKINGS_SEED } from '@/lib/admin-bookings-data'
import { ADMIN_PAYMENTS_SEED } from '@/lib/admin-payments-data'
import { ADMIN_USERS_SEED }    from '@/lib/admin-users-data'
import { ADMIN_PROVIDERS_SEED } from '@/lib/admin-providers-data'
import { ADMIN_SERVICES_SEED }  from '@/lib/admin-services-data'

/* ─── Helpers ────────────────────────────────────────────────────── */
const CAT_META: Record<string, { label: string; icon: React.ReactNode; color: string; bar: string }> = {
  photography: { label: 'Photography', icon: <Camera   className="w-4 h-4" />, color: 'text-purple-600', bar: 'bg-purple-400' },
  vehicles:    { label: 'Vehicles',    icon: <Car      className="w-4 h-4" />, color: 'text-sky-600',    bar: 'bg-sky-400'    },
  mc:          { label: 'MC / Events', icon: <Mic2     className="w-4 h-4" />, color: 'text-orange-600', bar: 'bg-orange-400' },
  sound:       { label: 'Sound',       icon: <Speaker  className="w-4 h-4" />, color: 'text-indigo-600', bar: 'bg-indigo-400' },
  catering:    { label: 'Catering',    icon: <Utensils className="w-4 h-4" />, color: 'text-green-600',  bar: 'bg-green-400'  },
}

const MONTHLY_REVENUE = [
  { month: 'Dec', amount: 8400  },
  { month: 'Jan', amount: 12600 },
  { month: 'Feb', amount: 9800  },
  { month: 'Mar', amount: 15200 },
  { month: 'Apr', amount: 11500 },
  { month: 'May', amount: 18500 },
]

const MONTHLY_BOOKINGS = [4, 6, 5, 8, 7, 10]

/* ─── Page ───────────────────────────────────────────────────────── */
export default function AdminReportsPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const ok   = typeof window !== 'undefined' && window.localStorage.getItem('isLoggedIn') === 'true'
    const role = typeof window !== 'undefined' ? window.localStorage.getItem('userRole') : null
    if (!ok || role !== 'admin') { router.push('/auth/login'); return }
    setIsLoggedIn(true)
  }, [])

  if (!isLoggedIn) return null

  /* ── computed stats ──────────────────────────────────────────────── */
  const completedPayments = ADMIN_PAYMENTS_SEED.filter((p) => p.status === 'completed')
  const totalRevenue      = completedPayments.reduce((s, p) => s + p.amount, 0)
  const totalFees         = completedPayments.reduce((s, p) => s + p.platformFee, 0)
  const totalBookings     = ADMIN_BOOKINGS_SEED.length
  const totalUsers        = ADMIN_USERS_SEED.filter((u) => u.role === 'customer').length
  const totalProviders    = ADMIN_PROVIDERS_SEED.filter((p) => p.status === 'active').length

  /* bookings by status */
  const bStatuses = ['confirmed', 'completed', 'pending', 'cancelled'] as const
  const bookingsByStatus = bStatuses.map((s) => ({
    label: s,
    count: ADMIN_BOOKINGS_SEED.filter((b) => b.status === s).length,
  }))

  /* bookings by category */
  const categories = ['photography', 'vehicles', 'mc', 'sound', 'catering']
  const bookingsByCategory = categories.map((cat) => ({
    cat,
    count: ADMIN_BOOKINGS_SEED.filter((b) => b.serviceCategory === cat).length,
    revenue: ADMIN_PAYMENTS_SEED
      .filter((p) => p.serviceCategory === cat && p.status === 'completed')
      .reduce((s, p) => s + p.amount, 0),
  }))
  const maxCatCount = Math.max(...bookingsByCategory.map((c) => c.count), 1)

  /* payment methods */
  const methods = ['momo', 'card', 'bank', 'cash'] as const
  const methodMeta = {
    momo: { label: 'MTN MoMo', icon: <Smartphone className="w-4 h-4" />, color: 'bg-yellow-400' },
    card: { label: 'Card',     icon: <CreditCard className="w-4 h-4" />, color: 'bg-blue-400'   },
    bank: { label: 'Bank',     icon: <Landmark   className="w-4 h-4" />, color: 'bg-indigo-400' },
    cash: { label: 'Cash',     icon: <Banknote   className="w-4 h-4" />, color: 'bg-green-400'  },
  }
  const methodStats = methods.map((m) => ({
    method: m,
    count:   ADMIN_PAYMENTS_SEED.filter((p) => p.method === m).length,
    revenue: ADMIN_PAYMENTS_SEED.filter((p) => p.method === m && p.status === 'completed').reduce((s, p) => s + p.amount, 0),
  }))
  const maxMethodCount = Math.max(...methodStats.map((m) => m.count), 1)

  /* top providers */
  const topProviders = [...ADMIN_PROVIDERS_SEED]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  /* top services */
  const topServices = [...ADMIN_SERVICES_SEED]
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 5)

  /* monthly chart max */
  const maxRevenue = Math.max(...MONTHLY_REVENUE.map((m) => m.amount), 1)
  const maxBooking = Math.max(...MONTHLY_BOOKINGS, 1)

  const statusMeta = {
    confirmed: { color: 'bg-blue-400',    label: 'Confirmed' },
    completed: { color: 'bg-emerald-400', label: 'Completed' },
    pending:   { color: 'bg-amber-400',   label: 'Pending'   },
    cancelled: { color: 'bg-red-400',     label: 'Cancelled' },
  }

  return (
    <SidebarProvider>
      <AdminSidebarActions />
      <SidebarInset>
        <DashboardHeaderAdmin />

        <div className="p-6 space-y-6">

          {/* ── Header ─────────────────────────────────────────────── */}
          <div>
            <p className="text-xs text-foreground/50 uppercase tracking-widest font-medium mb-1">Admin / Management</p>
            <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
            <p className="text-sm text-foreground/60 mt-0.5">Platform performance overview · May 2026</p>
          </div>

          {/* ── KPI cards ──────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: 'Total Revenue',
                value: `$${totalRevenue.toLocaleString()}`,
                sub: `$${totalFees.toLocaleString()} platform fees`,
                icon: <DollarSign className="w-5 h-5" />,
                iconBg: 'bg-primary/10 text-primary',
                valueCls: 'text-primary',
                trend: '+12%',
              },
              {
                label: 'Total Bookings',
                value: totalBookings,
                sub: `${ADMIN_BOOKINGS_SEED.filter((b) => b.status === 'confirmed').length} confirmed`,
                icon: <BookOpen className="w-5 h-5" />,
                iconBg: 'bg-blue-100 text-blue-600',
                valueCls: 'text-foreground',
                trend: '+8%',
              },
              {
                label: 'Customers',
                value: totalUsers,
                sub: `${ADMIN_USERS_SEED.filter((u) => u.status === 'active' && u.role === 'customer').length} active`,
                icon: <Users className="w-5 h-5" />,
                iconBg: 'bg-emerald-100 text-emerald-600',
                valueCls: 'text-foreground',
                trend: '+5%',
              },
              {
                label: 'Active Providers',
                value: totalProviders,
                sub: `${ADMIN_PROVIDERS_SEED.length} registered total`,
                icon: <TrendingUp className="w-5 h-5" />,
                iconBg: 'bg-orange-100 text-orange-600',
                valueCls: 'text-foreground',
                trend: '+3%',
              },
            ].map((stat) => (
              <Card key={stat.label} className="p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${stat.iconBg}`}>
                    {stat.icon}
                  </div>
                  <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                    <ArrowUpRight className="w-3 h-3" /> {stat.trend}
                  </span>
                </div>
                <p className={`text-2xl font-bold ${stat.valueCls}`}>{stat.value}</p>
                <p className="text-xs font-medium text-foreground/50 uppercase tracking-wide mt-0.5">{stat.label}</p>
                <p className="text-xs text-foreground/40 mt-1">{stat.sub}</p>
              </Card>
            ))}
          </div>

          {/* ── Revenue + Bookings charts ───────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Monthly revenue bar chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-bold">Monthly Revenue</h2>
                  <p className="text-xs text-foreground/50 mt-0.5">Last 6 months · completed payments</p>
                </div>
                <BarChart2 className="w-5 h-5 text-foreground/30" />
              </div>
              <div className="flex items-end gap-3 h-44">
                {MONTHLY_REVENUE.map((m, i) => {
                  const pct = Math.round((m.amount / maxRevenue) * 100)
                  const isLast = i === MONTHLY_REVENUE.length - 1
                  return (
                    <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs font-semibold text-foreground/60">${(m.amount / 1000).toFixed(1)}k</span>
                      <div className="w-full rounded-t-lg relative overflow-hidden bg-muted" style={{ height: '120px' }}>
                        <div
                          className={`absolute bottom-0 w-full rounded-t-lg transition-all ${isLast ? 'bg-primary' : 'bg-primary/30'}`}
                          style={{ height: `${pct}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${isLast ? 'text-primary font-bold' : 'text-foreground/50'}`}>{m.month}</span>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Monthly bookings bar chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-bold">Monthly Bookings</h2>
                  <p className="text-xs text-foreground/50 mt-0.5">Last 6 months · all statuses</p>
                </div>
                <BookOpen className="w-5 h-5 text-foreground/30" />
              </div>
              <div className="flex items-end gap-3 h-44">
                {MONTHLY_REVENUE.map((m, i) => {
                  const count = MONTHLY_BOOKINGS[i]
                  const pct   = Math.round((count / maxBooking) * 100)
                  const isLast = i === MONTHLY_BOOKINGS.length - 1
                  return (
                    <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs font-semibold text-foreground/60">{count}</span>
                      <div className="w-full rounded-t-lg relative overflow-hidden bg-muted" style={{ height: '120px' }}>
                        <div
                          className={`absolute bottom-0 w-full rounded-t-lg transition-all ${isLast ? 'bg-blue-500' : 'bg-blue-200'}`}
                          style={{ height: `${pct}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium ${isLast ? 'text-blue-600 font-bold' : 'text-foreground/50'}`}>{m.month}</span>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* ── Bookings by category + status ──────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Category breakdown */}
            <Card className="p-6">
              <h2 className="text-base font-bold mb-5">Bookings by Category</h2>
              <div className="space-y-4">
                {bookingsByCategory.map((c) => {
                  const meta = CAT_META[c.cat]
                  const pct  = Math.round((c.count / maxCatCount) * 100)
                  return (
                    <div key={c.cat}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className={`flex items-center gap-2 text-sm font-medium ${meta.color}`}>
                          {meta.icon}
                          {meta.label}
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold">{c.count} bookings</span>
                          {c.revenue > 0 && (
                            <span className="text-xs text-foreground/50 ml-2">${c.revenue.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full ${meta.bar}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Booking status breakdown */}
            <Card className="p-6">
              <h2 className="text-base font-bold mb-5">Bookings by Status</h2>
              <div className="space-y-4">
                {bookingsByStatus.map((s) => {
                  const meta = statusMeta[s.label as keyof typeof statusMeta]
                  const pct  = Math.round((s.count / totalBookings) * 100)
                  return (
                    <div key={s.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium capitalize">{meta.label}</span>
                        <div className="text-right">
                          <span className="text-sm font-bold">{s.count}</span>
                          <span className="text-xs text-foreground/50 ml-2">{pct}%</span>
                        </div>
                      </div>
                      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full ${meta.color}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Status count chips */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-border/50">
                {bookingsByStatus.map((s) => {
                  const meta = statusMeta[s.label as keyof typeof statusMeta]
                  return (
                    <div key={s.label} className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full shrink-0 ${meta.color}`} />
                      <span className="text-sm text-foreground/60 capitalize">{meta.label}</span>
                      <span className="ml-auto font-bold text-sm">{s.count}</span>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* ── Payment methods + top providers ────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Payment method breakdown */}
            <Card className="p-6">
              <h2 className="text-base font-bold mb-5">Payment Methods</h2>
              <div className="space-y-4">
                {methodStats.map((m) => {
                  const meta = methodMeta[m.method]
                  const pct  = Math.round((m.count / maxMethodCount) * 100)
                  return (
                    <div key={m.method}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
                          {meta.icon}
                          {meta.label}
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold">{m.count} txns</span>
                          {m.revenue > 0 && (
                            <span className="text-xs text-foreground/50 ml-2">${m.revenue.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                        <div className={`h-full rounded-full ${meta.color}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Top providers */}
            <Card className="p-6">
              <h2 className="text-base font-bold mb-5">Top Providers by Revenue</h2>
              <div className="space-y-3">
                {topProviders.map((p, i) => {
                  const meta = CAT_META[p.category] ?? CAT_META.mc
                  return (
                    <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${meta.color} bg-muted`}>
                        {meta.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm leading-tight truncate">{p.name}</p>
                        <p className="text-xs text-foreground/50">{p.reviews} reviews · {p.rating} ★</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-sm text-primary">${p.revenue.toLocaleString()}</p>
                        <p className="text-xs text-foreground/50">{p.services} listings</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* ── Top services + recent payments ──────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Top services */}
            <Card className="p-6">
              <h2 className="text-base font-bold mb-5">Top Services by Reviews</h2>
              <div className="space-y-3">
                {topServices.map((s, i) => {
                  const meta = CAT_META[s.category] ?? CAT_META.mc
                  return (
                    <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${meta.color} bg-muted`}>
                        {meta.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm leading-tight truncate">{s.name}</p>
                        <p className="text-xs text-foreground/50">{s.provider}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1 justify-end">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-sm">{s.rating}</span>
                        </div>
                        <p className="text-xs text-foreground/50">{s.reviews} reviews</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Recent payments */}
            <Card className="p-6">
              <h2 className="text-base font-bold mb-5">Recent Transactions</h2>
              <div className="space-y-3">
                {ADMIN_PAYMENTS_SEED.slice(0, 5).map((p) => {
                  const statusColor = {
                    completed: 'text-emerald-600 bg-emerald-50',
                    pending:   'text-amber-600   bg-amber-50',
                    failed:    'text-red-600     bg-red-50',
                    refunded:  'text-purple-600  bg-purple-50',
                  }[p.status]
                  return (
                    <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <DollarSign className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm leading-tight truncate">{p.customerName}</p>
                        <p className="text-xs text-foreground/50 font-mono">{p.reference}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-sm">${p.amount.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColor}`}>
                          {p.status}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* ── Platform summary strip ──────────────────────────────── */}
          <Card className="p-6">
            <h2 className="text-base font-bold mb-5">Platform Summary</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { label: 'Total GMV',         value: `$${totalRevenue.toLocaleString()}` },
                { label: 'Platform Fees',      value: `$${totalFees.toLocaleString()}` },
                { label: 'Avg Booking Value',  value: `$${totalBookings ? Math.round(totalRevenue / totalBookings).toLocaleString() : 0}` },
                { label: 'Completed Bookings', value: ADMIN_BOOKINGS_SEED.filter((b) => b.status === 'completed').length },
                { label: 'Pending Payments',   value: ADMIN_PAYMENTS_SEED.filter((p) => p.status === 'pending').length },
                { label: 'Total Services',     value: ADMIN_SERVICES_SEED.length },
              ].map((item) => (
                <div key={item.label} className="bg-muted/30 rounded-xl p-4 text-center">
                  <p className="text-xl font-bold text-foreground">{item.value}</p>
                  <p className="text-xs text-foreground/50 mt-1 uppercase tracking-wide font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
