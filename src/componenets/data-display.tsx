import { use } from "react";
import type { Data } from "@/types/data-types";
import DeleteDataButton from "./buttons/delete-data-button";

export default function DataDisplay({
  dataPromise,
}: {
  dataPromise: Promise<Data[]>;
}) {
  const data = use(dataPromise);
  return data.map((item) => (
    <h1 className={"text-lg rounded-sm border p-8"} key={item.id}>
      {" "}
      {item.data} <DeleteDataButton id={item.id} />
    </h1>
  ));
}
