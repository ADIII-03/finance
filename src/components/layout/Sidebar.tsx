import { TrendingUp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setRole, setTab } from "@/store/financeSlice";
import { toast } from "sonner";
import { APP_NAVIGATION } from "@/constants";
import type { Role, Tab } from "@/types";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const role = useAppSelector(state => state.finance.role);
  const activeTab = useAppSelector(state => state.finance.activeTab);

  return (
    <aside className="hidden md:flex flex-col w-56 bg-ink-900 border-r border-ink-600 h-screen p-5 fixed left-0 top-0 bottom-0 z-20">
      
      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-10 mt-1">
        <div className="w-8 h-8 bg-acid rounded-lg flex items-center justify-center flex-shrink-0">
          <TrendingUp size={15} className="text-ink-950" />
        </div>
        <span className="font-display font-bold text-white text-lg tracking-tight">Finio</span>
      </div>

      {/* Role switcher */}
      <div className="mb-8">
        <p className="text-[10px] text-slate-muted font-mono uppercase tracking-widest mb-2">
          Role
        </p>
        <select
          value={role}
          onChange={e => {
            dispatch(setRole(e.target.value as Role));
            toast.success(`Role switched to ${e.target.value}!`);
          }}
          className="w-full bg-ink-800 border border-ink-600 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-acid transition-colors cursor-pointer"
        >
          <option value="viewer">👁 Viewer</option>
          <option value="admin">⚡ Admin</option>
        </select>
      </div>

      {/* Section label */}
      <p className="text-[10px] text-slate-muted font-mono uppercase tracking-widest mb-2">
        Navigation
      </p>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 flex-1">
        {APP_NAVIGATION.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => dispatch(setTab(id as Tab))}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 text-left w-full ${
              activeTab === id
                ? "bg-acid text-ink-950 font-semibold"
                : "text-slate-muted hover:text-white hover:bg-ink-700 hover:translate-x-1"
            }`}
          >
            <Icon size={15} className={`flex-shrink-0 transition-transform duration-200 ${activeTab === id ? 'scale-110' : ''}`} />
            {label}
          </button>
        ))}
      </nav>

      {/* Bottom status pill */}
      <div className="mt-auto pt-4 border-t border-ink-600">
        <div
          className={`px-3 py-2.5 rounded-xl text-xs font-mono border flex items-center gap-2 ${
            role === "admin"
              ? "bg-acid/10 text-acid border-acid/20"
              : "bg-ink-800 text-slate-muted border-ink-600"
          }`}
        >
          <span className="text-[10px]">{role === "admin" ? "⚡" : "○"}</span>
          {role === "admin" ? "Admin mode active" : "View only mode"}
        </div>

        {/* App version */}
        <p className="text-[10px] text-slate-muted font-mono text-center mt-3 opacity-40">
          Finio v1.0.0
        </p>
      </div>
    </aside>
  );
}