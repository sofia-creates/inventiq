"use client"

//importera grejer 
import Header from "@/components/Header";
import ItemForm from "@/components/ItemForm";
import ItemsContainer from "@/components/ItemsContainer";
import EditFormModal from "@/components/EditFormModal";
import { useState } from "react";

//lägg in komponenter här
export default function ItemsPage() {
  const [updatingItems, setUpdatingItems] = useState(false);

  return (
    <div>
    <Header/>
    <main >
        <div className="formContainer">
            <ItemForm updatingItems={updatingItems} setUpdatingItems={setUpdatingItems}/>
        </div>
        <ItemsContainer updatingItems={updatingItems} setUpdatingItems={setUpdatingItems}/>
    </main>
    </div>
  );
}
