'use client'

import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                <span className="text-foreground font-bold">C</span>
              </div>
              <span className="font-bold text-lg">CeremonyHub</span>
            </div>
            <p className="text-background/70 text-sm">
              Your all-in-one platform for booking professional ceremony services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="#" className="hover:text-background transition-colors">Photography</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Vehicles</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">MC & Events</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Catering</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="#" className="hover:text-background transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="#" className="hover:text-background transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-background transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="bg-background/20 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-background/70">
          <p>&copy; 2024 CeremonyHub. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-background transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-background transition-colors">Facebook</Link>
            <Link href="#" className="hover:text-background transition-colors">Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
