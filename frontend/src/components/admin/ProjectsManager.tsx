import { useState, useEffect } from 'react';
import { fetchProjects, createProject, updateProject, deleteProject } from '../../lib/api';

export default function ProjectsManager() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<any>({ 
    title: '', 
    description: '', 
    repoUrl: '', 
    liveUrl: '', 
    techStack: '',
    content: '',
    achievement: '',
    images: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = () => fetchProjects().then(setItems);

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Parse images if it's a string
      const submitData = { ...form };
      if (submitData.images && typeof submitData.images === 'string') {
        try {
          submitData.images = JSON.parse(submitData.images);
        } catch (e) {
          // If not valid JSON, treat as empty array
          submitData.images = [];
        }
      }
      
      if (editingId) {
        await updateProject(editingId, submitData);
      } else {
        await createProject(submitData);
      }
      setForm({ 
        title: '', 
        description: '', 
        repoUrl: '', 
        liveUrl: '', 
        techStack: '',
        content: '',
        achievement: '',
        images: ''
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
      images: typeof item.images === 'string' ? item.images : JSON.stringify(item.images || [])
    });
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
        <textarea placeholder="Content (detailed description, one line per bullet point)" value={form.content || ''} onChange={e => setForm({...form, content: e.target.value})} className="input-field" rows={5} />
        <input placeholder="Achievement (e.g., Top 20 in VPBank Hackathon 2025)" value={form.achievement || ''} onChange={e => setForm({...form, achievement: e.target.value})} className="input-field" />
        <input placeholder="Tech Stack (JSON array or CSV)" value={form.techStack || ''} onChange={e => setForm({...form, techStack: e.target.value})} className="input-field" />
        <input placeholder='Images (JSON array of URLs, e.g., ["url1", "url2"])' value={form.images || ''} onChange={e => setForm({...form, images: e.target.value})} className="input-field" />
        <input placeholder="Repo URL" value={form.repoUrl || ''} onChange={e => setForm({...form, repoUrl: e.target.value})} className="input-field" />
        <input placeholder="Live URL" value={form.liveUrl || ''} onChange={e => setForm({...form, liveUrl: e.target.value})} className="input-field" />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', description: '', repoUrl: '', liveUrl: '', techStack: '', content: '', achievement: '', images: '' }); }} style={{ background: 'transparent', border: '1px solid white' }}>Cancel</button>}
      </form>
    </div>
  );
}
