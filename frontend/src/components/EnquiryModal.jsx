import { useState } from "react";
import { apiFetch } from "../services/api";

export default function EnquiryModal({ open, onClose, type, itemId }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submitEnquiry = async () => {
    try {
      setLoading(true);
      await apiFetch("/enquiries", {
        method: "POST",
        body: JSON.stringify({
          type,
          item_id: itemId,
          message
        })
      });
      alert("Enquiry sent successfully 🚜");
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-bold mb-4">Send Enquiry</h2>

        <textarea
          placeholder="Write your message..."
          className="w-full border p-2 rounded mb-4"
          rows={4}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={submitEnquiry}
            disabled={loading}
            className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
