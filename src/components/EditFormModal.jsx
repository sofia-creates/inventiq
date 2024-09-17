"use client";

//importera grejer
import { useState } from "react";

import { ItemCategory } from "@/data/categories";

export default function EditFormModal({ item, isOpen, onClose }) {
  //Öppna och stänga modalen
  if (!isOpen) return null; //om modalen inte är öppen, rendera ingenting

  //hämta id för det aktuella itemet

  //handsubmit(e) functkion som inkluderar en fetch

  const handleSubmit = (e) => {
    e.preventDefault();

    //fetch här

    onClose(); // Close the modal after form submission
  };

  //   async function editItem() {
  //     //Hitta rätt id
  //     const itemToEditId = item.id;

  //     //Öppna formulär

  //     //Fyll formulär med nuvarande datan mha en get request

  //     // lägg följande fetch på submitknappen i formuläret

  //     //Gör fetchen
  //     const response = await fetch(
  //       process.env.NEXT_PUBLIC_BASE_URL + "/api/items/" + itemToEditId,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           name: updatedName,
  //           description: updatedDescription,
  //           quantity: updatedQuantity,
  //           category: updatedCategory,
  //         }),
  //       }
  //     );
  //     if (response.ok) {
  //       router.refresh();
  //     }
  //   }

  return (
    <div className="modalBackgroundOverlay">
      <div>
        <h2>Edit item</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form_group">
            <label className="form_label">Item name</label>
            <input
              type="text"
              className="form__input"
              value={item.name} //fyll i vad det är här sedan innan sen också.
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="form_group">
            <label className="form_label">Description</label>
            <input
              type="text"
              className="form__input"
              value={item.description}
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
              value={item.quantity}
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
