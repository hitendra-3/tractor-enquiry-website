import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import EnquiryModal from "../components/EnquiryModal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Tractors() {
  const [tractors, setTractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  // Search/Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    apiFetch("/tractors")
      .then(setTractors)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleEnquiry = (id) => {
    if (!user) {
      navigate("/login");
      return;
    }
    setSelectedId(id);
  };

  // Filter logic
  const filteredTractors = tractors.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = brandFilter === "All" || t.brand === brandFilter;
    return matchesSearch && matchesBrand;
  });

  const uniqueBrands = ["All", ...new Set(tractors.map(t => t.brand))];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-light pt-24 pb-20"> {/* pt-24 to account for fixed navbar */}
      <div className="container mx-auto px-6">
        <SectionHeader
          title="Available Tractors"
          subtitle="Explore our wide range of new and used tractors."
          centered={true}
        />

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search tractors..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {uniqueBrands.map(brand => (
              <button
                key={brand}
                onClick={() => setBrandFilter(brand)}
                className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${brand === brandFilter
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        {filteredTractors.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredTractors.map(t => (
              <motion.div
                key={t.id}
                variants={itemVariants}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={t.image_url || "https://images.unsplash.com/photo-1595245862086-f133d1cb5388?q=80&w=2069&auto=format&fit=crop"}
                    alt={t.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 uppercase rounded-sm shadow-sm">
                    {t.hp} HP
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-oswald font-bold text-dark group-hover:text-primary transition-colors line-clamp-1">
                        {t.name}
                      </h3>
                    </div>
                    <p className="text-gray-500 font-medium text-sm uppercase tracking-wide">{t.brand}</p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xl font-bold text-dark">
                      {t.price_range}
                    </span>
                    <button
                      onClick={() => handleEnquiry(t.id)}
                      className="px-4 py-2 bg-dark text-white text-sm font-bold uppercase tracking-wider hover:bg-primary transition-colors rounded-sm"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-oswald font-bold text-gray-400">No tractors found matching your criteria.</h3>
            <button
              onClick={() => { setSearchTerm(""); setBrandFilter("All"); }}
              className="mt-4 text-primary font-bold hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}

        <EnquiryModal
          open={!!selectedId}
          onClose={() => setSelectedId(null)}
          type="tractor"
          itemId={selectedId}
        />
      </div>
    </div>
  );
}
