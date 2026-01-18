import { Hono } from 'hono'
import { getDb } from '../lib/db'
import { message } from '../db/schema'

type Bindings = {
  DB: D1Database
  RESEND_API_KEY?: string,
  RESEND_FROM_EMAIL?: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Helper function to send email using Resend API
async function sendEmail(
  apiKey: string | undefined,
  fromEmail: string,
  toEmail: string,
  subject: string,
  html: string
): Promise<boolean> {
  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured, skipping email send')
    return false
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: subject,
        html: html,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Failed to send email:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

// Public POST - Allow anyone to send messages
app.post('/', async (c) => {
  const db = getDb(c.env.DB)
  const body = await c.req.json()
  
  // Validate required fields
  if (!body.name || !body.email || !body.message) {
    return c.json({ error: 'Missing required fields' }, 400)
  }
  
  // Save message to database
  const result = await db.insert(message).values({
    name: body.name,
    email: body.email,
    content: body.message,
    createdAt: new Date()
  }).returning()
  
  // Send email notification
  const apiKey = c.env.RESEND_API_KEY
  const toEmail = 'contact@ntuanvu89.id.vn'
  // Use verified domain email for from address
  const fromEmail = c.env.RESEND_FROM_EMAIL || 'Portfolio Contact <contact@ntuanvu89.id.vn>'
  
  const emailSubject = `New Contact Message from ${body.name}`
  const emailHtml = `
    <html>
      <body style="font-family: monospace; background-color: #0a0e1a; color: #c9d1d9; padding: 20px;">
        <div style="border: 2px solid #00ff41; border-radius: 4px; padding: 20px; background-color: #0d1117;">
          <h2 style="color: #00ff41; margin-top: 0;">// NEW CONTACT MESSAGE</h2>
          <div style="margin: 20px 0;">
            <p><strong style="color: #00d9ff;">Name:</strong> <span style="color: #c9d1d9;">${body.name}</span></p>
            <p><strong style="color: #00d9ff;">Email:</strong> <span style="color: #c9d1d9;">${body.email}</span></p>
            <p><strong style="color: #00d9ff;">Message:</strong></p>
            <div style="background-color: #0a0e1a; padding: 15px; border-left: 3px solid #00ff41; margin-top: 10px; white-space: pre-wrap; color: #c9d1d9;">
${body.message}
            </div>
          </div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #30363d; font-size: 12px; color: #8b949e;">
            Sent from portfolio contact form
          </div>
        </div>
      </body>
    </html>
  `
  
  // Send email (don't fail if email sending fails)
  const emailSent = await sendEmail(apiKey, fromEmail, toEmail, emailSubject, emailHtml)
  
  if (!emailSent && apiKey) {
    console.warn('Message saved but email sending failed')
  }
  
  return c.json({ 
    success: true, 
    message: result[0],
    emailSent: emailSent || !apiKey // Return true if no API key configured (graceful degradation)
  })
})

export default app
