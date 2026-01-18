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

export async function fetchProfile() {
  const res = await fetch(`${API_URL}/profile`);
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}
