import { useNavigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";

export default function Admin() {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    navigate("/login");
  };

  if (!session) {
    return <div className="loading-screen">Loading session...</div>;
  }

  return (
    <div className="app-container" style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h1>Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span>Welcome, {session.user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      
      <div className="card">
        <h3>Content Management</h3>
        <p>This feature is being implemented. You will be able to edit Profile, Skills, Projects, and Experience here.</p>
        <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
           <button onClick={() => alert("Feature coming soon")}>Edit Profile</button>
           <button onClick={() => alert("Feature coming soon")}>Manage Projects</button>
           <button onClick={() => alert("Feature coming soon")}>Manage Experience</button>
        </div>
      </div>
    </div>
  );
}
