import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import { useState } from 'react';

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
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const toggleFlip = (id: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const parseTechStack = (techStack: string | null) => {
    if (!techStack) return [];
    try {
      const parsed = JSON.parse(techStack);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return techStack.split(',').map((t: string) => t.trim());
    }
  };

  const parseImages = (images: string | null) => {
    if (!images) return [];
    try {
      const parsed = JSON.parse(images);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  };

  const parseContent = (content: string | null) => {
    if (!content) return [];
    // Split by newlines and filter empty lines
    return content
      .split(/\r?\n/)
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 0)
      .map((line: string) => {
        // Remove markdown bullet points
        let cleanedLine = line.replace(/^[-*•]\s+/, '').trim();
        return cleanedLine;
      })
      .filter((line: string) => line.length > 0);
  };

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
        {projects.map((proj) => {
          const isFlipped = flippedCards.has(proj.id);
          const techStack = parseTechStack(proj.techStack);
          const images = parseImages(proj.images);
          const contentLines = parseContent(proj.content);

          return (
            <motion.div 
              key={proj.id} 
              className={`project-card-wrapper ${isFlipped ? 'flipped' : ''}`}
              variants={item}
              onClick={() => toggleFlip(proj.id)}
            >
              <div className="project-card-inner">
                {/* Front Side */}
                <div className="project-card-front card glass">
                  <div className="project-content">
                    <div className="project-header">
                      <h4>{proj.title}</h4>
                      <div className="project-links">
                        {proj.repoUrl && (
                          <a 
                            href={proj.repoUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            title="View Code"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <GithubIcon size={20} />
                          </a>
                        )}
                        {proj.liveUrl && proj.liveUrl !== '#' && (
                          <a 
                            href={proj.liveUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            title="Live Demo"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="project-desc">{proj.description}</p>
                    {techStack.length > 0 && (
                      <div className="project-tags">
                        {techStack.map((t: string) => (
                          <span key={t} className="tag">{t}</span>
                        ))}
                      </div>
                    )}
                    <div className="flip-hint">
                      <span>Click to view details →</span>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div className="project-card-back card glass">
                  <div className="project-details">
                    <h4 className="project-details-title">{proj.title}</h4>
                    
                    {contentLines.length > 0 && (
                      <div className="project-details-content">
                        {contentLines.map((line: string, idx: number) => (
                          <p key={idx} className="detail-line">{line}</p>
                        ))}
                      </div>
                    )}

                    {techStack.length > 0 && (
                      <div className="project-details-tech">
                        <h5 className="details-section-title">Technologies:</h5>
                        <div className="project-tags">
                          {techStack.map((t: string) => (
                            <span key={t} className="tag">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {proj.achievement && (
                      <div className="project-achievement">
                        <h5 className="details-section-title">Achievement:</h5>
                        <p className="achievement-text">{proj.achievement}</p>
                      </div>
                    )}

                    {images.length > 0 && (
                      <div className="project-images">
                        <h5 className="details-section-title">Screenshots:</h5>
                        <div className="images-grid">
                          {images.map((img: string, idx: number) => (
                            <img 
                              key={idx} 
                              src={img} 
                              alt={`${proj.title} screenshot ${idx + 1}`}
                              className="project-image"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="project-details-links">
                      {proj.repoUrl && (
                        <a 
                          href={proj.repoUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="detail-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <GithubIcon size={18} />
                          <span>View Code</span>
                        </a>
                      )}
                      {proj.liveUrl && proj.liveUrl !== '#' && (
                        <a 
                          href={proj.liveUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="detail-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={18} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>

                    <div className="flip-hint">
                      <span>← Click to go back</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
