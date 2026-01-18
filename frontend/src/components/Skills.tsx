export default function Skills({ skills }: { skills: any[] }) {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <section className="section skills-section">
      <h3 className="section-title">Skills</h3>
      <div className="skills-container">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="skill-category">
            <h4 className="category-title">{category}</h4>
            <div className="tags-cloud">
              {(categorySkills as any[]).map((s) => (
                <span key={s.id} className="skill-tag">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
