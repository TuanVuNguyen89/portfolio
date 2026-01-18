import { Hono } from 'hono'
import { getAuth } from './lib/auth'
import { cors } from 'hono/cors'
import profileRoute from './routes/profile'
import seedAdminRoute from './routes/seed-admin'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors())

app.route('/api/profile', profileRoute)
app.route('/api/seed-admin', seedAdminRoute)

app.on(['POST', 'GET'], '/api/auth/*', (c) => {
  const auth = getAuth(c.env)
  return auth.handler(c.req.raw);
});

app.get('/', (c) => {
  return c.text('Portfolio Backend Running')
})

export default app
