import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/Topbar";
import SummaryCards from "./components/dashboard/SummaryCards";
import BalanceTrend from "./components/dashboard/BalanceTrend";
import SpendingBreakdown from "./components/dashboard/SpendingBreakdown";
import TransactionTable from "./components/transactions/TransactionTable";
import InsightsPanel from "./components/insights/InsightsPanel";
import { useApp } from "./context/AppContext";

function Content() {
  const { state } = useApp();
  const { activeTab } = state;

  if (activeTab === "transactions") return <TransactionTable />;
  if (activeTab === "insights") return <InsightsPanel />;

  return (
    <div className="space-y-5">
      <SummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2"><BalanceTrend /></div>
        <div><SpendingBreakdown /></div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-ink-950">
      <Sidebar />
      <div className="md:ml-56">
        <TopBar />
        <main className="p-5 md:p-7 max-w-6xl">
          <Content />
        </main>
      </div>
    </div>
  );
}