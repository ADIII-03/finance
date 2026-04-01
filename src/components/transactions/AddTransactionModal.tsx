import { useState } from "react";
import { X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/mockData";

export default function AddTransactionModal({ onClose, editData = null }) {
  const { dispatch } = useApp();
  const [form, setForm] = useState(editData || { date: "", description: "", category: "Food", type: "expense", amount: "" });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.date || !form.description || !form.amount) return;
    if (editData) {
      dispatch({ type: "EDIT_TRANSACTION", payload: { ...form, amount: +form.amount } });
    } else {
      dispatch({ type: "ADD_TRANSACTION", payload: { ...form, id: Date.now(), amount: +form.amount } });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 p-4">
      <div className="card w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-700 text-white text-lg">{editData ? "Edit" : "Add"} Transaction</h2>
          <button onClick={onClose} className="text-slate-muted hover:text-white"><X size={18} /></button>
        </div>
        <div className="space-y-3">
          {[
            { label: "Description", key: "description", type: "text" },
            { label: "Date", key: "date", type: "date" },
            { label: "Amount (₹)", key: "amount", type: "number" },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className="text-xs font-mono text-slate-muted uppercase tracking-wider mb-1 block">{label}</label>
              <input type={type} value={form[key]} onChange={e => set(key, e.target.value)}
                className="w-full bg-ink-700 border border-ink-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-acid font-body" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-slate-muted uppercase tracking-wider mb-1 block">Category</label>
              <select value={form.category} onChange={e => set("category", e.target.value)}
                className="w-full bg-ink-700 border border-ink-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-acid font-body">
                {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-mono text-slate-muted uppercase tracking-wider mb-1 block">Type</label>
              <select value={form.type} onChange={e => set("type", e.target.value)}
                className="w-full bg-ink-700 border border-ink-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-acid font-body">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 bg-ink-700 text-white rounded-xl py-2 text-sm hover:bg-ink-600 transition-colors font-body">Cancel</button>
          <button onClick={handleSubmit} className="flex-1 bg-acid text-ink-950 rounded-xl py-2 text-sm font-display font-700 hover:bg-acid-dark transition-colors">
            {editData ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}