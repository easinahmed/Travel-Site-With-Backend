const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export async function fetchSiteContent() {
  try {
    const response = await fetch(`${API_URL}/content`);
    if (!response.ok) throw new Error('Failed to load content');
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.warn('Using fallback content because the API is unavailable:', error);
    return null;
  }
}

export async function saveSiteContent(payload: unknown, token?: string) {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_URL}/content`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('Failed to save content');
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Unable to save content:', error);
    return null;
  }
}
