'use client';

import { deleteData } from "@/actions/data-actions";

export default function DeleteDataButton({
  id,
  onDelete,
}: {
  id: number;
  onDelete: () => void;
}) {
  return (
    <button
      onClick={async () => {
        onDelete();      // optimistic update
        await deleteData(id); // server action
      }}
      type="button"
      className="rounded-sm border p-2"
    >
      X
    </button>
  );
}
