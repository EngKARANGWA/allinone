'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardHeaderAdmin } from '@/components/header'
import { SidebarProvider, SidebarInset, AdminSidebarActions } from '@/components/ui/sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ADMIN_PAYMENTS_SEED, Payment, PaymentStatus, PaymentMethod } from '@/lib/admin-payments-data'
import {
  Eye, DollarSign, CheckCircle, Clock, XCircle, RefreshCw,
  Search, SlidersHorizontal, X, Camera, Car, Mic2, Speaker,
  Utensils, TrendingUp, CreditCard, Banknote, Smartphone, Landmark,
} from 'lucide-react'

const STATUS_STYLE: Record<PaymentStatus, string> = {
  completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  pending:   'bg-amber-50   text-amber-700   border border-amber-200',
  failed:    'bg-red-50     text-red-700     border border-red-200',
  refunded:  'bg-purple-50  text-purple-700  border border-purple-200',
}
const STATUS_DOT: Record<PaymentStatus, string> = {
  completed: 'bg-emerald-500',
  pending:   'bg-amber-500',
  failed:    'bg-red-500',
  refunded:  'bg-purple-500',
}
const STATUS_ICON: Record<PaymentStatus, React.ReactNode> = {
  completed: <CheckCircle className="w-4 h-4" />,
  pending:   <Clock       className="w-4 h-4" />,
  failed:    <XCircle     className="w-4 h-4" />,
  refunded:  <RefreshCw   className="w-4 h-4" />,
}

const METHOD_STYLE: Record<PaymentMethod, string> = {
  momo: 'bg-yellow-50  text-yellow-700  border border-yellow-200',
  card: 'bg-blue-50    text-blue-700    border border-blue-200',
  bank: 'bg-indigo-50  text-indigo-700  border border-indigo-200',
  cash: 'bg-green-50   text-green-700   border border-green-200',
}
const METHOD_ICON: Record<PaymentMethod, React.ReactNode> = {
  momo: <Smartphone className="w-3.5 h-3.5" />,
  card: <CreditCard className="w-3.5 h-3.5" />,
  bank: <Landmark   className="w-3.5 h-3.5" />,
  cash: <Banknote   className="w-3.5 h-3.5" />,
}
const METHOD_LABEL: Record<PaymentMethod, string> = {
  momo: 'MoMo',
  card: 'Card',
  bank: 'Bank',
  cash: 'Cash',
}

const CAT_ICON: Record<string, React.ReactNode> = {
  photography: <Camera   className="w-3.5 h-3.5" />,
  vehicles:    <Car      className="w-3.5 h-3.5" />,
  mc:          <Mic2     className="w-3.5 h-3.5" />,
  sound:       <Speaker  className="w-3.5 h-3.5" />,
  catering:    <Utensils className="w-3.5 h-3.5" />,
}

const SELECT_CLS = 'w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring'

