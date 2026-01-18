import type { Profile } from '../lib/api';
import SocialLinks from './SocialLinks';

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="avatar-container">
            {/* Placeholder for avatar if not provided, or use initials */}
            {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.name} className="avatar" />
            ) : (
                <div className="avatar-placeholder">{profile.name.charAt(0)}</div>
            )}
        </div>
        <h1>{profile.name}</h1>
        <h2 className="tagline">{profile.tagline}</h2>
        <div className="location">
            <span className="icon">📍</span> {profile.location}
        </div>
        <p className="summary">{profile.summary}</p>
        <SocialLinks profile={profile} />
      </div>
    </section>
  );
}
