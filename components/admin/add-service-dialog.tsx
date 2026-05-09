'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import {
  ServiceForm,
  ServiceFormData,
  ServiceFormErrors,
  EMPTY_SERVICE,
  validateServiceForm,
} from '@/components/admin/service-form'
import type { AdminService } from '@/lib/admin-services-data'

type NewService = Omit<AdminService, 'id' | 'rating' | 'reviews' | 'createdAt'>

interface AddServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (service: NewService) => void
}

export function AddServiceDialog({ open, onOpenChange, onAdd }: AddServiceDialogProps) {
  const [form, setForm]     = useState<ServiceFormData>(EMPTY_SERVICE)
  const [errors, setErrors] = useState<ServiceFormErrors>({})

  const handleChange = (field: keyof ServiceFormData, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = () => {
    const errs = validateServiceForm(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    onAdd(form as NewService)
    setForm(EMPTY_SERVICE)
    setErrors({})
    onOpenChange(false)
  }

  const handleClose = (open: boolean) => {
    if (!open) { setForm(EMPTY_SERVICE); setErrors({}) }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-2 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Plus className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-lg">Add New Service</DialogTitle>
              <DialogDescription className="text-xs mt-0.5">
                Fill in all required fields to create a listing.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ServiceForm form={form} errors={errors} onChange={handleChange} />

        <DialogFooter className="gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => handleClose(false)}>Cancel</Button>
          <Button onClick={handleSubmit} className="gap-2">
            <Plus className="w-4 h-4" /> Create Service
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
