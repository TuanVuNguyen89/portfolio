import { motion } from 'framer-motion';

export default function Experience({ experiences }: { experiences: any[] }) {
  // Sort experiences by date (newest first) usually better
  // Assuming they are sorted or we rely on DB order.

  return (
    <section className="section experience-section">
      <h3 className="section-title">Work Experience</h3>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <motion.div 
            key={exp.id} 
            className="timeline-item"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <div className="timeline-marker"></div>
            <div className="timeline-content card glass">
              <span className="exp-date-badge">{exp.startDate} - {exp.endDate || 'Present'}</span>
              <div className="exp-header">
                <h4 className="exp-role">{exp.role}</h4>
                <span className="exp-company">@ {exp.company}</span>
              </div>
              <p className="exp-location">{exp.location}</p>
              <div className="exp-description">
                 {exp.description
                   ? exp.description
                       .split(/\r?\n/) // Handle both \n and \r\n
                       .map((line: string) => line.trim())
                       .filter((line: string) => line.length > 0)
                       .map((line: string, i: number) => {
                         // Remove markdown bullet points (-, *, •) and any leading whitespace
                         let cleanedLine = line.trim();
                         // Remove bullet markers with optional spaces (matches: "- ", "-", " * ", etc.)
                         cleanedLine = cleanedLine.replace(/^[-*•]\s+/, '');
                         cleanedLine = cleanedLine.replace(/^[-*•]/, ''); // Handle case without space
                         cleanedLine = cleanedLine.trim();
                         return cleanedLine ? (
                           <p key={i} style={{ margin: '0.5rem 0' }}>{cleanedLine}</p>
                         ) : null;
                       })
                       .filter(Boolean) // Remove any null entries
                   : null}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