export default function AdminPaymentsPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn]   = useState(false)
  const [payments]                    = useState<Payment[]>(ADMIN_PAYMENTS_SEED)
  const [search, setSearch]           = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const ok   = typeof window !== 'undefined' && window.localStorage.getItem('isLoggedIn') === 'true'
    const role = typeof window !== 'undefined' ? window.localStorage.getItem('userRole') : null
    if (!ok || role !== 'admin') { router.push('/auth/login'); return }
    setIsLoggedIn(true)
  }, [])

  if (!isLoggedIn) return null

  const totalRevenue   = payments.filter((p) => p.status === 'completed').reduce((s, p) => s + p.amount, 0)
  const totalFees      = payments.filter((p) => p.status === 'completed').reduce((s, p) => s + p.platformFee, 0)
  const totalPending   = payments.filter((p) => p.status === 'pending').reduce((s, p) => s + p.amount, 0)
  const completed      = payments.filter((p) => p.status === 'completed').length
  const pending        = payments.filter((p) => p.status === 'pending').length
  const failed         = payments.filter((p) => p.status === 'failed').length
  const refunded       = payments.filter((p) => p.status === 'refunded').length

  const activeFilterCount = [statusFilter !== 'all', methodFilter !== 'all'].filter(Boolean).length
  const clearFilters = () => { setSearch(''); setStatusFilter('all'); setMethodFilter('all') }

  const displayed = payments.filter((p) => {
    const q = search.toLowerCase()
    if (q && !p.customerName.toLowerCase().includes(q) && !p.reference.toLowerCase().includes(q) && !p.providerName.toLowerCase().includes(q)) return false
    if (statusFilter !== 'all' && p.status !== statusFilter) return false
    if (methodFilter !== 'all' && p.method !== methodFilter) return false
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
              <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
              <p className="text-sm text-foreground/60 mt-0.5">Track all transactions and platform revenue</p>
            </div>
            <div className="flex items-center gap-6 shrink-0">
              <div className="text-right">
                <p className="text-xs text-foreground/50 uppercase tracking-wide font-medium">Platform Fees Collected</p>
                <p className="text-xl font-bold text-primary">${totalFees.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-foreground/50 uppercase tracking-wide font-medium">Total GMV</p>
                <p className="text-xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Completed', value: completed,  icon: <CheckCircle className="w-5 h-5" />, iconBg: 'bg-emerald-100 text-emerald-600', valueCls: 'text-emerald-600', sub: `$${totalRevenue.toLocaleString()}` },
              { label: 'Pending',   value: pending,    icon: <Clock       className="w-5 h-5" />, iconBg: 'bg-amber-100   text-amber-600',   valueCls: 'text-amber-600',   sub: `$${totalPending.toLocaleString()}` },
              { label: 'Failed',    value: failed,     icon: <XCircle     className="w-5 h-5" />, iconBg: 'bg-red-100     text-red-600',     valueCls: 'text-red-600',     sub: 'needs attention' },
              { label: 'Refunded',  value: refunded,   icon: <RefreshCw   className="w-5 h-5" />, iconBg: 'bg-purple-100  text-purple-600',  valueCls: 'text-purple-600',  sub: 'returned to customers' },
            ].map((stat) => (
              <Card key={stat.label} className="p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${stat.iconBg}`}>
                    {stat.icon}
                  </div>
                  <p className="text-xs font-medium text-foreground/50 uppercase tracking-wide">{stat.label}</p>
                </div>
                <p className={`text-3xl font-bold ${stat.valueCls}`}>{stat.value}</p>
                <p className="text-xs text-foreground/40 mt-1">{stat.sub}</p>
              </Card>
            ))}
          </div>

          {/* Revenue summary bar */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold">Revenue by Payment Method</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(['momo', 'card', 'bank', 'cash'] as PaymentMethod[]).map((m) => {
                const total = payments.filter((p) => p.method === m && p.status === 'completed').reduce((s, p) => s + p.amount, 0)
                return (
                  <div key={m} className={`rounded-xl px-4 py-3 flex items-center gap-3 ${METHOD_STYLE[m]}`}>
                    {METHOD_ICON[m]}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide">{METHOD_LABEL[m]}</p>
                      <p className="font-bold text-sm">${total.toLocaleString()}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Search + Filter */}
          <Card className="p-4 space-y-4">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  placeholder="Search by reference, customer or provider..."
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
                  <label className="text-xs font-semibold uppercase tracking-wide text-foreground/50 mb-2 block">Status</label>
                  <select title="Filter status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={SELECT_CLS}>
                    <option value="all">All Statuses</option>
                    {(['completed', 'pending', 'failed', 'refunded'] as PaymentStatus[]).map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-foreground/50 mb-2 block">Payment Method</label>
                  <select title="Filter method" value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)} className={SELECT_CLS}>
                    <option value="all">All Methods</option>
                    {(['momo', 'card', 'bank', 'cash'] as PaymentMethod[]).map((m) => (
                      <option key={m} value={m}>{METHOD_LABEL[m]}</option>
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
                Showing <span className="font-bold text-foreground">{displayed.length}</span> of <span className="font-bold text-foreground">{payments.length}</span> transactions
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30 text-left text-xs uppercase tracking-wider text-foreground/50">
                    <th className="px-5 py-3 font-semibold">Reference</th>
                    <th className="px-4 py-3 font-semibold">Customer</th>
                    <th className="px-4 py-3 font-semibold">Service</th>
                    <th className="px-4 py-3 font-semibold">Method</th>
                    <th className="px-4 py-3 font-semibold">Amount</th>
                    <th className="px-4 py-3 font-semibold">Fee</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {displayed.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-5 py-16 text-center">
                        <div className="flex flex-col items-center gap-2 text-foreground/40">
                          <DollarSign className="w-10 h-10" />
                          <p className="font-medium">No payments match your filters</p>
                          <Button variant="ghost" size="sm" onClick={clearFilters} className="mt-1">Clear filters</Button>
                        </div>
                      </td>
                    </tr>
                  ) : displayed.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => router.push(`/admin/payments/${p.id}`)}>

                      {/* Reference */}
                      <td className="px-5 py-4">
                        <p className="font-mono text-xs font-semibold text-foreground/70">{p.reference}</p>
                        <p className="text-xs text-foreground/40 mt-0.5">Booking #{p.bookingId}</p>
                      </td>

                      {/* Customer */}
                      <td className="px-4 py-4">
                        <p className="font-semibold leading-tight">{p.customerName}</p>
                        <p className="text-xs text-foreground/50 mt-0.5">{p.customerEmail}</p>
                      </td>

                      {/* Service */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5 text-foreground/70">
                          {CAT_ICON[p.serviceCategory]}
                          <span className="line-clamp-1">{p.serviceName}</span>
                        </div>
                        <p className="text-xs text-foreground/40 mt-0.5">{p.providerName}</p>
                      </td>

                      {/* Method */}
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${METHOD_STYLE[p.method]}`}>
                          {METHOD_ICON[p.method]}
                          {METHOD_LABEL[p.method]}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="px-4 py-4">
                        <span className="font-bold text-foreground flex items-center gap-0.5">
                          <DollarSign className="w-3.5 h-3.5 text-foreground/50" />
                          {p.amount.toLocaleString()}
                        </span>
                      </td>

                      {/* Platform fee */}
                      <td className="px-4 py-4">
                        <span className="text-primary font-semibold flex items-center gap-0.5">
                          <DollarSign className="w-3 h-3" />
                          {p.platformFee.toLocaleString()}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-4">
                        <span className="text-foreground/70">{p.date}</span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLE[p.status]}`}>
                          <span className={`w-1.5 h-1.5 rounded-full inline-block ${STATUS_DOT[p.status]}`} />
                          {p.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end">
                          <button
                            type="button"
                            title="View payment"
                            onClick={() => router.push(`/admin/payments/${p.id}`)}
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
