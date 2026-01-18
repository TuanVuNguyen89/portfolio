import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";
import ProfileManager from "../components/admin/ProfileManager";
import ExperienceManager from "../components/admin/ExperienceManager";
import ProjectsManager from "../components/admin/ProjectsManager";
import EducationManager from "../components/admin/EducationManager";

export default function Admin() {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'projects' | 'education'>('profile');

  const handleLogout = async () => {
    await authClient.signOut();
    navigate("/login");
  };

  if (!session) {
    return <div className="loading-screen">Loading session...</div>;
  }

  return (
    <div className="app-container" style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span>Welcome, {session.user.name}</span>
          <button onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>Logout</button>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
            onClick={() => setActiveTab('profile')} 
            style={{ background: activeTab === 'profile' ? 'var(--accent)' : 'var(--bg-secondary)', color: 'white' }}
        >
            Profile
        </button>
        <button 
            onClick={() => setActiveTab('experience')}
            style={{ background: activeTab === 'experience' ? 'var(--accent)' : 'var(--bg-secondary)', color: 'white' }}
        >
            Experience
        </button>
        <button 
            onClick={() => setActiveTab('projects')}
            style={{ background: activeTab === 'projects' ? 'var(--accent)' : 'var(--bg-secondary)', color: 'white' }}
        >
            Projects
        </button>
        <button 
            onClick={() => setActiveTab('education')}
            style={{ background: activeTab === 'education' ? 'var(--accent)' : 'var(--bg-secondary)', color: 'white' }}
        >
            Education
        </button>
      </div>
      
      {activeTab === 'profile' && <ProfileManager />}
      {activeTab === 'experience' && <ExperienceManager />}
      {activeTab === 'projects' && <ProjectsManager />}
      {activeTab === 'education' && <EducationManager />}
    </div>
  );
}
