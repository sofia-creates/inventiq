"use client"; // "to be rendered on the client-side rather than on the server" next.js grej


// importera grejer
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth" ;

function AuthForm() {
    const router = useRouter();
    const auth = useAuth();

    const [email, setEmail] = useState("test@testsson.com");
    const [password, setPassword] = useState("123123abc");
    const [name, setName] = useState("");
    const [error, setError] = useState("")
    const [isLogin, setIsLogin] = useState(true);


    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        console.log("attempting handleSubmit()");

        const url = isLogin ? "/api/auth/login" : "/api/auth/register"; //definiera vad url ska vara baserat på om statet isLogin är satt på true eller false. om isLogin är true, vilket är default, skickas man till login sidan, annars till register sidan

        console.log(url);

        try {
            const response = await fetch(url, { //gör ett anrop till aktuella url:en som definierats ovan
                method: "POST", //gör en POST request, den som definerats för urlens sida. det skapar även en TOKEN
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                    name
                })
            })
    
            console.log("checkpoint 1");
    
            if(response.ok) {
                console.log("response is ok")
                const data = await response.json();
    
                console.log("data", data);
                localStorage.setItem("@library/token", data.token); //HÄR sätter den in tokenen som skapats i POST requesten i localStorage. 
                auth.setToken(data.token);
                router.push("/items"); //router navigerar en till en annan sida - sedan ska denna skicka en till en page sida för items
                return; 
            }
            setError("Invalid login credentials");

        } catch(error){
            console.error("Network or other error:", error);
            setError("An error occurred. Please try again.");
        }
    }

    console.log("Auth", auth);

    return (
        <div>
            <form className="form bg-white" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label">Email</label>
          <input
            className="form__input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className="form__group">
          <label className="form__label">Password</label>
          <input
            className="form__input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        {!isLogin && (
          <div className="form__group">
            <label className="form__label">Name</label>
            <input
              className="form__input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <button className="form__button form__button--primary" type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
        <p className="form__text">...or</p>
        <div className="form__group">
          <button
            className="form__button form__button--secondary"
            type="button"
            onClick={(e) => {
              setIsLogin(!isLogin);
            }}
          >
            {!isLogin ? "Go to Login" : "Go to Register"}
          </button>
        </div>
      </form>
        </div>
    )
}

export default AuthForm;