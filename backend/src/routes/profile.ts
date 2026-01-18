import { Hono } from 'hono'
import { getDb } from '../lib/db'
import { profile, project, experience, skill } from '../db/schema'
import { eq } from 'drizzle-orm'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', async (c) => {
  const db = getDb(c.env.DB)
  
  const [profileData] = await db.select().from(profile).limit(1)
  const skills = await db.select().from(skill)
  const experiences = await db.select().from(experience)
  const projects = await db.select().from(project)

  return c.json({
    profile: profileData,
    skills,
    experiences,
    projects
  })
})

export default app
