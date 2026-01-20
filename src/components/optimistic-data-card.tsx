import type { Data } from "@/types/data-types";
import OptimisticDataDisplay from "./OptimisticDataDisplay";

export default function OptimisticDataCard({
  dataPromise,
}: {
  dataPromise: Promise<Data[]>;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 px-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
          Method B
        </span>
        <div className="h-px flex-1 bg-white/5" />
      </div>
      {/* <Suspense fallback={<LoadingCard color="emerald" />}> */}
      <OptimisticDataDisplay dataPromise={dataPromise} />
      {/* </Suspense> */}
    </section>
  );
}
