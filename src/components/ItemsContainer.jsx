"use client"; // "to be rendered on the client-side rather than on the server" next.js grej

import DeleteButton from "./DeleteButton";
import { EditButton } from "./EditButton";
import { EditFormModal } from "./EditFormModal";
import { useState } from "react";

// importera grejer
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/auth" ;

async function ItemsContainer() {
  //hämta in itemslista
  const items = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/items", {
    cache: "no-cache",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("failed to get items, error is: ", error);
    });

  //kontrollerar att edit modalen öppnas och stängs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setIsModalOpen(true);
    setSelectedItem(item); // Set the selected item
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null); // Clear the selected item
  };

  //async function editItem() {}

  return (
    <div className="flex min-h-screen flex-col items-center  p-24">
      <h2>Items in inventory</h2>

      {/* edit modal */}
      <EditFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        item={selectedItem}
      />

      <section className="flex flex-col items-center justify-center gap-2 itemList">
        {items &&
          items.map((item) => (
            <li>
              <strong>{item.name}</strong>
              <i> Description: </i>
              {item.description} .<i>Quantity:</i> {item.quantity} .
              <i>Category: </i>
              {item.category} <br />
              <DeleteButton item={item} />
              <button onClick={() => openModal(item)} />
            </li>
          ))}
      </section>
    </div>
  );
}

export default ItemsContainer;

//ARKIV, från inuti itemsocntainer
//     async function fetchItems() {
//         try {
//             //get request till api/items
//             const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/items", { //gör ett anrop till aktuella url:en som definierats ovan
//                 method: "GET", //gör en POST request, den som definerats för urlens sida. det skapar även en TOKEN
//             })
//             console.log(response)

//             if(!response.ok) {
//                 throw new Error("Failed to fetch items");
//             }

//             const items = await response.json(); //Parsa responsen till json

//         } catch (error) {
//             console.error("Error fetching items:" , error);
//         }
//     }

//     fetchItems();

// return (
//     //mappa igenom lista och skriv ut dem
//     <ul>

//         {items.map((item, index) => (
//         <li key={index}>
//         {item.name}
//         <button>Edit</button> <button>Delete</button>
//         </li>
//   ))}

//     </ul>
// )
