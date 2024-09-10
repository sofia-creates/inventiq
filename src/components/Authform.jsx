"use client"; // "to be rendered on the client-side rather than on the server" next.js grej


// importera grejer
import { useState } from "react";
import { useRouter } from "next/navigation";
//import { useAuth } from "@context/auth"; //ej skapat context än

function AuthForm() {
    const router = useRouter();
    const auth = useAuth();

}

export default AuthForm;