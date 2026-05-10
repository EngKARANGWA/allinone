'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { DashboardHeaderAdmin } from '@/components/header'
import { SidebarProvider, SidebarInset, AdminSidebarActions } from '@/components/ui/sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import {
  ArrowLeft, CheckCircle, XCircle, Clock, RefreshCw,
  AlertTriangle, DollarSign, CalendarDays, BookOpen,
  CreditCard, Banknote, Smartphone, Landmark,
  Camera, Car, Mic2, Speaker, Utensils, Mail, User,
} from 'lucide-react'
import { ADMIN_PAYMENTS_SEED, Payment, PaymentStatus, PaymentMethod } from '@/lib/admin-payments-data'

/* ─── Style maps ─────────────────────────────────────────────────── */
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
const METHOD_STYLE: Record<PaymentMethod, string> = {
  momo: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  card: 'bg-blue-50   text-blue-700   border border-blue-200',
  bank: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
  cash: 'bg-green-50  text-green-700  border border-green-200',
}
const METHOD_ICON: Record<PaymentMethod, React.ReactNode> = {
  momo: <Smartphone className="w-4 h-4" />,
  card: <CreditCard className="w-4 h-4" />,
  bank: <Landmark   className="w-4 h-4" />,
  cash: <Banknote   className="w-4 h-4" />,
}
const METHOD_LABEL: Record<PaymentMethod, string> = {
  momo: 'MTN MoMo',
  card: 'Card',
  bank: 'Bank Transfer',
  cash: 'Cash',
}
const CAT_ICON: Record<string, React.ReactNode> = {
  photography: <Camera   className="w-5 h-5" />,
  vehicles:    <Car      className="w-5 h-5" />,
  mc:          <Mic2     className="w-5 h-5" />,
  sound:       <Speaker  className="w-5 h-5" />,
  catering:    <Utensils className="w-5 h-5" />,
}
const CAT_BG: Record<string, string> = {
  photography: 'bg-purple-100 text-purple-600',
  vehicles:    'bg-sky-100    text-sky-600',
  mc:          'bg-orange-100 text-orange-600',
  sound:       'bg-indigo-100 text-indigo-600',
  catering:    'bg-green-100  text-green-600',
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function AdminPaymentDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id     = Number(params?.id)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [payment, setPayment]       = useState<Payment | null>(null)
  const [refundOpen, setRefundOpen] = useState(false)

  useEffect(() => {
    const ok   = typeof window !== 'undefined' && window.localStorage.getItem('isLoggedIn') === 'true'
    const role = typeof window !== 'undefined' ? window.localStorage.getItem('userRole') : null
    if (!ok || role !== 'admin') { router.push('/auth/login'); return }
    setIsLoggedIn(true)
    setPayment(ADMIN_PAYMENTS_SEED.find((p) => p.id === id) ?? null)
  }, [id])

  if (!isLoggedIn || !payment) return null

  const catBg   = CAT_BG[payment.serviceCategory]   ?? CAT_BG.mc
  const catIcon = CAT_ICON[payment.serviceCategory]

  const handleMarkComplete = () => setPayment((prev) => prev ? { ...prev, status: 'completed' } : prev)
  const handleMarkFailed   = () => setPayment((prev) => prev ? { ...prev, status: 'failed'    } : prev)
  const handleRefund       = () => { setPayment((prev) => prev ? { ...prev, status: 'refunded' } : prev); setRefundOpen(false) }

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
              onClick={() => router.push('/admin/payments')}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Payments
            </button>
            <span>/</span>
            <span className="text-foreground font-medium font-mono">{payment.reference}</span>
          </div>

          {/* ── Hero header ────────────────────────────────────────── */}
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${catBg}`}>
                {catIcon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[payment.status]}`}>
                    <span className={`w-2 h-2 rounded-full inline-block ${STATUS_DOT[payment.status]}`} />
                    {payment.status}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${METHOD_STYLE[payment.method]}`}>
                    {METHOD_ICON[payment.method]}
                    {METHOD_LABEL[payment.method]}
                  </span>
                </div>
                <h1 className="text-2xl font-bold font-mono leading-tight">{payment.reference}</h1>
                <p className="text-foreground/60 mt-1">{payment.serviceName} · {payment.providerName}</p>

                <div className="flex flex-wrap gap-4 mt-4 text-sm text-foreground/60">
                  <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> {payment.date}</span>
                  <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> Booking #{payment.bookingId}</span>
                  <span className="flex items-center gap-1.5 font-bold text-primary">
                    <DollarSign className="w-4 h-4" /> {payment.amount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 shrink-0 flex-wrap">
                {payment.status === 'pending' && (
                  <>
                    <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleMarkComplete}>
                      <CheckCircle className="w-4 h-4" /> Mark Completed
                    </Button>
                    <Button variant="outline" className="gap-2 hover:border-red-400 hover:text-red-600" onClick={handleMarkFailed}>
                      <XCircle className="w-4 h-4" /> Mark Failed
                    </Button>
                  </>
                )}
                {payment.status === 'failed' && (
                  <Button variant="outline" className="gap-2 hover:border-amber-400 hover:text-amber-600" onClick={() => setPayment((prev) => prev ? { ...prev, status: 'pending' } : prev)}>
                    <Clock className="w-4 h-4" /> Reset to Pending
                  </Button>
                )}
                {payment.status === 'completed' && (
                  <Button variant="outline" className="gap-2 hover:border-purple-400 hover:text-purple-600" onClick={() => setRefundOpen(true)}>
                    <RefreshCw className="w-4 h-4" /> Issue Refund
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* ── Two-column body ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── Left: details ──────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Customer & service info */}
              <Card className="p-6">
                <h2 className="text-base font-bold mb-4">Transaction Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Customer',  value: payment.customerName,  icon: <User  className="w-4 h-4 text-foreground/40" /> },
                    { label: 'Email',     value: payment.customerEmail, icon: <Mail  className="w-4 h-4 text-foreground/40" /> },
                    { label: 'Service',   value: payment.serviceName,   icon: catIcon },
                    { label: 'Provider',  value: payment.providerName,  icon: <User  className="w-4 h-4 text-foreground/40" /> },
                    { label: 'Date',      value: payment.date,          icon: <CalendarDays className="w-4 h-4 text-foreground/40" /> },
                    { label: 'Booking',   value: `#${payment.bookingId}`, icon: <BookOpen className="w-4 h-4 text-foreground/40" /> },
                  ].map((row) => (
                    <div key={row.label} className="bg-muted/30 rounded-xl p-4 flex items-start gap-3">
                      <div className="mt-0.5 shrink-0 text-foreground/40">{row.icon}</div>
                      <div>
                        <p className="text-xs text-foreground/50 uppercase tracking-wide font-medium mb-0.5">{row.label}</p>
                        <p className="font-semibold text-foreground break-all">{row.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Payment breakdown */}
              <Card className="p-6">
                <h2 className="text-base font-bold mb-4">Payment Breakdown</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-foreground/60">Service Amount</span>
                    <span className="font-semibold">${payment.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-foreground/60">Platform Fee (5%)</span>
                    <span className="font-semibold text-primary">−${payment.platformFee.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border/50">
                    <span className="text-foreground/60">Provider Payout</span>
                    <span className="font-semibold text-emerald-600">${payment.providerPayout.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-bold">Total Charged</span>
                    <span className="text-2xl font-bold text-foreground flex items-center gap-1">
                      <DollarSign className="w-5 h-5 text-foreground/60" />
                      {payment.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Notes */}
              {payment.notes && (
                <Card className="p-6">
                  <h2 className="text-base font-bold mb-3">Notes</h2>
                  <p className="text-foreground/70 leading-relaxed">{payment.notes}</p>
                </Card>
              )}
            </div>

            {/* ── Right sidebar ──────────────────────────────────────── */}
            <div className="space-y-4">

              {/* Summary card */}
              <Card className="p-5">
                <h3 className="text-sm font-bold mb-4 text-foreground/70 uppercase tracking-wide">Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">Status</span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_STYLE[payment.status]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full inline-block ${STATUS_DOT[payment.status]}`} />
                      {payment.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">Method</span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${METHOD_STYLE[payment.method]}`}>
                      {METHOD_ICON[payment.method]}
                      {METHOD_LABEL[payment.method]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">Date</span>
                    <span className="text-sm font-medium">{payment.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">Reference</span>
                    <span className="text-xs font-mono font-semibold text-foreground/70">{payment.reference}</span>
                  </div>
                </div>

                {/* Inline status actions */}
                {payment.status !== 'refunded' && (
                  <div className="mt-4 pt-4 border-t border-border space-y-2">
                    {payment.status === 'pending' && (
                      <>
                        <Button size="sm" className="w-full gap-2 justify-start bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleMarkComplete}>
                          <CheckCircle className="w-3.5 h-3.5" /> Mark Completed
                        </Button>
                        <Button size="sm" variant="outline" className="w-full gap-2 justify-start hover:border-red-400 hover:text-red-600" onClick={handleMarkFailed}>
                          <XCircle className="w-3.5 h-3.5" /> Mark Failed
                        </Button>
                      </>
                    )}
                    {payment.status === 'completed' && (
                      <Button size="sm" variant="outline" className="w-full gap-2 justify-start hover:border-purple-400 hover:text-purple-600" onClick={() => setRefundOpen(true)}>
                        <RefreshCw className="w-3.5 h-3.5" /> Issue Refund
                      </Button>
                    )}
                    {payment.status === 'failed' && (
                      <Button size="sm" variant="outline" className="w-full gap-2 justify-start hover:border-amber-400 hover:text-amber-600" onClick={() => setPayment((prev) => prev ? { ...prev, status: 'pending' } : prev)}>
                        <Clock className="w-3.5 h-3.5" /> Reset to Pending
                      </Button>
                    )}
                  </div>
                )}
              </Card>

              {/* Revenue card */}
              <Card className="p-5">
                <h3 className="text-sm font-bold mb-3 text-foreground/70 uppercase tracking-wide">Revenue Split</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-foreground/60">Platform Fee</span>
                      <span className="font-semibold text-primary">${payment.platformFee.toLocaleString()}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '5%' }} />
                    </div>
                    <p className="text-xs text-foreground/40 mt-1">5% of total</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-foreground/60">Provider Payout</span>
                      <span className="font-semibold text-emerald-600">${payment.providerPayout.toLocaleString()}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: '95%' }} />
                    </div>
                    <p className="text-xs text-foreground/40 mt-1">95% of total</p>
                  </div>
                </div>
              </Card>

              {/* Warning cards */}
              {payment.status === 'pending' && (
                <Card className="p-4 border-amber-200 bg-amber-50">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-800">Awaiting Payment</p>
                      <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                        This transaction has not been confirmed yet. Verify with the customer before marking complete.
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {payment.status === 'failed' && (
                <Card className="p-4 border-red-200 bg-red-50">
                  <div className="flex gap-3">
                    <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-800">Payment Failed</p>
                      <p className="text-xs text-red-700 mt-0.5 leading-relaxed">
                        This transaction failed. Contact the customer to retry or choose another method.
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {payment.status === 'refunded' && (
                <Card className="p-4 border-purple-200 bg-purple-50">
                  <div className="flex gap-3">
                    <RefreshCw className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-purple-800">Refund Issued</p>
                      <p className="text-xs text-purple-700 mt-0.5 leading-relaxed">
                        ${payment.amount.toLocaleString()} has been refunded to the customer.
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* ══ REFUND dialog ════════════════════════════════════════════ */}
        <Dialog open={refundOpen} onOpenChange={setRefundOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-5 h-5 text-purple-600" />
                </div>
                <DialogTitle>Issue Refund</DialogTitle>
              </div>
              <DialogDescription className="text-sm leading-relaxed">
                Are you sure you want to refund{' '}
                <span className="font-semibold text-foreground">${payment.amount.toLocaleString()}</span>{' '}
                to <span className="font-semibold text-foreground">{payment.customerName}</span>?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setRefundOpen(false)}>Cancel</Button>
              <Button className="flex-1 gap-2 bg-purple-600 hover:bg-purple-700 text-white" onClick={handleRefund}>
                <RefreshCw className="w-4 h-4" /> Confirm Refund
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </SidebarInset>
    </SidebarProvider>
  )
}
