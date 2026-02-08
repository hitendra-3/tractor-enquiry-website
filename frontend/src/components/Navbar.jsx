import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Tractor, LayoutDashboard, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT US", path: "/#about", anchor: true },
    { name: "SERVICES", path: "/services" },
    { name: "TRACTORS", path: "/tractors" },
    { name: "CONTACT", path: "/contact" },
  ];

  const navTextClass = scrolled ? "text-dark" : "text-white";

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg py-2" : "bg-black/20 backdrop-blur-sm py-4"
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Tractor className={`h-8 w-8 text-primary group-hover:${scrolled ? "text-primary" : "text-white"} transition-colors`} />
          <span className={`text-2xl font-oswald font-bold tracking-wider ${navTextClass}`}>
            FIX<span className="text-primary">IT</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.anchor ? (
              <a key={link.name} href={link.path} className={`text-sm font-oswald font-medium tracking-widest hover:text-primary transition-colors relative ${navTextClass}`}>
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-oswald font-medium tracking-widest hover:text-primary transition-colors relative ${location.pathname === link.path ? "text-primary" : navTextClass}`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            )
          ))}

          <div className="w-px h-6 bg-gray-600 mx-2"></div>

          {user ? (
            <div className="flex items-center gap-4">
              {/* Simple check, ideally check role */}
              {(user.email === 'vkcroppvtltd@gmail.com' || user.role === 'admin') && (
                <Link to="/admin" className="text-white hover:text-primary transition-colors flex items-center gap-2 text-sm font-bold uppercase">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
              )}
              <button onClick={logout} className="text-white hover:text-primary transition-colors flex items-center gap-2 text-sm font-bold uppercase">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className={`${navTextClass} hover:text-primary transition-colors flex items-center gap-2 text-sm font-bold uppercase`}>
              <LogIn className="h-4 w-4" /> Login
            </Link>
          )}

          {/* Explicit Admin Link for Visibility */}
          {!user && (
            <Link to="/admin/login" className="text-xs font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-wider border border-gray-600 px-2 py-1 rounded hover:bg-dark hover:border-dark ml-2">
              Admin
            </Link>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${navTextClass} hover:text-primary transition-colors`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white absolute w-full left-0 top-full border-t border-gray-200 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                link.anchor ? (
                  <a key={link.name} href={link.path} className={`font-oswald text-lg hover:text-primary transition-colors ${navTextClass}`} onClick={() => setIsOpen(false)}>{link.name}</a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`font-oswald text-lg hover:text-primary transition-colors ${location.pathname === link.path ? "text-primary" : navTextClass}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="h-px bg-gray-200 my-2"></div>
              {user ? (
                <>
                  <Link to="/admin" onClick={() => setIsOpen(false)} className={`hover:text-primary transition-colors flex items-center gap-2 ${navTextClass}`}>
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  <button onClick={() => { logout(); setIsOpen(false); }} className={`hover:text-primary transition-colors flex items-center gap-2 text-left ${navTextClass}`}>
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className={`hover:text-primary transition-colors flex items-center gap-2 ${navTextClass}`}>
                  <LogIn className="h-4 w-4" /> Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
