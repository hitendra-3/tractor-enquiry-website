import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // wait for session

  if (!user || user.email !== "vkcroppvtltd@gmail.com") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
