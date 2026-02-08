import { useState } from "react";
import { apiFetch } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, Tractor } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await apiFetch("/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ email })
      });
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative bg-hero-pattern bg-cover bg-center">
      <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm"></div>

      <div className="relative z-10 bg-white p-8 rounded-lg shadow-2xl w-full max-w-md mx-4 border-t-4 border-primary">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group mb-4">
            <Tractor className="h-8 w-8 text-primary" />
            <span className="text-3xl font-oswald font-bold text-dark tracking-wider">
              FIX<span className="text-primary">IT</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold font-oswald text-dark uppercase">User Login</h2>
          <p className="text-gray-500 text-sm mt-2">Enter your email to receive an OTP</p>
        </div>

        <form onSubmit={sendOtp}>
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email Address</label>
            <input
              type="email"
              placeholder="Ex: user@example.com"
              className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-secondary transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-primary transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
