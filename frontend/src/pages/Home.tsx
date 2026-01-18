import { useEffect, useState } from 'react'
import { fetchProfile, fetchSkills, fetchProjects, fetchExperience } from '../lib/api'
import Hero from '../components/Hero'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import CherryBlossomEffect from '../components/CherryBlossomEffect'
import BackgroundVisuals from '../components/BackgroundVisuals'
import ContactForm from '../components/ContactForm'

export default function Home() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profile, skills, experiences, projects] = await Promise.all([
          fetchProfile(),
          fetchSkills(),
          fetchExperience(),
          fetchProjects()
        ]);
        setData({ profile, skills, experiences, projects });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [])

  if (loading) return <div className="loading-screen"><div className="loader"></div></div>
  if (!data || !data.profile) return <div className="error-screen">Failed to load data. Please ensure backend is running.</div>

  const { profile, skills, experiences, projects } = data

  return (
    <>
      <BackgroundVisuals />
      <CherryBlossomEffect />
      <div className="app-container">
        <main className="main-content">
          <Hero profile={profile} />
          <Skills skills={skills} />
          <Experience experiences={experiences} />
          <Projects projects={projects} />
        </main>
        
        <footer className="footer">
          <ContactForm />
          <p className="footer-copyright">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}
