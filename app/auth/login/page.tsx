'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Dev-only hardcoded credentials
    const ADMIN = { email: 'admin@example.com', password: 'AdminPass123!' }
    const USER = { email: 'user@example.com', password: 'UserPass123!' }

    if (email === ADMIN.email && password === ADMIN.password) {
      router.push('/admin/dashboard')
      return
    }

    if (email === USER.email && password === USER.password) {
      router.push('/dashboard')
      return
    }

    setError('Invalid credentials — use dev credentials or sign up')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Sign in</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm">
            <span className="text-foreground/70">Email</span>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-1" />
          </label>

          <label className="block text-sm">
            <span className="text-foreground/70">Password</span>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="mt-1" />
          </label>

          <Button type="submit" className="w-full">Sign in</Button>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </form>

        <p className="text-sm text-foreground/70 mt-4">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </main>
  )
}
