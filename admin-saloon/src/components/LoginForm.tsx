import React, { useState } from 'react'
import { auth } from '../services/auth'

type Props = {
  onSuccess: (email: string) => void
}

export default function LoginForm({ onSuccess }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const ok = await auth.login(email, password)
    if (ok) {
      onSuccess(email)
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <form className="login-form" onSubmit={submit}>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      {error && <div className="error">{error}</div>}
      <button className="btn-primary" type="submit">Sign in</button>
    </form>
  )
}
