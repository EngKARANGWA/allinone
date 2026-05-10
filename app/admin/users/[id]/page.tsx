'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { DashboardHeaderAdmin } from '@/components/header'
import { SidebarProvider, SidebarInset, AdminSidebarActions } from '@/components/ui/sidebar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import {
  ArrowLeft, Trash2, MapPin, CalendarDays,
  CheckCircle, XCircle, Clock, AlertTriangle,
  Mail, Phone, ShoppingBag, DollarSign,
  UserCheck, UserX, ShieldCheck,
} from 'lucide-react'
import { ADMIN_USERS_SEED, AdminUser, UserStatus } from '@/lib/admin-users-data'

/* ─── Style maps ─────────────────────────────────────────────────── */
const STATUS_STYLE: Record<UserStatus, string> = {
  active:    'bg-emerald-50 text-emerald-700 border border-emerald-200',
  pending:   'bg-amber-50   text-amber-700   border border-amber-200',
  suspended: 'bg-red-50     text-red-700     border border-red-200',
}
const STATUS_DOT: Record<UserStatus, string> = {
  active:    'bg-emerald-500',
  pending:   'bg-amber-500',
  suspended: 'bg-red-500',
}
const AVATAR_BG = [
  'bg-blue-100    text-blue-700',
  'bg-purple-100  text-purple-700',
  'bg-emerald-100 text-emerald-700',
  'bg-orange-100  text-orange-700',
  'bg-pink-100    text-pink-700',
  'bg-indigo-100  text-indigo-700',
]

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function AdminUserDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id     = Number(params?.id)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser]             = useState<AdminUser | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)

  useEffect(() => {
    const ok   = typeof window !== 'undefined' && window.localStorage.getItem('isLoggedIn') === 'true'
    const role = typeof window !== 'undefined' ? window.localStorage.getItem('userRole') : null
    if (!ok || role !== 'admin') { router.push('/auth/login'); return }
    setIsLoggedIn(true)
    const idx = ADMIN_USERS_SEED.findIndex((u) => u.id === id)
    setUser(ADMIN_USERS_SEED[idx] ?? null)
  }, [id])

  if (!isLoggedIn || !user) return null

  const avatarBg = AVATAR_BG[(id - 1) % AVATAR_BG.length]

  const handleStatusToggle = () => {
    const next: UserStatus = user.status === 'active' ? 'suspended' : 'active'
    setUser((prev) => prev ? { ...prev, status: next } : prev)
  }

  const handleActivate = () => setUser((prev) => prev ? { ...prev, status: 'active' } : prev)
  const handleDelete   = () => router.push('/admin/users')

  const infoRows = [
    { label: 'Email',       value: user.email,              icon: <Mail        className="w-4 h-4 text-foreground/40" /> },
    { label: 'Phone',       value: user.phone || '—',       icon: <Phone       className="w-4 h-4 text-foreground/40" /> },
    { label: 'Location',    value: user.location,           icon: <MapPin      className="w-4 h-4 text-foreground/40" /> },
    { label: 'Joined',      value: user.joinedAt,           icon: <CalendarDays className="w-4 h-4 text-foreground/40" /> },
    { label: 'Last Active', value: user.lastActive,         icon: <Clock       className="w-4 h-4 text-foreground/40" /> },
    { label: 'Role',        value: user.role,               icon: user.role === 'customer' ? <UserCheck className="w-4 h-4 text-foreground/40" /> : <ShieldCheck className="w-4 h-4 text-foreground/40" /> },
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
              onClick={() => router.push('/admin/users')}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Users
            </button>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-xs">{user.name}</span>
          </div>

          {/* ── Hero header ────────────────────────────────────────── */}
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-xl font-bold ${avatarBg}`}>
                {initials(user.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[user.status]}`}>
                    <span className={`w-2 h-2 rounded-full inline-block ${STATUS_DOT[user.status]}`} />
                    {user.status}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                    user.role === 'customer'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-purple-50 text-purple-700 border border-purple-200'
                  }`}>
                    {user.role === 'customer' ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                    {user.role}
                  </span>
                </div>
                <h1 className="text-2xl font-bold leading-tight">{user.name}</h1>
                <p className="text-foreground/60 mt-1">{user.email}</p>

                <div className="flex flex-wrap gap-4 mt-4 text-sm text-foreground/60">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {user.location}</span>
                  <span className="flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> Joined {user.joinedAt}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Last active {user.lastActive}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 shrink-0 flex-wrap">
                <Button
                  variant="outline"
                  className={`gap-2 ${user.status === 'active' ? 'hover:border-amber-400 hover:text-amber-600' : 'hover:border-emerald-400 hover:text-emerald-600'}`}
                  onClick={handleStatusToggle}
                >
                  {user.status === 'active'
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

              {/* Bio */}
              {user.bio && (
                <Card className="p-6">
                  <h2 className="text-base font-bold mb-3">About</h2>
                  <p className="text-foreground/70 leading-relaxed">{user.bio}</p>
                </Card>
              )}

              {/* Contact & Info grid */}
              <Card className="p-6">
                <h2 className="text-base font-bold mb-4">User Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {infoRows.map((row) => (
                    <div key={row.label} className="bg-muted/30 rounded-xl p-4 flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">{row.icon}</div>
                      <div>
                        <p className="text-xs text-foreground/50 uppercase tracking-wide font-medium mb-0.5">{row.label}</p>
                        <p className="font-semibold text-foreground break-all capitalize">{row.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Activity summary */}
              <Card className="p-6">
                <h2 className="text-base font-bold mb-4">Activity Overview</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 rounded-xl p-5 text-center">
                    <ShoppingBag className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-blue-600">{user.bookings}</p>
                    <p className="text-xs text-foreground/50 mt-1 uppercase tracking-wide">
                      {user.role === 'provider' ? 'Orders Received' : 'Bookings Made'}
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-5 text-center">
                    <DollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-3xl font-bold text-primary">
                      {user.totalSpent > 0 ? `$${user.totalSpent.toLocaleString()}` : '—'}
                    </p>
                    <p className="text-xs text-foreground/50 mt-1 uppercase tracking-wide">
                      {user.role === 'provider' ? 'Revenue Generated' : 'Total Spent'}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* ── Right sidebar ──────────────────────────────────────── */}
            <div className="space-y-4">

              {/* Quick actions */}
              <Card className="p-5">
                <h3 className="text-sm font-bold mb-3 text-foreground/70 uppercase tracking-wide">Quick Actions</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className={`w-full gap-2 justify-start ${user.status === 'active' ? 'hover:border-amber-400 hover:text-amber-600' : 'hover:border-emerald-400 hover:text-emerald-600'}`}
                    onClick={handleStatusToggle}
                  >
                    {user.status === 'active'
                      ? <><XCircle className="w-4 h-4" /> Suspend Account</>
                      : <><CheckCircle className="w-4 h-4" /> Activate Account</>}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2 justify-start text-destructive hover:text-destructive hover:border-destructive"
                    onClick={() => setDeleteOpen(true)}
                  >
                    <Trash2 className="w-4 h-4" /> Delete User
                  </Button>
                </div>
              </Card>

              {/* Account status */}
              <Card className="p-5">
                <h3 className="text-sm font-bold mb-3 text-foreground/70 uppercase tracking-wide">Account Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">Status</span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_STYLE[user.status]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full inline-block ${STATUS_DOT[user.status]}`} />
                      {user.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">Role</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                      user.role === 'customer'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/60">Member Since</span>
                    <span className="text-sm font-medium">{user.joinedAt}</span>
                  </div>
                </div>
              </Card>

              {/* Warning cards */}
              {user.status === 'pending' && (
                <Card className="p-4 border-amber-200 bg-amber-50">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-800">Pending Verification</p>
                      <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                        This account is awaiting email verification. Activate it manually if needed.
                      </p>
                      <Button size="sm" className="mt-3 bg-amber-600 hover:bg-amber-700 text-white gap-1.5" onClick={handleActivate}>
                        <CheckCircle className="w-3.5 h-3.5" /> Activate Account
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {user.status === 'suspended' && (
                <Card className="p-4 border-red-200 bg-red-50">
                  <div className="flex gap-3">
                    <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-800">Account Suspended</p>
                      <p className="text-xs text-red-700 mt-0.5 leading-relaxed">
                        This user cannot log in or make bookings. Activate to restore access.
                      </p>
                      <Button size="sm" className="mt-3 bg-red-600 hover:bg-red-700 text-white gap-1.5" onClick={handleActivate}>
                        <CheckCircle className="w-3.5 h-3.5" /> Restore Access
                      </Button>
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
                <DialogTitle>Delete User</DialogTitle>
              </div>
              <DialogDescription className="text-sm leading-relaxed">
                Are you sure you want to permanently delete{' '}
                <span className="font-semibold text-foreground">"{user.name}"</span>?
                All their data will be removed and this action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteOpen(false)}>Keep User</Button>
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
