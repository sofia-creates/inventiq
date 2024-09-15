"use client"
//importera grejer 
import Header from "@/components/Header";
import ItemForm from "@/components/ItemForm";
import ItemsContainer from "@/components/ItemsContainer";
import EditFormModal from "@/components/EditFormModal";
import { useState } from "react";

//lägg in komponenter här
export default function ItemsPage() {
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
    <div>
    <Header/>
    <main >
        <div className="formContainer">
            <ItemForm/>
        </div>
        {/* edit modal */}
        <EditFormModal
            className="hide"
            isOpen={isModalOpen}
            onClose={closeModal}
            // item={selectedItem}
        />
        <ItemsContainer onEditButtonClick={openModal}/>
    </main>
    </div>
  );
}
