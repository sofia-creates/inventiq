"use client";

import { useRouter } from "next/navigation";
import EditFormModal from "./EditFormModal";

export function EditButton({ onClick }) {
  return (
    <button className="itemButton" onClick={onClick}>
      Edit
    </button>
  );
}
