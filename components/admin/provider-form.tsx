'use client'

import { Input } from '@/components/ui/input'
import type { ProviderStatus } from '@/lib/admin-providers-data'

export const PROVIDER_LOCATIONS  = ['Downtown', 'Kigali City', 'Kimironko', 'Remera', 'Nyamirambo']
export const PROVIDER_CATEGORIES = ['photography', 'vehicles', 'mc', 'sound', 'catering']

export interface ProviderFormData {
  name: string
  owner: string
  email: string
  phone: string
  category: string
  location: string
  status: ProviderStatus
  about: string
}

export interface ProviderFormErrors {
  name?: string
  owner?: string
  email?: string
  about?: string
}

export const EMPTY_PROVIDER: ProviderFormData = {
  name: '',
  owner: '',
  email: '',
  phone: '',
  category: 'photography',
  location: 'Downtown',
  status: 'active',
  about: '',
}

export function validateProviderForm(form: ProviderFormData): ProviderFormErrors {
  const errors: ProviderFormErrors = {}
  if (!form.name.trim())  errors.name  = 'Business name is required'
  if (!form.owner.trim()) errors.owner = 'Owner name is required'
  if (!form.email.trim()) errors.email = 'Email is required'
  if (!form.about.trim()) errors.about = 'About description is required'
  return errors
}

const SELECT = 'w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring capitalize'

interface ProviderFormProps {
  form: ProviderFormData
  errors: ProviderFormErrors
  onChange: (field: keyof ProviderFormData, value: string) => void
}

export function ProviderForm({ form, errors, onChange }: ProviderFormProps) {
  return (
    <div className="space-y-5 py-1">
      <div>
        <label className="text-sm font-medium mb-1.5 block">
          Business Name <span className="text-destructive">*</span>
        </label>
        <Input
          value={form.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="e.g. Golden Lens Studio"
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="text-sm font-medium mb-1.5 block">
          Owner Name <span className="text-destructive">*</span>
        </label>
        <Input
          value={form.owner}
          onChange={(e) => onChange('owner', e.target.value)}
          placeholder="e.g. Jean Paul Mugisha"
          className={errors.owner ? 'border-destructive' : ''}
        />
        {errors.owner && <p className="text-xs text-destructive mt-1">{errors.owner}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Email <span className="text-destructive">*</span>
          </label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="info@business.rw"
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Phone</label>
          <Input
            type="tel"
            value={form.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+250 788 000 000"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Category</label>
          <select
            title="Category"
            value={form.category}
            onChange={(e) => onChange('category', e.target.value)}
            className={SELECT}
          >
            {PROVIDER_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Location</label>
          <select
            title="Location"
            value={form.location}
            onChange={(e) => onChange('location', e.target.value)}
            className={SELECT}
          >
            {PROVIDER_LOCATIONS.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-1.5 block">Status</label>
        <select
          title="Status"
          value={form.status}
          onChange={(e) => onChange('status', e.target.value)}
          className={SELECT}
        >
          {(['active', 'pending', 'suspended'] as ProviderStatus[]).map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium mb-1.5 block">
          About <span className="text-destructive">*</span>
        </label>
        <textarea
          value={form.about}
          onChange={(e) => onChange('about', e.target.value)}
          rows={3}
          placeholder="Describe this provider's business and expertise..."
          className={`w-full border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none ${
            errors.about ? 'border-destructive' : 'border-border'
          }`}
        />
        {errors.about && <p className="text-xs text-destructive mt-1">{errors.about}</p>}
      </div>
    </div>
  )
}
