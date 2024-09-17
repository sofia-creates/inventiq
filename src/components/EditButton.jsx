"use client";

import { useRouter } from "next/navigation";
import EditFormModal from "./EditFormModal";

export function EditButton({ onClick }) {
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
