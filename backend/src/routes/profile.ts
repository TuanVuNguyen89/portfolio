import { Hono } from 'hono'
import { getDb } from '../lib/db'
import { profile } from '../db/schema'
import { eq } from 'drizzle-orm'
import { getAuth } from '../lib/auth'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', async (c) => {
  const db = getDb(c.env.DB)
  
  const [profileData] = await db.select().from(profile).limit(1)

  return c.json(profileData)
})

app.put('/', async (c) => {
  const auth = getAuth(c.env)
  const session = await auth.api.getSession({ headers: c.req.raw.headers })
  
  if (!session) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const db = getDb(c.env.DB)
  const body = await c.req.json()
  
  const [existing] = await db.select().from(profile).limit(1)
  
  let result;
  if (existing) {
    result = await db.update(profile).set(body).where(eq(profile.id, existing.id)).returning()
  } else {
    result = await db.insert(profile).values(body).returning()
  }
  
  return c.json(result[0])
})

export default app
