import { motion } from 'framer-motion';

export default function Experience({ experiences }: { experiences: any[] }) {
  return (
    <section className="section experience-section">
      <h3 className="section-title">Experience</h3>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <motion.div 
            key={exp.id} 
            className="timeline-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="timeline-marker"></div>
            <div className="timeline-content card">
              <div className="exp-header">
                <div>
                  <h4 className="exp-role">{exp.role}</h4>
                  <span className="exp-company">{exp.company}</span>
                </div>
                <span className="exp-date">{exp.startDate} - {exp.endDate || 'Present'}</span>
              </div>
              <p className="exp-description">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
