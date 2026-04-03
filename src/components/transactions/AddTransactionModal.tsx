import { useState } from "react";
import type { ChangeEvent } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

import { useAppDispatch } from "@/store/hooks";
import { addTransaction, editTransaction } from "@/store/financeSlice";
import { CATEGORIES } from "../../data/mockData";
import type { Transaction } from "@/types";

// ... Local forms
type FormState = {
  date: string;
  description: string;
  category: string;
  type: "income" | "expense";
  amount: string; // keep string for input
};

type Props = {
  onClose: () => void;
  editData?: Transaction | null;
};

export default function AddTransactionModal({
  onClose,
  editData = null,
}: Props) {
  const dispatch = useAppDispatch();

  // ✅ Typed form
  const [form, setForm] = useState<FormState>(
    editData
      ? {
          ...editData,
          amount: String(editData.amount),
        }
      : {
          date: "",
          description: "",
          category: "Food",
          type: "expense",
          amount: "",
        }
  );

  const [error, setError] = useState<string>("");

  // ✅ Safe setter
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setError(""); // Clear error when user types
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = () => {
    // Validation
    if (!form.date || !form.description || !form.amount) {
      setError("Please fill out all required fields.");
      return;
    }

    if (isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      setError("Amount must be a valid positive number.");
      return;
    }

    const payload: Transaction = {
      ...(editData ? { id: editData.id } : { id: Date.now() }),
      date: form.date,
      description: form.description,
      category: form.category,
      type: form.type,
      amount: Number(form.amount),
    };

    if (editData) {
      dispatch(editTransaction(payload));
      toast.success("Transaction updated successfully!");
    } else {
      dispatch(addTransaction(payload));
      toast.success("Transaction added successfully!");
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/60 backdrop-blur-md p-4">
      <div className="card w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-white text-lg">
            {editData ? "Edit" : "Add"} Transaction
          </h2>

          <button
            onClick={onClose}
            className="text-slate-muted hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">
          {[
            { label: "Description", key: "description", type: "text" },
            { label: "Date", key: "date", type: "date" },
            { label: "Amount (₹)", key: "amount", type: "number" },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className="text-xs font-mono text-slate-muted uppercase tracking-wider mb-1 block">
                {label}
              </label>

              <input
                type={type}
                value={form[key as keyof FormState]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  set(
                    key as keyof FormState,
                    e.target.value as FormState[keyof FormState]
                  )
                }
                className="w-full bg-ink-700 border border-ink-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-acid font-body"
              />
            </div>
          ))}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-slate-muted uppercase tracking-wider mb-1 block">
                Category
              </label>

              <select
                value={form.category}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  set("category", e.target.value)
                }
                className="w-full bg-ink-700 border border-ink-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-acid font-body"
              >
                {CATEGORIES.filter((c) => c !== "All").map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-muted uppercase tracking-wider mb-1 block">
                Type
              </label>

              <select
                value={form.type}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  set("type", e.target.value as "income" | "expense")
                }
                className="w-full bg-ink-700 border border-ink-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-acid font-body"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-400/10 border border-red-400/20 text-red-400 text-xs text-center font-mono animate-in fade-in zoom-in duration-200">
            {error}
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-ink-700 text-white rounded-xl py-2 text-sm hover:bg-ink-600 transition-colors font-body"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex-1 bg-acid text-ink-950 rounded-xl py-2 text-sm font-display font-bold hover:bg-acid-dark transition-colors"
          >
            {editData ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}