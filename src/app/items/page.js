
//importera grejer 
import Header from "@/components/Header";
import ItemForm from "@/components/ItemForm";
import ItemsContainer from "@/components/ItemsContainer";
import EditFormModal from "@/components/EditFormModal";
//import { useState } from "react";

//lägg in komponenter här
export default function ItemsPage() {
   

  return (
    <div>
    <Header/>
    <main >
        <div className="formContainer">
            <ItemForm/>
        </div>
        <ItemsContainer />
    </main>
    </div>
  );
}
