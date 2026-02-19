import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { ServiceShowcase } from '@/components/service-showcase'
import { ServicesCatalogEnhanced } from '@/components/services-catalog-enhanced'
import { AnimatedFeatures } from '@/components/animated-features'
import { Features } from '@/components/features'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ServiceShowcase />
      <ServicesCatalogEnhanced />
      <AnimatedFeatures />
      <Features />
      <Footer />
    </main>
  )
}
