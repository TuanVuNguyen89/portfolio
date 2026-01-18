import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Projects({ projects }: { projects: any[] }) {
  return (
    <section className="section projects-section">
      <h3 className="section-title">Projects</h3>
      <div className="projects-grid">
        {projects.map((proj, index) => (
          <motion.div 
            key={proj.id} 
            className="project-card card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="project-header">
              <h4>{proj.title}</h4>
              <div className="project-links">
                {proj.repoUrl && (
                  <a href={proj.repoUrl} target="_blank" rel="noreferrer" title="View Code">
                    <GithubIcon size={20} />
                  </a>
                )}
                {proj.liveUrl && proj.liveUrl !== '#' && (
                  <a href={proj.liveUrl} target="_blank" rel="noreferrer" title="Live Demo">
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
            <p className="project-desc">{proj.description}</p>
            {proj.techStack && (
              <div className="project-tags">
                {/* Try to parse if it's a string, otherwise just display */}
                {(() => {
                    try {
                        const tags = JSON.parse(proj.techStack);
                        return Array.isArray(tags) ? tags.map((t: string) => <span key={t} className="tag">{t}</span>) : null;
                    } catch (e) {
                         // Fallback if not JSON string, or split by comma
                         return proj.techStack.split(',').map((t: string) => <span key={t} className="tag">{t.trim()}</span>);
                    }
                })()}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
