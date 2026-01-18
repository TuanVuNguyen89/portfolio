import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Projects({ projects }: { projects: any[] }) {
  return (
    <section className="section projects-section">
      <h3 className="section-title">Featured Projects</h3>
      <motion.div 
        className="projects-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {projects.map((proj) => (
          <motion.div 
            key={proj.id} 
            className="project-card card glass"
            variants={item}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <div className="project-content">
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
                    {(() => {
                        try {
                            const tags = JSON.parse(proj.techStack);
                            return Array.isArray(tags) ? tags.map((t: string) => <span key={t} className="tag">{t}</span>) : null;
                        } catch (e) {
                            return proj.techStack.split(',').map((t: string) => <span key={t} className="tag">{t.trim()}</span>);
                        }
                    })()}
                </div>
                )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
