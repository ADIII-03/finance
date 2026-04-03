import { LayoutDashboard, ArrowLeftRight, Lightbulb, TrendingUp, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setRole, setTab, toggleTheme } from "../../store/financeSlice";
import type { Role, Tab } from "../../store/financeSlice";
import { toast } from "sonner";

const nav = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

export default function TopBar() {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(state => state.finance.activeTab);
  const role = useAppSelector(state => state.finance.role);
  const theme = useAppSelector(state => state.finance.theme);
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="md:ml-56 sticky top-0 z-10 bg-ink-900/80 backdrop-blur-md border-b border-ink-600 px-5 py-3 flex items-center justify-between transition-colors duration-300">
        {/* Left: page title */}
        <div>
          <h1 className="font-display font-bold text-white text-base capitalize leading-tight">
            {activeTab}
          </h1>
          <p className="text-[11px] text-slate-muted font-mono leading-tight mt-0.5">
            April 2025
          </p>
        </div>

        {/* Right: role badge + theme switch + hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              dispatch(toggleTheme());
              toast.success(`Switched theme`);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-ink-700 text-slate-muted hover:text-white transition-colors border border-ink-600"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          
          <span
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border transition-colors ${
              role === "admin"
                ? "bg-acid/10 text-acid border-acid/30"
                : "bg-ink-700 text-slate-muted border-ink-600"
            }`}
          >
            {role === "admin" ? "⚡ Admin" : "👁 Viewer"}
          </span>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 rounded-lg hover:bg-ink-700 transition-colors"
            onClick={() => setOpen(true)}
          >
            <span className="w-4 h-[1.5px] bg-white rounded-full" />
            <span className="w-4 h-[1.5px] bg-white rounded-full" />
            <span className="w-3 h-[1.5px] bg-white rounded-full self-start ml-0.5" />
          </button>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-50 flex"
          onClick={() => setOpen(false)}
        >
          {/* Dimmed backdrop */}
          <div className="absolute inset-0 bg-ink-950/40 backdrop-blur-md transition-opacity duration-300" />

          {/* Drawer panel — slides in from left */}
          <div
            className="relative w-72 bg-ink-900 border-r border-ink-600 h-full flex flex-col p-6"
            onClick={e => e.stopPropagation()}
          >
            {/* Header row */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-acid rounded-lg flex items-center justify-center">
                  <TrendingUp size={15} className="text-ink-950" />
                </div>
                <span className="font-display font-bold text-white text-lg tracking-tight">
                  Finio
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg bg-ink-700 flex items-center justify-center text-slate-muted hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Role switcher */}
            <div className="mb-7">
              <p className="text-[10px] text-slate-muted font-mono uppercase tracking-widest mb-2">
                Role
              </p>
              <select
                value={role}
                onChange={e => {
                  dispatch(setRole(e.target.value as Role));
                  toast.success(`Role switched to ${e.target.value}!`);
                  setOpen(false);
                }}
                className="w-full bg-ink-700 border border-ink-600 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-acid"
              >
                <option value="viewer">👁 Viewer</option>
                <option value="admin">⚡ Admin</option>
              </select>
            </div>

            {/* Nav links */}
            <p className="text-[10px] text-slate-muted font-mono uppercase tracking-widest mb-2">
              Navigation
            </p>
            <nav className="flex flex-col gap-1">
              {nav.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    dispatch(setTab(id as Tab));
                    setOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm transition-colors ${
                    activeTab === id
                      ? "bg-acid text-ink-950 font-semibold"
                      : "text-slate-muted hover:text-white hover:bg-ink-700"
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </nav>

            {/* Bottom role pill */}
            <div className="mt-auto">
              <div
                className={`px-3 py-2 rounded-lg text-xs font-mono text-center border ${
                  role === "admin"
                    ? "bg-acid/10 text-acid border-acid/20"
                    : "bg-ink-700 text-slate-muted border-ink-600"
                }`}
              >
                {role === "admin" ? "⚡ Admin Mode active" : "○ View only mode"}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}