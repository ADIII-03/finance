// ✅ formatCurrency
export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

// ✅ formatDate
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ✅ Category type (optional but better)
type Category =
  | "Income"
  | "Food"
  | "Transport"
  | "Entertainment"
  | "Utilities"
  | "Shopping"
  | "Health"
  | "Groceries"
  | "Housing";

// ✅ getCategoryColor
export const getCategoryColor = (category: string): string => {
  const map: Record<Category, string> = {
    Income: "#c6f135",
    Food: "#f97316",
    Transport: "#38bdf8",
    Entertainment: "#a78bfa",
    Utilities: "#fb923c",
    Shopping: "#f472b6",
    Health: "#34d399",
    Groceries: "#fbbf24",
    Housing: "#60a5fa",
  };

  return map[category as Category] || "#8892a4";
};