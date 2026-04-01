import { createContext, useContext, useReducer } from "react";
import { transactions as initialTransactions } from "../data/mockData";

const AppContext = createContext();

const initialState = {
  transactions: initialTransactions,
  role: "viewer",          // "viewer" | "admin"
  activeTab: "dashboard",  // "dashboard" | "transactions" | "insights"
  filters: { search: "", category: "All", type: "All", sortBy: "date-desc" },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.payload };
    case "SET_TAB":
      return { ...state, activeTab: action.payload };
    case "SET_FILTER":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "ADD_TRANSACTION":
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case "DELETE_TRANSACTION":
      return { ...state, transactions: state.transactions.filter(t => t.id !== action.payload) };
    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map(t => t.id === action.payload.id ? action.payload : t),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);