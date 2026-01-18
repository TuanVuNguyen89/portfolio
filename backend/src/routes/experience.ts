import { Hono } from 'hono'
import { getDb } from '../lib/db'
import { experience } from '../db/schema'
import { eq } from 'drizzle-orm'
import { getAuth } from '../lib/auth'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Public GET
app.get('/', async (c) => {
  const db = getDb(c.env.DB)
  const experiences = await db.select().from(experience)
  return c.json(experiences)
})

// Protected Routes
app.use('*', async (c, next) => {
  if (c.req.method === 'GET') return next()
  
  const auth = getAuth(c.env)
  const session = await auth.api.getSession({ headers: c.req.raw.headers })
  
  if (!session) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  await next()
})

app.post('/', async (c) => {
  const db = getDb(c.env.DB)
  const body = await c.req.json()
  const result = await db.insert(experience).values(body).returning()
  return c.json(result[0])
})

app.put('/:id', async (c) => {
  const db = getDb(c.env.DB)
  const id = parseInt(c.req.param('id'))
  const body = await c.req.json()
  const result = await db.update(experience).set(body).where(eq(experience.id, id)).returning()
  return c.json(result[0])
})

app.delete('/:id', async (c) => {
  const db = getDb(c.env.DB)
  const id = parseInt(c.req.param('id'))
  await db.delete(experience).where(eq(experience.id, id))
  return c.json({ success: true })
})

export default app
