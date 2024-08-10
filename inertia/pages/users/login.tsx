export default function Login({ csrfToken }: { csrfToken: string }) {
  return (
    <div style={{ padding: '6rem' }}>
      <h2>Login</h2>
      <form method="post" action="/login">
        <input type="hidden" name="_csrf" value={csrfToken} />
        <div>
          <label>Email</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
