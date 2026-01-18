import { useEffect, useState } from 'react'
import { fetchProfile } from './lib/api'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import './index.css'

function App() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
      .then(setData)
      .catch((err) => {
        console.error(err);
        // Fallback for demo if API fails locally
        // setData(mockData) 
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading-screen"><div className="loader"></div></div>
  if (!data) return <div className="error-screen">Failed to load data. Please ensure backend is running.</div>

  const { profile, skills, experiences, projects } = data

  return (
    <div className="app-container">
      <main className="main-content">
        <Hero profile={profile} />
        <Skills skills={skills} />
        <Experience experiences={experiences} />
        <Projects projects={projects} />
      </main>
      
      <footer className="footer">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
