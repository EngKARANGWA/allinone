'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardHeaderAdmin } from '@/components/header'
import { SidebarProvider, SidebarInset, AdminSidebarActions } from '@/components/ui/sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ADMIN_USERS_SEED, AdminUser, UserStatus, UserRole } from '@/lib/admin-users-data'
import {
  Eye, Users, CheckCircle, Clock, XCircle,
  Search, SlidersHorizontal, X, MapPin,
  ShoppingBag, DollarSign, UserCheck, UserX,
} from 'lucide-react'

const STATUS_STYLE: Record<UserStatus, string> = {
  active:    'bg-emerald-50 text-emerald-700 border border-emerald-200',
  pending:   'bg-amber-50   text-amber-700   border border-amber-200',
  suspended: 'bg-red-50     text-red-700     border border-red-200',
}

const ROLE_STYLE: Record<UserRole, string> = {
  customer: 'bg-blue-50   text-blue-700   border border-blue-200',
  provider: 'bg-purple-50 text-purple-700 border border-purple-200',
}

const AVATAR_BG = [
  'bg-blue-100    text-blue-700',
  'bg-purple-100  text-purple-700',
  'bg-emerald-100 text-emerald-700',
  'bg-orange-100  text-orange-700',
  'bg-pink-100    text-pink-700',
  'bg-indigo-100  text-indigo-700',
]

const SELECT_CLS = 'w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring capitalize'

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

export default function AdminUsersPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [users, setUsers]           = useState<AdminUser[]>(ADMIN_USERS_SEED)

  const [search, setSearch]             = useState('')
  const [roleFilter, setRoleFilter]     = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showFilters, setShowFilters]   = useState(false)

  useEffect(() => {
    const ok   = typeof window !== 'undefined' && window.localStorage.getItem('isLoggedIn') === 'true'
    const role = typeof window !== 'undefined' ? window.localStorage.getItem('userRole') : null
    if (!ok || role !== 'admin') { router.push('/auth/login'); return }
    setIsLoggedIn(true)
  }, [])

  if (!isLoggedIn) return null

  const total     = users.length
  const active    = users.filter((u) => u.status === 'active').length
  const pending   = users.filter((u) => u.status === 'pending').length
  const suspended = users.filter((u) => u.status === 'suspended').length
  const customers = users.filter((u) => u.role === 'customer').length
  const providers = users.filter((u) => u.role === 'provider').length

  const activeFilterCount = [roleFilter !== 'all', statusFilter !== 'all'].filter(Boolean).length
  const clearFilters = () => { setSearch(''); setRoleFilter('all'); setStatusFilter('all') }

  const displayed = users.filter((u) => {
    const q = search.toLowerCase()
    if (q && !u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false
    if (roleFilter !== 'all' && u.role !== roleFilter) return false
    if (statusFilter !== 'all' && u.status !== statusFilter) return false
    return true
  })

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
              <h1 className="text-2xl font-bold tracking-tight">Users Management</h1>
              <p className="text-sm text-foreground/60 mt-0.5">
                {customers} customers · {providers} providers registered on the platform
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Users',   value: total,     icon: <Users       className="w-5 h-5" />, iconBg: 'bg-blue-100    text-blue-600',    valueCls: 'text-foreground'  },
              { label: 'Active',        value: active,    icon: <CheckCircle className="w-5 h-5" />, iconBg: 'bg-emerald-100 text-emerald-600', valueCls: 'text-emerald-600' },
              { label: 'Pending',       value: pending,   icon: <Clock       className="w-5 h-5" />, iconBg: 'bg-amber-100   text-amber-600',   valueCls: 'text-amber-600'   },
              { label: 'Suspended',     value: suspended, icon: <XCircle     className="w-5 h-5" />, iconBg: 'bg-red-100     text-red-600',     valueCls: 'text-red-600'     },
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
                  placeholder="Search by name or email..."
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
                  <label className="text-xs font-semibold uppercase tracking-wide text-foreground/50 mb-2 block">Role</label>
                  <select title="Filter role" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className={SELECT_CLS}>
                    <option value="all">All Roles</option>
                    <option value="customer">Customer</option>
                    <option value="provider">Provider</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-foreground/50 mb-2 block">Status</label>
                  <select title="Filter status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={SELECT_CLS}>
                    <option value="all">All Statuses</option>
                    {(['active', 'pending', 'suspended'] as UserStatus[]).map((s) => (
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
                Showing <span className="font-bold text-foreground">{displayed.length}</span> of <span className="font-bold text-foreground">{total}</span> users
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30 text-left text-xs uppercase tracking-wider text-foreground/50">
                    <th className="px-5 py-3 font-semibold">User</th>
                    <th className="px-4 py-3 font-semibold">Role</th>
                    <th className="px-4 py-3 font-semibold">Location</th>
                    <th className="px-4 py-3 font-semibold">Bookings</th>
                    <th className="px-4 py-3 font-semibold">Total Spent</th>
                    <th className="px-4 py-3 font-semibold">Last Active</th>
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
                          <p className="font-medium">No users match your filters</p>
                          <Button variant="ghost" size="sm" onClick={clearFilters} className="mt-1">Clear filters</Button>
                        </div>
                      </td>
                    </tr>
                  ) : displayed.map((u, idx) => (
                    <tr key={u.id} className="hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => router.push(`/admin/users/${u.id}`)}>

                      {/* User */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${AVATAR_BG[idx % AVATAR_BG.length]}`}>
                            {initials(u.name)}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground leading-tight">{u.name}</p>
                            <p className="text-xs text-foreground/50 mt-0.5">{u.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${ROLE_STYLE[u.role]}`}>
                          {u.role === 'customer' ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                          {u.role}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="px-4 py-4">
                        <span className="flex items-center gap-1.5 text-foreground/70">
                          <MapPin className="w-3.5 h-3.5 text-foreground/40 shrink-0" />
                          {u.location}
                        </span>
                      </td>

                      {/* Bookings */}
                      <td className="px-4 py-4">
                        <span className="flex items-center gap-1.5">
                          <ShoppingBag className="w-3.5 h-3.5 text-foreground/40" />
                          <span className="font-semibold">{u.bookings}</span>
                        </span>
                      </td>

                      {/* Total Spent */}
                      <td className="px-4 py-4">
                        {u.totalSpent > 0 ? (
                          <span className="flex items-center gap-1 font-bold text-primary">
                            <DollarSign className="w-3.5 h-3.5" />
                            {u.totalSpent.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-xs text-foreground/30 italic">
                            {u.role === 'provider' ? 'N/A' : '—'}
                          </span>
                        )}
                      </td>

                      {/* Last Active */}
                      <td className="px-4 py-4">
                        <span className="text-foreground/70">{u.lastActive}</span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLE[u.status]}`}>
                          {u.status === 'active'    && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />}
                          {u.status === 'pending'   && <span className="w-1.5 h-1.5 rounded-full bg-amber-500   inline-block" />}
                          {u.status === 'suspended' && <span className="w-1.5 h-1.5 rounded-full bg-red-500     inline-block" />}
                          {u.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end">
                          <button
                            type="button"
                            title="View user"
                            onClick={() => router.push(`/admin/users/${u.id}`)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground/50 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}
