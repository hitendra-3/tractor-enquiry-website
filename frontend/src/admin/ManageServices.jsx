import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import { Plus, Edit2, Trash2, X, Save, Search } from "lucide-react";
import { supabase } from "../supabase";

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const loadServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setServices(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (editingId) {
      const { error } = await supabase
        .from("services")
        .update(form)
        .eq("id", editingId);
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.from("services").insert([form]);
      if (error) alert(error.message);
    }

    resetForm();
    loadServices();
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: ""
    });
    setEditingId(null);
    setIsFormOpen(false);
    setLoading(false);
  }

  const edit = (s) => {
    setForm(s);
    setEditingId(s.id);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (id) => {
    if (!confirm("Delete this service?")) return;
    await supabase.from("services").delete().eq("id", id);
    loadServices();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-oswald font-bold text-dark uppercase">Manage Services</h1>
          <p className="text-gray-500">Add or remove services offered.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsFormOpen(true); }}
          className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-lg"
        >
          <Plus className="h-5 w-5" /> Add New Service
        </button>
      </div>

      {/* FORM */}
      {isFormOpen && (
        <div className="bg-white p-8 rounded-lg shadow-xl mb-8 border-t-4 border-primary animation-fade-in relative">
          <button
            onClick={resetForm}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            {editingId ? <Edit2 className="h-5 w-5 text-primary" /> : <Plus className="h-5 w-5 text-primary" />}
            {editingId ? "Edit Service" : "Add New Service"}
          </h2>

          <form onSubmit={submit} className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Service Title</label>
              <input
                className="w-full border p-3 rounded-sm focus:ring-1 focus:ring-primary focus:outline-none"
                placeholder="e.g. Engine Repair"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full border p-3 rounded-sm focus:ring-1 focus:ring-primary focus:outline-none"
                placeholder="Describe the service..."
                rows="4"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 text-gray-600 font-bold rounded-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-primary text-white font-bold rounded-sm hover:bg-secondary transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {loading ? "Saving..." : editingId ? "Update Service" : "Save Service"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LIST */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-bold text-sm text-gray-600 uppercase tracking-wider">Title</th>
              <th className="p-4 font-bold text-sm text-gray-600 uppercase tracking-wider">Description</th>
              <th className="p-4 font-bold text-sm text-gray-600 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && !isFormOpen ? (
              <tr><td colSpan="3" className="p-8 text-center text-gray-500">Loading data...</td></tr>
            ) : services.length === 0 ? (
              <tr><td colSpan="3" className="p-8 text-center text-gray-500">No services found.</td></tr>
            ) : (
              services.map(s => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-dark w-1/4">{s.title}</td>
                  <td className="p-4 text-gray-600">{s.description}</td>
                  <td className="p-4 text-right space-x-2 w-32">
                    <button
                      onClick={() => edit(s)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => remove(s.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
