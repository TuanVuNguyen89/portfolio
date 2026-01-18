import { Hono } from 'hono'
import { getAuth } from './lib/auth'
import { cors } from 'hono/cors'
import profileRoute from './routes/profile'
import skillsRoute from './routes/skills'
import projectsRoute from './routes/projects'
import experienceRoute from './routes/experience'
import messagesRoute from './routes/messages'

type Bindings = {
  DB: D1Database
  FRONTEND_URL: string
  RESEND_API_KEY?: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors({
  origin: (origin) => origin, // Allow requesting origin, better-auth needs this for credentials locally
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposeHeaders: ['Set-Cookie'],
  credentials: true,
}))

app.route('/api/profile', profileRoute)
app.route('/api/skills', skillsRoute)
app.route('/api/projects', projectsRoute)
app.route('/api/experience', experienceRoute)
app.route('/api/messages', messagesRoute)

app.on(['POST', 'GET'], '/api/auth/*', (c) => {
  const auth = getAuth(c.env)
  return auth.handler(c.req.raw);
});

app.get('/', (c) => {
  return c.text('Portfolio Backend Running')
})

export default app
