import type { Data } from "@/types/data-types";
import SlowDataDisplay from "./SlowDataDisplay";

export default function SlowDataCard({
  dataPromise,
}: {
  dataPromise: Promise<Data[]>;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 px-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
          Method A
        </span>
        <div className="h-px flex-1 bg-white/5" />
      </div>
      {/* <Suspense fallback={<LoadingCard color="red" />}> */}
      <SlowDataDisplay dataPromise={dataPromise} />
      {/* </Suspense> */}
    </section>
  );
}
