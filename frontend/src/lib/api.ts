const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8787") + "/api";

export type Profile = {
    name: string;
    tagline: string;
    summary: string;
    avatarUrl?: string;
    location?: string;
    github?: string;
    linkedin?: string;
    email?: string;
    website?: string;
}

// Profile
// Profile
export async function fetchProfile() {
  const res = await fetch(`${API_URL}/profile`, { credentials: 'include' });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function updateProfile(data: Partial<Profile>) {
  const res = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include'
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
}

// Skills
export async function fetchSkills() {
  const res = await fetch(`${API_URL}/skills`, { credentials: 'include' });
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}

export async function createSkill(data: any) {
  const res = await fetch(`${API_URL}/skills`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include'
  });
  if (!res.ok) throw new Error("Failed to create skill");
  return res.json();
}

export async function deleteSkill(id: number) {
  const res = await fetch(`${API_URL}/skills/${id}`, { method: 'DELETE', credentials: 'include' });
  if (!res.ok) throw new Error("Failed to delete skill");
  return res.json();
}

// Projects
export async function fetchProjects() {
  const res = await fetch(`${API_URL}/projects`, { credentials: 'include' });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function createProject(data: any) {
  const res = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include'
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
}

export async function updateProject(id: number, data: any) {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include'
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
}

export async function deleteProject(id: number) {
  const res = await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE', credentials: 'include' });
  if (!res.ok) throw new Error("Failed to delete project");
  return res.json();
}

// Experience
export async function fetchExperience() {
  const res = await fetch(`${API_URL}/experience`, { credentials: 'include' });
  if (!res.ok) throw new Error("Failed to fetch experience");
  return res.json();
}

export async function createExperience(data: any) {
  const res = await fetch(`${API_URL}/experience`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include'
  });
  if (!res.ok) throw new Error("Failed to create experience");
  return res.json();
}

export async function updateExperience(id: number, data: any) {
  const res = await fetch(`${API_URL}/experience/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include'
  });
  if (!res.ok) throw new Error("Failed to update experience");
  return res.json();
}

export async function deleteExperience(id: number) {
  const res = await fetch(`${API_URL}/experience/${id}`, { method: 'DELETE', credentials: 'include' });
  if (!res.ok) throw new Error("Failed to delete experience");
  return res.json();
}
