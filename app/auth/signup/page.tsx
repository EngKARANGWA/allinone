'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'

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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex bg-white">
        <div className="hidden md:block md:w-1/2 relative bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-12 text-white">
          <div className="h-full flex flex-col justify-center">
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">WELCOME</h2>
            <p className="text-sm opacity-90 max-w-xs">Join us — create an account to manage bookings and services with ease.</p>
          </div>

          <div className="absolute -left-16 -bottom-16 w-40 h-40 rounded-full bg-blue-400 opacity-80 filter blur-xl"></div>
          <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-blue-300 opacity-70 transform translate-x-6 translate-y-6"></div>
          <div className="absolute bottom-12 right-12 w-20 h-20 rounded-full bg-indigo-400 opacity-80"></div>
        </div>

        <div className="w-full md:w-1/2 p-10 bg-white flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-6 text-left">
              <h1 className="text-2xl font-bold mb-2">Create an account</h1>
              <p className="text-sm text-slate-500">Sign up to start booking services and creating events.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} type="text" required className="mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="mt-1" />
              </div>

              <Button type="submit" className="w-full">Create account</Button>

              <p className="text-sm text-slate-500 text-center">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      </main>
    </div>
  )
}
