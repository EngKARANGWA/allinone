"use client"

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { User, Lock, Bell, CreditCard, Camera, CheckCircle2 } from 'lucide-react'

export default function AccountPage() {
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+250 788 000 000',
    location: 'Kigali, Rwanda',
    bio: '',
  })
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })
  const [notifications, setNotifications] = useState({
    emailBooking: true,
    emailPromo: false,
    smsBooking: true,
    smsReminders: true,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-foreground/60 mb-8">Manage your profile and preferences</p>

        <Tabs defaultValue="profile">
          <TabsList className="mb-8 grid w-full grid-cols-4 max-w-lg">
            <TabsTrigger value="profile" className="gap-1.5">
              <User className="w-3.5 h-3.5" /> Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-1.5">
              <Bell className="w-3.5 h-3.5" /> Alerts
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-1.5">
              <CreditCard className="w-3.5 h-3.5" /> Billing
            </TabsTrigger>
          </TabsList>

          {/* Profile tab */}
          <TabsContent value="profile">
            <Card className="p-6">
              {/* Avatar */}
              <div className="flex items-center gap-5 mb-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold">
                    {profile.fullName[0]}
                  </div>
                  <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors">
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <p className="font-semibold text-lg">{profile.fullName}</p>
                  <p className="text-sm text-foreground/60">{profile.email}</p>
                </div>
              </div>

              <Separator className="mb-6" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                  <Input
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email Address</label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Location</label>
                  <Input
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium mb-1.5 block">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell providers a little about yourself..."
                    rows={3}
                    className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button onClick={handleSave} className="gap-2">
                  {saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : 'Save Changes'}
                </Button>
                {saved && <p className="text-sm text-green-600">Your profile has been updated.</p>}
              </div>
            </Card>
          </TabsContent>

          {/* Security tab */}
          <TabsContent value="security">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Change Password</h2>
              <div className="space-y-5 max-w-sm">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Current Password</label>
                  <Input
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">New Password</label>
                  <Input
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Confirm New Password</label>
                  <Input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    placeholder="••••••••"
                  />
                  {passwords.new && passwords.confirm && passwords.new !== passwords.confirm && (
                    <p className="text-xs text-destructive mt-1">Passwords do not match</p>
                  )}
                </div>
                <Button
                  disabled={!passwords.current || !passwords.new || passwords.new !== passwords.confirm}
                  onClick={handleSave}
                >
                  Update Password
                </Button>
              </div>

              <Separator className="my-8" />

              <h2 className="text-xl font-bold mb-4">Danger Zone</h2>
              <p className="text-sm text-foreground/60 mb-4">Permanently delete your account and all associated data.</p>
              <Button variant="destructive" size="sm">Delete Account</Button>
            </Card>
          </TabsContent>

          {/* Notifications tab */}
          <TabsContent value="notifications">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4 text-foreground/80">Email Notifications</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'emailBooking' as const, label: 'Booking confirmations & updates', desc: 'Get notified when a booking is confirmed, changed, or cancelled' },
                      { key: 'emailPromo'   as const, label: 'Promotions & offers',             desc: 'Receive special deals and featured services' },
                    ].map(({ key, label, desc }) => (
                      <label key={key} className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[key]}
                          onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                          className="mt-0.5 accent-primary"
                        />
                        <span>
                          <span className="block text-sm font-medium">{label}</span>
                          <span className="block text-xs text-foreground/60">{desc}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-4 text-foreground/80">SMS Notifications</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'smsBooking'    as const, label: 'Booking confirmations', desc: 'SMS when booking is confirmed or updated' },
                      { key: 'smsReminders'  as const, label: 'Event reminders',       desc: 'Reminder 24 hours before your booked event' },
                    ].map(({ key, label, desc }) => (
                      <label key={key} className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[key]}
                          onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                          className="mt-0.5 accent-primary"
                        />
                        <span>
                          <span className="block text-sm font-medium">{label}</span>
                          <span className="block text-xs text-foreground/60">{desc}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button onClick={handleSave} className="gap-2">
                  {saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : 'Save Preferences'}
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Billing tab */}
          <TabsContent value="billing">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Payment Methods</h2>

              <div className="space-y-3 mb-8">
                {[
                  { label: 'Visa ending in 4242', sub: 'Expires 08/27', icon: '💳', primary: true },
                  { label: 'Mobile Money (MTN)', sub: '+250 788 000 000', icon: '📱', primary: false },
                ].map((card) => (
                  <div key={card.label} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{card.icon}</span>
                      <div>
                        <p className="text-sm font-medium">{card.label}</p>
                        <p className="text-xs text-foreground/60">{card.sub}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {card.primary && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Primary</span>}
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Remove</Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="gap-2">
                <CreditCard className="w-4 h-4" /> Add Payment Method
              </Button>

              <Separator className="my-8" />

              <h2 className="text-xl font-bold mb-4">Billing History</h2>
              <div className="space-y-3">
                {[
                  { date: 'Apr 15, 2025', desc: 'Photography Booking #2041', amount: '$5,000', status: 'Paid' },
                  { date: 'Mar 02, 2025', desc: 'Catering Booking #1987',    amount: '$3,000', status: 'Paid' },
                  { date: 'Feb 20, 2025', desc: 'MC Services Booking #1854', amount: '$2,500', status: 'Refunded' },
                ].map((tx) => (
                  <div key={tx.date} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium">{tx.desc}</p>
                      <p className="text-xs text-foreground/60">{tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{tx.amount}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${tx.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
