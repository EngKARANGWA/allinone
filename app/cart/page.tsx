import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export default function CartPage() {
  const cartItems = [
    {
      id: 1,
      name: 'Luxury Wedding Photography',
      provider: 'Golden Lens Studio',
      price: 5000,
    },
    {
      id: 2,
      name: 'Premium Wedding Car Service',
      provider: 'Elite Chauffeur Co.',
      price: 2500,
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const tax = Math.round(subtotal * 0.1)
  const total = subtotal + tax

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <Card key={item.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-foreground/60">{item.provider}</p>
                      </div>
                      <button className="text-muted-foreground hover:text-foreground">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-foreground/60">Price</span>
                      <span className="text-xl font-bold text-primary">
                        ${item.price.toLocaleString()}
                      </span>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-foreground/60">Your cart is empty</p>
                </Card>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Tax (10%)</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary text-xl">${total.toLocaleString()}</span>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 mb-3">
                Proceed to Checkout
              </Button>
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>

              <div className="mt-6 pt-6 border-t space-y-2 text-xs text-foreground/60">
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Secure payment processed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Money-back guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>24/7 customer support</span>
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
