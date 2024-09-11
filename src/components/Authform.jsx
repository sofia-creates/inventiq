"use client"; // "to be rendered on the client-side rather than on the server" next.js grej


// importera grejer
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth" ;

function AuthForm() {
    const router = useRouter();
    const auth = useAuth();

    const [email, setEmail] = useState("test+vortals@testsson.com");
    const [password, setPassword] = useState("123123abc");
    const [name, setName] = useState("");
    const [error, setError] = useState("")
    const [isLogin, setIsLogin] = useState(true);


    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const url = isLogin ? "/api/auth/login" : "/api/auth/register"; //definiera vad url ska vara baserat på om statet isLogin är satt på true eller false. om isLogin är true, vilket är default, skickas man till login sidan, annars till register sidan

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
        console.log("attempting post request");
        
        if(response.ok) {
            console.log("response is ok")
            const data = await response.json();

            console.log("data", data);
            localStorage.setItem("@library/token", data.token); //HÄR sätter den in tokenen som skapats i POST requesten i localStorage. 
            auth.setToken(data.token);
            router.push("/users"); //tror det ska vara users här?
            return; //ska den verkligen vara här??
        }
        setError("Invalid login credentials");
    }

    console.log("Auth", auth);

    return (
        <div>
            AuthForm
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
        <button className="form__button form__button--primary">
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
            {!isLogin ? "Login" : "Register"}
          </button>
        </div>
      </form>
        </div>
    )
}

export default AuthForm;