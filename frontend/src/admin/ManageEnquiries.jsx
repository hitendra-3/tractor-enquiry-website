import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import { Mail, Calendar, User, FileText, CheckCircle } from "lucide-react";

export default function ManageEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/admin/enquiries");
      setEnquiries(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-oswald font-bold text-dark uppercase">Enquiries</h1>
          <p className="text-gray-500">View inquiries from customers.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-bold text-gray-500">
          Total: {enquiries.length}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="p-12 text-center text-gray-500 bg-white rounded shadow-sm">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-gray-500 bg-white rounded shadow-sm">No enquiries found.</div>
        ) : (
          enquiries.map(e => (
            <div key={e.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-dark">{e.users?.email || "Unknown User"}</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mt-1">
                      {e.type === 'service' ? 'Service Enquiry' : e.type === 'tractor' ? 'Tractor Enquiry' : 'General Enquiry'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar className="h-4 w-4" />
                  {formatDate(e.created_at)}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-sm border border-gray-100">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                  <p className="text-gray-700 leading-relaxed">
                    {e.message || "No message provided."}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="text-sm font-bold text-primary hover:text-secondary uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" /> Mark as Read
                </button>
                {/* Placeholder for future functionality */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
