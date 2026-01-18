import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          navigate("/admin");
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      }
    );
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column' 
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Admin Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required 
              style={{ 
                width: '100%', 
                padding: '0.8rem', 
                borderRadius: '8px', 
                border: '1px solid var(--glass-border)',
                background: 'var(--bg-primary)',
                color: 'white'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={{ 
                width: '100%', 
                padding: '0.8rem', 
                borderRadius: '8px', 
                border: '1px solid var(--glass-border)',
                background: 'var(--bg-primary)',
                color: 'white'
              }}
            />
          </div>
          {error && <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ marginTop: '0.5rem' }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
