"use client";

import { useRouter } from "next/navigation";
import EditFormModal from "./EditFormModal";

export function EditButton({ onClick }) {
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

  // hitta EditFormModal

  //   //togglar edit form med css
  //   function toggleHide() {
  //     if (EditFormModal.classList.includes("hide")) {
  //       EditFormModal.classList.remove("hide");
  //       //ev gömma det andra formuläret

  //       //add item to editformmodal
  //     } else {
  //       EditFormModal.classList.add("hide");
  //       //ev skriva ut det andra formuläret igen
  //       //remove item from editformmodal
  //     }
  //   }

  return (
    <button className="itemButton" onClick={onClick}>
      Edit
    </button>
  );
}
