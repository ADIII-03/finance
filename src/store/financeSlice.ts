import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { transactions as mockTransactions } from "../data/mockData";
import type { Role, Tab, Theme, Transaction, Filters } from "@/types";

const LOCAL_STORAGE_KEY = "finio_transactions";
const TAB_STORAGE_KEY = "finio_active_tab";
const THEME_STORAGE_KEY = "finio_theme";

export interface FinanceState {
  transactions: Transaction[];
  role: Role;
  activeTab: Tab;
  filters: Filters;
  theme: Theme;
}

const getInitialTransactions = (): Transaction[] => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) return JSON.parse(saved) as Transaction[];
  } catch (e) {
    console.error("Failed to parse transactions from local storage", e);
  }
  return mockTransactions as Transaction[];
};

const getInitialTab = (): Tab => {
  try {
    const saved = localStorage.getItem(TAB_STORAGE_KEY) as Tab;
    if (saved === "dashboard" || saved === "transactions" || saved === "insights") {
      return saved;
    }
  } catch (e) {}
  return "dashboard";
};

const getInitialTheme = (): Theme => {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
    if (saved === "light" || saved === "dark") return saved;
  } catch (e) {}
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "dark";
};

const initialState: FinanceState = {
  transactions: getInitialTransactions(),
  role: "viewer",
  activeTab: getInitialTab(),
  filters: {
    search: "",
    category: "All",
    type: "All",
    sortBy: "date-desc",
  },
  theme: getInitialTheme(),
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload;
    },
    setTab: (state, action: PayloadAction<Tab>) => {
      state.activeTab = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<Filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
    deleteTransaction: (state, action: PayloadAction<number>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },
    editTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    }
  }
});

export const {
  setRole,
  setTab,
  setFilters,
  addTransaction,
  deleteTransaction,
  editTransaction,
  toggleTheme
} = financeSlice.actions;

export default financeSlice.reducer;
