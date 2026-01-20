import { Suspense } from "react";
import OptimisticDataDisplay from "@/components/OptimisticDataDisplay";
import SlowDataDisplay from "@/components/SlowDataDisplay";
import { fetchData } from "../dal/dal";

export default async function Home() {
  const dataPromise = fetchData();

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-200 selection:bg-emerald-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <header className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-6 bg-gradient-to-r from-white via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
            Server Actions & Optimistic UI
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed mb-8">
            This demo showcases how{" "}
            <code className="text-emerald-400">useOptimistic</code> improves
            user experience during slow data mutations. We've simulated a{" "}
            <span className="text-white font-mono bg-white/10 px-2 py-0.5 rounded">
              2000ms
            </span>{" "}
            API delay on every action.
          </p>
          <div className="inline-flex gap-4 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20">
              Slow API Simulation Active
            </span>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <section className="space-y-4">
            <div className="flex items-center gap-3 px-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Method A
              </span>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            <Suspense fallback={<LoadingCard color="red" />}>
              <SlowDataDisplay dataPromise={dataPromise} />
            </Suspense>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 px-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Method B
              </span>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            <Suspense fallback={<LoadingCard color="emerald" />}>
              <OptimisticDataDisplay dataPromise={dataPromise} />
            </Suspense>
          </section>
        </div>

        <footer className="mt-20 pt-12 border-t border-white/5 text-center">
          <p className="text-zinc-500 text-sm">
            Watch the difference when clicking{" "}
            <span className="text-zinc-300">"Add"</span> or{" "}
            <span className="text-zinc-300">"Delete"</span>.
            <br />
            Standard waits for the full round-trip. Optimistic updates the UI
            first.
          </p>
        </footer>
      </div>
    </main>
  );
}

function LoadingCard({ color }: { color: "red" | "emerald" }) {
  const colorClass = color === "red" ? "bg-red-500/20" : "bg-emerald-500/20";
  return (
    <div className="h-[400px] rounded-2xl bg-white/5 border border-white/10 animate-pulse flex items-center justify-center">
      <div className={`w-8 h-8 rounded-full ${colorClass} animate-bounce`} />
    </div>
  );
}
