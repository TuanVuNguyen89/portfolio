import { useState, useEffect } from 'react';
import { fetchProjects, createProject, updateProject, deleteProject } from '../../lib/api';

export default function ProjectsManager() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<any>({ title: '', description: '', repoUrl: '', liveUrl: '', techStack: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = () => fetchProjects().then(setItems);

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProject(editingId, form);
      } else {
        await createProject(form);
      }
      setForm({ title: '', description: '', repoUrl: '', liveUrl: '', techStack: '' });
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
    if (confirm('Delete this project?')) {
      await deleteProject(id);
      load();
    }
  };

  return (
    <div className="card">
      <h3>Manage Projects</h3>
      <div style={{ marginBottom: '2rem' }}>
        {items.map((item) => (
          <div key={item.id} style={{ borderBottom: '1px solid #334155', padding: '1rem 0', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <strong>{item.title}</strong>
            </div>
            <div>
              <button onClick={() => handleEdit(item)} style={{ marginRight: '0.5rem' }}>Edit</button>
              <button onClick={() => handleDelete(item.id)} style={{ background: '#ef4444' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <h4>{editingId ? 'Edit' : 'Add'} Project</h4>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.5rem' }}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="input-field" required />
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input-field" rows={3} required />
        <input placeholder="Repo URL" value={form.repoUrl} onChange={e => setForm({...form, repoUrl: e.target.value})} className="input-field" />
        <input placeholder="Live URL" value={form.liveUrl} onChange={e => setForm({...form, liveUrl: e.target.value})} className="input-field" />
        <input placeholder="Tech Stack (JSON or CSV)" value={form.techStack} onChange={e => setForm({...form, techStack: e.target.value})} className="input-field" />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({}); }} style={{ background: 'transparent', border: '1px solid white' }}>Cancel</button>}
      </form>
    </div>
  );
}
