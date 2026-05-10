'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { DashboardHeaderAdmin } from '@/components/header'
import { SidebarProvider, SidebarInset, AdminSidebarActions } from '@/components/ui/sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import {
  ArrowLeft, Trash2, MapPin, CalendarDays, DollarSign,
  CheckCircle, XCircle, Clock, Camera, Car, Mic2, Speaker,
  Utensils, AlertTriangle, Mail, Phone, User, BookOpen,
} from 'lucide-react'
import { ADMIN_BOOKINGS_SEED, Booking, BookingStatus } from '@/lib/admin-bookings-data'

/* ─── Style maps ─────────────────────────────────────────────────── */
const STATUS_STYLE: Record<BookingStatus, string> = {
  pending:   'bg-amber-50   text-amber-700   border border-amber-200',
  confirmed: 'bg-blue-50    text-blue-700    border border-blue-200',
  completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  cancelled: 'bg-red-50     text-red-700     border border-red-200',
}
const STATUS_DOT: Record<BookingStatus, string> = {
  pending:   'bg-amber-500',
  confirmed: 'bg-blue-500',
  completed: 'bg-emerald-500',
  cancelled: 'bg-red-500',
}
const CAT_STYLE: Record<string, { pill: string; icon: string }> = {
  photography: { pill: 'bg-purple-50 text-purple-700 border border-purple-200', icon: 'bg-purple-100 text-purple-600' },
  vehicles:    { pill: 'bg-sky-50    text-sky-700    border border-sky-200',    icon: 'bg-sky-100    text-sky-600'    },
  mc:          { pill: 'bg-orange-50 text-orange-700 border border-orange-200', icon: 'bg-orange-100 text-orange-600' },
  sound:       { pill: 'bg-indigo-50 text-indigo-700 border border-indigo-200', icon: 'bg-indigo-100 text-indigo-600' },
  catering:    { pill: 'bg-green-50  text-green-700  border border-green-200',  icon: 'bg-green-100  text-green-600'  },
}
const CAT_ICON: Record<string, React.ReactNode> = {
  photography: <Camera   className="w-5 h-5" />,
  vehicles:    <Car      className="w-5 h-5" />,
  mc:          <Mic2     className="w-5 h-5" />,
  sound:       <Speaker  className="w-5 h-5" />,
  catering:    <Utensils className="w-5 h-5" />,
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function AdminBookingDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id     = Number(params?.id)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [booking, setBooking]       = useState<Booking | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)

  useEffect(() => {
    const ok   = typeof window !== 'undefined' && window.localStorage.getItem('isLoggedIn') === 'true'
    const role = typeof window !== 'undefined' ? window.localStorage.getItem('userRole') : null
    if (!ok || role !== 'admin') { router.push('/auth/login'); return }
    setIsLoggedIn(true)
    setBooking(ADMIN_BOOKINGS_SEED.find((b) => b.id === id) ?? null)
  }, [id])

  if (!isLoggedIn || !booking) return null

  const cat  = CAT_STYLE[booking.serviceCategory] ?? CAT_STYLE.mc
  const icon = CAT_ICON[booking.serviceCategory]

  const handleStatusChange = (next: BookingStatus) =>
    setBooking((prev) => prev ? { ...prev, status: next } : prev)

  const handleDelete = () => router.push('/admin/bookings')

  const nextStatusActions: { label: string; status: BookingStatus; cls: string; icon: React.ReactNode }[] = booking.status === 'pending'
    ? [
        { label: 'Confirm Booking',  status: 'confirmed', cls: 'bg-blue-600 hover:bg-blue-700 text-white', icon: <CheckCircle className="w-4 h-4" /> },
        { label: 'Cancel Booking',   status: 'cancelled', cls: 'border hover:border-red-400 hover:text-red-600', icon: <XCircle className="w-4 h-4" /> },
      ]
    : booking.status === 'confirmed'
    ? [
        { label: 'Mark Completed',   status: 'completed', cls: 'bg-emerald-600 hover:bg-emerald-700 text-white', icon: <CheckCircle className="w-4 h-4" /> },
        { label: 'Cancel Booking',   status: 'cancelled', cls: 'border hover:border-red-400 hover:text-red-600', icon: <XCircle className="w-4 h-4" /> },
      ]
    : booking.status === 'cancelled'
    ? [
        { label: 'Reopen as Pending', status: 'pending', cls: 'border hover:border-amber-400 hover:text-amber-600', icon: <Clock className="w-4 h-4" /> },
      ]
    : []

  return (
    <SidebarProvider>
      <AdminSidebarActions />
      <SidebarInset>
        <DashboardHeaderAdmin />

        <div className="p-6 space-y-6">

          {/* ── Breadcrumb ─────────────────────────────────────────── */}
          <div className="flex items-center gap-2 text-sm text-foreground/50">
            <button
              type="button"
              onClick={() => router.push('/admin/bookings')}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Bookings
            </button>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-xs">#{booking.id} — {booking.customerName}</span>
          </div>

          {/* ── Hero header ────────────────────────────────────────── */}
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${cat.icon}`}>
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[booking.status]}`}>
                    <span className={`w-2 h-2 rounded-full inline-block ${STATUS_DOT[booking.status]}`} />
                    {booking.status}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${cat.pill}`}>
                    {booking.serviceCategory}
                  </span>
                </div>
                <h1 className="text-2xl font-bold leading-tight">{booking.serviceName}</h1>
                <p className="text-foreground/60 mt-1">Booked by <span className="font-medium text-foreground">{booking.customerName}</span> · {booking.providerName}</p>

                <div className="flex flex-wrap gap-4 mt-4 text-sm text-foreground/60">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {booking.location}</span>
                  <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> Event: {booking.eventDate}</span>
                  <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> Booked: {booking.createdAt}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 shrink-0 flex-wrap">
                {nextStatusActions.map((a) => (
                  <Button
                    key={a.status}
                    variant="outline"
                    className={`gap-2 ${a.cls}`}
                    onClick={() => handleStatusChange(a.status)}
                  >
                    {a.icon} {a.label}
                  </Button>
                ))}
                <Button variant="destructive" className="gap-2" onClick={() => setDeleteOpen(true)}>
                  <Trash2 className="w-4 h-4" /> Delete
                </Button>
              </div>
            </div>
          </Card>

          {/* ── Two-column body ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── Left: main details ─────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Customer info */}
              <Card className="p-6">
                <h2 className="text-base font-bold mb-4">Customer Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Name',  value: booking.customerName,  icon: <User  className="w-4 h-4 text-foreground/40" /> },
                    { label: 'Email', value: booking.customerEmail, icon: <Mail  className="w-4 h-4 text-foreground/40" /> },
                    { label: 'Phone', value: booking.customerPhone || '—', icon: <Phone className="w-4 h-4 text-foreground/40" /> },
                  ].map((row) => (
                    <div key={row.label} className="bg-muted/30 rounded-xl p-4 flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">{row.icon}</div>
                      <div>
                        <p className="text-xs text-foreground/50 uppercase tracking-wide font-medium mb-0.5">{row.label}</p>
                        <p className="font-semibold text-foreground break-all text-sm">{row.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Booking details */}
              <Card className="p-6">
                <h2 className="text-base font-bold mb-4">Booking Details</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Service',    value: booking.serviceName,     cls: 'col-span-2 sm:col-span-1' },
                    { label: 'Provider',   value: booking.providerName,    cls: '' },
                    { label: 'Category',   value: booking.serviceCategory, cls: '' },
                    { label: 'Location',   value: booking.location,        cls: '' },
                    { label: 'Event Date', value: booking.eventDate,       cls: '' },
                    { label: 'Booked On',  value: booking.createdAt,       cls: '' },
                  ].map((row) => (
                    <div key={row.label} className={`bg-muted/30 rounded-xl p-4 ${row.cls}`}>
                      <p className="text-xs text-foreground/50 uppercase tracking-wide font-medium mb-1.5">{row.label}</p>
                      <p className="font-semibold text-foreground capitalize">{row.value}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Notes */}
              {booking.notes && (
                <Card className="p-6">
                  <h2 className="text-base font-bold mb-3">Notes</h2>
                  <p className="text-foreground/70 leading-relaxed">{booking.notes}</p>
                </Card>
              )}
            </div>

            {/* ── Right sidebar ──────────────────────────────────────── */}
            <div className="space-y-4">

              {/* Payment summary */}
              <Card className="p-5">
                <h3 className="text-sm font-bold mb-3 text-foreground/70 uppercase tracking-wide">Payment Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">Service Price</span>
                    <span className="font-semibold">${booking.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">Platform Fee (5%)</span>
                    <span className="font-semibold text-foreground/70">${Math.round(booking.amount * 0.05).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex items-center justify-between">
                    <span className="text-sm font-bold">Total</span>
                    <span className="text-xl font-bold text-primary flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {Math.round(booking.amount * 1.05).toLocaleString()}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Status card */}
              <Card className="p-5">
                <h3 className="text-sm font-bold mb-3 text-foreground/70 uppercase tracking-wide">Current Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">Booking Status</span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_STYLE[booking.status]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full inline-block ${STATUS_DOT[booking.status]}`} />
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">Event Date</span>
                    <span className="text-sm font-medium">{booking.eventDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">Booked On</span>
                    <span className="text-sm font-medium">{booking.createdAt}</span>
                  </div>
                </div>

                {/* Quick status actions */}
                {nextStatusActions.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-foreground/50 mb-2">Update Status</p>
                    {nextStatusActions.map((a) => (
                      <Button
                        key={a.status}
                        variant="outline"
                        size="sm"
                        className={`w-full gap-2 justify-start ${a.cls}`}
                        onClick={() => handleStatusChange(a.status)}
                      >
                        {a.icon} {a.label}
                      </Button>
                    ))}
                  </div>
                )}
              </Card>

              {/* Warning cards */}
              {booking.status === 'pending' && (
                <Card className="p-4 border-amber-200 bg-amber-50">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-800">Awaiting Confirmation</p>
                      <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                        This booking is pending. Confirm it to notify the customer and provider.
                      </p>
                      <Button size="sm" className="mt-3 bg-amber-600 hover:bg-amber-700 text-white gap-1.5" onClick={() => handleStatusChange('confirmed')}>
                        <CheckCircle className="w-3.5 h-3.5" /> Confirm Now
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {booking.status === 'cancelled' && (
                <Card className="p-4 border-red-200 bg-red-50">
                  <div className="flex gap-3">
                    <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-800">Booking Cancelled</p>
                      <p className="text-xs text-red-700 mt-0.5 leading-relaxed">
                        This booking has been cancelled. You can reopen it as pending if needed.
                      </p>
                      <Button size="sm" className="mt-3 bg-red-600 hover:bg-red-700 text-white gap-1.5" onClick={() => handleStatusChange('pending')}>
                        <Clock className="w-3.5 h-3.5" /> Reopen
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {booking.status === 'completed' && (
                <Card className="p-4 border-emerald-200 bg-emerald-50">
                  <div className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-800">Booking Completed</p>
                      <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">
                        This booking was successfully completed. Revenue has been recorded.
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* ══ DELETE dialog ════════════════════════════════════════════ */}
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <DialogTitle>Delete Booking</DialogTitle>
              </div>
              <DialogDescription className="text-sm leading-relaxed">
                Are you sure you want to permanently delete the booking for{' '}
                <span className="font-semibold text-foreground">"{booking.customerName}"</span>?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteOpen(false)}>Keep Booking</Button>
              <Button variant="destructive" className="flex-1 gap-2" onClick={handleDelete}>
                <Trash2 className="w-4 h-4" /> Yes, Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </SidebarInset>
    </SidebarProvider>
  )
}
