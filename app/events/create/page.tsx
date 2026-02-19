import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { EventCreationForm } from '@/components/event-creation-form'

export default function CreateEventPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <EventCreationForm />
      </div>

      <Footer />
    </main>
  )
}
