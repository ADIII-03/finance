import { Search, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/mockData";

export default function TransactionFilters() {
  const { state, dispatch } = useApp();
  const { filters } = state;
  const set = (obj) => dispatch({ type: "SET_FILTER", payload: obj });

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="relative flex-1 min-w-48">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={e => set({ search: e.target.value })}
          className="w-full bg-ink-800 border border-ink-600 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-muted focus:outline-none focus:border-acid font-body"
        />
        {filters.search && (
          <button onClick={() => set({ search: "" })} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-muted hover:text-white">
            <X size={12} />
          </button>
        )}
      </div>

      <select value={filters.category} onChange={e => set({ category: e.target.value })}
        className="bg-ink-800 border border-ink-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-acid font-body">
        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
      </select>

      <select value={filters.type} onChange={e => set({ type: e.target.value })}
        className="bg-ink-800 border border-ink-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-acid font-body">
        <option value="All">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select value={filters.sortBy} onChange={e => set({ sortBy: e.target.value })}
        className="bg-ink-800 border border-ink-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-acid font-body">
        <option value="date-desc">Newest First</option>
        <option value="date-asc">Oldest First</option>
        <option value="amount-desc">Highest Amount</option>
        <option value="amount-asc">Lowest Amount</option>
      </select>
    </div>
  );
}