'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { DashboardHeaderAdmin } from '@/components/header'
import { SidebarProvider, SidebarInset, AdminSidebarActions } from '@/components/ui/sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import {
  ArrowLeft, Pencil, Trash2, Star, MapPin, CalendarDays,
  CheckCircle, XCircle, Camera, Car,
  Mic2, Speaker, Utensils, ShieldCheck, AlertTriangle,
} from 'lucide-react'
import { ADMIN_SERVICES_SEED, AdminService, ServiceStatus, AdminAvailability } from '@/lib/admin-services-data'
import { ServiceForm, ServiceFormData, ServiceFormErrors, validateServiceForm } from '@/components/admin/service-form'

/* ─── Style maps ─────────────────────────────────────────────────── */
const STATUS_STYLE: Record<ServiceStatus, string> = {
  active:    'bg-emerald-50 text-emerald-700 border border-emerald-200',
  pending:   'bg-amber-50   text-amber-700   border border-amber-200',
  suspended: 'bg-red-50     text-red-700     border border-red-200',
}
const STATUS_ICON: Record<ServiceStatus, React.ReactNode> = {
  active:    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />,
  pending:   <span className="w-2 h-2 rounded-full bg-amber-500   inline-block" />,
  suspended: <span className="w-2 h-2 rounded-full bg-red-500     inline-block" />,
}
const AVAIL_STYLE: Record<AdminAvailability, string> = {
  available: 'bg-blue-50   text-blue-700   border border-blue-200',
  limited:   'bg-orange-50 text-orange-700 border border-orange-200',
  booked:    'bg-gray-100  text-gray-600   border border-gray-200',
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
export default function AdminServiceDetailPage() {
  const router   = useRouter()
  const params   = useParams()
  const id       = Number(params?.id)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [service, setService]       = useState<AdminService | null>(null)

  const [editOpen, setEditOpen]     = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [form, setForm]             = useState<ServiceFormData>({
    name: '', provider: '', category: 'photography', description: '',
    price: 0, location: 'Downtown', availability: 'available', status: 'active',
  })
  const [formErrors, setFormErrors] = useState<ServiceFormErrors>({})

  useEffect(() => {
    const ok   = typeof window !== 'undefined' && window.localStorage.getItem('isLoggedIn') === 'true'
    const role = typeof window !== 'undefined' ? window.localStorage.getItem('userRole') : null
    if (!ok || role !== 'admin') { router.push('/auth/login'); return }
    setIsLoggedIn(true)

    const found = ADMIN_SERVICES_SEED.find((s) => s.id === id) ?? null
    setService(found)
    if (found) {
      setForm({
        name: found.name, provider: found.provider, category: found.category,
        description: found.description, price: found.price, location: found.location,
        availability: found.availability, status: found.status,
      })
    }
  }, [id])

  if (!isLoggedIn || !service) return null

  const cat  = CAT_STYLE[service.category]  ?? CAT_STYLE.mc
  const icon = CAT_ICON[service.category]

  const handleFormChange = (field: keyof ServiceFormData, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSave = () => {
    const errs = validateServiceForm(form)
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return }
    setService((prev) => prev ? { ...prev, ...form } : prev)
    setEditOpen(false)
    setFormErrors({})
  }

  const handleDelete = () => {
    router.push('/admin/services')
  }

  const handleStatusToggle = () => {
    const next: ServiceStatus = service.status === 'active' ? 'suspended' : 'active'
    setService((prev) => prev ? { ...prev, status: next } : prev)
  }

  const infoRows = [
    { label: 'Price',        value: `$${service.price.toLocaleString()}`,     cls: 'text-primary text-xl font-bold' },
    { label: 'Location',     value: service.location,                          cls: '' },
    { label: 'Listed On',    value: service.createdAt,                         cls: '' },
    { label: 'Reviews',      value: service.reviews > 0 ? `${service.reviews} reviews` : 'No reviews yet', cls: '' },
    { label: 'Rating',       value: service.rating > 0 ? `${service.rating} / 5.0` : '—',                  cls: '' },
    { label: 'Bookings',     value: service.reviews > 0 ? `${Math.round(service.reviews * 0.8)}+` : '0',   cls: '' },
  ]

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
              onClick={() => router.push('/admin/services')}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Services
            </button>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-xs">{service.name}</span>
          </div>

          {/* ── Hero header ────────────────────────────────────────── */}
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${cat.icon}`}>
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[service.status]}`}>
                    {STATUS_ICON[service.status]} {service.status}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${AVAIL_STYLE[service.availability]}`}>
                    {service.availability}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${cat.pill}`}>
                    {service.category}
                  </span>
                </div>
                <h1 className="text-2xl font-bold leading-tight">{service.name}</h1>
                <p className="text-foreground/60 mt-1">{service.provider}</p>

                <div className="flex flex-wrap gap-4 mt-4 text-sm text-foreground/60">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {service.location}</span>
                  <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> Listed {service.createdAt}</span>
                  {service.reviews > 0 && (
                    <span className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {service.rating} ({service.reviews} reviews)
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" className="gap-2" onClick={() => setEditOpen(true)}>
                  <Pencil className="w-4 h-4" /> Edit
                </Button>
                <Button
                  variant="outline"
                  className={`gap-2 ${service.status === 'active' ? 'hover:border-amber-400 hover:text-amber-600' : 'hover:border-emerald-400 hover:text-emerald-600'}`}
                  onClick={handleStatusToggle}
                >
                  {service.status === 'active'
                    ? <><XCircle className="w-4 h-4" /> Suspend</>
                    : <><CheckCircle className="w-4 h-4" /> Activate</>}
                </Button>
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

              {/* Description */}
              <Card className="p-6">
                <h2 className="text-base font-bold mb-3">Description</h2>
                <p className="text-foreground/70 leading-relaxed">{service.description}</p>
              </Card>

              {/* Info grid */}
              <Card className="p-6">
                <h2 className="text-base font-bold mb-4">Service Details</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {infoRows.map((row) => (
                    <div key={row.label} className="bg-muted/30 rounded-xl p-4">
                      <p className="text-xs text-foreground/50 uppercase tracking-wide font-medium mb-1.5">{row.label}</p>
                      <p className={`font-semibold ${row.cls || 'text-foreground'}`}>{row.value}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Rating breakdown */}
              {service.reviews > 0 && (
                <Card className="p-6">
                  <h2 className="text-base font-bold mb-4">Rating Overview</h2>
                  <div className="flex items-center gap-6">
                    <div className="text-center shrink-0">
                      <p className="text-5xl font-bold text-primary">{service.rating}</p>
                      <div className="flex justify-center mt-1.5">
                        {[1,2,3,4,5].map((i) => (
                          <Star key={i} className={`w-4 h-4 ${i <= Math.round(service.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-foreground/20'}`} />
                        ))}
                      </div>
                      <p className="text-xs text-foreground/50 mt-1">{service.reviews} reviews</p>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5,4,3,2,1].map((star) => {
                        const fill = star === Math.round(service.rating) ? 'w-3/4' : star > Math.round(service.rating) ? 'w-1/4' : 'w-1/2'
                        return (
                          <div key={star} className="flex items-center gap-2 text-xs">
                            <span className="w-3 text-right text-foreground/60">{star}</span>
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 shrink-0" />
                            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                              <div className={`h-full bg-yellow-400 rounded-full ${fill}`} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* ── Right: sidebar cards ───────────────────────────────── */}
            <div className="space-y-4">

              {/* Quick actions */}
              <Card className="p-5">
                <h3 className="text-sm font-bold mb-3 text-foreground/70 uppercase tracking-wide">Quick Actions</h3>
                <div className="space-y-2">
                  <Button className="w-full gap-2 justify-start" onClick={() => setEditOpen(true)}>
                    <Pencil className="w-4 h-4" /> Edit Service Details
                  </Button>
                  <Button
                    variant="outline"
                    className={`w-full gap-2 justify-start ${service.status === 'active' ? 'hover:border-amber-400 hover:text-amber-600' : 'hover:border-emerald-400 hover:text-emerald-600'}`}
                    onClick={handleStatusToggle}
                  >
                    {service.status === 'active'
                      ? <><XCircle className="w-4 h-4" /> Suspend This Service</>
                      : <><CheckCircle className="w-4 h-4" /> Activate This Service</>}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2 justify-start"
                    onClick={() => router.push(`/services/${service.id}`)}
                  >
                    <ShieldCheck className="w-4 h-4" /> View Public Listing
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2 justify-start text-destructive hover:text-destructive hover:border-destructive"
                    onClick={() => setDeleteOpen(true)}
                  >
                    <Trash2 className="w-4 h-4" /> Delete Service
                  </Button>
                </div>
              </Card>

              {/* Status card */}
              <Card className="p-5">
                <h3 className="text-sm font-bold mb-3 text-foreground/70 uppercase tracking-wide">Current Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">Listing Status</span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_STYLE[service.status]}`}>
                      {STATUS_ICON[service.status]} {service.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">Availability</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${AVAIL_STYLE[service.availability]}`}>
                      {service.availability}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">Category</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${cat.pill}`}>
                      {service.category}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Pending warning */}
              {service.status === 'pending' && (
                <Card className="p-4 border-amber-200 bg-amber-50">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-800">Pending Review</p>
                      <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                        This service is awaiting admin approval before it appears publicly.
                      </p>
                      <Button size="sm" className="mt-3 bg-amber-600 hover:bg-amber-700 text-white gap-1.5" onClick={handleStatusToggle}>
                        <CheckCircle className="w-3.5 h-3.5" /> Approve & Activate
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Suspended warning */}
              {service.status === 'suspended' && (
                <Card className="p-4 border-red-200 bg-red-50">
                  <div className="flex gap-3">
                    <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-800">Service Suspended</p>
                      <p className="text-xs text-red-700 mt-0.5 leading-relaxed">
                        This listing is hidden from public view. Activate it to restore visibility.
                      </p>
                      <Button size="sm" className="mt-3 bg-red-600 hover:bg-red-700 text-white gap-1.5" onClick={handleStatusToggle}>
                        <CheckCircle className="w-3.5 h-3.5" /> Reactivate
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* ══ EDIT dialog ══════════════════════════════════════════════ */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader className="pb-3 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Pencil className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <DialogTitle>Edit Service</DialogTitle>
                  <DialogDescription className="text-xs mt-0.5 truncate max-w-xs">{service.name}</DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <ServiceForm form={form} errors={formErrors} onChange={handleFormChange} />

            <DialogFooter className="gap-2 pt-3 border-t">
              <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} className="gap-2"><Pencil className="w-4 h-4" /> Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ══ DELETE dialog ════════════════════════════════════════════ */}
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <DialogTitle>Delete Service</DialogTitle>
              </div>
              <DialogDescription className="text-sm leading-relaxed">
                Are you sure you want to permanently delete{' '}
                <span className="font-semibold text-foreground">"{service.name}"</span>?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteOpen(false)}>Keep Service</Button>
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
