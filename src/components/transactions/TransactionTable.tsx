import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { formatCurrency, formatDate, getCategoryColor } from "../../utils/helpers";
import TransactionFilters from "./TransactionFilters";
import AddTransactionModal from "./AddTransactionModal";

export default function TransactionTable() {
  const { state, dispatch } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const { filters, transactions, role } = state;

  let filtered = transactions.filter(t => {
    const matchSearch = t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      t.category.toLowerCase().includes(filters.search.toLowerCase());
    const matchCat = filters.category === "All" || t.category === filters.category;
    const matchType = filters.type === "All" || t.type === filters.type;
    return matchSearch && matchCat && matchType;
  });

  filtered = [...filtered].sort((a, b) => {
    if (filters.sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
    if (filters.sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
    if (filters.sortBy === "amount-desc") return b.amount - a.amount;
    return a.amount - b.amount;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-700 text-white text-xl">Transactions</h2>
        {role === "admin" && (
          <button onClick={() => { setEditItem(null); setShowModal(true); }}
            className="flex items-center gap-2 bg-acid text-ink-950 px-4 py-2 rounded-xl text-sm font-display font-700 hover:bg-acid-dark transition-colors">
            <Plus size={14} /> Add
          </button>
        )}
      </div>

      <TransactionFilters />

      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-slate-muted font-mono text-sm">No transactions match your filters.</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-600">
                  {["Date", "Description", "Category", "Type", "Amount", ...(role === "admin" ? ["Actions"] : [])].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-mono text-slate-muted uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr key={t.id} className={`border-b border-ink-700 hover:bg-ink-700/40 transition-colors ${i % 2 === 0 ? "" : "bg-ink-800/30"}`}>
                    <td className="px-4 py-3 font-mono text-xs text-slate-muted">{formatDate(t.date)}</td>
                    <td className="px-4 py-3 text-white font-body">{t.description}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-md text-xs font-mono" style={{ backgroundColor: getCategoryColor(t.category) + "22", color: getCategoryColor(t.category) }}>
                        {t.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-md ${t.type === "income" ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"}`}>
                        {t.type}
                      </span>
                    </td>
                    <td className={`px-4 py-3 font-mono font-500 ${t.type === "income" ? "text-emerald-400" : "text-red-400"}`}>
                      {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                    </td>
                    {role === "admin" && (
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditItem(t); setShowModal(true); }} className="text-slate-muted hover:text-acid transition-colors"><Pencil size={13} /></button>
                          <button onClick={() => dispatch({ type: "DELETE_TRANSACTION", payload: t.id })} className="text-slate-muted hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} editData={editItem} />}
    </div>
  );
}