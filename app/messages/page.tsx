"use client"

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState, useRef, useEffect } from 'react'
import { Send, Search, Phone, MoreVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

type Message = { id: number; from: 'user' | 'provider'; text: string; time: string }

const CONVERSATIONS = [
  {
    id: 1,
    provider: 'Golden Lens Studio',
    avatar: 'G',
    service: 'Photography',
    lastMsg: 'Thank you! We will confirm the date shortly.',
    time: '10:42 AM',
    unread: 2,
    messages: [
      { id: 1, from: 'user',     text: 'Hi, I would like to book your photography service for my wedding on June 14th.',        time: '10:30 AM' },
      { id: 2, from: 'provider', text: 'Hello! Thank you for reaching out. June 14th looks available. What package are you interested in?', time: '10:33 AM' },
      { id: 3, from: 'user',     text: 'The Standard package please. Does it include a pre-wedding shoot?',                     time: '10:38 AM' },
      { id: 4, from: 'provider', text: 'Yes! The Standard package includes a 2-hour pre-wedding shoot and full ceremony coverage.', time: '10:40 AM' },
      { id: 5, from: 'provider', text: 'Thank you! We will confirm the date shortly.',                                          time: '10:42 AM' },
    ] as Message[],
  },
  {
    id: 2,
    provider: 'LuxRide Rwanda',
    avatar: 'L',
    service: 'Wedding Vehicles',
    lastMsg: 'The convoy will be ready by 9 AM.',
    time: 'Yesterday',
    unread: 0,
    messages: [
      { id: 1, from: 'user',     text: 'Do you have a Mercedes S-Class available for May 30th?',                       time: 'Yesterday' },
      { id: 2, from: 'provider', text: 'Yes, we have two available. Would you like a full convoy package?',            time: 'Yesterday' },
      { id: 3, from: 'user',     text: 'Yes please, for 10 guests.',                                                   time: 'Yesterday' },
      { id: 4, from: 'provider', text: 'The convoy will be ready by 9 AM.',                                            time: 'Yesterday' },
    ] as Message[],
  },
  {
    id: 3,
    provider: 'EventPro Rwanda',
    avatar: 'E',
    service: 'MC & Events',
    lastMsg: 'Looking forward to hosting your event!',
    time: 'Mon',
    unread: 0,
    messages: [
      { id: 1, from: 'provider', text: 'Hello! I see you viewed my profile. How can I help with your event?', time: 'Mon' },
      { id: 2, from: 'user',     text: 'We need an MC for a graduation ceremony on July 5th.',                time: 'Mon' },
      { id: 3, from: 'provider', text: 'That sounds wonderful! I have hosted over 50 graduation ceremonies.',  time: 'Mon' },
      { id: 4, from: 'provider', text: 'Looking forward to hosting your event!',                              time: 'Mon' },
    ] as Message[],
  },
]

export default function MessagesPage() {
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id)
  const [allConvos, setAllConvos] = useState(CONVERSATIONS)
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const active = allConvos.find((c) => c.id === activeId)!

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeId, active?.messages.length])

  const send = () => {
    const text = input.trim()
    if (!text) return
    const newMsg: Message = {
      id: Date.now(),
      from: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setAllConvos((prev) =>
      prev.map((c) =>
        c.id === activeId ? { ...c, messages: [...c.messages, newMsg], lastMsg: text, time: 'Just now' } : c,
      ),
    )
    setInput('')
  }

  const filtered = allConvos.filter(
    (c) =>
      c.provider.toLowerCase().includes(search.toLowerCase()) ||
      c.service.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 container mx-auto px-0 sm:px-4 py-4 sm:py-8 max-w-5xl">
        <div className="flex h-[calc(100vh-140px)] border border-border rounded-xl overflow-hidden shadow-sm">
          {/* Sidebar — conversation list */}
          <aside className="w-72 shrink-0 border-r border-border flex flex-col bg-background">
            <div className="p-4 border-b border-border">
              <h2 className="font-bold text-lg mb-3">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <Input
                  placeholder="Search conversations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-9 text-sm"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveId(c.id)
                    setAllConvos((prev) => prev.map((x) => (x.id === c.id ? { ...x, unread: 0 } : x)))
                  }}
                  className={cn(
                    'w-full text-left px-4 py-4 border-b border-border hover:bg-muted/50 transition-colors',
                    activeId === c.id && 'bg-primary/5 border-l-2 border-l-primary',
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold shrink-0">
                      {c.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-semibold text-sm truncate">{c.provider}</span>
                        <span className="text-xs text-foreground/50 shrink-0 ml-2">{c.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-foreground/60 truncate">{c.lastMsg}</p>
                        {c.unread > 0 && (
                          <span className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                            {c.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          {/* Chat area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Chat header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-background">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                  {active.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{active.provider}</p>
                  <p className="text-xs text-foreground/60">{active.service}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-muted/20">
              {active.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn('flex', msg.from === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                      msg.from === 'user'
                        ? 'bg-primary text-white rounded-br-sm'
                        : 'bg-background border border-border text-foreground rounded-bl-sm',
                    )}
                  >
                    <p>{msg.text}</p>
                    <p className={cn('text-xs mt-1', msg.from === 'user' ? 'text-white/70' : 'text-foreground/50')}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-5 py-4 border-t border-border bg-background">
              <form
                onSubmit={(e) => { e.preventDefault(); send() }}
                className="flex gap-3"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                  autoComplete="off"
                />
                <Button type="submit" disabled={!input.trim()} size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
