'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardHeaderAdmin } from '@/components/header'
import { SidebarProvider, SidebarInset, AdminSidebarActions } from '@/components/ui/sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ADMIN_PROVIDERS_SEED, Provider, ProviderStatus } from '@/lib/admin-providers-data'
import { AddProviderDialog } from '@/components/admin/add-provider-dialog'
import type { ProviderFormData } from '@/components/admin/provider-form'
import {
  Plus, Eye, Star, MapPin,
  Users, CheckCircle, Clock, XCircle,
  Search, SlidersHorizontal, X,
  Camera, Car, Mic2, Speaker, Utensils,
  DollarSign,
} from 'lucide-react'

const STATUS_STYLE: Record<ProviderStatus, string> = {
  active:    'bg-emerald-50 text-emerald-700 border border-emerald-200',
  pending:   'bg-amber-50   text-amber-700   border border-amber-200',
  suspended: 'bg-red-50     text-red-700     border border-red-200',
}

const CAT_STYLE: Record<string, { pill: string; icon: string }> = {
  photography: { pill: 'bg-purple-50 text-purple-700 border border-purple-200', icon: 'bg-purple-100 text-purple-600' },
  vehicles:    { pill: 'bg-sky-50    text-sky-700    border border-sky-200',    icon: 'bg-sky-100    text-sky-600'    },
  mc:          { pill: 'bg-orange-50 text-orange-700 border border-orange-200', icon: 'bg-orange-100 text-orange-600' },
  sound:       { pill: 'bg-indigo-50 text-indigo-700 border border-indigo-200', icon: 'bg-indigo-100 text-indigo-600' },
  catering:    { pill: 'bg-green-50  text-green-700  border border-green-200',  icon: 'bg-green-100  text-green-600'  },
}

const CAT_ICON: Record<string, React.ReactNode> = {
  photography: <Camera   className="w-4 h-4" />,
  vehicles:    <Car      className="w-4 h-4" />,
  mc:          <Mic2     className="w-4 h-4" />,
  sound:       <Speaker  className="w-4 h-4" />,
  catering:    <Utensils className="w-4 h-4" />,
}

const CATEGORIES = ['photography', 'vehicles', 'mc', 'sound', 'catering']

const SELECT_CLS = 'w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring capitalize'

