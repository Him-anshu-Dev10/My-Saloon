const localApiBase = "http://localhost:3000/api/v1";
const deployedApiBase = "https://my-saloon-5y5p.vercel.app/api/v1";

export const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL ||
  (import.meta.env.PROD ? deployedApiBase : localApiBase);