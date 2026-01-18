import { motion } from 'framer-motion';

export default function Education({ educations }: { educations: any[] }) {
  const parseAchievements = (achievements: string | null) => {
    if (!achievements) return [];
    try {
      const parsed = JSON.parse(achievements);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      // If not JSON, try splitting by newlines
      return achievements
        .split(/\r?\n/)
        .map((line: string) => line.trim())
        .filter((line: string) => line.length > 0);
    }
  };

  const renderMarkdown = (text: string) => {
    // Parse markdown: **bold**, *italic*, `code`
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let key = 0;

    // Match **bold**, *italic*, or `code`
    const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      // Add the formatted element
      if (match[1].startsWith('**')) {
        // Bold
        parts.push(<strong key={key++}>{match[2]}</strong>);
      } else if (match[1].startsWith('*') && !match[1].startsWith('**')) {
        // Italic
        parts.push(<em key={key++}>{match[3]}</em>);
      } else if (match[1].startsWith('`')) {
        // Code
        parts.push(<code key={key++} style={{ background: 'rgba(0, 255, 65, 0.1)', padding: '0.2rem 0.4rem', borderRadius: '3px' }}>{match[4]}</code>);
      }

      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <section className="section education-section">
      <h3 className="section-title">Education</h3>
      <div className="timeline">
        {educations.map((edu, index) => {
          const achievements = parseAchievements(edu.achievements);
          
          return (
            <motion.div 
              key={edu.id} 
              className="timeline-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content card glass">
                <div className="edu-header-row">
                  <div className="edu-header">
                    <h4 className="edu-institution">{edu.institution}</h4>
                    <span className="edu-major">, Major in {edu.major}</span>
                  </div>
                  <span className="edu-date-badge">{edu.startDate} – {edu.endDate || 'Present'}</span>
                </div>
                <div className="edu-description">
                  {edu.description
                    ? edu.description
                        .split(/\r?\n/)
                        .map((line: string) => line.trim())
                        .filter((line: string) => line.length > 0)
                        .map((line: string, i: number) => {
                          let cleanedLine = line.trim();
                          cleanedLine = cleanedLine.replace(/^[-*•]\s+/, '');
                          cleanedLine = cleanedLine.replace(/^[-*•]/, '');
                          cleanedLine = cleanedLine.trim();
                          return cleanedLine ? (
                            <p key={i} className="edu-detail-line">{renderMarkdown(cleanedLine)}</p>
                          ) : null;
                        })
                        .filter(Boolean)
                    : null}
                </div>
                {achievements.length > 0 && (
                  <div className="edu-achievements">
                    <h5 className="achievements-title">Competitive Programming Achievements:</h5>
                    <ul className="achievements-list">
                      {achievements.map((achievement: string, i: number) => (
                        <li key={i} className="achievement-item">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
