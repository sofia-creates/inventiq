//"use client"; // "to be rendered on the client-side rather than on the server" next.js grej

// importera grejer
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/auth" ;


async function ItemsContainer() {
    //hämta in itemslista
    const items = await fetch(process.env.NEXT_PUBLIC_BASE_URL+"/api/items")
    .then((response) => response.json())
    .catch((error) => {
      console.log("failed to get items, error is: ", error);
    });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Items in inventory</h2>
      <section className="flex flex-col items-center justify-center gap-2">
        {items &&
          items.map((item) => (
           <li><strong>{item.name}</strong> Description: {item.description} . Quantity: {item.quantity} . Category: {item.category} <button>Edit</button> <button>Delete</button></li>
          ))}
      </section>
    </main>
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