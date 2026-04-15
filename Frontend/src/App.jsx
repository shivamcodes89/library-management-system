import { useState } from "react";
import Login     from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin  = (formData) => {
    // Baad mein yahan API call hogi
    setUser({ name: "Admin User", email: formData.email });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return user
    ? <Dashboard user={user} onLogout={handleLogout} />
    : <Login     onLogin={handleLogin} />;
}