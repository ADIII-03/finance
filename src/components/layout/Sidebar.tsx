import { LayoutDashboard, ArrowLeftRight, Lightbulb, TrendingUp } from "lucide-react";
import { useApp } from "../../context/AppContext";

const nav = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

export default function Sidebar() {
  const { state, dispatch } = useApp();

  return (
    <aside className="hidden md:flex flex-col w-56 bg-ink-900 border-r border-ink-600 min-h-screen p-5 fixed left-0 top-0 bottom-0 z-20">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10 mt-1">
        <div className="w-8 h-8 bg-acid rounded-lg flex items-center justify-center">
          <TrendingUp size={16} className="text-ink-950" />
        </div>
        <span className="font-display font-800 text-white text-lg tracking-tight">Finio</span>
      </div>

      {/* Role switcher */}
      <div className="mb-8">
        <p className="text-xs text-slate-muted font-mono uppercase tracking-widest mb-2">Role</p>
        <select
          value={state.role}
          onChange={e => dispatch({ type: "SET_ROLE", payload: e.target.value })}
          className="w-full bg-ink-700 border border-ink-600 text-white text-sm rounded-lg px-3 py-2 font-body focus:outline-none focus:border-acid"
        >
          <option value="viewer">👁 Viewer</option>
          <option value="admin">⚡ Admin</option>
        </select>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {nav.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => dispatch({ type: "SET_TAB", payload: id })}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body transition-all ${
              state.activeTab === id
                ? "bg-acid text-ink-950 font-500"
                : "text-slate-muted hover:text-white hover:bg-ink-700"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <div className={`px-3 py-2 rounded-lg text-xs font-mono ${state.role === "admin" ? "bg-acid/10 text-acid border border-acid/20" : "bg-ink-700 text-slate-muted"}`}>
          {state.role === "admin" ? "✦ Admin Mode" : "○ View Only"}
        </div>
      </div>
    </aside>
  );
}