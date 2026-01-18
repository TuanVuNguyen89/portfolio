import { Mail, Globe } from 'lucide-react';
import type { Profile } from '../lib/api';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function SocialLinks({ profile }: { profile: Profile }) {
  return (
    <div className="social-links">
      {profile.github && (
        <a href={profile.github} target="_blank" rel="noreferrer" title="GitHub">
          <GithubIcon size={24} />
        </a>
      )}
      {profile.linkedin && (
        <a href={profile.linkedin} target="_blank" rel="noreferrer" title="LinkedIn">
          <LinkedinIcon size={24} />
        </a>
      )}
      {profile.email && (
        <a href={`mailto:${profile.email}`} title="Email">
          <Mail size={24} />
        </a>
      )}
      {profile.website && profile.website !== '#' && (
        <a href={profile.website} target="_blank" rel="noreferrer" title="Website">
          <Globe size={24} />
        </a>
      )}
    </div>
  );
}
