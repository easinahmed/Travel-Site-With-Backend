const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export async function loginAdmin(email: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Login failed');
    return result;
  } catch (error: any) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function registerAdmin(name: string, email: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Registration failed');
    return result;
  } catch (error: any) {
    console.error('Registration error:', error);
    throw error;
  }
}
