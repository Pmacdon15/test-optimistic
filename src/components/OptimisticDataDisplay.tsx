"use client";

import { startTransition, use, useOptimistic, useState } from "react";
import { addData, deleteData } from "@/actions/data-actions";
import type { Data } from "@/types/data-types";

type OptimisticAction =
  | { type: "add"; item: Data }
  | { type: "remove"; id: number };

export default function OptimisticDataDisplay({
  dataPromise,
}: {
  dataPromise: Promise<Data[]>;
}) {
  const initialData = use(dataPromise);
  const [inputValue, setInputValue] = useState("");

  const [optimisticData, updateOptimistic] = useOptimistic(
    initialData,
    (state: Data[], action: OptimisticAction) => {
      switch (action.type) {
        case "add":
          return [...state, action.item];
        case "remove":
          return state.filter((item) => item.id !== action.id);
        default:
          return state;
      }
    },
  );

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputValue.trim();
    if (!value) return;

    setInputValue("");

    startTransition(async () => {
      // Optimistic update
      updateOptimistic({
        type: "add",
        item: {
          id: Math.random(), // temp id
          data: value,
        },
      });
      // Real action
      await addData(value);
    });
  };

  const handleDelete = async (id: number) => {
    startTransition(async () => {
      // Optimistic update
      updateOptimistic({ type: "remove", id });
      // Real action
      await deleteData(id);
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Optimistic Update
        </h2>
        <p className="text-zinc-400 text-sm mb-6">
          Instant feedback. UI updates immediately while the server works.
        </p>

        <div className="space-y-3 mb-6">
          {optimisticData.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5 transition-all hover:border-white/20"
            >
              <span className="text-zinc-200 font-medium">{item.data}</span>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="text-zinc-500 hover:text-emerald-400 transition-colors p-2"
              >
                {/** biome-ignore lint/a11y/noSvgWithoutTitle: this is a demo */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add something..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          />
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            {/** biome-ignore lint/a11y/noSvgWithoutTitle: this is a demo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add
          </button>
        </form>
      </div>

      <div className="absolute bottom-2 right-6">
        <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
          Always Ready
        </span>
      </div>
    </div>
  );
}
