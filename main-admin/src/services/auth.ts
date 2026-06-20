const API_URL = import.meta.env.DEV
  ? "http://localhost:3000/api/v1"
  : (import.meta.env.VITE_API_URL as string) || "http://localhost:3000/api/v1";

export const auth = {
  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/superadmin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("superadmin_token", data.token);
        localStorage.setItem("superadmin_user", data.user.email);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Super Admin Login error", err);
      return false;
    }
  },
  getCurrent: (): string | null => {
    return localStorage.getItem("superadmin_user");
  },
  getToken: (): string | null => {
    const token = localStorage.getItem("superadmin_token");

    if (!token) {
      return null;
    }

    const normalized = token.trim();

    if (!normalized || normalized === "null" || normalized === "undefined") {
      localStorage.removeItem("superadmin_token");
      return null;
    }

    return normalized;
  },
  logout: () => {
    localStorage.removeItem("superadmin_user");
    localStorage.removeItem("superadmin_token");
  },
};
