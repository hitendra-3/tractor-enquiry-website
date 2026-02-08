import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Tractors from "./pages/Tractors";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ManageEnquiries from "./admin/ManageEnquiries";
import ManageTractors from "./admin/ManageTractors";
import ManageServices from "./admin/ManageServices";
import AdminRoute from "./admin/AdminRoute";

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/tractors" element={<Tractors />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />

          {/* ADMIN LOGIN */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ADMIN PROTECTED */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          >
            <Route
              index
              element={
                <h1 className="text-2xl font-bold">
                  Welcome Admin 👑 <br />
                  Select an option from the sidebar
                </h1>
              }
            />
            <Route path="tractors" element={<ManageTractors />} />
            <Route path="services" element={<ManageServices />} />
            <Route path="enquiries" element={<ManageEnquiries />} />
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <ScrollToTop />}
    </div>
  );
}
