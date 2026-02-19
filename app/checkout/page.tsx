import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, ArrowLeft } from 'lucide-react'

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button variant="ghost" className="gap-2 -ml-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Personal Information</h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input type="tel" placeholder="+1 (555) 123-4567" />
                </div>
              </div>
            </Card>

            {/* Event Details */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Event Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Event Name</label>
                  <Input placeholder="Sarah & John's Wedding" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Event Date</label>
                    <Input type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of Guests</label>
                    <Input type="number" placeholder="200" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Event Location</label>
                  <Input placeholder="Grand Ballroom, Downtown" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Special Requests</label>
                  <textarea
                    className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    placeholder="Any special requirements or notes..."
                  />
                </div>
              </div>
            </Card>

            {/* Payment Information */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Payment Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Card Number</label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expiry Date</label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVC</label>
                    <Input placeholder="123" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">ZIP Code</label>
                    <Input placeholder="12345" />
                  </div>
                </div>
                <label className="flex items-center gap-2 mt-4">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="text-sm">Save card for future bookings</span>
                </label>
              </div>
            </Card>

            {/* Security Notice */}
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <Lock className="w-5 h-5 text-green-600" />
              <div className="text-sm text-green-800">
                <p className="font-semibold">Your payment is secure</p>
                <p>All card data is encrypted and processed securely by Stripe</p>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6 pb-6 border-b">
                {[
                  { name: 'Luxury Wedding Photography', price: 5000 },
                  { name: 'Premium Wedding Car Service', price: 2500 },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-foreground/70">{item.name}</span>
                    <span className="font-semibold">${item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Subtotal</span>
                  <span>$7,500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Tax (10%)</span>
                  <span>$750</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Service Fee (2.9%)</span>
                  <span>$217</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary text-xl">$8,467</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <Button className="w-full bg-primary hover:bg-primary/90 mb-3 py-3">
                Complete Purchase
              </Button>
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t space-y-2 text-xs text-foreground/60">
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>PCI Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>24/7 Support</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
