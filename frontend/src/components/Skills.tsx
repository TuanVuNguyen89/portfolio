import { motion } from 'framer-motion';

export default function Skills({ skills }: { skills: any[] }) {
  // If skills don't have categories in DB yet, group them by a default or pass straight
  // Assuming they might not have categories from the API if it's failed, but let's robustly handle it.
  // If no category, put in 'Other'
  
  const groupedSkills = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Technologies';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, any[]>);

  const categories = Object.keys(groupedSkills).sort();

  return (
    <section className="section skills-section">
      <h3 className="section-title">Skills</h3>
      <div className="skills-container">
        {categories.map((category, catIndex) => (
          <motion.div 
            key={category} 
            className="skill-category"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="category-title">{category}</h4>
            <div className="tags-cloud">
              {(groupedSkills[category] as any[]).map((s) => (
                <span key={s.id} className="skill-tag">
                  {s.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
