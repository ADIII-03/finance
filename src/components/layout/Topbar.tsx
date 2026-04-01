import { LayoutDashboard, ArrowLeftRight, Lightbulb, TrendingUp, Menu } from "lucide-react";
import { useState } from "react";
import { useApp } from "../../context/AppContext";

const nav = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

export default function TopBar() {
  const { state, dispatch } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop top bar - only shown on md+ as supplement */}
      <header className="md:ml-56 sticky top-0 z-10 bg-ink-950/80 backdrop-blur border-b border-ink-600 px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="font-display font-700 text-white text-lg capitalize">
            {state.activeTab}
          </h1>
          <p className="text-xs text-slate-muted font-mono">April 2025</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`hidden sm:block px-3 py-1 rounded-full text-xs font-mono ${state.role === "admin" ? "bg-acid/10 text-acid border border-acid/20" : "bg-ink-700 text-slate-muted"}`}>
            {state.role === "admin" ? "⚡ admin" : "👁 viewer"}
          </div>
          {/* Mobile menu */}
          <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-ink-950/90 p-6" onClick={() => setOpen(false)}>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-acid rounded-lg flex items-center justify-center">
              <TrendingUp size={16} className="text-ink-950" />
            </div>
            <span className="font-display font-800 text-white text-lg">Finio</span>
          </div>
          <div className="mb-6">
            <p className="text-xs text-slate-muted font-mono uppercase tracking-widest mb-2">Role</p>
            <select
              value={state.role}
              onChange={e => { dispatch({ type: "SET_ROLE", payload: e.target.value }); setOpen(false); }}
              className="w-full bg-ink-700 border border-ink-600 text-white text-sm rounded-lg px-3 py-2"
              onClick={e => e.stopPropagation()}
            >
              <option value="viewer">👁 Viewer</option>
              <option value="admin">⚡ Admin</option>
            </select>
          </div>
          {nav.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { dispatch({ type: "SET_TAB", payload: id }); setOpen(false); }}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm mb-2 ${state.activeTab === id ? "bg-acid text-ink-950 font-500" : "text-white bg-ink-800"}`}
            >
              <Icon size={16} />{label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}