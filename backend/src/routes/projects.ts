import { Hono } from 'hono'
import { getDb } from '../lib/db'
import { project } from '../db/schema'
import { eq, desc } from 'drizzle-orm'
import { getAuth } from '../lib/auth'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Public GET
app.get('/', async (c) => {
  const db = getDb(c.env.DB)
  const projects = await db.select().from(project) // You might want to sort here
  return c.json(projects)
})

app.get('/:id', async (c) => {
  const db = getDb(c.env.DB)
  const id = parseInt(c.req.param('id'))
  const [data] = await db.select().from(project).where(eq(project.id, id)).limit(1)
  return c.json(data)
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
  const result = await db.insert(project).values(body).returning()
  return c.json(result[0])
})

app.put('/:id', async (c) => {
  const db = getDb(c.env.DB)
  const id = parseInt(c.req.param('id'))
  const body = await c.req.json()
  const result = await db.update(project).set(body).where(eq(project.id, id)).returning()
  return c.json(result[0])
})

app.delete('/:id', async (c) => {
  const db = getDb(c.env.DB)
  const id = parseInt(c.req.param('id'))
  await db.delete(project).where(eq(project.id, id))
  return c.json({ success: true })
})

export default app
