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

function ItemsContainer({
  onEditButtonClick,
  updatingItems,
  setUpdatingItems,
}) {
  //öppna och stänga editmodal
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      console.log("items i handlegetitems get request är: " + items);

      return items; // Return the fetched items
    } catch (error) {
      console.error("Failed to get items, error is:", error);
      return []; // Return an empty array in case of an error
    }
  }

  //kör hämtning av items vid montering av komponenten
  useEffect(() => {
    handleGetItems();
    console.log(items);
  }, []); //useeffect: när saken i bracketsen händer, är sann, gör saken inom måsvingar. är brackets tom så kör när componenten mountas aka renderas

  //kör hämtning av items när de uppdaterats
  useEffect(() => {
    handleGetItems();
    console.log(items);
    setUpdatingItems(true);
  }, [updatingItems]); //detta gör så att den hämtas igen när de uppdaterats, ett state som sätts vid delete, post och edit.

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = (item) => {
    openModal();
    setItem(item); //sätter item från map till item i state
  };

  return (
    <>
      {/* edit modal */}
      <EditFormModal
        item={item}
        isOpen={isModalOpen}
        onClose={closeModal}
        updatingItems={updatingItems}
        setUpdatingItems={setUpdatingItems}
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
                <DeleteButton
                  updatingItems={updatingItems}
                  setUpdatingItems={setUpdatingItems}
                  item={item}
                />
                <EditButton onClick={() => handleEditClick(item)} />
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
