"use client";

//importera grejer
import { useState } from "react";
import { ItemCategory } from "@/data/categories";
import { useRouter } from "next/navigation";
import { stringify } from "postcss";

export default function EditFormModal({
  item,
  isOpen,
  onClose,
  updatingItems,
  setUpdatingItems,
}) {
  //Öppna och stänga modalen
  if (!isOpen) return null; //om modalen inte är öppen, rendera ingenting

  const router = useRouter();
  const [newName, setNewName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [quantity, setQuantity] = useState(item.quantity);
  const [description, setDescription] = useState(item.description);

  //console.log("item i EditFormModal är: " + JSON.stringify(item));

  //hämta id för det aktuella itemet

  //handsubmit(e) function som inkluderar en fetch
  const handleSubmit = (e, item) => {
    e.preventDefault();

    console.log("item i handleSubmit är: " + JSON.stringify(item));
    //fetch här
    editItem(item);

    onClose(); // Close the modal after form submission
  };

  async function editItem(item) {
    //Hitta rätt id
    const itemToEditId = item.id;

    console.log("item i editItem är: " + JSON.stringify(item.name));

    //Gör fetchen
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/items/" + itemToEditId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName,
            description,
            quantity: Number(quantity),
            category,
          }),
        }
      );
      if (response.ok) {
        setUpdatingItems(true);
        router.refresh();
      }
    } catch (error) {
      console.log("error in the put request is: ", error);
    }
  }

  return (
    <div className="modalBackgroundOverlay">
      <div>
        <form onSubmit={(e) => handleSubmit(e, item)} className="form">
          <h2>Edit item</h2>
          <div className="form_group">
            <label className="form_label">Item name</label>
            <input
              type="text"
              className="form__input"
              value={newName} //fyller i vad det är här sedan innan
              onChange={(e) => {
                setNewName(e.target.value);
              }}
            />
          </div>

          <div className="form_group">
            <label className="form_label">Description</label>
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
            Update item
          </button>
        </form>
      </div>
    </div>
  );
}

//export default EditFormModal;
