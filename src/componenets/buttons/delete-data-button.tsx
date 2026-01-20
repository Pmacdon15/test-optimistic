'use client';

import { deleteData } from "@/actions/data-actions";

export default function DeleteDataButton({ id }: { id: number }) {
  return (
    <button
      onClick={() => deleteData(id)}
      type="button"
      className="rounded-sm border p-2 text-red-600 hover:bg-red-100"
    >
      X
    </button>
  );
}
