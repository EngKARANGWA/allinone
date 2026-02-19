'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronRight } from 'lucide-react'

const CEREMONY_TYPES = [
  { id: 'wedding', name: 'Wedding', icon: '💍' },
  { id: 'birthday', name: 'Birthday', icon: '🎂' },
  { id: 'graduation', name: 'Graduation', icon: '🎓' },
  { id: 'introduction', name: 'Introduction', icon: '👥' },
]

export function EventCreationForm() {
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    guestCount: '',
    budget: '',
    location: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center flex-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  i <= step
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {i}
              </div>
              {i < 3 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-all ${
                    i < step ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Choose Ceremony Type */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">What type of ceremony are you planning?</h2>
          <p className="text-foreground/60 mb-8">Select the type of event to get started</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {CEREMONY_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-6 rounded-lg border-2 transition-all ${
                  selectedType === type.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-4xl mb-2">{type.icon}</div>
                <p className="font-semibold">{type.name}</p>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <div />
            <Button
              onClick={handleNext}
              disabled={!selectedType}
              className="gap-2"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Event Details */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Tell us about your event</h2>
          <p className="text-foreground/60 mb-8">Provide basic details for your ceremony</p>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Event Name</label>
              <Input
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
                placeholder="e.g., Sarah's Wedding"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Event Date</label>
              <Input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Number of Guests</label>
                <Input
                  type="number"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                  placeholder="e.g., 200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Budget ($)</label>
                <Input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="e.g., 50000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Downtown, City"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!formData.eventName || !formData.eventDate}
              className="gap-2"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Confirm */}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Review Your Event</h2>
          <p className="text-foreground/60 mb-8">Confirm your event details</p>

          <Card className="p-6 mb-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-foreground/60">Event Type</p>
                <p className="font-semibold capitalize">
                  {CEREMONY_TYPES.find((t) => t.id === selectedType)?.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Event Name</p>
                <p className="font-semibold">{formData.eventName}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Event Date</p>
                <p className="font-semibold">{formData.eventDate}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Location</p>
                <p className="font-semibold">{formData.location}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Number of Guests</p>
                <p className="font-semibold">{formData.guestCount}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Budget</p>
                <p className="font-semibold">${formData.budget}</p>
              </div>
            </div>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button className="gap-2">
              Create Event <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
