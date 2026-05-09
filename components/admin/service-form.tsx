'use client'

import { Input } from '@/components/ui/input'
import type { ServiceStatus, AdminAvailability } from '@/lib/admin-services-data'

export const SERVICE_LOCATIONS  = ['Downtown', 'Kigali City', 'Kimironko', 'Remera', 'Nyamirambo']
export const SERVICE_CATEGORIES = ['photography', 'vehicles', 'mc', 'sound', 'catering']

export interface ServiceFormData {
  name: string
  provider: string
  category: string
  description: string
  price: number
  location: string
  availability: AdminAvailability
  status: ServiceStatus
}

export interface ServiceFormErrors {
  name?: string
  provider?: string
  description?: string
  price?: string
}

export const EMPTY_SERVICE: ServiceFormData = {
  name: '',
  provider: '',
  category: 'photography',
  description: '',
  price: 0,
  location: 'Downtown',
  availability: 'available',
  status: 'active',
}

export function validateServiceForm(form: ServiceFormData): ServiceFormErrors {
  const errors: ServiceFormErrors = {}
  if (!form.name.trim())        errors.name        = 'Service name is required'
  if (!form.provider.trim())    errors.provider    = 'Provider name is required'
  if (!form.description.trim()) errors.description = 'Description is required'
  if (form.price <= 0)          errors.price       = 'Price must be greater than 0'
  return errors
}

const SELECT = 'w-full border border-border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring capitalize'

interface ServiceFormProps {
  form: ServiceFormData
  errors: ServiceFormErrors
  onChange: (field: keyof ServiceFormData, value: string | number) => void
}

export function ServiceForm({ form, errors, onChange }: ServiceFormProps) {
  return (
    <div className="space-y-5 py-1">
      <div>
        <label className="text-sm font-medium mb-1.5 block">
          Service Name <span className="text-destructive">*</span>
        </label>
        <Input
          value={form.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="e.g. Luxury Wedding Photography"
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="text-sm font-medium mb-1.5 block">
          Provider Name <span className="text-destructive">*</span>
        </label>
        <Input
          value={form.provider}
          onChange={(e) => onChange('provider', e.target.value)}
          placeholder="e.g. Golden Lens Studio"
          className={errors.provider ? 'border-destructive' : ''}
        />
        {errors.provider && <p className="text-xs text-destructive mt-1">{errors.provider}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Category <span className="text-destructive">*</span>
          </label>
          <select
            title="Category"
            value={form.category}
            onChange={(e) => onChange('category', e.target.value)}
            className={SELECT}
          >
            {SERVICE_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">
            Price ($) <span className="text-destructive">*</span>
          </label>
          <Input
            type="number"
            min={1}
            value={form.price || ''}
            onChange={(e) => onChange('price', Number(e.target.value))}
            placeholder="0"
            className={errors.price ? 'border-destructive' : ''}
          />
          {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Location</label>
          <select
            title="Location"
            value={form.location}
            onChange={(e) => onChange('location', e.target.value)}
            className={SELECT}
          >
            {SERVICE_LOCATIONS.map((l) => <option key={l}>{l}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Availability</label>
          <select
            title="Availability"
            value={form.availability}
            onChange={(e) => onChange('availability', e.target.value)}
            className={SELECT}
          >
            {(['available', 'limited', 'booked'] as AdminAvailability[]).map((a) => (
              <option key={a} value={a}>{a.charAt(0).toUpperCase() + a.slice(1)}</option>
            ))}
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
          {(['active', 'pending', 'suspended'] as ServiceStatus[]).map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium mb-1.5 block">
          Description <span className="text-destructive">*</span>
        </label>
        <textarea
          value={form.description}
          onChange={(e) => onChange('description', e.target.value)}
          rows={3}
          placeholder="Describe what this service offers..."
          className={`w-full border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none ${
            errors.description ? 'border-destructive' : 'border-border'
          }`}
        />
        {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
      </div>
    </div>
  )
}
