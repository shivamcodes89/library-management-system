import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

// Har request mein JWT token auto attach karo
api.interceptors.request.use((config) => {
  try {
    const user = JSON.parse(localStorage.getItem("lexicon_user"));
    if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  } catch {}
  return config;
});

// 401 pe auto logout
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("lexicon_user");
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default api;