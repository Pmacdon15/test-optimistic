export default function PageHeader() {
  return (
    //  <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
    <header className="mb-16 text-center max-w-3xl mx-auto">
      <h1 className="text-5xl font-extrabold tracking-tight text-white mb-6 bg-gradient-to-r from-white via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
        Server Actions & Optimistic UI
      </h1>
      <p className="text-lg text-zinc-400 leading-relaxed mb-8">
        This demo showcases how{" "}
        <code className="text-emerald-400">useOptimistic</code> improves user
        experience during slow data mutations. We've simulated a{" "}
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
  );
}
