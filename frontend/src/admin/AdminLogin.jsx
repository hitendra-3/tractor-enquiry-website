import { useState } from "react";
import { apiFetch } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { login } = useAuth(); // login is not needed, context listens to supabase
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Direct Supabase Login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check for Admin Email
      if (data.user.email !== "vkcroppvtltd@gmail.com") {
        await supabase.auth.signOut();
        throw new Error("Access Denied: You are not an admin.");
      }

      // Context will update automatically due to onAuthStateChange
      navigate("/admin");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96 border-t-8 border-primary">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
            <ShieldCheck className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl font-oswald font-bold text-dark uppercase">Admin Panel</h2>
          <p className="text-gray-500">Secure Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">Email</label>
            <input
              type="email"
              placeholder="admin@fixit.com"
              className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-dark text-white py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-primary transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
