"use client"; // "to be rendered on the client-side rather than on the server" next.js grej

// importera grejer
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import { ItemCategory } from "@/data/categories";

function ItemForm({ updatingItems, setUpdatingItems }) {
  const auth = useAuth(); //för autentisering, ta bort eller lägg till senare

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("handleSubmit körs");

    //console.log(name, description, quantity, category);
    let dataToSend = JSON.stringify({
      name,
      description,
      quantity: Number(quantity),
      category,
    });
    console.log(dataToSend);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            name,
            description,
            quantity: Number(quantity),
            category,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUpdatingItems(true);
        router.refresh();
        return;
      }
      // if (!response.ok) {
      //   console.log("response is not ok");
      // }
    } catch (error) {
      console.log("error in the post request is: ", error);
    }
  }

  //  if(!auth.token){
  //     return (
  //         <div>
  //             You have to be logged in to create an item!
  //         </div>
  //     )
  //  } // ta tillbaka sen, just nu blockar den allt, LÖS!

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <h2>New item</h2>
        <div className="form_group">
          <label className="form_label">Item name</label>
          <input
            type="text"
            className="form__input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="form_group">
          <label className="form_label">Description</label>
          <p className="smallText">*Minimum 10 characters</p>
          <input
            type="text"
            className="form__input"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        <div className="form_group">
          <label className="form_label">Quantity</label>
          <input
            type="number"
            className="form__input"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </div>

        <div className="form_group">
          <label className="form_label">Category: </label>
          {ItemCategory.categories.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={option}
                name="fruit"
                value={option}
                // checked={selectedOption === option}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
              <label htmlFor={option}>
                <i>{option}</i>
              </label>
            </div>
          ))}
        </div>

        <button className="submitBtn" type="submit">
          Create new item
        </button>
      </form>
    </div>
  );
}

export default ItemForm;
