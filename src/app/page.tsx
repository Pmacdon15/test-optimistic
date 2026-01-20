import { fetchData } from "../dal/dal";

export default async function Home() {
  const data = await fetchData();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black gap-4">
      {data.map((item) => (
        <h1 className={'text-lg rounded-sm border p-8'}key={item}> {item}  <button type="button" className="rounded-sm border p-4">X</button></h1>
      ))}
      <button type="button" className="p-4 rounded-sm border ">+ Add</button>
    </div>
  );
}
