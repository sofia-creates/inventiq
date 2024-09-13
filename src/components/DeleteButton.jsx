"use client";

import { useRouter } from "next/navigation";

function DeleteButton({ item }) {
  const router = useRouter();
  async function deleteItem() {
    //Hitta rätt id
    const itemToDeleteId = item.id;

    //gör fetchen
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/items/" + itemToDeleteId,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <>
      <button className="itemButton" onClick={deleteItem}>
        Delete
      </button>
    </>
  );
}

export default DeleteButton;
