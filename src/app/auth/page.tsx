'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSignIn() {
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setMessage(error.message)
    else setMessage('Giriş e-postası gönderildi. Lütfen postanızı kontrol edin.')
    setLoading(false)
  }

  async function handleSignUp() {
    setLoading(true)
    setMessage('')
    const { data, error } = await supabase.auth.signUp({ email })
    if (error) setMessage(error.message)
    else setMessage('Kayıt tamamlandı (magic link gönderildi veya sağlayıcıya yönlendirileceksiniz).')
    setLoading(false)
  }

  async function handleOAuth(provider: 'github' | 'google') {
    setLoading(true)
    setMessage('')
    const { data, error } = await supabase.auth.signInWithOAuth({ provider })
    if (error) setMessage(error.message)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-sm">
        <h2 className="text-lg font-medium mb-4">Giriş / Kayıt</h2>

        <label className="block text-sm mb-1">E-posta</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-3"
          placeholder="you@example.com"
        />

        <div className="flex gap-2 mb-3">
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded"
          >
            Giriş (Magic Link)
          </button>

          <button
            onClick={handleSignUp}
            disabled={loading}
            className="px-3 py-2 bg-gray-100 rounded"
          >
            Kayıt
          </button>
        </div>

        <div className="mb-3">
          <div className="text-xs text-gray-500 mb-2">Hızlı giriş (OAuth)</div>
          <div className="flex gap-2">
            <button onClick={() => handleOAuth('github')} className="flex-1 px-3 py-2 border rounded">GitHub</button>
            <button onClick={() => handleOAuth('google')} className="flex-1 px-3 py-2 border rounded">Google</button>
          </div>
        </div>

        {message && <div className="text-sm text-gray-700 mt-2">{message}</div>}

        <div className="text-xs text-gray-400 mt-4">Not: Supabase anahtarlarınızı .env.local içinde NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY olarak ayarlayın.</div>
      </div>
    </div>
  )
}
