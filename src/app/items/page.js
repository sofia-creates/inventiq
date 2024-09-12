//importera grejer 
import Header from "@/components/Header";
import ItemForm from "@/components/ItemForm";
import ItemsContainer from "@/components/ItemsContainer";

//lägg in komponenter här
export default function ItemsPage() {
  return (
    <div>
      <Header/>
      <main >
      <h2>Items</h2>
      <ItemForm/>
      <ItemsContainer/>
      </main>
    </div>
  );
}
