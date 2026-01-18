import { useEffect, useState } from 'react'
import { fetchProfile } from './lib/api'
import './index.css'

function App() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>
  if (!data) return <div>Failed to load data</div>

  const { profile, experiences, projects } = data

  return (
    <div className="container">
      <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 style={{ background: 'linear-gradient(to right, #fff, #666)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {profile.name}
        </h1>
        <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>{profile.tagline}</p>
        <p style={{ maxWidth: '600px', margin: '1rem auto' }}>{profile.summary}</p>
      </header>

      <section className="grid">
        <h2>Experience</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {experiences.map((exp: any) => (
            <div key={exp.id} className="card">
              <h3>{exp.role} @ {exp.company}</h3>
              <small>{exp.startDate} - {exp.endDate}</small>
              <p style={{ whiteSpace: 'pre-line' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: '4rem' }}>
        <h2>Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {projects.map((proj: any) => (
            <div key={proj.id} className="card">
              <h3>{proj.title}</h3>
              <p>{proj.description}</p>
              <a href={proj.repoUrl} target="_blank" style={{ color: 'var(--accent)' }}>View Code</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
