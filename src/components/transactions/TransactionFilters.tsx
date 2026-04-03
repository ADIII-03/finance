import { Search, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setFilters } from "@/store/financeSlice";
import { CATEGORIES } from "../../data/mockData";
import { SORT_OPTIONS } from "@/constants";

export default function TransactionFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.finance.filters);

  // Type safe partially updating function
  const set = (obj: Parameters<typeof setFilters>[0]) => dispatch(setFilters(obj));

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

      <select value={filters.type} onChange={e => set({ type: e.target.value as any })}
        className="bg-ink-800 border border-ink-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-acid font-body">
        <option value="All">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select value={filters.sortBy} onChange={e => set({ sortBy: e.target.value as any })}
        className="bg-ink-800 border border-ink-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-acid font-body">
        {SORT_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}