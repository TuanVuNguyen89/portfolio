import { useState, useEffect } from 'react';
import { fetchEducation, createEducation, updateEducation, deleteEducation } from '../../lib/api';

export default function EducationManager() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<any>({ 
    institution: '', 
    major: '', 
    startDate: '', 
    endDate: '', 
    description: '',
    achievements: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = () => fetchEducation().then(setItems);

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Parse achievements if it's a string
      const submitData = { ...form };
      if (submitData.achievements && typeof submitData.achievements === 'string') {
        try {
          submitData.achievements = JSON.parse(submitData.achievements);
        } catch (e) {
          // If not valid JSON, treat as empty array
          submitData.achievements = [];
        }
      }
      
      if (editingId) {
        await updateEducation(editingId, submitData);
      } else {
        await createEducation(submitData);
      }
      setForm({ 
        institution: '', 
        major: '', 
        startDate: '', 
        endDate: '', 
        description: '',
        achievements: ''
      });
      setEditingId(null);
      load();
    } catch (err) {
      alert('Failed to save');
    }
  };

  const handleEdit = (item: any) => {
    setForm({
      ...item,
      achievements: typeof item.achievements === 'string' ? item.achievements : JSON.stringify(item.achievements || [])
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this education entry?')) {
      await deleteEducation(id);
      load();
    }
  };

  return (
    <div className="card">
      <h3>Manage Education</h3>
      <div style={{ marginBottom: '2rem' }}>
        {items.map((item) => (
          <div key={item.id} style={{ borderBottom: '1px solid #334155', padding: '1rem 0', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <strong>{item.institution}</strong> - {item.major}
            </div>
            <div>
              <button onClick={() => handleEdit(item)} style={{ marginRight: '0.5rem' }}>Edit</button>
              <button onClick={() => handleDelete(item.id)} style={{ background: '#ef4444' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <h4>{editingId ? 'Edit' : 'Add'} Education</h4>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.5rem' }}>
        <input placeholder="Institution" value={form.institution} onChange={e => setForm({...form, institution: e.target.value})} className="input-field" required />
        <input placeholder="Major" value={form.major} onChange={e => setForm({...form, major: e.target.value})} className="input-field" required />
        <input placeholder="Start Date (e.g., Sept 2023)" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} className="input-field" required />
        <input placeholder="End Date (e.g., now or May 2023)" value={form.endDate || ''} onChange={e => setForm({...form, endDate: e.target.value})} className="input-field" />
        <textarea placeholder="Description (one line per bullet point)" value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} className="input-field" rows={5} />
        <input placeholder='Achievements (JSON array, e.g., ["Achievement 1", "Achievement 2"])' value={form.achievements || ''} onChange={e => setForm({...form, achievements: e.target.value})} className="input-field" />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ institution: '', major: '', startDate: '', endDate: '', description: '', achievements: '' }); }} style={{ background: 'transparent', border: '1px solid white' }}>Cancel</button>}
      </form>
    </div>
  );
}
