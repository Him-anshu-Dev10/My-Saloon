const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:3000/api/v1'; // Use Vite env var or fallback

export const auth = {
  login: async (email: string, password: string) => {
    try {
      // Point to backend which is port 3000
      const response = await fetch(`${API_URL}/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('admin_token', data.token);
        // data.user has { id, email, role, salon_id }
        localStorage.setItem('admin_user', JSON.stringify(data.user || { email }));
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login error', err);
      return false;
    }
  },
  getCurrent: (): any | null => {
    const usr = localStorage.getItem('admin_user');
    if (usr) {
      try {
        return JSON.parse(usr);
      } catch (e) {
        return usr; // backward compat if it was just email string
      }
    }
    return null;
  },
  getToken: (): string | null => {
    return localStorage.getItem('admin_token')
  },
  logout: () => {
    localStorage.removeItem('admin_user')
    localStorage.removeItem('admin_token')
  },
}
