import { useState, useEffect } from 'react';
import { fetchExperience, createExperience, updateExperience, deleteExperience } from '../../lib/api';

export default function ExperienceManager() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<any>({ company: '', role: '', startDate: '', endDate: '', description: '', location: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = () => fetchExperience().then(setItems);

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateExperience(editingId, form);
      } else {
        await createExperience(form);
      }
      setForm({ company: '', role: '', startDate: '', endDate: '', description: '', location: '' });
      setEditingId(null);
      load();
    } catch (err) {
      alert('Failed to save');
    }
  };

  const handleEdit = (item: any) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this experience?')) {
      await deleteExperience(id);
      load();
    }
  };

  return (
    <div className="card">
      <h3>Manage Experience</h3>
      <div style={{ marginBottom: '2rem' }}>
        {items.map((item) => (
          <div key={item.id} style={{ borderBottom: '1px solid #334155', padding: '1rem 0', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <strong>{item.role}</strong> at {item.company}
            </div>
            <div>
              <button onClick={() => handleEdit(item)} style={{ marginRight: '0.5rem' }}>Edit</button>
              <button onClick={() => handleDelete(item.id)} style={{ background: '#ef4444' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <h4>{editingId ? 'Edit' : 'Add'} Experience</h4>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.5rem' }}>
        <input placeholder="Company" value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="input-field" required />
        <input placeholder="Role" value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="input-field" required />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <input placeholder="Start Date" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} className="input-field" required />
            <input placeholder="End Date (or Present)" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} className="input-field" />
        </div>
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input-field" rows={3} />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({}); }} style={{ background: 'transparent', border: '1px solid white' }}>Cancel</button>}
      </form>
    </div>
  );
}
