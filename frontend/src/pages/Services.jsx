import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import EnquiryModal from "../components/EnquiryModal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    apiFetch("/services")
      .then(setServices)
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

  // Helper to get a random placeholder image if none exists (assuming API doesn't return one for now)
  const getServiceImage = (index) => {
    const images = [
      "https://images.unsplash.com/photo-1632732959648-69345037E174?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542617300-4b51c1430038?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581092921461-eab62e97a7823?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop"
    ];
    return images[index % images.length];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-light pt-24 pb-20">
      <div className="container mx-auto px-6">
        <SectionHeader
          title="Professional Services"
          subtitle="Expert repair and maintenance for your agricultural machinery."
          centered={true}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((s, index) => (
            <motion.div
              key={s.id}
              variants={itemVariants}
              className="group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={getServiceImage(index)}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors"></div>
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-oswald font-bold text-dark mb-4 group-hover:text-primary transition-colors">
                  {s.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                  {s.description}
                </p>

                <button
                  onClick={() => handleEnquiry(s.id)}
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-gray-100 text-dark font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all rounded-sm"
                >
                  Enquire Service <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <EnquiryModal
          open={!!selectedId}
          onClose={() => setSelectedId(null)}
          type="service"
          itemId={selectedId}
        />
      </div>
    </div>
  );
}
