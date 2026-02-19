'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: wire real signup
    alert(`Sign up: ${name} <${email}>'`)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Create an account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm">
            <span className="text-foreground/70">Full name</span>
            <Input value={name} onChange={(e) => setName(e.target.value)} type="text" required className="mt-1" />
          </label>

          <label className="block text-sm">
            <span className="text-foreground/70">Email</span>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-1" />
          </label>

          <label className="block text-sm">
            <span className="text-foreground/70">Password</span>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="mt-1" />
          </label>

          <Button type="submit" className="w-full">Create account</Button>
        </form>

        <p className="text-sm text-foreground/70 mt-4">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </main>
  )
}
