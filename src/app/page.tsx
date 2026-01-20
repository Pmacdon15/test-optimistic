import Background from "@/components/background";
import Footer from "@/components/footer";
import PageHeader from "@/components/headers/page-header";

import OptimisticDataCard from "@/components/optimistic-data-card";
import SlowDataCard from "@/components/slow-data-crad";
import { fetchData } from "../dal/dal";

export default async function Home() {
  const dataPromise = fetchData();

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-200 selection:bg-emerald-500/30">
      <Background />

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <PageHeader />

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <SlowDataCard dataPromise={dataPromise} />
          <OptimisticDataCard dataPromise={dataPromise} />
        </div>

        <Footer />
      </div>
    </main>
  );
}
