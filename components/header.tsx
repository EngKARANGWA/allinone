'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'


export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl text-primary hidden sm:inline">CeremonyHub</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="services" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
              Services
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#about" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
              About
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export { DashboardHeaderUser } from './header-user'
export { DashboardHeaderAdmin } from './header-admin'
