// Globally available TypeScript definitions

export type Role = "viewer" | "admin";
export type Tab = "dashboard" | "transactions" | "insights";
export type Theme = "light" | "dark";

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  description: string;
}

export interface Filters {
  search: string;
  category: string;
  type: string;
  sortBy: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
}

export interface ChartMonth {
  month: string;
  income: number;
  expenses: number;
  net: number;
}

export type MonthData = {
  income: number;
  expenses: number;
};
