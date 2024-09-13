"use client";

import { useRouter } from "next/navigation";

export function EditButton() {
  const router = useRouter();

  async function editItem() {
    //Hitta rätt id
    const itemToEditId = item.id;

    //Öppna formulär

    //Fyll formulär med nuvarande datan mha en get request

    // lägg följande fetch på submitknappen i formuläret

    //Gör fetchen
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/items/" + itemToEditId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedName,
          description: updatedDescription,
          quantity: updatedQuantity,
          category: updatedCategory,
        }),
      }
    );
    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <button className="itemButton" onClick={editItem}>
      Edit
    </button>
  );
}
