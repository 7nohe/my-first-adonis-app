import { router } from '@inertiajs/react'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    router.post(`/login`, {
      password,
      email,
    })
  }
  return (
    <div style={{ padding: '6rem' }}>
      <h2>Login</h2>
      <form method="post" action="/login" onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
