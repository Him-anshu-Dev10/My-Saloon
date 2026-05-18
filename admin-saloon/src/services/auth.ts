const DEMO = { email: 'admin@glowup.test', password: 'admin123' }

export const auth = {
  login: async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 250))
    return email === DEMO.email && password === DEMO.password
  },
  setCurrent: (email: string) => {
    localStorage.setItem('admin_user', email)
  },
  getCurrent: (): string | null => {
    return localStorage.getItem('admin_user')
  },
  logout: () => {
    localStorage.removeItem('admin_user')
  },
}
