import { useState, useEffect } from 'react';
import { fetchProfile, updateProfile, type Profile } from '../../lib/api';

export default function ProfileManager() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchProfile().then(setProfile).finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setMsg('Saving...');
    try {
      await updateProfile(profile);
      setMsg('Profile updated!');
    } catch (err) {
        console.error(err);
      setMsg('Failed to update.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No profile data.</div>;

  return (
    <div className="card">
      <h3>Edit Profile</h3>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <input 
            value={profile.name} 
            onChange={(e) => setProfile({...profile, name: e.target.value})} 
            placeholder="Name" 
            className="input-field"
        />
        <input 
            value={profile.tagline} 
            onChange={(e) => setProfile({...profile, tagline: e.target.value})} 
            placeholder="Tagline"
            className="input-field" 
        />
        <textarea 
            value={profile.summary} 
            onChange={(e) => setProfile({...profile, summary: e.target.value})} 
            placeholder="Summary"
            className="input-field" 
            rows={4}
        />
        <input 
            value={profile.location || ''} 
            onChange={(e) => setProfile({...profile, location: e.target.value})} 
            placeholder="Location"
            className="input-field" 
        />
        <input 
            value={profile.avatarUrl || ''} 
            onChange={(e) => setProfile({...profile, avatarUrl: e.target.value})} 
            placeholder="Avatar URL"
            className="input-field" 
        />
        <button type="submit">Save Profile</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
