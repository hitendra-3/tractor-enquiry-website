import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Wrench, Tractor, Mail, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { name: "Manage Tractors", path: "/admin/tractors", icon: Tractor },
    { name: "Manage Services", path: "/admin/services", icon: Wrench },
    { name: "View Enquiries", path: "/admin/enquiries", icon: Mail },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-roboto">
      {/* SIDEBAR */}
      <aside className="w-64 bg-dark text-white flex flex-col shadow-xl fixed h-full z-10">
        <div className="p-6 border-b border-gray-800 flex items-center gap-2">
          <LayoutDashboard className="h-8 w-8 text-primary" />
          <span className="text-2xl font-oswald font-bold tracking-wider">
            ADMIN<span className="text-primary">PANEL</span>
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 group ${location.pathname === item.path
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              <item.icon className={`h-5 w-5 ${location.pathname === item.path ? "text-white" : "text-gray-500 group-hover:text-primary"}`} />
              <span className="font-medium tracking-wide">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 transition-colors w-full"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
