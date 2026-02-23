'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Admin credentials
    if (email === 'admin@example.com' && password === 'password123') {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('isLoggedIn', 'true')
        window.localStorage.setItem('userRole', 'admin')
        window.localStorage.setItem('userEmail', email)
      }
      router.push('/admin/dashboard')
      return
    }

    // User credentials
    if (email === 'user@example.com' && password === 'password123') {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('isLoggedIn', 'true')
        window.localStorage.setItem('userRole', 'user')
        window.localStorage.setItem('userEmail', email)
      }
      router.push('/dashboard')
      return
    }

    setError('Invalid credentials')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <div className="text-xs text-muted-foreground mt-4">
            <p>Admin: admin@example.com / password123</p>
            <p>User: user@example.com / password123</p>
          </div>
        </form>
      </Card>
    </div>
  )
}
