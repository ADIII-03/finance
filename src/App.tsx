import { useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/Topbar";
import SummaryCards from "@/components/dashboard/SummaryCards";
import BalanceTrend from "@/components/dashboard/BalanceTrend";
import SpendingBreakdown from "@/components/dashboard/SpendingBreakdown";
import TransactionTable from "@/components/transactions/TransactionTable";
import InsightsPanel from "@/components/insights/InsightsPanel";
import { useAppSelector } from "@/store/hooks";
import { Toaster } from "sonner";

function Content() {
  const activeTab = useAppSelector((state) => state.finance.activeTab);

  if (activeTab === "transactions") return <TransactionTable />;
  if (activeTab === "insights") return <InsightsPanel />;

  return (
    <div className="space-y-4 md:space-y-6">
      <SummaryCards />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        <div className="xl:col-span-2">
          <BalanceTrend />
        </div>
        <div>
          <SpendingBreakdown />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const theme = useAppSelector((state) => state.finance.theme);

  // Synchronize Redux theme state with html class
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  // bg-ink-950 is intentionally removed here so the <body> level bg-[var(--theme-bg)] drives out colors dynamically
  return (
    <div className="flex min-h-screen transition-colors duration-300">
      <Toaster theme={theme === "dark" ? "dark" : "light"} />
      
      {/* Sidebar: fixed on desktop, hidden on mobile */}
      <Sidebar />

      {/* Right column: everything beside the sidebar */}
      <div className="flex flex-col flex-1 min-w-0 md:ml-56">
        {/* TopBar sticks to the top of this column */}
        <TopBar />

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 xl:p-8">
          <div className="max-w-6xl w-full mx-auto">
            <Content />
          </div>
        </main>
      </div>
    </div>
  );
}