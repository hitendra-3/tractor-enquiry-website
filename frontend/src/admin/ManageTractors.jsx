import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import { Plus, Edit2, Trash2, X, Save, Search } from "lucide-react";

export default function ManageTractors() {
  const [tractors, setTractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    hp: "",
    price_range: "",
    image_url: "",
    description: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const loadTractors = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/tractors");
      setTractors(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTractors();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await apiFetch(`/admin/tractors/${editingId}`, {
        method: "PUT",
        body: JSON.stringify(form)
      });
    } else {
      await apiFetch("/admin/tractors", {
        method: "POST",
        body: JSON.stringify(form)
      });
    }

    resetForm();
    loadTractors();
  };

  const resetForm = () => {
    setForm({
      name: "",
      brand: "",
      hp: "",
      price_range: "",
      image_url: "",
      description: "" // Ensure description is handled if added to backend
    });
    setEditingId(null);
    setIsFormOpen(false);
  }

  const edit = (t) => {
    setForm(t);
    setEditingId(t.id);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (id) => {
    if (!confirm("Delete this tractor?")) return;
    await apiFetch(`/admin/tractors/${id}`, { method: "DELETE" });
    loadTractors();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-oswald font-bold text-dark uppercase">Manage Tractors</h1>
          <p className="text-gray-500">Add, update, or remove tractors from the catalog.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsFormOpen(true); }}
          className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-lg"
        >
          <Plus className="h-5 w-5" /> Add New Tractor
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
            {editingId ? "Edit Tractor" : "Add New Tractor"}
          </h2>

          <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Tractor Name</label>
              <input
                className="w-full border p-3 rounded-sm focus:ring-1 focus:ring-primary focus:outline-none"
                placeholder="e.g. John Deere 5310"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Brand</label>
              <select
                className="w-full border p-3 rounded-sm focus:ring-1 focus:ring-primary focus:outline-none"
                value={form.brand}
                onChange={e => setForm({ ...form, brand: e.target.value })}
                required
              >
                <option value="">Select Brand</option>
                <option value="Mahindra">Mahindra</option>
                <option value="Swaraj">Swaraj</option>
                <option value="John Deere">John Deere</option>
                <option value="Massey Ferguson">Massey Ferguson</option>
                <option value="Sonalika">Sonalika</option>
                <option value="New Holland">New Holland</option>
                <option value="Farmtrac">Farmtrac</option>
                <option value="Kubota">Kubota</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Horsepower (HP)</label>
              <input
                className="w-full border p-3 rounded-sm focus:ring-1 focus:ring-primary focus:outline-none"
                placeholder="e.g. 50"
                value={form.hp}
                onChange={e => setForm({ ...form, hp: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Price Range</label>
              <input
                className="w-full border p-3 rounded-sm focus:ring-1 focus:ring-primary focus:outline-none"
                placeholder="e.g. ₹6.50 - ₹7.20 Lakh"
                value={form.price_range}
                onChange={e => setForm({ ...form, price_range: e.target.value })}
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
              <input
                className="w-full border p-3 rounded-sm focus:ring-1 focus:ring-primary focus:outline-none"
                placeholder="https://..."
                value={form.image_url}
                onChange={e => setForm({ ...form, image_url: e.target.value })}
              />
              {form.image_url && (
                <div className="mt-2 h-32 w-full bg-gray-100 rounded overflow-hidden">
                  <img src={form.image_url} alt="Preview" className="h-full w-full object-contain" onError={(e) => e.target.style.display = 'none'} />
                </div>
              )}
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 text-gray-600 font-bold rounded-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white font-bold rounded-sm hover:bg-secondary transition-colors flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {editingId ? "Update Tractor" : "Save Tractor"}
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
              <th className="p-4 font-bold text-sm text-gray-600 uppercase tracking-wider">Image</th>
              <th className="p-4 font-bold text-sm text-gray-600 uppercase tracking-wider">Name</th>
              <th className="p-4 font-bold text-sm text-gray-600 uppercase tracking-wider">Brand</th>
              <th className="p-4 font-bold text-sm text-gray-600 uppercase tracking-wider">HP</th>
              <th className="p-4 font-bold text-sm text-gray-600 uppercase tracking-wider">Price</th>
              <th className="p-4 font-bold text-sm text-gray-600 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan="6" className="p-8 text-center text-gray-500">Loading data...</td></tr>
            ) : tractors.length === 0 ? (
              <tr><td colSpan="6" className="p-8 text-center text-gray-500">No tractors found.</td></tr>
            ) : (
              tractors.map(t => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <img src={t.image_url || "https://placehold.co/100"} alt={t.name} className="h-12 w-20 object-cover rounded" />
                  </td>
                  <td className="p-4 font-medium text-dark">{t.name}</td>
                  <td className="p-4 text-gray-600">{t.brand}</td>
                  <td className="p-4 text-gray-600">{t.hp}</td>
                  <td className="p-4 text-gray-600">{t.price_range}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => edit(t)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => remove(t.id)}
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
