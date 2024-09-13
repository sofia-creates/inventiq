"use client";

//importera grejer
import { useState } from "react";

import { ItemCategory } from "@/data/categories";

function EditFormModal() {
  //Öppna och stänga modalen

  //hämta id för det aktuella itemet

  //handsubmit(e) functkion som inkluderar en fetch

  return (
    <div>
      <h2>Edit item</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form_group">
          <label className="form_label">Item name</label>
          <input
            type="text"
            className="form__input"
            value={name} //fyll i vad det är här sedan innan sen också.
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

export default EditFormModal;
