import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { apiFetch } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { CheckCircle, Tractor } from "lucide-react";

export default function VerifyOtp() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  if (!state?.email) {
    navigate("/login");
    return null;
  }

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await apiFetch("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({
          email: state.email,
          otp
        })
      });

      login(res.user, res.token);
      navigate("/");
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
          <h2 className="text-2xl font-bold font-oswald text-dark uppercase">Verify OTP</h2>
          <p className="text-gray-500 text-sm mt-2">Enter the code sent to <span className="font-bold text-dark">{state.email}</span></p>
        </div>

        <form onSubmit={verifyOtp}>
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">One-Time Password</label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-center text-xl tracking-widest font-mono"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-secondary transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Verifying..." : "Verify & Login"}
            {!loading && <CheckCircle className="h-4 w-4" />}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-gray-500 hover:text-primary transition-colors"
          >
            Change Email
          </button>
        </div>
      </div>
    </div>
  );
}
