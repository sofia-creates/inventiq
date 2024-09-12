"use client"; // "to be rendered on the client-side rather than on the server" next.js grej

// importera grejer
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth" ;

import {ItemCategory}  from "@/data/categories";

function ItemForm() {
     const auth = useAuth(); //för autentisering, ta bort eller lägg till senare

     const [name, setName] = useState("");
     const [description, setDescription] = useState("");
     const [quantity, setQuantity] = useState("");
     const [category, setCategory] = useState("");
     const [error, setError] = useState("");

     async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch("/api/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth.token}`
            },
            body: JSON.stringify({
                name,
                description,
                quantity,
                category
            })
        })

        if(response.ok) {
            const data = await response.json();
            console.log(data);
            return
        }
     }

    //  if(!auth.token){
    //     return (
    //         <div>
    //             You have to be logged in to create a book!
    //         </div>
    //     )
    //  } // ta tillbaka sen, just nu blockar den allt, LÖS!

     return (
        <div>
            <h2>New item</h2>
            <form onSubmit={handleSubmit}>
                <div className="form_group">
                    <label className="form_label">Item name</label>
                    <input type="text" className="form_input" value = {name} onChange={(e) => {
                        setName(e.target.value);
                    }}/>
                </div>

                <div className="form_group">
                    <label className="form_label">Description</label>
                    <input type="text" className="form_input" value = {description} onChange={(e) => {
                        setDescription(e.target.value);
                    }}/>
                </div>

                <div className="form_group">
                    <label className="form_label">Quantity</label>
                    <input type="number" className="form_input" value = {quantity} onChange={(e) => {
                        setQuantity(e.target.value);
                    }}/>
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
                    <label htmlFor={option}>{option}</label>
                    </div>
                    ))
                }
                </div>


            

                <button type="submit">Create new item</button>
            </form>
        </div>
     )
}

export default ItemForm;