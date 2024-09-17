"use client"; // "to be rendered on the client-side rather than on the server" next.js grej

import DeleteButton from "./DeleteButton";
import { EditButton } from "./EditButton";
import EditFormModal from "./EditFormModal";
import { useState, useEffect } from "react";

//// Server-side data fetching - to get around clientside & serverside issues
// export async function getServerSideProps() {
//   //hämta in itemslista
//   const response = await fetch(
//     process.env.NEXT_PUBLIC_BASE_URL + "/api/items",
//     {
//       cache: "no-cache",
//     }
//   )
//     .then((response) => response.json())
//     .catch((error) => {
//       console.log("failed to get items, error is: ", error);
//     });
//   const items = await response.json();

//   return {
//     props: { items }, // Pass the items to the component as props
//   };
// }

function ItemsContainer({ onEditButtonClick }) {
  //om återgång till getServerSideProps, lägg till {items} som argument

  // Funktion för att hämta alla items (initialt)
  //hämta in itemslista
  // async function handleGetItems(e) {
  //   const items = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/items", {
  //     cache: "no-cache",
  //   })
  //     .then((response) => response.json())
  //     .catch((error) => {
  //       console.log("failed to get items, error is: ", error);
  //     });
  // }

  const [item, setItem] = useState(); // detta är till edit - hämtar det aktuella itemet som ska ändras

  const [items, setItems] = useState([]); //detta är för GET requesten som skriver ut alla items

  async function handleGetItems() {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/items",
        {
          cache: "no-cache",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }

      let itemsData = await response.json();
      setItems(itemsData);
      //console.log(items);

      return items; // Return the fetched items
    } catch (error) {
      console.error("Failed to get items, error is:", error);
      return []; // Return an empty array in case of an error
    }
  }

  //kör hämtning av items
  useEffect(() => {
    handleGetItems();
    console.log(items);
  }, []); //useeffect: när saken i bracketsen händer, är sann, gör saken inom måsvingar. är brackets tom så kör när componenten mountas aka renderas

  //async function editItem() {}

  //öppna och stänga editmodal
  //skapa en useState
  // State to control the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* edit modal */}
      <EditFormModal
        item={item}
        isOpen={isModalOpen}
        onClose={closeModal}
        // item={selectedItem}
      />

      <div className="flex min-h-screen flex-col items-center  p-24">
        <h2>Items in inventory</h2>

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
                <EditButton onClick={openModal} item={item} />
                {/* <button onClick={toggleHide}>Edit</button> */}
                {/* <button onClick={() => openModal(item)}>Edit</button> */}
              </li>
            ))}
        </section>
      </div>
    </>
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
