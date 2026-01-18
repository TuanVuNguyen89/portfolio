import { Hono } from 'hono'
import { getDb } from '../lib/db'
import { education } from '../db/schema'
import { eq } from 'drizzle-orm'
import { getAuth } from '../lib/auth'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Public GET
app.get('/', async (c) => {
  const db = getDb(c.env.DB)
  const educations = await db.select().from(education)
  return c.json(educations)
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
  const result = await db.insert(education).values(body).returning()
  return c.json(result[0])
})

app.put('/:id', async (c) => {
  const db = getDb(c.env.DB)
  const id = parseInt(c.req.param('id'))
  const body = await c.req.json()
  const result = await db.update(education).set(body).where(eq(education.id, id)).returning()
  return c.json(result[0])
})

app.delete('/:id', async (c) => {
  const db = getDb(c.env.DB)
  const id = parseInt(c.req.param('id'))
  await db.delete(education).where(eq(education.id, id))
  return c.json({ success: true })
})

export default app
