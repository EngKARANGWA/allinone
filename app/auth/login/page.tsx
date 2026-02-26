'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'

import { Header } from '@/components/header'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

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
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex bg-white">
        {/* Left decorative panel */}
        <div className="hidden md:block md:w-1/2 relative bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-12 text-white">
          <div className="h-full flex flex-col justify-center">
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">WELCOME</h2>
            <p className="text-sm opacity-90 max-w-xs">Your headline name — short descriptive text that highlights the product or service with a friendly tone.</p>
          </div>

          {/* Decorative circles */}
          <div className="absolute -left-16 -bottom-16 w-40 h-40 rounded-full bg-blue-400 opacity-80 filter blur-xl"></div>
          <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-blue-300 opacity-70 transform translate-x-6 translate-y-6"></div>
          <div className="absolute bottom-12 right-12 w-20 h-20 rounded-full bg-indigo-400 opacity-80"></div>
        </div>

        {/* Right form panel */}
        <div className="w-full md:w-1/2 p-10 bg-white flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-6 text-left">
              <h1 className="text-2xl font-bold mb-2">Sign in</h1>
              <p className="text-sm text-slate-500">Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" size="lg">Sign in</Button>

              <div className="text-center text-sm text-slate-500">
                <span>Don't have an account? </span>
                <Link href="/auth/signup" className="text-blue-600 font-semibold hover:underline">Sign up</Link>
              </div>

              <div className="mt-3 text-sm text-slate-400">
                <p className="font-semibold">Demo Credentials:</p>
                <p className="text-xs">Admin: admin@example.com / password123</p>
                <p className="text-xs">User: user@example.com / password123</p>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
