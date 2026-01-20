"use client";
import { startTransition, use, useOptimistic } from "react";
import type { Data } from "@/types/data-types";
import DeleteDataButton from "./buttons/delete-data-button";

export default function DataDisplay({
  dataPromise,
}: {
  dataPromise: Promise<Data[]>;
}) {
  const data = use(dataPromise);

  const [optimisticData, removeOptimistic] = useOptimistic(
    data,
    (state: Data[], id: number) => state.filter((item) => item.id !== id),
  );

  return (
    <>
      {optimisticData.map((item) => (
        <h1
          key={item.id}
          className="text-lg rounded-sm border p-8 flex justify-between"
        >
          {item.data}
          <DeleteDataButton
            id={item.id}
            onDelete={() => {
              startTransition(() => {
                removeOptimistic(item.id);
              });
            }}
          />
        </h1>
      ))}
    </>
  );
}
