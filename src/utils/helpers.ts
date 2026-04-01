export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

export const getCategoryColor = (category) => {
  const map = {
    Income: "#c6f135", Food: "#f97316", Transport: "#38bdf8",
    Entertainment: "#a78bfa", Utilities: "#fb923c", Shopping: "#f472b6",
    Health: "#34d399", Groceries: "#fbbf24", Housing: "#60a5fa",
  };
  return map[category] || "#8892a4";
};