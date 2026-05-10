'use client'

import { useState } from 'react'
import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import {
  ProviderForm,
  ProviderFormData,
  ProviderFormErrors,
  EMPTY_PROVIDER,
  validateProviderForm,
} from '@/components/admin/provider-form'
import type { Provider } from '@/lib/admin-providers-data'

type NewProvider = Omit<Provider, 'id' | 'rating' | 'reviews' | 'services' | 'revenue' | 'joinedAt'>

interface AddProviderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (provider: NewProvider) => void
}

export function AddProviderDialog({ open, onOpenChange, onAdd }: AddProviderDialogProps) {
  const [form, setForm]     = useState<ProviderFormData>(EMPTY_PROVIDER)
  const [errors, setErrors] = useState<ProviderFormErrors>({})

  const handleChange = (field: keyof ProviderFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = () => {
    const errs = validateProviderForm(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    onAdd(form as NewProvider)
    setForm(EMPTY_PROVIDER)
    setErrors({})
    onOpenChange(false)
  }

  const handleClose = (open: boolean) => {
    if (!open) { setForm(EMPTY_PROVIDER); setErrors({}) }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-2 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <UserPlus className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-lg">Add New Provider</DialogTitle>
              <DialogDescription className="text-xs mt-0.5">
                Fill in all required fields to register a provider.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ProviderForm form={form} errors={errors} onChange={handleChange} />

        <DialogFooter className="gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => handleClose(false)}>Cancel</Button>
          <Button onClick={handleSubmit} className="gap-2">
            <UserPlus className="w-4 h-4" /> Add Provider
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
