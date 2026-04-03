import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import financeReducer, {
  setTab,
  addTransaction,
  deleteTransaction,
  editTransaction,
  toggleTheme,
} from './financeSlice';

const syncMiddleware = createListenerMiddleware();

syncMiddleware.startListening({
  matcher: isAnyOf(addTransaction, deleteTransaction, editTransaction),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    localStorage.setItem("finio_transactions", JSON.stringify(state.finance.transactions));
  }
});

syncMiddleware.startListening({
  actionCreator: setTab,
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    localStorage.setItem("finio_active_tab", state.finance.activeTab);
  }
});

syncMiddleware.startListening({
  actionCreator: toggleTheme,
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const theme = state.finance.theme;
    localStorage.setItem("finio_theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
});

export const store = configureStore({
  reducer: {
    finance: financeReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().prepend(syncMiddleware.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

if (typeof window !== "undefined") {
  const state = store.getState();
  if (state.finance.theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
