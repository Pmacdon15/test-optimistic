export default function LoadingCard({ color }: { color: "red" | "emerald" }) {
  const colorClass = color === "red" ? "bg-red-500/20" : "bg-emerald-500/20";
  return (
    <div className="h-[400px] rounded-2xl bg-white/5 border border-white/10 animate-pulse flex items-center justify-center">
      <div className={`w-8 h-8 rounded-full ${colorClass} animate-bounce`} />
    </div>
  );
}
