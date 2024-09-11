//importera grejer 
import AuthForm from "@/components/AuthForm";
import Header from "@/components/Header";

//lägg in komponenter här
export default function Home() {
  return (
    <div>
      <Header/>
      <main >
        <AuthForm/>
      </main>
    </div>
  );
}