export default function AdminProvidersPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [providers, setProviders]   = useState<Provider[]>(ADMIN_PROVIDERS_SEED)
  const [addOpen, setAddOpen]       = useState(false)

  const [search, setSearch]           = useState('')
  const [category, setCategory]       = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const ok   = typeof window !== 'undefined' && window.localStorage.getItem('isLoggedIn') === 'true'
    const role = typeof window !== 'undefined' ? window.localStorage.getItem('userRole') : null
    if (!ok || role !== 'admin') { router.push('/auth/login'); return }
    setIsLoggedIn(true)
  }, [])

  if (!isLoggedIn) return null

  const total     = providers.length
  const active    = providers.filter((p) => p.status === 'active').length
  const pending   = providers.filter((p) => p.status === 'pending').length
  const suspended = providers.filter((p) => p.status === 'suspended').length

  const activeFilterCount = [
    category !== 'all',
    statusFilter !== 'all',
  ].filter(Boolean).length

  const clearFilters = () => { setSearch(''); setCategory('all'); setStatusFilter('all') }

  const displayed = providers.filter((p) => {
    const q = search.toLowerCase()
    if (q && !p.name.toLowerCase().includes(q) && !p.owner.toLowerCase().includes(q)) return false
    if (category !== 'all' && p.category !== category) return false
    if (statusFilter !== 'all' && p.status !== statusFilter) return false
    return true
  })

  const handleAdd = (data: Omit<Provider, 'id' | 'rating' | 'reviews' | 'services' | 'revenue' | 'joinedAt'>) => {
    setProviders((prev) => [{
      ...data,
      id: Date.now(),
      rating: 0,
      reviews: 0,
      services: 0,
      revenue: 0,
      joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }, ...prev])
  }

  return (
    <SidebarProvider>
      <AdminSidebarActions />
      <SidebarInset>
        <DashboardHeaderAdmin />

        <div className="p-6 space-y-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs text-foreground/50 uppercase tracking-widest font-medium mb-1">Admin / Management</p>
              <h1 className="text-2xl font-bold tracking-tight">Providers Management</h1>
              <p className="text-sm text-foreground/60 mt-0.5">Manage and review registered service providers</p>
            </div>
            <Button onClick={() => setAddOpen(true)} size="lg" className="gap-2 shrink-0 shadow-md">
              <Plus className="w-4 h-4" /> Add New Provider
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Providers', value: total,     icon: <Users       className="w-5 h-5" />, iconBg: 'bg-blue-100    text-blue-600',    valueCls: 'text-foreground'   },
              { label: 'Active',          value: active,    icon: <CheckCircle className="w-5 h-5" />, iconBg: 'bg-emerald-100 text-emerald-600', valueCls: 'text-emerald-600'  },
              { label: 'Pending Review',  value: pending,   icon: <Clock       className="w-5 h-5" />, iconBg: 'bg-amber-100   text-amber-600',   valueCls: 'text-amber-600'    },
              { label: 'Suspended',       value: suspended, icon: <XCircle     className="w-5 h-5" />, iconBg: 'bg-red-100     text-red-600',     valueCls: 'text-red-600'      },
            ].map((stat) => (
              <Card key={stat.label} className="p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${stat.iconBg}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground/50 uppercase tracking-wide">{stat.label}</p>
                  <p className={`text-3xl font-bold mt-0.5 ${stat.valueCls}`}>{stat.value}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Search + Filter */}
          <Card className="p-4 space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  placeholder="Search by business name or owner..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-muted/40 border-0 focus-visible:ring-1"
                />
              </div>
              <Button
                variant={showFilters ? undefined : 'outline'}
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2 shrink-0"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 bg-white text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
              {activeFilterCount > 0 && (
                <Button variant="ghost" onClick={clearFilters} className="gap-1 shrink-0 text-destructive hover:text-destructive">
                  <X className="w-4 h-4" /> Clear
                </Button>
              )}
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-border">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-foreground/50 mb-2 block">Category</label>
                  <select title="Filter category" value={category} onChange={(e) => setCategory(e.target.value)} className={SELECT_CLS}>
                    <option value="all">All Categories</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-foreground/50 mb-2 block">Status</label>
                  <select title="Filter status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={SELECT_CLS}>
                    <option value="all">All Statuses</option>
                    {(['active', 'pending', 'suspended'] as ProviderStatus[]).map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </Card>

          {/* Table */}
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b bg-muted/20">
              <p className="text-sm font-medium text-foreground/70">
                Showing <span className="font-bold text-foreground">{displayed.length}</span> of <span className="font-bold text-foreground">{total}</span> providers
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30 text-left text-xs uppercase tracking-wider text-foreground/50">
                    <th className="px-5 py-3 font-semibold">Provider</th>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Location</th>
                    <th className="px-4 py-3 font-semibold">Services</th>
                    <th className="px-4 py-3 font-semibold">Revenue</th>
                    <th className="px-4 py-3 font-semibold">Rating</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {displayed.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-5 py-16 text-center">
                        <div className="flex flex-col items-center gap-2 text-foreground/40">
                          <Users className="w-10 h-10" />
                          <p className="font-medium">No providers match your filters</p>
                          <Button variant="ghost" size="sm" onClick={clearFilters} className="mt-1">Clear filters</Button>
                        </div>
                      </td>
                    </tr>
                  ) : displayed.map((p) => {
                    const cat  = CAT_STYLE[p.category] ?? CAT_STYLE.mc
                    const icon = CAT_ICON[p.category]
                    return (
                      <tr key={p.id} className="hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => router.push(`/admin/providers/${p.id}`)}>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${cat.icon}`}>
                              {icon}
                            </div>
                            <div>
                              <p className="font-semibold text-foreground leading-tight">{p.name}</p>
                              <p className="text-xs text-foreground/50 mt-0.5">{p.owner}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cat.pill}`}>
                            {icon}
                            <span className="capitalize">{p.category}</span>
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <span className="flex items-center gap-1.5 text-foreground/70">
                            <MapPin className="w-3.5 h-3.5 text-foreground/40 shrink-0" />
                            {p.location}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <span className="font-semibold">{p.services}</span>
                          <span className="text-xs text-foreground/50 ml-1">listing{p.services !== 1 ? 's' : ''}</span>
                        </td>

                        <td className="px-4 py-4">
                          {p.revenue > 0 ? (
                            <span className="flex items-center gap-1 font-bold text-primary">
                              <DollarSign className="w-3.5 h-3.5" />
                              {p.revenue.toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-xs text-foreground/30 italic">No revenue</span>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          {p.reviews > 0 ? (
                            <div className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
                              <span className="font-semibold">{p.rating}</span>
                              <span className="text-foreground/40 text-xs">({p.reviews})</span>
                            </div>
                          ) : (
                            <span className="text-xs text-foreground/30 italic">No reviews</span>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLE[p.status]}`}>
                            {p.status === 'active'    && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />}
                            {p.status === 'pending'   && <span className="w-1.5 h-1.5 rounded-full bg-amber-500   inline-block" />}
                            {p.status === 'suspended' && <span className="w-1.5 h-1.5 rounded-full bg-red-500     inline-block" />}
                            {p.status}
                          </span>
                        </td>

                        <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end">
                            <button
                              type="button"
                              title="View provider"
                              onClick={() => router.push(`/admin/providers/${p.id}`)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground/50 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <AddProviderDialog
          open={addOpen}
          onOpenChange={setAddOpen}
          onAdd={handleAdd}
        />

      </SidebarInset>
    </SidebarProvider>
  )
}
