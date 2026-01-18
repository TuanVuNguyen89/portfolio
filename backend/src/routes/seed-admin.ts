import { Hono } from 'hono'
import { getAuth } from '../lib/auth'

const app = new Hono<{ Bindings: { DB: D1Database } }>()

app.post('/create', async (c) => {
  const auth = getAuth(c.env)
  const { name, email, password } = await c.req.json()

  // Use better-auth API to create user (handles hashing)
  const user = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    }
  })

  return c.json(user)
});

export default app
